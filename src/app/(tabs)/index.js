import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Animated, Easing } from 'react-native';
import { Alert } from '../../services/dialog';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, unitColors, palette, shadow } from '../../theme';
import { T, Card, Chip, Ring, Button, Tap, Sheet, ProgressBar } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck, { DuckAvatar, autoMood } from '../../components/Duck';
import { AudioButton, Appear } from '../../components/extras';
import { WeeklyChallengeCard, WeeklySummaryCard, WeeklyChestCard, WeeklyPlanCard } from '../../components/Weekly';
import { ShareSheet } from '../../components/ShareCard';
import { HomeTabs, Shortcuts, DailyPlanCard, MilestoneCard, NightCard, SundayCard, ExploreTab } from '../../components/Home';
import { avatarOf } from '../../services/photo';
import { UNITS, lessonState, unitProgress, nextLesson, LEVEL_INFO } from '../../content';
import { DAILY_PHRASES, CULTURE } from '../../content/extras';
import { STORY_LIST } from '../../content/stories';
import { goalXP, missionProgress, dueItems } from '../../store/logic';
import { dayKey } from '../../store/dates';
import { fx } from '../../services/feedback';

function dayIndex() {
  const d = new Date();
  return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
}

// ─── TRAIL NODE ───────────────────────────────────────────
function Node({ lesson, status, color, offset, onPress, needsReview, stars }) {
  const t = useTheme();
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (status !== 'current') return;
    const l = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    l.start();
    return () => l.stop();
  }, [status]);
  const done = status === 'done';
  const locked = status === 'locked';
  const bg = done ? palette.gold : locked ? t.surface3 : color.main;
  const ledge = done ? palette.goldDark : locked ? t.border : color.dark;
  const size = lesson.story ? 76 : 70;
  return (
    <View style={{ alignItems: 'center', transform: [{ translateX: offset }], marginVertical: 8 }}>
      {status === 'current' ? (
        <Animated.View style={{ position: 'absolute', top: -6, width: size + 18, height: size + 18, borderRadius: (size + 18) / 2, borderWidth: 4, borderColor: color.main, opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.7] }), transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.05] }) }] }} />
      ) : null}
      <Pressable onPress={onPress} accessibilityLabel={lesson.title}>
        {({ pressed }) => (
          <View style={{ width: size, height: size + 6 }}>
            <View style={{ position: 'absolute', bottom: 0, width: size, height: size, borderRadius: size / 2, backgroundColor: ledge }} />
            <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', transform: [{ translateY: pressed ? 5 : 0 }] }}>
              {locked ? <Icon name="lock" size={26} color={t.text3} stroke={2.4} /> : <Text style={{ fontSize: lesson.story ? 32 : 30 }}>{lesson.emoji}</Text>}
            </View>
          </View>
        )}
      </Pressable>
      {status === 'current' ? (
        <View style={{ position: 'absolute', top: -34, backgroundColor: color.main, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 12 }}>COMEÇAR</Text>
        </View>
      ) : null}
      {needsReview ? (
        <View style={{ position: 'absolute', right: -6, top: 0, backgroundColor: t.error, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 10 }}>REVISAR</Text>
        </View>
      ) : null}
      <T v="caption" center style={{ marginTop: 6, maxWidth: 140, color: locked ? t.text3 : t.text2 }} numberOfLines={1}>{lesson.title}</T>
      {done && stars ? <Text style={{ fontSize: 11, marginTop: 1 }}>{'⭐'.repeat(stars)}</Text> : null}
    </View>
  );
}

function ChestNode({ open, available, offset, onPress }) {
  const t = useTheme();
  return (
    <View style={{ alignItems: 'center', transform: [{ translateX: offset }], marginVertical: 6 }}>
      <Tap onPress={onPress} disabled={open} style={{ width: 64, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: open ? t.surface2 : available ? palette.goldSoft : t.surface2, borderWidth: 2, borderColor: available && !open ? palette.gold : t.border }}>
        <Text style={{ fontSize: 30, opacity: open ? 0.4 : available ? 1 : 0.55 }}>{open ? '📭' : '🎁'}</Text>
      </Tap>
    </View>
  );
}

