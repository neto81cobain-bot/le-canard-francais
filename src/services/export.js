// PDF certificates and word-list export (native modules: expo-print, expo-sharing, expo-file-system).
import { Share } from 'react-native';
import { UNITS } from '../content';
import { SHOP, wornOf } from '../store/logic';
import { duckSvgString } from '../components/duckArt';
import { isWeb, printHtml, downloadText } from './webfile';

let Print = null;
let Sharing = null;
let FS = null;
try { Print = require('expo-print'); } catch { Print = null; }
try { Sharing = require('expo-sharing'); } catch { Sharing = null; }
try { FS = require('expo-file-system'); } catch { FS = null; }

const needApk = () => {
  const e = new Error('Esta função precisa do app novo (APK 2.5). Gere e instale o APK para usar.');
  e.needsApk = true;
  return e;
};

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
const LEVEL_NAMES = { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Intermediário superior', C1: 'Avançado' };

// A level counts as finished when every unit of it has been passed (next unit unlocked).
export function levelStatus(state) {
  return LEVELS.map((lv) => {
    const units = UNITS.filter((u) => u.level === lv);
    const last = Math.max(...units.map((u) => u.number));
    const done = (state.unlockedUnit || 1) > last || !!state.unitTests?.[units.find((u) => u.number === last)?.id];
    return { level: lv, name: LEVEL_NAMES[lv], done, units: units.length };
  });
}

const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function shareCertificate(state, level) {
  if (!isWeb && (!Print?.printToFileAsync || !Sharing?.shareAsync)) throw needApk();
  const wear = wornOf(state.inventory);
  const emoji = {};
  ['held', 'ground'].forEach((k) => { const it = wear[k] && SHOP.find((x) => x.id === wear[k]); if (it) emoji[k] = it.emoji; });
  const duck = duckSvgString({ wear, emoji, size: 170 });
  const name = esc(state.profile?.name || state.auth?.name || 'Aluno');
  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  @page { size: A4 landscape; margin: 0; }
  body { margin: 0; font-family: Georgia, 'Times New Roman', serif; background: #FBF7F0; }
  .page { width: 297mm; height: 210mm; box-sizing: border-box; padding: 18mm; position: relative; }
  .frame { position: absolute; inset: 10mm; border: 3px solid #1E3A8A; border-radius: 14px; }
  .frame2 { position: absolute; inset: 13mm; border: 1px solid #E63946; border-radius: 10px; }
  .flag { position: absolute; top: 10mm; left: 50%; transform: translateX(-50%); display: flex; width: 60mm; height: 4mm; }
  .flag div { flex: 1 } .content { position: relative; text-align: center; padding-top: 10mm; }
  h1 { font-size: 40px; color: #1E3A8A; margin: 6px 0; letter-spacing: 1px; }
  .sub { font-family: Helvetica, Arial, sans-serif; color: #6B7280; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; }
  .name { font-size: 46px; font-style: italic; color: #111827; margin: 14px 0 4px; }
  .lvl { display: inline-block; font-family: Helvetica, Arial, sans-serif; font-weight: bold; color: #fff; background: #E63946; border-radius: 30px; padding: 8px 22px; font-size: 20px; margin: 10px 0; }
  p { font-family: Helvetica, Arial, sans-serif; color: #374151; font-size: 15px; margin: 6px 0; }
  .stats { display: flex; justify-content: center; gap: 26px; margin-top: 14px; font-family: Helvetica, Arial, sans-serif; }
  .stats b { display: block; font-size: 22px; color: #1E3A8A; } .stats span { font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; }
  .duck { position: absolute; right: 22mm; bottom: 18mm; } .sign { position: absolute; left: 26mm; bottom: 22mm; text-align: left; font-family: Helvetica, Arial, sans-serif; color: #6B7280; font-size: 12px; }
  .sign .s { font-family: Georgia, serif; font-style: italic; font-size: 22px; color: #1E3A8A; border-bottom: 1px solid #9CA3AF; padding-bottom: 2px; margin-bottom: 4px; }
  </style></head><body><div class="page"><div class="frame"></div><div class="frame2"></div>
  <div class="flag"><div style="background:#1E3A8A"></div><div style="background:#fff"></div><div style="background:#E63946"></div></div>
  <div class="content"><div class="sub">Le canard français · Certificat</div><h1>Certificado de conclusão</h1>
  <p>Certificamos que</p><div class="name">${name}</div>
  <p>concluiu todas as unidades do nível</p><div class="lvl">${level.level} · ${esc(level.name)}</div>
  <div class="stats"><div><b>${state.xp || 0}</b><span>XP total</span></div><div><b>${Object.keys(state.words || {}).length}</b><span>palavras</span></div><div><b>${state.stats?.lessons || 0}</b><span>lições</span></div><div><b>${state.streak?.best || 0}</b><span>maior streak</span></div></div>
  <p style="margin-top:14px">${date}</p></div>
  <div class="sign"><div class="s">Monsieur Canard</div>Professor-chefe de francês 🦆</div>
  <div class="duck">${duck}</div></div></body></html>`;
  if (isWeb) {
    printHtml(html.replace('</style>', '@page{size:A4 landscape;margin:0}</style>'));
    return;
  }
  const { uri } = await Print.printToFileAsync({ html, width: 842, height: 595 });
  await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: `Certificado ${level.level}`, UTI: 'com.adobe.pdf' });
}

// Saved phrases + learned words as a tab-separated file (Anki: Arquivo → Importar).
export async function exportWords(state) {
  const rows = [];
  const seen = new Set();
  (state.saved || []).forEach((s) => { if (s.fr && !seen.has(s.fr)) { seen.add(s.fr); rows.push([s.fr, s.pt || '']); } });
  Object.entries(state.words || {}).forEach(([fr, v]) => { if (!seen.has(fr)) { seen.add(fr); rows.push([fr, v.pt || '']); } });
  if (!rows.length) return 0;
  const clean = (x) => String(x).replace(/[\t\n\r]+/g, ' ');
  const text = '#separator:tab\n#html:false\n' + rows.map(([a, b]) => `${clean(a)}\t${clean(b)}`).join('\n') + '\n';
  if (isWeb) {
    downloadText(text, 'le-canard-palavras.txt');
    return rows.length;
  }
  if (FS?.File && FS?.Paths && Sharing?.shareAsync) {
    try {
      const f = new FS.File(FS.Paths.cache, 'le-canard-palavras.txt');
      try { if (f.exists) f.delete(); } catch {}
      f.create();
      await f.write(text);
      await Sharing.shareAsync(f.uri, { mimeType: 'text/plain', dialogTitle: 'Exportar palavras' });
      return rows.length;
    } catch {
      // fall back to sharing the text itself
    }
  }
  await Share.share({ message: rows.map(([a, b]) => `${a} — ${b}`).join('\n') });
  return rows.length;
}
