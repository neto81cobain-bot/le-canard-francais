import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useStore } from '../../store';
import { useTheme, fonts, radius } from '../../theme';
import { Screen, T, Button, Card } from '../../components/ui';
import { AudioButton, Appear } from '../../components/extras';
import { Rich } from '../../components/Rich';
import Mouth from '../../components/Mouth';
import { SOUNDS } from '../../content/extras';
import { speak } from '../../services/speech';
import { fx } from '../../services/feedback';

// Minimal-pair listening game: hear one word, choose which one it was.
function PairGame({ sound, onScore }) {
  const t = useTheme();
  const rounds = useMemo(() => Array.from({ length: 6 }, () => {
    const p = sound.pairs[Math.floor(Math.random() * sound.pairs.length)];
    return { pair: p, answer: p[Math.floor(Math.random() * 2)] };
  }), [sound.id]);
  const [i, setI] = useState(-1);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  if (i === -1) return <Button title="Jogar: qual você ouviu?" icon="headphones" color={sound.color} onPress={() => { setI(0); setTimeout(() => speak(rounds[0].answer), 300); }} />;
  if (i >= rounds.length) {
    const pct = Math.round((score / rounds.length) * 100);
    return (
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 40 }}>{pct >= 80 ? '🎉' : '👂'}</Text>
        <T v="h3">{score}/{rounds.length} acertos</T>
        <Button title="Jogar de novo" small variant="secondary" onPress={() => { setI(-1); setScore(0); }} />
      </View>
    );
  }
  const r = rounds[i];
  const choose = (w) => {
    if (picked) return;
    setPicked(w);
    const ok = w === r.answer;
    ok ? fx.correct() : fx.wrong();
    const ns = score + (ok ? 1 : 0);
    if (ok) setScore(ns);
    setTimeout(() => {
      setPicked(null);
      const ni = i + 1;
      setI(ni);
      if (ni < rounds.length) setTimeout(() => speak(rounds[ni].answer), 250);
      else onScore(Math.round((ns / rounds.length) * 100));
    }, 900);
  };
  return (
    <View style={{ gap: 14, alignItems: 'center' }}>
      <T v="label">Rodada {i + 1} de {rounds.length}</T>
      <AudioButton text={r.answer} size={70} />
      <View style={{ flexDirection: 'row', gap: 12, alignSelf: 'stretch' }}>
        {r.pair.map((w) => {
          const st = picked ? (w === r.answer ? 'ok' : w === picked ? 'bad' : null) : null;
          return (
            <Pressable key={w} onPress={() => choose(w)} style={{ flex: 1, alignItems: 'center', padding: 18, borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: st === 'ok' ? t.success : st === 'bad' ? t.error : t.border, backgroundColor: st === 'ok' ? t.successSoft : st === 'bad' ? t.errorSoft : t.surface }}>
              <Text style={{ fontFamily: fonts.displayItalic, fontSize: 22, color: t.text }}>{w}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function SoundScreen() {
  const { id } = useLocalSearchParams();
  const { state, actions } = useStore();
  const t = useTheme();
  const s = SOUNDS.find((x) => x.id === id);
  if (!s) return null;
  return (
    <Screen title={s.title}>
      <Appear>
        <Card style={{ alignItems: 'center', gap: 10 }}>
          <Mouth shape={s.mouth} color={s.color} />
        </Card>
      </Appear>
      <Appear delay={80}>
        <View style={{ marginTop: 18, backgroundColor: s.color, borderRadius: radius.lg, padding: 16 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, color: 'rgba(255,255,255,0.8)', fontSize: 12, letterSpacing: 1 }}>A REGRA</Text>
          <Text style={{ fontFamily: fonts.bodyBold, color: '#fff', fontSize: 17, lineHeight: 24, marginTop: 4 }}>{s.rule}</Text>
        </View>
      </Appear>
      <T v="h3" style={{ marginTop: 22, marginBottom: 10 }}>Como fazer</T>
      <View style={{ gap: 8 }}>
        {s.how.map((h, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: s.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontFamily: fonts.bodyHeavy, fontSize: 13 }}>{i + 1}</Text>
            </View>
            <View style={{ flex: 1 }}><Rich text={h} /></View>
          </View>
        ))}
      </View>
      {s.exception ? (
        <View style={{ marginTop: 14, backgroundColor: t.goldSoft, borderRadius: radius.md, padding: 14 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, color: t.mode === 'dark' ? t.gold : '#B0661C', fontSize: 12, letterSpacing: 1, marginBottom: 4 }}>ATENÇÃO</Text>
          <Rich text={s.exception} size={15} />
        </View>
      ) : null}

      <T v="h3" style={{ marginTop: 24, marginBottom: 10 }}>Exemplos</T>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {s.examples.map((e) => (
          <Pressable key={e.w} onPress={() => speak(e.w)} style={{ width: '47%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.surface, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, padding: 12 }}>
            <Text style={{ fontSize: 16 }}>🔊</Text>
            <View>
              <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, color: t.text }}>{e.w}</Text>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: s.color }}>[{e.r}]</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <T v="h3" style={{ marginTop: 24, marginBottom: 6 }}>Pares mínimos</T>
      <Rich text={s.pairsNote} size={15} />
      <View style={{ gap: 8, marginTop: 12 }}>
        {s.pairs.map((p) => (
          <View key={p.join()} style={{ flexDirection: 'row', gap: 8 }}>
            {p.map((w) => (
              <Pressable key={w} onPress={() => speak(w)} style={{ flex: 1, alignItems: 'center', padding: 12, borderRadius: radius.md, backgroundColor: t.surface2 }}>
                <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, color: t.text }}>🔊 {w}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
      <Card style={{ marginTop: 18 }}>
        <PairGame sound={s} onScore={(pct) => actions.set((st) => ({ soundBest: { ...(st.soundBest || {}), [s.id]: Math.max(st.soundBest?.[s.id] || 0, pct) } }))} />
      </Card>
      <Button title="Treinar falando" icon="mic" variant="secondary" style={{ marginTop: 18 }} onPress={() => router.push({ pathname: '/speak', params: { sound: s.id } })} />
    </Screen>
  );
}
