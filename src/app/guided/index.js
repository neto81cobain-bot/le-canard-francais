// Lista das conversas guiadas (funcionam sem IA e sem internet).
import { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../../store';
import { useTheme, fonts } from '../../theme';
import { T, Screen, Card, Chip, Tap } from '../../components/ui';
import Duck from '../../components/Duck';
import TierTabs from '../../components/TierTabs';
import { GUIDED } from '../../content/guided';
import { TIERS, tierOf, levelOpen, unlockAt, CEFR } from '../../content/levels';
import { toast } from '../../services/dialog';

export default function GuidedList() {
  const { state } = useStore();
  const t = useTheme();
  const [tier, setTier] = useState(tierOf(CEFR[0]).id);
  const list = GUIDED.filter((g) => tierOf(g.level).id === tier);
  return (
    <Screen title="Conversas guiadas">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Duck mood="speak" size={70} />
        <T v="small" style={{ flex: 1 }}>O Canard fala, você responde <T v="small" style={{ fontFamily: fonts.bodyHeavy }}>em francês</T> a partir de uma dica. Funciona sem internet e sem IA — a correção compara com respostas-modelo.</T>
      </View>
      <TierTabs tiers={TIERS} value={tier} onChange={setTier} counts={Object.fromEntries(TIERS.map((x) => [x.id, GUIDED.filter((g) => tierOf(g.level).id === x.id).length]))} />
      <View style={{ height: 10 }} />
      <Card padded={false}>
        {list.map((g, i) => {
          const open = levelOpen(g.level, state);
          const best = state.guided?.[g.id];
          return (
            <Tap key={g.id} scaleTo={0.99} onPress={() => (open ? router.push({ pathname: '/guided/[id]', params: { id: g.id } }) : toast(`🔒 Libera no nível ${unlockAt(g.level)}`))} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderBottomWidth: i === list.length - 1 ? 0 : 1, borderBottomColor: t.border, opacity: open ? 1 : 0.5 }}>
              <Text style={{ fontSize: 30 }}>{g.emoji}</Text>
              <View style={{ flex: 1 }}>
                <T v="bodyBold">{g.title}</T>
                <T v="small" numberOfLines={1}>{g.setting}</T>
              </View>
              {best != null ? <Chip label={`${best}/${g.turns.length}`} color={best === g.turns.length ? t.success : t.text2} bg={best === g.turns.length ? t.successSoft : t.surface2} /> : <Chip label={g.level} />}
            </Tap>
          );
        })}
      </Card>
    </Screen>
  );
}
