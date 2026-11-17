import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette, shadow } from '../theme';
import { Screen, T, Button, Empty, Chip } from '../components/ui';
import { AudioButton } from '../components/extras';
import { shuffle } from '../engine/exercises';
import { strength } from '../store/logic';
import { router } from 'expo-router';
import { fx } from '../services/feedback';

export default function Flashcards() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [filter, setFilter] = useState('weak');
  const deck = useMemo(() => {
    const words = Object.entries(state.words).map(([fr, v]) => ({ fr, pt: v.pt, emoji: v.emoji, key: 'w:' + fr }));
    const saved = state.saved.map((s) => ({ ...s, key: 's:' + s.fr }));
    let all = [...saved, ...words];
    if (filter === 'saved') all = saved;
    if (filter === 'weak') all = [...all].sort((a, b) => strength(state.srs[a.key]) - strength(state.srs[b.key])).slice(0, 20);
    return filter === 'weak' ? all : shuffle(all);
  }, [filter]);
  const [i, setI] = useState(0);
  const [known, setKnown] = useState(0);
  const flip = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const doFlip = () => {
    fx.tap();
    Animated.spring(flip, { toValue: flipped ? 0 : 1, useNativeDriver: true, friction: 7 }).start();
    setFlipped(!flipped);
  };
  const next = (ok) => {
    const c = deck[i];
    actions.recordAnswer({ item: { fr: c.fr, pt: c.pt, key: c.key }, correct: ok, combo: 0, kind: 'flash' });
    if (ok) setKnown(known + 1);
    flip.setValue(0);
    setFlipped(false);
    setI(i + 1);
  };

  const filters = (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 18 }}>
      {[['weak', 'Mais fracos'], ['all', 'Todos'], ['saved', 'Salvos']].map(([k, l]) => (
        <Pressable key={k} onPress={() => { setFilter(k); setI(0); setKnown(0); flip.setValue(0); setFlipped(false); }}>
          <Chip label={l} big bg={filter === k ? t.primary : t.surface2} color={filter === k ? '#fff' : t.text2} />
        </Pressable>
      ))}
    </View>
  );

  if (!deck.length) {
    return (
      <Screen title="Flashcards">
        {filters}
        <Empty emoji="🃏" title="Nenhum cartão ainda" text={filter === 'saved' ? 'Salve frases tocando no marcador 🔖 da frase do dia ou do tradutor.' : 'Complete lições para ganhar cartões com as palavras novas.'} action="Ir para as lições" onAction={() => router.replace('/(tabs)')} />
      </Screen>
    );
  }

  if (i >= deck.length) {
    return (
      <Screen title="Flashcards">
        <Empty emoji="🎉" title="Baralho concluído!" text={`Você sabia ${known} de ${deck.length} cartões.`} action="Embaralhar de novo" onAction={() => { setI(0); setKnown(0); }} />
      </Screen>
    );
  }

  const c = deck[i];
  const front = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const back = flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const face = { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 };

  return (
    <Screen title="Flashcards" scroll={false}>
      {filters}
      <T v="label" center style={{ marginBottom: 12 }}>{i + 1} / {deck.length}</T>
      <Pressable onPress={doFlip} style={{ height: 340 }}>
        <Animated.View style={[face, shadow(t, 2), { backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, transform: [{ perspective: 1000 }, { rotateY: front }] }]}>
          {c.emoji ? <Text style={{ fontSize: 64 }}>{c.emoji}</Text> : null}
          <Text style={{ fontFamily: fonts.displayItalic, fontSize: 30, color: t.text, textAlign: 'center' }}>{c.fr}</Text>
          <AudioButton text={c.fr} size={50} autoPlay={state.settings.autoAudio} />
          <T v="caption">Toque para virar</T>
        </Animated.View>
        <Animated.View style={[face, { backgroundColor: t.primary, transform: [{ perspective: 1000 }, { rotateY: back }] }]}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>SIGNIFICA</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 28, color: '#fff', textAlign: 'center' }}>{c.pt}</Text>
          <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>{c.fr}</Text>
        </Animated.View>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 28 }}>
        <Button title="Não sabia" variant="error" style={{ flex: 1 }} onPress={() => next(false)} />
        <Button title="Sabia!" variant="success" style={{ flex: 1 }} onPress={() => next(true)} />
      </View>
    </Screen>
  );
}
