// Biblioteca: everything to read and listen to, in one place.
// Tabs: Histórias · Aventuras · Notícias · Música — with Fácil / Médio / Difícil and level locks.
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, unitColors } from '../theme';
import { T, Screen, Tap, Chip } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import TierTabs from '../components/TierTabs';
import { STORY_LIST, NEWS_LIST, storiesRead } from '../content/stories';
import { ADVENTURES } from '../content/adventures';
import { SONGS } from '../content/music';
import { SongList } from '../components/SongList';
import { TIERS, CEFR, tierOf, levelOpen, unlockAt, userLevel } from '../content/levels';
import { toast } from '../services/dialog';

const TABS = [
  ['stories', '📖', 'Histórias'],
  ['adventures', '🎮', 'Aventuras'],
  ['news', '📰', 'Notícias'],
  ['music', '🎵', 'Música'],
];
const TIER_TABS = TIERS.map((t) => ({ ...t, level: t.levels[0] }));

function Row({ emoji, color, title, sub, right, locked, lockText, onPress }) {
  const t = useTheme();
  return (
    <Tap onPress={() => (locked ? toast(lockText) : onPress())} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12, borderRadius: radius.lg, backgroundColor: locked ? t.surface2 : t.surface, borderWidth: 1, borderColor: t.border }}>
      <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: locked ? t.surface3 : color, alignItems: 'center', justifyContent: 'center' }}>
        {locked ? <Icon name="lock" size={20} color={t.text3} /> : <Text style={{ fontSize: 26 }}>{emoji}</Text>}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 17, color: locked ? t.text3 : t.text }}>{title}</Text>
        <T v="small">{sub}</T>
      </View>
      {right || (locked ? null : <Icon name="chevron" size={18} color={t.text3} />)}
    </Tap>
  );
}

const countBy = (list) => Object.fromEntries(TIER_TABS.map((x) => [x.id, list.filter((i) => tierOf(i.level).id === x.id).length]));

export default function Library() {
  const { tab: tabParam } = useLocalSearchParams();
  const { state } = useStore();
  const t = useTheme();
  const [tab, setTab] = useState(tabParam || 'stories');
  const [tier, setTier] = useState(() => tierOf(userLevel(state)).id);
  const filt = (list) => list.filter((i) => tierOf(i.level).id === tier).sort((a, b) => CEFR.indexOf(a.level) - CEFR.indexOf(b.level));

  return (
    <Screen title="Biblioteca">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Duck mood="teach" size={70} />
        <View style={{ flex: 1 }}>
          <T v="bodyBold">Ler e ouvir francês de verdade.</T>
          <T v="small">Seu nível: {userLevel(state)}. Você pode espiar um nível acima — os outros abrem conforme você avança.</T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12 }}>
        {TABS.map(([id, e, l]) => (
          <Tap key={id} onPress={() => setTab(id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: radius.lg, backgroundColor: tab === id ? t.primary : t.surface, borderWidth: 1, borderColor: tab === id ? t.primary : t.border }}>
            <Text style={{ fontSize: 20 }}>{e}</Text>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: tab === id ? '#fff' : t.text2 }}>{l}</Text>
          </Tap>
        ))}
      </View>

      {tab !== 'stories' ? (
        <TierTabs
          tiers={TIER_TABS}
          value={tier}
          onChange={setTier}
          counts={countBy(tab === 'news' ? NEWS_LIST : tab === 'music' ? SONGS : ADVENTURES)}
        />
      ) : null}
      <View style={{ height: 12 }} />

      {tab === 'stories' ? (
        <View style={{ gap: 10 }}>
          <T v="small">{storiesRead(state)}/{STORY_LIST.length} lidas · 3 histórias por unidade, liberadas junto com as lições.</T>
          {STORY_LIST.map((s) => {
            const locked = s.unit > state.unlockedUnit;
            const done = state.stories?.[s.id];
            return (
              <Row
                key={s.id}
                emoji={s.emoji}
                color={unitColors[(s.unit - 1) % unitColors.length].main}
                title={s.title}
                sub={locked ? `Libera na unidade ${s.unit}` : `${s.level} · ${s.pt}`}
                locked={locked}
                lockText={`🔒 Libera na unidade ${s.unit}`}
                right={done ? <Chip label={'★'.repeat(done.stars || 1)} color="#E0A526" /> : null}
                onPress={() => router.push({ pathname: '/story/[id]', params: { id: s.id } })}
              />
            );
          })}
        </View>
      ) : tab === 'adventures' ? (
        <View style={{ gap: 10 }}>
          {filt(ADVENTURES).map((a) => {
            const done = state.adventures?.[a.id];
            const locked = !levelOpen(a.level, state);
            return (
              <Row key={a.id} emoji={a.emoji} color="#7C5CFC" title={a.title} sub={`${a.level} · ${a.desc}`} locked={locked} lockText={`🔒 Libera no nível ${unlockAt(a.level)}`}
                right={done ? <Chip label={done.best ? '🌟' : '✓'} color={done.best ? '#E0A526' : t.success} /> : null}
                onPress={() => router.push({ pathname: '/adventure/[id]', params: { id: a.id } })} />
            );
          })}
          {!filt(ADVENTURES).length ? <T v="small" center>Novas aventuras deste nível chegam em breve!</T> : null}
        </View>
      ) : tab === 'news' ? (
        <View style={{ gap: 10 }}>
          {filt(NEWS_LIST).map((s) => {
            const done = state.stories?.[s.id];
            const locked = !levelOpen(s.level, state);
            return (
              <Row key={s.id} emoji={s.emoji} color="#0E7490" title={s.title} sub={`${s.level} · ${s.pt}`} locked={locked} lockText={`🔒 Libera no nível ${unlockAt(s.level)}`}
                right={done ? <Chip label={'★'.repeat(done.stars || 1)} color="#E0A526" /> : null}
                onPress={() => router.push({ pathname: '/story/[id]', params: { id: s.id } })} />
            );
          })}
        </View>
      ) : (
        <SongList tier={tier} />
      )}
    </Screen>
  );
}
