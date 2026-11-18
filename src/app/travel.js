// Travel kit: phrases by situation, audio, and a big "show to the person" mode. Works offline.
import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Chip } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { AudioButton } from '../components/extras';
import { TRAVEL, TRAVEL_TIERS } from '../content/travel';
import TierTabs from '../components/TierTabs';
import { speak } from '../services/speech';

export default function Travel() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [sit, setSit] = useState(TRAVEL[0].id);
  const [tier, setTier] = useState('facil');
  const [show, setShow] = useState(null);
  const cur = TRAVEL.find((x) => x.id === sit);
  return (
    <Screen title="Modo viagem">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Duck size={72} mood="wave" />
        <T v="bodyBold" style={{ flex: 1 }}>Frases de sobrevivência, offline. Toque para ouvir; use 🔍 para mostrar a frase em letra grande.</T>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {TRAVEL.map((x) => (
          <Pressable key={x.id} onPress={() => setSit(x.id)}>
            <Chip label={`${x.emoji} ${x.title}`} big bg={sit === x.id ? t.primary : t.surface2} color={sit === x.id ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </View>
      <TierTabs tiers={TRAVEL_TIERS} value={tier} onChange={setTier} counts={{ facil: cur.facil.length, medio: cur.medio.length, dificil: cur.dificil.length }} />
      <T v="caption" style={{ marginTop: 8, marginBottom: 10 }}>{TRAVEL_TIERS.find((x) => x.id === tier)?.desc}</T>
      <View style={{ gap: 8 }}>
        {cur[tier].map((p) => {
          const [fr, pt] = p.split('|');
          const saved = state.saved.find((c) => c.fr === fr);
          return (
            <Pressable key={p} onPress={() => speak(fr)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
              <AudioButton text={fr} size={36} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: t.text }}>{fr}</Text>
                <T v="small">{pt}</T>
              </View>
              <Pressable onPress={() => setShow({ fr, pt })} hitSlop={8}><Text style={{ fontSize: 20 }}>🔍</Text></Pressable>
              <Pressable onPress={() => actions.toggleSaved({ fr, pt })} hitSlop={8}>
                <Icon name="bookmark" size={20} color={palette.gold} fill={saved ? palette.gold : 'none'} />
              </Pressable>
            </Pressable>
          );
        })}
      </View>
      <Modal visible={!!show} animationType="fade" onRequestClose={() => setShow(null)}>
        <Pressable onPress={() => setShow(null)} style={{ flex: 1, backgroundColor: '#FFFDF8', alignItems: 'center', justifyContent: 'center', padding: 28, gap: 24 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 40, lineHeight: 50, color: '#111827', textAlign: 'center' }}>{show?.fr}</Text>
          <Text style={{ fontFamily: fonts.bodySemi, fontSize: 18, color: '#6B7280', textAlign: 'center' }}>{show?.pt}</Text>
          <AudioButton text={show?.fr || ''} size={64} />
          <Text style={{ fontFamily: fonts.bodyBold, color: '#9CA3AF' }}>Toque em qualquer lugar para fechar</Text>
        </Pressable>
      </Modal>
    </Screen>
  );
}
