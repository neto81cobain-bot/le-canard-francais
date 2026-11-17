import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Animated, Easing } from 'react-native';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Tap, Button } from './ui';
import Icon from './Icon';
import Duck from './Duck';
import { AudioButton, AudioPair, SpeakableText, AccentBar, useShake } from './extras';
import { speak } from '../services/speech';
import { fx } from '../services/feedback';
import { useRecorder } from '../services/recorder';
import { aiAvailable, evaluatePronunciation } from '../services/ai';
import { shuffle } from '../engine/exercises';

// Shared option card
export function OptionCard({ label, sub, emoji, selected, status, onPress, disabled, big, style }) {
  const t = useTheme();
  const border = status === 'ok' ? t.success : status === 'bad' ? t.error : selected ? t.sky : t.border;
  const bg = status === 'ok' ? t.successSoft : status === 'bad' ? t.errorSoft : selected ? t.skySoft : t.surface;
  return (
    <Tap onPress={onPress} disabled={disabled} style={[{ borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: border, backgroundColor: bg, paddingVertical: big ? 18 : 15, paddingHorizontal: 16, alignItems: emoji ? 'center' : 'flex-start', justifyContent: 'center', gap: 6 }, style]}>
      {emoji ? <Text style={{ fontSize: 44 }}>{emoji}</Text> : null}
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 17, color: selected && !status ? (t.mode === 'dark' ? '#fff' : palette.navy) : t.text, textAlign: emoji ? 'center' : 'left' }}>{label}</Text>
      {sub ? <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: t.text2 }}>{sub}</Text> : null}
    </Tap>
  );
}

function Prompt({ title, children, mood = 'happy' }) {
  return (
    <View style={{ marginBottom: 20 }}>
      {title ? <T v="h3" style={{ marginBottom: 14 }}>{title}</T> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Duck size={78} mood={mood} noBadge={mood === 'happy'} />
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </View>
  );
}

// ─── IMAGE ────────────────────────────────────────────────
export function ImageEx({ ex, value, onChange, locked, autoAudio }) {
  const t = useTheme();
  return (
    <View>
      <Prompt title="Selecione a imagem certa" mood="teach">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 12 }}>
          <AudioButton text={ex.prompt} size={44} autoPlay={autoAudio} />
          <T v="fr" style={{ flex: 1 }}>{ex.prompt}</T>
        </View>
      </Prompt>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {ex.options.map((o) => (
          <OptionCard key={o.fr} emoji={o.emoji} label={o.pt} selected={value === o.fr} disabled={locked} onPress={() => { onChange(o.fr); fx.select(); }} style={{ width: '47%', flexGrow: 1, minHeight: 130 }} />
        ))}
      </View>
    </View>
  );
}

// ─── MULTIPLE CHOICE ──────────────────────────────────────
export function McqEx({ ex, value, onChange, locked }) {
  const t = useTheme();
  const isFr = ex.prompt.includes('___');
  const short = ex.options.every((o) => o.length <= 14);
  return (
    <View>
      <Prompt title={ex.title || 'Escolha a resposta certa'} mood="think">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {isFr ? <AudioButton text={ex.prompt.replace(/\(.*?\)/g, '')} size={40} /> : null}
          <Text style={{ flex: 1, fontFamily: isFr ? fonts.displayItalic : fonts.bodyBold, fontSize: isFr ? 21 : 18, lineHeight: isFr ? 29 : 25, color: t.text }}>{ex.prompt}</Text>
        </View>
      </Prompt>
      <View style={short ? { flexDirection: 'row', flexWrap: 'wrap', gap: 12 } : { gap: 12 }}>
        {ex.options.map((o) => (
          <OptionCard
            key={o}
            label={o}
            selected={value === o}
            disabled={locked}
            onPress={() => {
              onChange(o);
              fx.select();
              if (ex.audioOptions) speak(o);
            }}
            style={short ? { width: '47%', flexGrow: 1, alignItems: 'center' } : null}
          />
        ))}
      </View>
    </View>
  );
}

// ─── TRANSLATE (FR → PT) ──────────────────────────────────
export function TranslateEx({ ex, value, onChange, locked, autoAudio }) {
  const t = useTheme();
  return (
    <View>
      <Prompt title="O que significa?" mood="listen">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <AudioButton text={ex.prompt} size={40} autoPlay={autoAudio} />
            <View style={{ flex: 1 }}><SpeakableText text={ex.prompt} /></View>
          </View>
          <T v="caption">Toque numa palavra para ouvi-la</T>
        </View>
      </Prompt>
      <View style={{ gap: 12 }}>
        {ex.options.map((o) => (
          <OptionCard key={o} label={o} selected={value === o} disabled={locked} onPress={() => { onChange(o); fx.select(); }} />
        ))}
      </View>
    </View>
  );
}

