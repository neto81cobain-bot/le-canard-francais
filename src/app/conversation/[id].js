import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { KeyboardAwareView } from '../../components/keyboard';
import { Alert } from '../../services/dialog';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette } from '../../theme';
import { Header, T, Button, Empty } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import { AudioButton, Confetti, AccentBar } from '../../components/extras';
import { Waveform } from '../../components/Exercises';
import { SCENARIOS } from '../../content/extras';
import { useRecorder } from '../../services/recorder';
import { conversationTurn, transcribeFrench, aiAvailable } from '../../services/ai';
import { speak } from '../../services/speech';
import { fx } from '../../services/feedback';

export default function Conversation() {
  const { id } = useLocalSearchParams();
  const sc = SCENARIOS.find((s) => s.id === id);
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [msgs, setMsgs] = useState(() => (sc ? [{ from: 'bot', text: sc.opener, pt: '' }] : []));
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPt, setShowPt] = useState({});
  const [done, setDone] = useState(false);
  const [kb, setKb] = useState(false);
  const scroll = useRef(null);
  const ai = aiAvailable();

  useEffect(() => {
    if (sc && state.settings.autoAudio) setTimeout(() => speak(sc.opener), 400);
  }, []);

  const send = async (userText) => {
    const s = (userText || '').trim();
    if (!s || busy) return;
    const history = [...msgs, { from: 'user', text: s }];
    setMsgs(history);
    setText('');
    setBusy(true);
    try {
      const r = await conversationTurn(sc, history);
      const withCorr = history.map((m, i) => (i === history.length - 1 && r.correction ? { ...m, correction: r.correction } : m));
      setMsgs([...withCorr, { from: 'bot', text: r.reply, pt: r.translation }]);
      if (state.settings.autoAudio) speak(r.reply);
      actions.addSpoken(1);
      if (r.done && !done) {
        setDone(true);
        fx.complete();
        actions.addXP(25);
        actions.addConversation();
      }
    } catch (e) {
      Alert.alert('Ops', e.message);
      setMsgs(msgs);
    } finally {
      setBusy(false);
      setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const rec = useRecorder({
    onDone: async ({ uri }) => {
      setBusy(true);
      try {
        const heard = await transcribeFrench(uri);
        setBusy(false);
        if (heard) send(heard);
        else Alert.alert('Não ouvi nada', 'Fale um pouco mais alto e perto do microfone.');
      } catch (e) {
        setBusy(false);
        Alert.alert('Erro', e.message);
      } finally {
        rec.setPhase('idle');
      }
    },
  });

  if (!sc) return null;
  if (!ai) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
        <Header title={sc.title} />
        <Empty emoji="⚙️" title="Conversa por IA desativada" text="Configure o servidor de IA em Perfil → Configurações → Avançado." />
      </View>
    );
  }

  return (
    <KeyboardAwareView style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header title={`${sc.emoji} ${sc.title}`} />
      <View style={{ marginHorizontal: 20, marginBottom: 8, backgroundColor: done ? t.successSoft : t.goldSoft, borderRadius: radius.md, padding: 12, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>{done ? '✅' : '🎯'}</Text>
        <T v="small" color={t.text} style={{ flex: 1 }}>{done ? 'Missão cumprida! +25 XP. Pode continuar conversando.' : sc.goal}</T>
      </View>
      <ScrollView ref={scroll} contentContainerStyle={{ padding: 20, gap: 12 }} onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })}>
        {msgs.map((m, i) =>
          m.from === 'bot' ? (
            <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
              <Duck head size={38} noBadge />
              <View style={{ maxWidth: '80%', backgroundColor: t.surface, borderRadius: 18, borderBottomLeftRadius: 4, padding: 12, borderWidth: 1, borderColor: t.border, gap: 6 }}>
                <Text style={{ fontFamily: fonts.displayItalic, fontSize: 17, lineHeight: 24, color: t.text }}>{m.text}</Text>
                {showPt[i] && m.pt ? <Text style={{ fontFamily: fonts.bodySemi, color: t.text2, fontSize: 14 }}>{m.pt}</Text> : null}
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <Pressable onPress={() => speak(m.text)} hitSlop={8}><Icon name="volume" size={18} color={t.sky} /></Pressable>
                  <Pressable onPress={() => speak(m.text, { slow: true })} hitSlop={8}><Icon name="turtle" size={18} color={t.text3} /></Pressable>
                  {m.pt ? (
                    <Pressable onPress={() => setShowPt({ ...showPt, [i]: !showPt[i] })} hitSlop={8}>
                      <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.text3 }}>{showPt[i] ? 'OCULTAR' : 'TRADUZIR'}</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            </View>
          ) : (
            <View key={i} style={{ alignSelf: 'flex-end', maxWidth: '82%', gap: 4 }}>
              <View style={{ backgroundColor: t.primary, borderRadius: 18, borderBottomRightRadius: 4, padding: 12 }}>
                <Text style={{ fontFamily: fonts.bodySemi, fontSize: 16, color: '#fff' }}>{m.text}</Text>
              </View>
              {m.correction ? (
                <View style={{ backgroundColor: t.goldSoft, borderRadius: 12, padding: 10, flexDirection: 'row', gap: 6 }}>
                  <Text>✏️</Text>
                  <Text style={{ flex: 1, fontFamily: fonts.bodySemi, fontSize: 13, color: t.text }}>{m.correction}</Text>
                </View>
              ) : null}
            </View>
          )
        )}
        {busy ? (
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Duck head size={38} noBadge />
            <ActivityIndicator color={t.text3} />
          </View>
        ) : null}
      </ScrollView>
      {done ? <Confetti run /> : null}
      <View style={{ padding: 14, paddingBottom: 14 + insets.bottom, borderTopWidth: 1, borderTopColor: t.border, backgroundColor: t.surface, gap: 8 }}>
        {rec.recording ? <View style={{ alignItems: 'center' }}><Waveform level={rec.level} active color={t.accent} /></View> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TextInput
            value={text}
            onChangeText={setText}
            onFocus={() => setKb(true)}
            onBlur={() => setKb(false)}
            placeholder="Responda em francês…"
            placeholderTextColor={t.text3}
            onSubmitEditing={() => send(text)}
            style={{ flex: 1, backgroundColor: t.bg, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 12, fontFamily: fonts.bodySemi, fontSize: 16, color: t.text }}
          />
          {text.trim() ? (
            <Pressable onPress={() => send(text)} style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="send" size={22} color="#fff" />
            </Pressable>
          ) : (
            <Pressable disabled={busy} onPress={() => (rec.recording ? rec.stop() : rec.start())} style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: rec.recording ? t.accent : palette.red, alignItems: 'center', justifyContent: 'center', opacity: busy ? 0.5 : 1 }}>
              <Icon name={rec.recording ? 'stop' : 'mic'} size={24} color="#fff" fill={rec.recording ? '#fff' : 'none'} />
            </Pressable>
          )}
        </View>
        {kb ? <AccentBar onInsert={(c) => setText(text + c)} /> : null}
      </View>
    </KeyboardAwareView>
  );
}
