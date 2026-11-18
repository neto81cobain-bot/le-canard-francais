// Pure game logic: levels, streak, missions, achievements, spaced repetition.
// Kept free of React so it can be tested with plain Node.

import { dayKey, addDays, diffDays, weekKey } from './dates';

// ─── LEVELS ────────────────────────────────────────────────
export const LEVELS = [
  { min: 0, name: 'Débutant', pt: 'Iniciante', emoji: '🥚' },
  { min: 300, name: 'Curieux', pt: 'Curioso', emoji: '🐣' },
  { min: 1000, name: 'Apprenti', pt: 'Aprendiz', emoji: '🦆' },
  { min: 2500, name: 'Voyageur', pt: 'Viajante', emoji: '🧳' },
  { min: 5000, name: 'Étudiant', pt: 'Estudante', emoji: '📚' },
  { min: 9000, name: 'Parisien', pt: 'Parisiense', emoji: '🗼' },
  { min: 15000, name: 'Bavard', pt: 'Falante', emoji: '💬' },
  { min: 25000, name: 'Expert', pt: 'Especialista', emoji: '🎓' },
  { min: 40000, name: 'Maître', pt: 'Mestre', emoji: '👑' },
  { min: 70000, name: 'Légende', pt: 'Lenda', emoji: '🌟' },
];

export function levelInfo(xp = 0) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) idx = i;
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const span = next ? next.min - cur.min : 1;
  const into = xp - cur.min;
  return {
    index: idx,
    ...cur,
    next,
    progress: next ? Math.min(1, into / span) : 1,
    toNext: next ? next.min - xp : 0,
  };
}

// ─── LEAGUES ───────────────────────────────────────────────
export const LEAGUES = [
  { id: 'bronze', name: 'Bronze', color: '#B87333', emoji: '🥉' },
  { id: 'prata', name: 'Prata', color: '#9CA3AF', emoji: '🥈' },
  { id: 'ouro', name: 'Ouro', color: '#E0A526', emoji: '🥇' },
  { id: 'safira', name: 'Safira', color: '#2563EB', emoji: '💎' },
  { id: 'rubi', name: 'Rubi', color: '#E11D48', emoji: '❤️‍🔥' },
  { id: 'eiffel', name: 'Tour Eiffel', color: '#1E3A8A', emoji: '🗼' },
];

// ─── STREAK ────────────────────────────────────────────────
// A day counts when the daily goal (in XP) is reached.
export function goalXP(minutes = 10) {
  return { 5: 30, 10: 50, 15: 80, 20: 120 }[minutes] || 50;
}

export function refreshStreak(streak, today = dayKey()) {
  // Called on app open: applies freezes for missed days or resets.
  const s = { count: 0, best: 0, lastDay: null, freezes: 0, frozenDays: [], ...streak };
  if (!s.lastDay) return s;
  const gap = diffDays(s.lastDay, today);
  if (gap <= 1) return s;
  const missed = gap - 1;
  if (s.freezes >= missed) {
    const frozen = [];
    for (let i = 1; i <= missed; i++) frozen.push(addDays(s.lastDay, i));
    return {
      ...s,
      freezes: s.freezes - missed,
      lastDay: addDays(today, -1),
      frozenDays: [...(s.frozenDays || []), ...frozen].slice(-60),
      usedFreeze: true,
    };
  }
  return { ...s, count: 0, lastDay: null, lost: s.count };
}

export function hitGoal(streak, today = dayKey()) {
  const s = { count: 0, best: 0, lastDay: null, freezes: 0, ...streak };
  if (s.lastDay === today) return { streak: s, extended: false };
  const yesterday = addDays(today, -1);
  const count = s.lastDay === yesterday ? s.count + 1 : 1;
  return {
    streak: { ...s, count, best: Math.max(s.best || 0, count), lastDay: today, lost: undefined, usedFreeze: undefined },
    extended: true,
  };
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];

