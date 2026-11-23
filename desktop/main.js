// Le canard français — versão de computador (Electron).
// Serve o app (export web do Expo, pasta ./app) num servidor local fixo, para o
// progresso (localStorage) ficar sempre no mesmo lugar, e abre numa janela.
const { app, BrowserWindow, shell, session, Menu, dialog, ipcMain } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');
const voice = require('./voice');
const google = require('./google');

// Pasta dos dados (progresso, voz): %APPDATA%\Le canard français — a mesma da versão 3.7.
app.setPath('userData', path.join(app.getPath('appData'), 'Le canard français'));

const ROOT = path.join(__dirname, 'app');
const PORT = 47321; // fixo: mudar a porta = começar o progresso do zero
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.wav': 'audio/wav',
  '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.webp': 'image/webp', '.map': 'application/json',
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const [rawPath, query] = (req.url || '/').split('?');
      let p = decodeURIComponent(rawPath);
      // Volta do login do Google (vem do navegador do usuário).
      if (p === '/oauthredirect' && google.handleRedirect(query)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(google.PAGE);
        if (win) { if (win.isMinimized()) win.restore(); win.show(); win.focus(); }
        return;
      }
      // Áudios da voz francesa (cache do Piper).
      if (p.startsWith('/__tts/')) {
        const f = path.join(voice.cacheDir(), path.basename(p));
        return fs.readFile(f, (e, data) => {
          if (e) { res.writeHead(404); return res.end(); }
          res.writeHead(200, { 'Content-Type': 'audio/wav', 'Cache-Control': 'max-age=31536000' });
          res.end(data);
        });
      }
      let file = path.normalize(path.join(ROOT, p));
      if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      fs.stat(file, (err, st) => {
        // Rotas do app (/lesson/3, /placement…) caem no index.html.
        if (err || st.isDirectory()) file = path.join(ROOT, 'index.html');
        fs.readFile(file, (e2, data) => {
          if (e2) { res.writeHead(404); return res.end('404'); }
          res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
          res.end(data);
        });
      });
    });
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 380,
    minHeight: 620,
    center: true,
    title: 'Le canard français',
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#0F172A',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true, spellcheck: false, preload: path.join(__dirname, 'preload.js') },
  });
  win.loadURL(`http://127.0.0.1:${PORT}/`);
  // Barra de rolagem fina, no estilo do app.
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(128,128,128,.35);border-radius:8px}::-webkit-scrollbar-thumb:hover{background:rgba(128,128,128,.6)}').catch(() => {});
  });
  // Links externos (Groq, YouTube, Spotify…) abrem no navegador.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url) && !url.startsWith(`http://127.0.0.1:${PORT}`)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith(`http://127.0.0.1:${PORT}`)) { e.preventDefault(); shell.openExternal(url); }
  });
  win.on('closed', () => { win = null; });
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });

  app.whenReady().then(async () => {
    Menu.setApplicationMenu(null);
    // Microfone (falar/pronúncia) e área de transferência liberados para o app.
    const ok = new Set(['media', 'microphone', 'audioCapture', 'clipboard-read', 'clipboard-sanitized-write', 'notifications', 'speaker-selection']);
    session.defaultSession.setPermissionRequestHandler((_wc, perm, cb) => cb(ok.has(perm)));
    session.defaultSession.setPermissionCheckHandler((_wc, perm) => ok.has(perm));
    // Imagens e arquivos exportados vão direto para Downloads e a pasta abre.
    session.defaultSession.on('will-download', (_e, item) => {
      const dest = path.join(app.getPath('downloads'), item.getFilename());
      item.setSavePath(dest);
      item.once('done', (_ev, state) => { if (state === 'completed') shell.showItemInFolder(dest); });
    });
    try {
      await startServer();
    } catch (e) {
      dialog.showErrorBox('Le canard français', 'O app já está aberto ou a porta 47321 está ocupada.\n\n' + (e && e.message));
      app.quit();
      return;
    }
    ipcMain.handle('voice:status', () => voice.status());
    ipcMain.handle('voice:install', () => voice.install());
    ipcMain.handle('voice:synth', (_e, text) => voice.synth(text));
    ipcMain.handle('google:signin', (_e, opts) => google.signIn({ ...opts, port: PORT }));
    voice.onChange((st) => { if (win) win.webContents.send('voice:change', st); });
    createWindow();
    // Já começa a baixar a voz francesa em segundo plano, sem a pessoa precisar fazer nada.
    voice.install();
    app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
  });

  app.on('window-all-closed', () => app.quit());
  app.on('will-quit', () => voice.stop());
}
