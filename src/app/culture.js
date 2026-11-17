import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, radius, unitColors } from '../theme';
import { Screen, T } from '../components/ui';
import { Appear } from '../components/extras';
import { Rich } from '../components/Rich';
import { CULTURE } from '../content/extras';

export default function Culture() {
  const t = useTheme();
  return (
    <Screen title="Notas culturais">
      <T v="body" color={t.text2} style={{ marginBottom: 16 }}>Aprender uma língua é também aprender um jeito de viver. 🇫🇷</T>
      <View style={{ gap: 14 }}>
        {CULTURE.map((c, i) => (
          <Appear key={c.id} delay={Math.min(i, 6) * 60}>
            <View style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, overflow: 'hidden' }}>
              <View style={{ backgroundColor: unitColors[i % unitColors.length].main, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontSize: 30 }}>{c.emoji}</Text>
                <T v="h3" color="#fff">{c.title}</T>
              </View>
              <View style={{ padding: 16 }}>
                <Rich text={c.text} />
              </View>
            </View>
          </Appear>
        ))}
      </View>
    </Screen>
  );
}
