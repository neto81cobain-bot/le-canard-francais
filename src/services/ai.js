// AI features (pronunciation, voice translation, conversation).
// Calls go to the Cloudflare Worker proxy (see /worker) which holds the Groq key.
// For testing, a personal Groq key can be set in Configurações → Avançado.
import { CONFIG } from './config';
import { compareWords } from '../engine/exercises';

const STT_MODEL = 'whisper-large-v3-turbo';
const CHAT_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];

let override = { apiUrl: '', key: '' };
export function setAiOverride({ apiUrl, key }) {
  override = { apiUrl: apiUrl || '', key: key || '' };
}

function endpoint() {
  const proxy = (override.apiUrl || CONFIG.apiUrl || '').replace(/\/+$/, '');
  if (proxy) return { base: proxy + '/v1', headers: { 'X-App': 'le-canard-francais' } };
  if (override.key) return { base: 'https://api.groq.com/openai/v1', headers: { Authorization: 'Bearer ' + override.key } };
  return null;
}

export function aiAvailable() {
  return !!endpoint();
}

class AiError extends Error {}

async function transcribe(uri, language = 'fr', prompt) {
  const ep = endpoint();
  if (!ep) throw new AiError('O servidor de IA ainda não foi configurado.');
  const fd = new FormData();
  fd.append('file', { uri, name: 'audio.m4a', type: 'audio/m4a' });
  fd.append('model', STT_MODEL);
  if (language) fd.append('language', language);
  if (prompt) fd.append('prompt', prompt);
  fd.append('response_format', 'json');
  fd.append('temperature', '0');
  const r = await fetch(ep.base + '/audio/transcriptions', { method: 'POST', headers: ep.headers, body: fd });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new AiError(d?.error?.message || 'Falha na transcrição (' + r.status + ')');
  return (d.text || '').trim();
}

function parseJson(text) {
  if (!text) return null;
  try { return JSON.parse(text); } catch {}
  const m = text.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}

async function chat(messages, { json = false, maxTokens = 500 } = {}) {
  const ep = endpoint();
  if (!ep) throw new AiError('O servidor de IA ainda não foi configurado.');
  let lastErr;
  for (const model of CHAT_MODELS) {
    try {
      const body = { model, messages, temperature: 0.5, max_completion_tokens: maxTokens, reasoning_effort: 'low' };
      if (json) body.response_format = { type: 'json_object' };
      const r = await fetch(ep.base + '/chat/completions', {
        method: 'POST',
        headers: { ...ep.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new AiError(d?.error?.message || 'Erro ' + r.status);
      const content = d.choices?.[0]?.message?.content || '';
      return json ? parseJson(content) : content.trim();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

// ─── PRONUNCIATION ────────────────────────────────────────
export async function evaluatePronunciation(uri, phrase) {
  const heard = await transcribe(uri, 'fr');
  if (!heard || heard.replace(/[^a-zA-ZÀ-ÿ]/g, '').length < 1) {
    return { silent: true, heard: '', score: 0, words: [], tip: 'Não ouvi nada. Fale mais perto do microfone e um pouco mais alto.' };
  }
  const cmp = compareWords(phrase.fr, heard);
  let tip = '';
  try {
    const res = await chat(
      [
        { role: 'system', content: 'Você é um professor de pronúncia francesa para brasileiros. Responda SEMPRE em JSON: {"tip": "uma dica curta e prática em português (máx. 2 frases)", "praise": "um elogio curto em português"}' },
        { role: 'user', content: `Frase alvo: "${phrase.fr}" (leitura aproximada: ${phrase.read || '-'}). O reconhecimento de voz ouviu: "${heard}". Palavras com problema: ${cmp.words.filter((w) => w.status !== 'good').map((w) => w.display).join(', ') || 'nenhuma'}.` },
      ],
      { json: true, maxTokens: 300 }
    );
    tip = [res?.praise, res?.tip].filter(Boolean).join(' ');
  } catch {}
  return { heard, ...cmp, tip };
}

// ─── VOICE / TEXT TRANSLATION ─────────────────────────────
export async function translateAudio(uri, direction = 'pt-fr') {
  const from = direction === 'pt-fr' ? 'pt' : 'fr';
  const heard = await transcribe(uri, from);
  if (!heard) return { heard: '', translation: '' };
  const translation = await translateText(heard, direction);
  return { heard, translation };
}

export async function translateText(text, direction = 'pt-fr') {
  const target = direction === 'pt-fr' ? 'francês da França' : 'português do Brasil';
  const res = await chat(
    [
      { role: 'system', content: `Traduza para ${target}, de forma natural. Responda em JSON: {"translation": "...", "note": "observação curta em português sobre gramática ou uso (opcional)"}` },
      { role: 'user', content: text },
    ],
    { json: true, maxTokens: 400 }
  );
  return res?.translation ? { translation: res.translation, note: res.note || '' } : { translation: '', note: '' };
}

// ─── CONVERSATION WITH LE CANARD ──────────────────────────
export async function conversationTurn(scenario, history, level = 'A1') {
  const system = `Você é ${scenario.role} numa conversa para treinar francês com um aluno brasileiro de nível ${scenario.level || level}.
Objetivo do aluno: ${scenario.goal}
Regras:
- Responda em francês simples e natural, adequado ao nível (frases curtas).
- Uma ou duas frases por vez, e faça uma pergunta para manter a conversa.
- Se o aluno errar, corrija com gentileza no campo "correction" (em português), mostrando a forma certa.
- Quando o objetivo for cumprido, despeça-se e marque "done": true.
Responda SEMPRE em JSON: {"reply": "...", "translation": "tradução da sua fala em português", "correction": "" , "done": false}`;
  const msgs = [{ role: 'system', content: system }, ...history.map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.from === 'user' ? m.text : JSON.stringify({ reply: m.text }) }))];
  const res = await chat(msgs, { json: true, maxTokens: 500 });
  if (!res?.reply) throw new AiError('Resposta vazia. Tente de novo.');
  return { reply: res.reply, translation: res.translation || '', correction: res.correction || '', done: !!res.done };
}

export async function transcribeFrench(uri) {
  return transcribe(uri, 'fr');
}
