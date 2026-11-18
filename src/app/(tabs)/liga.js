import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useKeyboardOverlap, scrollFocusedIntoView } from '../../components/keyboard';
import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator, Share, RefreshControl } from 'react-native';
import { Alert } from '../../services/dialog';
import { isNetworkError, markOffline } from '../../services/net';
import { avatarOf } from '../../services/photo';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette, shadow } from '../../theme';
import { T, Card, Button, Sheet, Empty, ProgressBar } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck, { DuckAvatar } from '../../components/Duck';
import { LEAGUES, ACHIEVEMENTS, goalXP } from '../../store/logic';
import { msUntilWeekEnd, dayKey, addDays, weekKey, mondayKey } from '../../store/dates';
import { friendCode, findFriend, fetchFriends, sendCheer, sendDuel } from '../../services/cloud';
import { signInWithGoogle } from '../../services/auth';

const DUEL_THEMES = {
  xp: { label: 'XP', emoji: '⚡', unit: 'XP' },
  listen: { label: 'Escuta', emoji: '👂', unit: 'acertos' },
  written: { label: 'Escrita', emoji: '✍️', unit: 'frases' },
  verbs: { label: 'Verbos', emoji: '🔁', unit: 'verbos' },
  spoken: { label: 'Fala', emoji: '🗣️', unit: 'frases' },
  stories: { label: 'Leitura', emoji: '📖', unit: 'histórias' },
};
const myScore = (state, theme, weekXP) => (theme && theme !== 'xp' ? state.week?.[theme] || 0 : weekXP);
const theirScore = (f, theme, wk) => (f.week !== wk ? 0 : theme && theme !== 'xp' ? f.wk?.[theme] || 0 : f.weekXP || 0);

