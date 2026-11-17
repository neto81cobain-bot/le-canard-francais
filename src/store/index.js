import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import { dayKey, weekKey } from './dates';
import {
  freshDaily, refreshStreak, hitGoal, goalXP, srsReview, newAchievements, chestReward, SHOP, missionProgress,
} from './logic';

const KEY = 'lcf2_state_v1';

export const initialState = {
  version: 1,
  onboarded: false,
  profile: {
    name: '',
    reason: null,
    startLevel: 'zero',
    dailyMinutes: 10,
    reminder: { enabled: true, hour: 19, minute: 0 },
    photo: null,
    joinedAt: null,
  },
  settings: {
    theme: 'light',
    sounds: true,
    haptics: true,
    hearts: false,
    autoAudio: true,
    speechRate: 0.9,
    notifStreak: true,
    apiUrl: '',
    ownGroqKey: '',
  },
  xp: 0,
  coins: 50,
  streak: { count: 0, best: 0, lastDay: null, freezes: 0, frozenDays: [] },
  history: {}, // dayKey -> xp
  daily: freshDaily(),
  unlockedUnit: 1,
  lessons: {}, // id -> { done, best, stars, times }
  unitTests: {}, // unitId -> best %
  chests: {}, // chestId -> true
  srs: {},
  mistakes: [], // exercise snapshots
  words: {},
  saved: [], // flashcards saved by the user
  achievements: {},
  stats: {
    lessons: 0, perfect: 0, exercises: 0, correct: 0, spoken: 0, reviews: 0,
    bestCombo: 0, timedBest: 0, minutes: 0, conversations: 0, chests: 0, early: 0, night: 0,
  },
  bankBest: {},
  week: { key: weekKey(), xp: 0 },
  league: { tier: 0, lastWeek: null, lastResult: null },
  hearts: { count: 5, refillAt: null },
  inventory: { owned: [], equipped: null },
  friends: [],
  stories: {}, // storyId -> { stars, at }
  diary: [], // { at, prompt, text, corrected, score }
  duels: [], // { uid, name, week, theirXP, status }
  translateHistory: [],
  lastLessonId: null,
  auth: null,
  pendingCelebrations: [],
};

function deepMerge(base, saved) {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return saved ?? base;
  const out = { ...base };
  for (const k of Object.keys(saved)) {
    const b = base ? base[k] : undefined;
    out[k] = b && typeof b === 'object' && !Array.isArray(b) ? deepMerge(b, saved[k]) : saved[k];
  }
  return out;
}

// Roll daily / weekly counters when the date changes.
function rollover(s) {
  const today = dayKey();
  let next = s;
  if (s.daily?.date !== today) next = { ...next, daily: freshDaily(today) };
  const wk = weekKey();
  if (s.week?.key !== wk) {
    next = { ...next, week: { key: wk, xp: 0 }, league: { ...next.league, needsResult: s.week?.key || null } };
  }
  const streak = refreshStreak(next.streak, today);
  if (streak !== next.streak) next = { ...next, streak };
  // hearts refill: one every 30 minutes
  if (next.hearts && next.hearts.count < 5 && next.hearts.refillAt) {
    const gained = Math.floor((Date.now() - next.hearts.refillAt) / (30 * 60 * 1000));
    if (gained > 0) {
      const count = Math.min(5, next.hearts.count + gained);
      next = { ...next, hearts: { count, refillAt: count >= 5 ? null : next.hearts.refillAt + gained * 30 * 60 * 1000 } };
    }
  }
  return next;
}

function withAchievements(s) {
  const fresh = newAchievements(s);
  if (!fresh.length) return s;
  const ach = { ...s.achievements };
  fresh.forEach((a) => (ach[a.id] = Date.now()));
  return {
    ...s,
    achievements: ach,
    coins: s.coins + fresh.length * 20,
    pendingCelebrations: [...(s.pendingCelebrations || []), ...fresh.map((a) => ({ type: 'achievement', id: a.id }))],
  };
}

