import React, { useMemo, useState } from 'react';
import { View, TextInput, Text, ScrollView, Platform, Pressable } from 'react-native';
import { KeyboardAwareView } from '../components/keyboard';
import { Alert } from '../services/dialog';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Button, ProgressBar, Tap, Bubble } from '../components/ui';
import Duck from '../components/Duck';
import Icon from '../components/Icon';
import { Appear } from '../components/extras';
import { PLACEMENT } from '../content/extras';
import { shuffle } from '../engine/exercises';
import { signInWithGoogle } from '../services/auth';
import { fetchBackup, fetchLegacy } from '../services/cloud';
import { fx } from '../services/feedback';

const REASONS = [
  { id: 'viagem', label: 'Viagem', emoji: '✈️' },
  { id: 'trabalho', label: 'Trabalho', emoji: '💼' },
  { id: 'estudos', label: 'Estudos', emoji: '🎓' },
  { id: 'cultura', label: 'Cultura', emoji: '🎬' },
  { id: 'familia', label: 'Família e amigos', emoji: '❤️' },
  { id: 'cerebro', label: 'Treinar o cérebro', emoji: '🧠' },
];
const LEVELS = [
  { id: 'zero', label: 'Nada, estou começando', emoji: '🥚', sub: 'Começo pela unidade 1' },
  { id: 'some', label: 'Sei algumas palavras', emoji: '🐣', sub: 'Posso fazer um teste rápido' },
  { id: 'talk', label: 'Consigo conversar', emoji: '🦆', sub: 'Teste de nivelamento recomendado' },
  { id: 'adv', label: 'Sou avançado', emoji: '🗼', sub: 'O teste pode liberar até o C1' },
];
const MINUTES = [
  { v: 5, label: 'Tranquilo', sub: '5 min por dia' },
  { v: 10, label: 'Regular', sub: '10 min por dia' },
  { v: 15, label: 'Sério', sub: '15 min por dia' },
  { v: 20, label: 'Intenso', sub: '20 min por dia' },
];
const TIMES = [
  { h: 8, m: 0, label: '08:00', emoji: '🌅' },
  { h: 12, m: 30, label: '12:30', emoji: '🥪' },
  { h: 19, m: 0, label: '19:00', emoji: '🌆' },
  { h: 21, m: 30, label: '21:30', emoji: '🌙' },
];

function Option({ selected, onPress, emoji, label, sub, style }) {
  const t = useTheme();
  return (
    <Tap onPress={onPress} style={[{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: selected ? t.sky : t.border, backgroundColor: selected ? t.skySoft : t.surface }, style]}>
      {emoji ? <Text style={{ fontSize: 28 }}>{emoji}</Text> : null}
      <View style={{ flex: 1 }}>
        <T v="bodyBold" color={selected ? (t.mode === 'dark' ? '#fff' : palette.navy) : t.text}>{label}</T>
        {sub ? <T v="small">{sub}</T> : null}
      </View>
      {selected ? <Icon name="check" size={22} color={t.sky} stroke={3} /> : null}
    </Tap>
  );
}

