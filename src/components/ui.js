import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, ScrollView, Modal, ActivityIndicator, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { useTheme, fonts, radius, shadow, palette } from '../theme';
import Icon from './Icon';
import { fx } from '../services/feedback';
import { useKeyboardOverlap, scrollFocusedIntoView } from './keyboard';

// ─── TEXT ─────────────────────────────────────────────────
export function T({ v = 'body', color, style, children, center, ...rest }) {
  const t = useTheme();
  const base = {
    h1: { fontFamily: fonts.display, fontSize: 30, lineHeight: 36, color: t.text },
    h2: { fontFamily: fonts.display, fontSize: 24, lineHeight: 30, color: t.text },
    h3: { fontFamily: fonts.displaySemi, fontSize: 19, lineHeight: 25, color: t.text },
    title: { fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 23, color: t.text },
    body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 23, color: t.text },
    bodyBold: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 23, color: t.text },
    small: { fontFamily: fonts.bodySemi, fontSize: 14, lineHeight: 20, color: t.text2 },
    caption: { fontFamily: fonts.bodyBold, fontSize: 13, lineHeight: 18, color: t.text3 },
    label: { fontFamily: fonts.bodyHeavy, fontSize: 12, lineHeight: 16, letterSpacing: 1.1, color: t.text3, textTransform: 'uppercase' },
    fr: { fontFamily: fonts.displayItalic, fontSize: 22, lineHeight: 30, color: t.text },
    frBig: { fontFamily: fonts.displayItalic, fontSize: 28, lineHeight: 36, color: t.text },
    num: { fontFamily: fonts.bodyHeavy, fontSize: 22, lineHeight: 26, color: t.text },
  }[v];
  return (
    <Text style={[base, color && { color }, center && { textAlign: 'center' }, style]} {...rest}>
      {children}
    </Text>
  );
}

// ─── PRESSABLE WITH SPRING ────────────────────────────────
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Tap({ onPress, style, children, disabled, haptic = true, scaleTo = 0.97, ...rest }) {
  const s = useRef(new Animated.Value(1)).current;
  const to = (v) => Animated.spring(s, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  return (
    <AnimatedPressable
      disabled={disabled}
      onPressIn={() => to(scaleTo)}
      onPressOut={() => to(1)}
      onPress={(e) => {
        if (haptic) fx.tap();
        onPress && onPress(e);
      }}
      style={[style, { transform: [{ scale: s }] }]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

// ─── 3D BUTTON ────────────────────────────────────────────
export function Button({ title, onPress, variant = 'primary', icon, disabled, loading, style, small, color }) {
  const t = useTheme();
  const press = useRef(new Animated.Value(0)).current;
  const variants = {
    primary: { bg: t.primary, ledge: t.primaryDark, fg: t.onPrimary },
    success: { bg: t.success, ledge: palette.greenDark, fg: '#fff' },
    danger: { bg: t.accent, ledge: palette.redDark, fg: '#fff' },
    gold: { bg: palette.gold, ledge: palette.goldDark, fg: '#fff' },
    error: { bg: t.error, ledge: palette.coralDark, fg: '#fff' },
    secondary: { bg: t.surface, ledge: t.borderStrong, fg: t.primary, border: t.border },
    ghost: { bg: 'transparent', ledge: 'transparent', fg: t.text2 },
  };
  const v = variants[variant] || variants.primary;
  const bg = color || v.bg;
  const h = small ? 44 : 56;
  const ledge = variant === 'ghost' ? 0 : 4;
  const off = disabled ? { bg: t.surface3, ledge: t.border, fg: t.text3 } : null;
  const ty = press.interpolate({ inputRange: [0, 1], outputRange: [0, ledge] });
  return (
    <Pressable
      disabled={disabled || loading}
      onPressIn={() => Animated.timing(press, { toValue: 1, duration: 70, useNativeDriver: true }).start()}
      onPressOut={() => Animated.timing(press, { toValue: 0, duration: 110, useNativeDriver: true }).start()}
      onPress={() => {
        fx.tap();
        onPress && onPress();
      }}
      style={[{ height: h + ledge }, style]}
    >
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h, borderRadius: radius.md, backgroundColor: off ? off.ledge : color ? 'rgba(0,0,0,0.25)' : v.ledge }} />
      <Animated.View
        style={{
          height: h,
          borderRadius: radius.md,
          backgroundColor: off ? off.bg : bg,
          borderWidth: v.border ? 2 : 0,
          borderColor: v.border,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 18,
          transform: [{ translateY: ty }],
        }}
      >
        {loading ? (
          <ActivityIndicator color={off ? off.fg : v.fg} />
        ) : (
          <>
            {icon ? <Icon name={icon} size={small ? 18 : 20} color={off ? off.fg : v.fg} stroke={2.4} /> : null}
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: small ? 15 : 17, color: off ? off.fg : v.fg, letterSpacing: 0.3 }}>{title}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}

// ─── CARD ─────────────────────────────────────────────────
export function Card({ children, style, onPress, padded = true, tone }) {
  const t = useTheme();
  const st = [
    {
      backgroundColor: tone || t.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      padding: padded ? 16 : 0,
    },
    shadow(t, 1),
    style,
  ];
  if (onPress) return <Tap onPress={onPress} style={st}>{children}</Tap>;
  return <View style={st}>{children}</View>;
}

// ─── CHIP ─────────────────────────────────────────────────
export function Chip({ label, color, bg, icon, style, big }) {
  const t = useTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: big ? 12 : 9, paddingVertical: big ? 6 : 4, borderRadius: radius.pill, backgroundColor: bg || t.surface2 }, style]}>
      {icon ? <Icon name={icon} size={big ? 16 : 13} color={color || t.text2} stroke={2.5} /> : null}
      <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: big ? 14 : 12, color: color || t.text2 }}>{label}</Text>
    </View>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────
