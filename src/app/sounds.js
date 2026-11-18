// Sound map: every tricky French sound contrast, with a mouth tip and its own training.
import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Tap, Chip } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { AudioButton } from '../components/extras';
import { SOUND_GROUPS, MINIMAL_PAIRS } from '../content/skills';

const COLORS = ['#7C5CFC', '#0E7490', '#D9822B', '#C2417B', '#1E3A8A', '#4D7C0F', '#E63946', '#0F766E'];

export default function Sounds() {
  const t = useTheme();
  const groups = Object.entries(SOUND_GROUPS).map(([id, g]) => ({ id, ...g, pairs: MINIMAL_PAIRS.filter((p) => p.group === id) })).filter((g) => g.pairs.length);
  return (
    <Screen title="Mapa de sons">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <Duck mood="listen" size={80} />
        <T v="bodyBold" style={{ flex: 1 }}>Os sons que mais confundem brasileiros. Leia a dica de boca, ouça os exemplos e treine só aquele som.</T>
      </View>
      <View style={{ gap: 12 }}>
        {groups.map((g, i) => {
          const ex = g.pairs[0];
          const c = COLORS[i % COLORS.length];
          return (
            <View key={g.id} style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 14, gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: c }}>
                  <Text style={{ fontFamily: fonts.display, fontSize: 17, color: '#fff' }}>{g.title}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <Chip label={`${g.pairs.length} pares`} />
              </View>
              <T v="small" color={t.text}>👄 {g.tip}</T>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {[[ex.a, ex.pa], [ex.b, ex.pb]].map(([w, pt]) => (
                  <View key={w} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderRadius: 12, backgroundColor: t.bg }}>
                    <AudioButton text={w} size={34} />
                    <View style={{ flex: 1 }}>
                      <T v="bodyBold">{w}</T>
                      <T v="caption">{pt}</T>
                    </View>
                  </View>
                ))}
              </View>
              <Tap onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'pairs', group: g.id } })} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, borderRadius: 12, backgroundColor: c + '22' }}>
                <Icon name="headphones" size={18} color={c} />
                <Text style={{ fontFamily: fonts.bodyHeavy, color: c, fontSize: 14 }}>Treinar este som</Text>
              </Tap>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}
