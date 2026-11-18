// Offline UI: a friendly card for features that need internet, and a slim global banner.
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Button } from './ui';
import Duck from './Duck';
import { useOnline, checkOnline } from '../services/net';

const WORKS = [
  ['📘', 'Lições', '/(tabs)'],
  ['🧠', 'Revisão', { pathname: '/practice/[mode]', params: { mode: 'review' } }],
  ['📖', 'Histórias', '/stories'],
  ['🃏', 'Flashcards', '/flashcards'],
  ['📝', 'Ditado', { pathname: '/practice/[mode]', params: { mode: 'dictation' } }],
  ['🎧', 'Sons', '/sounds'],
  ['🗂️', 'Vocabulário', '/vocab'],
  ['📐', 'Gramática', '/grammar'],
];

export function OfflineCard({ title = 'Sem internet por aqui', text, note, style, compact }) {
  const t = useTheme();
  const [busy, setBusy] = useState(false);
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const l = Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(float, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    l.start();
    return () => l.stop();
  }, []);
  const retry = async () => {
    setBusy(true);
    await checkOnline({ force: true });
    setBusy(false);
  };
  return (
    <View style={[{ borderRadius: radius.xl, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, overflow: 'hidden' }, style]}>
      <View style={{ backgroundColor: t.mode === 'dark' ? '#1E293B' : '#E8EEF9', alignItems: 'center', paddingTop: compact ? 14 : 22, paddingBottom: 12 }}>
        <View style={{ position: 'absolute', top: 14, right: 18, flexDirection: 'row', gap: 4, opacity: 0.6 }}>
          {[10, 16, 22].map((h, i) => (
            <View key={i} style={{ width: 6, height: h, borderRadius: 3, alignSelf: 'flex-end', backgroundColor: i === 0 ? t.text3 : t.border }} />
          ))}
        </View>
        <Animated.View style={{ transform: [{ translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }] }}>
          <Duck mood="offline" size={compact ? 84 : 112} />
        </Animated.View>
      </View>
      <View style={{ padding: 18, gap: 10 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 21, color: t.text, textAlign: 'center' }}>{title}</Text>
        {text ? <T v="body" center color={t.text2}>{text}</T> : null}
        {note ? (
          <View style={{ flexDirection: 'row', gap: 8, padding: 10, borderRadius: 12, backgroundColor: palette.goldSoft }}>
            <Text>💡</Text>
            <T v="small" color={t.text} style={{ flex: 1 }}>{note}</T>
          </View>
        ) : null}
        {!compact ? (
          <>
            <T v="label" style={{ marginTop: 4 }}>Funciona sem internet</T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {WORKS.map(([e, l, to]) => (
                <Pressable key={l} onPress={() => router.push(to)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 99, backgroundColor: t.successSoft }}>
                  <Text style={{ fontSize: 14 }}>{e}</Text>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: t.success }}>{l}</Text>
                </Pressable>
              ))}
            </View>
          </>
        ) : null}
        <Button title={busy ? 'Procurando sinal…' : 'Tentar de novo'} icon="refresh" small variant="secondary" disabled={busy} onPress={retry} />
      </View>
    </View>
  );
}

// Slim banner shown on top of every screen while offline; says "back online" when it returns.
export function OfflineBanner() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const on = useOnline();
  const [show, setShow] = useState(null); // 'off' | 'back' | null
  const y = useRef(new Animated.Value(-80)).current;
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; if (on) return; }
    setShow(on ? 'back' : 'off');
    Animated.spring(y, { toValue: 0, useNativeDriver: true, friction: 8 }).start();
    const id = setTimeout(() => Animated.timing(y, { toValue: -80, duration: 300, useNativeDriver: true }).start(() => setShow(null)), on ? 2600 : 4500);
    return () => clearTimeout(id);
  }, [on]);
  if (!show) return null;
  const off = show === 'off';
  return (
    <Animated.View pointerEvents="box-none" style={{ position: 'absolute', top: insets.top + 6, left: 0, right: 0, alignItems: 'center', transform: [{ translateY: y }], zIndex: 50, elevation: 50 }}>
      <Pressable onPress={() => off && checkOnline({ force: true })} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, backgroundColor: off ? (t.mode === 'dark' ? '#334155' : '#1F2937') : t.success, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 6 }}>
        <Text style={{ fontSize: 14 }}>{off ? '📡' : '☁️'}</Text>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: '#fff' }}>{off ? 'Offline · seu progresso fica salvo no celular' : 'De volta online!'}</Text>
      </Pressable>
    </Animated.View>
  );
}