export function ProgressBar({ value = 0, color, height = 12, track, style }) {
  const t = useTheme();
  const w = useRef(new Animated.Value(value)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: Math.max(0, Math.min(1, value)), duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value]);
  return (
    <View style={[{ height, borderRadius: height, backgroundColor: track || t.surface3, overflow: 'hidden' }, style]}>
      <Animated.View
        style={{
          height,
          borderRadius: height,
          backgroundColor: color || t.success,
          width: w.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
        }}
      >
        <View style={{ position: 'absolute', top: 3, left: 8, right: 8, height: Math.max(2, height / 4), borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.35)' }} />
      </Animated.View>
    </View>
  );
}

// ─── RING ─────────────────────────────────────────────────
export function Ring({ value = 0, size = 64, stroke = 8, color, track, children }) {
  const t = useTheme();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track || t.surface3} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color || t.success}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - Math.max(0, Math.min(1, value)))}
          strokeLinecap="round"
        />
      </Svg>
      {children}
    </View>
  );
}

// ─── SCREEN + HEADER ──────────────────────────────────────
export function Screen({ children, scroll = true, title, back = true, right, padded = true, bg, contentStyle, onBack, headerless }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const wrap = useRef(null);
  const sv = useRef(null);
  const offset = useRef(0);
  const overlap = useKeyboardOverlap(wrap, (kbTop) => scrollFocusedIntoView(sv, offset, kbTop));
  const body = scroll ? (
    <ScrollView
      ref={sv}
      onScroll={(e) => { offset.current = e.nativeEvent.contentOffset.y; }}
      scrollEventThrottle={32}
      contentContainerStyle={[{ padding: padded ? 20 : 0, paddingBottom: 40 + insets.bottom + overlap }, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1, padding: padded ? 20 : 0, paddingBottom: (padded ? 20 : 0) + insets.bottom + overlap }, contentStyle]}>{children}</View>
  );
  return (
    <View ref={wrap} style={{ flex: 1, backgroundColor: bg || t.bg, paddingTop: insets.top }}>
      {!headerless && (title || back) ? <Header title={title} back={back} right={right} onBack={onBack} /> : null}
      {body}
    </View>
  );
}