// ─── DAILY MISSIONS ───────────────────────────────────────
// 16 kinds × 5 levels = 80 missions; 5 are drawn per day (one per kind), harder as you advance.
const MISSION_KINDS = [
  { k: 'xp', icon: 'bolt', t: (n) => `Ganhe ${n} XP`, steps: [30, 50, 80, 120, 160] },
  { k: 'lessons', icon: 'book', t: (n) => `Complete ${n} ${n > 1 ? 'lições' : 'lição'}`, steps: [1, 2, 3, 4, 5] },
  { k: 'perfect', icon: 'star', t: (n) => (n > 1 ? `Faça ${n} sessões sem erros` : 'Faça uma sessão sem erros'), steps: [1, 1, 2, 2, 3] },
  { k: 'correct', icon: 'target', t: (n) => `Acerte ${n} exercícios`, steps: [15, 25, 40, 60, 80] },
  { k: 'spoken', icon: 'mic', t: (n) => `Fale ${n} frases em voz alta`, steps: [3, 5, 8, 12, 15] },
  { k: 'reviews', icon: 'refresh', t: (n) => `Faça ${n} ${n > 1 ? 'revisões inteligentes' : 'revisão inteligente'}`, steps: [1, 1, 2, 2, 3] },
  { k: 'combo', icon: 'flame', t: (n) => `Acerte ${n} seguidas`, steps: [5, 8, 10, 15, 20] },
  { k: 'listen', icon: 'headphones', t: (n) => `Acerte ${n} exercícios de escuta`, steps: [5, 8, 12, 16, 20] },
  { k: 'verbs', icon: 'edit', t: (n) => `Acerte ${n} conjugações`, steps: [5, 10, 15, 20, 30] },
  { k: 'minutes', icon: 'clock', t: (n) => `Estude ${n} minutos`, steps: [5, 10, 15, 20, 30] },
  { k: 'stories', icon: 'book', t: (n) => `Leia ${n} ${n > 1 ? 'textos' : 'texto'} da Biblioteca`, steps: [1, 1, 2, 2, 3] },
  { k: 'written', icon: 'edit', t: (n) => `Escreva ${n} frases em francês`, steps: [3, 5, 8, 10, 15] },
  { k: 'pairs', icon: 'headphones', t: (n) => `Acerte ${n} pares de sons`, steps: [5, 8, 10, 12, 15] },
  { k: 'unitPractice', icon: 'target', t: (n) => `Faça ${n} ${n > 1 ? 'treinos' : 'treino'} de unidade`, steps: [1, 1, 2, 2, 3] },
  { k: 'kindsCount', icon: 'sparkles', t: (n) => `Pratique ${n} tipos diferentes de atividade`, steps: [2, 3, 3, 4, 5] },
  { k: 'saved', icon: 'bookmark', t: (n) => `Salve ${n} ${n > 1 ? 'frases' : 'frase'} nos favoritos`, steps: [1, 2, 3, 4, 5] },
];
export const MISSION_POOL = MISSION_KINDS.flatMap((m) => m.steps.map((n, i) => ({ id: `${m.k}-${i}`, title: m.t(n), icon: m.icon, metric: m.k, target: n, level: i })));
// old ids kept so saved days still show
const LEGACY_MISSIONS = { xp30: 'xp-0', xp60: 'xp-2', lesson1: 'lessons-0', lesson2: 'lessons-1', perfect: 'perfect-0', correct15: 'correct-0', correct25: 'correct-1', speak3: 'spoken-0', review1: 'reviews-0', combo5: 'combo-0', listen5: 'listen-0', verbs10: 'verbs-1', minutes10: 'minutes-1', story1: 'stories-0', write3: 'written-0', pairs5: 'pairs-0' };


function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

export const MISSIONS_PER_DAY = 5;
export function missionsFor(date, unit = 1) {
  const rnd = seeded('missions-' + date);
  const kinds = [...MISSION_KINDS];
  const picked = [];
  const maxLevel = Math.min(4, Math.floor((unit - 1) / 4) + 1); // unit 1-4: levels 0-1 … unit 13+: up to 4
  while (picked.length < MISSIONS_PER_DAY && kinds.length) {
    const k = kinds.splice(Math.floor(rnd() * kinds.length), 1)[0];
    const lvl = Math.floor(rnd() * (maxLevel + 1));
    picked.push(MISSION_POOL.find((m) => m.id === `${k.k}-${lvl}`));
  }
  return picked.filter(Boolean);
}

