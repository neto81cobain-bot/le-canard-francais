import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path, Circle, Ellipse, Rect, G } from 'react-native-svg';
import { useStore } from '../store';
import { SHOP, wornOf } from '../store/logic';
import { dayKey, diffDays } from '../store/dates';
import { a11y } from '../services/a11y';
import { duckLayers, SCENES, DUCK_TRANSFORM, ANCHORS } from './duckArt';

// Monsieur Canard — vector duck that wears what the user bought (see duckArt.js).
const MOODS = {
  wave: { badge: '👋', anim: 'wiggle' },
  teach: { badge: '☝️', anim: 'nod' },
  celebrate: { badge: '🎉', anim: 'jump' },
  think: { badge: '💭', anim: 'tilt' },
  comfort: { badge: '🤗', anim: 'sway' },
  listen: { badge: '🎧', anim: 'nod' },
  speak: { badge: '🎤', anim: 'nod' },
  sleep: { badge: '💤', anim: 'breathe' },
  offline: { badge: '📡', anim: 'sway' },
  sad: { badge: '🥺', anim: 'breathe' },
  worried: { badge: '😟', anim: 'sway' },
  happy: { badge: null, anim: 'breathe' },
  proud: { badge: '🏆', anim: 'jump' },
};

const TAGS = { path: Path, circle: Circle, ellipse: Ellipse, rect: Rect, g: G };
function renderNodes(nodes) {
  return nodes.map(([tag, attrs, kids], i) => {
    const C = TAGS[tag];
    if (!C) return null;
    return <C key={i} {...attrs}>{kids ? renderNodes(kids) : null}</C>;
  });
}

// duck coordinates → 0..1 of the 240 box
const toBox = (x, y) => ({ x: (12 + 0.88 * x) / 240, y: (26 + 0.88 * y) / 240 });
const HEAD_VB = { x: 58, y: 2, w: 136, h: 136 };

export function resolveWear(outfit, inventory) {
  if (outfit === null) return {};
  if (typeof outfit === 'string') {
    const it = SHOP.find((x) => x.id === outfit);
    return it?.slot ? { [it.slot]: outfit } : {};
  }
  if (outfit && typeof outfit === 'object') return outfit;
  return wornOf(inventory);
}

function Emoji({ slot, id, size, head }) {
  const item = id && SHOP.find((x) => x.id === id);
  const a = ANCHORS[slot];
  if (!item || !a || head) return null;
  const p = toBox(a.x, a.y);
  const fs = ((a.s * 0.88) / 240) * size;
  const box = fs * 1.3;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: p.x * size - box / 2, top: p.y * size - box / 2, width: box, height: box, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: `${a.r}deg` }] }}>
      <Text style={{ fontSize: fs, lineHeight: fs * 1.18, textAlign: 'center', includeFontPadding: false }}>{item.emoji}</Text>
    </View>
  );
}

export function DuckArt({ size, mood = 'happy', wear = {}, head = false, scene = true }) {
  const sceneId = scene ? wear.scene : null;
  const vb = head ? `${HEAD_VB.x} ${HEAD_VB.y} ${HEAD_VB.w} ${HEAD_VB.h}` : '0 0 240 240';
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={vb}>
        {sceneId && SCENES[sceneId] ? renderNodes(SCENES[sceneId]) : null}
        <G transform={DUCK_TRANSFORM}>{renderNodes(duckLayers({ mood, wear }))}</G>
      </Svg>
      <Emoji slot="held" id={wear.held} size={size} head={head} />
      <Emoji slot="ground" id={wear.ground} size={size} head={head} />
    </View>
  );
}

// Sleepy when the user has been away for a while (unless a specific mood was asked for).
export function autoMood(mood, state) {
  if (mood !== 'happy' || !state?.streak) return mood;
  const last = state.streak.lastDay;
  if (!last) return mood;
  const away = diffDays(last, dayKey());
  if (away >= 3) return 'sad';
  if (away >= 2) return 'sleep';
  // evening and nothing done today → worried about the streak
  if (away >= 1 && new Date().getHours() >= 20) return 'worried';
  return mood;
}

export default function Duck({ size = 120, mood = 'happy', head = false, style, outfit, noBadge, scene = false, live = false }) {
  const { state } = useStore() || {};
  const a = useRef(new Animated.Value(0)).current;
  const realMood = live ? autoMood(mood, state) : mood;
  const m = MOODS[realMood] || MOODS.happy;
  const wear = resolveWear(outfit, state?.inventory);

  useEffect(() => {
    a.setValue(0);
    if (a11y.reduceMotion) return;
    let loop;
    const dur = { jump: 520, wiggle: 380, tilt: 1400, sway: 1600, nod: 900, breathe: 2400 }[m.anim] || 2000;
    if (m.anim === 'jump') {
      loop = Animated.sequence([
        Animated.timing(a, { toValue: 1, duration: dur / 2, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: dur / 2, easing: Easing.bounce, useNativeDriver: true }),
        Animated.delay(300),
        Animated.timing(a, { toValue: 1, duration: dur / 2, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: dur / 2, easing: Easing.bounce, useNativeDriver: true }),
      ]);
      loop.start();
    } else {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(a, { toValue: 1, duration: dur, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(a, { toValue: 0, duration: dur, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );
      loop.start();
    }
    return () => loop && loop.stop();
  }, [realMood]);

  const transform = {
    jump: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.18] }) }, { scale: a.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }) }],
    wiggle: [{ rotate: a.interpolate({ inputRange: [0, 1], outputRange: ['-5deg', '5deg'] }) }],
    tilt: [{ rotate: a.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-8deg'] }) }],
    sway: [{ translateX: a.interpolate({ inputRange: [0, 1], outputRange: [-3, 3] }) }],
    nod: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [0, 3] }) }],
    breathe: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] }) }],
  }[m.anim];

  const badgeSize = Math.max(22, size * 0.28);
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Animated.View style={{ width: size, height: size, transform, borderRadius: head ? size / 2 : 0, overflow: head ? 'hidden' : 'visible' }}>
        <DuckArt size={size} mood={realMood} wear={wear} head={head} scene={scene || head} />
      </Animated.View>
      {m.badge && !noBadge ? (
        <View style={{ position: 'absolute', right: -2, top: size * 0.02, width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#F1E8D8' }}>
          <Text style={{ fontSize: badgeSize * 0.55 }}>{m.badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

// Round avatar: custom photo if any, otherwise the duck's head wearing the user's outfit.
export function DuckAvatar({ size = 44, photo, style, outfit, mood = 'happy' }) {
  const [broken, setBroken] = React.useState(false);
  const { state } = useStore() || {};
  if (photo && !broken) {
    return <Image source={{ uri: photo }} onError={() => setBroken(true)} recyclingKey={photo.slice(0, 64)} cachePolicy="memory-disk" style={[{ width: size, height: size, borderRadius: size / 2 }, style]} />;
  }
  const wear = resolveWear(outfit, state?.inventory);
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: '#F4EFE6' }, style]}>
      <DuckArt size={size} mood={mood} wear={wear} head scene />
    </View>
  );
}
