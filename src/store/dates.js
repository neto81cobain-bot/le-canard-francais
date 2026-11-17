// Small date helpers that always use the phone's local time zone.

const pad = (n) => String(n).padStart(2, '0');

export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  return dayKey(dt);
}

export function diffDays(a, b) {
  // days from a to b (b - a)
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  const t1 = Date.UTC(y1, m1 - 1, d1);
  const t2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((t2 - t1) / 86400000);
}

// ISO week key, e.g. 2026-W47. Leagues reset every Monday.
export function weekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${pad(week)}`;
}

export function msUntilWeekEnd(d = new Date()) {
  const day = d.getDay(); // 0 sunday
  const daysLeft = day === 0 ? 0 : 7 - day;
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + daysLeft, 23, 59, 59);
  return Math.max(0, end - d);
}

export function lastNDays(n, from = new Date()) {
  const out = [];
  const today = dayKey(from);
  for (let i = n - 1; i >= 0; i--) out.push(addDays(today, -i));
  return out;
}

export const weekdayShort = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function weekdayOf(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).getDay();
}
