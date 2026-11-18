// Learn with French songs: focus, key words and a link to listen.
import React, { useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Chip, Button } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { AudioButton } from '../components/extras';
import { SONGS } from '../content/music';
import { tierOf } from '../content/levels';
import { SongList, SONG_TIERS } from '../components/SongList';
import TierTabs from '../components/TierTabs';
import { toast } from '../services/dialog';

export default function Music() {
  const [tier, setTier] = useState('facil');
  return (
    <Screen title="Música francesa">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Duck mood="listen" size={76} />
        <T v="bodyBold" style={{ flex: 1 }}>{SONGS.length} canções. Veja o que prestar atenção, aprenda as palavras-chave e ouça no app que preferir.</T>
      </View>
      <TierTabs tiers={SONG_TIERS} value={tier} onChange={setTier} counts={Object.fromEntries(SONG_TIERS.map((x) => [x.id, SONGS.filter((s) => tierOf(s.level).id === x.id).length]))} />
      <View style={{ height: 12 }} />
      <SongList tier={tier} />
    </Screen>
  );
}
