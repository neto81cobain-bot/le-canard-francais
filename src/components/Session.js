// Runs a sequence of exercises: progress, checking, feedback, retries, hearts, combo, timer.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, Animated, Easing, BackHandler, Keyboard } from 'react-native';
import { Alert } from '../services/dialog';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { useTheme, fonts, palette } from '../theme';
import { T, Button, ProgressBar, Chip, Sheet } from './ui';
import Icon from './Icon';
import Duck from './Duck';
import { AudioButton, useShake, SpeedChip } from './extras';
import { ImageEx, McqEx, TranslateEx, BuildEx, ListenEx, FillEx, MatchEx, DialogueEx, SpeakEx, ConjugateEx, WriteEx, PairsEx, TrueFalseEx } from './Exercises';
import { checkTyped, checkSentence, normalize, snapshot } from '../engine/exercises';
import { fx } from '../services/feedback';
import { speak, stopSpeaking } from '../services/speech';
import { GRAMMAR } from '../content/grammar';

const GRAMMAR_BY_ID = Object.fromEntries(GRAMMAR.map((g) => [g.id, g]));
// Tipos de exercício em que o erro costuma ser de gramática (não de vocabulário)
const RULE_TYPES = ['fill', 'build', 'translate', 'write', 'fixerror', 'listenfill', 'conjugate'];
import { ExerciseBoundary } from './ErrorBoundary';
import { useKeyboardOverlap, scrollFocusedIntoView } from './keyboard';

const PRAISE = ['Magnifique !', 'Très bien !', 'Parfait !', 'Bravo !', 'Excellent !', 'Super !', 'Génial !', 'Bien joué !'];
const COMFORT = ['Pas de panique !', 'Presque !', 'Courage !', 'On continue !', 'Quase lá!'];
const rand = (a) => a[Math.floor(Math.random() * a.length)];

