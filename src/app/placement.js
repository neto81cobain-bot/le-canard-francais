// Placement test 2.0: grammar + vocabulary + listening (+ speaking if AI is on).
// Shows a result per skill and can unlock units. Retakeable any time.
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Button, ProgressBar, Chip, Card } from '../components/ui';
import Duck from '../components/Duck';
import { AudioButton } from '../components/extras';
import { OptionCard, SpeakEx } from '../components/Exercises';
import { PLACEMENT } from '../content/extras';
import { STORY_LIST } from '../content/stories';
import { VOCAB_THEMES } from '../content/vocab';
import { UNITS } from '../content';
import { shuffle, tokenize } from '../engine/exercises';
import { aiAvailable } from '../services/ai';
import { isOnline } from '../services/net';
import { fx } from '../services/feedback';
import { toast } from '../services/dialog';

const SKILLS = {
  grammar: { label: 'Gramática', emoji: '📐' },
  vocab: { label: 'Vocabulário', emoji: '🔤' },
  listening: { label: 'Escuta', emoji: '👂' },
  speaking: { label: 'Fala', emoji: '🗣️' },
};

function buildTest(withSpeak) {
  const out = [];
  [0, 2, 4, 6, 8, 10, 12, 13, 15, 16, 18, 20].forEach((i) => {
    const p = PLACEMENT[i];
    if (p) out.push({ skill: 'grammar', unit: p.unit, prompt: p.q, answer: p.a, options: shuffle(p.o) });
  });
  const words = shuffle(VOCAB_THEMES.flatMap((v) => v.words)).slice(0, 6);
  const allWords = VOCAB_THEMES.flatMap((v) => v.words);
  words.forEach((w, i) => {
    const others = shuffle(allWords.filter((x) => x.fr !== w.fr)).slice(0, 3).map((x) => x.fr);
    out.push({ skill: 'vocab', unit: 1 + i * 3, prompt: `Como se diz “${w.pt}”?`, answer: w.fr, options: shuffle([w.fr, ...others]) });
  });
  [1, 4, 8, 11, 14, 18].forEach((u) => {
    const st = STORY_LIST.find((s) => s.unit === u);
    if (!st) return;
    const lines = st.lines.filter((l) => l.pt && tokenize(l.fr).length >= 3 && tokenize(l.fr).length <= 14);
    const line = shuffle(lines)[0];
    if (!line) return;
    const others = shuffle(st.lines.filter((l) => l !== line && l.pt)).slice(0, 3).map((l) => l.pt);
    if (others.length < 2) return;
    out.push({ skill: 'listening', unit: u, audio: line.fr, prompt: 'Ouça e escolha a tradução', answer: line.pt, options: shuffle([line.pt, ...others]) });
  });
  if (withSpeak) {
    out.push({ skill: 'speaking', unit: 3, speak: { fr: 'Bonjour, je voudrais un café, s\'il vous plaît.', pt: 'Bom dia, eu queria um café, por favor.' } });
    out.push({ skill: 'speaking', unit: 12, speak: { fr: 'Il faut que nous partions avant la nuit.', pt: 'É preciso que partamos antes do anoitecer.' } });
  }
  return out;
}

// Highest unit where the learner still gets most things right.
function estimateUnit(answers) {
  const sorted = [...answers].sort((a, b) => a.unit - b.unit);
  let best = 1;
  for (let i = 0; i < sorted.length; i++) {
    const upto = sorted.slice(0, i + 1);
    const pct = upto.filter((a) => a.ok).length / upto.length;
    if (sorted[i].ok && pct >= 0.65) best = Math.max(best, sorted[i].unit);
  }
  return Math.min(UNITS.length, best);
}

