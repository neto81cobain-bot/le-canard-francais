import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createAudioPlayer } from 'expo-audio';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Button, Chip, Card, Ring } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { AudioButton, SpeakableText, SpeedChip } from '../components/extras';
import { Waveform } from '../components/Exercises';
import { SPEAK_PHRASES, SOUNDS } from '../content/extras';
import { SPEAK_CATEGORIES } from '../content/speakbank';
import { ScrollView } from 'react-native';
import { useRecorder } from '../services/recorder';
import { evaluatePronunciation, aiAvailable } from '../services/ai';
import { speak } from '../services/speech';
import { isOnline } from '../services/net';
import { fx } from '../services/feedback';

export default function SpeakScreen() {
  const { sound, cat: catParam } = useLocalSearchParams();
  const { state, actions } = useStore();
  const t = useTheme();
  const [cat, setCat] = useState(catParam || 'mots1');
  const pool = useMemo(() => {
    const s = SOUNDS.find((x) => x.id === sound);
    if (s) return s.examples.map((e) => ({ fr: e.w, read: e.r, pt: s.title, level: 'som' }));
    if (cat === 'classic') return SPEAK_PHRASES;
    return SPEAK_CATEGORIES.find((c) => c.id === cat)?.items || SPEAK_PHRASES;
  }, [sound, cat]);
  const best = state.speakBest || {};
  const mastered = pool.filter((p) => (best[p.fr] || 0) >= 80).length;
  const [i, setI] = useState(0);
  const phrase = pool[i % pool.length];
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState(null);
  const [myUri, setMyUri] = useState(null);
  const player = useRef(null);
  const ai = aiAvailable();

  const rec = useRecorder({
    onDone: async ({ uri }) => {
      setMyUri(uri);
      actions.addSpoken(1);
      if (!ai || !isOnline()) { setRes({ selfCheck: true, offline: ai }); return; }
      setBusy(true);
      try {
        const r = await evaluatePronunciation(uri, phrase);
        setRes(r);
        if (!r.silent) (r.score >= 70 ? fx.correct : fx.wrong)();
        if (!r.silent) actions.addXP(r.score >= 80 ? 5 : r.score >= 50 ? 3 : 1);
        if (!r.silent) actions.set((s0) => ({ speakBest: { ...(s0.speakBest || {}), [phrase.fr]: Math.max(r.score, (s0.speakBest || {})[phrase.fr] || 0) } }));
      } catch (e) {
        setRes(e?.offline ? { selfCheck: true, offline: true } : { error: e.message });
      } finally {
        setBusy(false);
      }
    },
  });

  useEffect(() => () => { try { player.current?.remove(); } catch {} }, []);
  const playMine = () => {
    if (!myUri) return;
    try {
      player.current?.remove();
      player.current = createAudioPlayer({ uri: myUri });
      player.current.play();
    } catch {}
  };
  const nextPhrase = () => {
    setRes(null); setMyUri(null); rec.setPhase('idle');
    // skip phrases already mastered most of the time
    let n = i + 1;
    for (let k = 0; k < pool.length; k++) {
      const p = pool[n % pool.length];
      if ((best[p.fr] || 0) < 80 || Math.random() < 0.2) break;
      n++;
    }
    setI(n);
  };

  const score = res?.score;
  return (
    <Screen title="Avaliação de fala" right={<SpeedChip />}>
      {!sound ? (
        <View style={{ marginBottom: 14, marginHorizontal: -20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {[...SPEAK_CATEGORIES.map((c) => [c.id, `${c.emoji} ${c.title}`, c.level]), ['classic', '⭐ Clássicas', '']].map(([id, label, lv]) => (
              <Pressable key={id} onPress={() => { setCat(id); setI(0); setRes(null); setMyUri(null); }}>
                <Chip label={lv ? `${label} · ${lv}` : label} big bg={cat === id ? t.primary : t.surface2} color={cat === id ? '#fff' : t.text2} />
              </Pressable>
            ))}
          </ScrollView>
          <T v="caption" style={{ marginTop: 8, marginHorizontal: 20 }}>{mastered}/{pool.length} dominadas (nota 80+) · as que você erra voltam mais vezes</T>
        </View>
      ) : null}

      <Card style={{ gap: 10, padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <AudioButton text={phrase.fr} size={52} />
          <AudioButton text={phrase.fr} size={40} slow />
          <View style={{ flex: 1 }} />
          <Text style={{ fontFamily: fonts.bodyHeavy, color: t.text3, fontSize: 12 }}>{(i % pool.length) + 1}/{pool.length}</Text>
        </View>
        <SpeakableText text={phrase.fr} style={{ fontSize: 28, lineHeight: 38 }} />
        {phrase.read ? <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: palette.red }}>🗣️ {phrase.read}</Text> : null}
        <T v="small">{phrase.pt}</T>
      </Card>

      <View style={{ alignItems: 'center', marginTop: 24, gap: 14 }}>
        {busy ? (
          <View style={{ alignItems: 'center', gap: 10, padding: 30 }}>
            <ActivityIndicator size="large" color={t.sky} />
            <T v="small">Analisando sua pronúncia…</T>
          </View>
        ) : res ? (
          <Card style={{ alignSelf: 'stretch', alignItems: 'center', gap: 12 }}>
            {res.error ? (
              <>
                <Duck mood="think" size={80} />
                <T v="bodyBold" center color={t.error}>{res.error}</T>
              </>
            ) : res.silent ? (
              <>
                <Duck mood="listen" size={80} />
                <T v="bodyBold" center>{res.tip}</T>
              </>
            ) : res.selfCheck ? (
              <>
                <Duck mood={res.offline ? 'offline' : 'listen'} size={80} />
                {res.offline ? <Chip label="📡 Sem internet — modo comparar" /> : null}
                <T v="body" center>Ouça o modelo e depois a sua voz. Compare o ritmo e os sons — e repita até ficar parecido!</T>
                <Button title="Ouvir o modelo" icon="volume" small variant="secondary" onPress={() => speak(phrase.fr)} style={{ alignSelf: 'stretch' }} />
              </>
            ) : (
              <>
                <Ring value={score / 100} size={110} stroke={11} color={score >= 80 ? t.success : score >= 50 ? palette.gold : t.error}>
                  <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 28, color: t.text }}>{score}</Text>
                </Ring>
                <T v="h3" center>{score >= 90 ? 'Parfait ! 🇫🇷' : score >= 70 ? 'Très bien !' : score >= 50 ? 'Pas mal !' : 'Continue tentando!'}</T>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                  {res.words.map((w, k) => (
                    <Pressable key={k} onPress={() => speak(w.display)} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: w.status === 'good' ? t.successSoft : w.status === 'close' ? palette.goldSoft : t.errorSoft }}>
                      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: w.status === 'good' ? t.success : w.status === 'close' ? palette.goldDark : t.error }}>{w.display}</Text>
                    </Pressable>
                  ))}
                </View>
                <T v="caption" center>Verde = ótimo · Amarelo = quase · Vermelho = treinar. Toque numa palavra para ouvir.</T>
                {res.heard ? <T v="small" center>Ouvi: “{res.heard}”</T> : null}
                {res.tip ? (
                  <View style={{ flexDirection: 'row', gap: 8, backgroundColor: t.surface2, borderRadius: 14, padding: 12 }}>
                    <Text>💡</Text>
                    <T v="small" color={t.text} style={{ flex: 1 }}>{res.tip}</T>
                  </View>
                ) : null}
              </>
            )}
            {myUri ? <Button title="Ouvir minha voz" icon="play" variant="secondary" small onPress={playMine} style={{ alignSelf: 'stretch' }} /> : null}
          </Card>
        ) : (
          <>
            {rec.recording ? <Waveform level={rec.level} active color={t.accent} /> : <View style={{ height: 50 }} />}
            <Pressable onPress={() => (rec.recording ? rec.stop() : rec.start())}>
              <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: rec.recording ? t.accent : t.primary, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 6, borderBottomColor: rec.recording ? palette.redDark : t.primaryDark }}>
                <Icon name={rec.recording ? 'stop' : 'mic'} size={46} color="#fff" stroke={2.3} fill={rec.recording ? '#fff' : 'none'} />
              </View>
            </Pressable>
            <T v="label">{rec.phase === 'denied' ? 'Permita o microfone nas configurações do Android' : rec.recording ? 'Gravando… para sozinho quando você terminar' : 'Toque e fale a frase'}</T>
          </>
        )}
      </View>

      {res ? (
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
          <Button title="Tentar de novo" icon="refresh" variant="danger" style={{ flex: 1 }} onPress={() => { setRes(null); rec.setPhase('idle'); }} />
          <Button title="Próxima" icon="chevron" style={{ flex: 1 }} onPress={nextPhrase} />
        </View>
      ) : null}
    </Screen>
  );
}
