// Story reader → comprehension quiz → result.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, unitColors, palette } from '../../theme';
import { T, Button, Sheet, Chip, Empty, Screen } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import Session from '../../components/Session';
import ResultView from '../../components/ResultView';
import { AudioButton, SpeedChip } from '../../components/extras';
import { genderColor } from '../../content/vocab';
import { getStory } from '../../content/stories';
import { buildStoryQuiz, buildShadowing } from '../../engine/exercises';
import { speak, stopSpeaking } from '../../services/speech';

export default function StoryScreen() {
  const { id } = useLocalSearchParams();
  const story = getStory(id);
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState('read');
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState({});
  const [playing, setPlaying] = useState(-1);
  const [gloss, setGloss] = useState(false);
  const [result, setResult] = useState(null);
  const playToken = useRef(0);
  const started = useRef(Date.now());
  const quiz = useMemo(() => (story ? buildStoryQuiz(story) : []), [id]);

  useEffect(() => () => { playToken.current++; stopSpeaking(); }, []);

  if (!story) return <Screen title="História"><Empty emoji="📕" title="História não encontrada" action="Voltar" onAction={() => router.back()} /></Screen>;
  const color = unitColors[(story.unit - 1) % unitColors.length];

  const playLine = (i) => {
    playToken.current++;
    setPlaying(i);
    speak(story.lines[i].fr, { onDone: () => setPlaying((p) => (p === i ? -1 : p)) });
  };

  const playAll = () => {
    if (playing >= 0) {
      playToken.current++;
      stopSpeaking();
      setPlaying(-1);
      return;
    }
    const token = ++playToken.current;
    const run = (i) => {
      if (token !== playToken.current) return;
      if (i >= story.lines.length) { setPlaying(-1); return; }
      setPlaying(i);
      speak(story.lines[i].fr, { onDone: () => setTimeout(() => run(i + 1), 350) });
    };
    run(0);
  };

  if (phase === 'shadow') {
    return (
      <Session
        exercises={buildShadowing(story.lines)}
        kind="speaking"
        color={palette.red}
        onFinish={(r) => {
          actions.finishSession({ correct: r.correct, total: r.total, seconds: r.seconds, xp: r.correct * 2 + 5, perfect: r.perfect, kind: 'speaking' });
          setPhase('read');
        }}
      />
    );
  }

  if (phase === 'quiz') {
    return (
      <Session
        exercises={quiz}
        kind="story"
        color={color.main}
        onFinish={(r) => {
          const pct = r.correct / Math.max(1, r.total);
          const stars = pct >= 0.95 ? 3 : pct >= 0.75 ? 2 : 1;
          const first = !state.stories?.[story.id];
          const xp = r.correct * 2 + (first ? 15 : 5);
          const seconds = Math.round((Date.now() - started.current) / 1000);
          actions.finishSession({ correct: r.correct, total: r.total, seconds, xp, perfect: r.perfect, kind: 'story' });
          actions.set((s) => ({
            stories: { ...(s.stories || {}), [story.id]: { stars: Math.max(stars, s.stories?.[story.id]?.stars || 0), at: Date.now() } },
            daily: { ...s.daily, stories: (s.daily.stories || 0) + 1 },
          }));
          setResult({ ...r, xp, pct });
          setPhase('result');
        }}
      />
    );
  }

  if (phase === 'result') {
    const r = result;
    return (
      <ResultView
        title={r.pct >= 0.75 ? 'Leitura concluída! 📖' : 'Boa leitura!'}
        subtitle={r.pct >= 0.75 ? 'Você entendeu a história. Ler um pouco todo dia faz o vocabulário crescer sozinho.' : 'Releia a história com a tradução e tente de novo — na segunda vez fica bem mais fácil.'}
        xp={r.xp}
        correct={r.correct}
        total={r.total}
        seconds={r.seconds}
        bestCombo={r.bestCombo}
        passed
        actions={[
          { title: 'Continuar', icon: 'chevron', onPress: () => router.back() },
          { title: 'Ler de novo', icon: 'refresh', onPress: () => { setOpen({}); setShowAll(false); setPhase('read'); } },
        ]}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 10 }}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Icon name="close" size={26} color={t.text3} stroke={2.6} /></Pressable>
        <View style={{ flex: 1 }} />
        <SpeedChip />
        <Pressable onPress={() => setGloss(true)} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: t.surface2 }}>
          <Text style={{ fontSize: 16 }}>📖</Text>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: t.text }}>Vocabulário</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 4, paddingBottom: 140 }}>
        <View style={{ alignItems: 'center', gap: 6, marginBottom: 18 }}>
          <View style={{ width: 84, height: 84, borderRadius: 26, backgroundColor: color.main, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 44 }}>{story.emoji}</Text>
          </View>
          <Chip label={`${story.level} · Unidade ${story.unit}`} color={color.main} />
          <Text style={{ fontFamily: fonts.display, fontSize: 28, color: t.text, textAlign: 'center' }}>{story.title}</Text>
          <T v="small">{story.pt}</T>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <Button title={playing >= 0 ? 'Parar' : 'Ouvir tudo'} icon={playing >= 0 ? 'close' : 'volume'} small variant="secondary" style={{ flex: 1 }} onPress={playAll} />
          <Button title={showAll ? 'Esconder tradução' : 'Ver tradução'} icon="swap" small variant="secondary" style={{ flex: 1 }} onPress={() => setShowAll((x) => !x)} />
        </View>
        <Button title="Repita comigo (shadowing)" icon="mic" small variant="secondary" style={{ marginBottom: 12 }} onPress={() => { playToken.current++; stopSpeaking(); setPlaying(-1); setPhase('shadow'); }} />
        <T v="caption" style={{ marginBottom: 10 }}>Toque numa frase para ouvir · toque em 🇧🇷 para traduzir só ela</T>

        <View style={{ gap: 10 }}>
          {story.lines.map((l, i) => {
            const active = playing === i;
            const tr = showAll || open[i];
            return (
              <Pressable key={i} onPress={() => playLine(i)} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: radius.lg, backgroundColor: active ? t.skySoft : t.surface, borderWidth: 2, borderColor: active ? t.sky : t.border }}>
                <View style={{ flex: 1, gap: 4 }}>
                  {l.who ? <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: color.main, letterSpacing: 0.5 }}>{l.who.toUpperCase()}</Text> : null}
                  <Text style={{ fontFamily: fonts.displayItalic, fontSize: 19, lineHeight: 27, color: t.text }}>{l.fr}</Text>
                  {tr && l.pt ? <Text style={{ fontFamily: fonts.bodySemi, fontSize: 14, lineHeight: 20, color: t.text2 }}>{l.pt}</Text> : null}
                </View>
                {l.pt ? (
                  <Pressable onPress={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} hitSlop={10} style={{ paddingTop: 2 }}>
                    <Text style={{ fontSize: 18, opacity: tr ? 1 : 0.55 }}>🇧🇷</Text>
                  </Pressable>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 20 + insets.bottom, backgroundColor: t.bg, borderTopWidth: 1, borderTopColor: t.border }}>
        <Button title={`Responder perguntas (${quiz.length})`} color={color.main} onPress={() => { playToken.current++; stopSpeaking(); setPlaying(-1); setPhase('quiz'); }} />
      </View>

      <Sheet visible={gloss} onClose={() => setGloss(false)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Duck mood="teach" size={56} />
          <T v="h3" style={{ flex: 1 }}>Palavras da história</T>
        </View>
        <View style={{ gap: 8 }}>
          {story.words.map((w) => (
            <View key={w.fr} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 12, backgroundColor: t.bg }}>
              <AudioButton text={w.fr.replace(/\(.*?\)/g, '')} size={34} />
              <View style={{ flex: 1 }}>
                <T v="bodyBold" color={genderColor(w.fr, t.text)}>{w.fr}</T>
                <T v="small">{w.pt}</T>
              </View>
              <Pressable onPress={() => actions.toggleSaved({ fr: w.fr, pt: w.pt })} hitSlop={8}>
                <Icon name="bookmark" size={20} color={palette.gold} fill={state.saved.find((c) => c.fr === w.fr) ? palette.gold : 'none'} />
              </Pressable>
            </View>
          ))}
        </View>
        <Button title="Fechar" variant="secondary" style={{ marginTop: 14 }} onPress={() => setGloss(false)} />
      </Sheet>
    </View>
  );
}
