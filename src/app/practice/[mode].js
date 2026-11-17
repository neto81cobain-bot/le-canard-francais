import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, palette, unitColors } from '../../theme';
import { T, Button, Bubble, Empty, Screen } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import { Appear } from '../../components/extras';
import Session from '../../components/Session';
import ResultView from '../../components/ResultView';
import { UNITS, LESSONS, getUnit, bankQuestions, BANK_TOPICS } from '../../content';
import { buildReview, buildFromMistakes, buildUnitTest, buildBank, buildLesson, shuffle } from '../../engine/exercises';
import { dueItems, weakestItems } from '../../store/logic';

const MODES = {
  review: { title: 'Revisão inteligente', emoji: '🧠', mood: 'think', intro: 'Vou te mostrar o que você está quase esquecendo. Revisar na hora certa é o segredo para lembrar para sempre!' },
  mistakes: { title: 'Meus erros', emoji: '🎯', mood: 'comfort', intro: 'Errar faz parte! Vamos treinar exatamente o que você errou antes.' },
  timed: { title: 'Contra o relógio', emoji: '⏱️', mood: 'celebrate', intro: 'Você tem 90 segundos! Responda o máximo que conseguir. Acertos seguidos multiplicam seu XP.' },
  daily: { title: 'Desafio diário', emoji: '⚡', mood: 'proud', intro: 'Questões mais difíceis, misturando tudo o que você já estudou. XP em dobro hoje!' },
  test: { title: 'Teste da unidade', emoji: '🏆', mood: 'teach', intro: 'Mostre o que aprendeu! Com 80% de acerto você conclui a unidade e libera a próxima.' },
  bank: { title: 'Treino por tema', emoji: '✍️', mood: 'teach', intro: 'Questões rápidas para fixar o conteúdo, com explicação em cada erro.' },
};

function learnedLessons(state) {
  return LESSONS.filter((l) => state.lessons[l.id]?.done || getUnit(l.unitId).number < state.unlockedUnit);
}

