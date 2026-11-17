import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, fonts, palette } from '../theme';
import { T, Button, Card } from './ui';
import Duck from './Duck';
import Icon from './Icon';
import { Confetti, CountUp, Appear } from './extras';
import { fx } from '../services/feedback';

function Tile({ icon, color, label, children }) {
  const t = useTheme();
  return (
    <View style={{ flex: 1, borderRadius: 18, borderWidth: 2, borderColor: color, overflow: 'hidden' }}>
      <View style={{ backgroundColor: color, paddingVertical: 5, alignItems: 'center' }}>
        <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 11, letterSpacing: 1 }}>{label}</Text>
      </View>
      <View style={{ paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6, backgroundColor: t.surface }}>
        <Icon name={icon} size={20} color={color} stroke={2.5} />
        {children}
      </View>
    </View>
  );
}

export default function ResultView({ title, subtitle, xp, correct, total, seconds, bestCombo, passed = true, words = [], actions = [], mood }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const pct = Math.round((correct / Math.max(1, total)) * 100);
  useEffect(() => {
    passed ? fx.complete() : fx.wrong();
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Confetti run={passed} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 + insets.bottom, alignItems: 'center' }}>
        <Appear><Duck mood={mood || (passed ? (pct === 100 ? 'proud' : 'celebrate') : 'comfort')} size={170} /></Appear>
        <Appear delay={120}>
          <T v="h1" center style={{ marginTop: 10 }} color={passed ? t.text : t.error}>{title}</T>
          {subtitle ? <T v="body" center color={t.text2} style={{ marginTop: 6, maxWidth: 320 }}>{subtitle}</T> : null}
        </Appear>
        <Appear delay={240} style={{ alignSelf: 'stretch' }}>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 24 }}>
            <Tile icon="bolt" color={palette.gold} label="XP">
              <CountUp to={xp} style={{ fontFamily: fonts.bodyHeavy, fontSize: 22, color: palette.goldDark }} prefix="+" />
            </Tile>
            <Tile icon="target" color={pct >= 80 ? t.success : pct >= 50 ? t.sky : t.error} label="PRECISÃO">
              <CountUp to={pct} style={{ fontFamily: fonts.bodyHeavy, fontSize: 22, color: t.text }} suffix="%" />
            </Tile>
            <Tile icon="clock" color={t.sky} label="TEMPO">
              <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 20, color: t.text }}>{m}:{String(s).padStart(2, '0')}</Text>
            </Tile>
          </View>
        </Appear>
        {bestCombo >= 3 ? (
          <Appear delay={320}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, backgroundColor: palette.redSoft, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14 }}>
              <Icon name="flame" size={18} color={palette.red} fill={palette.red} />
              <Text style={{ fontFamily: fonts.bodyHeavy, color: palette.red }}>Melhor combo: {bestCombo} seguidas!</Text>
            </View>
          </Appear>
        ) : null}
        {words.length ? (
          <Appear delay={380} style={{ alignSelf: 'stretch' }}>
            <Card style={{ marginTop: 20 }}>
              <T v="label" style={{ marginBottom: 10 }}>Palavras desta lição</T>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {words.slice(0, 12).map((w) => (
                  <View key={w.fr} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: t.surface2, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 }}>
                    {w.emoji ? <Text>{w.emoji}</Text> : null}
                    <Text style={{ fontFamily: fonts.displayItalic, color: t.text, fontSize: 15 }}>{w.fr}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </Appear>
        ) : null}
        <View style={{ alignSelf: 'stretch', gap: 10, marginTop: 28 }}>
          {actions.map((a, i) => <Button key={a.title} title={a.title} icon={a.icon} variant={a.variant || (i === 0 ? 'primary' : 'secondary')} onPress={a.onPress} />)}
        </View>
      </ScrollView>
    </View>
  );
}
