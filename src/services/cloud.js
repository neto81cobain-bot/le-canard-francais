import { wornOf } from '../store/logic';
// Cloud sync with Firebase Realtime Database (REST).
// Paths: profiles/{uid}, codes/{CODE}, backups/{uid}, cheers/{uid}/{from}
import { CONFIG } from './config';
import { freshToken } from './auth';
import { weekKey } from '../store/dates';

const db = (path, token, query = '') => `${CONFIG.firebaseDbUrl}/${path}.json?auth=${token}${query}`;

export function friendCode(uid) {
  return (uid || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase();
}

async function req(url, opts = {}) {
  let r;
  try {
    r = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  } catch {
    throw new Error('Sem conexão com a internet. Tente de novo quando estiver online.');
  }
  const txt = await r.text();
  let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
  if (!r.ok) {
    const msg = (data && data.error) || 'HTTP ' + r.status;
    if (/permission denied/i.test(msg) || r.status === 401 || r.status === 403) {
      const e = new Error('A nuvem ainda está trancada: falta publicar as regras do banco no Firebase (Realtime Database → Regras). É uma vez só.');
      e.code = 'rules';
      throw e;
    }
    if (r.status === 404) throw new Error('Banco de dados não encontrado. Crie o Realtime Database no Firebase.');
    throw new Error(msg);
  }
  return data;
}

// Make sure the token is valid; returns updated auth (caller should store it)
export async function withAuth(auth) {
  const a = await freshToken(auth);
  if (!a) throw new Error('Sessão expirada. Entre novamente.');
  return a;
}

export async function pushProgress(auth, state, snapshot) {
  const a = await withAuth(auth);
  const wk = weekKey();
  const profile = {
    name: state.profile.name || a.name || 'Aluno',
    photo: state.profile.photo === 'none' ? '' : state.profile.photo || a.photo || '',
    xp: state.xp,
    wear: wornOf(state.inventory),
    wk: state.week?.key === wk ? { listen: state.week.listen || 0, written: state.week.written || 0, verbs: state.week.verbs || 0, spoken: state.week.spoken || 0, stories: state.week.stories || 0, correct: state.week.correct || 0 } : {},
    streak: state.streak.count,
    weekXP: state.week.key === wk ? state.week.xp : 0,
    week: wk,
    tier: state.league.tier,
    code: friendCode(a.uid),
    updatedAt: Date.now(),
  };
  await Promise.all([
    req(db('profiles/' + a.uid, a.idToken), { method: 'PUT', body: JSON.stringify(profile) }),
    req(db('codes/' + profile.code, a.idToken), { method: 'PUT', body: JSON.stringify(a.uid) }).catch(() => {}),
    snapshot ? req(db('backups/' + a.uid, a.idToken), { method: 'PUT', body: JSON.stringify({ at: Date.now(), data: JSON.stringify(snapshot) }) }) : null,
  ]);
  return a;
}

export async function fetchBackup(auth) {
  const a = await withAuth(auth);
  const data = await req(db('backups/' + a.uid, a.idToken)).catch(() => null);
  let state = null;
  try { state = data?.data ? JSON.parse(data.data) : null; } catch {}
  return { auth: a, backup: state ? { at: data.at, state } : null };
}

// Recover XP from app version 1.0 (Firestore users/{uid})
export async function fetchLegacy(auth) {
  try {
    const a = await withAuth(auth);
    const r = await fetch(`https://firestore.googleapis.com/v1/projects/${CONFIG.firebaseProjectId}/databases/(default)/documents/users/${a.uid}`, {
      headers: { Authorization: 'Bearer ' + a.idToken },
    });
    const d = await r.json();
    if (!d.fields) return null;
    return {
      xp: parseInt(d.fields.xp?.integerValue || '0', 10),
      streakBest: parseInt(d.fields.streak?.integerValue || '0', 10),
    };
  } catch {
    return null;
  }
}

export async function findFriend(auth, code) {
  const a = await withAuth(auth);
  const uid = await req(db('codes/' + code.trim().toUpperCase(), a.idToken));
  if (!uid) throw new Error('Código não encontrado');
  if (uid === a.uid) throw new Error('Esse é o seu próprio código 😄');
  const p = await req(db('profiles/' + uid, a.idToken));
  if (!p) throw new Error('Perfil não encontrado');
  return { uid, ...p };
}

export async function fetchFriends(auth, uids) {
  const a = await withAuth(auth);
  const res = await Promise.all(uids.map((u) => req(db('profiles/' + u, a.idToken)).then((p) => (p ? { uid: u, ...p } : null)).catch(() => null)));
  return res.filter(Boolean);
}

export async function sendCheer(auth, toUid, name) {
  const a = await withAuth(auth);
  await req(db(`cheers/${toUid}/${a.uid}`, a.idToken), { method: 'PUT', body: JSON.stringify({ name, ts: Date.now() }) });
}

export async function takeCheers(auth) {
  const a = await withAuth(auth);
  const data = await req(db('cheers/' + a.uid, a.idToken)).catch(() => null);
  if (data) await req(db('cheers/' + a.uid, a.idToken), { method: 'DELETE' }).catch(() => {});
  return Object.entries(data || {}).map(([from, v]) => ({ from, ...(v || {}) }));
}

// A duel is a weekly XP race between two friends. The invite travels through the cheers inbox.
export async function sendDuel(auth, toUid, name, week, theme = 'xp') {
  const a = await withAuth(auth);
  await req(db(`cheers/${toUid}/${a.uid}`, a.idToken), { method: 'PUT', body: JSON.stringify({ name, ts: Date.now(), kind: 'duel', week, theme }) });
}
