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
import { RootErrorScreen } from '../components/ErrorBoundary';
import { setFeedbackPrefs } from '../services/feedback';
import { setSpeechRate } from '../services/speech';
import { setAiOverride } from '../services/ai';
import { scheduleReminders } from '../services/notifications';
import { pushProgress, takeCheers } from '../services/cloud';
import { dayKey, weekKey, mondayKey } from '../store/dates';

SplashScreen.preventAutoHideAsync().catch(() => {});

export function ErrorBoundary(props) {
  return <RootErrorScreen {...props} />;
}

function Effects() {
  const { state, actions } = useStore();
  const lastSync = useRef(0);
  const lastBackup = useRef(0);

  useEffect(() => {
    setFeedbackPrefs({ sounds: state.settings.sounds, haptics: state.settings.haptics });
    setSpeechRate(state.settings.speechRate);
    setAiOverride({ apiUrl: state.settings.apiUrl, key: state.settings.ownGroqKey });
  }, [state.settings]);

  // Reminders follow the streak state
  useEffect(() => {
    if (!state.onboarded) return;
    scheduleReminders({
      reminder: state.profile.reminder,
      notifStreak: state.settings.notifStreak,
      practicedToday: state.streak.lastDay === dayKey(),
      streakCount: state.streak.count,
    });
  }, [state.onboarded, state.profile.reminder, state.settings.notifStreak, state.streak.lastDay, state.streak.count]);

  // Cloud sync: on open, when progress changes (throttled) and on background
  const sync = async (force) => {
    if (!state.auth) return;
    if (!force && Date.now() - lastSync.current < 60 * 1000) return;
    lastSync.current = Date.now();
    try {
      const doBackup = force || Date.now() - lastBackup.current > 10 * 60 * 1000;
      if (doBackup) lastBackup.current = Date.now();
      const a = await pushProgress(state.auth, state, doBackup ? getStateSnapshotForCloud(state) : null);
      if (a.idToken !== state.auth.idToken) actions.setAuth(a);
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
            duels: [...(s.duels || []), ...duelsIn.map((d) => ({ uid: d.from, name: d.name, week: wk, mon: mondayKey(), theirXP: 0, status: 'active', invitedBy: 'them' }))],
          };
        });
      }
    } catch {}
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