function applyXP(s, amount) {
  if (!amount) return s;
  const today = dayKey();
  const hour = new Date().getHours();
  let next = {
    ...s,
    xp: s.xp + amount,
    history: { ...s.history, [today]: (s.history[today] || 0) + amount },
    daily: { ...s.daily, xp: s.daily.xp + amount },
    week: { ...s.week, xp: (s.week?.xp || 0) + amount },
    stats: {
      ...s.stats,
      early: s.stats.early + (hour < 7 ? 1 : 0),
      night: s.stats.night + (hour >= 23 ? 1 : 0),
    },
  };
  const goal = goalXP(next.profile.dailyMinutes);
  if (!next.daily.goalHit && next.daily.xp >= goal) {
    const { streak, extended } = hitGoal(next.streak, today);
    next = { ...next, streak, daily: { ...next.daily, goalHit: true } };
    if (extended) next.pendingCelebrations = [...(next.pendingCelebrations || []), { type: 'streak', count: streak.count }];
  }
  return next;
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(null);
  const saveTimer = useRef(null);
  const stateRef = useRef(null);
  stateRef.current = state;

  useEffect(() => {
    (async () => {
      let saved = null;
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) saved = JSON.parse(raw);
      } catch {}
      setState(rollover({ ...deepMerge(initialState, saved || {}), inLesson: false }));
    })();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => {
      if (st === 'active') setState((s) => (s ? rollover(s) : s));
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (!state) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
    }, 400);
  }, [state]);

  const update = useCallback((fn) => setState((s) => withAchievements(rollover(fn(s)))), []);

  const actions = useMemo(() => ({
    set: (patch) => update((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
    setProfile: (patch) => update((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
    setSettings: (patch) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
    completeOnboarding: (profile, unlockedUnit = 1) =>
      update((s) => ({
        ...s,
        onboarded: true,
        unlockedUnit: Math.max(s.unlockedUnit, unlockedUnit),
        profile: { ...s.profile, ...profile, joinedAt: s.profile.joinedAt || Date.now() },
      })),

    addXP: (amount) => update((s) => applyXP(s, amount)),

    // Called after every answered exercise.
    recordAnswer: ({ item, correct, combo, kind }) =>
      update((s) => {
        let next = {
          ...s,
          stats: {
            ...s.stats,
            exercises: s.stats.exercises + 1,
            correct: s.stats.correct + (correct ? 1 : 0),
            bestCombo: Math.max(s.stats.bestCombo, combo || 0),
            pairs: (s.stats.pairs || 0) + (correct && kind === 'pairs' ? 1 : 0),
          },
          daily: {
            ...s.daily,
            correct: s.daily.correct + (correct ? 1 : 0),
            combo: Math.max(s.daily.combo, combo || 0),
            listen: s.daily.listen + (correct && (kind === 'listen' || kind === 'pairs') ? 1 : 0),
            verbs: (s.daily.verbs || 0) + (correct && kind === 'conjugate' ? 1 : 0),
            written: (s.daily.written || 0) + (correct && kind === 'write' ? 1 : 0),
            pairs: (s.daily.pairs || 0) + (correct && kind === 'pairs' ? 1 : 0),
          },
        };
        if (item && item.fr) {
          const key = item.key || item.fr;
          const prev = s.srs[key] || { fr: item.fr, pt: item.pt, lessonId: item.lessonId };
          next.srs = { ...s.srs, [key]: srsReview({ ...prev, fr: item.fr, pt: item.pt }, correct) };
          if (correct && !s.words[item.fr] && item.isWord) {
            next.words = { ...s.words, [item.fr]: { pt: item.pt, at: Date.now(), lessonId: item.lessonId } };
          }
        }
        if (!correct && s.settings.hearts) {
          const count = Math.max(0, s.hearts.count - 1);
          next.hearts = { count, refillAt: s.hearts.refillAt || Date.now() };
        }
        return next;
      }),

    addMistake: (snapshot) =>
      update((s) => {
        const id = snapshot.prompt + '|' + snapshot.answer;
        const others = s.mistakes.filter((m) => m.id !== id);
        return { ...s, mistakes: [{ ...snapshot, id, at: Date.now() }, ...others].slice(0, 120) };
      }),
    clearMistake: (id) => update((s) => ({ ...s, mistakes: s.mistakes.filter((m) => m.id !== id) })),

    learnWords: (list, lessonId) =>
      update((s) => {
        const words = { ...s.words };
        list.forEach((w) => {
          if (!words[w.fr]) words[w.fr] = { pt: w.pt, at: Date.now(), lessonId, emoji: w.emoji };
        });
        return { ...s, words };
      }),

    finishSession: ({ lessonId, unitTestId, correct, total, seconds, xp, perfect, kind, bankKey }) =>
      update((s) => {
        let next = applyXP(s, xp);
        const pct = total ? Math.round((correct / total) * 100) : 0;
        const stars = pct >= 95 ? 3 : pct >= 80 ? 2 : pct >= 50 ? 1 : 0;
        next.stats = {
          ...next.stats,
          lessons: next.stats.lessons + (lessonId ? 1 : 0),
          perfect: next.stats.perfect + (perfect ? 1 : 0),
          minutes: next.stats.minutes + Math.round(seconds / 60),
          reviews: next.stats.reviews + (kind === 'review' ? 1 : 0),
          timedBest: kind === 'timed' ? Math.max(next.stats.timedBest, correct) : next.stats.timedBest,
        };
        next.daily = {
          ...next.daily,
          lessons: next.daily.lessons + (lessonId || unitTestId ? 1 : 0),
          perfect: next.daily.perfect + (perfect ? 1 : 0),
          reviews: next.daily.reviews + (kind === 'review' ? 1 : 0),
          seconds: next.daily.seconds + seconds,
        };
        if (lessonId) {
          const prev = s.lessons[lessonId] || {};
          next.lessons = {
            ...s.lessons,
            [lessonId]: { done: true, best: Math.max(prev.best || 0, pct), stars: Math.max(prev.stars || 0, stars), times: (prev.times || 0) + 1 },
          };
          next.lastLessonId = lessonId;
        }
        if (unitTestId && pct >= 80) {
          next.unitTests = { ...s.unitTests, [unitTestId]: Math.max(s.unitTests[unitTestId] || 0, pct) };
          const n = parseInt(unitTestId.replace('u', ''), 10);
          next.unlockedUnit = Math.max(s.unlockedUnit, n + 1);
        }
        if (bankKey) next.bankBest = { ...s.bankBest, [bankKey]: Math.max(s.bankBest[bankKey] || 0, pct) };
        return next;
      }),

    addSpoken: (n = 1) =>
      update((s) => ({ ...s, stats: { ...s.stats, spoken: s.stats.spoken + n }, daily: { ...s.daily, spoken: s.daily.spoken + n } })),
    addConversation: () => update((s) => ({ ...s, stats: { ...s.stats, conversations: s.stats.conversations + 1 } })),
    addSeconds: (sec) => update((s) => ({ ...s, daily: { ...s.daily, seconds: s.daily.seconds + sec } })),

    openChest: (chestId) => {
      const r = chestReward(chestId + (stateRef.current?.profile?.joinedAt || ''));
      update((s) => {
        if (s.chests[chestId]) return s;
        let next = applyXP(s, r.xp);
        next = {
          ...next,
          chests: { ...s.chests, [chestId]: true },
          coins: next.coins + r.coins,
          streak: r.freeze ? { ...next.streak, freezes: (next.streak.freezes || 0) + 1 } : next.streak,
          stats: { ...next.stats, chests: next.stats.chests + 1 },
        };
        return next;
      });
      return r;
    },
    openDailyChest: () => {
      const r = chestReward('daily' + dayKey());
      update((s) => {
        const allDone = missionProgress(s.daily).every((m) => m.done);
        if (!allDone || s.daily.chestOpened) return s;
        let next = applyXP(s, r.xp);
        return {
          ...next,
          coins: next.coins + r.coins,
          daily: { ...next.daily, chestOpened: true },
          streak: r.freeze ? { ...next.streak, freezes: (next.streak.freezes || 0) + 1 } : next.streak,
          stats: { ...next.stats, chests: next.stats.chests + 1 },
        };
      });
      return r;
    },

    buy: (itemId) => {
      const item = SHOP.find((i) => i.id === itemId);
      const s0 = stateRef.current;
      if (!item || !s0 || s0.coins < item.price) return false;
      update((s) => {
        if (s.coins < item.price) return s;
        if (item.kind === 'freeze') {
          return { ...s, coins: s.coins - item.price, streak: { ...s.streak, freezes: (s.streak.freezes || 0) + 1 } };
        }
        if (s.inventory.owned.includes(item.id)) return s;
        return { ...s, coins: s.coins - item.price, inventory: { owned: [...s.inventory.owned, item.id], equipped: item.id } };
      });
      return true;
    },
    equip: (id) => update((s) => ({ ...s, inventory: { ...s.inventory, equipped: s.inventory.equipped === id ? null : id } })),

    refillHearts: () => update((s) => ({ ...s, hearts: { count: 5, refillAt: null } })),

    toggleSaved: (card) =>
      update((s) => {
        const exists = s.saved.find((c) => c.fr === card.fr);
        return { ...s, saved: exists ? s.saved.filter((c) => c.fr !== card.fr) : [{ ...card, at: Date.now() }, ...s.saved] };
      }),

    addTranslation: (entry) => update((s) => ({ ...s, translateHistory: [entry, ...s.translateHistory].slice(0, 50) })),
    clearTranslations: () => update((s) => ({ ...s, translateHistory: [] })),

    setAuth: (auth) => update((s) => ({ ...s, auth })),
    mergeCloud: (cloud) =>
      update((s) => {
        if (!cloud) return s;
        const next = { ...s };
        if ((cloud.xp || 0) > s.xp) next.xp = cloud.xp;
        if ((cloud.streakBest || 0) > s.streak.best) next.streak = { ...s.streak, best: cloud.streakBest };
        if (cloud.state && (cloud.state.xp || 0) >= s.xp) {
          // full progress restore from another device
          const keep = { auth: s.auth, settings: s.settings };
          return { ...deepMerge(initialState, cloud.state), ...keep, onboarded: true };
        }
        return next;
      }),

    addFriend: (f) => update((s) => (s.friends.find((x) => x.uid === f.uid) ? s : { ...s, friends: [...s.friends, f] })),
    removeFriend: (uid) => update((s) => ({ ...s, friends: s.friends.filter((f) => f.uid !== uid) })),

    settleLeague: (result) =>
      update((s) => {
        const tier = Math.max(0, Math.min(5, s.league.tier + (result === 'up' ? 1 : result === 'down' ? -1 : 0)));
        return { ...s, league: { tier, lastWeek: s.league.needsResult, lastResult: result, needsResult: null } };
      }),

    shiftCelebration: () => update((s) => ({ ...s, pendingCelebrations: (s.pendingCelebrations || []).slice(1) })),

    importState: (obj) => update(() => rollover(deepMerge(initialState, obj))),
    resetProgress: () =>
      update((s) => ({ ...initialState, onboarded: true, profile: s.profile, settings: s.settings, auth: s.auth, daily: freshDaily() })),
  }), [update]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  if (!state) return null;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  return useContext(Ctx);
}

export function getStateSnapshotForCloud(state) {
  // What we upload as a backup. Skip volatile/large fields.
  const { auth, pendingCelebrations, translateHistory, ...rest } = state;
  return rest;
}
