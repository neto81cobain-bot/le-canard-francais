import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Chip, Button } from '../components/ui';
import Icon from '../components/Icon';
import { VERBS, MODEL_LABEL, VERB_LEVELS } from '../content/verbs';

const LEVEL_COLOR = { A1: '#2A9D8F', A2: '#D9822B', B1: '#7C5CFC', B2: '#E63946', C1: '#1E3A8A' };

export default function Verbs() {
  const t = useTheme();
  const [q, setQ] = useState('');
  const [lvl, setLvl] = useState(null);
  const [kind, setKind] = useState(null);
  const list = useMemo(() => {
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return VERBS.filter((v) => (!lvl || v.level === lvl) && (!kind || (kind === 'top' ? v.top : kind === 'refl' ? v.refl : v.m === kind)) && (!q || norm(v.inf).includes(norm(q)) || norm(v.pt).includes(norm(q))))
      .sort((a, b) => a.inf.replace(/^(se |s')/, '').localeCompare(b.inf.replace(/^(se |s')/, ''), 'fr'));
  }, [q, lvl, kind]);

  return (
    <Screen title="Conjugador" scroll={false} padded={false}>
      <View style={{ paddingHorizontal: 20, gap: 10, paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.surface, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, paddingHorizontal: 14 }}>
          <Icon name="search" size={20} color={t.text3} />
          <TextInput value={q} onChangeText={setQ} placeholder={`Buscar entre ${VERBS.length} verbos`} placeholderTextColor={t.text3} style={{ flex: 1, paddingVertical: 12, fontFamily: fonts.bodySemi, fontSize: 16, color: t.text }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {VERB_LEVELS.map((l) => (
            <Pressable key={l} onPress={() => setLvl(lvl === l ? null : l)}>
              <Chip label={l} big bg={lvl === l ? LEVEL_COLOR[l] : t.surface2} color={lvl === l ? '#fff' : t.text2} />
            </Pressable>
          ))}
          {[['top', '⭐ Essenciais'], ['irr', 'Irregulares'], ['refl', 'Pronominais']].map(([k, l]) => (
            <Pressable key={k} onPress={() => setKind(kind === k ? null : k)}>
              <Chip label={l} big bg={kind === k ? t.primary : t.surface2} color={kind === k ? '#fff' : t.text2} />
            </Pressable>
          ))}
        </View>
        <Button title="Treinar conjugação" icon="dumbbell" small onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'verbs', level: lvl || '' } })} />
      </View>
      <FlatList
        data={list}
        keyExtractor={(v) => v.inf}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item: v }) => (
          <Pressable onPress={() => router.push({ pathname: '/verb/[inf]', params: { inf: v.inf } })} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: t.surface, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, padding: 14 }}>
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: LEVEL_COLOR[v.level], alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 13 }}>{v.level}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, color: t.text }}>{v.inf}{v.top ? ' ⭐' : ''}</Text>
              <T v="small" numberOfLines={1}>{v.pt} · {MODEL_LABEL[v.m]}</T>
            </View>
            <Icon name="chevron" size={20} color={t.text3} />
          </Pressable>
        )}
      />
    </Screen>
  );
}