export default function Learn() {
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const unitY = useRef({});
  const [reveal, setReveal] = useState(false);
  const [chest, setChest] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [homeTab, setHomeTab] = useState('hoje');
  const [lockedInfo, setLockedInfo] = useState(null);

  const next = useMemo(() => nextLesson(state), [state.lessons, state.unitTests, state.unlockedUnit]);
  const goal = goalXP(state.profile.dailyMinutes);
  const missions = missionProgress(state.daily);
  const allMissions = missions.every((m) => m.done);
  const phrase = DAILY_PHRASES[dayIndex() % DAILY_PHRASES.length];
  const due = useMemo(() => dueItems(state.srs, Date.now(), 200), [state.srs]);
  const nextStory = useMemo(() => STORY_LIST.find((s) => s.unit <= state.unlockedUnit && !state.stories?.[s.id]), [state.stories, state.unlockedUnit]);
  const dueByLesson = useMemo(() => {
    const m = {};
    due.forEach((d) => d.lessonId && (m[d.lessonId] = (m[d.lessonId] || 0) + 1));
    return m;
  }, [due]);
  const firstName = (state.profile.name || 'mon ami').split(' ')[0];
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

  useEffect(() => {
    const cur = next?.unit?.id;
    if (!cur || homeTab !== 'trilha') return;
    const id = setTimeout(() => {
      const y = unitY.current[cur];
      if (y && y > 400) scrollRef.current?.scrollTo({ y: y - 120, animated: true });
    }, 500);
    return () => clearTimeout(id);
  }, [homeTab]);

  const startNext = () => {
    if (!next) return;
    if (next.test) router.push({ pathname: '/practice/[mode]', params: { mode: 'test', unit: next.unit.id } });
    else router.push({ pathname: '/lesson/[id]', params: { id: next.lesson.id } });
  };

  const openChest = (id) => {
    const r = actions.openChest(id);
    fx.chest();
    setChest(r);
  };

  const offsets = [0, 60, 85, 60, 0, -60, -85, -60];

  const duckMood = autoMood('happy', state);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* HEADER */}
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: t.bg, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: t.border }}>
        <Pressable onPress={() => router.push('/(tabs)/perfil')}>
          <DuckAvatar size={42} photo={avatarOf(state)} mood={duckMood} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <T v="caption">{duckMood === 'worried' ? 'O Canard está preocupado… 😟' : duckMood === 'sad' ? 'O Canard sentiu sua falta 🥺' : duckMood === 'sleep' ? 'O Canard cochilou esperando… 💤' : greet + ','}</T>
          <T v="title" numberOfLines={1}>{firstName}!</T>
        </View>
        <Chip icon="flame" label={String(state.streak.count)} color={state.streak.lastDay === dayKey() ? palette.red : t.text3} bg={state.streak.lastDay === dayKey() ? palette.redSoft : t.surface2} big />
        <Chip icon="bolt" label={String(state.xp)} color={palette.goldDark} bg={palette.goldSoft} big />
        {state.settings.hearts ? <Chip icon="heart" label={String(state.hearts.count)} color={palette.coralDark} bg={palette.coralSoft} big /> : null}
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <HomeTabs value={homeTab} onChange={setHomeTab} />
        <View style={{ height: 14 }} />
        {homeTab === 'hoje' ? (
          <>
        {/* CHEERS & DUEL INVITES */}
        {(state.cheers || []).length ? (() => {
          const duelsIn = state.cheers.filter((c) => c.kind === 'duel');
          const cheers = state.cheers.filter((c) => c.kind !== 'duel');
          return (
            <Card style={{ marginBottom: 14, gap: 8 }} tone={t.skySoft} onPress={() => { actions.set({ cheers: [] }); if (duelsIn.length) router.push('/(tabs)/liga'); }}>
              {cheers.length ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Text style={{ fontSize: 28 }}>📣</Text>
                  <T v="bodyBold" style={{ flex: 1 }}>{[...new Set(cheers.map((c) => c.name))].join(', ')} mandou “Bon courage !” pra você</T>
                </View>
              ) : null}
              {duelsIn.length ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Text style={{ fontSize: 28 }}>⚔️</Text>
                  <T v="bodyBold" style={{ flex: 1 }}>{[...new Set(duelsIn.map((c) => c.name))].join(', ')} te desafiou para um duelo esta semana! Toque para ver.</T>
                </View>
              ) : null}
            </Card>
          );
        })() : null}

        {/* CONTINUE */}
        {next ? (
          <Appear delay={80}>
            <Tap onPress={startNext} style={[{ marginTop: 14, borderRadius: radius.xl, backgroundColor: unitColors[(next.unit.number - 1) % unitColors.length].main, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 14, overflow: 'hidden' }, shadow(t, 2)]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyHeavy, color: 'rgba(255,255,255,0.75)', fontSize: 12, letterSpacing: 1 }}>UNIDADE {next.unit.number} · {next.unit.level}</Text>
                <Text style={{ fontFamily: fonts.display, color: '#fff', fontSize: 24, marginTop: 2 }}>{next.test ? 'Teste da unidade' : next.lesson.title}</Text>
                <Text style={{ fontFamily: fonts.bodySemi, color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 2 }}>{next.test ? 'Passe com 80% para liberar a próxima unidade' : next.lesson.goal}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14, alignSelf: 'flex-start', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8 }}>
                  <Icon name="play" size={14} color={unitColors[(next.unit.number - 1) % unitColors.length].main} fill={unitColors[(next.unit.number - 1) % unitColors.length].main} />
                  <Text style={{ fontFamily: fonts.bodyHeavy, color: unitColors[(next.unit.number - 1) % unitColors.length].main, fontSize: 15 }}>{state.lastLessonId ? 'Continuar' : 'Começar'}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 64 }}>{next.test ? '🏆' : next.lesson.emoji}</Text>
            </Tap>
          </Appear>
        ) : (
          <Card style={{ marginTop: 16, alignItems: 'center', gap: 6 }}>
            <Duck mood="proud" size={100} />
            <T v="h3" center>Você completou todo o curso! 🎓</T>
            <T v="small" center>Continue revisando na aba Praticar para não esquecer.</T>
          </Card>
        )}

        <Shortcuts />
        {duckMood === 'worried' ? (
          <Appear delay={60}>
            <Tap onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'quick' } })} style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.xl, backgroundColor: t.mode === 'dark' ? '#3B2A12' : '#FFF4DC', borderWidth: 2, borderColor: palette.gold }}>
              <Duck size={74} mood="worried" />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="bodyBold">Ei… você ainda não praticou hoje!</T>
                <T v="small" color={t.text}>{state.streak.count > 0 ? `Seu streak de ${state.streak.count} dias está em risco. ` : ''}5 minutinhos e o Canard dorme tranquilo. 🙏</T>
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: palette.goldDark, marginTop: 2 }}>Fazer o treino de 5 min →</Text>
              </View>
            </Tap>
          </Appear>
        ) : null}

        {duckMood !== 'worried' && new Date().getHours() >= 21 && state.streak.lastDay === dayKey() ? <NightCard style={{ marginTop: 16 }} /> : null}
        <Appear delay={90}>
          <DailyPlanCard style={{ marginTop: 16 }} />
        </Appear>
        <SundayCard style={{ marginTop: 12 }} />
        {/* DAILY GOAL + MISSIONS */}
        <Appear delay={100}>
          <Card style={{ padding: 18, marginTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Ring value={state.daily.xp / goal} size={74} stroke={9} color={state.daily.goalHit ? t.success : palette.gold}>
                <Text style={{ fontSize: 26 }}>{state.daily.goalHit ? '✅' : '🎯'}</Text>
              </Ring>
              <View style={{ flex: 1 }}>
                <T v="label">Meta diária</T>
                <T v="h3">{Math.min(state.daily.xp, goal)} / {goal} XP</T>
                <T v="small">{state.daily.goalHit ? 'Meta cumprida! Streak garantido 🔥' : `Faltam ${goal - state.daily.xp} XP para o streak de hoje`}</T>
              </View>
            </View>
            {state.daily.xp > 0 ? (
              <Pressable onPress={() => setShareOpen(true)} hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', marginTop: 12, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 14, backgroundColor: t.skySoft }}>
                <Icon name="send" size={14} color={palette.navy} />
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: palette.navy }}>Compartilhar meu dia</Text>
              </Pressable>
            ) : null}
            <View style={{ height: 1, backgroundColor: t.border, marginVertical: 14 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <T v="bodyBold" style={{ flex: 1 }}>Missões do dia</T>
              <Tap
                onPress={() => {
                  if (state.daily.chestOpened) return;
                  if (!allMissions) return Alert.alert('Baú das missões', 'Complete as missões de hoje para abrir o baú! 🎁');
                  const r = actions.openDailyChest();
                  fx.chest();
                  setChest(r);
                }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: allMissions && !state.daily.chestOpened ? palette.goldSoft : t.surface2 }}
              >
                <Text style={{ fontSize: 18 }}>{state.daily.chestOpened ? '📭' : '🎁'}</Text>
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: allMissions && !state.daily.chestOpened ? palette.goldDark : t.text3 }}>{state.daily.chestOpened ? 'Aberto' : allMissions ? 'Abrir!' : 'Baú'}</Text>
              </Tap>
            </View>
            {missions.map((m) => (
              <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: m.done ? t.successSoft : t.surface2, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={m.done ? 'check' : m.icon} size={18} color={m.done ? t.success : t.primary} stroke={2.4} />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <T v="small" color={t.text}>{m.title}</T>
                  <ProgressBar value={m.value / m.target} height={8} color={m.done ? t.success : palette.gold} />
                </View>
                <T v="caption">{m.value}/{m.target}</T>
              </View>
            ))}
          </Card>
        </Appear>

        <MilestoneCard style={{ marginTop: 16 }} />
        {/* WEEKLY CHALLENGE + LAST WEEK */}
        <Appear delay={125}>
          <WeeklyChallengeCard style={{ marginTop: 16 }} />
          <WeeklyChestCard style={{ marginTop: 12 }} />
          {!state.settings.compactHome ? <WeeklyPlanCard style={{ marginTop: 12 }} /> : null}
          {!state.settings.compactHome && state.lastWeek && new Date().getDay() >= 1 && new Date().getDay() <= 2 ? <WeeklySummaryCard week={state.lastWeek} style={{ marginTop: 12 }} /> : null}
        </Appear>

        {!state.settings.compactHome ? (
          <>
        {/* PHRASE OF THE DAY */}
        <Appear delay={140}>
          <Card style={{ marginTop: 16, padding: 0, overflow: 'hidden' }}>
            <View style={{ backgroundColor: t.primary, paddingHorizontal: 18, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 18 }}>{phrase.emoji}</Text>
              <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 12, letterSpacing: 1.2, flex: 1 }}>FRASE DO DIA</Text>
              <Pressable onPress={() => actions.toggleSaved({ fr: phrase.fr, pt: phrase.meaning })} hitSlop={8}>
                <Icon name="bookmark" size={20} color="#fff" fill={state.saved.find((c) => c.fr === phrase.fr) ? '#fff' : 'none'} />
              </Pressable>
            </View>
            <View style={{ padding: 18, flexDirection: 'row', gap: 14, alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <T v="fr">{phrase.fr}</T>
                {reveal ? (
                  <>
                    <T v="small" style={{ marginTop: 6 }}>Literal: {phrase.pt}</T>
                    <T v="bodyBold" color={t.success} style={{ marginTop: 2 }}>💡 {phrase.meaning}</T>
                  </>
                ) : (
                  <Pressable onPress={() => setReveal(true)} style={{ marginTop: 8 }}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, color: t.sky }}>Toque para ver a tradução</Text>
                  </Pressable>
                )}
              </View>
              <AudioButton text={phrase.fr} size={48} />
            </View>
            <Pressable onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'wordquiz' } })} style={{ marginHorizontal: 18, marginBottom: 16, paddingVertical: 10, borderRadius: 12, alignItems: 'center', backgroundColor: state.daily.wordQuiz ? t.successSoft : t.skySoft }}>
              <Text style={{ fontFamily: fonts.bodyHeavy, color: state.daily.wordQuiz ? t.success : t.sky }}>{state.daily.wordQuiz ? '✓ Mini-quiz feito' : '🎯 Fazer o mini-quiz (3 perguntas)'}</Text>
            </Pressable>
          </Card>
        </Appear>
          </>
        ) : null}

          </>
        ) : null}

        {homeTab === 'explorar' ? <ExploreTab /> : null}

        {homeTab === 'trilha' ? (
          <>
        {/* TRAIL */}
        {UNITS.map((unit, ui) => {
          const color = unitColors[ui % unitColors.length];
          const prog = unitProgress(state, unit);
          const unitLocked = unit.number > state.unlockedUnit;
          const testAvailable = !unitLocked && prog.done === prog.total;
          const lessonsNodes = [];
          unit.lessons.forEach((l, li) => {
            const st = lessonState(state, unit, l);
            lessonsNodes.push(
              <Node
                key={l.id}
                lesson={l}
                status={st}
                color={color}
                offset={offsets[(li * 2) % offsets.length] * 0.9}
                stars={state.lessons[l.id]?.stars}
                needsReview={st === 'done' && (dueByLesson[l.id] || 0) >= 2}
                onPress={() => {
                  if (st === 'locked') return setLockedInfo(unitLocked ? `Passe no teste da unidade ${unit.number - 1} para liberar esta unidade — ou faça o teste para pular!` : 'Complete a lição anterior para liberar esta.');
                  router.push({ pathname: '/lesson/[id]', params: { id: l.id } });
                }}
              />
            );
            if (li === 2) {
              const cid = unit.id + '-c1';
              const avail = unit.lessons.slice(0, 3).every((x) => state.lessons[x.id]?.done);
              lessonsNodes.push(
                <ChestNode key={cid} open={!!state.chests[cid]} available={avail} offset={offsets[(li * 2 + 1) % offsets.length] * 0.9} onPress={() => (avail ? openChest(cid) : setLockedInfo('Complete as 3 primeiras lições da unidade para abrir este baú 🎁'))} />
              );
            }
          });
          const culture = CULTURE[ui % CULTURE.length];
          return (
            <View key={unit.id} onLayout={(e) => (unitY.current[unit.id] = e.nativeEvent.layout.y)} style={{ marginTop: 28 }}>
              <Tap onPress={() => router.push({ pathname: '/unit/[id]', params: { id: unit.id } })} style={[{ backgroundColor: unitLocked ? t.surface2 : color.main, borderRadius: radius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }, !unitLocked && shadow(t, 1)]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyHeavy, color: unitLocked ? t.text3 : 'rgba(255,255,255,0.8)', fontSize: 12, letterSpacing: 1 }}>
                    {LEVEL_INFO[unit.level].name.toUpperCase()} · UNIDADE {unit.number}
                  </Text>
                  <Text style={{ fontFamily: fonts.display, color: unitLocked ? t.text2 : '#fff', fontSize: 21 }}>{unit.title}</Text>
                  <Text style={{ fontFamily: fonts.bodySemi, color: unitLocked ? t.text3 : 'rgba(255,255,255,0.9)', fontSize: 13 }}>{unit.pt} · {prog.done}/{prog.total} lições</Text>
                </View>
                <View style={{ alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: unitLocked ? t.surface3 : 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                    {unitLocked ? <Icon name="lock" size={20} color={t.text3} /> : <Icon name="book" size={20} color="#fff" />}
                  </View>
                  <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 10, color: unitLocked ? t.text3 : '#fff' }}>GUIA</Text>
                </View>
              </Tap>
              <View style={{ paddingVertical: 16 }}>{lessonsNodes}</View>
              {/* unit test */}
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <Tap
                  onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'test', unit: unit.id } })}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 18, borderWidth: 2, borderBottomWidth: 4, borderColor: prog.tested ? palette.gold : testAvailable ? color.main : t.border, backgroundColor: prog.tested ? palette.goldSoft : t.surface }}
                >
                  <Text style={{ fontSize: 22 }}>{prog.tested ? '🏆' : '🎯'}</Text>
                  <View>
                    <T v="bodyBold">{prog.tested ? `Unidade concluída · ${state.unitTests[unit.id]}%` : 'Teste da unidade'}</T>
                    <T v="caption">{prog.tested ? 'Refazer para melhorar' : unitLocked ? 'Passe para pular direto pra cá' : testAvailable ? 'Pronto para o teste!' : 'Ou faça agora para pular'}</T>
                  </View>
                </Tap>
              </View>
              {/* culture note */}
              {!unitLocked ? (
                <Card style={{ marginTop: 18, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }} tone={t.surface}>
                  <Text style={{ fontSize: 30 }}>{culture.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <T v="label">Nota cultural</T>
                    <T v="bodyBold">{culture.title}</T>
                    <T v="small" style={{ marginTop: 4 }}>{culture.text.replace(/\*/g, '')}</T>
                  </View>
                </Card>
              ) : null}
            </View>
          );
        })}
          </>
        ) : null}
      <ShareSheet visible={shareOpen} onClose={() => setShareOpen(false)} initial="dia" />
      </ScrollView>

      <Sheet visible={!!lockedInfo} onClose={() => setLockedInfo(null)}>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Duck mood="think" size={90} />
          <T v="h3" center>Ainda bloqueado</T>
          <T v="body" center color={t.text2}>{lockedInfo}</T>
          <Button title="Entendi" onPress={() => setLockedInfo(null)} style={{ alignSelf: 'stretch', marginTop: 8 }} />
        </View>
      </Sheet>

      <Sheet visible={!!chest} onClose={() => setChest(null)}>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 64 }}>🎁</Text>
          <T v="h2" center>Baú aberto!</T>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Chip icon="bolt" label={`+${chest?.xp || 0} XP`} color={palette.goldDark} bg={palette.goldSoft} big />
            <Chip label={`+${chest?.coins || 0} 💶`} color={t.success} bg={t.successSoft} big />
            {chest?.freeze ? <Chip label="+1 🥐" color={t.sky} bg={t.skySoft} big /> : null}
          </View>
          {chest?.freeze ? <T v="small" center>Você ganhou um Croissant de reserva: ele protege seu streak se você perder um dia!</T> : null}
          <Button title="Oba!" onPress={() => setChest(null)} style={{ alignSelf: 'stretch', marginTop: 8 }} />
        </View>
      </Sheet>
    </View>
  );
}
