// Praticar: organised in "drawers" (gavetas) that open and close — the app remembers which are open.
import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette, shadow } from '../../theme';
import { T, Tap, Chip } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import { Appear } from '../../components/extras';
import { dueItems } from '../../store/logic';
import { BANK_TOPICS } from '../../content';
import { VERBS } from '../../content/verbs';
import { STORY_LIST, NEWS_LIST, storiesRead } from '../../content/stories';
import { SONGS } from '../../content/music';
import { ADVENTURES } from '../../content/adventures';
import { VOCAB_THEMES } from '../../content/vocab';
import { GRAMMAR } from '../../content/grammar';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) UIManager.setLayoutAnimationEnabledExperimental(true);

function Tile({ emoji, title, sub, color, onPress, badge }) {
  const t = useTheme();
  return (
    <Tap onPress={onPress} style={{ width: '48%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
      <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 21 }}>{emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: t.text }}>{title}</Text>
        {sub ? <Text numberOfLines={1} style={{ fontFamily: fonts.bodySemi, fontSize: 12, color: t.text2 }}>{sub}</Text> : null}
      </View>
      {badge ? (
        <View style={{ position: 'absolute', top: -6, right: -4, minWidth: 22, height: 22, paddingHorizontal: 6, borderRadius: 11, backgroundColor: palette.red, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: '#fff' }}>{badge}</Text>
        </View>
      ) : null}
    </Tap>
  );
}

function Drawer({ id, emoji, title, sub, color, children }) {
  const { state, actions } = useStore();
  const t = useTheme();
  const open = (state.ui?.drawers || {})[id] ?? ['skills', 'library'].includes(id);
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    actions.set((s) => ({ ui: { ...(s.ui || {}), drawers: { ...((s.ui || {}).drawers || {}), [id]: !open } } }));
  };
  return (
    <View style={{ marginTop: 14, borderRadius: radius.xl, backgroundColor: t.surface2, overflow: 'hidden' }}>
      <Pressable onPress={toggle} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
        <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>{emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 18, color: t.text }}>{title}</Text>
          <T v="caption">{sub}</T>
        </View>
        <View style={{ transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
          <Icon name="chevron" size={20} color={t.text3} />
        </View>
      </Pressable>
      {open ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 12, paddingBottom: 14 }}>{children}</View> : null}
    </View>
  );
}

