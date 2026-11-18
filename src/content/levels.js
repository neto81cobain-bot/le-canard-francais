// Difficulty tiers shared by the library (songs, news, travel, adventures).
// Content of a level opens when you are at that level or one level below it
// (you can always peek one level ahead).
import { UNITS } from './index';

export const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1'];
export const TIERS = [
  { id: 'facil', label: 'Fácil', emoji: '🟢', levels: ['A1', 'A2'] },
  { id: 'medio', label: 'Médio', emoji: '🟡', levels: ['B1'] },
  { id: 'dificil', label: 'Difícil', emoji: '🔴', levels: ['B2', 'C1'] },
];
export const tierOf = (level) => TIERS.find((t) => t.levels.includes(level)) || TIERS[0];
export const userLevel = (state) => UNITS[Math.min(UNITS.length, state?.unlockedUnit || 1) - 1]?.level || 'A1';
export function levelOpen(level, state) {
  const need = CEFR.indexOf(level);
  const have = CEFR.indexOf(userLevel(state));
  return need <= have + 1;
}
// the level you need to reach to open content of `level`
export const unlockAt = (level) => CEFR[Math.max(0, CEFR.indexOf(level) - 1)];
