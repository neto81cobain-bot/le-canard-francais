// Login com Google no app de PC: abre o navegador do usuário e o Google devolve
// para http://127.0.0.1:47321/oauthredirect (o servidor local do próprio app).
// Usa um cliente OAuth do tipo "App para computador" (o Google aceita qualquer
// porta local nesse tipo, e a "chave secreta" dele não é segredo de verdade).
const { shell, net } = require('electron');
const crypto = require('crypto');

const b64url = (buf) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
let pending = null; // { state, resolve, reject, timer }

function signIn({ clientId, clientSecret, port }) {
  if (!clientId) return Promise.reject(new Error('login-nao-configurado'));
  if (pending) { pending.reject(new Error('cancelado')); clearTimeout(pending.timer); pending = null; }
  const verifier = b64url(crypto.randomBytes(32));
  const challenge = b64url(crypto.createHash('sha256').update(verifier).digest());
  const state = b64url(crypto.randomBytes(16));
  const redirect = `http://127.0.0.1:${port}/oauthredirect`;
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth' +
    '?client_id=' + encodeURIComponent(clientId) +
    '&redirect_uri=' + encodeURIComponent(redirect) +
    '&response_type=code' +
    '&scope=' + encodeURIComponent('openid profile email') +
    '&code_challenge=' + challenge +
    '&code_challenge_method=S256' +
    '&state=' + state +
    '&prompt=select_account';
  return new Promise((resolve, reject) => {
    pending = {
      state,
      resolve: async (code) => {
        try {
          const body =
            'code=' + encodeURIComponent(code) +
            '&client_id=' + encodeURIComponent(clientId) +
            (clientSecret ? '&client_secret=' + encodeURIComponent(clientSecret) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect) +
            '&grant_type=authorization_code' +
            '&code_verifier=' + encodeURIComponent(verifier);
          const r = await net.fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
          const tokens = await r.json();
          if (!tokens.id_token) throw new Error('Google: ' + (tokens.error_description || tokens.error || 'sem token'));
          resolve({ idToken: tokens.id_token });
        } catch (e) {
          reject(e);
        }
      },
      reject,
      timer: setTimeout(() => { if (pending) { pending = null; reject(new Error('cancelado')); } }, 5 * 60 * 1000),
    };
    shell.openExternal(url);
  });
}

// Chamado pelo servidor local quando o navegador volta do Google.
// Devolve true se era um retorno de login (e a página de "pode voltar" deve aparecer).
function handleRedirect(query) {
  const q = new URLSearchParams(query || '');
  if (!q.get('code') && !q.get('error')) return false;
  const p = pending;
  if (!p) return true;
  if (q.get('state') !== p.state) return true;
  pending = null;
  clearTimeout(p.timer);
  if (q.get('code')) p.resolve(q.get('code'));
  else p.reject(new Error(q.get('error') === 'access_denied' ? 'cancelado' : q.get('error')));
  return true;
}

const PAGE = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Le canard français</title>
<style>body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0F172A;font-family:system-ui,Segoe UI,sans-serif;color:#fff}
.c{text-align:center;padding:40px;border-radius:24px;background:#1E293B;max-width:420px}h1{font-size:26px;margin:12px 0}p{color:#CBD5E1;font-size:16px;line-height:1.5}
.f{display:flex;height:8px;border-radius:4px;overflow:hidden;width:120px;margin:0 auto 18px}.f div{flex:1}</style></head>
<body><div class="c"><div class="f"><div style="background:#2453C9"></div><div style="background:#fff"></div><div style="background:#E63946"></div></div>
<div style="font-size:56px">🦆</div><h1>Pronto, deu certo!</h1><p>Pode fechar esta aba e voltar para o <b>Le canard français</b>.</p></div>
<script>setTimeout(function(){window.close()},1500)</script></body></html>`;

module.exports = { signIn, handleRedirect, PAGE };
