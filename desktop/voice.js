// Voz francesa neural offline (Piper). Na primeira vez baixa o programa (~22 MB) e a
// voz fr_FR "siwis" (~60 MB) para a pasta do usuário; depois funciona sem internet.
// Um processo do Piper fica aberto e recebe frases pelo stdin (modo JSON), e cada
// frase vira um .wav em cache (frases repetidas saem na hora).
const { app, net } = require('electron');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn, execFile } = require('child_process');

const WIN = process.platform === 'win32';
const PIPER_URL = WIN
  ? 'https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_windows_amd64.zip'
  : 'https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz';
// Voz: Hugging Face (oficial) e, se falhar, o pacote antigo no GitHub (mesma voz).
const VOICE_HF = 'https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx';
const VOICE_GH = 'https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-fr-siwis-medium.tar.gz';

const base = () => path.join(app.getPath('userData'), 'voz');
const piperExe = () => path.join(base(), 'piper', WIN ? 'piper.exe' : 'piper');
const modelFile = () => path.join(base(), 'fr.onnx');
const cacheDir = () => path.join(base(), 'cache');

let state = 'missing'; // missing | downloading | ready | error
let progress = 0;
let lastError = '';
let installing = null;
const listeners = new Set();
const emit = () => listeners.forEach((fn) => { try { fn(status()); } catch {} });

function status() {
  return { state, progress, error: lastError };
}

function isReady() {
  return fs.existsSync(piperExe()) && fs.existsSync(modelFile()) && fs.existsSync(modelFile() + '.json');
}

async function download(url, dest, weight, offset) {
  const res = await net.fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const total = Number(res.headers.get('content-length')) || 0;
  const tmp = dest + '.part';
  const out = fs.createWriteStream(tmp);
  const reader = res.body.getReader();
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    got += value.length;
    if (!out.write(Buffer.from(value))) await new Promise((r) => out.once('drain', r));
    if (total) {
      const p = Math.round(offset + (weight * got) / total);
      if (p !== progress) { progress = p; emit(); }
    }
  }
  await new Promise((r, j) => out.end((e) => (e ? j(e) : r())));
  fs.renameSync(tmp, dest);
}

function extract(archive, dir) {
  fs.mkdirSync(dir, { recursive: true });
  return new Promise((resolve, reject) => {
    // O Windows 10/11 já vem com tar.exe, que abre .zip; se não tiver, usa o PowerShell.
    execFile('tar', ['-xf', archive, '-C', dir], { windowsHide: true }, (err) => {
      if (!err) return resolve();
      if (!WIN) return reject(err);
      execFile('powershell', ['-NoProfile', '-Command', `Expand-Archive -Force -LiteralPath '${archive}' -DestinationPath '${dir}'`], { windowsHide: true }, (e2) => (e2 ? reject(e2) : resolve()));
    });
  });
}

function findFile(dir, test) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      const hit = findFile(p, test);
      if (hit) return hit;
    } else if (test(name)) return p;
  }
  return null;
}

async function doInstall() {
  state = 'downloading';
  progress = 0;
  lastError = '';
  emit();
  const dir = base();
  fs.mkdirSync(dir, { recursive: true });
  // 1) programa
  if (!fs.existsSync(piperExe())) {
    const arc = path.join(dir, WIN ? 'piper.zip' : 'piper.tar.gz');
    await download(PIPER_URL, arc, 25, 0);
    await extract(arc, dir);
    fs.rmSync(arc, { force: true });
    if (!WIN) fs.chmodSync(piperExe(), 0o755);
  }
  progress = 25;
  emit();
  // 2) voz
  if (!fs.existsSync(modelFile()) || !fs.existsSync(modelFile() + '.json')) {
    try {
      await download(VOICE_HF + '.json', modelFile() + '.json', 1, 25);
      await download(VOICE_HF, modelFile(), 74, 26);
    } catch {
      const arc = path.join(dir, 'voz.tar.gz');
      const tmpDir = path.join(dir, 'voz-tmp');
      await download(VOICE_GH, arc, 74, 26);
      await extract(arc, tmpDir);
      const onnx = findFile(tmpDir, (n) => n.endsWith('.onnx'));
      if (!onnx) throw new Error('voz não encontrada no pacote');
      fs.copyFileSync(onnx, modelFile());
      fs.copyFileSync(onnx + '.json', modelFile() + '.json');
      fs.rmSync(arc, { force: true });
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }
  progress = 100;
  state = 'ready';
  emit();
}

function install() {
  if (isReady()) {
    state = 'ready';
    progress = 100;
    return Promise.resolve(status());
  }
  if (!installing) {
    installing = doInstall()
      .catch((e) => {
        state = 'error';
        lastError = String((e && e.message) || e);
        emit();
      })
      .finally(() => { installing = null; })
      .then(() => status());
  }
  return installing;
}

// ── síntese ──────────────────────────────────────────────
let proc = null;
let buf = '';
const waiting = new Map(); // output_file -> resolve

function startProc() {
  fs.mkdirSync(cacheDir(), { recursive: true });
  proc = spawn(piperExe(), ['-m', modelFile(), '--json-input', '--output_dir', cacheDir(), '-q'], { cwd: path.dirname(piperExe()), windowsHide: true });
  proc.stdout.setEncoding('utf8');
  proc.stdout.on('data', (d) => {
    buf += d;
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim();
      buf = buf.slice(i + 1);
      const key = path.basename(line);
      for (const [file, done] of waiting) {
        if (path.basename(file) === key) { waiting.delete(file); done(true); }
      }
    }
  });
  proc.stderr.on('data', () => {});
  const dead = () => {
    proc = null;
    for (const [, done] of waiting) done(false);
    waiting.clear();
  };
  proc.on('exit', dead);
  proc.on('error', dead);
}

// Devolve o nome do .wav (servido em /__tts/<nome>) ou null se a voz não está pronta.
async function synth(text) {
  if (!isReady()) {
    install();
    return null;
  }
  const clean = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 600);
  if (!clean) return null;
  const name = crypto.createHash('sha1').update(clean).digest('hex').slice(0, 20) + '.wav';
  const file = path.join(cacheDir(), name);
  if (fs.existsSync(file) && fs.statSync(file).size > 1000) return name;
  if (!proc) startProc();
  const ok = await new Promise((resolve) => {
    waiting.set(file, resolve);
    proc.stdin.write(JSON.stringify({ text: clean, output_file: file }) + '\n', 'utf8');
    setTimeout(() => { if (waiting.delete(file)) resolve(false); }, 15000);
  });
  return ok ? name : null;
}

function stop() {
  try { proc && proc.kill(); } catch {}
}

module.exports = { status, install, synth, isReady, cacheDir, stop, onChange: (fn) => { listeners.add(fn); return () => listeners.delete(fn); } };
