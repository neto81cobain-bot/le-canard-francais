import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette, shadow } from '../../theme';
import { T, Card, Tap, Section, Chip } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import { Appear } from '../../components/extras';
import { SOUNDS, SCENARIOS } from '../../content/extras';
import { aiAvailable } from '../../services/ai';
import { useOnline } from '../../services/net';
import TierTabs from '../../components/TierTabs';
import { GUIDED } from '../../content/guided';
import { TIERS, CEFR, tierOf, userLevel, levelOpen, unlockAt } from '../../content/levels';
import AiSetup from '../../components/AiSetup';
import { toast } from '../../services/dialog';

const SC_TIERS = TIERS.map((x) => ({ ...x, level: x.levels[0] }));

export default function Speak() {
  const { state } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const ai = aiAvailable();
  const online = useOnline();
  const [scTier, setScTier] = useState(() => tierOf(userLevel(state)).id);
  const scList = SCENARIOS.filter((s) => tierOf(s.level).id === scTier).sort((a, b) => CEFR.indexOf(a.level) - CEFR.indexOf(b.level));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 16, paddingBottom: 50 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T v="h1">Falar</T>
          <T v="body" color={t.text2}>Pronúncia, conversação e tradução por voz.</T>
        </View>
        <Duck mood="speak" size={86} />
      </View>

      {!ai ? (
        <Card style={{ marginTop: 14 }} tone={t.goldSoft}>
          <AiSetup compact feature="A nota de pronúncia, a conversa e o tradutor" />
        </Card>
      ) : !online ? (
        <Card style={{ marginTop: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }} tone={t.surface2}>
          <Duck mood="offline" size={56} />
          <View style={{ flex: 1, gap: 2 }}>
            <T v="bodyBold">Você está offline</T>
            <T v="small" color={t.text}>A pronúncia vira modo “comparar” (modelo × sua voz). Conversa e tradução por voz voltam com a internet; texto digitado eu traduzo depois.</T>
          </View>
        </Card>
      ) : null}

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 18 }}>
        <Tap onPress={() => router.push('/speak')} style={[{ flex: 1, borderRadius: radius.lg, backgroundColor: palette.red, padding: 16, minHeight: 150, justifyContent: 'space-between' }, shadow(t, 1)]}>
          <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="mic" size={24} color="#fff" />
          </View>
          <View>
            <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#fff' }}>Avaliação de fala</Text>
            <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>Nota palavra por palavra</Text>
          </View>
        </Tap>
        <Tap onPress={() => router.push('/translate')} style={[{ flex: 1, borderRadius: radius.lg, backgroundColor: t.primary, padding: 16, minHeight: 150, justifyContent: 'space-between' }, shadow(t, 1)]}>
          <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="swap" size={24} color="#fff" />
          </View>
          <View>
            <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#fff' }}>Falar e traduzir</Text>
            <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>PT ⇄ FR por voz</Text>
          </View>
        </Tap>
      </View>

      <Tap onPress={() => router.push('/sounds')} style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 2, borderColor: t.border }}>
        <Text style={{ fontSize: 30 }}>🎧</Text>
        <View style={{ flex: 1 }}>
          <T v="bodyBold">Mapa de sons</T>
          <T v="small">U × OU, nasais, É × È… com dica de boca e treino de cada par</T>
        </View>
        <Icon name="chevron" size={20} color={t.text3} />
      </Tap>

      <Section title="Sons do francês" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {SOUNDS.map((s, i) => {
          const best = state.soundBest?.[s.id];
          return (
            <Appear key={s.id} delay={i * 40} style={{ width: '47%', flexGrow: 1 }}>
              <Tap onPress={() => router.push({ pathname: '/sound/[id]', params: { id: s.id } })} style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 14, gap: 8, minHeight: 120 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: s.color, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22 }}>{s.emoji}</Text>
                  </View>
                  {best != null ? <Chip label={`${best}%`} color={best >= 80 ? t.success : t.text2} bg={best >= 80 ? t.successSoft : t.surface2} /> : null}
                </View>
                <T v="bodyBold">{s.title}</T>
              </Tap>
            </Appear>
          );
        })}
      </View>

      <Tap onPress={() => router.push('/guided')} style={{ marginTop: 22, flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: '#7C5CFC' }}>
        <Text style={{ fontSize: 32 }}>💬</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#fff' }}>Conversas guiadas</Text>
          <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{GUIDED.length} diálogos — você responde em francês. Sem IA, funciona offline.</Text>
        </View>
        <Icon name="chevron" size={20} color="#fff" />
      </Tap>

      <Section title="Conversa com o Canard" />
      <T v="small" style={{ marginTop: -6, marginBottom: 12 }}>Situações reais: você fala, o Canard responde e corrige com gentileza.</T>
      <TierTabs tiers={SC_TIERS} value={scTier} onChange={setScTier} counts={Object.fromEntries(SC_TIERS.map((x) => [x.id, SCENARIOS.filter((s) => tierOf(s.level).id === x.id).length]))} />
      <View style={{ height: 10 }} />
      <Card padded={false}>
        {scList.map((s, i) => (
          <Tap key={s.id} scaleTo={0.99} onPress={() => (levelOpen(s.level, state) ? router.push({ pathname: '/conversation/[id]', params: { id: s.id } }) : toast(`🔒 Libera no nível ${unlockAt(s.level)}`))} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderBottomWidth: i === scList.length - 1 ? 0 : 1, borderBottomColor: t.border, opacity: levelOpen(s.level, state) ? 1 : 0.5 }}>
            <Text style={{ fontSize: 30 }}>{s.emoji}</Text>
            <View style={{ flex: 1 }}>
              <T v="bodyBold">{s.title}</T>
              <T v="small" numberOfLines={1}>{s.goal}</T>
            </View>
            <Chip label={s.level} color={t.primary} bg={t.primarySoft} />
          </Tap>
        ))}
      </Card>
    </ScrollView>
  );
}