export function freshDaily(date = dayKey(), unit = 1) {
  return {
    date,
    xp: 0,
    lessons: 0,
    perfect: 0,
    correct: 0,
    spoken: 0,
    reviews: 0,
    combo: 0,
    listen: 0,
    verbs: 0,
    stories: 0,
    written: 0,
    pairs: 0,
    seconds: 0,
    goalHit: false,
    chestOpened: false,
    unitPractice: 0,
    saved: 0,
    kinds: [],
    missions: missionsFor(date, unit).map((m) => m.id),
  };
}

export function missionProgress(daily) {
  return daily.missions.map((id) => {
    const m = MISSION_POOL.find((x) => x.id === (LEGACY_MISSIONS[id] || id)) || MISSION_POOL[0];
    const raw = m.metric === 'minutes' ? Math.floor((daily.seconds || 0) / 60) : m.metric === 'kindsCount' ? (daily.kinds || []).length : daily[m.metric] || 0;
    return { ...m, value: Math.min(raw, m.target), done: raw >= m.target };
  });
}

// ─── SPACED REPETITION (SM-2 light) ───────────────────────
// Each item: { fr, pt, ease, interval (days), reps, due (ms), lapses, lessonId }
const DAY = 86400000;

export function srsReview(item, correct, now = Date.now()) {
  const it = { ease: 2.5, interval: 0, reps: 0, lapses: 0, ...item };
  if (correct) {
    it.reps += 1;
    if (it.reps === 1) it.interval = 1;
    else if (it.reps === 2) it.interval = 3;
    else it.interval = Math.round(it.interval * it.ease);
    it.ease = Math.min(3.0, it.ease + 0.05);
  } else {
    it.reps = 0;
    it.lapses += 1;
    it.interval = 0;
    it.ease = Math.max(1.3, it.ease - 0.2);
  }
  it.due = now + (it.interval === 0 ? 10 * 60 * 1000 : it.interval * DAY);
  it.last = now;
  return it;
}

export function strength(item, now = Date.now()) {
  // 0..1 — how fresh the memory is
  if (!item || !item.last) return 0;
  const intervalMs = Math.max(1, item.interval || 0.5) * DAY;
  const elapsed = now - item.last;
  return Math.max(0, Math.min(1, 1 - elapsed / (intervalMs * 2)));
}

export function dueItems(srs, now = Date.now(), limit = 20) {
  return Object.entries(srs || {})
    .map(([key, v]) => ({ key, ...v }))
    .filter((v) => (v.due || 0) <= now)
    .sort((a, b) => (a.due || 0) - (b.due || 0))
    .slice(0, limit);
}

