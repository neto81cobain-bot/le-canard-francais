// Google sign-in (PKCE, same flow as v1.0) → Firebase Auth via REST.
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
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
    '&code_challenge_method=S256';

  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirect);
  if (result.type !== 'success' || !result.url) throw new Error(result.type === 'cancel' || result.type === 'dismiss' ? 'cancelado' : 'Login não concluído');
  const query = result.url.includes('?') ? result.url.split('?')[1] : '';
  const code = query.split('&').map((p) => p.split('=')).find(([k]) => k === 'code')?.[1];
  if (!code) throw new Error('Código de login não recebido');

  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      'code=' + code +
      '&client_id=' + encodeURIComponent(CONFIG.googleAndroidClientId) +
      '&redirect_uri=' + encodeURIComponent(redirect) +
      '&grant_type=authorization_code' +
      '&code_verifier=' + encodeURIComponent(verifier),
  });
  const tokens = await tokenResp.json();
  if (!tokens.id_token) throw new Error('Não foi possível obter o token do Google');

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
