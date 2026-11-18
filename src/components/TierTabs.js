// Fácil / Médio / Difícil selector with locks based on the user's level.
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius } from '../theme';
import { levelOpen, unlockAt } from '../content/levels';
import { toast } from '../services/dialog';

// tiers: [{ id, label, emoji, level }]  (level = the lowest CEFR level of that tier)
export default function TierTabs({ tiers, value, onChange, counts = {}, allLabel }) {
  const { state } = useStore();
  const t = useTheme();
  const opts = allLabel ? [{ id: 'all', label: allLabel, emoji: '📚' }, ...tiers] : tiers;
  return (
    <View style={{ flexDirection: 'row', gap: 6, padding: 4, borderRadius: radius.lg, backgroundColor: t.surface2 }}>
      {opts.map((o) => {
        const open = !o.level || levelOpen(o.level, state);
        const on = value === o.id;
        return (
          <Pressable
            key={o.id}
            onPress={() => (open ? onChange(o.id) : toast(`🔒 ${o.label} libera quando você chegar ao nível ${unlockAt(o.level)}`))}
            style={{ flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: radius.md || 12, backgroundColor: on ? t.surface : 'transparent', opacity: open ? 1 : 0.55 }}
          >
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: on ? t.text : t.text2 }}>{open ? o.emoji : '🔒'} {o.label}</Text>
            {counts[o.id] != null ? <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: t.text3 }}>{counts[o.id]}</Text> : null}
          </Pressable>
        );
      })}
    </View>
  );
}
