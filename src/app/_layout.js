import React, { useEffect, useRef } from 'react';
import { View, AppState } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_600SemiBold_Italic } from '@expo-google-fonts/fraunces/600SemiBold_Italic';
import { Nunito_400Regular } from '@expo-google-fonts/nunito/400Regular';
import { Nunito_500Medium } from '@expo-google-fonts/nunito/500Medium';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold';
import { Nunito_700Bold } from '@expo-google-fonts/nunito/700Bold';
import { Nunito_800ExtraBold } from '@expo-google-fonts/nunito/800ExtraBold';
import { StoreProvider, useStore, getStateSnapshotForCloud } from '../store';
import { ThemeProvider, useTheme } from '../theme';
import Celebration from '../components/Celebration';
import DialogHost from '../components/DialogHost';
import * as Updates from 'expo-updates';
import { Alert } from '../services/dialog';
import { RootErrorScreen } from '../components/ErrorBoundary';
import { installGlobalHandler, logError } from '../services/diagnostics';
import { setFeedbackPrefs } from '../services/feedback';
import { setSpeechRate } from '../services/speech';
import { setA11y } from '../services/a11y';
import { setAiOverride } from '../services/ai';
import { scheduleReminders, defaultReminders } from '../services/notifications';
import { OfflineBanner } from '../components/Offline';
import { useOnline, isNetworkError, markOffline } from '../services/net';
import { processOutbox } from '../services/outbox';
import { dueItems, usualHour } from '../store/logic';

function smartNightly(n, hours) {
  if (!n?.auto) return n;
  const h = usualHour(hours);
  return h == null ? { ...n, hour: 21, minute: 30 } : { ...n, hour: h, minute: 0, usual: true };
}
import { pushProgress, takeCheers } from '../services/cloud';
import { dayKey, weekKey, mondayKey } from '../store/dates';

installGlobalHandler();
SplashScreen.preventAutoHideAsync().catch(() => {});

export function ErrorBoundary(props) {
  return <RootErrorScreen {...props} />;
}

function Effects() {
  const { state, actions } = useStore();
  const lastSync = useRef(0);
  const lastBackup = useRef(0);
  const online = useOnline();
  const stateRef = useRef(state);
  stateRef.current = state;

  // Back online: send what was queued (translations, diary) and sync right away
  useEffect(() => {
    if (!online) return;
    processOutbox(() => stateRef.current, actions);
    if (state.auth) { lastSync.current = 0; sync(true); }
  }, [online]);
  useEffect(() => {
    if (online && (state.outbox || []).length) processOutbox(() => stateRef.current, actions);
  }, [(state.outbox || []).length]);

  useEffect(() => {
    setFeedbackPrefs({ sounds: state.settings.sounds, haptics: state.settings.haptics, pack: state.settings.soundPack || 'canard', tapSound: state.settings.tapSound !== false });
    setSpeechRate(state.settings.speechRate);
    setA11y({ textScale: state.settings.textScale, reduceMotion: state.settings.reduceMotion });
    setAiOverride({ apiUrl: state.settings.apiUrl, key: state.settings.ownGroqKey });
  }, [state.settings]);

  // An update downloaded in the background (at launch) → offer to restart now
  const { isUpdatePending } = Updates.useUpdates();
  const asked = useRef(false);
  useEffect(() => {
    if (!isUpdatePending || asked.current) return;
    asked.current = true;
    Alert.alert('Atualização pronta! 🦆', 'Uma versão nova do app foi baixada. Reiniciar agora para usar?', [
      { text: 'Depois', style: 'cancel' },
      { text: 'Reiniciar', onPress: () => Updates.reloadAsync().catch(() => {}) },
    ]);
  }, [isUpdatePending]);

  // Reminders follow the streak state
  useEffect(() => {
    if (!state.onboarded) return;
    const reminders = (state.settings.reminders || defaultReminders(state.profile.reminder, state.settings.nightly)).map((r) => smartNightly(r, state.studyHours));
    scheduleReminders({
      reminders,
      practicedToday: state.streak.lastDay === dayKey(),
      streakCount: state.streak.count,
      due: dueItems(state.srs, Date.now(), 999).length,
      worried: state.settings.worriedPing !== false,
    });
  }, [state.onboarded, state.profile.reminder, state.settings.notifStreak, state.settings.nightly, state.settings.reminders, state.settings.worriedPing, state.studyHours, state.streak.lastDay, state.streak.count, state.daily?.date]);

  // Cloud sync: on open, when progress changes (throttled) and on background
  const sync = async (force) => {
    if (!state.auth || !online) return;
    if (!force && Date.now() - lastSync.current < 60 * 1000) return;
    lastSync.current = Date.now();
    try {
      const doBackup = force || Date.now() - lastBackup.current > 10 * 60 * 1000;
      if (doBackup) lastBackup.current = Date.now();
      const a = await pushProgress(state.auth, state, doBackup ? getStateSnapshotForCloud(state) : null);
      if (a.idToken !== state.auth.idToken) actions.setAuth(a);
      if (state.lastSyncError || !state.lastSyncAt || Date.now() - state.lastSyncAt > 5 * 60 * 1000) actions.set({ lastSyncAt: Date.now(), lastSyncError: null });
      const cheers = await takeCheers(a);
      if (cheers.length) {
        const wk = weekKey();
        actions.set((s) => {
          const duelsIn = cheers.filter((c) => c.kind === 'duel' && c.from && c.week === wk && !(s.duels || []).find((d) => d.uid === c.from && d.week === wk));
          const friends = [...(s.friends || [])];
          duelsIn.forEach((d) => { if (!friends.find((f) => f.uid === d.from)) friends.push({ uid: d.from, name: d.name }); });
          return {
            cheers: [...(s.cheers || []), ...cheers].slice(-10),
            friends,
            duels: [...(s.duels || []), ...duelsIn.map((d) => ({ uid: d.from, name: d.name, week: wk, mon: mondayKey(), theme: d.theme || 'xp', theirXP: 0, status: 'active', invitedBy: 'them' }))],
          };
        });
      }
    } catch (e) {
      if (e?.code !== 'rules' && isNetworkError(e)) markOffline();
      if (e?.code === 'rules' && state.lastSyncError !== e.message) actions.set({ lastSyncError: e.message });
    }
  };
  useEffect(() => { sync(false); }, [state.xp, state.auth?.uid]);
  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => { if (st === 'background') sync(true); });
    return () => sub.remove();
  });
  return null;
}

function Shell() {
  const { state } = useStore();
  setA11y({ textScale: state.settings.textScale, reduceMotion: state.settings.reduceMotion });
  const t = useTheme();
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(t.bg).catch(() => {});
  }, [t.bg]);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar style={t.statusBar} />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: t.bg } }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="lesson/[id]" options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
        <Stack.Screen name="practice/[mode]" options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
      </Stack>
      <Effects />
      <Celebration />
      <OfflineBanner />
      <DialogHost />
    </View>
  );
}

function Themed() {
  const { state } = useStore();
  return (
    <ThemeProvider preference={state.settings.theme}>
      <Shell />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Fraunces_700Bold,
    Fraunces_600SemiBold,
    Fraunces_600SemiBold_Italic,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => {});
  }, [loaded]);
  if (!loaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider>
          <Themed />
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