export default function Onboarding() {
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(state.profile.name || '');
  const [reason, setReason] = useState(null);
  const [level, setLevel] = useState(null);
  const [minutes, setMinutes] = useState(10);
  const [time, setTime] = useState(TIMES[2]);
  const [remind, setRemind] = useState(true);
  const [unlocked, setUnlocked] = useState(1);
  const [placing, setPlacing] = useState(false);
  const [pi, setPi] = useState(0);
  const [pScore, setPScore] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const placement = useMemo(() => PLACEMENT.map((p) => ({ ...p, o: shuffle(p.o) })), []);

  const total = 5;
  const bubbles = [
    'Bonjour ! Eu sou o Canard, seu professor de francês. Como posso te chamar?',
    `Enchanté, ${name.trim() || 'mon ami'} ! Por que você quer aprender francês?`,
    'Quanto você já sabe de francês?',
    'Quanto tempo por dia você quer estudar? Isso vira sua meta diária.',
    'Quer que eu te lembre de estudar? Hábitos se constroem todo dia!',
  ];

  const canNext = [name.trim().length > 0, !!reason, !!level, !!minutes, true][step];

  const finish = async () => {
    actions.completeOnboarding(
      { name: name.trim(), reason, startLevel: level, dailyMinutes: minutes, reminder: { enabled: remind, hour: time.h, minute: time.m } },
      unlocked
    );
    router.replace('/(tabs)');
  };

  const login = async () => {
    setLoggingIn(true);
    try {
      const a = await signInWithGoogle();
      actions.setAuth(a);
      const { backup } = await fetchBackup(a).catch(() => ({}));
      if (backup?.state) {
        actions.mergeCloud({ state: backup.state, xp: backup.state.xp });
        Alert.alert('Progresso recuperado!', 'Encontramos seu progresso salvo na nuvem. 🎉');
        router.replace('/(tabs)');
        return;
      }
      const legacy = await fetchLegacy(a);
      if (legacy?.xp) {
        actions.mergeCloud(legacy);
        Alert.alert('Bem-vindo de volta!', `Recuperamos seus ${legacy.xp} XP da versão anterior. 🦆`);
      }
      if (!name.trim()) setName(a.name?.split(' ')[0] || '');
    } catch (e) {
      if (e.message !== 'cancelado') Alert.alert('Não foi possível entrar', e.message);
    } finally {
      setLoggingIn(false);
    }
  };

  // ─── PLACEMENT TEST ─────────────────────────────────────
  if (placing) {
    const q = placement[pi];
    const answer = (opt) => {
      if (chosen) return;
      setChosen(opt);
      const ok = opt === q.a;
      ok ? fx.correct() : fx.wrong();
      setTimeout(() => {
        const scores = [...pScore, { unit: q.unit, ok }];
        setPScore(scores);
        setChosen(null);
        if (pi + 1 >= placement.length) {
          const firstWrong = scores.find((s) => !s.ok);
          const u = firstWrong ? firstWrong.unit : 20;
          setUnlocked(Math.max(1, u));
          setPlacing(false);
          setStep(3);
        } else setPi(pi + 1);
      }, 650);
    };
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top + 12, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => { setPlacing(false); }} hitSlop={10}><Icon name="close" size={26} color={t.text3} /></Pressable>
          <ProgressBar value={pi / placement.length} style={{ flex: 1 }} color={t.sky} />
        </View>
        <T v="label" style={{ marginTop: 24 }}>Teste de nivelamento · {pi + 1}/{placement.length}</T>
        <T v="h2" style={{ marginTop: 8, marginBottom: 24 }}>{q.q}</T>
        <View style={{ gap: 12 }}>
          {q.o.map((o) => {
            const st = chosen ? (o === q.a ? 'ok' : o === chosen ? 'bad' : null) : null;
            return (
              <Tap key={o} onPress={() => answer(o)} style={{ padding: 18, borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: st === 'ok' ? t.success : st === 'bad' ? t.error : t.border, backgroundColor: st === 'ok' ? t.successSoft : st === 'bad' ? t.errorSoft : t.surface }}>
                <T v="bodyBold">{o}</T>
              </Tap>
            );
          })}
        </View>
        <T v="small" center style={{ marginTop: 24 }}>Não sabe? Tudo bem — chute! O teste se adapta a você.</T>
      </View>
    );
  }

  return (
    <KeyboardAwareView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {step > 0 ? (
          <Pressable onPress={() => setStep(step - 1)} hitSlop={10}><Icon name="back" size={26} color={t.text3} stroke={2.6} /></Pressable>
        ) : <View style={{ width: 26 }} />}
        <ProgressBar value={(step + 1) / total} style={{ flex: 1 }} color={t.sky} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 24 }}>
          <Duck size={110} mood={step === 0 ? 'wave' : step === 2 ? 'think' : 'happy'} />
          <Appear key={step} style={{ flex: 1, marginBottom: 20 }}>
            <Bubble><T v="bodyBold">{bubbles[step]}</T></Bubble>
          </Appear>
        </View>

        {step === 0 && (
          <View style={{ gap: 14 }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor={t.text3}
              autoFocus
              style={{ fontFamily: fonts.bodyBold, fontSize: 20, color: t.text, backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: radius.lg, padding: 18 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: t.border }} />
              <T v="caption">ou</T>
              <View style={{ flex: 1, height: 1, backgroundColor: t.border }} />
            </View>
            <Button title={state.auth ? 'Conectado: ' + (state.auth.name || '') : 'Entrar com Google'} variant="secondary" icon="cloud" onPress={login} loading={loggingIn} disabled={!!state.auth} />
            <T v="small" center>Com a conta Google seu progresso fica salvo na nuvem e você entra no ranking.</T>
          </View>
        )}

        {step === 1 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {REASONS.map((r) => (
              <Tap key={r.id} onPress={() => setReason(r.id)} style={{ width: '47%', flexGrow: 1, alignItems: 'center', gap: 6, paddingVertical: 20, borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: reason === r.id ? t.sky : t.border, backgroundColor: reason === r.id ? t.skySoft : t.surface }}>
                <Text style={{ fontSize: 36 }}>{r.emoji}</Text>
                <T v="bodyBold" center>{r.label}</T>
              </Tap>
            ))}
          </View>
        )}

        {step === 2 && (
          <View style={{ gap: 12 }}>
            {LEVELS.map((l) => <Option key={l.id} selected={level === l.id} onPress={() => setLevel(l.id)} emoji={l.emoji} label={l.label} sub={l.sub} />)}
            {unlocked > 1 ? (
              <View style={{ backgroundColor: t.successSoft, padding: 14, borderRadius: radius.md, marginTop: 6 }}>
                <T v="bodyBold" color={t.success}>Resultado do teste: começar pela unidade {unlocked} 🎉</T>
              </View>
            ) : null}
          </View>
        )}

        {step === 3 && (
          <View style={{ gap: 12 }}>
            {MINUTES.map((m) => <Option key={m.v} selected={minutes === m.v} onPress={() => setMinutes(m.v)} label={m.label} sub={m.sub} emoji={{ 5: '☕', 10: '🥐', 15: '📚', 20: '🔥' }[m.v]} />)}
          </View>
        )}

        {step === 4 && (
          <View style={{ gap: 14 }}>
            <Option selected={remind} onPress={() => setRemind(!remind)} emoji="🔔" label="Sim, me lembre" sub="Um lembrete por dia, no horário que você escolher" />
            {remind ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {TIMES.map((tm) => (
                  <Tap key={tm.label} onPress={() => setTime(tm)} style={{ flexGrow: 1, width: '45%', alignItems: 'center', padding: 14, borderRadius: radius.md, borderWidth: 2, borderBottomWidth: 4, borderColor: time.label === tm.label ? t.sky : t.border, backgroundColor: time.label === tm.label ? t.skySoft : t.surface }}>
                    <Text style={{ fontSize: 22 }}>{tm.emoji}</Text>
                    <T v="title">{tm.label}</T>
                  </Tap>
                ))}
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 20 + insets.bottom, backgroundColor: t.bg, borderTopWidth: 1, borderTopColor: t.border, gap: 10 }}>
        {step === 2 && (level === 'some' || level === 'talk' || level === 'adv') && unlocked === 1 ? (
          <>
            <Button title="Fazer teste de 2 minutos" icon="target" onPress={() => { setPi(0); setPScore([]); setPlacing(true); }} />
            <Button title="Começar do zero" variant="ghost" onPress={() => setStep(3)} small />
          </>
        ) : (
          <Button
            title={step === total - 1 ? 'Começar a aprender' : 'Continuar'}
            disabled={!canNext}
            onPress={() => (step === total - 1 ? finish() : setStep(step + 1))}
          />
        )}
      </View>
    </KeyboardAwareView>
  );
}
