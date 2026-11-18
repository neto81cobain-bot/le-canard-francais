// Smart mistakes notebook: mistakes grouped by kind, with targeted training.
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Button, Chip, Empty } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { Alert } from '../services/dialog';
import { MISTAKE_GROUPS, mistakeGroupOf } from '../engine/exercises';

const ago = (ts) => {
  const d = Math.floor((Date.now() - (ts || 0)) / 86400000);
  return d <= 0 ? 'hoje' : d === 1 ? 'ontem' : `há ${d} dias`;
};

export default function Mistakes() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [open, setOpen] = useState(null);
  const groups = useMemo(() => MISTAKE_GROUPS.map((g) => ({ ...g, items: state.mistakes.filter((m) => mistakeGroupOf(m) === g.id) })).filter((g) => g.items.length), [state.mistakes]);
  const train = (group) => router.push({ pathname: '/practice/[mode]', params: group ? { mode: 'mistakes', group } : { mode: 'mistakes' } });

  if (!state.mistakes.length) {
    return (
      <Screen title="Caderno de erros">
        <Empty emoji="🎉" title="Nenhum erro guardado!" text="Quando você errar algo, ele entra aqui, separado por tipo, para você treinar depois." action="Voltar" onAction={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen title="Caderno de erros">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Duck mood="comfort" size={78} />
        <View style={{ flex: 1 }}>
          <T v="bodyBold">{state.mistakes.length} erros guardados</T>
          <T v="small">Acertou no treino? O erro sai do caderno sozinho.</T>
        </View>
      </View>
      <Button title="Treinar todos" icon="target" onPress={() => train(null)} />
      <View style={{ gap: 10, marginTop: 14 }}>
        {groups.map((g) => {
          const isOpen = open === g.id;
          return (
            <View key={g.id} style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, overflow: 'hidden' }}>
              <Pressable onPress={() => setOpen(isOpen ? null : g.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <Text style={{ fontSize: 26 }}>{g.emoji}</Text>
                <T v="bodyBold" style={{ flex: 1 }}>{g.title}</T>
                <Chip label={String(g.items.length)} color={palette.coralDark} bg={palette.coralSoft} />
                <Icon name={isOpen ? 'down' : 'chevron'} size={18} color={t.text3} />
              </Pressable>
              {isOpen ? (
                <View style={{ paddingHorizontal: 14, paddingBottom: 14, gap: 8 }}>
                  {g.items.slice(0, 15).map((m) => (
                    <View key={m.id} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', padding: 10, borderRadius: 12, backgroundColor: t.bg }}>
                      <View style={{ flex: 1 }}>
                        <T v="small" numberOfLines={2}>{String(m.prompt || '').replace(/\n/g, ' ')}</T>
                        <T v="bodyBold" color={t.success} numberOfLines={2}>✓ {String(m.answer || '')}</T>
                      </View>
                      <T v="caption">{ago(m.at)}</T>
                      <Pressable hitSlop={8} onPress={() => actions.clearMistake(m.id)}><Icon name="close" size={16} color={t.text3} /></Pressable>
                    </View>
                  ))}
                  {g.items.length > 15 ? <T v="caption">+ {g.items.length - 15} outros</T> : null}
                  <Button title={`Treinar ${g.title.toLowerCase()}`} small onPress={() => train(g.id)} />
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
      <Button
        title="Limpar caderno"
        variant="secondary"
        small
        style={{ marginTop: 16 }}
        onPress={() => Alert.alert('Limpar todos os erros?', 'Eles não voltarão para o treino.', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Limpar', style: 'destructive', onPress: () => actions.set({ mistakes: [] }) },
        ])}
      />
    </Screen>
  );
}