// ─── BUILD THE SENTENCE (word tiles) ──────────────────────
export function BuildEx({ ex, value: rawValue, onChange, locked, autoAudio }) {
  const value = Array.isArray(rawValue) ? rawValue : [];
  const t = useTheme();
  const chosenIds = value.map((v) => v.id);
  const add = (tile) => {
    if (locked) return;
    fx.select();
    speak(tile.w);
    onChange([...value, tile]);
  };
  const remove = (tile) => {
    if (locked) return;
    fx.tap();
    onChange(value.filter((v) => v.id !== tile.id));
  };
  const Tile = ({ tile, onPress, ghost }) => (
    <Pressable onPress={onPress} disabled={ghost} style={{ paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 2, borderBottomWidth: ghost ? 2 : 4, borderColor: t.border, backgroundColor: ghost ? t.surface2 : t.surface }}>
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 17, color: ghost ? 'transparent' : t.text }}>{tile.w}</Text>
    </Pressable>
  );
  return (
    <View>
      {ex.listen ? (
        <Prompt title="Monte o que você ouviu" mood="listen">
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-end' }}>
            <AudioPair text={ex.item.fr} size={64} autoPlay={autoAudio} />
          </View>
        </Prompt>
      ) : (
        <Prompt title="Traduza para o francês" mood="teach">
          <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14 }}>
            <T v="bodyBold" style={{ fontSize: 18 }}>{ex.prompt}</T>
          </View>
        </Prompt>
      )}
      <View style={{ minHeight: 120, borderTopWidth: 2, borderBottomWidth: 2, borderColor: t.border, paddingVertical: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
        {value.map((tile) => <Tile key={tile.id} tile={tile} onPress={() => remove(tile)} />)}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 24 }}>
        {ex.tokens.map((tile) => <Tile key={tile.id} tile={tile} ghost={chosenIds.includes(tile.id)} onPress={() => add(tile)} />)}
      </View>
    </View>
  );
}

// ─── TYPE WHAT YOU HEAR / FILL THE GAP ────────────────────
function TypeBox({ value, onChange, locked, placeholder }) {
  const t = useTheme();
  const ref = useRef(null);
  const [sel, setSel] = useState({ start: (value || '').length, end: (value || '').length });
  const insert = (c) => {
    const v = value || '';
    const nv = v.slice(0, sel.start) + c + v.slice(sel.end);
    onChange(nv);
    const p = sel.start + c.length;
    setSel({ start: p, end: p });
  };
  return (
    <View>
      <TextInput
        ref={ref}
        value={value || ''}
        onChangeText={onChange}
        onSelectionChange={(e) => setSel(e.nativeEvent.selection)}
        editable={!locked}
        placeholder={placeholder}
        placeholderTextColor={t.text3}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        multiline
        style={{ minHeight: 110, textAlignVertical: 'top', fontFamily: fonts.bodyBold, fontSize: 19, color: t.text, backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: radius.lg, padding: 16 }}
      />
      {!locked ? <AccentBar onInsert={insert} /> : null}
    </View>
  );
}

export function ListenEx({ ex, value, onChange, locked, autoAudio }) {
  return (
    <View>
      <Prompt title="Escreva o que você ouviu" mood="listen">
        <AudioPair text={ex.answer} size={64} autoPlay={autoAudio} />
      </Prompt>
      <TypeBox value={value} onChange={onChange} locked={locked} placeholder="Digite em francês…" />
    </View>
  );
}

export function FillEx({ ex, value, onChange, locked }) {
  const t = useTheme();
  const [before, after] = ex.prompt.split('___');
  return (
    <View>
      <Prompt title="Complete a frase" mood="think">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, gap: 6 }}>
          <Text style={{ fontFamily: fonts.displayItalic, fontSize: 21, lineHeight: 30, color: t.text }}>
            {before}
            <Text style={{ color: t.sky, textDecorationLine: 'underline' }}>{value ? ' ' + value + ' ' : ' ______ '}</Text>
            {after}
          </Text>
          {ex.pt ? <T v="small">{ex.pt}</T> : null}
        </View>
      </Prompt>
      <TypeBox value={value} onChange={onChange} locked={locked} placeholder="Digite a palavra que falta…" />
    </View>
  );
}

