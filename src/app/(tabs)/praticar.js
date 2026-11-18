import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette, shadow } from '../../theme';
import { T, Card, Tap, Section, Chip } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck from '../../components/Duck';
import { Appear } from '../../components/extras';
import { dueItems } from '../../store/logic';
import { BANK_TOPICS } from '../../content';
import { VERBS } from '../../content/verbs';
import { STORY_LIST } from '../../content/stories';

function BigTile({ emoji, title, sub, color, onPress, badge }) {
  const t = useTheme();
  return (
    <Tap onPress={onPress} style={[{ flex: 1, minHeight: 150, borderRadius: radius.lg, padding: 16, backgroundColor: color, justifyContent: 'space-between' }, shadow(t, 1)]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 34 }}>{emoji}</Text>
        {badge ? (
          <View style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color, fontSize: 12 }}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <View>
        <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#fff' }}>{title}</Text>
        <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{sub}</Text>
      </View>
    </Tap>
  );
}

export default function Practice() {
  const { state } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const due = useMemo(() => dueItems(state.srs, Date.now(), 999).length, [state.srs]);
  const words = Object.keys(state.words).length;
  const go = (mode, params = {}) => router.push({ pathname: '/practice/[mode]', params: { mode, ...params } });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 16, paddingBottom: 50 }}>
      <T v="h1">Praticar</T>
      <T v="body" color={t.text2}>Revisar no momento certo é o que faz o francês ficar.</T>

      {/* SMART REVIEW HERO */}
      <Appear>
        <Tap onPress={() => go('review')} style={[{ marginTop: 20, borderRadius: radius.xl, backgroundColor: t.primary, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12 }, shadow(t, 2)]}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color: 'rgba(255,255,255,0.75)', fontSize: 12, letterSpacing: 1 }}>REVISÃO INTELIGENTE</Text>
            <Text style={{ fontFamily: fonts.display, color: '#fff', fontSize: 24, marginTop: 2 }}>{due ? `${due} itens para revisar` : 'Tudo em dia!'}</Text>
            <Text style={{ fontFamily: fonts.bodySemi, color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 2 }}>{due ? 'O Canard escolheu o que você está quase esquecendo' : 'Treine os itens mais fracos mesmo assim'}</Text>
          </View>
          <Duck mood="think" size={90} />
        </Tap>
      </Appear>

      <Section title="As 4 habilidades" />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <BigTile emoji="📖" title="Leitura" sub={`${Object.keys(state.stories || {}).length}/${STORY_LIST.length} histórias`} color="#7C5CFC" onPress={() => router.push('/stories')} />
        <BigTile emoji="👂" title="Escuta" sub="Sons parecidos e ditado" color="#0E7490" onPress={() => go('listening')} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
        <BigTile emoji="✍️" title="Escrita" sub="Escreva frases em francês" color={palette.green} onPress={() => go('writing')} />
        <BigTile emoji="🗣️" title="Pronúncia" sub="Grave e receba nota" color={palette.red} onPress={() => go('speaking')} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
        <BigTile emoji="🗂️" title="Vocabulário" sub="8 trilhas por assunto" color="#D9822B" onPress={() => router.push('/vocab')} />
        <BigTile emoji="📐" title="Gramática" sub="Regras de bolso" color="#1E3A8A" onPress={() => router.push('/grammar')} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
        <BigTile emoji="📝" title="Ditado longo" sub="Frases inteiras de ouvido" color="#0F766E" onPress={() => go('dictation')} />
        <BigTile emoji="🎧" title="Mapa de sons" sub="Treine som por som" color="#C2417B" onPress={() => router.push('/sounds')} />
      </View>
      <Tap onPress={() => router.push('/diary')} style={[{ marginTop: 12, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 2, borderColor: t.border, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }]}>
        <Text style={{ fontSize: 34 }}>📓</Text>
        <View style={{ flex: 1 }}>
          <T v="bodyBold">Diário em francês</T>
          <T v="small">Um tema por dia. Escreva e receba correção com explicação de cada erro.</T>
        </View>
        <Icon name="chevron" size={20} color={t.text3} />
      </Tap>

      <Section title="Revisar e desafiar" />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <BigTile emoji="🎯" title="Caderno de erros" sub="Separado por tipo" color={palette.coral} badge={state.mistakes.length ? String(state.mistakes.length) : null} onPress={() => router.push('/mistakes')} />
        <BigTile emoji="⏱️" title="Contra o relógio" sub={`Recorde: ${state.stats.timedBest}`} color={palette.goldDark} onPress={() => go('timed')} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
        <BigTile emoji="⚡" title="Desafio diário" sub={state.daily.challengeDone ? 'Concluído hoje ✓' : 'XP em dobro hoje'} color={palette.red} onPress={() => go('daily')} />
        <BigTile emoji="🃏" title="Flashcards" sub={`${words + state.saved.length} cartões`} color={palette.green} onPress={() => router.push('/flashcards')} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
        <BigTile emoji="📖" title="Conjugador" sub={`${VERBS.length} verbos · 10 tempos`} color={palette.purple} onPress={() => router.push('/verbs')} />
        <BigTile emoji="🔤" title="Treino de verbos" sub="Conjugue digitando" color="#0E7490" onPress={() => go('verbs')} />
      </View>

      <Section title="Ferramentas" />
      <Card padded={false}>
        {[
          { icon: 'book', bg: t.skySoft, color: t.sky, title: 'Meu dicionário', sub: `${words} palavras aprendidas`, to: '/dictionary' },
          { icon: 'swap', bg: palette.coralSoft, color: palette.coralDark, title: 'Falsos cognatos', sub: 'Palavras que enganam brasileiros', to: '/false-friends' },
          { icon: 'globe', bg: palette.goldSoft, color: palette.goldDark, title: 'Notas culturais', sub: 'Costumes e curiosidades da França', to: '/culture' },
          { icon: 'target', bg: t.primarySoft, color: t.primary, title: 'Teste de nível', sub: state.placement ? `Último: unidade ${state.placement.unit} · refazer` : 'Gramática, vocabulário, escuta e fala', to: '/placement' },
        ].map((r, i, a) => (
          <Tap key={r.title} onPress={() => router.push(r.to)} scaleTo={0.99} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderBottomWidth: i === a.length - 1 ? 0 : 1, borderBottomColor: t.border }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: r.bg, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={r.icon} size={22} color={r.color} />
            </View>
            <View style={{ flex: 1 }}>
              <T v="bodyBold">{r.title}</T>
              <T v="small">{r.sub}</T>
            </View>
            <Icon name="chevron" size={20} color={t.text3} />
          </Tap>
        ))}
      </Card>

      <Section title="Treino por tema" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {BANK_TOPICS.map((b) => (
          <Tap key={b.key} onPress={() => go('bank', { key: b.key })} style={{ width: '47%', flexGrow: 1, backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 14, gap: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: b.color, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22 }}>{b.emoji}</Text>
              </View>
              {state.bankBest[b.key] ? <Chip label={`${state.bankBest[b.key]}%`} color={b.color} /> : null}
            </View>
            <T v="bodyBold">{b.title}</T>
            <T v="caption">{b.sub}</T>
          </Tap>
        ))}
      </View>
    </ScrollView>
  );
}
