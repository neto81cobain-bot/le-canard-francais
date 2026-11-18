// “Onde você mais erra”: acertos e erros por regra de gramática, com atalhos.
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, palette } from '../theme';
import { T, Card, ProgressBar } from './ui';
import { GRAMMAR } from '../content/grammar';

const BY_ID = Object.fromEntries(GRAMMAR.map((g) => [g.id, g]));

export function ruleRanking(state, min = 3) {
  return Object.entries(state.ruleStats || {})
    .map(([id, r]) => ({ id, g: BY_ID[id], total: r.ok + r.wrong, rate: r.ok / Math.max(1, r.ok + r.wrong), ...r }))
    .filter((x) => x.g && x.total >= min)
    .sort((a, b) => a.rate - b.rate || b.wrong - a.wrong);
}

export default function RuleStats({ style, limit = 5 }) {
  const { state } = useStore();
  const t = useTheme();
  const list = ruleRanking(state).slice(0, limit);
  return (
    <Card style={[{ gap: 10 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 20 }}>📐</Text>
        <T v="bodyBold" style={{ flex: 1 }}>Onde você mais erra</T>
      </View>
      {!list.length ? (
        <T v="small">Faça algumas lições e treinos de gramática — aqui vai aparecer, regra por regra, o que mais pega para você.</T>
      ) : (
        list.map((x) => {
          const pct = Math.round(x.rate * 100);
          const c = pct >= 80 ? t.success : pct >= 60 ? palette.gold : t.error;
          return (
            <View key={x.id} style={{ gap: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 16 }}>{x.g.emoji}</Text>
                <Text numberOfLines={1} style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 14, color: t.text }}>{x.g.title}</Text>
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: c }}>{pct}%</Text>
              </View>
              <ProgressBar value={x.rate} color={c} height={7} />
              <View style={{ flexDirection: 'row', gap: 14 }}>
                <T v="caption" style={{ flex: 1 }}>{x.ok} acertos · {x.wrong} erros</T>
                <Pressable hitSlop={6} onPress={() => router.push({ pathname: '/grammar', params: { open: x.id } })}>
                  <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.primary }}>Rever regra</Text>
                </Pressable>
                {x.g.bank || x.g.verbs ? (
                  <Pressable hitSlop={6} onPress={() => router.push({ pathname: '/practice/[mode]', params: x.g.verbs ? { mode: 'verbs' } : { mode: 'bank', key: x.g.bank } })}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.primary }}>Treinar</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          );
        })
      )}
    </Card>
  );
}
