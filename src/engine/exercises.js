// Turns lesson content into a varied, progressive exercise sequence,
// and checks typed answers with friendly tolerance.

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (arr, n) => shuffle(arr).slice(0, n);
const uniq = (arr, key = (x) => x) => {
  const seen = new Set();
  return arr.filter((x) => {
    const k = key(x);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

// ─── NORMALIZATION / CHECKING ─────────────────────────────
export function normalize(s, { accents = true } = {}) {
  let t = String(s || '')
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/œ/g, 'oe')
    .replace(/[.,!?;:«»"“”()…\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!accents) t = t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return t;
}

export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

// Returns { ok, note }
export function checkTyped(input, answer, alternatives = []) {
  const targets = [answer, ...alternatives];
  const inp = normalize(input);
  if (!inp) return { ok: false };
  for (const t of targets) if (inp === normalize(t)) return { ok: true };
  for (const t of targets) {
    if (normalize(input, { accents: false }) === normalize(t, { accents: false })) {
      return { ok: true, note: 'Quase perfeito! Atenção aos acentos: ' + t };
    }
  }
  for (const t of targets) {
    const n = normalize(t, { accents: false });
    const d = levenshtein(normalize(input, { accents: false }), n);
    if (n.length >= 6 && d === 1) return { ok: true, note: 'Pequeno erro de digitação. O certo é: ' + t };
  }
  return { ok: false };
}

export function tokenize(fr) {
  return String(fr)
    .replace(/[.!?…]+$/g, '')
    .replace(/\s+([?!:;])/g, '$1')
    .split(/\s+/)
    .map((w) => w.replace(/[,]$/, ''))
    .filter(Boolean);
}

// ─── WORD-LEVEL COMPARISON (for speaking) ─────────────────
export function compareWords(target, heard) {
  const tw = normalize(target, { accents: false }).split(' ').filter(Boolean);
  const hw = normalize(heard, { accents: false }).split(' ').filter(Boolean);
  const used = new Set();
  const words = tw.map((w) => {
    let best = { score: 0, idx: -1 };
    hw.forEach((h, i) => {
      if (used.has(i)) return;
      const d = levenshtein(w, h);
      const s = 1 - d / Math.max(w.length, h.length);
      if (s > best.score) best = { score: s, idx: i };
    });
    if (best.idx >= 0 && best.score >= 0.5) used.add(best.idx);
    const status = best.score >= 0.85 ? 'good' : best.score >= 0.5 ? 'close' : 'miss';
    return { word: w, heard: best.idx >= 0 ? hw[best.idx] : '', status, score: best.score };
  });
  const original = String(target).replace(/[.!?…,]/g, '').split(/\s+/).filter(Boolean);
  const total = words.length || 1;
  const score = Math.round((words.reduce((s, w) => s + (w.status === 'good' ? 1 : w.status === 'close' ? 0.5 : 0), 0) / total) * 100);
  return { score, words: words.map((w, i) => ({ ...w, display: original[i] || w.word })) };
}

// ─── BUILDERS ─────────────────────────────────────────────
function mkImage(item, pool) {
  const others = pick(pool.filter((v) => v.emoji && v.fr !== item.fr), 3);
  if (others.length < 3) return null;
  return { type: 'image', item, prompt: item.fr, answer: item.fr, options: shuffle([item, ...others]) };
}

function mkImagePt(item, pool) {
  // see PT word, pick the French
  const others = pick(pool.filter((v) => v.fr !== item.fr), 3);
  if (others.length < 3) return null;
  return { type: 'mcq', item, kind: 'vocab', title: 'Como se diz em francês?', prompt: '“' + item.pt + '”', answer: item.fr, options: shuffle([item.fr, ...others.map((o) => o.fr)]), audioOptions: true };
}

function mkMatch(pool) {
  const pairs = pick(uniq(pool, (v) => v.pt), 5);
  if (pairs.length < 3) return null;
  return { type: 'match', pairs };
}

function mkQuiz(q, lessonId) {
  return { type: 'mcq', title: 'Escolha a resposta certa', prompt: q.q, answer: q.a, options: shuffle(uniq(q.o)), why: q.why, item: null, lessonId };
}

function mkTranslate(item, pool) {
  const others = pick(pool.filter((s) => s.pt !== item.pt), 3).map((s) => s.pt);
  if (others.length < 2) return null;
  return { type: 'translate', item, prompt: item.fr, answer: item.pt, options: shuffle([item.pt, ...others]) };
}

function mkBuild(item, allSentences, { listen = false } = {}) {
  const tokens = tokenize(item.fr);
  if (tokens.length < 2 || tokens.length > 10) return null;
  const extraPool = uniq(allSentences.filter((s) => s.fr !== item.fr).flatMap((s) => tokenize(s.fr))).filter((w) => !tokens.includes(w));
  const distractors = pick(extraPool, Math.min(3, Math.max(2, 9 - tokens.length)));
  return { type: 'build', item, listen, prompt: item.pt, answerTokens: tokens, answer: tokens.join(' '), tokens: shuffle([...tokens, ...distractors]).map((w, i) => ({ id: i, w })) };
}

function mkListenType(item) {
  return { type: 'listen', item, answer: item.fr, pt: item.pt };
}

function mkFill(f) {
  return { type: 'fill', prompt: f.s, answer: f.a, pt: f.pt, why: f.why };
}

function mkSpeak(item) {
  return { type: 'speak', item, fr: item.fr, pt: item.pt };
}

function mkDialogue(lines) {
  if (!lines || lines.length < 3) return null;
  const slice = lines.slice(0, Math.min(5, lines.length));
  return { type: 'dialogue', lines: slice, shuffled: shuffle(slice.map((l, i) => ({ ...l, id: i }))) };
}

// ─── LESSON SEQUENCE ──────────────────────────────────────
export function buildLesson(lesson, { allSentences = [], speak = true, unitNumber = 1 } = {}) {
  const v = lesson.vocab;
  const s = lesson.sentences;
  const out = [];
  const add = (x) => x && out.push(x);

  if (lesson.story) {
    // Stories: comprehension, order the dialogue, translate, build
    add(mkDialogue(lesson.dialogue));
    lesson.quiz.forEach((q) => add(mkQuiz(q, lesson.id)));
    pick(lesson.dialogue, 2).forEach((d) => add(mkTranslate({ fr: d.fr, pt: d.pt, lessonId: lesson.id, key: 's:' + d.fr }, lesson.dialogue.map((x) => ({ fr: x.fr, pt: x.pt })))));
    s.forEach((it) => add(mkBuild(it, [...s, ...allSentences], { listen: Math.random() < 0.5 })));
    if (speak && s[0]) add(mkSpeak(s[0]));
    return out;
  }

  // 1) Recognition
  const withEmoji = v.filter((x) => x.emoji);
  pick(withEmoji, 2).forEach((it) => add(mkImage(it, withEmoji)));
  add(mkMatch(v));
  pick(v, 1).forEach((it) => add(mkImagePt(it, v)));
  // 2) Understanding
  lesson.quiz.slice(0, 3).forEach((q) => add(mkQuiz(q, lesson.id)));
  pick(s, 1).forEach((it) => add(mkTranslate(it, s)));
  // 3) Structure
  const builds = pick(s, 2);
  builds.forEach((it, i) => add(mkBuild(it, [...s, ...allSentences], { listen: i === 1 })));
  // 4) Production
  const listenItem = pick(s.filter((x) => !builds.includes(x)), 1)[0] || s[0];
  if (listenItem && unitNumber >= 2) add(mkListenType(listenItem));
  lesson.fill.slice(0, 2).forEach((f) => add(mkFill(f)));
  if (speak) {
    const sp = pick(s.filter((x) => tokenize(x.fr).length <= 7), 1)[0];
    if (sp) add(mkSpeak(sp));
  }
  add(mkDialogue(lesson.dialogue));
  if (lesson.quiz[3]) add(mkQuiz(lesson.quiz[3], lesson.id));
  return out;
}

// Unit test: harder mix from the whole unit
export function buildUnitTest(unit, { speak = false } = {}) {
  const lessons = unit.lessons.filter((l) => !l.story);
  const sentences = lessons.flatMap((l) => l.sentences);
  const vocab = lessons.flatMap((l) => l.vocab);
  const quiz = lessons.flatMap((l) => l.quiz.map((q) => ({ ...q, lessonId: l.id })));
  const fills = lessons.flatMap((l) => l.fill);
  const out = [];
  pick(quiz, 5).forEach((q) => out.push(mkQuiz(q, q.lessonId)));
  pick(fills, 3).forEach((f) => out.push(mkFill(f)));
  pick(sentences, 3).forEach((it, i) => { const b = mkBuild(it, sentences, { listen: i === 2 }); if (b) out.push(b); });
  pick(sentences, 2).forEach((it) => out.push(mkListenType(it)));
  const im = mkImagePt(pick(vocab, 1)[0], vocab); if (im) out.push(im);
  const m = mkMatch(vocab); if (m) out.push(m);
  if (speak) out.push(mkSpeak(pick(sentences.filter((x) => tokenize(x.fr).length <= 6), 1)[0] || sentences[0]));
  return shuffle(out).slice(0, 15);
}

// Review session from SRS items (words/sentences) + mistakes
export function buildReview(items, { pool = [], count = 12 } = {}) {
  const out = [];
  const words = items.filter((i) => (i.key || '').startsWith('w:'));
  const sents = items.filter((i) => !(i.key || '').startsWith('w:'));
  const vocabPool = pool.filter((p) => p.isWord);
  const sentPool = pool.filter((p) => !p.isWord);
  words.forEach((w, i) => {
    const it = { ...w, isWord: true };
    if (i % 2 === 0) out.push(mkImagePt(it, vocabPool.length >= 4 ? vocabPool : [...vocabPool, ...words]));
    else if (w.emoji) out.push(mkImage(it, vocabPool.filter((x) => x.emoji)));
    else out.push(mkImagePt(it, vocabPool));
  });
  sents.forEach((s, i) => {
    if (i % 3 === 0) out.push(mkBuild(s, sentPool));
    else if (i % 3 === 1) out.push(mkTranslate(s, sentPool));
    else out.push(mkListenType(s));
  });
  return shuffle(out.filter(Boolean)).slice(0, count);
}

export function buildFromMistakes(mistakes, count = 12) {
  return shuffle(mistakes).slice(0, count).map((m) => ({ ...m.exercise, fromMistake: m.id }));
}

export function buildBank(questions, count = 15) {
  return pick(questions, count).map((q) => ({ type: 'mcq', title: 'Escolha a resposta certa', prompt: q.q, answer: q.a, options: shuffle(q.o), why: q.why }));
}

// Snapshot an exercise for the "Meus erros" pile (no functions, small)
export function snapshot(ex) {
  const base = { prompt: ex.prompt || ex.fr || ex.answer || '', answer: ex.answer || ex.fr || '' };
  return { ...base, exercise: ex };
}
