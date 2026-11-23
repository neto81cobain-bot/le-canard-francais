import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Tabs, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, fonts } from '../../theme';
import Icon from '../../components/Icon';
import { fx } from '../../services/feedback';
import { useDesktop } from '../../components/desktop';

const TABS = {
  index: { label: 'Aprender', icon: 'home' },
  praticar: { label: 'Praticar', icon: 'dumbbell' },
  falar: { label: 'Falar', icon: 'mic' },
  liga: { label: 'Clube', icon: 'trophy' },
  perfil: { label: 'Perfil', icon: 'user' },
};

function TabBar({ state, navigation, emitter, navigateToTab }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { desktop } = useDesktop();
  if (desktop) return null; // no computador a navegação fica na barra lateral
  return (
    <View style={{ flexDirection: 'row', backgroundColor: t.tabBar, borderTopWidth: 1, borderTopColor: t.border, paddingBottom: Math.max(insets.bottom, 8), paddingTop: 8, paddingHorizontal: 6 }}>
      {state.routes.map((route, i) => {
        const cfg = TABS[route.name];
        if (!cfg) return null;
        const focused = state.index === i;
        const color = focused ? t.primary : t.text3;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={cfg.label}
            onPress={() => {
              fx.tap();
              // expo-router 58 passes `emitter` + `navigateToTab` (no `navigation` anymore)
              const em = emitter || navigation;
              let prevented = false;
              try {
                const e = em?.emit?.({ type: 'tabPress', target: route.key, canPreventDefault: true });
                prevented = !!e?.defaultPrevented;
              } catch {}
              if (focused || prevented) return;
              if (navigateToTab) navigateToTab(route.key);
              else if (navigation?.navigate) navigation.navigate(route.name);
              else router.navigate(route.name === 'index' ? '/' : '/' + route.name);
            }}
            style={{ flex: 1, alignItems: 'center', gap: 3, paddingVertical: 4 }}
          >
            <View style={{ paddingHorizontal: 16, paddingVertical: 5, borderRadius: 14, backgroundColor: focused ? t.primarySoft : 'transparent' }}>
              <Icon name={cfg.icon} size={23} color={t.mode === 'dark' && focused ? t.sky : color} stroke={focused ? 2.5 : 2} />
            </View>
            <Text style={{ fontFamily: focused ? fonts.bodyHeavy : fonts.bodySemi, fontSize: 11.5, color: t.mode === 'dark' && focused ? t.sky : color }}>{cfg.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(p) => <TabBar {...p} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="praticar" />
      <Tabs.Screen name="falar" />
      <Tabs.Screen name="liga" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}