export function weakestItems(srs, now = Date.now(), limit = 20) {
  return Object.entries(srs || {})
    .map(([key, v]) => ({ key, ...v, s: strength(v, now) }))
    .sort((a, b) => a.s - b.s)
    .slice(0, limit);
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: 'first_lesson', title: 'Premier pas', desc: 'Conclua sua primeira lição', emoji: '👣', test: (s) => s.stats.lessons >= 1 },
  { id: 'lessons10', title: 'Dedicado', desc: 'Conclua 10 lições', emoji: '📘', test: (s) => s.stats.lessons >= 10 },
  { id: 'lessons50', title: 'Incansável', desc: 'Conclua 50 lições', emoji: '📚', test: (s) => s.stats.lessons >= 50 },
  { id: 'perfect1', title: 'Sans faute', desc: 'Uma lição sem nenhum erro', emoji: '✨', test: (s) => s.stats.perfect >= 1 },
  { id: 'perfect10', title: 'Perfectionniste', desc: '10 lições sem erros', emoji: '💎', test: (s) => s.stats.perfect >= 10 },
  { id: 'streak3', title: 'Aquecendo', desc: 'Streak de 3 dias', emoji: '🔥', test: (s) => s.streak.best >= 3 },
  { id: 'streak7', title: 'Uma semana!', desc: 'Streak de 7 dias', emoji: '📅', test: (s) => s.streak.best >= 7 },
  { id: 'streak30', title: 'Hábito de ferro', desc: 'Streak de 30 dias', emoji: '🏅', test: (s) => s.streak.best >= 30 },
  { id: 'streak100', title: 'Centenário', desc: 'Streak de 100 dias', emoji: '💯', test: (s) => s.streak.best >= 100 },
  { id: 'xp1000', title: 'Mil pontos', desc: 'Some 1.000 XP', emoji: '⚡', test: (s) => s.xp >= 1000 },
  { id: 'xp10000', title: 'Dez mil!', desc: 'Some 10.000 XP', emoji: '🌩️', test: (s) => s.xp >= 10000 },
  { id: 'unit1', title: 'Primeira unidade', desc: 'Passe no teste de uma unidade', emoji: '🎯', test: (s) => Object.keys(s.unitTests || {}).length >= 1 },
  { id: 'a1', title: 'Nível A1', desc: 'Passe em todas as unidades A1', emoji: '🥖', test: (s) => ['u1', 'u2', 'u3', 'u4', 'u5'].every((u) => (s.unitTests || {})[u]) },
  { id: 'a2', title: 'Nível A2', desc: 'Passe em todas as unidades A2', emoji: '🥐', test: (s) => ['u6', 'u7', 'u8', 'u9'].every((u) => (s.unitTests || {})[u]) },
  { id: 'b1', title: 'Nível B1', desc: 'Passe em todas as unidades B1', emoji: '🍷', test: (s) => ['u10', 'u11', 'u12'].every((u) => (s.unitTests || {})[u]) },
  { id: 'b2', title: 'Nível B2', desc: 'Passe em todas as unidades B2', emoji: '🧀', test: (s) => ['u13', 'u14', 'u15', 'u16'].every((u) => (s.unitTests || {})[u]) },
  { id: 'c1', title: 'Nível C1', desc: 'Passe em todas as unidades C1', emoji: '🗼', test: (s) => ['u17', 'u18', 'u19', 'u20'].every((u) => (s.unitTests || {})[u]) },
  { id: 'verbs50', title: 'Conjugador', desc: 'Acerte 50 conjugações', emoji: '🔤', test: (s) => Object.keys(s.srs || {}).filter((k) => k.startsWith('v:') && (s.srs[k].reps || 0) > 0).length >= 50 },
  { id: 'verbs300', title: 'Mestre dos verbos', desc: 'Acerte 300 conjugações diferentes', emoji: '📖', test: (s) => Object.keys(s.srs || {}).filter((k) => k.startsWith('v:') && (s.srs[k].reps || 0) > 0).length >= 300 },
  { id: 'spoken10', title: 'Primeiras palavras', desc: 'Fale 10 frases', emoji: '🎤', test: (s) => s.stats.spoken >= 10 },
  { id: 'spoken100', title: 'Tagarela', desc: 'Fale 100 frases', emoji: '🗣️', test: (s) => s.stats.spoken >= 100 },
  { id: 'words50', title: 'Vocabulário 50', desc: 'Aprenda 50 palavras', emoji: '🔤', test: (s) => Object.keys(s.words || {}).length >= 50 },
  { id: 'words200', title: 'Vocabulário 200', desc: 'Aprenda 200 palavras', emoji: '📖', test: (s) => Object.keys(s.words || {}).length >= 200 },
  { id: 'reviews10', title: 'Memória afiada', desc: 'Faça 10 revisões', emoji: '🧠', test: (s) => s.stats.reviews >= 10 },
  { id: 'combo10', title: 'Combo x10', desc: 'Acerte 10 seguidas', emoji: '🎰', test: (s) => s.stats.bestCombo >= 10 },
  { id: 'combo25', title: 'Imparável', desc: 'Acerte 25 seguidas', emoji: '🚀', test: (s) => s.stats.bestCombo >= 25 },
  { id: 'timed20', title: 'Contra o relógio', desc: '20 acertos no modo tempo', emoji: '⏱️', test: (s) => s.stats.timedBest >= 20 },
  { id: 'early', title: 'Madrugador', desc: 'Estude antes das 7h', emoji: '🌅', test: (s) => s.stats.early >= 1 },
  { id: 'night', title: 'Coruja', desc: 'Estude depois das 23h', emoji: '🦉', test: (s) => s.stats.night >= 1 },
  { id: 'conversation', title: 'Bate-papo', desc: 'Termine uma conversa com o Canard', emoji: '☕', test: (s) => s.stats.conversations >= 1 },
  { id: 'chest10', title: 'Caçador de baús', desc: 'Abra 10 baús', emoji: '🧰', test: (s) => s.stats.chests >= 10 },
  { id: 'shopper', title: 'Fashion canard', desc: 'Compre um item na loja', emoji: '🛍️', test: (s) => (s.inventory?.owned || []).length >= 1 },
  { id: 'friend', title: 'Mon ami', desc: 'Adicione um amigo', emoji: '🤝', test: (s) => (s.friends || []).length >= 1 },
  { id: 'league_up', title: 'Subindo!', desc: 'Suba de divisão no Clube', emoji: '📈', test: (s) => (s.league?.tier || 0) >= 1 },
  { id: 'story1', title: 'Primeira leitura', desc: 'Leia uma história até o fim', emoji: '📗', test: (s) => Object.keys(s.stories || {}).filter((k) => /^s\d/.test(k)).length >= 1 },
  { id: 'story10', title: 'Leitor assíduo', desc: 'Leia 10 histórias', emoji: '📚', test: (s) => Object.keys(s.stories || {}).filter((k) => /^s\d/.test(k)).length >= 10 },
  { id: 'story20', title: 'Biblioteca completa', desc: 'Leia 20 histórias', emoji: '🏛️', test: (s) => Object.keys(s.stories || {}).filter((k) => /^s\d/.test(k)).length >= 20 },
  { id: 'story60', title: 'Enciclopédia ambulante', desc: 'Leia todas as 60 histórias', emoji: '📚', test: (s) => Object.keys(s.stories || {}).filter((k) => /^s\d/.test(k)).length >= 60 },
  { id: 'adv1', title: 'Aventureiro', desc: 'Termine uma aventura interativa', emoji: '🎮', test: (s) => Object.keys(s.adventures || {}).length >= 1 },
  { id: 'advbest', title: 'Diplomata', desc: 'Final perfeito em 5 aventuras', emoji: '🕊️', test: (s) => Object.values(s.adventures || {}).filter((a) => a.best).length >= 5 },
  { id: 'stylist', title: 'Estilista', desc: 'Vista o Canard com 4 itens ao mesmo tempo', emoji: '👗', test: (s) => Object.keys((s.inventory && s.inventory.wear) || {}).length >= 4 },
  { id: 'medal1', title: 'Medalhista', desc: 'Complete um desafio semanal', emoji: '🏅', test: (s) => Object.keys(s.medals || {}).length >= 1 },
  { id: 'medal5', title: 'Colecionador de medalhas', desc: 'Complete 5 desafios semanais', emoji: '🎖️', test: (s) => Object.keys(s.medals || {}).length >= 5 },
  { id: 'placement', title: 'Raio-X do francês', desc: 'Faça o teste de nível', emoji: '🩻', test: (s) => !!s.placement },
  { id: 'story40', title: 'Rato de biblioteca', desc: 'Leia 40 histórias', emoji: '🐭', test: (s) => Object.keys(s.stories || {}).filter((k) => /^s\d/.test(k)).length >= 40 },
  { id: 'writer', title: 'Escritor', desc: 'Escreva 5 textos no diário', emoji: '✍️', test: (s) => (s.diary || []).length >= 5 },
  { id: 'duel', title: 'Duelista', desc: 'Vença um duelo contra um amigo', emoji: '⚔️', test: (s) => (s.stats.duelsWon || 0) >= 1 },
  { id: 'ear', title: 'Ouvido afiado', desc: 'Acerte 50 pares de sons', emoji: '👂', test: (s) => (s.stats.pairs || 0) >= 50 },
  { id: 'avoir_master', title: 'Rei do Avoir', desc: '90% no treino de Avoir', emoji: '🤝', test: (s) => (s.bankBest?.avoir || 0) >= 90 },
  { id: 'etre_master', title: 'Rainha do Être', desc: '90% no treino de Être', emoji: '✨', test: (s) => (s.bankBest?.etre || 0) >= 90 },
];

