// Weekly themed challenge (with medal) + last week's summary (shareable).
import React, { useEffect } from 'react';
import { View, Text, Share } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Card, ProgressBar, Button, Chip } from './ui';
import { weeklyProgress, weeklyChallenge } from '../store/logic';
import { toast } from '../services/dialog';
import { fx } from '../services/feedback';

export function WeeklyChallengeCard({ style }) {
  const { state, actions } = useStore();
  const t = useTheme();
  const p = weeklyProgress(state.week);
  const claimed = !!state.medals?.[state.week?.key];
  useEffect(() => {
    if (p.done && !claimed) {
      actions.claimMedal(p);
      fx.complete();
      toast(`🏅 Medalha da semana! +${p.coins} 💶`);
    }
  }, [p.done, claimed]);
  return (
    <Card style={[{ gap: 8 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 30 }}>{claimed ? '🏅' : p.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, letterSpacing: 1, color: palette.goldDark }}>DESAFIO DA SEMANA</Text>
          <T v="bodyBold">{p.title}</T>
          <T v="small">{p.desc}</T>
        </View>
        <Chip label={claimed ? 'Feito!' : `+${p.coins} 💶`} color={claimed ? t.success : palette.goldDark} bg={claimed ? t.successSoft : palette.goldSoft} />
      </View>
      <ProgressBar value={p.pct} color={claimed ? t.success : palette.gold} height={10} />
      <T v="caption">{Math.min(p.value, p.target)}/{p.target}{claimed ? ' · medalha garantida' : ''}</T>
    </Card>
  );
}

export function summarize(w) {
  if (!w) return null;
  return [
    ['⭐', 'XP', w.xp || 0],
    ['📘', 'Lições', w.lessons || 0],
    ['✅', 'Acertos', w.correct || 0],
    ['👂', 'Escuta', w.listen || 0],
    ['✍️', 'Frases escritas', w.written || 0],
    ['🗣️', 'Frases faladas', w.spoken || 0],
    ['📖', 'Histórias', w.stories || 0],
    ['⏱️', 'Minutos', w.minutes || 0],
  ];
}

export function WeeklySummaryCard({ week, title = 'Resumo da semana passada', style }) {
  const { state } = useStore();
  const t = useTheme();
  if (!week || !(week.xp || week.correct)) return null;
  const rows = summarize(week);
  const medal = state.medals?.[week.key];
  const ch = weeklyChallenge(week.key);
  const share = () => {
    const text = `🦆 Minha semana no Le canard français (${week.key}):\n` + rows.filter((r) => r[2]).map((r) => `${r[0]} ${r[1]}: ${r[2]}`).join('\n') + (medal ? `\n🏅 Medalha: ${ch.title}` : '') + `\n🔥 Streak: ${state.streak.count} dias\nBora aprender francês junto?`;
    Share.share({ message: text }).catch(() => {});
  };
  return (
    <Card style={[{ gap: 10 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 22 }}>📊</Text>
        <T v="bodyBold" style={{ flex: 1 }}>{title}</T>
        {medal ? <Text style={{ fontSize: 20 }}>🏅</Text> : null}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {rows.map(([e, l, v]) => (
          <View key={l} style={{ width: '23%', flexGrow: 1, alignItems: 'center', padding: 8, borderRadius: radius.md || 12, backgroundColor: t.bg }}>
            <Text style={{ fontSize: 18 }}>{e}</Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 18, color: t.text }}>{v}</Text>
            <T v="caption" center numberOfLines={1}>{l}</T>
          </View>
        ))}
      </View>
      <Button title="Compartilhar" icon="send" small variant="secondary" onPress={share} />
    </Card>
  );
}
