// Google sign-in (PKCE, same flow as v1.0) → Firebase Auth via REST.
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from './config';

WebBrowser.maybeCompleteAuthSession();

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function base64url(bytes) {
  let out = '';
  let i = 0;
  for (; i + 2 < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63] + B64[n & 63];
  }
  const rest = bytes.length - i;
  if (rest === 1) {
    const n = bytes[i] << 16;
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
  } else if (rest === 2) {
    const n = (bytes[i] << 16) | (bytes[i + 1] << 8);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63];
  }
  return out;
}

// The Google redirect (com.raimundo.lecanardfrancais:/oauthredirect?code=…) can reach the app
// in two ways: through openAuthSessionAsync, or as a deep link that expo-router opens
// on the /oauthredirect screen. Both feed the same code into this module.
const PENDING_KEY = 'lcf_oauth_pending';
let pending = null; // { verifier, redirect, resolve }
const exchanges = {}; // code -> promise (never exchange the same code twice)

function codeFromUrl(url) {
  const q = (url || '').split('?')[1] || '';
  const hit = q.split('&').map((p) => p.split('=')).find(([k]) => k === 'code');
  return hit ? decodeURIComponent(hit[1]) : null;
}

// Called by src/app/oauthredirect.js when the deep link opens that screen.
// Returns { handled: true } when a sign-in in progress took the code,
// or the auth object when the app was cold-started by the redirect.
export async function handleOAuthRedirect(code) {
  if (!code) return { handled: false };
  if (pending?.resolve) {
    pending.resolve(code);
    return { handled: true };
  }
  try {
    const saved = JSON.parse((await AsyncStorage.getItem(PENDING_KEY)) || 'null');
    if (!saved?.verifier || Date.now() - saved.at > 10 * 60 * 1000) return { handled: false };
    const auth = await exchangeCode(code, saved.verifier, saved.redirect);
    await AsyncStorage.removeItem(PENDING_KEY).catch(() => {});
    return { handled: false, auth };
  } catch (e) {
    return { handled: false, error: e.message };
  }
}

function exchangeCode(code, verifier, redirect) {
  if (!exchanges[code]) exchanges[code] = doExchange(code, verifier, redirect);
  return exchanges[code];
}

async function doExchange(code, verifier, redirect) {
  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      'code=' + encodeURIComponent(code) +
      '&client_id=' + encodeURIComponent(CONFIG.googleAndroidClientId) +
      '&redirect_uri=' + encodeURIComponent(redirect) +
      '&grant_type=authorization_code' +
      '&code_verifier=' + encodeURIComponent(verifier),
  });
  const tokens = await tokenResp.json();
  if (!tokens.id_token) throw new Error('Não foi possível obter o token do Google' + (tokens.error ? ` (${tokens.error})` : ''));

  const fbResp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=' + CONFIG.firebaseApiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      postBody: 'id_token=' + tokens.id_token + '&providerId=google.com',
      requestUri: 'http://localhost',
      returnIdpCredential: true,
      returnSecureToken: true,
    }),
  });
  const fb = await fbResp.json();
  if (!fb.idToken) throw new Error('Firebase: ' + (fb.error?.message || 'erro desconhecido'));

  return {
    uid: fb.localId,
    idToken: fb.idToken,
    refreshToken: fb.refreshToken,
    expiresAt: Date.now() + (parseInt(fb.expiresIn || '3600', 10) - 120) * 1000,
    name: fb.displayName || fb.fullName || 'Aluno',
    email: fb.email || '',
    photo: fb.photoUrl || null,
  };
}

export async function signInWithGoogle() {
  const bytes = await Crypto.getRandomBytesAsync(32);
  const verifier = base64url(bytes);
  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, verifier, { encoding: Crypto.CryptoEncoding.BASE64 });
  const challenge = digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const redirect = CONFIG.oauthRedirect;

  const authUrl =
    'https://accounts.google.com/o/oauth2/v2/auth' +
    '?client_id=' + encodeURIComponent(CONFIG.googleAndroidClientId) +
    '&redirect_uri=' + encodeURIComponent(redirect) +
    '&response_type=code' +
    '&scope=' + encodeURIComponent('openid profile email') +
    '&code_challenge=' + challenge +
    '&code_challenge_method=S256' +
    '&prompt=select_account';

  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify({ verifier, redirect, at: Date.now() })).catch(() => {});
  let fromLink;
  const linkCode = new Promise((resolve) => { fromLink = resolve; });
  pending = { verifier, redirect, resolve: fromLink };

  try {
    const browser = WebBrowser.openAuthSessionAsync(authUrl, redirect).then((r) => {
      if (r.type === 'success' && r.url) return codeFromUrl(r.url);
      // The browser may close before the deep link arrives — give it a moment.
      return new Promise((res) => setTimeout(() => res(null), 2500));
    });
    const code = await Promise.race([linkCode, browser.then((c) => c || Promise.race([linkCode, Promise.resolve(null)]))]);
    try { Promise.resolve(WebBrowser.dismissAuthSession()).catch(() => {}); } catch {}
    if (!code) throw new Error('cancelado');
    const auth = await exchangeCode(code, verifier, redirect);
    await AsyncStorage.removeItem(PENDING_KEY).catch(() => {});
    return auth;
  } finally {
    pending = null;
  }
}

// Firebase ID tokens last one hour — refresh when needed.
export async function freshToken(auth) {
  if (!auth) return null;
  if (auth.expiresAt && Date.now() < auth.expiresAt) return auth;
  if (!auth.refreshToken) return null;
  const r = await fetch('https://securetoken.googleapis.com/v1/token?key=' + CONFIG.firebaseApiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(auth.refreshToken),
  });
  const d = await r.json();
  if (!d.id_token) return null;
  return {
    ...auth,
    idToken: d.id_token,
    refreshToken: d.refresh_token || auth.refreshToken,
    expiresAt: Date.now() + (parseInt(d.expires_in || '3600', 10) - 120) * 1000,
  };
}
