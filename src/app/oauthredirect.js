// Google sends the user back to com.raimundo.lecanardfrancais:/oauthredirect?code=…
// expo-router opens this screen for that link. We hand the code to the sign-in in
// progress (or finish the sign-in ourselves if the app was restarted) and go back.
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Alert } from '../services/dialog';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { handleOAuthRedirect } from '../services/auth';
import { useStore } from '../store';
import { useTheme } from '../theme';
import { T } from '../components/ui';
import Duck from '../components/Duck';

export default function OAuthRedirect() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { actions } = useStore();
  const t = useTheme();

  useEffect(() => {
    let alive = true;
    (async () => {
      const code = Array.isArray(params.code) ? params.code[0] : params.code;
      const r = await handleOAuthRedirect(code);
      if (!alive) return;
      if (r.auth) {
        actions.setAuth(r.auth);
        Alert.alert('Conectado!', `Bem-vindo, ${r.auth.name}! 🦆`);
      } else if (r.error) {
        Alert.alert('Não foi possível entrar', r.error);
      }
      if (router.canGoBack()) router.back();
      else router.replace('/(tabs)/liga');
    })();
    return () => { alive = false; };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Duck mood="happy" size={110} />
      <ActivityIndicator color={t.primary} size="large" />
      <T v="bodyBold">Entrando com Google…</T>
    </View>
  );
}
