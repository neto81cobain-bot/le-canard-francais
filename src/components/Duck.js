import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Image } from 'expo-image';
import { useStore } from '../store';
import { SHOP } from '../store/logic';

const DUCK = require('../../assets/images/duck.png');
const HEAD = require('../../assets/images/duck_head.png');

// Monsieur Canard — one illustration, eight moods (animation + prop badge).
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
  happy: { badge: null, anim: 'breathe' },
  proud: { badge: '🏆', anim: 'jump' },
};

export default function Duck({ size = 120, mood = 'happy', head = false, style, outfit, noBadge }) {
  const { state } = useStore() || {};
  const a = useRef(new Animated.Value(0)).current;
  const m = MOODS[mood] || MOODS.happy;
  const equipped = outfit !== undefined ? outfit : state?.inventory?.equipped;
  const outfitEmoji = equipped ? SHOP.find((s) => s.id === equipped)?.emoji : null;

  useEffect(() => {
    a.setValue(0);
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
  }, [mood]);

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
      <Animated.View style={{ width: size, height: size, transform }}>
        <Image source={head ? HEAD : DUCK} style={{ width: size, height: size, borderRadius: head ? size / 2 : 0 }} contentFit="contain" />
      </Animated.View>
      {m.badge && !noBadge ? (
        <View style={{ position: 'absolute', right: -2, top: size * 0.02, width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#F1E8D8' }}>
          <Text style={{ fontSize: badgeSize * 0.55 }}>{m.badge}</Text>
        </View>
      ) : null}
      {outfitEmoji ? (
        <View style={{ position: 'absolute', left: -2, bottom: size * 0.02 }}>
          <Text style={{ fontSize: Math.max(18, size * 0.24) }}>{outfitEmoji}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function DuckAvatar({ size = 44, photo, style }) {
  const [broken, setBroken] = React.useState(false);
  if (photo && !broken) {
    return <Image source={{ uri: photo }} onError={() => setBroken(true)} recyclingKey={photo} cachePolicy="memory-disk" style={[{ width: size, height: size, borderRadius: size / 2 }, style]} />;
  }
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: '#F4EFE6' }, style]}>
      <Image source={HEAD} style={{ width: size, height: size }} contentFit="cover" />
    </View>
  );
}