export function newAchievements(state) {
  const have = state.achievements || {};
  return ACHIEVEMENTS.filter((a) => !have[a.id]).filter((a) => {
    try { return a.test(state); } catch { return false; }
  });
}

// ─── XP RULES ─────────────────────────────────────────────
export function lessonXP({ correct, total, perfect, comboBest, timed }) {
  let xp = correct * 2 + 10;
  if (perfect) xp += 10;
  if (comboBest >= 5) xp += 5;
  if (timed) xp += Math.floor(correct / 2);
  return Math.max(5, xp);
}

export function chestReward(seedStr) {
  const r = seeded('chest-' + seedStr)();
  if (r < 0.1) return { coins: 60, xp: 20, freeze: 1 };
  if (r < 0.45) return { coins: 40, xp: 15 };
  return { coins: 25, xp: 10 };
}

// slot = where it goes on the duck (drawn in components/duckArt.js; held/ground are emoji).
// unlock = can't be bought: it is earned (test receives the whole state).
export const SHOP = [
  { id: 'freeze', title: 'Croissant de reserva', desc: 'Protege seu streak por 1 dia perdido', price: 60, emoji: '🥐', kind: 'freeze' },
  // the classic Parisian look
  { id: 'boina', title: 'Boina francesa', desc: 'O clássico de Paris', price: 60, emoji: '🎨', icon: 'boina', kind: 'outfit', slot: 'head' },
  { id: 'mustache', title: 'Bigode de mosqueteiro', desc: 'Très distingué', price: 40, emoji: '🥸', icon: 'mustache', kind: 'outfit', slot: 'face' },
  { id: 'lenco', title: 'Lenço bleu-blanc-rouge', desc: 'As cores da França', price: 60, emoji: '🇫🇷', icon: 'lenco', kind: 'outfit', slot: 'neck' },
  // head
  { id: 'beret', title: 'Boné', desc: 'Estilo turista', price: 100, emoji: '🧢', kind: 'outfit', slot: 'head' },
  { id: 'chef', title: 'Cartola', desc: 'Para a ópera de Paris', price: 200, emoji: '🎩', kind: 'outfit', slot: 'head' },
  { id: 'toque', title: 'Chapéu de chef', desc: 'Pronto para o bistrô', price: 160, emoji: '👨‍🍳', icon: 'toque', kind: 'outfit', slot: 'head' },
  { id: 'bow', title: 'Lacinho', desc: 'Très chic', price: 90, emoji: '🎀', kind: 'outfit', slot: 'head' },
  { id: 'grad', title: 'Capelo', desc: 'Exclusivo de quem chega ao B1', price: 0, emoji: '🎓', kind: 'outfit', slot: 'head', unlock: { label: 'Libere a unidade 10 (B1)', test: (s) => (s.unlockedUnit || 1) >= 10 } },
  { id: 'crown', title: 'Coroa', desc: 'Roi des canards', price: 0, emoji: '👑', kind: 'outfit', slot: 'head', unlock: { label: 'Chegue a 30 dias de streak', test: (s) => (s.streak?.best || 0) >= 30 } },
  // eyes
  { id: 'glasses', title: 'Óculos de sol', desc: 'Estilo Riviera', price: 150, emoji: '🕶️', kind: 'outfit', slot: 'eyes' },
  { id: 'specs', title: 'Óculos de leitura', desc: 'Para ler Victor Hugo', price: 120, emoji: '👓', kind: 'outfit', slot: 'eyes' },
  { id: 'monocle', title: 'Monóculo', desc: 'Exclusivo dos leitores', price: 0, emoji: '🧐', icon: 'monocle', kind: 'outfit', slot: 'eyes', unlock: { label: 'Leia 10 histórias', test: (s) => Object.keys(s.stories || {}).filter((k) => /^s\d/.test(k)).length >= 10 } },
  // neck
  { id: 'scarf', title: 'Cachecol listrado', desc: 'Para o inverno parisiense', price: 120, emoji: '🧣', kind: 'outfit', slot: 'neck' },
  { id: 'bowtie', title: 'Gravata-borboleta', desc: 'Para o jantar de gala', price: 110, emoji: '🎀', icon: 'bowtie', kind: 'outfit', slot: 'neck' },
  { id: 'tie', title: 'Gravata', desc: 'Pronto para a entrevista', price: 130, emoji: '👔', kind: 'outfit', slot: 'neck' },
  { id: 'pearls', title: 'Colar de pérolas', desc: 'Elegância à la Chanel', price: 180, emoji: '📿', icon: 'pearls', kind: 'outfit', slot: 'neck' },
  { id: 'medal', title: 'Medalha de ouro', desc: 'Exclusiva de campeões', price: 0, emoji: '🥇', kind: 'outfit', slot: 'neck', unlock: { label: 'Complete um desafio semanal', test: (s) => Object.keys(s.medals || {}).length >= 1 } },
  // in the wing
  { id: 'rose', title: 'Rosa', desc: 'Très romantique', price: 90, emoji: '🌹', kind: 'outfit', slot: 'held' },
  { id: 'baguette', title: 'Baguete', desc: 'Sempre fresquinha', price: 50, emoji: '🥖', kind: 'outfit', slot: 'held' },
  { id: 'croissant', title: 'Croissant', desc: 'Café da manhã garantido', price: 80, emoji: '🥐', kind: 'outfit', slot: 'held' },
  { id: 'wine', title: 'Taça de vinho', desc: 'Santé !', price: 140, emoji: '🍷', kind: 'outfit', slot: 'held' },
  { id: 'palette', title: 'Paleta de pintor', desc: 'Inspirado em Monet', price: 160, emoji: '🎨', kind: 'outfit', slot: 'held' },
  { id: 'guitar', title: 'Violão', desc: 'Pour chanter en français', price: 220, emoji: '🎸', kind: 'outfit', slot: 'held' },
  { id: 'camera', title: 'Câmera', desc: 'Turista profissional', price: 160, emoji: '📸', kind: 'outfit', slot: 'held' },
  { id: 'book', title: 'Livro', desc: 'Le Petit Prince debaixo da asa', price: 120, emoji: '📚', kind: 'outfit', slot: 'held' },
  { id: 'flag', title: 'Bandeirinha', desc: 'Allez les Bleus !', price: 100, emoji: '🇫🇷', kind: 'outfit', slot: 'held' },
  { id: 'leaf', title: 'Folha da Amazônia', desc: 'Do Pará para a França', price: 90, emoji: '🌿', kind: 'outfit', slot: 'held' },
  // next to the duck
  { id: 'tower', title: 'Torre Eiffel', desc: 'Lembrancinha de Paris', price: 180, emoji: '🗼', kind: 'outfit', slot: 'ground' },
  { id: 'bike', title: 'Bicicleta', desc: 'Tour de France', price: 240, emoji: '🚲', kind: 'outfit', slot: 'ground' },
  { id: 'luggage', title: 'Mala de viagem', desc: 'Próxima parada: Lyon', price: 150, emoji: '🧳', kind: 'outfit', slot: 'ground' },
  { id: 'rocket', title: 'Foguete', desc: 'Rumo ao C1', price: 600, emoji: '🚀', kind: 'outfit', slot: 'ground' },
  // scenery (behind the duck)
  { id: 'paris', title: 'Paris', desc: 'Céu azul e Torre Eiffel', price: 200, emoji: '🗼', icon: 'scene', kind: 'outfit', slot: 'scene' },
  { id: 'nice', title: 'Praia de Nice', desc: 'Sol da Côte d\'Azur', price: 200, emoji: '🏖️', icon: 'scene', kind: 'outfit', slot: 'scene' },
  { id: 'alpes', title: 'Alpes', desc: 'Neve e montanhas', price: 220, emoji: '🏔️', icon: 'scene', kind: 'outfit', slot: 'scene' },
  { id: 'amazonia', title: 'Amazônia', desc: 'Exclusivo: casa é casa', price: 0, emoji: '🌳', icon: 'scene', kind: 'outfit', slot: 'scene', unlock: { label: 'Faça o teste de nível', test: (s) => !!s.placement } },
  { id: 'noite', title: 'Noite estrelada', desc: 'Exclusivo de quem não falha', price: 0, emoji: '🌙', icon: 'scene', kind: 'outfit', slot: 'scene', unlock: { label: 'Chegue a 7 dias de streak', test: (s) => (s.streak?.best || 0) >= 7 } },
  { id: 'theme_dark', title: 'Tema noturno', desc: 'Já incluso! Ative em Aparência', price: 0, emoji: '🌙', kind: 'info' },
];
export const isOwned = (s, item) => !!item && ((s.inventory?.owned || []).includes(item.id) || (item.unlock ? !!item.unlock.test(s) : false));
export const SLOT_NAMES = { head: 'Chapéus', eyes: 'Óculos', face: 'Rosto', neck: 'Pescoço', held: 'Na asa', ground: 'Ao lado', scene: 'Cenários' };
export const SLOT_ORDER = ['head', 'eyes', 'face', 'neck', 'held', 'ground', 'scene'];
// what the duck is wearing: { head: id, eyes: id, ... } (older saves had one "equipped" id)
export function wornOf(inv) {
  if (!inv) return {};
  if (inv.wear) return inv.wear;
  const it = inv.equipped && SHOP.find((x) => x.id === inv.equipped);
  return it?.slot ? { [it.slot]: it.id } : {};
}


