// Library of graded stories (reading practice).
import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, unitColors } from '../theme';
import { T, Screen, Tap, Chip } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { STORY_LIST } from '../content/stories';
import { LEVEL_INFO } from '../content';

export default function Stories() {
  const { state } = useStore();
  const t = useTheme();
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const read = Object.keys(state.stories || {}).length;
  return (
    <Screen title="Histórias">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Duck mood="teach" size={84} />
        <View style={{ flex: 1 }}>
          <T v="bodyBold">Ler é o atalho para pensar em francês.</T>
          <T v="small">Toque numa frase para ouvir, veja a tradução quando precisar e responda as perguntas no final. {read}/{STORY_LIST.length} lidas.</T>
        </View>
      </View>
      {levels.map((lv) => {
        const list = STORY_LIST.filter((s) => s.level === lv);
        if (!list.length) return null;
        return (
          <View key={lv} style={{ marginTop: 18, gap: 10 }}>
            <T v="label">{LEVEL_INFO[lv]?.name || lv}</T>
            {list.map((s) => {
              const locked = s.unit > state.unlockedUnit;
              const done = state.stories?.[s.id];
              const color = unitColors[(s.unit - 1) % unitColors.length];
              return (
                <Tap
                  key={s.id}
                  disabled={locked}
                  onPress={() => router.push({ pathname: '/story/[id]', params: { id: s.id } })}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: locked ? t.surface2 : t.surface, borderWidth: 1, borderColor: t.border }}
                >
                  <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: locked ? t.surface3 : color.main, alignItems: 'center', justifyContent: 'center' }}>
                    {locked ? <Icon name="lock" size={22} color={t.text3} /> : <Text style={{ fontSize: 28 }}>{s.emoji}</Text>}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.display, fontSize: 18, color: locked ? t.text3 : t.text }}>{s.title}</Text>
                    <T v="small">{locked ? `Libera na unidade ${s.unit}` : `${s.pt} · ${s.lines.length} frases`}</T>
                  </View>
                  {done ? <Chip label={`${'★'.repeat(done.stars || 1)}`} color="#E0A526" /> : locked ? null : <Icon name="chevron" size={18} color={t.text3} />}
                </Tap>
              );
            })}
          </View>
        );
      })}
    </Screen>
  );
}
