// Teste de nível 3.0 — no estilo do TCF: tudo em francês, por blocos de nível.
// Começa no A1; cada bloco tem 9 questões (3 estruturas, 3 leitura, 3 escuta).
// Só passa de nível com 7/9 ou mais. Errou mais que isso, o teste para ali.
// Escuta como no DELF: no máximo 2 audições e o texto nunca aparece.
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Button, ProgressBar, Card, Tap } from '../components/ui';
import Duck from '../components/Duck';
import { PLACEMENT_BANK, PLACEMENT_LEVELS } from '../content/placement2';
import { UNITS } from '../content';
import { shuffle } from '../engine/exercises';
import { fx } from '../services/feedback';
import { speak, stopSpeaking } from '../services/speech';
import { PlacementShareSheet } from '../components/ShareCard';
import Icon from '../components/Icon';
import { toast } from '../services/dialog';

const PER_LEVEL = { structure: 3, reading: 3, listening: 3 };
const BLOCK = 9;
const PASS = 7; // de 9
const MAX_PLAYS = 2;
const SKILLS = {
  structure: { label: 'Estruturas', long: 'Estruturas da língua', emoji: '📐', key: 'grammar' },
  reading: { label: 'Leitura', long: 'Compreensão escrita', emoji: '📖', key: 'vocab' },
  listening: { label: 'Escuta', long: 'Compreensão oral', emoji: '👂', key: 'listening' },
};
const LEVEL_NAME = { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Intermediário avançado', C1: 'Avançado' };

function blockFor(level) {
  const out = [];
  Object.entries(PER_LEVEL).forEach(([skill, n]) => {
    shuffle(PLACEMENT_BANK.filter((q) => q.level === level && q.skill === skill)).slice(0, n).forEach((q) => out.push({ ...q, options: shuffle([q.a, ...q.o]) }));
  });
  return out; // estruturas → leitura → escuta, como no TCF
}

const firstUnitOf = (level) => Math.max(1, UNITS.findIndex((u) => u.level === level) + 1);

export default function Placement() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [phase, setPhase] = useState('intro');
  const [lv, setLv] = useState(0);
  const [block, setBlock] = useState([]);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [levelScores, setLevelScores] = useState({});
  const [share, setShare] = useState(false);
  const [plays, setPlays] = useState(0);
  const q = block[i];

  const start = () => {
    setLv(0);
    setBlock(blockFor(PLACEMENT_LEVELS[0]));
    setI(0);
    setAnswers([]);
    setLevelScores({});
    setPhase('test');
  };

  const finish = (all, scores) => {
    const passed = PLACEMENT_LEVELS.filter((l) => (scores[l] ?? 0) >= PASS);
    // nível = último bloco passado em sequência
    let reached = null;
    for (const l of PLACEMENT_LEVELS) {
      if ((scores[l] ?? -1) >= PASS) reached = l;
      else break;
    }
    const nextIdx = reached ? PLACEMENT_LEVELS.indexOf(reached) + 1 : 0;
    const working = PLACEMENT_LEVELS[Math.min(nextIdx, PLACEMENT_LEVELS.length - 1)];
    const unit = firstUnitOf(working);
    const skills = {};
    Object.entries(SKILLS).forEach(([k, s]) => {
      const list = all.filter((a) => a.skill === k);
      if (list.length) skills[s.key] = Math.round((list.filter((a) => a.ok).length / list.length) * 100);
    });
    actions.set({ placement: { at: Date.now(), v: 3, level: reached, working, unit, levels: scores, skills, passedAll: passed.length === PLACEMENT_LEVELS.length } });
    setPhase('result');
  };

  const next = (ok) => {
    const a = [...answers, { level: q.level, skill: q.skill, ok }];
    setAnswers(a);
    setSel(null);
    setPlays(0);
    stopSpeaking();
    if (i + 1 < block.length) return setI(i + 1);
    // fim do bloco
    const level = PLACEMENT_LEVELS[lv];
    const score = a.filter((x) => x.level === level && x.ok).length;
    const scores = { ...levelScores, [level]: score };
    setLevelScores(scores);
    if (score >= PASS && lv + 1 < PLACEMENT_LEVELS.length) {
      fx.complete();
      toast(`${level} concluído (${score}/${BLOCK})! Indo para o ${PLACEMENT_LEVELS[lv + 1]}…`);
      setLv(lv + 1);
      setBlock(blockFor(PLACEMENT_LEVELS[lv + 1]));
      setI(0);
    } else finish(a, scores);
  };

  if (phase === 'intro') {
    const last = state.placement;
    return (
      <Screen title="Teste de nível">
        <View style={{ alignItems: 'center', gap: 10, marginTop: 10 }}>
          <Duck mood="think" size={120} />
          <T v="h2" center>Descubra seu nível real</T>
          <T v="body" center color={t.text2}>No estilo do TCF: tudo em francês, do A1 ao C1. Cada nível tem 9 questões, e você só sobe se acertar pelo menos 7. Na escuta, o texto não aparece e você pode ouvir no máximo 2 vezes — como no DELF.</T>
        </View>
        <View style={{ gap: 8, marginTop: 18 }}>
          {Object.values(SKILLS).map((s) => (
            <View key={s.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
              <T v="bodyBold">{s.long}</T>
            </View>
          ))}
        </View>
        <Card style={{ marginTop: 14 }} tone={t.goldSoft}>
          <T v="small" color={t.text}>💡 Não sabe? Toque em <T v="small" color={t.text} style={{ fontFamily: fonts.bodyHeavy }}>Não sei</T> em vez de chutar — assim o resultado fica fiel ao seu nível.</T>
        </Card>
        {last ? (
          <Card style={{ marginTop: 12 }}>
            <T v="label">Último resultado · {new Date(last.at).toLocaleDateString('pt-BR')}</T>
            <T v="bodyBold" style={{ marginTop: 4 }}>{last.v === 3 ? (last.level ? `Nível ${last.level}` : 'Iniciante') : `Unidade sugerida: ${last.unit}`}</T>
          </Card>
        ) : null}
        <Button title="Começar o teste" style={{ marginTop: 18 }} onPress={start} />
      </Screen>
    );
  }

  if (phase === 'result') {
    const r = state.placement || {};
    const reached = r.level;
    const canUnlock = r.unit > state.unlockedUnit;
    const weakest = Object.entries(SKILLS).map(([k, s]) => [s, r.skills?.[s.key]]).filter(([, v]) => v != null).sort((a, b) => a[1] - b[1])[0];
    return (
      <Screen title="Seu resultado">
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Duck mood={reached ? 'celebrate' : 'happy'} size={104} />
          <Text style={{ fontFamily: fonts.display, fontSize: 46, color: t.primary }}>{reached || 'A1'}</Text>
          <T v="bodyBold" center>{reached ? `${LEVEL_NAME[reached]} — você domina o ${reached}` : 'Iniciante — vamos construir a base juntos'}</T>
          {!r.passedAll ? <T v="small" center>Agora você está trabalhando o nível <T v="small" style={{ fontFamily: fonts.bodyHeavy }}>{r.working}</T>.</T> : <T v="small" center>Você passou em todos os blocos. Impressionante!</T>}
        </View>

        <T v="label" style={{ marginTop: 20, marginBottom: 8 }}>Blocos por nível</T>
        <View style={{ gap: 8 }}>
          {PLACEMENT_LEVELS.map((l) => {
            const sc = r.levels?.[l];
            const ok = sc != null && sc >= PASS;
            return (
              <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ width: 30, fontFamily: fonts.bodyHeavy, color: t.text }}>{l}</Text>
                <View style={{ flex: 1 }}>
                  <ProgressBar value={sc != null ? sc / BLOCK : 0} color={ok ? t.success : sc != null ? palette.gold : t.surface2} height={10} />
                </View>
                <Text style={{ width: 70, textAlign: 'right', fontFamily: fonts.bodyBold, fontSize: 13, color: sc == null ? t.text3 : ok ? t.success : t.text2 }}>{sc == null ? 'não feito' : `${sc}/${BLOCK} ${ok ? '✓' : ''}`}</Text>
              </View>
            );
          })}
        </View>

        <T v="label" style={{ marginTop: 20, marginBottom: 8 }}>Por habilidade</T>
        <View style={{ gap: 10 }}>
          {Object.values(SKILLS).map((s) => {
            const v = r.skills?.[s.key];
            if (v == null) return null;
            return (
              <View key={s.key} style={{ gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <T v="bodyBold">{s.emoji} {s.label}</T>
                  <T v="bodyBold" color={v >= 70 ? t.success : v >= 40 ? palette.gold : t.error}>{v}%</T>
                </View>
                <ProgressBar value={v / 100} color={v >= 70 ? t.success : v >= 40 ? palette.gold : t.error} height={8} />
              </View>
            );
          })}
        </View>

        {weakest ? (
          <Card style={{ marginTop: 16 }} tone={t.goldSoft}>
            <T v="small" color={t.text}>💡 Seu ponto mais fraco: <T v="small" color={t.text} style={{ fontFamily: fonts.bodyHeavy }}>{weakest[0].long.toLowerCase()}</T>. O plano da semana vai dar mais peso a isso.</T>
          </Card>
        ) : null}
        {canUnlock ? (
          <Button title={`Começar na unidade ${r.unit} (${r.working})`} style={{ marginTop: 18 }} onPress={() => { actions.completeOnboarding({}, r.unit); fx.complete(); toast(`Unidades liberadas até a ${r.unit}! 🎉`); router.back(); }} />
        ) : (
          <T v="small" center style={{ marginTop: 16 }}>Você já está na unidade {state.unlockedUnit} — continue de onde parou!</T>
        )}
        <Button title="Compartilhar resultado" icon="send" variant="secondary" style={{ marginTop: 10 }} onPress={() => setShare(true)} />
        <Button title="Refazer o teste" variant="ghost" style={{ marginTop: 4 }} onPress={start} />
        <PlacementShareSheet visible={share} onClose={() => setShare(false)} />
      </Screen>
    );
  }

  if (!q) return null;
  const level = PLACEMENT_LEVELS[lv];
  const sk = SKILLS[q.skill];
  const letters = ['A', 'B', 'C', 'D'];
  const play = () => {
    if (plays >= MAX_PLAYS) return;
    setPlays(plays + 1);
    speak(q.text);
  };
  return (
    <Screen title={`Nível ${level}`}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ flex: 1 }}><ProgressBar value={(lv * BLOCK + i) / (PLACEMENT_LEVELS.length * BLOCK)} color={t.sky} height={10} /></View>
        <T v="caption">{level} · {i + 1}/{BLOCK}</T>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 }}>
        <Text style={{ fontSize: 15 }}>{sk.emoji}</Text>
        <T v="label">{sk.long}</T>
      </View>

      {/* documento */}
      {q.skill === 'reading' && q.text ? (
        <View style={{ marginTop: 10, backgroundColor: t.surface2, borderRadius: 16, padding: 14, borderLeftWidth: 4, borderLeftColor: t.primary }}>
          <Text style={{ fontFamily: fonts.bodySemi, fontSize: 15.5, lineHeight: 23, color: t.text }}>{q.text}</Text>
        </View>
      ) : null}
      {q.skill === 'listening' ? (
        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: t.surface2, borderRadius: 16, padding: 14 }}>
          <Tap onPress={play} disabled={plays >= MAX_PLAYS} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: plays >= MAX_PLAYS ? t.border : t.sky, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="volume" size={28} color="#fff" />
          </Tap>
          <View style={{ flex: 1 }}>
            <T v="bodyBold">{plays === 0 ? 'Toque para ouvir' : plays < MAX_PLAYS ? 'Pode ouvir mais 1 vez' : 'Audições esgotadas'}</T>
            <T v="caption">Máximo de {MAX_PLAYS} audições · o texto não aparece</T>
          </View>
        </View>
      ) : null}

      {/* pergunta: sem caixa, tipografia de título — não se confunde com as alternativas */}
      {q.skill === 'structure' ? (
        <View style={{ marginTop: 16, marginBottom: 4 }}>
          <T v="caption" style={{ marginBottom: 6 }}>Complete a frase:</T>
          <Text style={{ fontFamily: fonts.displayItalic, fontSize: 23, lineHeight: 32, color: t.text }}>{q.q}</Text>
        </View>
      ) : (
        <View style={{ marginTop: 16, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 22, color: t.primary }}>?</Text>
          <Text style={{ flex: 1, fontFamily: fonts.display, fontSize: 19, lineHeight: 26, color: t.text }}>{q.q}</Text>
        </View>
      )}

      <View style={{ marginTop: 10, gap: 10 }}>
        {q.options.map((o, k) => {
          const on = sel === o;
          return (
            <Tap key={o} onPress={() => { setSel(o); fx.select(); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: on ? t.sky : t.border, backgroundColor: on ? t.skySoft : t.surface }}>
              <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: on ? t.sky : t.surface2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: on ? '#fff' : t.text2 }}>{letters[k]}</Text>
              </View>
              <Text style={{ flex: 1, fontFamily: fonts.bodySemi, fontSize: 15.5, lineHeight: 21, color: on && t.mode !== 'dark' ? palette.navy : t.text }}>{o}</Text>
            </Tap>
          );
        })}
        <Button title="Confirmar" disabled={!sel} onPress={() => next(sel === q.a)} />
        <Button title="Não sei" variant="secondary" small onPress={() => next(false)} />
      </View>
    </Screen>
  );
}
