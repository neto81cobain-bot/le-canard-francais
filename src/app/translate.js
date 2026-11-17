import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, FlatList, Platform } from 'react-native';
import { KeyboardAwareView } from '../components/keyboard';
import { Alert } from '../services/dialog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { Header, T, Empty } from '../components/ui';
import Icon from '../components/Icon';
import { AudioButton } from '../components/extras';
import { Waveform } from '../components/Exercises';
import { useRecorder } from '../services/recorder';
import { translateAudio, translateText, aiAvailable } from '../services/ai';

export default function Translate() {
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [dir, setDir] = useState('pt-fr');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const ai = aiAvailable();

  const add = (heard, res) => {
    if (!heard || !res.translation) return;
    const fr = dir === 'pt-fr' ? res.translation : heard;
    const pt = dir === 'pt-fr' ? heard : res.translation;
    actions.addTranslation({ id: Date.now(), dir, source: heard, translation: res.translation, note: res.note || '', fr, pt });
  };

  const rec = useRecorder({
    onDone: async ({ uri }) => {
      setBusy(true);
      try {
        const r = await translateAudio(uri, dir);
        if (!r.heard) Alert.alert('Não ouvi nada', 'Tente falar mais perto do microfone.');
        else add(r.heard, r);
      } catch (e) {
        Alert.alert('Erro', e.message);
      } finally {
        setBusy(false);
        rec.setPhase('idle');
      }
    },
  });

  const sendText = async () => {
    const s = text.trim();
    if (!s) return;
    setBusy(true);
    try {
      const r = await translateText(s, dir);
      add(s, r);
      setText('');
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setBusy(false);
    }
  };

  const from = dir === 'pt-fr' ? '🇧🇷 Português' : '🇫🇷 Français';
  const to = dir === 'pt-fr' ? '🇫🇷 Français' : '🇧🇷 Português';

  return (
    <KeyboardAwareView style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header
        title="Falar e traduzir"
        right={state.translateHistory.length ? (
          <Pressable onPress={() => actions.clearTranslations()} hitSlop={10}><Icon name="trash" size={22} color={t.text3} /></Pressable>
        ) : null}
      />
      {/* direction */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 20, marginBottom: 10, backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 10 }}>
        <Text style={{ flex: 1, textAlign: 'center', fontFamily: fonts.bodyHeavy, color: t.text }}>{from}</Text>
        <Pressable onPress={() => setDir(dir === 'pt-fr' ? 'fr-pt' : 'pt-fr')} style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Inverter idiomas">
          <Icon name="swap" size={20} color="#fff" />
        </Pressable>
        <Text style={{ flex: 1, textAlign: 'center', fontFamily: fonts.bodyHeavy, color: t.text }}>{to}</Text>
      </View>

      {!ai ? (
        <Empty emoji="⚙️" title="Tradutor por IA desativado" text="Configure o servidor de IA em Perfil → Configurações → Avançado para usar o tradutor." />
      ) : (
        <FlatList
          data={state.translateHistory}
          inverted
          keyExtractor={(x) => String(x.id)}
          contentContainerStyle={{ padding: 20, gap: 14 }}
          ListEmptyComponent={<View style={{ transform: [{ scaleY: -1 }] }}><Empty emoji="🗣️" title="Fale ou digite algo" text="Ex.: “Onde fica a estação de trem?” — o Canard traduz e você ouve a pronúncia." /></View>}
          renderItem={({ item }) => {
            const saved = state.saved.find((c) => c.fr === item.fr);
            return (
              <View style={{ gap: 6 }}>
                <View style={{ alignSelf: 'flex-end', maxWidth: '85%', backgroundColor: t.surface2, borderRadius: 18, borderBottomRightRadius: 4, padding: 12 }}>
                  <Text style={{ fontFamily: fonts.bodySemi, fontSize: 16, color: t.text }}>{item.source}</Text>
                </View>
                <View style={{ alignSelf: 'flex-start', maxWidth: '90%', backgroundColor: t.primary, borderRadius: 18, borderBottomLeftRadius: 4, padding: 14, gap: 8 }}>
                  <Text style={{ fontFamily: item.dir === 'pt-fr' ? fonts.displayItalic : fonts.bodyBold, fontSize: 19, color: '#fff' }}>{item.translation}</Text>
                  {item.note ? <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>💡 {item.note}</Text> : null}
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <AudioButton text={item.fr} size={36} color="rgba(255,255,255,0.25)" />
                    <AudioButton text={item.fr} size={30} slow />
                    <View style={{ flex: 1 }} />
                    <Pressable onPress={() => actions.toggleSaved({ fr: item.fr, pt: item.pt })} hitSlop={8}>
                      <Icon name="bookmark" size={22} color="#fff" fill={saved ? '#fff' : 'none'} />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {ai ? (
        <View style={{ padding: 14, paddingBottom: 14 + insets.bottom, borderTopWidth: 1, borderTopColor: t.border, backgroundColor: t.surface, gap: 10 }}>
          {rec.recording ? (
            <View style={{ alignItems: 'center' }}><Waveform level={rec.level} active color={t.accent} /></View>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder={dir === 'pt-fr' ? 'Digite em português…' : 'Écrivez en français…'}
              placeholderTextColor={t.text3}
              onSubmitEditing={sendText}
              style={{ flex: 1, backgroundColor: t.bg, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 12, fontFamily: fonts.bodySemi, fontSize: 16, color: t.text }}
            />
            {busy ? (
              <ActivityIndicator color={t.primary} style={{ width: 52 }} />
            ) : text.trim() ? (
              <Pressable onPress={sendText} style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="send" size={22} color="#fff" />
              </Pressable>
            ) : (
              <Pressable onPress={() => (rec.recording ? rec.stop() : rec.start())} style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: rec.recording ? t.accent : palette.red, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={rec.recording ? 'stop' : 'mic'} size={24} color="#fff" fill={rec.recording ? '#fff' : 'none'} />
              </Pressable>
            )}
          </View>
        </View>
      ) : null}
    </KeyboardAwareView>
  );
}
