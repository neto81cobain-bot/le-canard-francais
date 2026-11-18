import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path, Line } from 'react-native-svg';
import { useStore } from '../store';
import { useTheme, palette } from '../theme';
import { T } from '../components/ui';
import Duck from '../components/Duck';

// Animated splash: Eiffel Tower in thin lines, the duck hops in, logo fades.
function Eiffel({ color }) {
  return (
    <Svg width={220} height={300} viewBox="0 0 100 140" fill="none" stroke={color} strokeWidth={0.8} strokeLinecap="round">
      <Path d="M50 4 L50 12 M47 12 L53 12 L56 40 L44 40 Z" />
      <Path d="M44 40 L40 70 L60 70 L56 40" />
      <Line x1="38" y1="70" x2="62" y2="70" />
      <Path d="M40 70 L22 136 M60 70 L78 136" />
      <Path d="M30 104 Q50 86 70 104" />
      <Line x1="34" y1="92" x2="66" y2="92" />
      <Path d="M45 46 L55 52 M55 46 L45 52 M44 56 L56 64 M56 56 L44 64" />
      <Line x1="18" y1="136" x2="82" y2="136" />
    </Svg>
  );
}

// Starts exactly like the native splash (same plain duck, same size, centred), so there is
// only ONE duck: he waves, puts on the user's outfit and moves up while the logo appears.
export default function Splash() {
  const { state } = useStore();
  const t = useTheme();
  const up = useRef(new Animated.Value(0)).current;
  const b = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  const [dressed, setDressed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setDressed(true);
      Animated.sequence([
        Animated.timing(pop, { toValue: 1.08, duration: 120, useNativeDriver: true }),
        Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
    }, 250);
    Animated.sequence([
      Animated.delay(420),
      Animated.parallel([
        Animated.timing(up, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(b, { toValue: 1, duration: 420, delay: 120, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();
    const id = setTimeout(() => {
      router.replace(state.onboarded ? '/(tabs)' : '/onboarding');
    }, 1600);
    return () => { clearTimeout(id); clearTimeout(t1); };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ position: 'absolute', opacity: b.interpolate({ inputRange: [0, 1], outputRange: [0, 0.14] }) }}>
        <Eiffel color={t.primary} />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: up.interpolate({ inputRange: [0, 1], outputRange: [0, -70] }) }, { scale: up.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] }) }] }}>
        <Animated.View style={{ transform: [{ scale: pop }] }}>
          <Duck size={220} mood="wave" noBadge outfit={dressed ? undefined : null} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={{ position: 'absolute', top: '58%', opacity: b, alignItems: 'center', transform: [{ translateY: b.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }}>
        <T v="h1" color={t.primary}>Le canard</T>
        <T v="h1" color={palette.red} style={{ marginTop: -6 }}>français</T>
        <View style={{ flexDirection: 'row', marginTop: 12, borderRadius: 4, overflow: 'hidden' }}>
          <View style={{ width: 22, height: 5, backgroundColor: palette.navy }} />
          <View style={{ width: 22, height: 5, backgroundColor: '#fff' }} />
          <View style={{ width: 22, height: 5, backgroundColor: palette.red }} />
        </View>
      </Animated.View>
    </View>
  );
}
