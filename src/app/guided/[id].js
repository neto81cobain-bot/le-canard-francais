// Conversa guiada: o Canard fala, você escreve a resposta em francês (dica em português).
// Correção offline contra as respostas-modelo; ao fim, XP e melhor nota.
import { useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius } from '../../theme';
import { T, Button, Header } from '../../components/ui';
import Duck from '../../components/Duck';
import Icon from '../../components/Icon';
import { AudioButton, AccentBar, SpeakableText } from '../../components/extras';
import { KeyboardAwareView } from '../../components/keyboard';
import { GUIDED } from '../../content/guided';
import { checkSentence, compareWords } from '../../engine/exercises';
import { speak } from '../../services/speech';
import { fx } from '../../services/feedback';

function grade(input, models) {
  for (const m of models) {
    const r = checkSentence(input, m);
    if (r.ok) return { ok: true, model: m, note: r.note };
  }
  let best = models[0];
  let bestScore = -1;
  let words = [];
  models.forEach((m) => {
    const c = compareWords(m, input);
    if (c.score > bestScore) { bestScore = c.score; best = m; words = c.words; }
  });
  return { ok: false, model: best, words, score: bestScore };
}

export default function GuidedConversation() {
  const { id } = useLocalSearchParams();
  const g = useMemo(() => GUIDED.find((x) => x.id === id), [id]);
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const scroll = useRef(null);
  const started = useRef(Date.now());
  const inputRef = useRef(null);
  const [turn, setTurn] = useState(0);
  const [msgs, setMsgs] = useState(() => (g ? [{ from: 'bot', fr: g.turns[0].fr, pt: g.turns[0].pt }] : []));
  const [text, setText] = useState('');
  const [res, setRes] = useState(null);
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);
  const [showPt, setShowPt] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => { if (g && state.settings.autoAudio !== false) speak(g.turns[0].fr); }, []);
  if (!g) return null;
  const cur = g.turns[turn];

  const check = () => {
    if (!text.trim()) return;
    const r = grade(text, cur.models);
    setRes(r);
    setTries(tries + 1);
    r.ok ? fx.correct() : fx.wrong();
  };

  const reveal = () => {
    setRes({ ok: false, model: cur.models[0], revealed: true });
    setTries(tries + 1);
  };

  const next = () => {
    const ok = res?.ok && tries === 1;
    const user = { from: 'me', fr: res?.ok ? text.trim() : res?.model, ok: !!res?.ok, model: res?.ok && res.model.toLowerCase() !== text.trim().toLowerCase() ? res.model : null };
    const nScore = score + (ok ? 1 : res?.ok ? 0.5 : 0);
    setScore(nScore);
    const m = [...msgs, user];
    setText('');
    setRes(null);
    setTries(0);
    if (turn + 1 < g.turns.length) {
      const nt = g.turns[turn + 1];
      m.push({ from: 'bot', fr: nt.fr, pt: nt.pt });
      setMsgs(m);
      setTurn(turn + 1);
      speak(nt.fr);
    } else {
      setMsgs(m);
      setDone(true);
      const final = Math.round(nScore);
      fx.complete();
      actions.set((s) => ({ guided: { ...(s.guided || {}), [g.id]: Math.max(final, (s.guided || {})[g.id] || 0) } }));
      actions.finishSession({ correct: final, total: g.turns.length, seconds: Math.round((Date.now() - started.current) / 1000), xp: 10 + final * 3, perfect: final === g.turns.length, kind: 'guided' });
    }
  };

  const retry = () => { setRes(null); setTimeout(() => inputRef.current?.focus(), 50); };

  return (
    <KeyboardAwareView style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header title={`${g.emoji} ${g.title}`} />
      <View style={{ marginHorizontal: 20, marginBottom: 6, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: t.surface2, overflow: 'hidden' }}>
          <View style={{ width: `${((turn + (done ? 1 : 0)) / g.turns.length) * 100}%`, height: 8, backgroundColor: t.primary }} />
        </View>
        <T v="caption">{Math.min(turn + 1, g.turns.length)}/{g.turns.length}</T>
      </View>
      <ScrollView ref={scroll} contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 30 }} onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })} keyboardShouldPersistTaps="handled">
        <View style={{ backgroundColor: t.surface2, borderRadius: radius.md, padding: 10 }}>
          <T v="small">🎬 {g.setting}</T>
        </View>
        {msgs.map((m, i) =>
          m.from === 'bot' ? (
            <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
              <Duck head size={38} noBadge />
              <View style={{ maxWidth: '82%', backgroundColor: t.surface, borderRadius: 18, borderBottomLeftRadius: 4, padding: 12, borderWidth: 1, borderColor: t.border, gap: 6 }}>
                <SpeakableText text={m.fr} style={{ fontSize: 17, lineHeight: 24 }} />
                {showPt[i] ? <Text style={{ fontFamily: fonts.bodySemi, color: t.text2, fontSize: 14 }}>{m.pt}</Text> : null}
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <Pressable onPress={() => speak(m.fr)} hitSlop={8}><Icon name="volume" size={18} color={t.sky} /></Pressable>
                  <Pressable onPress={() => speak(m.fr, { slow: true })} hitSlop={8}><Icon name="turtle" size={18} color={t.text3} /></Pressable>
                  <Pressable onPress={() => setShowPt({ ...showPt, [i]: !showPt[i] })} hitSlop={8}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.text3 }}>{showPt[i] ? 'OCULTAR' : 'TRADUZIR'}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            <View key={i} style={{ alignSelf: 'flex-end', maxWidth: '82%', gap: 4 }}>
              <View style={{ backgroundColor: m.ok ? t.primary : t.surface2, borderRadius: 18, borderBottomRightRadius: 4, padding: 12 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: m.ok ? '#fff' : t.text }}>{m.fr}</Text>
              </View>
              {m.model ? <T v="caption" style={{ textAlign: 'right' }}>Outra forma: {m.model}</T> : null}
            </View>
          )
        )}
        {done ? (
          <View style={{ alignItems: 'center', gap: 8, marginTop: 10 }}>
            <Duck mood="celebrate" size={90} />
            <T v="h2" center>Conversa concluída!</T>
            <T v="body" center>{Math.round(score)}/{g.turns.length} respostas certas de primeira</T>
          </View>
        ) : null}
      </ScrollView>

      <View style={{ padding: 16, paddingBottom: 16 + insets.bottom, borderTopWidth: 1, borderTopColor: t.border, backgroundColor: t.bg, gap: 10 }}>
        {done ? (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button title="Outra conversa" variant="secondary" style={{ flex: 1 }} onPress={() => router.back()} />
            <Button title="Repetir" style={{ flex: 1 }} onPress={() => router.replace({ pathname: '/guided/[id]', params: { id: g.id } })} />
          </View>
        ) : res ? (
          <View style={{ gap: 8 }}>
            <View style={{ backgroundColor: res.ok ? t.successSoft : t.errorSoft, borderRadius: 14, padding: 12, gap: 6 }}>
              <T v="bodyBold" color={res.ok ? t.success : t.error}>{res.ok ? (res.note ? 'Quase perfeito!' : 'Perfeito! 🎉') : res.revealed ? 'Uma resposta possível:' : 'Ainda não…'}</T>
              {!res.ok && !res.revealed && res.words?.length ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                  {res.words.map((w, i) => (
                    <Text key={i} style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, overflow: 'hidden', color: w.status === 'good' ? t.success : w.status === 'close' ? t.text : t.error, backgroundColor: t.surface }}>{w.display}</Text>
                  ))}
                </View>
              ) : null}
              {(!res.ok || res.note) ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <AudioButton text={res.model} size={32} />
                  <Text style={{ flex: 1, fontFamily: fonts.displayItalic, fontSize: 16, color: t.text }}>{res.model}</Text>
                </View>
              ) : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {!res.ok && !res.revealed ? <Button title="Tentar de novo" variant="secondary" style={{ flex: 1 }} onPress={retry} /> : null}
              <Button title="Continuar" variant={res.ok ? 'success' : 'primary'} style={{ flex: 1 }} onPress={next} />
            </View>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', backgroundColor: t.goldSoft, borderRadius: 12, padding: 10 }}>
              <Text>💬</Text>
              <T v="small" color={t.text} style={{ flex: 1 }}>{cur.hint}</T>
            </View>
            <TextInput
              ref={inputRef}
              value={text}
              onChangeText={setText}
              placeholder="Responda em francês…"
              placeholderTextColor={t.text3}
              autoCapitalize="sentences"
              autoCorrect={false}
              onSubmitEditing={check}
              returnKeyType="send"
              style={{ backgroundColor: t.surface, borderRadius: 14, padding: 12, fontFamily: fonts.bodySemi, fontSize: 16, color: t.text, borderWidth: 1.5, borderColor: t.border }}
            />
            <AccentBar onInsert={(c) => setText(text + c)} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button title="Não sei" variant="secondary" small style={{ flex: 1 }} onPress={reveal} />
              <Button title="Verificar" small style={{ flex: 2 }} disabled={!text.trim()} onPress={check} />
            </View>
          </>
        )}
      </View>
    </KeyboardAwareView>
  );
}
