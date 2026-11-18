// Vocabulary trails by subject: browse words (gender colours) and train each theme.
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius } from '../theme';
import { T, Screen, Tap, Chip, Button, Sheet } from '../components/ui';
import Duck from '../components/Duck';
import { AudioButton } from '../components/extras';
import { VOCAB_THEMES, genderColor, GENDER_COLORS } from '../content/vocab';

export default function Vocab() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [open, setOpen] = useState(null);
  const theme = VOCAB_THEMES.find((v) => v.id === open);
  const known = (th) => th.words.filter((w) => state.srs?.[w.key]).length;

  return (
    <Screen title="Trilhas de vocabulário">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <Duck mood="teach" size={80} />
        <View style={{ flex: 1, gap: 4 }}>
          <T v="bodyBold">Palavras por assunto, com imagem e som.</T>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            <Chip label="le · masculino" color="#fff" bg={GENDER_COLORS.m} />
            <Chip label="la · feminino" color="#fff" bg={GENDER_COLORS.f} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
        {VOCAB_THEMES.map((th) => {
          const k = known(th);
          return (
            <Tap key={th.id} onPress={() => setOpen(th.id)} style={{ width: '47%', flexGrow: 1, backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 14, gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: th.color, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{th.emoji}</Text>
                </View>
                <Chip label={`${k}/${th.words.length}`} color={k >= th.words.length ? t.success : t.text2} bg={k >= th.words.length ? t.successSoft : t.surface2} />
              </View>
              <T v="bodyBold">{th.title}</T>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: t.surface2, overflow: 'hidden' }}>
                <View style={{ width: `${Math.round((k / th.words.length) * 100)}%`, height: 6, backgroundColor: th.color }} />
              </View>
            </Tap>
          );
        })}
      </View>

      <Sheet visible={!!theme} onClose={() => setOpen(null)}>
        {theme ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Text style={{ fontSize: 34 }}>{theme.emoji}</Text>
              <T v="h3" style={{ flex: 1 }}>{theme.title}</T>
            </View>
            <Button title="Treinar esta trilha" color={theme.color} onPress={() => { setOpen(null); router.push({ pathname: '/practice/[mode]', params: { mode: 'vocab', key: theme.id } }); }} />
            <View style={{ gap: 6, marginTop: 12 }}>
              {theme.words.map((w) => (
                <View key={w.fr} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, borderRadius: 12, backgroundColor: t.bg }}>
                  <Text style={{ fontSize: 24, width: 32, textAlign: 'center' }}>{w.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 16, color: genderColor(w.fr, t.text) }}>{w.fr}</Text>
                    <T v="small">{w.pt}</T>
                  </View>
                  <AudioButton text={w.fr} size={34} />
                  <Pressable onPress={() => actions.toggleSaved({ fr: w.fr, pt: w.pt })} hitSlop={8}>
                    <Text style={{ fontSize: 18, opacity: state.saved.find((c) => c.fr === w.fr) ? 1 : 0.35 }}>🔖</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </Sheet>
    </Screen>
  );
}