function grade(ex, value) {
  switch (ex.type) {
    case 'image':
    case 'mcq':
    case 'translate':
      return { ok: value === ex.answer };
    case 'build': {
      const got = (value || []).map((v) => v.w).join(' ');
      return { ok: normalize(got) === normalize(ex.answer) };
    }
    case 'listen':
      return ex.long ? checkSentence(value, ex.answer) : checkTyped(value, ex.answer);
    case 'fill':
      return checkTyped(value, ex.answer);
    case 'write':
      return checkSentence(value, ex.answer);
    case 'pairs':
    case 'truefalse':
      return { ok: value === ex.answer };
    case 'conjugate': {
      if (ex.choice) return { ok: value === ex.answer };
      let v = String(value || '').trim();
      // accept the answer typed together with the subject
      const subj = ex.subject.replace(/^que |^qu'/, '').replace('il/elle', '(il|elle)').replace('ils/elles', '(ils|elles)');
      v = v.replace(new RegExp('^(que |qu\'|qu’)?' + subj.replace("'", "['’]") + '\\s*', 'i'), '').replace(/\s*!$/, '');
      return checkTyped(v, ex.answer, ex.alternatives || []);
    }
    case 'dialogue': {
      const ok = (value || []).every((l, i) => l.id === i) && (value || []).length === ex.lines.length;
      return { ok };
    }
    default:
      return { ok: false };
  }
}

function hasValue(ex, v) {
  if (ex.type === 'build') return (v || []).length > 0;
  if (ex.type === 'dialogue') return (v || []).length === ex.lines.length;
  if (ex.type === 'listen' || ex.type === 'fill' || ex.type === 'conjugate' || ex.type === 'write') return !!(v || '').trim();
  return v != null;
}

function correctText(ex) {
  if (ex.type === 'image') {
    const o = ex.options.find((x) => x.fr === ex.answer);
    return `${ex.answer} = ${o?.pt || ''}`;
  }
  if (ex.type === 'dialogue') return ex.lines.map((l, i) => `${i + 1}. ${l.fr}`).join('\n');
  if (ex.type === 'build') return ex.item.fr;
  if (ex.type === 'conjugate') return ex.full;
  if (ex.type === 'truefalse') return ex.answer === 'V' ? 'Verdadeiro' : 'Falso';
  if (ex.type === 'pairs') {
    const o = ex.options.find((x) => x.fr === ex.answer);
    return `${ex.answer} (${o?.pt || ''})`;
  }
  return ex.answer;
}

function explanation(ex) {
  if (ex.why) return ex.why;
  if (ex.type === 'pairs') return ex.tip ? `${ex.groupTitle}: ${ex.tip}` : '';
  if (ex.type === 'write') return ex.item ? `“${ex.item.fr}” = ${ex.item.pt}` : '';
  if (ex.type === 'build' || ex.type === 'listen' || ex.type === 'translate') return ex.item ? `“${ex.item.fr}” = ${ex.item.pt}` : '';
  if (ex.type === 'mcq' && ex.item) return `${ex.item.fr} = ${ex.item.pt}`;
  return '';
}

function audioFor(ex) {
  if (ex.item?.fr) return ex.item.fr;
  if (ex.type === 'fill') return ex.prompt.replace('___', ex.answer);
  if (ex.type === 'pairs') return ex.answer;
  if (ex.type === 'mcq' && ex.prompt.includes('___')) return ex.prompt.replace('___', ex.answer).replace(/\(.*?\)/g, '');
  return null;
}

export default function Session({ exercises: initial, title, kind = 'lesson', timed = false, onFinish, color, grammarId }) {
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [queue, setQueue] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState(null);
  const [result, setResult] = useState(null); // { ok, note }
  const [combo, setCombo] = useState(0);
  const [noHearts, setNoHearts] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timed ? 90 : 0);
  const [shakeStyle, shake] = useShake();
  const stats = useRef({ correct: 0, wrong: 0, total: 0, bestCombo: 0, start: Date.now(), wrongList: [], retried: new Set() });
  const finished = useRef(false);
  const heartsOn = state.settings.hearts && kind !== 'review' && !timed;
  const wrap = useRef(null);
  const sv = useRef(null);
  const svOffset = useRef(0);
  const kb = useKeyboardOverlap(wrap, (kbTop) => scrollFocusedIntoView(sv, svOffset, kbTop, 110));

  useEffect(() => {
    actions.set({ inLesson: true });
    return () => {
      stopSpeaking();
      actions.set({ inLesson: false });
    };
  }, []);

  const quit = () => {
    Alert.alert('Sair da lição?', 'Você vai perder o progresso desta sessão.', [
      { text: 'Continuar estudando', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => router.back() },
    ]);
    return true;
  };
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', quit);
    return () => sub.remove();
  }, []);

  // Timer for timed mode
  useEffect(() => {
    if (!timed) return;
    const id = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [timed]);
  useEffect(() => {
    if (timed && timeLeft <= 0) finish();
  }, [timeLeft]);

  const ex = queue[idx];

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    stopSpeaking();
    const s = stats.current;
    onFinish({
      correct: s.correct,
      wrong: s.wrong,
      total: Math.max(1, s.total),
      bestCombo: s.bestCombo,
      seconds: Math.round((Date.now() - s.start) / 1000),
      perfect: s.wrong === 0 && s.total > 0,
      wrongList: s.wrongList,
    });
  };

  const advance = () => {
    stopSpeaking();
    setResult(null);
    setValue(null);
    if (idx + 1 >= queue.length) finish();
    else setIdx(idx + 1);
  };

  const record = (ok, note, extra = {}) => {
    const s = stats.current;
    const isRetry = s.retried.has(idx);
    if (!isRetry) {
      s.total += 1;
      if (ok) s.correct += 1;
      else s.wrong += 1;
    }
    const newCombo = ok ? combo + 1 : 0;
    setCombo(newCombo);
    s.bestCombo = Math.max(s.bestCombo, newCombo);
    actions.recordAnswer({ item: ex.item, correct: ok, combo: newCombo, kind: ex.type === 'listen' || ex.listen ? 'listen' : ex.type });
    const rule = ex.rule || (grammarId && RULE_TYPES.includes(ex.type) ? grammarId : null);
    if (rule) actions.ruleTally(rule, ok);
    if (!ok) {
      if (!isRetry) s.wrongList.push(ex);
      if (ex.type !== 'match' && ex.type !== 'speak') actions.addMistake(snapshot(ex));
      // Wrong answers come back once at the end of the session
      if (!isRetry && ex.type !== 'match' && ex.type !== 'speak' && !timed) {
        setQueue((q) => {
          const nq = [...q, ex];
          s.retried.add(nq.length - 1);
          return nq;
        });
      }
      if (heartsOn && state.hearts.count - 1 <= 0) setTimeout(() => setNoHearts(true), 600);
    } else if (ex.fromMistake) {
      actions.clearMistake(ex.fromMistake);
    }
    if (ok) fx.correct();
    else { fx.wrong(); shake(); }
    const a = audioFor(ex);
    if (a && ok && state.settings.autoAudio && !timed) setTimeout(() => speak(a), 250);
    if (timed) {
      setResult({ ok, note, flash: true });
      setTimeout(advance, ok ? 350 : 900);
    } else {
      setResult({ ok, note, praise: ok ? rand(PRAISE) : rand(COMFORT), ...extra });
    }
  };

  const check = () => {
    Keyboard.dismiss();
    const g = grade(ex, value);
    record(g.ok, g.note, g.words ? { words: g.words } : {});
  };

  if (!ex) return null;
  const progress = (idx + (result ? 1 : 0)) / queue.length;
  const locked = !!result;
  const selfGraded = ex.type === 'match' || ex.type === 'speak';
  const autoAudio = state.settings.autoAudio;

  // In timed mode, choosing an option checks immediately
  const onChange = (v) => {
    setValue(v);
    if (timed && !result && (ex.type === 'mcq' || ex.type === 'image' || ex.type === 'translate' || (ex.type === 'conjugate' && ex.choice))) {
      const g = grade(ex, v);
      record(g.ok, g.note);
    }
  };

  const body = (() => {
    const p = { ex, value, onChange, locked, autoAudio: autoAudio && !timed };
    switch (ex.type) {
      case 'image': return <ImageEx {...p} />;
      case 'mcq': return <McqEx {...p} />;
      case 'translate': return <TranslateEx {...p} />;
      case 'build': return <BuildEx {...p} />;
      case 'listen': return <ListenEx {...p} />;
      case 'fill': return <FillEx {...p} />;
      case 'dialogue': return <DialogueEx {...p} />;
      case 'conjugate': return <ConjugateEx {...p} />;
      case 'write': return <WriteEx {...p} />;
      case 'pairs': return <PairsEx {...p} />;
      case 'truefalse': return <TrueFalseEx {...p} />;
      case 'match': return <MatchEx key={idx} ex={ex} onComplete={(ok, info) => record(ok, ok ? (info?.mistakes ? 'Só um par trocado — quase perfeito!' : null) : 'Alguns pares trocados — eles voltam na revisão.')} />;
      case 'speak':
        return (
          <SpeakEx
            key={idx}
            ex={ex}
            onSpoken={() => actions.addSpoken(1)}
            onComplete={(ok, info) => record(ok, ok ? null : 'Pronúncia ainda não chegou lá — continue treinando na aba Falar!', info)}
            onSkip={() => {
              stats.current.retried.add(idx); // not counted
              advance();
            }}
          />
        );
      default: return null;
    }
  })();

  const fbColor = result?.ok ? t.success : t.error;
  const fbBg = result?.ok ? t.successSoft : t.errorSoft;
  const audio = result ? audioFor(ex) : null;

  return (
    <View ref={wrap} style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      {/* TOP BAR */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 }}>
        <Pressable onPress={quit} hitSlop={12} accessibilityLabel="Sair"><Icon name="close" size={28} color={t.text3} stroke={2.6} /></Pressable>
        {timed ? (
          <View style={{ flex: 1 }}>
            <ProgressBar value={timeLeft / 90} color={timeLeft > 45 ? t.sky : timeLeft > 15 ? palette.gold : t.error} height={14} />
          </View>
        ) : (
          <ProgressBar value={progress} style={{ flex: 1 }} height={14} color={color || t.success} />
        )}
        {timed ? <Chip icon="clock" label={`${Math.max(0, timeLeft)}s`} big color={timeLeft > 15 ? t.text : t.error} /> : null}
        {heartsOn ? <Chip icon="heart" label={String(state.hearts.count)} big color={palette.coralDark} bg={palette.coralSoft} /> : null}
        {combo >= 3 ? <Chip icon="flame" label={`x${combo}`} big color={palette.red} bg={palette.redSoft} /> : null}
        {!timed && ['listen', 'pairs', 'speak', 'image', 'build', 'dialogue'].includes(ex.type) ? <SpeedChip /> : null}
      </View>

      <ScrollView ref={sv} onScroll={(e) => { svOffset.current = e.nativeEvent.contentOffset.y; }} scrollEventThrottle={32} contentContainerStyle={{ padding: 20, paddingBottom: 200 + kb }} keyboardShouldPersistTaps="handled">
        <Animated.View key={idx} style={shakeStyle}>
          {stats.current.retried.has(idx) && ex.type !== 'speak' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Icon name="refresh" size={16} color={palette.goldDark} />
              <Text style={{ fontFamily: fonts.bodyHeavy, color: palette.goldDark, fontSize: 13 }}>ERRO ANTERIOR — TENTE DE NOVO</Text>
            </View>
          ) : null}
          {ex.item?.key && !state.srs?.[ex.item.key] && !stats.current.retried.has(idx) && ['image', 'mcq', 'translate', 'build', 'listen', 'write'].includes(ex.type) ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Text style={{ fontSize: 13 }}>✨</Text>
              <Text style={{ fontFamily: fonts.bodyHeavy, color: t.primary, fontSize: 12, letterSpacing: 0.5 }}>NOVO PARA VOCÊ — CAPRICHE NA ATENÇÃO</Text>
            </View>
          ) : null}
          <ExerciseBoundary key={'eb' + idx} color={color} onSkip={() => advance()}>{body}</ExerciseBoundary>
        </Animated.View>
      </ScrollView>

      {/* BOTTOM: check button or feedback */}
      {!selfGraded && !timed && !result ? (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: kb, padding: 20, paddingBottom: kb ? 12 : 20 + insets.bottom, backgroundColor: t.bg, borderTopWidth: 1, borderTopColor: t.border }}>
          <Button testID="kb-primary" title="Verificar" disabled={!hasValue(ex, value)} onPress={check} color={color} />
        </View>
      ) : null}

      {result && !result.flash ? (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: kb, padding: 20, paddingBottom: kb ? 12 : 20 + insets.bottom, backgroundColor: fbBg, borderTopLeftRadius: 24, borderTopRightRadius: 24, gap: 8 }}>
          {/* the duck reacts: celebrates combos, comforts mistakes, gets sad when a heart is lost */}
          <View pointerEvents="none" style={{ position: 'absolute', right: 14, top: -58 }}>
            <Duck size={66} noBadge mood={result.ok ? (combo >= 5 ? 'celebrate' : combo >= 3 ? 'proud' : 'happy') : heartsOn ? 'sad' : 'comfort'} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: fbColor, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={result.ok ? 'check' : 'close'} size={20} color="#fff" stroke={3} />
            </View>
            <Text style={{ flex: 1, fontFamily: fonts.display, fontSize: 22, color: fbColor }}>{result.praise}</Text>
            {audio ? <AudioButton text={audio} size={40} color={fbColor} /> : null}
            <Pressable onPress={() => { actions.set((s) => ({ reports: [...(s.reports || []), { ex: snapshot(ex), at: Date.now() }].slice(-50) })); Alert.alert('Obrigado!', 'Esta questão foi marcada para revisão. 🦆'); }} hitSlop={10}>
              <Icon name="flag" size={20} color={fbColor} />
            </Pressable>
          </View>
          {!result.ok ? (
            <View>
              <T v="bodyBold" color={fbColor}>Resposta certa:</T>
              <T v="body" color={t.text}>{correctText(ex)}</T>
              {result.words?.length ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                  {result.words.map((w, i) => (
                    <Text key={i} style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, overflow: 'hidden', color: w.status === 'good' ? t.success : w.status === 'close' ? palette.goldDark : t.error, backgroundColor: t.surface }}>{w.display}</Text>
                  ))}
                </View>
              ) : null}
            </View>
          ) : null}
          {result.note ? <T v="small" color={t.text}>{result.note}</T> : null}
          {explanation(ex) && (!result.ok || ex.type === 'mcq' || ex.type === 'pairs' || ex.type === 'truefalse') ? (
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', backgroundColor: t.surface, borderRadius: 14, padding: 12 }}>
              <Text style={{ fontSize: 18 }}>💡</Text>
              <T v="small" color={t.text} style={{ flex: 1 }}>{explanation(ex).replace(/\*/g, '')}</T>
            </View>
          ) : null}
          {!result.ok && grammarId && GRAMMAR_BY_ID[grammarId] && RULE_TYPES.includes(ex.type) ? (
            <Pressable onPress={() => router.push({ pathname: '/grammar', params: { open: grammarId } })} hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12, backgroundColor: t.surface }}>
              <Text style={{ fontSize: 15 }}>{GRAMMAR_BY_ID[grammarId].emoji}</Text>
              <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: t.primary }}>Revisar a regra: {GRAMMAR_BY_ID[grammarId].title} →</Text>
            </Pressable>
          ) : null}
          <Button testID="kb-primary" title={result.ok ? 'Continuar' : 'Entendi'} variant={result.ok ? 'success' : 'error'} onPress={advance} style={{ marginTop: 4 }} />
        </View>
      ) : null}

      {result?.flash ? (
        <View pointerEvents="none" style={{ position: 'absolute', alignSelf: 'center', top: '40%', backgroundColor: result.ok ? t.success : t.error, borderRadius: 20, paddingHorizontal: 22, paddingVertical: 12 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 20, color: '#fff' }}>{result.ok ? '+1 ✓' : '✗ ' + correctText(ex)}</Text>
        </View>
      ) : null}

      <Sheet visible={noHearts} onClose={() => router.back()}>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Duck mood="comfort" size={100} />
          <T v="h2" center>Suas vidas acabaram 💔</T>
          <T v="body" center color={t.text2}>Faça uma revisão rápida para recuperar as 5 vidas — ou espere: uma volta a cada 30 minutos.</T>
          <Button title="Revisar e recuperar" onPress={() => { setNoHearts(false); router.replace({ pathname: '/practice/[mode]', params: { mode: 'review' } }); }} style={{ alignSelf: 'stretch' }} />
          <Button title="Sair" variant="ghost" onPress={() => { setNoHearts(false); router.back(); }} style={{ alignSelf: 'stretch' }} />
        </View>
      </Sheet>
    </View>
  );
}
