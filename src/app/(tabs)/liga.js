import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator, Alert, Share, RefreshControl } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette, shadow } from '../../theme';
import { T, Card, Button, Sheet, Empty } from '../../components/ui';
import Icon from '../../components/Icon';
import Duck, { DuckAvatar } from '../../components/Duck';
import { LEAGUES, ACHIEVEMENTS } from '../../store/logic';
import { msUntilWeekEnd } from '../../store/dates';
import { fetchLeague, friendCode, findFriend, fetchFriends, sendCheer } from '../../services/cloud';
import { signInWithGoogle } from '../../services/auth';

function Avatar({ photo, size = 40 }) {
  if (photo) return <Image source={{ uri: photo }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  return <DuckAvatar size={size} />;
}

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
  const [tab, setTab] = useState('liga');
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [friends, setFriends] = useState([]);
  const [code, setCode] = useState('');
  const [settle, setSettle] = useState(null);
  const league = LEAGUES[state.league.tier] || LEAGUES[0];
  const auth = state.auth;

  const load = useCallback(async () => {
    if (!auth) return;
    setLoading(true);
    setErr(null);
    try {
      const { auth: a, list: l } = await fetchLeague(auth, state.league.tier);
      if (a.idToken !== auth.idToken) actions.setAuth(a);
      // make sure "me" appears even before first sync
      const me = l.find((x) => x.uid === a.uid);
      const full = me ? l : [...l, { uid: a.uid, name: state.profile.name || a.name, photo: state.profile.photo || a.photo, xp: state.week.xp }].sort((x, y) => (y.xp || 0) - (x.xp || 0));
      setList(full);
      const rank = full.findIndex((x) => x.uid === a.uid) + 1;
      actions.set((s) => ({ league: { ...s.league, lastRank: rank, lastSize: full.length } }));
      if (state.friends.length) setFriends(await fetchFriends(a, state.friends.map((f) => f.uid)));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, [auth?.uid, state.league.tier]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  // Weekly result
  useEffect(() => {
    if (!state.league.needsResult) return;
    const { lastRank, lastSize } = state.league;
    let result = 'stay';
    if (lastRank && lastSize >= 3 && lastRank <= Math.min(5, Math.ceil(lastSize / 3))) result = 'up';
    else if (lastRank && lastSize >= 10 && lastRank > lastSize - 5) result = 'down';
    if (state.league.tier === 0 && result === 'down') result = 'stay';
    if (state.league.tier === LEAGUES.length - 1 && result === 'up') result = 'stay';
    setSettle({ result, rank: lastRank });
  }, [state.league.needsResult]);

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

  const header = (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View style={{ width: 86, height: 86, borderRadius: 26, backgroundColor: league.color, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }], ...shadow(t, 2) }}>
        <Text style={{ fontSize: 40, transform: [{ rotate: '-45deg' }] }}>{league.emoji}</Text>
      </View>
      <T v="h2" style={{ marginTop: 14 }}>Liga {league.name}</T>
      <T v="small">Termina em {days}d {hours}h · Top 5 sobem de liga</T>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
        {LEAGUES.map((l, i) => (
          <View key={l.id} style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: i <= state.league.tier ? l.color : t.surface3, alignItems: 'center', justifyContent: 'center', opacity: i === state.league.tier ? 1 : 0.7 }}>
            <Text style={{ fontSize: 12 }}>{i <= state.league.tier ? l.emoji : '🔒'}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLeague = () => {
    if (!auth) {
      return (
        <Card style={{ marginTop: 20, alignItems: 'center', gap: 10 }}>
          <Duck mood="proud" size={100} />
          <T v="h3" center>Compita com outros alunos</T>
          <T v="body" center color={t.text2}>Entre com sua conta Google para participar das ligas semanais e adicionar amigos.</T>
          <Button title="Entrar com Google" icon="cloud" onPress={login} style={{ alignSelf: 'stretch', marginTop: 6 }} />
        </Card>
      );
    }
    if (loading && !list) return <ActivityIndicator style={{ marginTop: 40 }} color={t.primary} />;
    if (err && !list) return <Empty emoji="📡" title="Sem conexão com o ranking" text={err} action="Tentar de novo" onAction={load} />;
    const l = list || [];
    const podium = l.slice(0, 3);
    return (
      <View style={{ marginTop: 18 }}>
        {podium.length >= 2 ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            {[1, 0, 2].map((pi) => {
              const p = podium[pi];
              if (!p) return <View key={pi} style={{ flex: 1 }} />;
              const h = [110, 80, 60][pi];
              const medal = ['🥇', '🥈', '🥉'][pi];
              return (
                <View key={p.uid} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                  <Avatar photo={p.photo} size={pi === 0 ? 62 : 50} />
                  <T v="caption" numberOfLines={1} center>{(p.name || '').split(' ')[0]}</T>
                  <View style={{ alignSelf: 'stretch', height: h, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: pi === 0 ? palette.gold : pi === 1 ? '#B8C0CC' : '#D59A6A', alignItems: 'center', paddingTop: 8 }}>
                    <Text style={{ fontSize: 22 }}>{medal}</Text>
                    <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 13 }}>{p.xp || 0} XP</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
        <Card padded={false}>
          {l.map((p, i) => {
            const me = p.uid === auth.uid;
            const promo = i < 5 && l.length >= 3;
            const demote = l.length >= 10 && i >= l.length - 5;
            return (
              <View key={p.uid}>
                {i === 5 && l.length > 5 ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: t.successSoft }}><Icon name="chevron" size={14} color={t.success} style={{ transform: [{ rotate: '-90deg' }] }} /><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: t.success }}>ZONA DE PROMOÇÃO ACIMA</Text></View> : null}
                {demote && i === l.length - 5 ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: t.errorSoft }}><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: t.error }}>ZONA DE REBAIXAMENTO</Text></View> : null}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: me ? t.skySoft : 'transparent', borderBottomWidth: 1, borderBottomColor: t.border }}>
                  <Text style={{ width: 24, fontFamily: fonts.bodyHeavy, fontSize: 15, color: promo ? t.success : demote ? t.error : t.text3, textAlign: 'center' }}>{i + 1}</Text>
                  <Avatar photo={p.photo} size={40} />
                  <View style={{ flex: 1 }}>
                    <T v="bodyBold" numberOfLines={1}>{p.name || 'Aluno'}{me ? ' (você)' : ''}</T>
                    {p.streak ? <T v="caption">🔥 {p.streak} dias</T> : null}
                  </View>
                  <Text style={{ fontFamily: fonts.bodyHeavy, color: t.text, fontSize: 15 }}>{p.xp || 0} XP</Text>
                </View>
              </View>
            );
          })}
        </Card>
        {l.length < 3 ? <T v="small" center style={{ marginTop: 12 }}>Poucos alunos nesta liga por enquanto. Convide amigos para competir! 🦆</T> : null}
      </View>
    );
  };

  const addFriend = async () => {
    try {
      const f = await findFriend(auth, code);
      actions.addFriend({ uid: f.uid, name: f.name });
      setFriends((x) => [...x.filter((y) => y.uid !== f.uid), f]);
      setCode('');
      Alert.alert('Amigo adicionado!', `${f.name} agora está na sua lista. 🤝`);
    } catch (e) {
      Alert.alert('Ops', e.message);
    }
  };

  const renderFriends = () => {
    if (!auth) return renderLeague();
    return (
      <View style={{ marginTop: 18, gap: 14 }}>
        <Card style={{ gap: 10 }}>
          <T v="label">Seu código de amigo</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 26, letterSpacing: 3, color: t.primary }}>{myCode}</Text>
            <Pressable onPress={() => { Clipboard.setStringAsync(myCode); Alert.alert('Copiado!'); }} hitSlop={8}><Icon name="copy" size={22} color={t.text2} /></Pressable>
            <Pressable onPress={() => Share.share({ message: `Vamos aprender francês juntos no Le Canard Français! 🦆 Meu código de amigo: ${myCode}` })} hitSlop={8}><Icon name="send" size={22} color={t.text2} /></Pressable>
          </View>
        </Card>
        <Card style={{ gap: 10 }}>
          <T v="label">Adicionar amigo</T>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput value={code} onChangeText={(x) => setCode(x.toUpperCase())} placeholder="CÓDIGO" placeholderTextColor={t.text3} autoCapitalize="characters" maxLength={8} style={{ flex: 1, backgroundColor: t.bg, borderRadius: 12, paddingHorizontal: 14, fontFamily: fonts.bodyHeavy, fontSize: 18, letterSpacing: 2, color: t.text }} />
            <Button title="Adicionar" small onPress={addFriend} disabled={code.length < 6} />
          </View>
        </Card>
        {friends.length ? (
          <Card padded={false}>
            {friends.map((f, i) => (
              <View key={f.uid} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: i === friends.length - 1 ? 0 : 1, borderBottomColor: t.border }}>
                <Avatar photo={f.photo} size={44} />
                <View style={{ flex: 1 }}>
                  <T v="bodyBold">{f.name}</T>
                  <T v="caption">🔥 {f.streak || 0} dias · {f.weekXP || 0} XP na semana · {LEAGUES[f.tier || 0].emoji} {LEAGUES[f.tier || 0].name}</T>
                </View>
                <Pressable
                  onPress={async () => {
                    try { await sendCheer(auth, f.uid, state.profile.name || auth.name); Alert.alert('Enviado!', `${f.name} vai receber seu “Bon courage !” 💪`); } catch (e) { Alert.alert('Erro', e.message); }
                  }}
                  style={{ paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: t.skySoft }}
                >
                  <Text style={{ fontSize: 18 }}>💪</Text>
                </Pressable>
                <Pressable onPress={() => Alert.alert('Remover amigo?', f.name, [{ text: 'Cancelar' }, { text: 'Remover', style: 'destructive', onPress: () => { actions.removeFriend(f.uid); setFriends((x) => x.filter((y) => y.uid !== f.uid)); } }])} hitSlop={8}>
                  <Icon name="close" size={18} color={t.text3} />
                </Pressable>
              </View>
            ))}
          </Card>
        ) : (
          <Empty emoji="🤝" title="Nenhum amigo ainda" text="Compartilhe seu código e estudem juntos — é mais fácil manter o streak com companhia!" />
        )}
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
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: insets.top + 20, paddingBottom: 50 }} refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}>
        {header}
        <Segmented value={tab} onChange={setTab} items={[['liga', 'Ranking'], ['amigos', 'Amigos'], ['conquistas', 'Conquistas']]} />
        {tab === 'liga' ? renderLeague() : tab === 'amigos' ? renderFriends() : renderAchievements()}
      </ScrollView>
      <Sheet visible={!!settle} onClose={() => { actions.settleLeague(settle.result); setSettle(null); }}>
        {settle ? (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Duck mood={settle.result === 'up' ? 'celebrate' : settle.result === 'down' ? 'comfort' : 'happy'} size={100} />
            <T v="h2" center>{settle.result === 'up' ? 'Você subiu de liga! 📈' : settle.result === 'down' ? 'Você caiu de liga' : 'Semana encerrada'}</T>
            <T v="body" center color={t.text2}>
              {settle.rank ? `Você terminou em ${settle.rank}º lugar. ` : ''}
              {settle.result === 'up' ? `Bem-vindo à liga ${LEAGUES[Math.min(LEAGUES.length - 1, state.league.tier + 1)].name}!` : settle.result === 'down' ? 'Nada de desanimar — essa semana você volta!' : 'Você continua na mesma liga. Bora subir essa semana?'}
            </T>
            <Button title="Continuar" onPress={() => { actions.settleLeague(settle.result); setSettle(null); }} style={{ alignSelf: 'stretch', marginTop: 6 }} />
          </View>
        ) : null}
      </Sheet>
    </View>
  );
}
