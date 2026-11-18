import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette } from '../../theme';
import { T, Card, Stat, ProgressBar, Section, Row, Chip, Button } from '../../components/ui';
import { WeeklySummaryCard } from '../../components/Weekly';
import PhotoSheet from '../../components/PhotoSheet';
import SkillHistory from '../../components/SkillHistory';
import RuleStats from '../../components/RuleStats';
import Certificates from '../../components/Certificates';
import { avatarOf } from '../../services/photo';
import { weeklyChallenge } from '../../store/logic';
import { toast } from '../../services/dialog';
import Icon from '../../components/Icon';
import Duck, { DuckAvatar, autoMood } from '../../components/Duck';
import { levelInfo, ACHIEVEMENTS, LEAGUES, goalXP } from '../../store/logic';
import { lastNDays, weekdayOf, weekdayShort, dayKey } from '../../store/dates';
import { UNITS } from '../../content';

export default function Profile() {
  const { state } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const lvl = levelInfo(state.xp);
  const cefr = UNITS[Math.min(UNITS.length, state.unlockedUnit) - 1]?.level || 'A1';
  const days35 = useMemo(() => lastNDays(35), [state.history]);
  const days84 = useMemo(() => lastNDays(84), [state.history]);
  const active84 = days84.filter((d) => (state.history[d] || 0) > 0).length;
  const { actions } = useStore();
  const [photoOpen, setPhotoOpen] = useState(false);
  const days7 = useMemo(() => lastNDays(7), [state.history]);
  const maxXP = Math.max(20, ...days7.map((d) => state.history[d] || 0));
  const goal = goalXP(state.profile.dailyMinutes);
  const recent = Object.entries(state.achievements).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id]) => ACHIEVEMENTS.find((a) => a.id === id)).filter(Boolean);
  const joined = state.profile.joinedAt ? new Date(state.profile.joinedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '';
  const totalLessons = UNITS.reduce((s, u) => s + u.lessons.length, 0);
  const doneLessons = Object.values(state.lessons).filter((l) => l.done).length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* HERO */}
      <View style={{ backgroundColor: t.primary, paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 60, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pressable onPress={() => router.push('/settings')} hitSlop={10} style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Configurações">
            <Icon name="gear" size={22} color="#fff" />
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Pressable onPress={() => setPhotoOpen(true)} accessibilityLabel="Trocar foto" style={{ borderWidth: 4, borderColor: 'rgba(255,255,255,0.35)', borderRadius: 60 }}>
            <DuckAvatar size={96} photo={avatarOf(state)} mood={autoMood('happy', state)} />
            <View style={{ position: 'absolute', right: -4, bottom: -4, width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: t.primary }}>
              <Text style={{ fontSize: 15 }}>📷</Text>
            </View>
          </Pressable>
          <Text style={{ fontFamily: fonts.display, fontSize: 26, color: '#fff' }}>{state.profile.name || 'Aluno'}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Chip label={`Nível ${cefr}`} bg="rgba(255,255,255,0.18)" color="#fff" />
            <Chip label={`${LEAGUES[state.league.tier].emoji} ${LEAGUES[state.league.tier].name}`} bg="rgba(255,255,255,0.18)" color="#fff" />
          </View>
          {joined ? <Text style={{ fontFamily: fonts.bodySemi, color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Estudando desde {joined}</Text> : null}
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: -40 }}>
        {/* LEVEL */}
        <Card style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 36 }}>{lvl.emoji}</Text>
            <View style={{ flex: 1 }}>
              <T v="title">{lvl.name} <Text style={{ fontFamily: fonts.bodySemi, color: t.text3, fontSize: 14 }}>· {lvl.pt}</Text></T>
              <T v="small">{lvl.next ? `${lvl.toNext} XP para ${lvl.next.name}` : 'Nível máximo!'}</T>
            </View>
            <T v="num" color={palette.goldDark}>{state.xp}</T>
          </View>
          <ProgressBar value={lvl.progress} color={palette.gold} />
        </Card>

        {/* STATS */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          <Stat icon="flame" color={palette.red} value={state.streak.count} label="Streak atual" />
          <Stat icon="trophy" color={palette.gold} value={state.streak.best} label="Recorde" />
          <Stat icon="gem" color={t.success} value={state.coins} label="Euros 💶" />
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <Stat icon="book" color={t.sky} value={`${doneLessons}/${totalLessons}`} label="Lições" />
          <Stat icon="layers" color={palette.purple} value={Object.keys(state.words).length} label="Palavras" />
          <Stat icon="clock" color={t.text2} value={state.stats.minutes} label="Minutos" />
        </View>

        {/* STREAK CALENDAR */}
        <Section title="Calendário de streak" />
        <Card>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {[0, 1, 2, 3, 4, 5, 6].map((d) => <Text key={d} style={{ width: '14.28%', textAlign: 'center', fontFamily: fonts.bodyHeavy, fontSize: 11, color: t.text3 }}>{weekdayShort[(weekdayOf(days35[0]) + d) % 7]}</Text>)}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 6 }}>
            {days35.map((d) => {
              const xp = state.history[d] || 0;
              const hit = xp >= goal;
              const frozen = (state.streak.frozenDays || []).includes(d);
              const today = d === dayKey();
              return (
                <View key={d} style={{ width: '14.28%', alignItems: 'center' }}>
                <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: hit ? palette.red : frozen ? t.skySoft : xp > 0 ? palette.redSoft : t.surface2, borderWidth: today ? 2 : 0, borderColor: t.primary }}>
                  {hit ? <Icon name="flame" size={16} color="#fff" fill="#fff" /> : frozen ? <Text style={{ fontSize: 14 }}>🥐</Text> : <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: t.text3 }}>{parseInt(d.slice(-2), 10)}</Text>}
                </View>
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
            <T v="caption">🔥 meta cumprida</T>
            <T v="caption">🥐 protegido ({state.streak.freezes || 0} de reserva)</T>
          </View>
          <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />
          <T v="label">Últimas 12 semanas · {active84} dias ativos</T>
          <View style={{ flexDirection: 'row', gap: 3, marginTop: 8 }}>
            {Array.from({ length: 12 }).map((_, w) => (
              <View key={w} style={{ flex: 1, gap: 3 }}>
                {days84.slice(w * 7, w * 7 + 7).map((d) => {
                  const xp = state.history[d] || 0;
                  const lv = xp <= 0 ? 0 : xp < goal / 2 ? 1 : xp < goal ? 2 : xp < goal * 2 ? 3 : 4;
                  const bg = [t.surface2, palette.redSoft, '#F59E9E', palette.red, '#9B1C1C'][lv];
                  return <View key={d} style={{ aspectRatio: 1, borderRadius: 3, backgroundColor: bg }} />;
                })}
              </View>
            ))}
          </View>
          <Button
            title={`Comprar croissant de reserva · 60 💶 (você tem ${state.coins})`}
            small
            variant="secondary"
            style={{ marginTop: 12 }}
            disabled={state.coins < 60 || (state.streak.freezes || 0) >= 3}
            onPress={() => { actions.buyFreeze(60); toast('🥐 Croissant guardado! Seu streak está protegido por 1 dia.'); }}
          />
          {(state.streak.freezes || 0) >= 3 ? <T v="caption" style={{ marginTop: 4 }}>Máximo de 3 croissants guardados.</T> : null}
        </Card>

        {/* THIS WEEK + MEDALS */}
        {state.week?.xp || state.week?.correct ? (
          <>
            <Section title="Esta semana" />
            <WeeklySummaryCard week={state.week} title="Sua semana até agora" />
          </>
        ) : null}
        {Object.keys(state.medals || {}).length ? (
          <Card style={{ marginTop: 12 }}>
            <T v="label">Medalhas semanais</T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
              {Object.entries(state.medals).sort((a, b) => (a[0] < b[0] ? 1 : -1)).map(([wk, m]) => {
                const c = weeklyChallenge(wk);
                return (
                  <View key={wk} style={{ alignItems: 'center', width: 72 }}>
                    <Text style={{ fontSize: 30 }}>🏅</Text>
                    <T v="caption" center numberOfLines={2}>{c.emoji} {c.title.replace('Semana d', '').replace(/^[oa]s? /, '')}</T>
                    <T v="caption" center color={t.text3}>{wk.split('-')[1]}</T>
                  </View>
                );
              })}
            </View>
          </Card>
        ) : null}

        <Section title="Certificados" />
        <Certificates />

        <Section title="Evolução por habilidade" />
        <SkillHistory />
        <RuleStats style={{ marginTop: 14 }} />

        {/* WEEK CHART */}
        <Section title="XP nos últimos 7 dias" />
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 130, gap: 8 }}>
            {days7.map((d) => {
              const xp = state.history[d] || 0;
              return (
                <View key={d} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                  <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: t.text2 }}>{xp || ''}</Text>
                  <View style={{ width: '100%', height: Math.max(6, (xp / maxXP) * 90), borderRadius: 8, backgroundColor: xp >= goal ? t.success : xp ? t.sky : t.surface3 }} />
                  <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: d === dayKey() ? t.primary : t.text3 }}>{weekdayShort[weekdayOf(d)]}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ height: 1, backgroundColor: t.border, marginVertical: 10 }} />
          <T v="caption">Meta diária: {goal} XP ({state.profile.dailyMinutes} min)</T>
        </Card>

        {/* ACHIEVEMENTS */}
        <Section title="Conquistas recentes" action="Ver todas" onAction={() => router.push('/(tabs)/liga')} />
        {recent.length ? (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {recent.map((a) => (
              <View key={a.id} style={{ flex: 1, alignItems: 'center', padding: 10, borderRadius: radius.md, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
                <Text style={{ fontSize: 30 }}>{a.emoji}</Text>
                <T v="caption" center numberOfLines={2}>{a.title}</T>
              </View>
            ))}
          </View>
        ) : (
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Duck mood="think" size={60} />
            <T v="small" style={{ flex: 1 }}>Complete sua primeira lição para ganhar a primeira conquista!</T>
          </Card>
        )}

        {/* MENU */}
        <Card padded={false} style={{ marginTop: 20 }}>
          <Row icon="shop" iconBg={palette.goldSoft} iconColor={palette.goldDark} title="Loja do Canard" subtitle={`Você tem ${state.coins} 💶`} onPress={() => router.push('/shop')} />
          <Row icon="gear" title="Configurações" subtitle="Conta, meta, lembretes, aparência" onPress={() => router.push('/settings')} />
          <Row icon="heart" iconBg={palette.redSoft} iconColor={palette.red} title="Apoiar o projeto" subtitle="Ajude com um PIX de qualquer valor" onPress={() => router.push('/support')} last />
        </Card>
      </View>
      <PhotoSheet visible={photoOpen} onClose={() => setPhotoOpen(false)} />
    </ScrollView>
  );
}
