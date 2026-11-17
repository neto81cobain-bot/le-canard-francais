// Local reminders: daily study reminder + "streak at risk" in the evening.
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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

export async function scheduleReminders({ reminder, notifStreak, practicedToday, streakCount }) {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (!reminder?.enabled) return;
    const ok = await ensurePermission();
    if (!ok) return;
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Le canard français', body: MSGS[Math.floor(Math.random() * MSGS.length)] },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: reminder.hour, minute: reminder.minute, channelId: 'default' },
    });
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
