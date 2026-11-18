// Mini-dicionário para “toque na palavra e veja o significado”.
// Montado a partir do vocabulário das lições, das trilhas e das histórias.
import { LESSONS } from './index';
import { VOCAB_THEMES } from './vocab';
import { STORY_LIST } from './stories';

let MAP = null;

const clean = (w) =>
  String(w || '')
    .toLowerCase()
    .replace(/\((m|f)\)/g, '')
    .replace(/[.,!?;:«»"“”()…]/g, '')
    .replace(/’/g, "'")
    .trim();

// “le chat” → “chat”, “l'école” → “école”, “un / une …” → resto
const bare = (w) => clean(w).replace(/^(le|la|les|un|une|des|du|de la|l'|d')\s*/, '').trim();

function build() {
  MAP = new Map();
  const put = (fr, pt) => {
    if (!fr || !pt) return;
    // “gentil / gentille” vira duas entradas
    String(fr).split(/\s*\/\s*/).forEach((part) => {
      const full = clean(part);
      const b = bare(part);
      if (full && !MAP.has(full)) MAP.set(full, pt);
      if (b && !MAP.has(b)) MAP.set(b, pt);
    });
  };
  LESSONS.forEach((l) => (l.vocab || []).forEach((v) => put(v.fr, v.pt)));
  VOCAB_THEMES.forEach((th) => th.words.forEach((v) => put(v.fr, v.pt)));
  STORY_LIST.forEach((st) => (st.words || []).forEach((v) => put(v.fr, v.pt)));
}

// Significado de uma palavra tocada numa frase (ou null).
export function glossOf(token) {
  if (!MAP) build();
  const w = clean(token);
  if (!w) return null;
  const tries = [w, bare(w), w.replace(/^(j|l|d|n|m|t|s|c|qu)'/, '')];
  for (const k of tries) if (k && MAP.has(k)) return MAP.get(k);
  // plural simples: “chats” → “chat”
  if (w.endsWith('s') && MAP.has(w.slice(0, -1))) return MAP.get(w.slice(0, -1));
  return null;
}