// ─── MATCH PAIRS ──────────────────────────────────────────
export function MatchEx({ ex, onComplete }) {
  const t = useTheme();
  const left = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ id: i, text: p.fr }))), [ex]);
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ id: i, text: p.pt }))), [ex]);
  const [selL, setSelL] = useState(null);
  const [selR, setSelR] = useState(null);
  const [done, setDone] = useState([]);
  const [wrong, setWrong] = useState(null);
  const mistakes = useRef(0);

  useEffect(() => {
    if (selL === null || selR === null) return;
    if (selL === selR) {
      fx.select();
      const nd = [...done, selL];
      setDone(nd);
      setSelL(null);
      setSelR(null);
      if (nd.length === ex.pairs.length) setTimeout(() => onComplete(mistakes.current === 0, { mistakes: mistakes.current }), 300);
    } else {
      mistakes.current += 1;
      fx.wrong();
      setWrong([selL, selR]);
      setTimeout(() => { setWrong(null); setSelL(null); setSelR(null); }, 500);
    }
  }, [selL, selR]);

  const cell = (item, side) => {
    const isDone = done.includes(item.id);
    const sel = side === 'L' ? selL === item.id : selR === item.id;
    const isWrong = wrong && (side === 'L' ? wrong[0] === item.id : wrong[1] === item.id);
    return (
      <Tap
        key={side + item.id}
        disabled={isDone}
        onPress={() => {
          if (side === 'L') { setSelL(item.id); speak(item.text); } else setSelR(item.id);
        }}
        style={{ minHeight: 58, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 2, borderBottomWidth: 4, opacity: isDone ? 0.35 : 1, borderColor: isWrong ? t.error : isDone ? t.success : sel ? t.sky : t.border, backgroundColor: isWrong ? t.errorSoft : isDone ? t.successSoft : sel ? t.skySoft : t.surface }}
      >
        <Text style={{ fontFamily: side === 'L' ? fonts.displayItalic : fonts.bodyBold, fontSize: 16, color: t.text, textAlign: 'center' }}>{item.text}</Text>
      </Tap>
    );
  };
  return (
    <View>
      <T v="h3" style={{ marginBottom: 18 }}>Toque nos pares</T>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1, gap: 10 }}>{left.map((x) => cell(x, 'L'))}</View>
        <View style={{ flex: 1, gap: 10 }}>{right.map((x) => cell(x, 'R'))}</View>
      </View>
    </View>
  );
}

// ─── ORDER THE DIALOGUE ───────────────────────────────────
export function DialogueEx({ ex, value: rawValue, onChange, locked }) {
  const value = Array.isArray(rawValue) ? rawValue : [];
  const t = useTheme();
  const placed = value.map((v) => v.id);
  return (
    <View>
      <T v="h3" style={{ marginBottom: 6 }}>Coloque o diálogo em ordem</T>
      <T v="small" style={{ marginBottom: 14 }}>Toque nas falas na sequência certa da conversa.</T>
      <View style={{ gap: 8, minHeight: 60, marginBottom: 16 }}>
        {value.map((l, i) => (
          <Pressable key={'p' + l.id} disabled={locked} onPress={() => onChange(value.filter((v) => v.id !== l.id))} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontFamily: fonts.bodyHeavy, fontSize: 13 }}>{i + 1}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: t.skySoft, borderRadius: 14, padding: 10 }}>
              <T v="caption">{l.who}</T>
              <Text style={{ fontFamily: fonts.displayItalic, fontSize: 16, color: t.text }}>{l.fr}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 8 }}>
        {ex.shuffled.filter((l) => !placed.includes(l.id)).map((l) => (
          <Tap key={l.id} disabled={locked} onPress={() => { fx.select(); speak(l.fr); onChange([...value, l]); }} style={{ backgroundColor: t.surface, borderRadius: 14, borderWidth: 2, borderBottomWidth: 4, borderColor: t.border, padding: 12 }}>
            <T v="caption">{l.who}</T>
            <Text style={{ fontFamily: fonts.displayItalic, fontSize: 16, color: t.text }}>{l.fr}</Text>
          </Tap>
        ))}
      </View>
    </View>
  );
}

// ─── SPEAK ────────────────────────────────────────────────
export function Waveform({ level, active, color }) {
  const bars = 13;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 50 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = active ? 8 + Math.abs(Math.sin(i * 1.7 + level * 9)) * 40 * Math.max(0.2, level) : 6;
        return <View key={i} style={{ width: 5, height: h, borderRadius: 3, backgroundColor: color }} />;
      })}
    </View>
  );
}

