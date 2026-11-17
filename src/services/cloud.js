// Cloud sync with Firebase Realtime Database (REST).
// Paths: profiles/{uid}, codes/{CODE}, leagues/{week}/{tier}/{uid}, backups/{uid}, cheers/{uid}/{from}
import { CONFIG } from './config';
import { freshToken } from './auth';
import { weekKey } from '../store/dates';

const db = (path, token, query = '') => `${CONFIG.firebaseDbUrl}/${path}.json?auth=${token}${query}`;

export function friendCode(uid) {
  return (uid || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase();
}

async function req(url, opts = {}) {
  const r = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  const txt = await r.text();
  let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
  if (!r.ok) throw new Error((data && data.error) || 'HTTP ' + r.status);
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
    photo: state.profile.photo || a.photo || '',
    xp: state.xp,
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
    req(db(`leagues/${wk}/${state.league.tier}/${a.uid}`, a.idToken), {
      method: 'PUT',
      body: JSON.stringify({ name: profile.name, photo: profile.photo, xp: profile.weekXP, streak: profile.streak, ts: Date.now() }),
    }),
    snapshot ? req(db('backups/' + a.uid, a.idToken), { method: 'PUT', body: JSON.stringify({ at: Date.now(), data: JSON.stringify(snapshot) }) }) : null,
  ]);
  return a;
}

export async function fetchLeague(auth, tier, week = weekKey()) {
  const a = await withAuth(auth);
  let data;
  try {
    data = await req(db(`leagues/${week}/${tier}`, a.idToken, '&orderBy="xp"&limitToLast=30'));
  } catch {
    data = await req(db(`leagues/${week}/${tier}`, a.idToken));
  }
  const list = Object.entries(data || {}).map(([uid, v]) => ({ uid, ...v })).sort((x, y) => (y.xp || 0) - (x.xp || 0));
  return { auth: a, list };
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
  return Object.values(data || {});
}
