// Hands-free review: the app says it in Portuguese, gives you time to say it in French
// out loud, then says the answer. Good for the car, the bus or washing the dishes.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Button, Chip, Empty, ProgressBar } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { SpeedChip } from '../components/extras';
import { dueItems, weakestItems } from '../store/logic';
import { shuffle } from '../engine/exercises';
import { speak, speakPt, stopSpeaking } from '../services/speech';
import { router } from 'expo-router';

const GAPS = [[3000, 'Curto'], [5000, 'Normal'], [8000, 'Longo']];

export default function HandsFree() {
  const { state, actions } = useStore();
  const t = useTheme();
  const items = useMemo(() => {
    let list = dueItems(state.srs, Date.now(), 20);
    if (list.length < 20) list = [...list, ...weakestItems(state.srs, Date.now(), 20 - list.length).filter((w) => !list.find((i) => i.key === w.key))];
    const saved = (state.saved || []).map((s) => ({ ...s, key: 's:' + s.fr }));
    return shuffle([...list, ...saved].filter((x) => x.fr && x.pt)).slice(0, 20);
  }, []);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | pt | think | fr | done
  const [gap, setGap] = useState(5000);
  const token = useRef(0);
  const timer = useRef(null);

  const stop = () => { token.current++; clearTimeout(timer.current); stopSpeaking(); setPhase('idle'); };
  useEffect(() => () => stop(), []);

  const run = (k) => {
    const my = ++token.current;
    if (k >= items.length) { setPhase('done'); actions.addXP(Math.min(20, items.length)); actions.markKind('handsfree'); return; }
    setI(k);
    setPhase('pt');
    const it = items[k];
    speakPt(it.pt, {
      onDone: () => {
        if (my !== token.current) return;
        setPhase('think');
        timer.current = setTimeout(() => {
          if (my !== token.current) return;
          setPhase('fr');
          speak(it.fr, {
            onDone: () => {
              if (my !== token.current) return;
              timer.current = setTimeout(() => {
                if (my !== token.current) return;
                speak(it.fr, { slow: true, onDone: () => { if (my === token.current) timer.current = setTimeout(() => run(k + 1), 1200); } });
              }, 700);
            },
          });
        }, gap);
      },
    });
  };

  if (!items.length) {
    return <Screen title="Revisão mãos-livres"><Empty emoji="🎧" title="Nada para revisar ainda" text="Faça algumas lições ou salve frases — depois volte aqui para revisar só ouvindo." action="Voltar" onAction={() => router.back()} /></Screen>;
  }
  const it = items[i];
  const running = phase === 'pt' || phase === 'think' || phase === 'fr';
  return (
    <Screen title="Revisão mãos-livres" right={<SpeedChip />}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Duck size={110} mood={phase === 'think' ? 'think' : phase === 'fr' ? 'speak' : phase === 'done' ? 'celebrate' : 'listen'} />
        <T v="small" center>Ideal para o carro ou o ônibus: o Canard fala em português, você responde em francês <Text style={{ fontFamily: fonts.bodyHeavy }}>em voz alta</Text> e depois ouve a resposta.</T>
      </View>
      <View style={{ marginTop: 18, borderRadius: radius.xl, padding: 20, minHeight: 190, backgroundColor: phase === 'fr' ? t.successSoft : t.surface, borderWidth: 2, borderColor: phase === 'think' ? palette.gold : t.border, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {phase === 'done' ? (
          <>
            <Text style={{ fontSize: 44 }}>🎉</Text>
            <T v="h3" center>Revisão concluída!</T>
            <T v="small" center>{items.length} itens revisados só com a voz.</T>
          </>
        ) : (
          <>
            <Chip label={phase === 'think' ? '🗣️ Sua vez: diga em francês!' : phase === 'fr' ? '✅ Resposta' : phase === 'pt' ? '🇧🇷 Ouça' : `${i + 1} de ${items.length}`} color={phase === 'think' ? palette.goldDark : t.text2} bg={phase === 'think' ? palette.goldSoft : t.surface2} />
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: t.text, textAlign: 'center' }}>{it.pt}</Text>
            {phase === 'fr' ? <Text style={{ fontFamily: fonts.displayItalic, fontSize: 22, color: t.success, textAlign: 'center' }}>{it.fr}</Text> : null}
          </>
        )}
      </View>
      <ProgressBar value={(i + (phase === 'done' ? 1 : 0)) / items.length} style={{ marginTop: 14 }} height={8} />
      <T v="label" style={{ marginTop: 18 }}>Tempo para responder</T>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        {GAPS.map(([ms, l]) => (
          <Pressable key={ms} onPress={() => setGap(ms)} style={{ flex: 1 }}>
            <Chip label={l} big bg={gap === ms ? t.primary : t.surface2} color={gap === ms ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
        {running ? (
          <>
            <Button title="Pausar" icon="stop" variant="secondary" style={{ flex: 1 }} onPress={stop} />
            <Button title="Pular" icon="chevron" style={{ flex: 1 }} onPress={() => run(i + 1)} />
          </>
        ) : phase === 'done' ? (
          <Button title="De novo" icon="refresh" style={{ flex: 1 }} onPress={() => run(0)} />
        ) : (
          <Button title={i > 0 ? 'Continuar' : 'Começar'} icon="play" style={{ flex: 1 }} onPress={() => run(i)} />
        )}
      </View>
      <T v="caption" center style={{ marginTop: 10 }}>Funciona offline. Deixe o app aberto na tela enquanto ouve.</T>
    </Screen>
  );
}