export default function Placement() {
  const { state, actions } = useStore();
  const t = useTheme();
  const ai = aiAvailable();
  const [phase, setPhase] = useState('intro');
  const test = useMemo(() => buildTest(ai && isOnline()), [phase === 'intro']);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [answers, setAnswers] = useState([]);
  const q = test[i];

  const next = (ok) => {
    const a = [...answers, { skill: q.skill, unit: q.unit, ok }];
    setAnswers(a);
    setSel(null);
    if (i + 1 >= test.length) {
      const skills = {};
      Object.keys(SKILLS).forEach((k) => {
        const list = a.filter((x) => x.skill === k);
        if (list.length) skills[k] = Math.round((list.filter((x) => x.ok).length / list.length) * 100);
      });
      const unit = estimateUnit(a);
      actions.set({ placement: { at: Date.now(), skills, unit } });
      setPhase('result');
    } else setI(i + 1);
  };

  if (phase === 'intro') {
    return (
      <Screen title="Teste de nível">
        <View style={{ alignItems: 'center', gap: 10, marginTop: 10 }}>
          <Duck mood="think" size={120} />
          <T v="h2" center>Descubra seu nível real</T>
          <T v="body" center color={t.text2}>{test.length} perguntas em {ai ? 4 : 3} habilidades. Leva uns 5 minutos. Pode refazer quando quiser.</T>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
          {Object.entries(SKILLS).filter(([k]) => ai || k !== 'speaking').map(([k, s]) => (
            <View key={k} style={{ width: '47%', flexGrow: 1, alignItems: 'center', padding: 14, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 28 }}>{s.emoji}</Text>
              <T v="bodyBold">{s.label}</T>
            </View>
          ))}
        </View>
        {state.placement ? (
          <Card style={{ marginTop: 16 }}>
            <T v="label">Último resultado · {new Date(state.placement.at).toLocaleDateString('pt-BR')}</T>
            <T v="bodyBold" style={{ marginTop: 4 }}>Unidade sugerida: {state.placement.unit} ({UNITS[state.placement.unit - 1]?.level})</T>
          </Card>
        ) : null}
        <Button title="Começar" style={{ marginTop: 20 }} onPress={() => { setI(0); setAnswers([]); setPhase('test'); }} />
      </Screen>
    );
  }

  if (phase === 'result') {
    const r = state.placement || { skills: {}, unit: 1 };
    const lvl = UNITS[r.unit - 1]?.level || 'A1';
    const canUnlock = r.unit > state.unlockedUnit;
    const weakest = Object.entries(r.skills).sort((a, b) => a[1] - b[1])[0];
    return (
      <Screen title="Seu resultado">
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Duck mood="celebrate" size={110} />
          <Text style={{ fontFamily: fonts.display, fontSize: 44, color: t.primary }}>{lvl}</Text>
          <T v="bodyBold" center>Nível sugerido: unidade {r.unit}</T>
        </View>
        <View style={{ gap: 10, marginTop: 18 }}>
          {Object.entries(r.skills).map(([k, v]) => (
            <View key={k} style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T v="bodyBold">{SKILLS[k].emoji} {SKILLS[k].label}</T>
                <T v="bodyBold" color={v >= 70 ? t.success : v >= 40 ? palette.goldDark : t.error}>{v}%</T>
              </View>
              <ProgressBar value={v / 100} color={v >= 70 ? t.success : v >= 40 ? palette.gold : t.error} height={10} />
            </View>
          ))}
        </View>
        {weakest ? (
          <Card style={{ marginTop: 16 }} tone={t.goldSoft}>
            <T v="small" color={t.text}>💡 Seu ponto mais fraco é <T v="small" color={t.text} style={{ fontFamily: fonts.bodyHeavy }}>{SKILLS[weakest[0]].label.toLowerCase()}</T>. Treine na aba Praticar → As 4 habilidades.</T>
          </Card>
        ) : null}
        {canUnlock ? (
          <Button title={`Liberar até a unidade ${r.unit}`} style={{ marginTop: 18 }} onPress={() => { actions.completeOnboarding({}, r.unit); fx.complete(); toast(`Unidades liberadas até a ${r.unit}! 🎉`); router.back(); }} />
        ) : (
          <T v="small" center style={{ marginTop: 16 }}>Você já está na unidade {state.unlockedUnit} — continue assim!</T>
        )}
        <Button title="Voltar" variant="secondary" style={{ marginTop: 10 }} onPress={() => router.back()} />
      </Screen>
    );
  }

  if (!q) return null;
  return (
    <Screen title={`${SKILLS[q.skill].emoji} ${SKILLS[q.skill].label}`}>
      <ProgressBar value={i / test.length} color={t.sky} height={10} />
      <T v="caption" style={{ marginTop: 6 }}>{i + 1}/{test.length}</T>
      {q.speak ? (
        <View style={{ marginTop: 16 }}>
          <SpeakEx key={i} ex={q.speak} onComplete={(ok) => next(ok)} onSkip={() => next(false)} />
        </View>
      ) : (
        <View style={{ marginTop: 16, gap: 12 }}>
          <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {q.audio ? <><AudioButton key={'a' + i} text={q.audio} size={52} autoPlay /><AudioButton text={q.audio} size={40} slow /></> : null}
            <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 18, lineHeight: 25, color: t.text }}>{q.prompt}</Text>
          </View>
          {q.options.map((o) => (
            <OptionCard key={o} label={o} selected={sel === o} onPress={() => { setSel(o); fx.select(); }} />
          ))}
          <Button title="Confirmar" disabled={!sel} onPress={() => next(sel === q.answer)} />
          <Button title="Não sei" variant="secondary" small onPress={() => next(false)} />
        </View>
      )}
    </Screen>
  );
}