export function SpeakEx({ ex, onComplete, onSkip, onSpoken }) {
  const t = useTheme();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const ai = aiAvailable();
  const rec = useRecorder({
    onDone: async ({ uri, spoke }) => {
      onSpoken && onSpoken();
      if (!ai) {
        setResult({ selfCheck: true });
        return;
      }
      setBusy(true);
      try {
        const r = await evaluatePronunciation(uri, { fr: ex.fr, pt: ex.pt });
        setResult(r);
      } catch (e) {
        setResult({ error: e.message });
      } finally {
        setBusy(false);
      }
    },
  });
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!rec.recording) return;
    const l = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]));
    l.start();
    return () => l.stop();
  }, [rec.recording]);

  const score = result?.score ?? null;
  return (
    <View>
      <Prompt title="Fale esta frase" mood="speak">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <AudioButton text={ex.fr} size={40} />
            <View style={{ flex: 1 }}><SpeakableText text={ex.fr} /></View>
          </View>
          <T v="small">{ex.pt}</T>
        </View>
      </Prompt>

      {result?.words?.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
          {result.words.map((w, i) => (
            <Pressable key={i} onPress={() => speak(w.display)} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: w.status === 'good' ? t.successSoft : w.status === 'close' ? palette.goldSoft : t.errorSoft }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: w.status === 'good' ? t.success : w.status === 'close' ? palette.goldDark : t.error }}>{w.display}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <View style={{ alignItems: 'center', gap: 14, marginTop: 6 }}>
        {busy ? (
          <View style={{ alignItems: 'center', gap: 10, padding: 20 }}>
            <ActivityIndicator size="large" color={t.sky} />
            <T v="small">Le Canard está ouvindo com atenção…</T>
          </View>
        ) : result ? (
          <View style={{ alignItems: 'center', gap: 10, alignSelf: 'stretch' }}>
            {result.error ? (
              <T v="bodyBold" center color={t.error}>{result.error}</T>
            ) : result.selfCheck ? (
              <T v="body" center color={t.text2}>Ouça o modelo de novo e compare com o que você disse. Ficou parecido?</T>
            ) : result.silent ? (
              <T v="bodyBold" center color={t.error}>{result.tip}</T>
            ) : (
              <>
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 40, color: score >= 80 ? t.success : score >= 50 ? palette.goldDark : t.error }}>{score}%</Text>
                {result.heard ? <T v="small" center>Entendi: “{result.heard}”</T> : null}
                {result.tip ? <T v="body" center>{result.tip}</T> : null}
              </>
            )}
            <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'stretch' }}>
              <Button title="Tentar de novo" variant="secondary" icon="refresh" small style={{ flex: 1 }} onPress={() => { setResult(null); rec.setPhase('idle'); }} />
              <Button
                title={result.selfCheck ? 'Ficou bom!' : 'Continuar'}
                small
                style={{ flex: 1 }}
                onPress={() => onComplete(result.selfCheck ? true : !result.error && !result.silent && score >= 60, { score })}
                disabled={!result.selfCheck && (result.error || result.silent) ? false : false}
              />
            </View>
          </View>
        ) : (
          <>
            {rec.recording ? <Waveform level={rec.level} active color={t.accent} /> : <View style={{ height: 50 }} />}
            <Pressable onPress={() => (rec.recording ? rec.stop() : rec.start())} accessibilityLabel={rec.recording ? 'Parar' : 'Gravar'}>
              <Animated.View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: rec.recording ? t.accent : t.primary, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 5, borderBottomColor: rec.recording ? palette.redDark : t.primaryDark, transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }] }}>
                <Icon name={rec.recording ? 'stop' : 'mic'} size={40} color="#fff" stroke={2.4} fill={rec.recording ? '#fff' : 'none'} />
              </Animated.View>
            </Pressable>
            <T v="label">{rec.phase === 'denied' ? 'Permita o microfone nas configurações' : rec.recording ? 'Gravando… toque para parar' : 'Toque para falar'}</T>
          </>
        )}
        {!result && !busy ? (
          <Pressable onPress={onSkip} hitSlop={10} style={{ marginTop: 6 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color: t.text3, fontSize: 14 }}>NÃO POSSO FALAR AGORA</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

// ─── CONJUGATE ────────────────────────────────────────────
export function ConjugateEx({ ex, value, onChange, locked }) {
  const t = useTheme();
  return (
    <View>
      <Prompt title={ex.choice ? 'Escolha a forma certa' : 'Conjugue o verbo'} mood="teach">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Text style={{ fontFamily: fonts.displayItalic, fontSize: 22, color: t.text }}>{ex.verb}</Text>
            <Text style={{ fontFamily: fonts.bodySemi, fontSize: 14, color: t.text2 }}>({ex.verbPt})</Text>
          </View>
          <View style={{ alignSelf: 'flex-start', backgroundColor: t.primarySoft, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.mode === 'dark' ? t.sky : t.primary }}>{ex.tenseName.toUpperCase()} · {ex.tensePt}</Text>
          </View>
        </View>
      </Prompt>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Text style={{ fontFamily: fonts.displayItalic, fontSize: 24, color: t.text }}>{ex.subject}</Text>
        <View style={{ flex: 1, borderBottomWidth: 3, borderColor: t.sky, paddingBottom: 4 }}>
          <Text style={{ fontFamily: fonts.displayItalic, fontSize: 24, color: value ? t.text : t.text3 }}>{ex.choice ? value || '…' : value || '…'}</Text>
        </View>
      </View>
      {ex.choice ? (
        <View style={{ gap: 10 }}>
          {ex.options.map((o) => (
            <OptionCard key={o} label={o} selected={value === o} disabled={locked} onPress={() => { onChange(o); fx.select(); }} />
          ))}
        </View>
      ) : (
        <TypeBox value={value} onChange={onChange} locked={locked} placeholder="Digite só o verbo conjugado…" />
      )}
    </View>
  );
}

// ─── WRITE IN FRENCH (PT → FR, typed) ─────────────────────
export function WriteEx({ ex, value, onChange, locked }) {
  const t = useTheme();
  const [hint, setHint] = useState(false);
  const hintText = ex.answer
    .split(/\s+/)
    .map((w) => w.replace(/^([^\s]{1,2})([\wÀ-ÿ'’-]*)/, (_, a, b) => a + b.replace(/[\wÀ-ÿ]/g, '_')))
    .join(' ');
  return (
    <View>
      <Prompt title="Escreva em francês" mood="teach">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14, gap: 8 }}>
          <T v="bodyBold" style={{ fontSize: 18 }}>{ex.prompt}</T>
          {hint ? (
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, letterSpacing: 1, color: t.sky }}>{hintText}</Text>
          ) : !locked ? (
            <Pressable onPress={() => setHint(true)} hitSlop={8}>
              <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: t.sky }}>💡 Mostrar dica</Text>
            </Pressable>
          ) : null}
        </View>
      </Prompt>
      <TypeBox value={value} onChange={onChange} locked={locked} placeholder="Escreva a frase em francês…" />
    </View>
  );
}

