// Ponte segura entre o app (página) e o Windows: voz francesa e login Google.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('canardDesktop', {
  version: 2,
  voice: {
    status: () => ipcRenderer.invoke('voice:status'),
    install: () => ipcRenderer.invoke('voice:install'),
    synth: (text) => ipcRenderer.invoke('voice:synth', String(text || '')),
    onChange: (cb) => {
      const fn = (_e, s) => cb(s);
      ipcRenderer.on('voice:change', fn);
      return () => ipcRenderer.removeListener('voice:change', fn);
    },
  },
  google: {
    signIn: (opts) => ipcRenderer.invoke('google:signin', opts || {}),
  },
});