export function Header({ title, back = true, right, onBack }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 12, minHeight: 56 }}>
      {back ? (
        <Tap
          onPress={() => (onBack ? onBack() : router.canGoBack() ? router.back() : router.replace('/'))}
          style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}
          accessibilityLabel="Voltar"
        >
          <Icon name="back" size={22} color={t.text} stroke={2.6} />
        </Tap>
      ) : null}
      <T v="h3" style={{ flex: 1 }} numberOfLines={1}>{title}</T>
      {right}
    </View>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────
export function Section({ title, action, onAction, style }) {
  const t = useTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 12 }, style]}>
      <T v="h3">{title}</T>
      {action ? (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={{ fontFamily: fonts.bodyHeavy, color: t.sky, fontSize: 14 }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

// ─── LIST ROW ─────────────────────────────────────────────
export function Row({ icon, iconBg, iconColor, title, subtitle, right, onPress, last, emoji }) {
  const t = useTheme();
  const inner = (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, gap: 14, borderBottomWidth: last ? 0 : 1, borderBottomColor: t.border }}>
      {icon || emoji ? (
        <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: iconBg || t.surface2, alignItems: 'center', justifyContent: 'center' }}>
          {emoji ? <Text style={{ fontSize: 20 }}>{emoji}</Text> : <Icon name={icon} size={20} color={iconColor || t.primary} />}
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <T v="bodyBold">{title}</T>
        {subtitle ? <T v="small">{subtitle}</T> : null}
      </View>
      {right !== undefined ? right : onPress ? <Icon name="chevron" size={20} color={t.text3} /> : null}
    </View>
  );
  if (onPress) return <Pressable onPress={onPress} android_ripple={{ color: t.surface2 }}>{inner}</Pressable>;
  return inner;
}

// ─── BOTTOM SHEET ─────────────────────────────────────────
export function Sheet({ visible, onClose, children }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const ref = useRef(null);
  const overlap = useKeyboardOverlap(ref);
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <View ref={ref} style={{ flex: 1, paddingBottom: overlap }}>
        <Pressable style={{ flex: 1, backgroundColor: t.overlay }} onPress={onClose} />
        <View style={{ backgroundColor: t.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 12, maxHeight: '88%' }}>
          <View style={{ width: 44, height: 5, borderRadius: 3, backgroundColor: t.border, alignSelf: 'center', marginBottom: 6 }} />
          <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 10, paddingBottom: 24 + (overlap ? 0 : insets.bottom) }} keyboardShouldPersistTaps="handled" bounces={false}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ─── SPEECH BUBBLE ────────────────────────────────────────
export function Bubble({ children, style, tail = 'left', tone }) {
  const t = useTheme();
  return (
    <View style={[{ backgroundColor: tone || t.surface, borderRadius: 18, borderWidth: 2, borderColor: t.border, paddingVertical: 12, paddingHorizontal: 16 }, tail === 'left' && { borderBottomLeftRadius: 4 }, tail === 'top' && { borderTopLeftRadius: 4 }, style]}>
      {children}
    </View>
  );
}

// ─── STAT TILE ────────────────────────────────────────────
export function Stat({ icon, color, value, label, style }) {
  const t = useTheme();
  return (
    <View style={[{ flex: 1, backgroundColor: t.surface, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, padding: 14, gap: 4 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Icon name={icon} size={18} color={color} stroke={2.4} fill={icon === 'flame' || icon === 'bolt' || icon === 'gem' ? color : 'none'} />
        <T v="num">{value}</T>
      </View>
      <T v="caption">{label}</T>
    </View>
  );
}

export function Divider({ style }) {
  const t = useTheme();
  return <View style={[{ height: 1, backgroundColor: t.border, marginVertical: 12 }, style]} />;
}

export function Empty({ emoji = '🦆', title, text, action, onAction }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 40, gap: 8 }}>
      <Text style={{ fontSize: 48 }}>{emoji}</Text>
      <T v="h3" center>{title}</T>
      {text ? <T v="small" center style={{ maxWidth: 280 }}>{text}</T> : null}
      {action ? <Button title={action} onPress={onAction} small style={{ marginTop: 12, minWidth: 200 }} /> : null}
    </View>
  );
}
