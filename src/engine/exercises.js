import { VERBS, TENSES, conjugate, acceptedForms, getVerb } from '../content/verbs';
import { MINIMAL_PAIRS, SOUND_GROUPS } from '../content/skills';
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

// Levenshtein + swapped neighbours count as one typo ("bonjuor" → "bonjour")
export function typoDistance(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
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
    const a = normalize(input, { accents: false });
    if (n.length < 5 || Math.abs(a.length - n.length) > 1) continue;
    const swap = typoDistance(a, n) === 1 && levenshtein(a, n) === 2; // two letters swapped
    // a single wrong/missing letter is a typo only if the ending is right —
    // endings carry grammar (parle × parles), so those stay wrong
    const sameEnd = a.slice(-1) === n.slice(-1) && a[0] === n[0];
    const lev = levenshtein(a, n);
    if (swap || (sameEnd && (lev === 1 || (n.length >= 10 && lev === 2)))) {
      return { ok: true, note: 'Pequeno erro de digitação. O certo é: ' + t };
    }
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


// Write the French sentence (PT → FR, typed). Graded word by word, tolerant.
export function mkWrite(item) {
  if (!item || !item.fr || !item.pt) return null;
  const n = tokenize(item.fr).length;
  if (n < 2 || n > 9) return null;
  return { type: 'write', item, prompt: item.pt, answer: item.fr };
}

// Minimal pair: hear one word, pick which one it was.
export function mkPairs(pair) {
  const p = pair || pick(MINIMAL_PAIRS, 1)[0];
  if (!p) return null;
  const first = Math.random() < 0.5;
  const target = first ? p.a : p.b;
  return {
    type: 'pairs',
    prompt: target,
    answer: target,
    options: shuffle([{ fr: p.a, pt: p.pa }, { fr: p.b, pt: p.pb }]),
    group: p.group,
    tip: SOUND_GROUPS[p.group]?.tip || '',
    groupTitle: SOUND_GROUPS[p.group]?.title || '',
  };
}

// True / false about a text
export function mkTrueFalse(statement, isTrue, why, context) {
  return { type: 'truefalse', prompt: statement, answer: isTrue ? 'V' : 'F', why, context };
}

// Is a typed sentence "close enough"? (for free writing)
export function checkSentence(input, answer) {
  const exact = checkTyped(input, answer);
  if (exact.ok) return exact;
  const cmp = compareWords(answer, input);
  const inLen = normalize(input, { accents: false }).split(' ').filter(Boolean).length;
  const tgtLen = cmp.words.length;
  if (cmp.score >= 85 && Math.abs(inLen - tgtLen) <= 1) return { ok: true, note: 'Quase! Compare com a forma exata: ' + answer };
  return { ok: false, words: cmp.words };
}

// ─── LESSON SEQUENCE ──────────────────────────────────────
export function buildLesson(lesson, { allSentences = [], speak = true, unitNumber = 1, verbs = [], tenses = ['present'] } = {}) {
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
  // Verbs of the unit
  if (verbs.length) {
    buildConjugation({ verbs, tenses, count: 2, choiceRatio: 0 }).forEach((c, i) => add(i === 0 || unitNumber < 2 ? mkConjugate(getVerb(c.verb), c.tense, c.person, { choice: true }) : c));
  }
  // 4) Production
  const listenItem = pick(s.filter((x) => !builds.includes(x)), 1)[0] || s[0];
  if (listenItem && unitNumber >= 2) add(mkListenType(listenItem));
  if (unitNumber <= 12 && Math.random() < 0.6) add(mkPairs());
  lesson.fill.slice(0, 2).forEach((f) => add(mkFill(f)));
  if (unitNumber >= 2) {
    const wr = pick(s.filter((x) => x !== listenItem && tokenize(x.fr).length <= 8), 1)[0];
    if (wr) add(mkWrite(wr));
  }
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
  if (unit.verbs && unit.verbs.length) buildConjugation({ verbs: unit.verbs, tenses: unit.tenses, count: 3, choiceRatio: 0.3 }).forEach((c) => out.push(c));
  return shuffle(out).slice(0, 18);
}

// Review session from SRS items (words/sentences) + mistakes
export function buildReview(items, { pool = [], count = 12 } = {}) {
  const out = [];
  const words = items.filter((i) => (i.key || '').startsWith('w:'));
  const verbs = items.filter((i) => (i.key || '').startsWith('v:'));
  const sents = items.filter((i) => !(i.key || '').startsWith('w:') && !(i.key || '').startsWith('v:'));
  verbs.forEach((it) => {
    const [, inf, tense, idx] = it.key.split(':');
    const v = getVerb(inf);
    if (v) out.push(mkConjugate(v, tense, parseInt(idx, 10)));
  });
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

// ─── VERB CONJUGATION ─────────────────────────────────────

export function mkConjugate(v, tenseId, i, { choice = false } = {}) {
  const table = conjugate(v, tenseId);
  if (!table || !table[i]) return null;
  const tense = TENSES.find((t) => t.id === tenseId);
  const cell = table[i];
  const base = {
    type: 'conjugate',
    verb: v.inf,
    verbPt: v.pt,
    tense: tenseId,
    tenseName: tense.name,
    tensePt: tense.pt,
    subject: cell.subject,
    person: i,
    answer: cell.form,
    alternatives: acceptedForms(v, tenseId, i).slice(1),
    full: cell.full,
    why: `${v.inf} (${v.pt}) · ${tense.name}: ${table.map((c) => c.full).join(' · ')}`,
    item: { fr: cell.full.replace(/ !$/, ''), pt: `${v.pt} — ${tense.pt}`, key: `v:${v.inf}:${tenseId}:${i}` },
  };
  if (!choice) return base;
  // multiple-choice version: distractors from other persons / tenses of the same verb
  const pool = new Set();
  table.forEach((c) => c.form !== cell.form && pool.add(c.form));
  TENSES.forEach((t) => {
    const tb = conjugate(v, t.id);
    if (tb && tb[i] && tb[i].form !== cell.form) pool.add(tb[i].form);
  });
  const options = shuffle([cell.form, ...shuffle([...pool]).slice(0, 3)]);
  return { ...base, choice: true, options };
}

export function buildConjugation({ verbs, tenses, count = 15, choiceRatio = 0.3 }) {
  const vs = (verbs && verbs.length ? verbs : VERBS.map((v) => v.inf)).map(getVerb).filter(Boolean);
  const ts = tenses && tenses.length ? tenses : ['present'];
  const out = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 10) {
    const v = vs[Math.floor(Math.random() * vs.length)];
    const t = ts[Math.floor(Math.random() * ts.length)];
    const n = t === 'imperatif' ? 3 : 6;
    const ex = mkConjugate(v, t, Math.floor(Math.random() * n), { choice: Math.random() < choiceRatio });
    if (ex && !out.find((o) => o.item.key === ex.item.key)) out.push(ex);
  }
  return out;
}

// ─── SKILL SESSIONS ───────────────────────────────────────
export function buildListening(pool, count = 12) {
  const sents = pool.filter((p) => !p.isWord && tokenize(p.fr).length <= 9);
  const out = [];
  pick(MINIMAL_PAIRS, Math.ceil(count / 2)).forEach((p) => out.push(mkPairs(p)));
  pick(sents, Math.floor(count / 4)).forEach((it) => out.push(mkListenType(it)));
  pick(sents, Math.floor(count / 4)).forEach((it) => out.push(mkBuild(it, sents, { listen: true })));
  return shuffle(out.filter(Boolean)).slice(0, count);
}

export function buildWriting(pool, fills = [], count = 12) {
  const sents = pool.filter((p) => !p.isWord);
  const out = [];
  pick(sents, Math.ceil(count * 0.6)).forEach((it) => out.push(mkWrite(it)));
  pick(fills, Math.ceil(count * 0.25)).forEach((f) => out.push(mkFill(f)));
  pick(sents, 2).forEach((it) => out.push(mkListenType(it)));
  return shuffle(out.filter(Boolean)).slice(0, count);
}

export function buildSpeaking(pool, count = 8) {
  const sents = pool.filter((p) => !p.isWord && tokenize(p.fr).length <= 8);
  const out = pick(sents, count).map(mkSpeak);
  pick(MINIMAL_PAIRS, 3).forEach((p) => out.splice(Math.floor(Math.random() * out.length), 0, mkPairs(p)));
  return out.filter(Boolean);
}

export function buildStoryQuiz(story) {
  const out = [];
  story.q.forEach((q) => out.push({ type: 'mcq', title: story.level >= 'B2' ? 'Compréhension' : 'Compreensão do texto', prompt: q.q, answer: q.a, options: shuffle([q.a, ...q.o]) }));
  story.tf.forEach((x) => out.push(mkTrueFalse(x.q, x.a, x.why)));
  // one translation + one sentence to write, from the text itself
  const lines = story.lines.filter((l) => l.pt && tokenize(l.fr).length <= 12);
  const tr = pick(lines, 1)[0];
  if (tr) {
    const others = pick(story.lines.filter((l) => l !== tr && l.pt), 3).map((l) => l.pt);
    if (others.length >= 2) out.push({ type: 'translate', item: { fr: tr.fr, pt: tr.pt, key: 's:' + tr.fr }, prompt: tr.fr, answer: tr.pt, options: shuffle([tr.pt, ...others]) });
  }
  const wordItems = story.words.map((w) => ({ fr: w.fr, pt: w.pt, isWord: true }));
  if (wordItems.length >= 4) out.push({ type: 'match', pairs: pick(wordItems, 5) });
  return shuffle(out);
}

// 5-minute mixed workout: review + listening + writing + speaking
export function buildQuick(items, pool) {
  const out = [];
  if (items.length) out.push(...buildReview(items.slice(0, 5), { pool, count: 5 }));
  const sents = pool.filter((p) => !p.isWord && tokenize(p.fr).length <= 8);
  pick(MINIMAL_PAIRS, 2).forEach((p) => out.push(mkPairs(p)));
  pick(sents, 2).forEach((it) => out.push(mkWrite(it)));
  const l = pick(sents, 1)[0];
  if (l) out.push(mkListenType(l));
  const vocab = pool.filter((p) => p.isWord);
  if (out.length < 9 && vocab.length >= 4) out.push(mkMatch(vocab));
  const sp = pick(sents.filter((x) => tokenize(x.fr).length <= 6), 1)[0];
  const body = shuffle(out.filter(Boolean)).slice(0, 10);
  if (sp) body.push(mkSpeak(sp));
  return body;
}

// ─── 2.4: themed vocab, sound groups, long dictation, shadowing ──────────
export function buildVocab(words, count = 14) {
  const list = (words || []).filter((w) => w && w.fr);
  if (list.length < 4) return [];
  const out = [];
  pick(list, Math.min(list.length, 10)).forEach((w, i) => {
    const r = i % 4;
    if (r === 0 && w.emoji) out.push(mkImage(w, list));
    else if (r === 1) out.push(mkImagePt(w, list));
    else if (r === 2) out.push(mkListenType(w));
    else out.push(mkImagePt(w, list) || mkListenType(w));
  });
  out.push(mkMatch(list));
  out.push(mkMatch(list));
  return shuffle(out.filter(Boolean)).slice(0, count);
}

export function buildPairsGroup(group, count = 12) {
  const src = group ? MINIMAL_PAIRS.filter((p) => p.group === group) : MINIMAL_PAIRS;
  if (!src.length) return [];
  const out = [];
  while (out.length < count) out.push(...shuffle(src).map((p) => mkPairs(p)));
  return out.filter(Boolean).slice(0, count);
}

export function mkDictation(item) {
  return { type: 'listen', long: true, title: 'Ditado longo', item, answer: item.fr, pt: item.pt };
}

export function buildDictation(sentences, count = 8) {
  const long = (sentences || []).filter((s) => s && s.fr && s.pt && tokenize(s.fr).length >= 5 && tokenize(s.fr).length <= 16);
  return pick(long, count).map(mkDictation);
}

export function buildShadowing(lines) {
  return (lines || []).filter((l) => l && l.fr && tokenize(l.fr).length <= 14).slice(0, 10).map((l) => ({ ...mkSpeak({ fr: l.fr, pt: l.pt, key: 's:' + l.fr }), shadow: true }));
}

// group a mistakes list by what kind of exercise it was
export const MISTAKE_GROUPS = [
  { id: 'vocab', title: 'Vocabulário', emoji: '🔤', types: ['image', 'translate', 'mcq-vocab', 'match'] },
  { id: 'listen', title: 'Escuta e ditado', emoji: '👂', types: ['listen', 'pairs'] },
  { id: 'grammar', title: 'Gramática', emoji: '📐', types: ['fill', 'mcq', 'truefalse'] },
  { id: 'write', title: 'Escrita e frases', emoji: '✍️', types: ['write', 'build', 'dialogue'] },
  { id: 'verbs', title: 'Verbos', emoji: '🔁', types: ['conjugate'] },
];
export function mistakeGroupOf(m) {
  const ex = m?.exercise || m;
  const ty = ex?.type === 'mcq' && ex?.kind === 'vocab' ? 'mcq-vocab' : ex?.type;
  return (MISTAKE_GROUPS.find((g) => g.types.includes(ty)) || MISTAKE_GROUPS[2]).id;
}