// Weekly themed challenge — rotates every week; finishing it gives a medal + coins.
export const WEEKLY_CHALLENGES = [
  { id: 'ouvido', title: 'Semana do ouvido', emoji: '👂', desc: 'Acerte 60 exercícios de escuta', field: 'listen', target: 60, coins: 120 },
  { id: 'escrita', title: 'Semana da escrita', emoji: '✍️', desc: 'Escreva 25 frases corretas', field: 'written', target: 25, coins: 120 },
  { id: 'leitura', title: 'Semana da leitura', emoji: '📖', desc: 'Leia 4 histórias', field: 'stories', target: 4, coins: 120 },
  { id: 'fala', title: 'Semana da fala', emoji: '🗣️', desc: 'Fale 40 frases em voz alta', field: 'spoken', target: 40, coins: 120 },
  { id: 'verbos', title: 'Semana dos verbos', emoji: '🔁', desc: 'Conjugue 60 verbos certos', field: 'verbs', target: 60, coins: 120 },
  { id: 'maratona', title: 'Maratona de XP', emoji: '🏃', desc: 'Ganhe 600 XP na semana', field: 'xp', target: 600, coins: 150 },
];
export function weeklyChallenge(wk = weekKey()) {
  const n = parseInt(String(wk).split('W')[1] || '0', 10) + parseInt(String(wk).slice(0, 4), 10);
  return WEEKLY_CHALLENGES[n % WEEKLY_CHALLENGES.length];
}
export function weeklyProgress(week) {
  const c = weeklyChallenge(week?.key);
  const v = week?.[c.field] || 0;
  return { ...c, value: v, pct: Math.min(1, v / c.target), done: v >= c.target };
}

// Weekly surprise chest: opens after 3 study days in the week. 40% chance of a free item.
export function weeklyChestReward(s, wk = weekKey()) {
  const r = seeded('wchest-' + wk + (s.profile?.joinedAt || ''))();
  const pool = SHOP.filter((i) => i.kind === 'outfit' && !i.unlock && i.price > 0 && i.price <= 240 && !(s.inventory?.owned || []).includes(i.id));
  if (r < 0.4 && pool.length) {
    const item = pool[Math.floor(seeded('wchest-item-' + wk)() * pool.length)];
    return { item: item.id, coins: 20, xp: 20 };
  }
  return { coins: 60 + Math.floor(r * 80), xp: 25 };
}

// The hour the user usually studies (needs a few sessions to be sure).
export function usualHour(hours) {
  const e = Object.entries(hours || {});
  const total = e.reduce((a, [, n]) => a + n, 0);
  if (total < 4) return null;
  e.sort((a, b) => b[1] - a[1]);
  return parseInt(e[0][0], 10);
}

export { weekKey, dayKey };