export default function Practice() {
  const { state } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const due = useMemo(() => dueItems(state.srs, Date.now(), 999).length, [state.srs]);
  const words = Object.keys(state.words).length;
  const go = (mode, params = {}) => router.push({ pathname: '/practice/[mode]', params: { mode, ...params } });
  const lib = (tab) => router.push({ pathname: '/library', params: { tab } });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 16, paddingBottom: 50 }}>
      <T v="h1">Praticar</T>
      <T v="body" color={t.text2}>Tudo organizado em gavetas — abra a que quiser.</T>

      {/* SMART REVIEW HERO */}
      <Appear>
        <Tap onPress={() => go('review')} style={[{ marginTop: 18, borderRadius: radius.xl, backgroundColor: t.primary, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 12 }, shadow(t, 2)]}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color: 'rgba(255,255,255,0.75)', fontSize: 12, letterSpacing: 1 }}>REVISÃO INTELIGENTE</Text>
            <Text style={{ fontFamily: fonts.display, color: '#fff', fontSize: 23, marginTop: 2 }}>{due ? `${due} itens para revisar` : 'Tudo em dia!'}</Text>
            <Text style={{ fontFamily: fonts.bodySemi, color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 2 }}>{due ? 'O que você está quase esquecendo' : 'Treine os itens mais fracos mesmo assim'}</Text>
          </View>
          <Duck mood="think" size={80} />
        </Tap>
      </Appear>

      {/* QUICK ROW */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
        {[
          { e: '⚡', l: '5 minutos', c: palette.gold, on: () => go('quick') },
          { e: '🎯', l: 'Meus erros', c: palette.coral, on: () => router.push('/mistakes'), b: state.mistakes.length },
          { e: '🔥', l: state.daily.challengeDone ? 'Feito ✓' : 'Desafio', c: palette.red, on: () => go('daily') },
        ].map((x) => (
          <Tap key={x.l} onPress={x.on} style={[{ flex: 1, alignItems: 'center', gap: 4, paddingVertical: 14, borderRadius: radius.lg, backgroundColor: x.c }, shadow(t, 1)]}>
            <Text style={{ fontSize: 24 }}>{x.e}</Text>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: '#fff' }}>{x.l}</Text>
            {x.b ? <View style={{ position: 'absolute', top: 6, right: 8, backgroundColor: '#fff', borderRadius: 9, paddingHorizontal: 6 }}><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: x.c }}>{x.b}</Text></View> : null}
          </Tap>
        ))}
      </View>

      <Drawer id="skills" emoji="🎯" title="As 4 habilidades" sub="Ler, ouvir, escrever e falar" color="#E8EEF9">
        <Tile emoji="👂" title="Escuta" sub="Pares de sons e ditado" color="#CFFAFE" onPress={() => go('listening')} />
        <Tile emoji="✍️" title="Escrita" sub="Frases em francês" color="#DCFCE7" onPress={() => go('writing')} />
        <Tile emoji="🗣️" title="Pronúncia" sub="Grave e receba nota" color="#FEE2E2" onPress={() => go('speaking')} />
        <Tile emoji="📝" title="Ditado longo" sub="Frases inteiras" color="#CCFBF1" onPress={() => go('dictation')} />
        <Tile emoji="🎧" title="Mapa de sons" sub="Som por som" color="#FCE7F3" onPress={() => router.push('/sounds')} />
        <Tile emoji="📓" title="Diário" sub="Escreva e seja corrigido" color="#FEF3C7" onPress={() => router.push('/diary')} />
      </Drawer>

      <Drawer id="library" emoji="📚" title="Biblioteca" sub="Histórias, aventuras, notícias e música" color="#EDE9FE">
        <Tile emoji="📖" title="Histórias" sub={`${storiesRead(state)}/${STORY_LIST.length} lidas`} color="#EDE9FE" onPress={() => lib('stories')} />
        <Tile emoji="🎮" title="Aventuras" sub={`${ADVENTURES.length} interativas`} color="#E0E7FF" onPress={() => lib('adventures')} />
        <Tile emoji="📰" title="Notícias fáceis" sub={`${NEWS_LIST.length} textos`} color="#CFFAFE" onPress={() => lib('news')} />
        <Tile emoji="🎵" title="Música" sub={`${SONGS.length} canções`} color="#FCE7F3" onPress={() => lib('music')} />
      </Drawer>

      <Drawer id="words" emoji="🔤" title="Vocabulário e gramática" sub="Palavras, regras e verbos" color="#FFEDD5">
        <Tile emoji="🗂️" title="Trilhas" sub={`${VOCAB_THEMES.length} assuntos`} color="#FFEDD5" onPress={() => router.push('/vocab')} />
        <Tile emoji="📐" title="Gramática" sub={`${GRAMMAR.length} regras de bolso`} color="#DBEAFE" onPress={() => router.push('/grammar')} />
        <Tile emoji="🃏" title="Flashcards" sub={`${words + state.saved.length} cartões`} color="#DCFCE7" onPress={() => router.push('/flashcards')} />
        <Tile emoji="📘" title="Dicionário" sub={`${words} palavras`} color="#E0F2FE" onPress={() => router.push('/dictionary')} />
        <Tile emoji="📖" title="Conjugador" sub={`${VERBS.length} verbos`} color="#EDE9FE" onPress={() => router.push('/verbs')} />
        <Tile emoji="🔁" title="Treino de verbos" sub="Conjugue digitando" color="#CFFAFE" onPress={() => go('verbs')} />
        <Tile emoji="🎭" title="Falsos cognatos" sub="Palavras que enganam" color="#FEE2E2" onPress={() => router.push('/false-friends')} />
      </Drawer>

      <Drawer id="review" emoji="🧠" title="Revisar e desafiar" sub="Memória, velocidade e recordes" color="#FEF3C7">
        <Tile emoji="🎯" title="Caderno de erros" sub="Separado por tipo" color="#FEE2E2" badge={state.mistakes.length || null} onPress={() => router.push('/mistakes')} />
        <Tile emoji="⏱️" title="Contra o relógio" sub={`Recorde: ${state.stats.timedBest}`} color="#FEF3C7" onPress={() => go('timed')} />
        <Tile emoji="🎧" title="Mãos-livres" sub="Revise só ouvindo" color="#E2E8F0" onPress={() => router.push('/handsfree')} />
        <Tile emoji="🔥" title="Desafio diário" sub={state.daily.challengeDone ? 'Feito hoje ✓' : 'XP em dobro'} color="#FFE4E6" onPress={() => go('daily')} />
      </Drawer>

      <Drawer id="real" emoji="🌍" title="Vida real" sub="Viagem, cultura e conversa" color="#DCFCE7">
        <Tile emoji="✈️" title="Modo viagem" sub="Frases por situação" color="#E0F2FE" onPress={() => router.push('/travel')} />
        <Tile emoji="🥖" title="Cultura" sub="Costumes da França" color="#FEF3C7" onPress={() => router.push('/culture')} />
        <Tile emoji="💬" title="Conversa" sub="Fale com o Canard" color="#FFE4E6" onPress={() => router.push('/(tabs)/falar')} />
        <Tile emoji="🩻" title="Teste de nível" sub={state.placement ? `Unidade ${state.placement.unit} · refazer` : 'Descubra seu nível'} color="#EDE9FE" onPress={() => router.push('/placement')} />
      </Drawer>

      <Drawer id="topics" emoji="🧩" title="Treino por tema" sub={`${BANK_TOPICS.length} temas de gramática`} color="#E0E7FF">
        {BANK_TOPICS.map((b) => (
          <Tile key={b.key} emoji={b.emoji} title={b.title} sub={state.bankBest[b.key] ? `Melhor: ${state.bankBest[b.key]}%` : b.level || b.sub} color={b.color + '33'} onPress={() => go('bank', { key: b.key })} />
        ))}
      </Drawer>
    </ScrollView>
  );
}
