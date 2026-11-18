import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius } from '../theme';
import { Screen, T, Empty, ProgressBar } from '../components/ui';
import Icon from '../components/Icon';
import { genderColor } from '../content/vocab';
import { AudioButton } from '../components/extras';
import { strength } from '../store/logic';
import { router } from 'expo-router';
import { exportWords } from '../services/export';
import { toast, Alert } from '../services/dialog';

export default function Dictionary() {
  const { state } = useStore();
  const t = useTheme();
  const doExport = async () => {
    try {
      const n = await exportWords(state);
      if (!n) toast('Ainda não há palavras para exportar.');
    } catch (e) {
      Alert.alert('Não deu para exportar', e.message);
    }
  };
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const all = Object.entries(state.words).map(([fr, v]) => ({ fr, ...v, s: strength(state.srs['w:' + fr]) }));
    const f = q ? all.filter((w) => norm(w.fr).includes(norm(q)) || norm(w.pt).includes(norm(q))) : all;
    return f.sort((a, b) => a.fr.replace(/^(le |la |les |l'|un |une )/i, '').localeCompare(b.fr.replace(/^(le |la |les |l'|un |une )/i, ''), 'fr'));
  }, [q, state.words]);

  return (
    <Screen title="Meu dicionário" scroll={false} padded={false} right={<Pressable onPress={doExport} hitSlop={10} accessibilityLabel="Exportar"><Icon name="upload" size={22} color={t.text2} /></Pressable>}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.surface, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, paddingHorizontal: 14 }}>
          <Icon name="search" size={20} color={t.text3} />
          <TextInput value={q} onChangeText={setQ} placeholder="Buscar em francês ou português" placeholderTextColor={t.text3} style={{ flex: 1, paddingVertical: 12, fontFamily: fonts.bodySemi, fontSize: 16, color: t.text }} />
        </View>
        <T v="caption" style={{ marginTop: 8 }}>{list.length} palavras · a barra mostra a força da memória</T>
      </View>
      {!list.length ? (
        <Empty emoji="📖" title={q ? 'Nada encontrado' : 'Seu dicionário está vazio'} text={q ? '' : 'Cada palavra que você aprende nas lições aparece aqui, com áudio.'} action={q ? null : 'Começar uma lição'} onAction={() => router.replace('/(tabs)')} />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(w) => w.fr}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item: w }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: t.surface, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, padding: 12 }}>
              <Text style={{ fontSize: 26, width: 34, textAlign: 'center' }}>{w.emoji || '🔹'}</Text>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={{ fontFamily: fonts.displayItalic, fontSize: 17, color: genderColor(w.fr, t.text) }}>{w.fr}</Text>
                <T v="small">{w.pt}</T>
                <ProgressBar value={Math.max(0.05, w.s)} height={5} color={w.s > 0.6 ? t.success : w.s > 0.3 ? t.gold : t.error} />
              </View>
              <AudioButton text={w.fr} size={40} />
            </View>
          )}
        />
      )}
    </Screen>
  );
}