export default function Practice() {
  const { mode, unit: unitId, key } = useLocalSearchParams();
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState(mode === 'review' || mode === 'mistakes' || mode === 'bank' ? 'practice' : 'intro');
  const [result, setResult] = useState(null);
  const cfg = MODES[mode] || MODES.review;
  const unit = unitId ? getUnit(unitId) : null;
  const bankTopic = BANK_TOPICS.find((b) => b.key === key);
  const color = unit ? unitColors[(unit.number - 1) % unitColors.length].main : mode === 'timed' ? palette.gold : mode === 'daily' ? palette.red : t.primary;

  const exercises = useMemo(() => {
    const learned = learnedLessons(state);
    const pool = (learned.length ? learned : UNITS[0].lessons).flatMap((l) => [...l.vocab, ...l.sentences]);
    if (mode === 'review') {
      let items = dueItems(state.srs, Date.now(), 14);
      if (items.length < 6) items = [...items, ...weakestItems(state.srs, Date.now(), 14 - items.length).filter((w) => !items.find((i) => i.key === w.key))];
      if (!items.length) return [];
      return buildReview(items, { pool, count: 12 });
    }
    if (mode === 'mistakes') return buildFromMistakes(state.mistakes, 12);
    if (mode === 'test' && unit) return buildUnitTest(unit, { speak: false });
    if (mode === 'bank') return buildBank(bankQuestions(key), 15);
    if (mode === 'timed') {
      const quiz = (learned.length ? learned : UNITS[0].lessons).flatMap((l) => l.quiz.map((q) => ({ type: 'mcq', title: 'Rápido!', prompt: q.q, answer: q.a, options: shuffle(q.o), why: q.why })));
      const bank = buildBank([...bankQuestions('avoir'), ...bankQuestions('etre'), ...bankQuestions('numbers')], 40);
      return shuffle([...quiz, ...bank]).slice(0, 60);
    }
    if (mode === 'daily') {
      const src = learned.length ? learned : UNITS[0].lessons;
      const all = src.filter((l) => !l.story).flatMap((l) => buildLesson(l, { allSentences: pool.filter((p) => !p.isWord), speak: false, unitNumber: 3 }));
      const hard = all.filter((e) => ['build', 'listen', 'fill', 'translate', 'mcq'].includes(e.type));
      return shuffle(hard).slice(0, 15);
    }
    return [];
  }, [mode, unitId, key]);

  if (!exercises.length) {
    return (
      <Screen title={cfg.title}>
        {mode === 'mistakes' ? (
          <Empty emoji="🎉" title="Nenhum erro guardado!" text="Quando você errar algo, ele aparece aqui para treinar depois." action="Voltar" onAction={() => router.back()} />
        ) : (
          <Empty emoji="📚" title="Nada para revisar ainda" text="Faça algumas lições primeiro — depois o Canard monta revisões no momento certo para você." action="Ir para as lições" onAction={() => router.replace('/(tabs)')} />
        )}
      </Screen>
    );
  }

  if (phase === 'intro') {
    const title = mode === 'test' ? `Teste · Unidade ${unit.number}` : mode === 'bank' ? bankTopic?.title : cfg.title;
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable onPress={() => router.back()} hitSlop={12}><Icon name="close" size={28} color={t.text3} stroke={2.6} /></Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 140, alignItems: 'center' }}>
          <Appear><Text style={{ fontSize: 72 }}>{cfg.emoji}</Text></Appear>
          <Appear delay={100}>
            <T v="h1" center style={{ marginTop: 8 }}>{title}</T>
            {unit ? <T v="body" center color={t.text2}>{unit.title} · {unit.pt}</T> : null}
          </Appear>
          <Appear delay={200} style={{ alignSelf: 'stretch' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 28 }}>
              <Duck mood={cfg.mood} size={110} />
              <Bubble style={{ flex: 1, marginBottom: 24 }}><T v="bodyBold">{cfg.intro}</T></Bubble>
            </View>
          </Appear>
          <Appear delay={300} style={{ alignSelf: 'stretch' }}>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 24 }}>
              {(mode === 'timed'
                ? [{ e: '⏱️', l: '90 segundos' }, { e: '🔥', l: 'Combo x2' }, { e: '🏅', l: `Recorde: ${state.stats.timedBest}` }]
                : mode === 'daily'
                  ? [{ e: '🎯', l: '15 questões' }, { e: '⚡', l: 'XP em dobro' }, { e: state.daily.challengeDone ? '✅' : '📅', l: state.daily.challengeDone ? 'Feito hoje' : '1x por dia' }]
                  : [{ e: '📝', l: `${exercises.length} questões` }, { e: '🎯', l: 'Meta: 80%' }, { e: '🔓', l: 'Libera a próxima' }]
              ).map((x) => (
                <View key={x.l} style={{ flex: 1, alignItems: 'center', padding: 12, borderRadius: 16, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, gap: 4 }}>
                  <Text style={{ fontSize: 24 }}>{x.e}</Text>
                  <T v="caption" center>{x.l}</T>
                </View>
              ))}
            </View>
          </Appear>
        </ScrollView>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 20 + insets.bottom, backgroundColor: t.bg }}>
          <Button title="Começar" color={color} onPress={() => setPhase('practice')} />
        </View>
      </View>
    );
  }

  if (phase === 'practice') {
    return (
      <Session
        exercises={exercises}
        timed={mode === 'timed'}
        kind={mode === 'review' || mode === 'mistakes' ? 'review' : mode}
        color={color}
        onFinish={(r) => {
          let xp;
          if (mode === 'timed') xp = r.correct * 2 + Math.floor(r.bestCombo / 3) * 3;
          else if (mode === 'daily') xp = (r.correct * 2 + 10) * (state.daily.challengeDone ? 1 : 2);
          else if (mode === 'test') xp = r.correct * 2 + (r.correct / r.total >= 0.8 ? 30 : 0);
          else xp = r.correct * 2 + 5;
          actions.finishSession({
            unitTestId: mode === 'test' ? unit.id : null,
            correct: r.correct,
            total: r.total,
            seconds: r.seconds,
            xp,
            perfect: r.perfect,
            kind: mode === 'review' || mode === 'mistakes' ? 'review' : mode,
            bankKey: mode === 'bank' ? key : null,
          });
          if (mode === 'daily') actions.set((s) => ({ daily: { ...s.daily, challengeDone: true } }));
          if (mode === 'review' && state.settings.hearts) actions.refillHearts();
          setResult({ ...r, xp });
          setPhase('result');
        }}
      />
    );
  }

  const r = result;
  const pct = Math.round((r.correct / r.total) * 100);
  let title = 'Muito bem!';
  let subtitle = '';
  let passed = pct >= 50;
  if (mode === 'test') {
    passed = pct >= 80;
    title = passed ? 'Unidade concluída! 🏆' : 'Quase lá!';
    subtitle = passed
      ? unit.number < UNITS.length ? `A unidade ${unit.number + 1} está liberada. Bon voyage !` : 'Você completou o curso inteiro. Incroyable !'
      : `Você fez ${pct}%. Precisa de 80% — revise as lições da unidade e tente de novo.`;
  } else if (mode === 'timed') {
    title = `${r.correct} acertos!`;
    subtitle = r.correct > (state.stats.timedBest || 0) ? 'Novo recorde pessoal! 🎉' : `Seu recorde é ${state.stats.timedBest}.`;
    passed = true;
  } else if (mode === 'review') {
    title = 'Memória refrescada!';
    subtitle = 'As palavras revisadas vão voltar daqui a mais tempo. É assim que se aprende para sempre.';
  } else if (mode === 'mistakes') {
    title = pct >= 80 ? 'Erros corrigidos!' : 'Bom treino!';
    subtitle = 'O que você acertou saiu da lista de erros.';
  }
  const acts = [{ title: 'Continuar', icon: 'chevron', onPress: () => router.back() }];
  if (mode === 'test' && !passed) acts.push({ title: 'Ver o guia da unidade', icon: 'book', onPress: () => router.replace({ pathname: '/unit/[id]', params: { id: unit.id } }) });
  if (mode === 'timed' || mode === 'bank') acts.push({ title: 'Jogar de novo', icon: 'refresh', onPress: () => router.replace({ pathname: '/practice/[mode]', params: { mode, key } }) });
  return <ResultView title={title} subtitle={subtitle} xp={r.xp} correct={r.correct} total={r.total} seconds={r.seconds} bestCombo={r.bestCombo} passed={passed} actions={acts} />;
}
