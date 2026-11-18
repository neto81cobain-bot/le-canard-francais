// Week-by-week evolution of each skill (last 12 weeks).
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts } from '../theme';
import { T, Card, Chip } from './ui';

const SKILLS = [
  ['xp', 'XP', '#E0A526'],
  ['listen', 'Escuta', '#0E7490'],
  ['written', 'Escrita', '#2E9E5B'],
  ['spoken', 'Fala', '#E63946'],
  ['lessons', 'Lições', '#1E3A8A'],
  ['stories', 'Leitura', '#7C5CFC'],
];

export default function SkillHistory() {
  const { state } = useStore();
  const t = useTheme();
  const [k, setK] = useState('xp');
  const weeks = [...(state.weeks || []), state.week].filter(Boolean).slice(-8);
  const color = SKILLS.find((s) => s[0] === k)[2];
  const max = Math.max(1, ...weeks.map((w) => w[k] || 0));
  const prev = weeks.length > 1 ? weeks[weeks.length - 2][k] || 0 : 0;
  const cur = weeks[weeks.length - 1]?.[k] || 0;
  const delta = prev ? Math.round(((cur - prev) / prev) * 100) : null;
  return (
    <Card style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {SKILLS.map(([id, label]) => (
          <Pressable key={id} onPress={() => setK(id)}>
            <Chip label={label} bg={k === id ? t.primary : t.surface2} color={k === id ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 120, gap: 6 }}>
        {weeks.map((w, i) => {
          const v = w[k] || 0;
          const last = i === weeks.length - 1;
          return (
            <View key={w.key || i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
              <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 10, color: t.text2 }}>{v || ''}</Text>
              <View style={{ width: '100%', height: Math.max(4, (v / max) * 86), borderRadius: 6, backgroundColor: last ? color : color + '66' }} />
              <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 10, color: last ? t.primary : t.text3 }}>{last ? 'Agora' : 'S' + String(w.key || '').split('W')[1]}</Text>
            </View>
          );
        })}
      </View>
      <T v="caption">{weeks.length < 2 ? 'O gráfico cresce semana a semana. Volte depois de algumas semanas! 📈' : delta == null ? 'Primeira semana com esse treino.' : delta >= 0 ? `+${delta}% em relação à semana passada 📈` : `${delta}% em relação à semana passada — bora recuperar!`}</T>
    </Card>
  );
}