// ─── MINIMAL PAIRS (which one did you hear?) ──────────────
export function PairsEx({ ex, value, onChange, locked, autoAudio }) {
  const t = useTheme();
  return (
    <View>
      <Prompt title="Qual palavra você ouviu?" mood="listen">
        <View style={{ gap: 8 }}>
          <AudioPair text={ex.prompt} size={64} autoPlay={autoAudio !== false} />
          <T v="caption">Treino de som: {ex.groupTitle}</T>
        </View>
      </Prompt>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {ex.options.map((o) => (
          <View key={o.fr} style={{ flex: 1, gap: 8 }}>
            <OptionCard
              label={o.fr}
              sub={locked ? o.pt : null}
              big
              selected={value === o.fr}
              status={locked ? (o.fr === ex.answer ? 'ok' : value === o.fr ? 'bad' : null) : null}
              disabled={locked}
              onPress={() => { onChange(o.fr); fx.select(); }}
              style={{ alignItems: 'center', minHeight: 96 }}
            />
            {locked ? <View style={{ alignItems: 'center' }}><AudioButton text={o.fr} size={40} /></View> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── TRUE OR FALSE ────────────────────────────────────────
export function TrueFalseEx({ ex, value, onChange, locked }) {
  const t = useTheme();
  return (
    <View>
      <Prompt title="Verdadeiro ou falso?" mood="think">
        <View style={{ backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, borderRadius: 18, padding: 14 }}>
          <T v="bodyBold" style={{ fontSize: 18, lineHeight: 25 }}>{ex.prompt}</T>
        </View>
      </Prompt>
      {ex.context ? <T v="small" style={{ marginBottom: 12 }}>{ex.context}</T> : null}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {[['V', '✅', 'Verdadeiro'], ['F', '❌', 'Falso']].map(([k, e, l]) => (
          <OptionCard key={k} emoji={e} label={l} big selected={value === k} disabled={locked} onPress={() => { onChange(k); fx.select(); }} style={{ flex: 1, minHeight: 120 }} />
        ))}
      </View>
    </View>
  );
}
