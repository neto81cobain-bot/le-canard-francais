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
export const MISSION_POOL = [
  { id: 'xp30', title: 'Ganhe 30 XP', icon: 'bolt', metric: 'xp', target: 30 },
  { id: 'xp60', title: 'Ganhe 60 XP', icon: 'bolt', metric: 'xp', target: 60 },
  { id: 'lesson1', title: 'Complete 1 lição', icon: 'book', metric: 'lessons', target: 1 },
  { id: 'lesson2', title: 'Complete 2 lições', icon: 'book', metric: 'lessons', target: 2 },
  { id: 'perfect', title: 'Faça uma lição sem erros', icon: 'star', metric: 'perfect', target: 1 },
  { id: 'correct15', title: 'Acerte 15 exercícios', icon: 'target', metric: 'correct', target: 15 },
  { id: 'correct25', title: 'Acerte 25 exercícios', icon: 'target', metric: 'correct', target: 25 },
  { id: 'speak3', title: 'Fale 3 frases em voz alta', icon: 'mic', metric: 'spoken', target: 3 },
  { id: 'review1', title: 'Faça 1 revisão inteligente', icon: 'refresh', metric: 'reviews', target: 1 },
  { id: 'combo5', title: 'Acerte 5 seguidas', icon: 'flame', metric: 'combo', target: 5 },
  { id: 'listen5', title: 'Acerte 5 exercícios de escuta', icon: 'headphones', metric: 'listen', target: 5 },
  { id: 'verbs10', title: 'Acerte 10 conjugações', icon: 'edit', metric: 'verbs', target: 10 },
  { id: 'minutes10', title: 'Estude 10 minutos', icon: 'clock', metric: 'minutes', target: 10 },
  { id: 'story1', title: 'Leia 1 história', icon: 'book', metric: 'stories', target: 1 },
  { id: 'write3', title: 'Escreva 3 frases em francês', icon: 'edit', metric: 'written', target: 3 },
  { id: 'pairs5', title: 'Acerte 5 pares de sons', icon: 'headphones', metric: 'pairs', target: 5 },
];

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

export function missionsFor(date) {
  const rnd = seeded('missions-' + date);
  const pool = [...MISSION_POOL];
  const picked = [];
  const usedMetrics = new Set();
  while (picked.length < 3 && pool.length) {
    const i = Math.floor(rnd() * pool.length);
    const m = pool.splice(i, 1)[0];
    if (usedMetrics.has(m.metric)) continue;
    usedMetrics.add(m.metric);
    picked.push(m);
  }
  return picked;
}

export function freshDaily(date = dayKey()) {
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
    missions: missionsFor(date).map((m) => m.id),
  };
}

export function missionProgress(daily) {
  return daily.missions.map((id) => {
    const m = MISSION_POOL.find((x) => x.id === id) || MISSION_POOL[0];
    const raw = m.metric === 'minutes' ? Math.floor((daily.seconds || 0) / 60) : daily[m.metric] || 0;
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
  { id: 'story1', title: 'Primeira leitura', desc: 'Leia uma história até o fim', emoji: '📗', test: (s) => Object.keys(s.stories || {}).length >= 1 },
  { id: 'story10', title: 'Leitor assíduo', desc: 'Leia 10 histórias', emoji: '📚', test: (s) => Object.keys(s.stories || {}).length >= 10 },
  { id: 'story20', title: 'Biblioteca completa', desc: 'Leia todas as 20 histórias', emoji: '🏛️', test: (s) => Object.keys(s.stories || {}).length >= 20 },
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

export const SHOP = [
  { id: 'freeze', title: 'Croissant de reserva', desc: 'Protege seu streak por 1 dia perdido', price: 60, emoji: '🥐', kind: 'freeze' },
  { id: 'scarf', title: 'Cachecol listrado', desc: 'Para o inverno parisiense', price: 120, emoji: '🧣', kind: 'outfit' },
  { id: 'glasses', title: 'Óculos de sol', desc: 'Estilo Riviera', price: 150, emoji: '🕶️', kind: 'outfit' },
  { id: 'chef', title: 'Chapéu de chef', desc: 'Pronto para o bistrô', price: 200, emoji: '👨‍🍳', kind: 'outfit' },
  { id: 'rose', title: 'Rosa', desc: 'Très romantique', price: 90, emoji: '🌹', kind: 'outfit' },
  { id: 'grad', title: 'Capelo', desc: 'Para quem passou no B1', price: 300, emoji: '🎓', kind: 'outfit' },
  { id: 'crown', title: 'Coroa', desc: 'Roi des canards', price: 500, emoji: '👑', kind: 'outfit' },
  { id: 'theme_dark', title: 'Tema noturno', desc: 'Já incluso! Ative em Aparência', price: 0, emoji: '🌙', kind: 'info' },
];

export { weekKey, dayKey };
