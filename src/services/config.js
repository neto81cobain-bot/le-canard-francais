import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};

export const CONFIG = {
  // Google / Firebase (same project as version 1.0)
  googleAndroidClientId: extra.googleAndroidClientId || '1091898156126-k97of523p6857slq1kpntqnk3ro8804u.apps.googleusercontent.com',
  firebaseApiKey: extra.firebaseApiKey || 'AIzaSyAqXNcFn6ZYogW-S7pgbTOJ_MmtxqHHhUw',
  firebaseProjectId: extra.firebaseProjectId || 'app-frances-7b500',
  firebaseDbUrl: extra.firebaseDbUrl || 'https://app-frances-7b500-default-rtdb.firebaseio.com',
  oauthRedirect: (extra.scheme || 'com.raimundo.lecanardfrancais') + ':/oauthredirect',
  // App de PC: cliente OAuth do tipo "App para computador" (mesmo projeto do Firebase).
  // A "chave secreta" desse tipo de cliente não é segredo (o Google trata como pública).
  googleDesktopClientId: extra.googleDesktopClientId || '1091898156126-ip3ereb1cbn3hohdtdmqdem2r7ql32mi.apps.googleusercontent.com',
  googleDesktopClientSecret: extra.googleDesktopClientSecret || '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',
  // AI proxy (Cloudflare Worker in /worker). The Groq key lives ONLY on the server.
  apiUrl: extra.apiUrl || '',
  // GitHub repository used by "Buscar atualizações" (owner/repo)
  githubRepo: extra.githubRepo || '',
  pixKey: extra.pixKey || 'fb8466be-de0f-4e83-87c9-5164c952f76f',
  pixName: extra.pixName || 'RAIMUNDO MOREIRA DA SILVA NETO',
  pixBank: extra.pixBank || 'Inter',
};
