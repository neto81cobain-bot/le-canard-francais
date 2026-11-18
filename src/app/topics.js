// All "Treino por tema" topics: hand-made topics + one topic per lesson.
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius } from '../theme';
import { T, Screen, Tap, Chip } from '../components/ui';
import Icon from '../components/Icon';
import { BANK_TOPICS, LESSON_TOPICS, UNITS } from '../content';
import { toast } from '../services/dialog';

function TopicTile({ b, locked, best }) {
  const t = useTheme();
  return (
    <Tap onPress={() => (locked ? toast(`🔒 Libera na unidade ${b.unit}`) : router.push({ pathname: '/practice/[mode]', params: { mode: 'bank', key: b.key } }))} style={{ width: '48%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: radius.lg, backgroundColor: locked ? t.surface2 : t.surface, borderWidth: 1, borderColor: t.border, opacity: locked ? 0.6 : 1 }}>
      <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: locked ? t.surface3 : b.color + '33', alignItems: 'center', justifyContent: 'center' }}>
        {locked ? <Icon name="lock" size={16} color={t.text3} /> : <Text style={{ fontSize: 20 }}>{b.emoji}</Text>}
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: t.text }}>{b.title}</Text>
        <Text numberOfLines={1} style={{ fontFamily: fonts.bodySemi, fontSize: 12, color: t.text2 }}>{best ? `Melhor: ${best}%` : b.level || b.sub}</Text>
      </View>
    </Tap>
  );
}

export default function Topics() {
  const { state } = useStore();
  const t = useTheme();
  const [tab, setTab] = useState('temas');
  return (
    <Screen title="Treino por tema">
      <View style={{ flexDirection: 'row', gap: 6, padding: 4, borderRadius: radius.lg, backgroundColor: t.surface2, marginBottom: 14 }}>
        {[['temas', `🧩 Temas (${BANK_TOPICS.length})`], ['licoes', `📘 Por lição (${LESSON_TOPICS.length})`]].map(([id, l]) => (
          <Tap key={id} onPress={() => setTab(id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 12, backgroundColor: tab === id ? t.surface : 'transparent' }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: tab === id ? t.text : t.text2 }}>{l}</Text>
          </Tap>
        ))}
      </View>
      {tab === 'temas' ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {BANK_TOPICS.map((b) => <TopicTile key={b.key} b={b} best={state.bankBest[b.key]} />)}
        </View>
      ) : (
        UNITS.map((u) => {
          const list = LESSON_TOPICS.filter((x) => x.unit === u.number);
          if (!list.length) return null;
          const locked = u.number > state.unlockedUnit;
          return (
            <View key={u.id} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <T v="label" style={{ flex: 1 }}>Unidade {u.number} · {u.title}</T>
                <Chip label={u.level} />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {list.map((b) => <TopicTile key={b.key} b={b} locked={locked} best={state.bankBest[b.key]} />)}
              </View>
            </View>
          );
        })
      )}
    </Screen>
  );
}
