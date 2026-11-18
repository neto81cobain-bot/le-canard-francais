// Song list with tiers and level locks (used by Música and Biblioteca).
import React, { useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { useStore } from '../store';
import { useTheme, radius, palette } from '../theme';
import { T, Chip, Button } from './ui';
import { AudioButton } from './extras';
import { SONGS } from '../content/music';
import { TIERS, tierOf, levelOpen, unlockAt } from '../content/levels';
import { toast } from '../services/dialog';
import { router } from 'expo-router';

export const SONG_TIERS = TIERS.map((t) => ({ ...t, level: t.levels[0] }));

export function SongList({ tier }) {
  const { state, actions } = useStore();
  const t = useTheme();
  const [open, setOpen] = useState(null);
  const listen = (s, where) => {
    const q = encodeURIComponent(`${s.title} ${s.artist}`);
    Linking.openURL(where === 'spotify' ? `https://open.spotify.com/search/${q}` : `https://www.youtube.com/results?search_query=${q}`).catch(() => {});
    actions.set((st) => ({ songs: { ...(st.songs || {}), [s.id]: Date.now() } }));
  };
  const list = SONGS.filter((s) => tier === 'all' || tierOf(s.level).id === tier);
  return (
    <View style={{ gap: 10 }}>
      {list.map((s) => {
        const locked = !levelOpen(s.level, state);
        const isOpen = open === s.id && !locked;
        const heard = state.songs?.[s.id];
        return (
          <View key={s.id} style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: isOpen ? t.primary : t.border, overflow: 'hidden', opacity: locked ? 0.6 : 1 }}>
            <Pressable onPress={() => (locked ? toast(`🔒 Libera quando você chegar ao nível ${unlockAt(s.level)}`) : setOpen(isOpen ? null : s.id))} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
              <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: locked ? t.surface3 : heard ? palette.green : '#C2417B', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22 }}>{locked ? '🔒' : heard ? '✓' : '🎵'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <T v="bodyBold">{s.title}</T>
                <T v="small">{s.artist}{s.year ? ` · ${s.year}` : ''}{state.songsTrained?.[s.id] != null ? ` · 🎯 ${state.songsTrained[s.id]}%` : ''}</T>
              </View>
              <Chip label={s.level} color={t.primary} bg={t.primarySoft} />
            </Pressable>
            {isOpen ? (
              <View style={{ paddingHorizontal: 14, paddingBottom: 14, gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 8, padding: 10, borderRadius: 12, backgroundColor: t.skySoft }}>
                  <Text>🎯</Text>
                  <T v="small" color={t.text} style={{ flex: 1 }}>{s.focus}</T>
                </View>
                <T v="label">Palavras-chave</T>
                {s.words.map((w) => {
                  const [fr, pt] = w.split('|');
                  return (
                    <View key={w} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <AudioButton text={fr} size={30} />
                      <T v="bodyBold" style={{ flex: 1 }}>{fr}</T>
                      <T v="small">{pt}</T>
                    </View>
                  );
                })}
                <View style={{ flexDirection: 'row', gap: 8, padding: 10, borderRadius: 12, backgroundColor: t.goldSoft }}>
                  <Text>💡</Text>
                  <T v="small" color={t.text} style={{ flex: 1 }}>{s.tip}</T>
                </View>
                <Button title="Treinar as palavras da música" icon="target" small color="#C2417B" onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'song', key: s.id } })} />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Button title="YouTube" icon="play" small style={{ flex: 1 }} color="#DC2626" onPress={() => listen(s, 'yt')} />
                  <Button title="Spotify" icon="play" small style={{ flex: 1 }} color="#1DB954" onPress={() => listen(s, 'spotify')} />
                </View>
              </View>
            ) : null}
          </View>
        );
      })}
      <T v="caption" center style={{ marginTop: 6 }}>As letras não ficam no app — ouça e leia no serviço de música de sua preferência.</T>
    </View>
  );
}

