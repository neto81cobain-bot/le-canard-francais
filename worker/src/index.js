// Le Canard Français — proxy de IA (Cloudflare Worker)
// Guarda a chave da Groq no servidor. O app chama:
//   POST /v1/audio/transcriptions   (multipart, Whisper)
//   POST /v1/chat/completions       (JSON)
// Limites: só modelos permitidos, tamanho máximo, e limite por IP.

const ALLOWED_STT = ['whisper-large-v3-turbo', 'whisper-large-v3'];
const ALLOWED_CHAT = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
const MAX_AUDIO_BYTES = 4 * 1024 * 1024; // 4 MB (~1 min)
const MAX_TOKENS = 800;
const RATE_PER_MIN = 30;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-App',
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...cors } });

// Simple per-IP limiter (per isolate; good enough to stop casual abuse)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_PER_MIN;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/') return json({ ok: true, service: 'le-canard-ai' });
    if (request.method !== 'POST') return json({ error: { message: 'Método não permitido' } }, 405);
    if (request.headers.get('X-App') !== 'le-canard-francais') return json({ error: { message: 'Não autorizado' } }, 401);
    if (!env.GROQ_API_KEY) return json({ error: { message: 'Servidor sem GROQ_API_KEY configurada' } }, 500);

    const ip = request.headers.get('CF-Connecting-IP') || 'x';
    if (limited(ip)) return json({ error: { message: 'Muitas requisições. Espere um minuto.' } }, 429);

    const auth = { Authorization: 'Bearer ' + env.GROQ_API_KEY };

    if (url.pathname === '/v1/audio/transcriptions') {
      const len = parseInt(request.headers.get('content-length') || '0', 10);
      if (len > MAX_AUDIO_BYTES) return json({ error: { message: 'Áudio muito longo' } }, 413);
      const form = await request.formData();
      const model = form.get('model');
      if (!ALLOWED_STT.includes(model)) form.set('model', ALLOWED_STT[0]);
      const r = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', { method: 'POST', headers: auth, body: form });
      return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json', ...cors } });
    }

    if (url.pathname === '/v1/chat/completions') {
      const body = await request.json().catch(() => null);
      if (!body || !Array.isArray(body.messages)) return json({ error: { message: 'Requisição inválida' } }, 400);
      if (!ALLOWED_CHAT.includes(body.model)) body.model = ALLOWED_CHAT[0];
      body.max_completion_tokens = Math.min(body.max_completion_tokens || 400, MAX_TOKENS);
      delete body.max_tokens;
      body.stream = false;
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json', ...cors } });
    }

    return json({ error: { message: 'Rota não encontrada' } }, 404);
  },
};
