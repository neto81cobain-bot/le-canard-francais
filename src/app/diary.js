// Writing diary: a prompt per level, free writing, AI correction (or model answer to compare).
import React, { useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Alert, toast } from '../services/dialog';
import { useOnline } from '../services/net';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Card, Button, Chip } from '../components/ui';
import Duck from '../components/Duck';
import { AccentBar, AudioButton } from '../components/extras';
import { UNITS } from '../content';
import { WRITING_PROMPTS } from '../content/skills';
import { aiAvailable, correctWriting } from '../services/ai';
import { dayKey } from '../store/dates';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function Diary() {
  const { state, actions } = useStore();
  const t = useTheme();
  const myLevel = UNITS[Math.min(UNITS.length, state.unlockedUnit) - 1]?.level || 'A1';
  const [level, setLevel] = useState(myLevel);
  const prompts = WRITING_PROMPTS[level] || WRITING_PROMPTS.A1;
  const startIdx = useMemo(() => new Date().getDate() % prompts.length, [level]);
  const [pi, setPi] = useState(startIdx);
  const prompt = prompts[pi % prompts.length];
  const [text, setText] = useState('');
  const [sel, setSel] = useState({ start: 0, end: 0 });
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [openEntry, setOpenEntry] = useState(null);
  const online = useOnline();
  const started = useRef(Date.now());
  const ai = aiAvailable();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const todayCount = (state.diary || []).filter((d) => dayKey(new Date(d.at)) === dayKey()).length;

  const insert = (c) => {
    const nv = text.slice(0, sel.start) + c + text.slice(sel.end);
    setText(nv);
    const p = sel.start + c.length;
    setSel({ start: p, end: p });
  };

  const save = (entry) => {
    const xp = todayCount < 3 ? 15 : 5;
    actions.finishSession({ correct: 1, total: 1, seconds: Math.round((Date.now() - started.current) / 1000), xp, perfect: false, kind: 'diary' });
    actions.set((s) => ({
      diary: [{ at: Date.now(), prompt: prompt.pt, level, ...entry }, ...(s.diary || [])].slice(0, 60),
      daily: { ...s.daily, written: (s.daily.written || 0) + Math.min(3, Math.max(1, (entry.text.match(/[.!?]/g) || []).length)) },
    }));
    return xp;
  };

  const queueForLater = () => {
    const at = Date.now();
    setShowModel(true);
    const xp = save({ text, corrected: null, score: null, pending: true, at });
    actions.set((st) => ({ outbox: [...(st.outbox || []), { id: at, kind: 'diary', at, text, prompt: prompt.pt, level }] }));
    setRes({ self: true, queued: true, xp });
  };

  const submit = async () => {
    if (words < 3) return Alert.alert('Escreva um pouco mais', 'Tente pelo menos uma ou duas frases completas. 🙂');
    if (ai && !online) return queueForLater();
    if (!ai) {
      setShowModel(true);
      const xp = save({ text, corrected: null, score: null });
      setRes({ self: true, xp });
      return;
    }
    setBusy(true);
    try {
      const r = await correctWriting(text, prompt.pt, level);
      const xp = save({ text, ...r });
      setRes({ ...r, xp });
    } catch (e) {
      if (e?.offline) return queueForLater();
      Alert.alert('Não deu para corrigir', e.message + '\n\nVou mostrar um exemplo para você comparar.');
      setShowModel(true);
      const xp = save({ text, corrected: null, score: null });
      setRes({ self: true, xp });
    } finally {
      setBusy(false);
    }
  };

  const reset = (next) => {
    setRes(null);
    setText('');
    setShowModel(false);
    started.current = Date.now();
    if (next) setPi((x) => x + 1);
  };

  return (
    <Screen title="Diário em francês">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Duck mood="teach" size={80} />
        <View style={{ flex: 1 }}>
          <T v="bodyBold">Escrever é onde o francês vira seu.</T>
          <T v="small">{ai ? 'Escreva livremente — o Canard corrige e explica cada erro.' : 'Escreva livremente e compare com o exemplo do Canard.'}</T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
        {LEVELS.map((l) => (
          <Pressable key={l} onPress={() => { setLevel(l); setPi(0); reset(false); }}>
            <Chip label={l} big bg={level === l ? t.primary : t.surface2} color={level === l ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </View>

      <Card style={{ marginTop: 14, gap: 6 }} tone={t.skySoft}>
        <T v="label">Tema de hoje</T>
        <T v="h3">{prompt.pt}</T>
        <Text style={{ fontFamily: fonts.displayItalic, fontSize: 16, color: t.text2 }}>{prompt.fr}</Text>
        {!res ? (
          <Pressable onPress={() => reset(true)} hitSlop={8} style={{ marginTop: 4 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: t.sky }}>🔀 Outro tema</Text>
          </Pressable>
        ) : null}
      </Card>

      {!res ? (
        <>
          <TextInput
            value={text}
            onChangeText={setText}
            onSelectionChange={(e) => setSel(e.nativeEvent.selection)}
            placeholder="Écris ici…"
            placeholderTextColor={t.text3}
            multiline
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize="sentences"
            style={{ marginTop: 14, minHeight: 170, textAlignVertical: 'top', fontFamily: fonts.bodyBold, fontSize: 18, lineHeight: 26, color: t.text, backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: radius.lg, padding: 16 }}
          />
          <AccentBar onInsert={insert} />
          <T v="caption" style={{ marginTop: 6 }}>{words} palavra{words === 1 ? '' : 's'} · meta: {level === 'A1' ? 15 : level === 'A2' ? 25 : 40}+</T>
          {ai && !online ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12, padding: 10, borderRadius: 12, backgroundColor: t.surface2 }}>
              <Text>📡</Text>
              <T v="small" style={{ flex: 1 }}>Sem internet: pode escrever normalmente! Eu guardo o texto e corrijo assim que a conexão voltar.</T>
            </View>
          ) : null}
          <Button title={busy ? 'Corrigindo…' : ai && !online ? 'Guardar e corrigir depois' : ai ? 'Corrigir meu texto' : 'Terminei — comparar'} icon="check" loading={busy} disabled={busy} style={{ marginTop: 14 }} onPress={submit} />
          <Pressable onPress={() => setShowModel((x) => !x)} style={{ alignSelf: 'center', marginTop: 12 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color: t.text3 }}>{showModel ? 'Esconder exemplo' : 'Travou? Ver um exemplo'}</Text>
          </Pressable>
          {showModel ? <ModelCard prompt={prompt} /> : null}
        </>
      ) : (
        <View style={{ marginTop: 14, gap: 12 }}>
          <Card style={{ gap: 6 }}>
            <T v="label">Seu texto</T>
            <T v="body">{text}</T>
          </Card>
          {res.queued ? (
            <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }} tone={t.skySoft}>
              <Duck mood="offline" size={64} />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="bodyBold">Texto guardado! ⏳</T>
                <T v="small" color={t.text}>Assim que a internet voltar, o Canard corrige e te avisa. A correção aparece em “Seus textos”, aqui embaixo.</T>
              </View>
            </Card>
          ) : null}
          {res.self ? (
            <>
              <ModelCard prompt={prompt} />
              <Card style={{ gap: 6 }}>
                <T v="bodyBold">Compare com calma:</T>
                <T v="small">• Os verbos estão conjugados com o sujeito certo?{'\n'}• Usou os artigos (le, la, un, une, du…)?{'\n'}• Os adjetivos concordam (grand / grande)?{res.queued ? '' : '\nPara correção automática, configure o servidor de IA em Configurações → Avançado.'}</T>
              </Card>
            </>
          ) : (
            <>
              <Card style={{ alignItems: 'center', gap: 4 }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 44, color: res.score >= 80 ? t.success : res.score >= 50 ? palette.goldDark : t.error }}>{res.score}</Text>
                <T v="caption">nota para o nível {level}</T>
                {res.praise ? <T v="body" center style={{ marginTop: 4 }}>{res.praise}</T> : null}
              </Card>
              <Card style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <T v="label" style={{ flex: 1 }}>Versão corrigida</T>
                  <AudioButton text={res.corrected} size={36} />
                </View>
                <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, lineHeight: 26, color: t.text }}>{res.corrected}</Text>
              </Card>
              {res.errors.length ? (
                <Card style={{ gap: 10 }}>
                  <T v="label">O que corrigir ({res.errors.length})</T>
                  {res.errors.map((e, i) => (
                    <View key={i} style={{ gap: 2 }}>
                      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15 }}>
                        <Text style={{ color: t.error, textDecorationLine: 'line-through' }}>{e.wrong}</Text>
                        <Text style={{ color: t.text3 }}>  →  </Text>
                        <Text style={{ color: t.success }}>{e.right}</Text>
                      </Text>
                      {e.why ? <T v="small">{e.why}</T> : null}
                    </View>
                  ))}
                </Card>
              ) : null}
              {res.tip ? <Card tone={palette.goldSoft}><T v="bodyBold" color={palette.goldDark}>💡 {res.tip}</T></Card> : null}
            </>
          )}
          <T v="small" center>+{res.xp} XP</T>
          <Button title="Escrever outro texto" icon="edit" onPress={() => reset(true)} />
        </View>
      )}

      {(state.diary || []).length ? (
        <View style={{ marginTop: 26, gap: 10 }}>
          <T v="label">Seus textos ({state.diary.length})</T>
          {state.diary.slice(0, 8).map((d) => {
            const isOpen = openEntry === d.at;
            return (
              <Pressable key={d.at} onPress={() => setOpenEntry(isOpen ? null : d.at)}>
                <Card style={{ gap: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <T v="caption" style={{ flex: 1 }}>{new Date(d.at).toLocaleDateString('pt-BR')} · {d.level}</T>
                    {d.pending ? <Chip label="⏳ correção pendente" color={t.text2} bg={t.surface2} /> : null}
                    {d.score != null ? <Chip label={`${d.score}`} color={d.score >= 80 ? t.success : palette.goldDark} /> : null}
                  </View>
                  <T v="small" color={t.text2}>{d.prompt}</T>
                  <T v="body" numberOfLines={isOpen ? undefined : 3}>{d.corrected || d.text}</T>
                  {isOpen && d.corrected ? (
                    <View style={{ gap: 6, marginTop: 6 }}>
                      <T v="label">Você escreveu</T>
                      <T v="small" color={t.text2}>{d.text}</T>
                      {(d.errors || []).map((e, i) => (
                        <View key={i} style={{ padding: 8, borderRadius: 10, backgroundColor: t.bg, gap: 2 }}>
                          <T v="small"><Text style={{ color: t.error, textDecorationLine: 'line-through' }}>{e.wrong}</Text>  →  <Text style={{ color: t.success, fontFamily: fonts.bodyHeavy }}>{e.right}</Text></T>
                          {e.why ? <T v="caption">{e.why}</T> : null}
                        </View>
                      ))}
                      {d.tip ? <T v="small" color={palette.goldDark}>💡 {d.tip}</T> : null}
                    </View>
                  ) : null}
                </Card>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </Screen>
  );
}

function ModelCard({ prompt }) {
  const t = useTheme();
  return (
    <Card style={{ marginTop: 12, gap: 6 }} tone={t.successSoft}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <T v="label" style={{ flex: 1 }}>Exemplo do Canard</T>
        <AudioButton text={prompt.model} size={34} />
      </View>
      <Text style={{ fontFamily: fonts.displayItalic, fontSize: 17, lineHeight: 25, color: t.text }}>{prompt.model}</Text>
    </Card>
  );
}
