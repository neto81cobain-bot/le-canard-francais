import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme, fonts, radius, palette } from '../../theme';
import { Screen, T, Button, Card, Chip } from '../../components/ui';
import { AudioButton, Appear } from '../../components/extras';
import { Rich } from '../../components/Rich';
import { getVerb, TENSES, conjugate, MODEL_LABEL } from '../../content/verbs';
import { speak } from '../../services/speech';

export default function VerbScreen() {
  const { inf } = useLocalSearchParams();
  const t = useTheme();
  const v = getVerb(inf);
  const [tense, setTense] = useState('present');
  if (!v) return null;
  const table = conjugate(v, tense);
  const info = TENSES.find((x) => x.id === tense);
  const etre = v.aux === 'etre' && ['passe_compose', 'plus_que_parfait', 'futur_anterieur', 'conditionnel_passe'].includes(tense);

  return (
    <Screen title="Conjugação">
      <Card style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.displayItalic, fontSize: 32, color: t.text }}>{v.inf}</Text>
            <T v="bodyBold" color={t.text2}>{v.pt}</T>
          </View>
          <AudioButton text={v.inf} size={52} />
        </View>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          <Chip label={`Nível ${v.level}`} />
          <Chip label={MODEL_LABEL[v.m]} />
          <Chip label={`Auxiliar: ${v.aux === 'etre' ? 'être' : 'avoir'}`} color={v.aux === 'etre' ? palette.red : t.text2} />
          <Chip label={`Particípio: ${v.pp}`} />
        </View>
      </Card>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }} contentContainerStyle={{ gap: 8 }}>
        {TENSES.map((x) => (
          <Pressable key={x.id} onPress={() => setTense(x.id)}>
            <Chip label={x.name} big bg={tense === x.id ? t.primary : t.surface2} color={tense === x.id ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </ScrollView>

      <View style={{ marginTop: 14, gap: 4 }}>
        <T v="h3">{info.name} <Text style={{ fontFamily: fonts.bodySemi, fontSize: 14, color: t.text3 }}>· {info.pt} · {info.level}</Text></T>
        <Rich text={info.desc} size={15} />
      </View>

      {table ? (
        <View style={{ marginTop: 12, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 2, borderColor: t.border }}>
          {table.map((c, i) => (
            <Appear key={tense + i} delay={i * 40} from={6}>
              <Pressable onPress={() => speak(c.full.replace(/ !$/, ''))} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 14, gap: 10, backgroundColor: i % 2 ? t.surface : t.surface2 }}>
                <Text style={{ width: 110, fontFamily: fonts.displayItalic, fontSize: 15, color: t.text2 }}>{c.subject}</Text>
                <Text style={{ flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 17, color: t.mode === 'dark' ? t.sky : t.primary }}>{c.form}</Text>
                <Text style={{ fontSize: 13 }}>🔊</Text>
              </Pressable>
            </Appear>
          ))}
        </View>
      ) : (
        <Card style={{ marginTop: 12 }}><T v="body">Este verbo não tem imperativo.</T></Card>
      )}

      {etre ? (
        <View style={{ marginTop: 12, backgroundColor: t.goldSoft, borderRadius: radius.md, padding: 14 }}>
          <Rich size={15} text={`Com *être*, o particípio concorda com o sujeito: *${v.pp}* (masc.), *${v.pp}e* (fem.), *${v.pp.endsWith('s') ? v.pp : v.pp + 's'}* (plural).`} />
        </View>
      ) : null}

      <View style={{ gap: 10, marginTop: 22 }}>
        <Button title="Treinar este verbo" icon="dumbbell" onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'verbs', verb: v.inf } })} />
        <Button title="Treinar este tempo (vários verbos)" variant="secondary" icon="layers" onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'verbs', tense } })} />
      </View>
    </Screen>
  );
}
