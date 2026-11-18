import { EXTRA_TOPICS } from './topics';
import A1 from './a1';
import A2 from './a2';
import B1 from './b1';
import B2 from './b2';
import C1 from './c1';
import EXTRA from './extraA';
import { getVerb } from './verbs';
import legacyBank from './legacyBank.json';

const split = (s, n) => {
  const parts = String(s).split('|');
  while (parts.length < n) parts.push('');
  return parts;
};

// Verbs and tenses practised in each A1–B1 unit (B2/C1 declare their own)
const UNIT_VERBS = {
  u1: [['s\'appeler', 'être', 'parler'], ['present']],
  u2: [['être', 'avoir', 'aller'], ['present']],
  u3: [['avoir', 'être', 'aimer', 'habiter'], ['present']],
  u4: [['prendre', 'boire', 'manger', 'vouloir', 'payer'], ['present']],
  u5: [['coûter', 'acheter', 'payer', 'commencer'], ['present']],
  u6: [['parler', 'travailler', 'aller', 'faire', 'se lever', 'regarder', 'écouter'], ['present']],
  u7: [['aller', 'prendre', 'venir', 'tourner', 'descendre', 'traverser'], ['present', 'imperatif']],
  u8: [['faire', 'prendre', 'voir', 'aller', 'partir', 'manger', 'boire', 'lire'], ['passe_compose']],
  u9: [['acheter', 'essayer', 'choisir', 'préférer', 'mettre'], ['present', 'passe_compose']],
  u10: [['être', 'avoir', 'habiter', 'faire', 'aller', 'jouer'], ['imparfait', 'passe_compose']],
  u11: [['être', 'avoir', 'aller', 'faire', 'pouvoir', 'venir', 'voir'], ['futur']],
  u12: [['être', 'avoir', 'faire', 'aller', 'pouvoir', 'partir', 'finir'], ['subjonctif', 'present']],
};

function parseLesson(raw, unit, index) {
  const extra = EXTRA[raw.id] || {};
  raw = { ...raw, vocab: [...(raw.vocab || []), ...(extra.vocab || [])], sentences: [...(raw.sentences || []), ...(extra.sentences || [])], quiz: [...(raw.quiz || []), ...(extra.quiz || [])] };
  const vocab = (raw.vocab || []).map((v) => {
    const [fr, pt, emoji] = split(v, 3);
    return { fr: fr.trim(), pt: pt.trim(), emoji: emoji.trim() || null, isWord: true, lessonId: raw.id, key: 'w:' + fr.trim() };
  });
  const sentences = (raw.sentences || []).map((v) => {
    const [fr, pt] = split(v, 2);
    return { fr: fr.trim(), pt: pt.trim(), lessonId: raw.id, key: 's:' + fr.trim() };
  });
  const quiz = (raw.quiz || []).map((v) => {
    const [q, a, wrong, why] = split(v, 4);
    return { q: q.trim(), a: a.trim(), o: [a.trim(), ...wrong.split(';').map((x) => x.trim()).filter(Boolean)], why: why.trim() };
  });
  const fill = (raw.fill || []).map((v) => {
    const [s, a, pt, why] = split(v, 4);
    return { s: s.trim(), a: a.trim(), pt: pt.trim(), why: why.trim() };
  });
  const dialogue = (raw.dialogue || []).map((v) => {
    const [who, fr, pt] = split(v, 3);
    return { who: who.trim(), fr: fr.trim(), pt: pt.trim() };
  });
  const teach = (raw.teach || []).map((c) => ({
    ...c,
    ex: (c.ex || []).map((e) => {
      const [fr, pt] = split(e, 2);
      return { fr: fr.trim(), pt: pt.trim() };
    }),
  }));
  return { ...raw, unitId: unit.id, level: unit.level, index, vocab, sentences, quiz, fill, dialogue, teach };
}

export const UNITS = [...A1, ...A2, ...B1, ...B2, ...C1].map((u, ui) => {
  const [verbs, tenses] = UNIT_VERBS[u.id] || [u.verbs || [], u.tenses || ['present']];
  return {
    ...u,
    number: ui + 1,
    verbs: verbs.filter((v) => getVerb(v)),
    tenses,
    lessons: u.lessons.map((l, li) => parseLesson(l, u, li)),
  };
});

export const LESSONS = UNITS.flatMap((u) => u.lessons);
export const getUnit = (id) => UNITS.find((u) => u.id === id);
export const getLesson = (id) => LESSONS.find((l) => l.id === id);

export const LEVEL_INFO = {
  A1: { name: 'A1 · Iniciante', color: '#2A9D8F' },
  A2: { name: 'A2 · Básico', color: '#D9822B' },
  B1: { name: 'B1 · Intermediário', color: '#7C5CFC' },
  B2: { name: 'B2 · Avançado', color: '#E63946' },
  C1: { name: 'C1 · Fluente', color: '#1E3A8A' },
};

// Is a lesson available? Lessons unlock in order inside an unlocked unit.
export function lessonState(state, unit, lesson) {
  const done = !!state.lessons[lesson.id]?.done;
  if (done) return 'done';
  if (unit.number > state.unlockedUnit) return 'locked';
  const prev = unit.lessons[lesson.index - 1];
  if (!prev || state.lessons[prev.id]?.done) return 'current';
  return 'locked';
}

export function unitProgress(state, unit) {
  const done = unit.lessons.filter((l) => state.lessons[l.id]?.done).length;
  return { done, total: unit.lessons.length, pct: done / unit.lessons.length, tested: !!state.unitTests[unit.id] };
}

export function nextLesson(state) {
  for (const u of UNITS) {
    if (u.number > state.unlockedUnit) break;
    for (const l of u.lessons) if (!state.lessons[l.id]?.done) return { unit: u, lesson: l };
    if (!state.unitTests[u.id]) return { unit: u, lesson: null, test: true };
  }
  return null;
}

export function currentUnit(state) {
  const n = nextLesson(state);
  if (n) return n.unit;
  return UNITS[UNITS.length - 1];
}

// All learnable items (words + sentences) of a unit, for tests and reviews.
export function unitItems(unit) {
  return unit.lessons.flatMap((l) => [...l.vocab, ...l.sentences]);
}

// ─── LEGACY QUESTION BANK (do app 1.0) ─────────────────────
export const BANK_TOPICS = [
  { key: 'avoir', title: 'Avoir', emoji: '🤝', sub: 'Conjugação e expressões com ter', color: '#D9822B' },
  { key: 'etre', title: 'Être', emoji: '✨', sub: 'Conjugação e expressões com ser/estar', color: '#0E7490' },
  { key: 'avoir_etre', title: 'Avoir vs Être', emoji: '⚖️', sub: 'Escolha o verbo certo', color: '#E63946' },
  { key: 'fill_in', title: 'Completar frases', emoji: '✍️', sub: 'Preencha o verbo certo', color: '#7C5CFC' },
  { key: 'numbers', title: 'Nombres', emoji: '🔢', sub: 'Números em francês', color: '#2A9D8F' },
  { key: 'pronon', title: 'Pronúncia', emoji: '🗣️', sub: 'Regras de leitura', color: '#C2417B' },
  ...EXTRA_TOPICS.map(({ q, ...t }) => t),
];

export function bankQuestions(key) {
  const extra = EXTRA_TOPICS.find((t) => t.key === key);
  if (extra) return extra.q;
  return (legacyBank[key] || []).map((x) => ({
    q: x.q,
    a: x.a,
    o: Array.from(new Set(x.o)),
    why: [x.h, x.t].filter(Boolean).join(' · '),
  }));
}

export { legacyBank };
