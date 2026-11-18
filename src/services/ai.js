// AI features (pronunciation, voice translation, conversation).
// Calls go to the Cloudflare Worker proxy (see /worker) which holds the Groq key.
// For testing, a personal Groq key can be set in Configurações → Avançado.
import { CONFIG } from './config';
import { compareWords } from '../engine/exercises';
import { markOffline, markOnline, isNetworkError } from './net';

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

class AiError extends Error {
  constructor(msg, { offline = false } = {}) {
    super(msg);
    this.offline = offline;
  }
}
const OFFLINE_MSG = 'Sem internet agora. Assim que a conexão voltar, isso funciona de novo.';
function offlineError() {
  markOffline();
  return new AiError(OFFLINE_MSG, { offline: true });
}

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
  // XMLHttpRequest (React Native's own networking) understands { uri, name, type } file parts;
  // the global fetch in this Expo version does not ("Unsupported FormDataPart implementation").
  const d = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', ep.base + '/audio/transcriptions');
    Object.entries(ep.headers || {}).forEach(([k, v]) => xhr.setRequestHeader(k, v));
    xhr.timeout = 30000;
    xhr.onload = () => {
      let body = {};
      try { body = JSON.parse(xhr.responseText || '{}'); } catch {}
      markOnline();
      if (xhr.status >= 200 && xhr.status < 300) resolve(body);
      else reject(new AiError(body?.error?.message || 'Falha na transcrição (' + xhr.status + ')'));
    };
    xhr.onerror = () => reject(offlineError());
    xhr.ontimeout = () => reject(new AiError('O servidor de IA demorou demais. Tente de novo.'));
    xhr.send(fd);
  });
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
      markOnline();
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new AiError(d?.error?.message || 'Erro ' + r.status);
      const content = d.choices?.[0]?.message?.content || '';
      return json ? parseJson(content) : content.trim();
    } catch (e) {
      if (!(e instanceof AiError) && (e instanceof TypeError || isNetworkError(e))) throw offlineError();
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
  const tr = await translateText(heard, direction);
  return { heard, translation: tr.translation || '', note: tr.note || '' };
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

// ─── WRITING CORRECTION (diary) ───────────────────────────
export async function correctWriting(text, prompt, level = 'A1') {
  const res = await chat(
    [
      {
        role: 'system',
        content: `Você é um professor de francês paciente corrigindo um texto curto de um aluno brasileiro de nível ${level}.
Tema proposto: "${prompt}".
Responda SEMPRE em JSON:
{"corrected": "o texto inteiro corrigido em francês natural, mantendo as ideias do aluno",
 "score": número de 0 a 100 (qualidade considerando o nível),
 "errors": [{"wrong": "trecho errado", "right": "forma certa", "why": "explicação curta em português"}],
 "praise": "um elogio específico e curto em português",
 "tip": "uma dica prática em português para o próximo texto"}
No máximo 6 erros, os mais importantes. Se o texto estiver em português, traduza-o em "corrected" e dê score baixo explicando que é para escrever em francês.`,
      },
      { role: 'user', content: text },
    ],
    { json: true, maxTokens: 900 }
  );
  if (!res || !res.corrected) throw new AiError('Não consegui corrigir agora. Tente de novo.');
  return {
    corrected: String(res.corrected),
    score: Math.max(0, Math.min(100, parseInt(res.score, 10) || 0)),
    errors: Array.isArray(res.errors) ? res.errors.slice(0, 6) : [],
    praise: res.praise || '',
    tip: res.tip || '',
  };
}
