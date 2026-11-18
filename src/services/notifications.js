// Local reminders: daily study reminder + "streak at risk" in the evening.
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { DAILY_PHRASES } from '../content/extras';

const dayIdx = (d) => Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }),
});

const MSGS = [
  'Le Canard está esperando! 🦆 Bora praticar 5 minutinhos?',
  'Bonjour ! Sua lição de hoje está pronta. 🥐',
  'Um pouquinho por dia faz milagres. Petit à petit… 🐦',
  'Seu francês sente sua falta! 🇫🇷',
  'Hora do café… e do francês! ☕',
];

export async function ensurePermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const cur = await Notifications.getPermissionsAsync();
  if (cur.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

// ─── Custom reminders ─────────────────────────────────────
// reminder: { id, enabled, hour, minute, auto, days: [0..6] (0 = domingo), kind, text, label }
// kind: smart | phrase | review | streak | custom
export const REMINDER_KINDS = [
  { id: 'smart', emoji: '🧠', label: 'Inteligente', desc: 'Muda conforme o dia: streak, revisões ou frase do dia' },
  { id: 'phrase', emoji: '💬', label: 'Frase do dia', desc: 'Uma expressão francesa nova' },
  { id: 'review', emoji: '🔁', label: 'Revisão', desc: 'Quantas palavras estão esperando' },
  { id: 'streak', emoji: '🔥', label: 'Proteger o streak', desc: 'Só avisa se você ainda não estudou' },
  { id: 'custom', emoji: '✏️', label: 'Minha mensagem', desc: 'Você escreve o texto' },
];

export function defaultReminders(profileReminder, nightly) {
  return [
    { id: 'r-dia', enabled: profileReminder?.enabled !== false, hour: profileReminder?.hour ?? 19, minute: profileReminder?.minute ?? 0, days: [0, 1, 2, 3, 4, 5, 6], kind: 'phrase', label: 'Lembrete do dia' },
    { id: 'r-noite', enabled: nightly?.enabled !== false, hour: nightly?.hour ?? 21, minute: nightly?.minute ?? 30, auto: !!nightly?.auto, days: [0, 1, 2, 3, 4, 5, 6], kind: 'smart', label: 'Lembrete da noite' },
  ];
}

function contentFor(r, night, { practicedToday, streakCount, due }) {
  const d = new Date();
  d.setDate(d.getDate() + night);
  const ph = DAILY_PHRASES[dayIdx(d) % DAILY_PHRASES.length];
  const today = night === 0;
  switch (r.kind) {
    case 'worried': {
      if (today && practicedToday) return null;
      const [title, body] = WORRIED[dayIdx(d) % WORRIED.length];
      return { title, body: streakCount > 0 ? `${body} Seu streak de ${streakCount} dias agradece. 🔥` : body };
    }
    case 'custom':
      return { title: r.label || 'Le canard français 🦆', body: r.text || 'Hora do francês!' };
    case 'phrase':
      return { title: `${ph.emoji || '💬'} Frase do dia`, body: `“${ph.fr}” — ${ph.meaning}` };
    case 'review':
      return { title: '🔁 Hora de revisar', body: due ? `${due} palavras estão quase esquecidas. 2 minutinhos resolvem!` : 'Uma revisão rápida mantém tudo fresquinho na memória.' };
    case 'streak':
      if (today && practicedToday) return null;
      return { title: streakCount > 0 ? `🔥 Não perca seus ${streakCount} dias!` : '🔥 Comece um streak hoje!', body: 'Uma lição rápida já conta. Bora? 🦆' };
    default: // smart
      if (today && !practicedToday) {
        return {
          title: r.usual ? '⏰ Seu horário de francês!' : streakCount > 0 ? `🔥 ${streakCount} dias seguidos — falta o de hoje!` : '🌙 Ainda dá tempo de estudar hoje',
          body: `${due ? `${due} palavras esperando revisão. ` : ''}5 minutinhos e pronto. 🦆`,
        };
      }
      if (today) return { title: '🌙 Mandou bem hoje!', body: `Frase para dormir pensando: “${ph.fr}” — ${ph.meaning}` };
      return { title: streakCount > 0 ? '🦆 Bora manter o streak? 🔥' : '🦆 Um pouquinho de francês?', body: `“${ph.fr}” = ${ph.pt}` };
  }
}

const WORRIED = [
  ['😟 O Canard está preocupado…', 'Já é tarde e você ainda não praticou hoje. Bora salvar o dia com 5 minutinhos?'],
  ['😟 Psiu… ainda dá tempo!', 'O Canard não consegue dormir sem a sua lição de hoje. 🦆💤'],
  ['😰 Alerta de pato aflito!', 'Faltam poucas horas para o dia acabar. Uma lição rápida resolve!'],
];

export async function scheduleReminders({ reminders = [], practicedToday, streakCount, due = 0, worried = true }) {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const on = reminders.filter((r) => r.enabled && (r.days || []).length);
    // the worried duck at 23h (only on days you haven't practised — it is re-planned whenever you study)
    if (worried) on.push({ id: 'worried', hour: 23, minute: 0, days: [0, 1, 2, 3, 4, 5, 6], kind: 'worried' });
    if (!on.length) return;
    const ok = await ensurePermission();
    if (!ok) return;
    let count = 0;
    for (let n = 0; n < 7; n++) {
      for (const r of on) {
        const d = new Date();
        d.setDate(d.getDate() + n);
        if (!(r.days || []).includes(d.getDay())) continue;
        d.setHours(r.hour ?? 21, r.minute ?? 0, 0, 0);
        if (d.getTime() <= Date.now() + 30000) continue;
        const content = contentFor(r, n, { practicedToday, streakCount, due });
        if (!content) continue;
        if (++count > 60) return;
        await Notifications.scheduleNotificationAsync({ content, trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: d, channelId: 'default' } });
      }
    }
  } catch (e) {
    // notifications are best-effort
  }
}

export async function testReminder(r, ctx) {
  const ok = await ensurePermission();
  if (!ok) return false;
  const content = contentFor({ ...r, kind: r.kind === 'streak' ? 'smart' : r.kind }, 0, { ...ctx, practicedToday: false });
  await Notifications.scheduleNotificationAsync({ content, trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3, channelId: 'default' } });
  return true;
}