function Avatar({ photo, wear, size = 40, me }) {
  if (photo) return <Image source={{ uri: photo }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  return <DuckAvatar size={size} outfit={me ? undefined : wear || null} />;
}


// ─── Personal divisions: you race against a weekly target and your own past weeks ──
const TIER_FACTOR = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
export function weekTarget(tier, minutes) {
  return Math.round((goalXP(minutes) * 7 * TIER_FACTOR[tier || 0]) / 5) * 5;
}
function weekDaysFrom(monday) {
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}
const sumDays = (history, days) => days.reduce((a, k) => a + (history[k] || 0), 0);
function bestWeek(history) {
  const by = {};
  Object.entries(history || {}).forEach(([k, v]) => {
    const [y, m, d] = k.split('-').map(Number);
    const wk = weekKey(new Date(y, m - 1, d));
    by[wk] = (by[wk] || 0) + (v || 0);
  });
  return Math.max(0, ...Object.values(by));
}
const DAY_LABELS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

function Segmented({ value, onChange, items }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', backgroundColor: t.surface2, borderRadius: 14, padding: 4, marginTop: 14 }}>
      {items.map(([k, l]) => (
        <Pressable key={k} onPress={() => onChange(k)} style={{ flex: 1, paddingVertical: 9, borderRadius: 11, alignItems: 'center', backgroundColor: value === k ? t.surface : 'transparent' }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: value === k ? t.text : t.text3 }}>{l}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function League() {
  const { state, actions } = useStore();
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('semana');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [friends, setFriends] = useState(() => state.friendsCache || []);
  const [code, setCode] = useState('');
  const [settle, setSettle] = useState(null);
  const wrapRef = useRef(null);
  const svRef = useRef(null);
  const svOff = useRef(0);
  const kbPad = useKeyboardOverlap(wrapRef, (kbTop) => scrollFocusedIntoView(svRef, svOff, kbTop));
  const tier = state.league.tier || 0;
  const league = LEAGUES[tier] || LEAGUES[0];
  const auth = state.auth;
  const minutes = state.profile.dailyMinutes;
  const target = weekTarget(tier, minutes);

  const today = dayKey();
  const thisMon = mondayKey(today);
  const thisDays = weekDaysFrom(thisMon);
  const lastDays = weekDaysFrom(addDays(thisMon, -7));
  const weekXP = sumDays(state.history || {}, thisDays);
  const lastXP = sumDays(state.history || {}, lastDays);
  const record = bestWeek(state.history);
  const todayIdx = thisDays.indexOf(today);
  const lastSoFar = sumDays(state.history || {}, lastDays.slice(0, todayIdx + 1));

  const loadFriends = useCallback(async () => {
    if (!auth || !state.friends.length) return;
    setLoading(true);
    setErr(null);
    try {
      const fs = await fetchFriends(auth, state.friends.map((f) => f.uid));
      actions.set({ friendsCache: fs });
      setFriends(fs);
      const wk = weekKey();
      actions.set((s) => ({
        duels: (s.duels || []).map((d) => {
          const f = fs.find((x) => x.uid === d.uid);
          return f && d.week === wk && f.week === wk ? { ...d, theirXP: Math.max(d.theirXP || 0, theirScore(f, d.theme, wk)), name: f.name || d.name } : d;
        }),
      }));
    } catch (e) {
      if (isNetworkError(e)) { markOffline(); setErr('offline'); } else setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, [auth?.uid, state.friends.length]);

  useFocusEffect(useCallback(() => { loadFriends(); }, [loadFriends]));

  // Finished duels (from past weeks)
  useEffect(() => {
    const wk = weekKey();
    const old = (state.duels || []).filter((d) => d.week !== wk);
    if (!old.length) return;
    let won = 0;
    const lines = old.map((d) => {
      const pastWeek = [...(state.weeks || []), state.lastWeek].find((w) => w && w.key === d.week);
      const mine = d.theme && d.theme !== 'xp' ? pastWeek?.[d.theme] || 0 : sumDays(state.history || {}, weekDaysFrom(d.mon || addDays(thisMon, -7)));
      const win = mine > (d.theirXP || 0);
      if (win) won++;
      return `${win ? '🏆' : mine === (d.theirXP || 0) ? '🤝' : '💪'} Você ${mine} × ${d.theirXP || 0} ${d.name}`;
    });
    actions.set((s) => ({
      duels: (s.duels || []).filter((d) => d.week === wk),
      coins: (s.coins || 0) + won * 50,
      stats: { ...s.stats, duelsWon: (s.stats.duelsWon || 0) + won },
    }));
    Alert.alert('Resultado dos duelos ⚔️', lines.join('\n') + (won ? `\n\n+${won * 50} 💶 pelas vitórias!` : '\n\nEssa semana tem revanche!'));
  }, []);

  const challenge = (f) => {
    const wk = weekKey();
    if ((state.duels || []).find((d) => d.uid === f.uid && d.week === wk)) return Alert.alert('Duelo em andamento', `Você já está duelando com ${f.name} esta semana.`);
    Alert.alert(`Desafiar ${f.name} ⚔️`, 'Escolha o tema do duelo desta semana:', [
      ...['xp', 'listen', 'written', 'spoken'].map((k) => ({ text: `${DUEL_THEMES[k].emoji} ${DUEL_THEMES[k].label}`, onPress: () => sendChallenge(f, k) })),
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };
  const sendChallenge = async (f, theme) => {
    const wk = weekKey();
    try {
      await sendDuel(auth, f.uid, state.profile.name || auth.name, wk, theme);
      actions.set((s) => ({ duels: [...(s.duels || []), { uid: f.uid, name: f.name, week: wk, mon: thisMon, theme, theirXP: theirScore(f, theme, wk), status: 'active', invitedBy: 'me' }] }));
      const th = DUEL_THEMES[theme];
      Alert.alert('Desafio enviado! ⚔️', `Duelo de ${th.label}: quem fizer mais ${th.unit} até domingo vence e ganha 50 💶. Boa sorte contra ${f.name}!`);
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  };

  // Weekly result: did you hit last week's target?
  useEffect(() => {
    if (!state.league.needsResult) return;
    const prevMon = addDays(thisMon, -7);
    const xp = sumDays(state.history || {}, weekDaysFrom(prevMon));
    const tgt = weekTarget(tier, minutes);
    let result = 'stay';
    if (xp >= tgt) result = 'up';
    else if (xp < tgt * 0.3) result = 'down';
    if (tier === 0 && result === 'down') result = 'stay';
    if (tier === LEAGUES.length - 1 && result === 'up') result = 'stay';
    setSettle({ result, xp, target: tgt, top: tier === LEAGUES.length - 1 && xp >= tgt });
  }, [state.league.needsResult]);

  const closeSettle = () => {
    if (!settle) return;
    actions.settleLeague(settle.result);
    if (settle.result === 'up' || settle.top) actions.set((s) => ({ coins: (s.coins || 0) + 30 }));
    setSettle(null);
  };

  const login = async () => {
    try {
      const a = await signInWithGoogle();
      actions.setAuth(a);
    } catch (e) {
      if (e.message !== 'cancelado') Alert.alert('Erro no login', e.message);
    }
  };

  const ms = msUntilWeekEnd();
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const myCode = auth ? friendCode(auth.uid) : '';
  const pct = Math.min(1, weekXP / Math.max(1, target));

  const header = (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View style={{ width: 86, height: 86, borderRadius: 26, backgroundColor: league.color, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }], ...shadow(t, 2) }}>
        <Text style={{ fontSize: 40, transform: [{ rotate: '-45deg' }] }}>{league.emoji}</Text>
      </View>
      <T v="h2" style={{ marginTop: 14 }}>Divisão {league.name}</T>
      <T v="small" center>Bata a meta da semana para subir · termina em {days}d {hours}h</T>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
        {LEAGUES.map((l, i) => (
          <View key={l.id} style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: i <= tier ? l.color : t.surface3, alignItems: 'center', justifyContent: 'center', opacity: i === tier ? 1 : 0.7 }}>
            <Text style={{ fontSize: 12 }}>{i <= tier ? l.emoji : '🔒'}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderWeek = () => {
    const max = Math.max(1, ...thisDays.map((k) => state.history?.[k] || 0), ...lastDays.map((k) => state.history?.[k] || 0));
    const diff = weekXP - lastSoFar;
    return (
      <View style={{ marginTop: 18, gap: 14 }}>
        <Card style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <T v="label">Meta da semana</T>
              <Text style={{ fontFamily: fonts.display, fontSize: 30, color: t.text }}>{weekXP}<Text style={{ fontSize: 18, color: t.text3 }}> / {target} XP</Text></Text>
            </View>
            <Text style={{ fontSize: 34 }}>{pct >= 1 ? '🏆' : pct >= 0.5 ? '🔥' : '🎯'}</Text>
          </View>
          <ProgressBar value={pct} height={16} color={pct >= 1 ? t.success : league.color} />
          <T v="small">
            {pct >= 1
              ? tier === LEAGUES.length - 1 ? 'Meta batida! Você está na divisão máxima — +30 💶 no fim da semana.' : `Meta batida! Você sobe para ${LEAGUES[tier + 1].name} na segunda-feira. 🎉`
              : `Faltam ${target - weekXP} XP para subir de divisão. Abaixo de ${Math.round(target * 0.3)} XP você desce.`}
          </T>
        </Card>

        <Card style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <T v="h3">Você vs. semana passada</T>
            <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, backgroundColor: diff >= 0 ? t.successSoft : t.errorSoft }}>
              <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: diff >= 0 ? t.success : t.error }}>{diff >= 0 ? '+' : ''}{diff} XP</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120, paddingTop: 6 }}>
            {thisDays.map((k, i) => {
              const a = state.history?.[k] || 0;
              const b = state.history?.[lastDays[i]] || 0;
              const future = i > todayIdx;
              return (
                <View key={k} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 92 }}>
                    <View style={{ width: 9, height: Math.max(3, (b / max) * 90), borderRadius: 5, backgroundColor: t.surface3 }} />
                    <View style={{ width: 13, height: Math.max(3, (a / max) * 90), borderRadius: 6, backgroundColor: future ? 'transparent' : a === 0 ? t.surface3 : a >= b ? t.success : league.color }} />
                  </View>
                  <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: i === todayIdx ? t.primary : t.text3 }}>{DAY_LABELS[i]}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.success }} /><T v="caption">Esta semana ({weekXP})</T></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.surface3 }} /><T v="caption">Passada ({lastXP})</T></View>
          </View>
        </Card>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Card style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <Text style={{ fontSize: 24 }}>🏅</Text>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 20, color: t.text }}>{record}</Text>
            <T v="caption" center>Recorde semanal</T>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <Text style={{ fontSize: 24 }}>📅</Text>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 20, color: t.text }}>{thisDays.filter((k) => (state.history?.[k] || 0) > 0).length}/7</Text>
            <T v="caption" center>Dias ativos</T>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <Text style={{ fontSize: 24 }}>{weekXP > record - 1 && weekXP > 0 ? '🚀' : '⚡'}</Text>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 20, color: t.text }}>{Math.max(0, record - weekXP)}</Text>
            <T v="caption" center>XP p/ recorde</T>
          </Card>
        </View>

        <Card onPress={() => setTab('amigos')} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }} tone={t.skySoft}>
            <Text style={{ fontSize: 30 }}>🤝</Text>
            <View style={{ flex: 1 }}>
              <T v="bodyBold">Estude com gente de verdade</T>
              <T v="small">Convide amigos com seu código e vejam quem faz mais XP na semana.</T>
            </View>
            <Icon name="chevron" size={18} color={t.text3} />
        </Card>
      </View>
    );
  };

  const addFriend = async () => {
    try {
      const f = await findFriend(auth, code);
      actions.addFriend({ uid: f.uid, name: f.name });
      setFriends((x) => [...x.filter((y) => y.uid !== f.uid), f]);
      setCode('');
      Alert.alert('Amigo adicionado!', `${f.name} agora está no seu clube. 🤝`);
    } catch (e) {
      Alert.alert('Ops', e.message);
    }
  };

  const renderFriends = () => {
    if (!auth) {
      return (
        <Card style={{ marginTop: 20, alignItems: 'center', gap: 10 }}>
          <Duck mood="proud" size={100} />
          <T v="h3" center>Seu clube de estudos</T>
          <T v="body" center color={t.text2}>Entre com Google para ganhar um código, adicionar amigos de verdade e disputar o XP da semana com eles.</T>
          <Button title="Entrar com Google" icon="cloud" onPress={login} style={{ alignSelf: 'stretch', marginTop: 6 }} />
        </Card>
      );
    }
    const wk = weekKey();
    const duels = (state.duels || []).filter((d) => d.week === wk);
    const me = { uid: auth.uid, name: state.profile.name || auth.name, photo: avatarOf(state), weekXP, streak: state.streak.count, me: true };
    const ranking = [me, ...friends.map((f) => ({ ...f, weekXP: f.week === wk ? f.weekXP || 0 : 0 }))].sort((a, b) => (b.weekXP || 0) - (a.weekXP || 0));
    const podium = ranking.slice(0, 3);
    return (
      <View style={{ marginTop: 18, gap: 14 }}>
        {ranking.length >= 2 ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
            {[1, 0, 2].map((pi) => {
              const p = podium[pi];
              if (!p) return <View key={pi} style={{ flex: 1 }} />;
              const h = [110, 80, 60][pi];
              return (
                <View key={p.uid} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                  <Avatar photo={p.photo} wear={p.wear} me={p.me} size={pi === 0 ? 62 : 50} />
                  <T v="caption" numberOfLines={1} center>{p.me ? 'Você' : (p.name || '').split(' ')[0]}</T>
                  <View style={{ alignSelf: 'stretch', height: h, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: pi === 0 ? palette.gold : pi === 1 ? '#B8C0CC' : '#D59A6A', alignItems: 'center', paddingTop: 8 }}>
                    <Text style={{ fontSize: 22 }}>{['🥇', '🥈', '🥉'][pi]}</Text>
                    <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 13 }}>{p.weekXP || 0} XP</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}

        {duels.length ? (
          <View style={{ gap: 10 }}>
            {duels.map((d) => {
              const th = DUEL_THEMES[d.theme || 'xp'] || DUEL_THEMES.xp;
              const mine = myScore(state, d.theme, weekXP);
              const total = Math.max(1, mine + (d.theirXP || 0));
              const ahead = mine >= (d.theirXP || 0);
              return (
                <Card key={d.uid} style={{ gap: 8 }} tone={ahead ? t.successSoft : palette.coralSoft}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 22 }}>⚔️</Text>
                    <T v="bodyBold" style={{ flex: 1 }}>Duelo de {th.emoji} {th.label} com {d.name}</T>
                    <T v="caption">até domingo</T>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 18, color: t.success }}>Você {mine}</Text>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 18, color: palette.coralDark }}>{d.theirXP || 0} {(d.name || '').split(' ')[0]}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', backgroundColor: t.surface2 }}>
                    <View style={{ flex: mine / total || 0.5, backgroundColor: t.success }} />
                    <View style={{ flex: (d.theirXP || 0) / total || 0.5, backgroundColor: palette.coral }} />
                  </View>
                  <T v="small">{ahead ? 'Você está na frente! Não deixe virar. 🔥' : `Faltam ${(d.theirXP || 0) - mine + 1} ${th.unit} para virar o jogo!`}</T>
                </Card>
              );
            })}
          </View>
        ) : null}

        {friends.length ? (
          <Card padded={false}>
            {ranking.map((f, i) => (
              <View key={f.uid} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: f.me ? t.skySoft : 'transparent', borderBottomWidth: i === ranking.length - 1 ? 0 : 1, borderBottomColor: t.border }}>
                <Text style={{ width: 22, fontFamily: fonts.bodyHeavy, fontSize: 15, color: t.text3, textAlign: 'center' }}>{i + 1}</Text>
                <Avatar photo={f.photo} wear={f.wear} me={f.me} size={42} />
                <View style={{ flex: 1 }}>
                  <T v="bodyBold" numberOfLines={1}>{f.me ? `${f.name} (você)` : f.name}</T>
                  <T v="caption">{f.weekXP || 0} XP na semana · 🔥 {f.streak || 0}{!f.me && f.tier != null ? ` · ${LEAGUES[f.tier || 0].emoji}` : ''}</T>
                </View>
                {!f.me ? (
                  <>
                    <Pressable onPress={() => challenge(f)} style={{ paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: t.surface2 }}>
                      <Text style={{ fontSize: 18 }}>⚔️</Text>
                    </Pressable>
                    <Pressable
                      onPress={async () => {
                        try { await sendCheer(auth, f.uid, state.profile.name || auth.name); Alert.alert('Enviado!', `${f.name} vai receber seu “Bon courage !” 💪`); } catch (e) { Alert.alert('Erro', e.message); }
                      }}
                      style={{ paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: t.surface2 }}
                    >
                      <Text style={{ fontSize: 18 }}>💪</Text>
                    </Pressable>
                    <Pressable onPress={() => Alert.alert('Remover amigo?', f.name, [{ text: 'Cancelar' }, { text: 'Remover', style: 'destructive', onPress: () => { actions.removeFriend(f.uid); setFriends((x) => x.filter((y) => y.uid !== f.uid)); } }])} hitSlop={8}>
                      <Icon name="close" size={18} color={t.text3} />
                    </Pressable>
                  </>
                ) : null}
              </View>
            ))}
          </Card>
        ) : loading ? (
          <ActivityIndicator style={{ marginTop: 10 }} color={t.primary} />
        ) : (
          <Empty emoji="🤝" title="Seu clube está vazio" text="Mande seu código para alguém que também quer aprender francês. Vocês vão ver o XP um do outro, trocar incentivos e se desafiar em duelos semanais ⚔️." />
        )}
        {err === 'offline' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: t.surface2 }}>
            <Text>📡</Text>
            <T v="caption">Offline · mostrando o último placar salvo</T>
          </View>
        ) : err ? <T v="small" center color={t.error}>Não deu para atualizar os amigos: {err}</T> : null}

        <Card style={{ gap: 10 }}>
          <T v="label">Seu código de amigo</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 26, letterSpacing: 3, color: t.primary }}>{myCode}</Text>
            <Pressable onPress={() => { Clipboard.setStringAsync(myCode); Alert.alert('Copiado!'); }} hitSlop={8}><Icon name="copy" size={22} color={t.text2} /></Pressable>
            <Pressable onPress={() => Share.share({ message: `Bora aprender francês juntos no Le Canard Français? 🦆🇫🇷 Me adiciona no Clube com o código: ${myCode}` })} hitSlop={8}><Icon name="send" size={22} color={t.text2} /></Pressable>
          </View>
        </Card>
        <Card style={{ gap: 10 }}>
          <T v="label">Adicionar amigo</T>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput value={code} onChangeText={(x) => setCode(x.toUpperCase())} placeholder="CÓDIGO" placeholderTextColor={t.text3} autoCapitalize="characters" maxLength={8} style={{ flex: 1, backgroundColor: t.bg, borderRadius: 12, paddingHorizontal: 14, fontFamily: fonts.bodyHeavy, fontSize: 18, letterSpacing: 2, color: t.text }} />
            <Button title="Adicionar" small onPress={addFriend} disabled={code.length < 6} />
          </View>
        </Card>
      </View>
    );
  };

  const renderAchievements = () => (
    <View style={{ marginTop: 18 }}>
      <T v="small" style={{ marginBottom: 12 }}>{Object.keys(state.achievements).length} de {ACHIEVEMENTS.length} conquistas · cada uma vale +20 💶</T>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {ACHIEVEMENTS.map((a) => {
          const got = !!state.achievements[a.id];
          return (
            <View key={a.id} style={{ width: '31%', flexGrow: 1, alignItems: 'center', padding: 12, borderRadius: radius.lg, backgroundColor: got ? t.surface : t.surface2, borderWidth: 2, borderColor: got ? palette.gold : t.border, gap: 4 }}>
              <Text style={{ fontSize: 34, opacity: got ? 1 : 0.25 }}>{a.emoji}</Text>
              <T v="caption" center color={got ? t.text : t.text3} numberOfLines={2}>{a.title}</T>
              <Text style={{ fontFamily: fonts.bodySemi, fontSize: 10.5, color: t.text3, textAlign: 'center' }} numberOfLines={2}>{a.desc}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View ref={wrapRef} style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView ref={svRef} onScroll={(e) => { svOff.current = e.nativeEvent.contentOffset.y; }} scrollEventThrottle={32} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingTop: insets.top + 20, paddingBottom: 50 + kbPad }} refreshControl={<RefreshControl refreshing={loading} onRefresh={loadFriends} />}>
        {header}
        <Segmented value={tab} onChange={setTab} items={[['semana', 'Semana'], ['amigos', 'Amigos'], ['conquistas', 'Conquistas']]} />
        {tab === 'semana' ? renderWeek() : tab === 'amigos' ? renderFriends() : renderAchievements()}
      </ScrollView>
      <Sheet visible={!!settle} onClose={closeSettle}>
        {settle ? (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Duck mood={settle.result === 'up' || settle.top ? 'celebrate' : settle.result === 'down' ? 'comfort' : 'happy'} size={100} />
            <T v="h2" center>{settle.result === 'up' ? 'Você subiu de divisão! 📈' : settle.top ? 'Meta batida no topo! 🗼' : settle.result === 'down' ? 'Você desceu de divisão' : 'Semana encerrada'}</T>
            <T v="body" center color={t.text2}>
              {`Você fez ${settle.xp} de ${settle.target} XP. `}
              {settle.result === 'up' ? `Bem-vindo à divisão ${LEAGUES[Math.min(LEAGUES.length - 1, tier + 1)].name}! +30 💶` : settle.top ? '+30 💶 pela semana perfeita.' : settle.result === 'down' ? 'Sem drama — a meta nova é menor. Você volta logo!' : 'Continua na mesma divisão. Bora bater a meta essa semana?'}
            </T>
            <Button title="Continuar" onPress={closeSettle} style={{ alignSelf: 'stretch', marginTop: 6 }} />
          </View>
        ) : null}
      </Sheet>
    </View>
  );
}
