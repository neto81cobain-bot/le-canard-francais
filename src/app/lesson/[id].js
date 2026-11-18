import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, unitColors, radius } from '../../theme';
import { T, Button, ProgressBar, Bubble } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import { Appear, AudioButton, SpeakableText } from '../../components/extras';
import { TeachCard, Rich } from '../../components/Rich';
import Session from '../../components/Session';
import ResultView from '../../components/ResultView';
import { getLesson, getUnit, LESSONS } from '../../content';
import { UNIT_GRAMMAR } from '../../content/grammar';
import { buildLesson } from '../../engine/exercises';
import { lessonXP } from '../../store/logic';
import { speak } from '../../services/speech';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const lesson = getLesson(id);
  const unit = lesson ? getUnit(lesson.unitId) : null;
  const color = unit ? unitColors[(unit.number - 1) % unitColors.length] : unitColors[0];
  const already = !!state.lessons[id]?.done;
  const [phase, setPhase] = useState('intro'); // intro | teach | story | practice | result
  const [card, setCard] = useState(0);
  const [showPt, setShowPt] = useState(false);
  const [result, setResult] = useState(null);
  const [round, setRound] = useState(0);
  const [retry, setRetry] = useState(null);

  // Distratores e opções só de lições já feitas (+ esta): nada de palavra nunca vista.
  const allSentences = useMemo(() => LESSONS.filter((l) => l.unitId === lesson?.unitId && (l.id === id || state.lessons[l.id]?.done)).flatMap((l) => l.sentences), [id]);
  const exercises = useMemo(
    () => (retry ? retry : lesson ? buildLesson(lesson, { allSentences, speak: true, unitNumber: unit.number, verbs: unit.verbs, tenses: unit.tenses }) : []),
    [id, round, retry]
  );

  if (!lesson) return null;

  // ─── INTRO ──────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable onPress={() => router.back()} hitSlop={12}><Icon name="close" size={28} color={t.text3} stroke={2.6} /></Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 160 }}>
          <Appear>
            <View style={{ alignSelf: 'flex-start', backgroundColor: color.soft, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={{ fontFamily: fonts.bodyHeavy, color: color.dark, fontSize: 12, letterSpacing: 1 }}>
                UNIDADE {unit.number} · {lesson.story ? 'HISTÓRIA' : `LIÇÃO ${lesson.index + 1}`}
              </Text>
            </View>
            <T v="h1" style={{ marginTop: 14 }}>{lesson.emoji} {lesson.title}</T>
            <T v="body" color={t.text2} style={{ marginTop: 6 }}>🎯 {lesson.goal}</T>
          </Appear>
          <Appear delay={150}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 32 }}>
              <Duck mood="teach" size={130} />
              <Bubble style={{ flex: 1, marginBottom: 30 }}><Rich text={lesson.intro} /></Bubble>
            </View>
          </Appear>
          <Appear delay={300}>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 28 }}>
              {[
                { icon: 'book', label: lesson.story ? 'Diálogo' : `${lesson.teach.length} explicações` },
                { icon: 'layers', label: `${lesson.vocab.length} palavras` },
                { icon: 'target', label: '~12 exercícios' },
              ].map((x) => (
                <View key={x.label} style={{ flex: 1, alignItems: 'center', gap: 6, padding: 12, borderRadius: radius.md, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
                  <Icon name={x.icon} size={22} color={color.main} />
                  <T v="caption" center>{x.label}</T>
                </View>
              ))}
            </View>
          </Appear>
          {already ? (
            <T v="small" center style={{ marginTop: 18 }}>Você já fez esta lição ({state.lessons[id].best}% de acerto). Refazer ajuda a fixar! ⭐</T>
          ) : null}
        </ScrollView>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 20 + insets.bottom, gap: 8, backgroundColor: t.bg }}>
          <Button title={lesson.story ? 'Ler a história' : 'Começar a aula'} color={color.main} onPress={() => setPhase(lesson.story ? 'story' : 'teach')} />
          {already ? <Button title="Pular direto para os exercícios" variant="ghost" small onPress={() => setPhase('practice')} /> : null}
        </View>
      </View>
    );
  }

  // ─── TEACH (one concept per screen) ─────────────────────
  if (phase === 'teach') {
    const c = lesson.teach[card];
    const last = card === lesson.teach.length - 1;
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable onPress={() => router.back()} hitSlop={12}><Icon name="close" size={28} color={t.text3} stroke={2.6} /></Pressable>
          <ProgressBar value={(card + 1) / (lesson.teach.length + 1)} style={{ flex: 1 }} height={14} color={color.main} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 160 }}>
          <Appear key={card}>
            <T v="label" color={color.main} style={{ marginBottom: 8 }}>Aula · {card + 1} de {lesson.teach.length}</T>
            <TeachCard card={c} color={color} />
            {last && lesson.vocab.length ? (
              <View style={{ marginTop: 28 }}>
                <T v="h3" style={{ marginBottom: 12 }}>Palavras novas</T>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {lesson.vocab.map((v) => (
                    <Pressable key={v.fr} onPress={() => speak(v.fr)} style={{ width: '47%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: t.surface, borderRadius: 14, borderWidth: 1, borderColor: t.border, padding: 10 }}>
                      <Text style={{ fontSize: 24 }}>{v.emoji || '🔹'}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: fonts.displayItalic, fontSize: 15, color: t.text }}>{v.fr}</Text>
                        <Text style={{ fontFamily: fonts.bodySemi, fontSize: 12, color: t.text2 }}>{v.pt}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
                {lesson.sentences.length ? (
                  <View style={{ marginTop: 24 }}>
                    <T v="h3" style={{ marginBottom: 4 }}>Frases que vão aparecer</T>
                    <T v="small" style={{ marginBottom: 12 }}>Ouça antes de praticar — toque numa palavra para ver o significado.</T>
                    <View style={{ gap: 8 }}>
                      {lesson.sentences.map((x) => (
                        <View key={x.fr} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.surface, borderRadius: 14, borderWidth: 1, borderColor: t.border, padding: 10 }}>
                          <AudioButton text={x.fr} size={34} />
                          <View style={{ flex: 1 }}>
                            <SpeakableText text={x.fr} style={{ fontSize: 16, lineHeight: 22 }} />
                            <Text style={{ fontFamily: fonts.bodySemi, fontSize: 12, color: t.text2 }}>{x.pt}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
          </Appear>
        </ScrollView>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 20 + insets.bottom, flexDirection: 'row', gap: 10, backgroundColor: t.bg, borderTopWidth: 1, borderTopColor: t.border }}>
          {card > 0 ? <Button title="Voltar" variant="secondary" onPress={() => setCard(card - 1)} style={{ flex: 1 }} /> : null}
          <Button
            title={last ? 'Praticar!' : 'Próximo'}
            color={color.main}
            style={{ flex: 2 }}
            onPress={() => {
              if (last) {
                actions.learnWords(lesson.vocab, lesson.id);
                setPhase('practice');
              } else setCard(card + 1);
            }}
          />
        </View>
      </View>
    );
  }

  // ─── STORY (read & listen) ──────────────────────────────
  if (phase === 'story') {
    const speakers = Array.from(new Set(lesson.dialogue.map((d) => d.who)));
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable onPress={() => router.back()} hitSlop={12}><Icon name="close" size={28} color={t.text3} stroke={2.6} /></Pressable>
          <T v="h3" style={{ flex: 1 }}>{lesson.emoji} {lesson.title}</T>
          <Pressable onPress={() => setShowPt(!showPt)} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: showPt ? t.primary : t.surface2 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color: showPt ? '#fff' : t.text2, fontSize: 13 }}>PT</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 160, gap: 12 }}>
          <T v="small" style={{ marginBottom: 6 }}>Toque em 🔊 para ouvir cada fala. Toque nas palavras para ouvi-las isoladas.</T>
          {lesson.dialogue.map((d, i) => {
            const right = speakers.indexOf(d.who) % 2 === 1;
            return (
              <Appear key={i} delay={i * 120}>
                <View style={{ flexDirection: right ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
                  {right ? <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color.soft, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 20 }}>🙂</Text></View> : <Duck size={44} head noBadge />}
                  <View style={{ maxWidth: '78%', backgroundColor: right ? color.main : t.surface, borderRadius: 18, borderBottomLeftRadius: right ? 18 : 4, borderBottomRightRadius: right ? 4 : 18, padding: 12, borderWidth: right ? 0 : 1, borderColor: t.border }}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: right ? 'rgba(255,255,255,0.8)' : color.main }}>{d.who}</Text>
                    <Text style={{ fontFamily: fonts.displayItalic, fontSize: 17, lineHeight: 24, color: right ? '#fff' : t.text }}>{d.fr}</Text>
                    {showPt ? <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: right ? 'rgba(255,255,255,0.85)' : t.text2, marginTop: 4 }}>{d.pt}</Text> : null}
                  </View>
                  <AudioButton text={d.fr} size={34} />
                </View>
              </Appear>
            );
          })}
        </ScrollView>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 20 + insets.bottom, backgroundColor: t.bg, borderTopWidth: 1, borderTopColor: t.border }}>
          <Button title="Responder perguntas" color={color.main} onPress={() => { actions.learnWords(lesson.vocab, lesson.id); setPhase('practice'); }} />
        </View>
      </View>
    );
  }

  // ─── PRACTICE ───────────────────────────────────────────
  if (phase === 'practice') {
    return (
      <Session
        key={round + (retry ? 'r' : '')}
        exercises={exercises}
        color={color.main}
        grammarId={UNIT_GRAMMAR[unit?.number]}
        kind={retry ? 'retry' : 'lesson'}
        onFinish={(r) => {
          const xp = retry ? Math.max(3, r.correct) : lessonXP({ correct: r.correct, total: r.total, perfect: r.perfect, comboBest: r.bestCombo });
          actions.finishSession({ lessonId: retry ? null : lesson.id, correct: r.correct, total: r.total, seconds: r.seconds, xp, perfect: !retry && r.perfect, kind: retry ? 'review' : 'lesson' });
          setResult({ ...r, xp });
          setPhase('result');
        }}
      />
    );
  }

  // ─── RESULT ─────────────────────────────────────────────
  const r = result;
  const pct = Math.round((r.correct / r.total) * 100);
  const title = r.perfect ? 'Sans faute ! 🌟' : pct >= 80 ? 'Lição concluída!' : pct >= 50 ? 'Bom trabalho!' : 'Continue praticando!';
  const subtitle = r.perfect
    ? 'Nenhum erro! Você ganhou bônus de XP.'
    : r.wrong > 0
      ? `Você errou ${r.wrong} — elas já foram para “Meus erros” e voltam na revisão.`
      : 'Excelente! Siga para a próxima.';
  const acts = [
    { title: 'Continuar', icon: 'chevron', onPress: () => router.back() },
  ];
  if (r.wrongList.length) acts.push({ title: `Revisar meus ${r.wrongList.length} erros`, icon: 'refresh', onPress: () => { setRetry(r.wrongList); setRound(round + 1); setPhase('practice'); } });
  if (lesson.bank) acts.push({ title: 'Treino extra (questões do banco)', icon: 'dumbbell', onPress: () => router.replace({ pathname: '/practice/[mode]', params: { mode: 'bank', key: lesson.bank } }) });
  return (
    <ResultView
      title={title}
      subtitle={subtitle}
      xp={r.xp}
      correct={r.correct}
      total={r.total}
      seconds={r.seconds}
      bestCombo={r.bestCombo}
      passed={pct >= 50}
      words={retry ? [] : lesson.vocab}
      actions={acts}
    />
  );
}
