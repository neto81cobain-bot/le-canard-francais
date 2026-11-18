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

// Smart nightly reminder (like a journal app): every night at the chosen hour,
// with the phrase of the next day, what is due for review and the streak status.
// Scheduled 7 nights ahead with DATE triggers so each one has its own text;
// it is rebuilt every time the app opens or progress changes.
function nightlyContent(night, { practicedToday, streakCount, due }) {
  const d = new Date();
  d.setDate(d.getDate() + night);
  const ph = DAILY_PHRASES[dayIdx(d) % DAILY_PHRASES.length];
  if (night === 0 && !practicedToday) {
    return {
      title: streakCount > 0 ? `🔥 ${streakCount} dias seguidos — falta o de hoje!` : '🌙 Ainda dá tempo de estudar hoje',
      body: `${due ? `${due} palavras esperando revisão. ` : ''}5 minutinhos antes de dormir e pronto. 🦆`,
    };
  }
  if (night === 0) {
    return { title: '🌙 Mandou bem hoje!', body: `Frase para dormir pensando: “${ph.fr}” — ${ph.meaning}` };
  }
  return {
    title: streakCount > 0 ? `🌙 Bora manter o streak? 🔥` : '🌙 Boa noite! Um pouquinho de francês?',
    body: `“${ph.fr}” = ${ph.pt}${due ? ` · revise o que está quase esquecendo` : ''}`,
  };
}

export async function scheduleReminders({ reminder, notifStreak, practicedToday, streakCount, nightly, due = 0 }) {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const anyOn = reminder?.enabled || nightly?.enabled || (notifStreak && streakCount > 0);
    if (!anyOn) return;
    const ok = await ensurePermission();
    if (!ok) return;
    if (reminder?.enabled) {
      await Notifications.scheduleNotificationAsync({
        content: { title: 'Le canard français', body: MSGS[Math.floor(Math.random() * MSGS.length)] },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: reminder.hour, minute: reminder.minute, channelId: 'default' },
      });
    }
    if (nightly?.enabled) {
      for (let n = 0; n < 7; n++) {
        const d = new Date();
        d.setDate(d.getDate() + n);
        d.setHours(nightly.hour ?? 21, nightly.minute ?? 0, 0, 0);
        if (d.getTime() <= Date.now() + 30000) continue;
        await Notifications.scheduleNotificationAsync({
          content: nightlyContent(n, { practicedToday, streakCount, due }),
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: d, channelId: 'default' },
        });
      }
      return; // the nightly one already covers the streak warning
    }
    if (notifStreak && streakCount > 0) {
      const d = new Date();
      if (practicedToday) d.setDate(d.getDate() + 1);
      d.setHours(21, 0, 0, 0);
      if (d.getTime() > Date.now()) {
        await Notifications.scheduleNotificationAsync({
          content: { title: '🔥 Seu streak está em risco!', body: `Não perca seus ${streakCount} dias seguidos. Uma lição rápida resolve! 💤🦆` },
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: d, channelId: 'default' },
        });
      }
    }
  } catch (e) {
    // notifications are best-effort
  }
}
