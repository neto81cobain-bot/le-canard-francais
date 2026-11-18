// Online / offline detection without native modules.
// A tiny probe request decides; AI and cloud calls also report what they saw.
import { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { CONFIG } from './config';

let online = true;
let lastCheck = 0;
let checking = null;
const listeners = new Set();

function set(v) {
  if (v === online) return;
  online = v;
  listeners.forEach((fn) => { try { fn(v); } catch {} });
}

export const isOnline = () => online;
export const markOffline = () => set(false);
export const markOnline = () => set(true);

export function onNetChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// "Network request failed", XHR onerror, aborted probe… → it's the connection, not the server.
export function isNetworkError(e) {
  const m = String(e?.message || e || '');
  return e?.offline === true || /network request failed|failed to fetch|sem conex|network error|internet|timed? ?out|aborted|ENOTFOUND|ECONN/i.test(m);
}

export async function checkOnline({ force = false } = {}) {
  if (!force && Date.now() - lastCheck < 4000) return online;
  if (checking) return checking;
  checking = (async () => {
    const urls = [CONFIG.firebaseDbUrl + '/.json?shallow=true&limitToFirst=1', 'https://clients3.google.com/generate_204'];
    for (const url of urls) {
      const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = setTimeout(() => ctl?.abort(), 4500);
      try {
        await fetch(url, { method: 'GET', signal: ctl?.signal, cache: 'no-store', ...(Platform.OS === 'web' ? { mode: 'no-cors' } : {}) });
        clearTimeout(timer);
        set(true);
        return true;
      } catch {
        clearTimeout(timer);
      }
    }
    set(false);
    return false;
  })();
  try {
    return await checking;
  } finally {
    lastCheck = Date.now();
    checking = null;
  }
}

// React hook: re-checks when the app comes back to the foreground,
// and every 15 s while offline so things come back by themselves.
let watcher = null;
function startWatch() {
  if (watcher) return;
  // light background check: every 15 s while offline, every 60 s while online
  const tick = async () => {
    if (AppState.currentState === 'active') await checkOnline({ force: true });
    watcher = setTimeout(tick, online ? 60000 : 15000);
  };
  watcher = setTimeout(tick, 15000);
  onNetChange(() => { clearTimeout(watcher); watcher = setTimeout(tick, online ? 60000 : 15000); });
}

export function useOnline() {
  const [on, setOn] = useState(online);
  useEffect(() => {
    startWatch();
    const off = onNetChange(setOn);
    checkOnline();
    const sub = AppState.addEventListener('change', (st) => { if (st === 'active') checkOnline({ force: true }); });
    return () => { off(); sub.remove(); };
  }, []);
  return on;
}
