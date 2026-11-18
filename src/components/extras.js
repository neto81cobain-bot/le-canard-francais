import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated, Easing, Dimensions, Text, Pressable } from 'react-native';
import { useTheme, fonts, palette } from '../theme';
import Icon from './Icon';
import { Tap } from './ui';
import { speak, setSpeechRate } from '../services/speech';
import { useStore } from '../store';

// Voice speed pill (cycles; saved in settings, applies everywhere)
const SPEEDS = [[0.6, '🐢 0.6×'], [0.75, '0.75×'], [0.9, '1×'], [1.05, '1.15×'], [1.2, '🐇 1.3×']];
export function SpeedChip({ style }) {
  const t = useTheme();
  const { state, actions } = useStore();
  const cur = state.settings.speechRate || 0.9;
  const i = Math.max(0, SPEEDS.findIndex(([v]) => Math.abs(v - cur) < 0.01));
  const next = () => {
    const [v] = SPEEDS[(i + 1) % SPEEDS.length];
    setSpeechRate(v);
    actions.setSettings({ speechRate: v });
  };
  return (
    <Pressable onPress={next} hitSlop={8} style={[{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, backgroundColor: t.surface2, borderWidth: 1, borderColor: t.border }, style]}>
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: t.text2 }}>🔊 {SPEEDS[i][1]}</Text>
    </Pressable>
  );
}

// ─── AUDIO BUTTONS ────────────────────────────────────────
export function AudioButton({ text, size = 52, slow, autoPlay, color, style }) {
  const t = useTheme();
  const [playing, setPlaying] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;

  const run = () => {
    setPlaying(true);
    speak(text, { slow, onDone: () => setPlaying(false) });
  };
  useEffect(() => {
    if (autoPlay) {
      const id = setTimeout(run, 250);
      return () => clearTimeout(id);
    }
  }, [text, autoPlay]);
  useEffect(() => {
    if (!playing) return pulse.setValue(0);
    const l = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]));
    l.start();
    return () => l.stop();
  }, [playing]);

  const bg = color || (slow ? t.surface2 : t.sky);
  return (
    <Tap onPress={run} style={style} accessibilityLabel={slow ? 'Ouvir devagar' : 'Ouvir'}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.3,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 3,
          borderBottomColor: slow ? t.border : '#2563EB',
          transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.07] }) }],
        }}
      >
        <Icon name={slow ? 'turtle' : 'volume'} size={size * 0.48} color={slow ? t.text2 : '#fff'} stroke={2.3} />
      </Animated.View>
    </Tap>
  );
}

export function AudioPair({ text, size = 52, autoPlay }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end' }}>
      <AudioButton text={text} size={size} autoPlay={autoPlay} />
      <AudioButton text={text} size={size * 0.75} slow />
    </View>
  );
}

// Tap a French sentence: words can be pronounced individually.
export function SpeakableText({ text, style, color }) {
  const t = useTheme();
  const parts = text.split(/(\s+)/);
  return (
    <Text style={[{ fontFamily: fonts.displayItalic, fontSize: 22, lineHeight: 31, color: color || t.text }, style]}>
      {parts.map((p, i) =>
        /\s+/.test(p) ? p : (
          <Text key={i} onPress={() => speak(p.replace(/[.,!?;:«»"]/g, ''))} suppressHighlighting>
            {p}
          </Text>
        )
      )}
    </Text>
  );
}

// ─── CONFETTI ─────────────────────────────────────────────
const COLORS = [palette.red, palette.navy, palette.gold, palette.green, palette.sky, '#fff'];
export function Confetti({ count = 40, run = true }) {
  const { width, height } = Dimensions.get('window');
  const pieces = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      delay: Math.random() * 400,
      size: 6 + Math.random() * 7,
      color: COLORS[i % COLORS.length],
      rot: Math.random() * 360,
      drift: (Math.random() - 0.5) * 120,
      v: new Animated.Value(0),
    })),
    [run]
  );
  useEffect(() => {
    if (!run) return;
    pieces.forEach((p) =>
      Animated.timing(p.v, { toValue: 1, duration: 1800 + Math.random() * 900, delay: p.delay, easing: Easing.out(Easing.quad), useNativeDriver: true }).start()
    );
  }, [run]);
  if (!run) return null;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 50 }}>
      {pieces.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            borderRadius: 2,
            backgroundColor: p.color,
            opacity: p.v.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 1, 0] }),
            transform: [
              { translateY: p.v.interpolate({ inputRange: [0, 1], outputRange: [0, height * 0.9] }) },
              { translateX: p.v.interpolate({ inputRange: [0, 1], outputRange: [0, p.drift] }) },
              { rotate: p.v.interpolate({ inputRange: [0, 1], outputRange: [`${p.rot}deg`, `${p.rot + 540}deg`] }) },
            ],
          }}
        />
      ))}
    </View>
  );
}

// ─── COUNT UP NUMBER ──────────────────────────────────────
export function CountUp({ to, duration = 900, style, prefix = '', suffix = '' }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <Text style={style}>{prefix}{v}{suffix}</Text>;
}

// ─── FADE IN ON MOUNT ─────────────────────────────────────
export function Appear({ delay = 0, children, style, from = 16 }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 380, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[{ opacity: a, transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }] }, style]}>
      {children}
    </Animated.View>
  );
}

// ─── SHAKE (for wrong answers) ────────────────────────────
export function useShake() {
  const v = useRef(new Animated.Value(0)).current;
  const shake = () => {
    v.setValue(0);
    Animated.sequence([
      Animated.timing(v, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(v, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(v, { toValue: 0.6, duration: 50, useNativeDriver: true }),
      Animated.timing(v, { toValue: -0.6, duration: 50, useNativeDriver: true }),
      Animated.timing(v, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };
  const style = { transform: [{ translateX: v.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }) }] };
  return [style, shake];
}

// ─── ACCENT KEYBOARD ROW ──────────────────────────────────
const ACCENTS = ['é', 'è', 'ê', 'à', 'â', 'ç', 'ù', 'û', 'ô', 'î', 'ï', 'ë', 'œ', "'"];
export function AccentBar({ onInsert }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
      {ACCENTS.map((c) => (
        <Pressable key={c} onPress={() => onInsert(c)} style={{ minWidth: 38, height: 38, borderRadius: 10, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderBottomWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 17, color: t.text }}>{c}</Text>
        </Pressable>
      ))}
    </View>
  );
}
