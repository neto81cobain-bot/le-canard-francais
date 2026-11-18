// Weekly themed challenge (with medal) + last week's summary (shareable).
import React, { useEffect, useState } from 'react';
import { View, Text, Share } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Card, ProgressBar, Button, Chip } from './ui';
import { weeklyProgress, weeklyChallenge, SHOP } from '../store/logic';
import { mondayKey, addDays, dayKey } from '../store/dates';
import { Alert } from '../services/dialog';
import { toast } from '../services/dialog';
import { fx } from '../services/feedback';
import { ShareSheet } from './ShareCard';

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
  const [open, setOpen] = useState(false);
  if (!week || !(week.xp || week.correct)) return null;
  const rows = summarize(week);
  const medal = state.medals?.[week.key];
  const ch = weeklyChallenge(week.key);
  const isNow = week.key === state.week?.key;
  const share = () => {
    if (isNow) return setOpen(true);
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
      <Button title={isNow ? 'Compartilhar imagem' : 'Compartilhar'} icon="send" small variant="secondary" onPress={share} />
      {isNow ? <ShareSheet visible={open} onClose={() => setOpen(false)} initial="semana" /> : null}
    </Card>
  );
}

export function activeDaysThisWeek(history) {
  const mon = mondayKey(dayKey());
  let n = 0;
  for (let i = 0; i < 7; i++) if ((history || {})[addDays(mon, i)] > 0) n++;
  return n;
}

// Surprise chest: unlocked by studying on 3 different days of the week.
export function WeeklyChestCard({ style }) {
  const { state, actions } = useStore();
  const t = useTheme();
  const days = activeDaysThisWeek(state.history);
  const opened = state.weekChest === state.week?.key;
  const ready = days >= 3 && !opened;
  if (opened) return null;
  const open = () => {
    const r = actions.openWeeklyChest();
    if (!r) return;
    fx.complete();
    const item = r.item && SHOP.find((x) => x.id === r.item);
    Alert.alert(item ? `${item.emoji} Item raro!` : '🎁 Baú da semana!', item ? `Você ganhou: ${item.title}! Vista o Canard na Loja. (+${r.coins} 💶, +${r.xp} XP)` : `+${r.coins} 💶 e +${r.xp} XP. Semana que vem tem mais!`);
  };
  return (
    <Card style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, style]} tone={ready ? palette.goldSoft : undefined}>
      <Text style={{ fontSize: 34, opacity: ready ? 1 : 0.5 }}>🎁</Text>
      <View style={{ flex: 1, gap: 4 }}>
        <T v="bodyBold">Baú surpresa da semana</T>
        <T v="small">{ready ? 'Pronto para abrir! Pode ter um item raro.' : `Estude em 3 dias diferentes da semana · ${days}/3`}</T>
        {!ready ? <ProgressBar value={days / 3} color={palette.gold} height={8} /> : null}
      </View>
      {ready ? <Button title="Abrir" small variant="gold" onPress={open} /> : null}
    </Card>
  );
}

// Study plan for the week: four goals, with extra weight on the weakest skill (placement test).
const PLAN = {
  lessons: { emoji: '📘', label: 'lições', base: 4 },
  listen: { emoji: '👂', label: 'acertos de escuta', base: 30, skill: 'listening' },
  written: { emoji: '✍️', label: 'frases escritas', base: 10, skill: 'grammar' },
  spoken: { emoji: '🗣️', label: 'frases faladas', base: 15, skill: 'speaking' },
  stories: { emoji: '📖', label: 'histórias', base: 2, skill: 'vocab' },
};
export function weeklyPlan(state) {
  const sk = state.placement?.skills || {};
  const weakest = Object.entries(sk).sort((a, b) => a[1] - b[1])[0]?.[0];
  return Object.entries(PLAN).map(([field, p]) => {
    const boost = p.skill && p.skill === weakest;
    const target = Math.round(p.base * (boost ? 1.6 : 1));
    const value = state.week?.[field] || 0;
    return { field, ...p, target, value, boost, done: value >= target };
  });
}

export function WeeklyPlanCard({ style }) {
  const { state } = useStore();
  const t = useTheme();
  const plan = weeklyPlan(state);
  const done = plan.filter((p) => p.done).length;
  return (
    <Card style={[{ gap: 8 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 20 }}>🗓️</Text>
        <T v="bodyBold" style={{ flex: 1 }}>Seu plano da semana</T>
        <Chip label={`${done}/${plan.length}`} color={done === plan.length ? t.success : t.text2} bg={done === plan.length ? t.successSoft : t.surface2} />
      </View>
      {plan.map((p) => (
        <View key={p.field} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 16, width: 22 }}>{p.done ? '✅' : p.emoji}</Text>
          <View style={{ flex: 1, gap: 3 }}>
            <T v="small" color={t.text}>{Math.min(p.value, p.target)}/{p.target} {p.label}{p.boost ? ' · foco 🎯' : ''}</T>
            <ProgressBar value={Math.min(1, p.value / p.target)} color={p.done ? t.success : p.boost ? palette.red : t.sky} height={6} />
          </View>
        </View>
      ))}
      {!state.placement ? <T v="caption">Faça o teste de nível para o plano focar no seu ponto fraco.</T> : null}
    </Card>
  );
}
