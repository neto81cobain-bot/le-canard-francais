// Pocket grammar: quick cards with a table, examples, a tip and a practice button.
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Chip, Button } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { AudioButton } from '../components/extras';
import { GRAMMAR } from '../content/grammar';
import { speak } from '../services/speech';

const LV = ['A1', 'A2', 'B1', 'B2'];

export default function Grammar() {
  const t = useTheme();
  const [open, setOpen] = useState(null);
  const [lv, setLv] = useState('all');
  const list = GRAMMAR.filter((g) => lv === 'all' || g.level === lv);
  return (
    <Screen title="Gramática de bolso">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <Duck mood="teach" size={76} />
        <T v="bodyBold" style={{ flex: 1 }}>O essencial de cada regra em 1 minuto — com tabela, exemplos e treino.</T>
      </View>
      <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {['all', ...LV].map((l) => (
          <Pressable key={l} onPress={() => setLv(l)}>
            <Chip label={l === 'all' ? 'Todas' : l} big bg={lv === l ? t.primary : t.surface2} color={lv === l ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 10 }}>
        {list.map((g) => {
          const isOpen = open === g.id;
          return (
            <View key={g.id} style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: isOpen ? t.primary : t.border, overflow: 'hidden' }}>
              <Pressable onPress={() => setOpen(isOpen ? null : g.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <Text style={{ fontSize: 26 }}>{g.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <T v="bodyBold">{g.title}</T>
                </View>
                <Chip label={g.level} color={t.primary} bg={t.primarySoft} />
                <Icon name={isOpen ? 'down' : 'chevron'} size={18} color={t.text3} />
              </Pressable>
              {isOpen ? (
                <View style={{ paddingHorizontal: 14, paddingBottom: 14, gap: 10 }}>
                  <T v="body" color={t.text}>{g.rule}</T>
                  {g.rows?.length ? (
                    <View style={{ borderRadius: 12, borderWidth: 1, borderColor: t.border, overflow: 'hidden' }}>
                      {g.head ? (
                        <View style={{ flexDirection: 'row', backgroundColor: t.surface2 }}>
                          {g.head.map((h, i) => <Text key={i} style={{ flex: i === 0 ? 1.1 : 1, padding: 8, fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.text2 }}>{h}</Text>)}
                        </View>
                      ) : null}
                      {g.rows.map((r, i) => (
                        <View key={i} style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: t.border }}>
                          {r.map((c, j) => (
                            <Text key={j} onPress={j > 0 ? () => speak(c) : undefined} style={{ flex: j === 0 ? 1.1 : 1, padding: 8, fontFamily: j === 0 ? fonts.bodySemi : fonts.bodyBold, fontSize: 14, color: j === 0 ? t.text2 : t.text }}>{c}</Text>
                          ))}
                        </View>
                      ))}
                    </View>
                  ) : null}
                  {g.ex.map((e) => {
                    const [fr, pt] = e.split('|');
                    return (
                      <View key={e} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', padding: 8, borderRadius: 12, backgroundColor: t.bg }}>
                        <AudioButton text={fr.replace(/\(.*?\)/g, '')} size={32} />
                        <View style={{ flex: 1 }}>
                          <T v="bodyBold">{fr}</T>
                          <T v="small">{pt}</T>
                        </View>
                      </View>
                    );
                  })}
                  {g.tip ? (
                    <View style={{ flexDirection: 'row', gap: 8, padding: 10, borderRadius: 12, backgroundColor: palette.goldSoft }}>
                      <Text>💡</Text>
                      <T v="small" color={t.text} style={{ flex: 1 }}>{g.tip}</T>
                    </View>
                  ) : null}
                  {g.bank || g.verbs ? (
                    <Button title="Praticar esta regra" small onPress={() => router.push({ pathname: '/practice/[mode]', params: g.verbs ? { mode: 'verbs' } : { mode: 'bank', key: g.bank } })} />
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </Screen>
  );
}
