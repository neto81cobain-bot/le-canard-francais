import React, { useState } from 'react';
import { View, Text, Switch, Pressable, TextInput, Alert, Share, ActivityIndicator, Linking } from 'react-native';
import { router } from 'expo-router';
import { useStore, getStateSnapshotForCloud } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Card, Button, Row, Sheet, Chip } from '../components/ui';
import Icon from '../components/Icon';
import Duck, { DuckAvatar } from '../components/Duck';
import { signInWithGoogle } from '../services/auth';
import { pushProgress, fetchBackup, fetchLegacy } from '../services/cloud';
import { checkForUpdates, applyOta, openApk, updateInfo } from '../services/updates';
import { CONFIG } from '../services/config';
import { scheduleReminders } from '../services/notifications';

function Group({ title, children }) {
  const t = useTheme();
  return (
    <View style={{ marginTop: 22 }}>
      <T v="label" style={{ marginBottom: 8, marginLeft: 4 }}>{title}</T>
      <Card padded={false}>{children}</Card>
    </View>
  );
}

function Toggle({ icon, title, subtitle, value, onChange, last }) {
  const t = useTheme();
  return (
    <Row icon={icon} title={title} subtitle={subtitle} last={last} right={<Switch value={!!value} onValueChange={onChange} trackColor={{ true: t.success, false: t.surface3 }} thumbColor="#fff" />} />
  );
}

function Choice({ options, value, onChange }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 8, padding: 14, paddingTop: 0, flexWrap: 'wrap' }}>
      {options.map(([v, l]) => (
        <Pressable key={String(v)} onPress={() => onChange(v)} style={{ flexGrow: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 2, borderColor: value === v ? t.sky : t.border, backgroundColor: value === v ? t.skySoft : t.surface }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, color: value === v ? (t.mode === 'dark' ? '#fff' : palette.navy) : t.text2, fontSize: 14 }}>{l}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function Settings() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [name, setName] = useState(state.profile.name);
  const [busy, setBusy] = useState(null);
  const [update, setUpdate] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [adv, setAdv] = useState(false);
  const [apiUrl, setApiUrl] = useState(state.settings.apiUrl);
  const [groq, setGroq] = useState(state.settings.ownGroqKey);
  const info = updateInfo();
  const s = state.settings;
  const p = state.profile;

  const login = async () => {
    setBusy('login');
    try {
      const a = await signInWithGoogle();
      actions.setAuth(a);
      const { backup } = await fetchBackup(a).catch(() => ({}));
      if (backup?.state && (backup.state.xp || 0) > state.xp) {
        Alert.alert('Progresso na nuvem', `Encontramos um backup com ${backup.state.xp} XP. Restaurar?`, [
          { text: 'Agora não' },
          { text: 'Restaurar', onPress: () => actions.mergeCloud({ state: backup.state }) },
        ]);
      } else {
        const legacy = await fetchLegacy(a);
        if (legacy?.xp > state.xp) {
          actions.mergeCloud(legacy);
          Alert.alert('Bem-vindo de volta!', `Recuperamos seus ${legacy.xp} XP da versão anterior. 🦆`);
        }
      }
    } catch (e) {
      if (e.message !== 'cancelado') Alert.alert('Não foi possível entrar', e.message);
    } finally {
      setBusy(null);
    }
  };

  const syncNow = async () => {
    setBusy('sync');
    try {
      const a = await pushProgress(state.auth, state, getStateSnapshotForCloud(state));
      actions.setAuth(a);
      Alert.alert('Sincronizado!', 'Seu progresso está salvo na nuvem. ☁️');
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setBusy(null);
    }
  };

  const doCheck = async () => {
    setBusy('update');
    try {
      const r = await checkForUpdates();
      setUpdate(r);
    } finally {
      setBusy(null);
    }
  };

  const setReminder = (patch) => {
    const reminder = { ...p.reminder, ...patch };
    actions.setProfile({ reminder });
  };

  return (
    <Screen title="Configurações">
      {/* ACCOUNT */}
      <Group title="Conta e sincronização">
        {state.auth ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 }}>
              <DuckAvatar size={48} photo={state.auth.photo} />
              <View style={{ flex: 1 }}>
                <T v="bodyBold">{state.auth.name}</T>
                <T v="small" numberOfLines={1}>{state.auth.email}</T>
              </View>
              <Chip label="Online" color={t.success} bg={t.successSoft} />
            </View>
            <Row icon="cloud" title="Sincronizar agora" subtitle="Salva todo o progresso na nuvem" onPress={syncNow} right={busy === 'sync' ? <ActivityIndicator color={t.primary} /> : undefined} />
            <Row icon="logout" iconColor={t.error} title="Sair da conta" onPress={() => Alert.alert('Sair?', 'Seu progresso continua salvo neste aparelho.', [{ text: 'Cancelar' }, { text: 'Sair', style: 'destructive', onPress: () => actions.setAuth(null) }])} last />
          </>
        ) : (
          <View style={{ padding: 16, gap: 10 }}>
            <T v="small">Entre para salvar seu progresso na nuvem, participar das ligas e ter amigos.</T>
            <Button title="Entrar com Google" icon="cloud" onPress={login} loading={busy === 'login'} />
          </View>
        )}
      </Group>

      {/* PROFILE */}
      <Group title="Perfil">
        <View style={{ padding: 16, gap: 10 }}>
          <T v="caption">Seu nome</T>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput value={name} onChangeText={setName} style={{ flex: 1, backgroundColor: t.bg, borderRadius: 12, paddingHorizontal: 14, fontFamily: fonts.bodyBold, fontSize: 16, color: t.text, borderWidth: 1, borderColor: t.border }} />
            <Button title="Salvar" small onPress={() => { actions.setProfile({ name: name.trim() }); Alert.alert('Salvo!'); }} disabled={!name.trim() || name === p.name} />
          </View>
        </View>
      </Group>

      {/* GOAL */}
      <Group title="Meta diária">
        <View style={{ paddingTop: 14 }}>
          <Choice options={[[5, '5 min'], [10, '10 min'], [15, '15 min'], [20, '20 min']]} value={p.dailyMinutes} onChange={(v) => actions.setProfile({ dailyMinutes: v })} />
        </View>
      </Group>

      {/* REMINDERS */}
      <Group title="Lembretes">
        <Toggle icon="bell" title="Lembrete diário" subtitle={p.reminder?.enabled ? `Todo dia às ${String(p.reminder.hour).padStart(2, '0')}:${String(p.reminder.minute).padStart(2, '0')}` : 'Desligado'} value={p.reminder?.enabled} onChange={(v) => setReminder({ enabled: v })} />
        {p.reminder?.enabled ? (
          <View style={{ paddingTop: 12 }}>
            <Choice options={[['8:0', '08:00'], ['12:30', '12:30'], ['19:0', '19:00'], ['21:30', '21:30']]} value={`${p.reminder.hour}:${p.reminder.minute}`} onChange={(v) => { const [h, m] = v.split(':').map(Number); setReminder({ hour: h, minute: m }); }} />
          </View>
        ) : null}
        <Toggle icon="flame" title="Alerta de streak em risco" subtitle="Às 21h, se você ainda não estudou" value={s.notifStreak} onChange={(v) => actions.setSettings({ notifStreak: v })} last />
      </Group>

      {/* LEARNING */}
      <Group title="Aprendizado">
        <Toggle icon="volume" title="Áudio automático" subtitle="Toca a frase em francês sozinho" value={s.autoAudio} onChange={(v) => actions.setSettings({ autoAudio: v })} />
        <Row icon="turtle" title="Velocidade da voz" subtitle="Velocidade normal do áudio" />
        <Choice options={[[0.75, 'Devagar'], [0.9, 'Normal'], [1.05, 'Rápida']]} value={s.speechRate} onChange={(v) => actions.setSettings({ speechRate: v })} />
        <Toggle icon="heart" title="Modo vidas" subtitle="5 vidas: perde uma a cada erro (desafio extra)" value={s.hearts} onChange={(v) => actions.setSettings({ hearts: v })} last />
      </Group>

      {/* SOUND */}
      <Group title="Sons e vibração">
        <Toggle icon="volume" title="Efeitos sonoros" value={s.sounds} onChange={(v) => actions.setSettings({ sounds: v })} />
        <Toggle icon="sparkles" title="Vibração" value={s.haptics} onChange={(v) => actions.setSettings({ haptics: v })} last />
      </Group>

      {/* APPEARANCE */}
      <Group title="Aparência">
        <View style={{ paddingTop: 14 }}>
          <Choice options={[['light', '☀️ Claro'], ['dark', '🌙 Escuro'], ['system', '📱 Sistema']]} value={s.theme} onChange={(v) => actions.setSettings({ theme: v })} />
        </View>
      </Group>

      {/* UPDATES */}
      <Group title="Atualizações">
        <View style={{ padding: 16, gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: t.skySoft, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="download" size={22} color={t.sky} />
            </View>
            <View style={{ flex: 1 }}>
              <T v="bodyBold">Versão {info.version}</T>
              <T v="caption">{info.updateId && !info.embedded ? `Atualização ${String(info.updateId).slice(0, 8)} · ${info.createdAt ? new Date(info.createdAt).toLocaleDateString('pt-BR') : ''}` : 'Versão instalada original'}</T>
            </View>
          </View>
          <Button title="Buscar atualizações" icon="refresh" onPress={doCheck} loading={busy === 'update'} />
          {update ? (
            <View style={{ backgroundColor: update.kind === 'none' ? t.successSoft : update.kind === 'error' ? t.errorSoft : t.goldSoft, borderRadius: 14, padding: 14, gap: 10 }}>
              {update.kind === 'none' ? <T v="bodyBold" color={t.success}>✅ Você já está na versão mais recente!</T> : null}
              {update.kind === 'error' ? <T v="bodyBold" color={t.error}>{update.message}</T> : null}
              {update.kind === 'ota' ? (
                <>
                  <T v="bodyBold">🎉 Nova atualização disponível!</T>
                  <T v="small" color={t.text}>Ela é baixada em segundos e o app reinicia sozinho. Seu progresso é mantido.</T>
                  <Button title="Baixar e reiniciar" variant="success" small loading={busy === 'apply'} onPress={async () => { setBusy('apply'); try { await applyOta(); } catch (e) { Alert.alert('Erro', e.message); setBusy(null); } }} />
                </>
              ) : null}
              {update.kind === 'apk' ? (
                <>
                  <T v="bodyBold">🎉 Versão {update.version} disponível!</T>
                  {update.notes ? <T v="small" color={t.text} numberOfLines={6}>{update.notes}</T> : null}
                  <T v="small" color={t.text}>Esta versão traz mudanças maiores: baixe o APK e instale por cima (seu progresso é mantido).</T>
                  <Button title="Baixar APK" variant="success" small onPress={() => openApk(update.url)} />
                </>
              ) : null}
            </View>
          ) : null}
          {!CONFIG.githubRepo || CONFIG.githubRepo.includes('SEU_USUARIO') ? <T v="caption">Repositório do GitHub ainda não configurado em app.json → extra.githubRepo.</T> : null}
        </View>
      </Group>

      {/* DATA */}
      <Group title="Dados">
        <Row icon="upload" title="Exportar progresso" subtitle="Gera um backup em texto" onPress={() => Share.share({ message: JSON.stringify(getStateSnapshotForCloud(state)) })} />
        <Row icon="download" title="Importar progresso" subtitle="Cole um backup exportado" onPress={() => setImportOpen(true)} />
        <Row
          icon="trash"
          iconColor={t.error}
          iconBg={t.errorSoft}
          title="Apagar progresso"
          subtitle="Recomeçar do zero neste aparelho"
          last
          onPress={() => Alert.alert('Apagar todo o progresso?', 'Isso não pode ser desfeito.', [{ text: 'Cancelar' }, { text: 'Apagar', style: 'destructive', onPress: () => { actions.resetProgress(); router.replace('/(tabs)'); } }])}
        />
      </Group>

      {/* ADVANCED */}
      <Group title="Avançado">
        <Row icon="sparkles" title="Servidor de IA" subtitle={CONFIG.apiUrl || s.apiUrl ? 'Configurado ✓' : 'Não configurado'} onPress={() => setAdv(!adv)} right={<Icon name={adv ? 'down' : 'chevron'} size={20} color={t.text3} />} last={!adv} />
        {adv ? (
          <View style={{ padding: 16, gap: 10 }}>
            <T v="small">A pronúncia, o tradutor e a conversa usam IA (Groq). O jeito seguro é o servidor (pasta <Text style={{ fontFamily: fonts.bodyHeavy }}>worker/</Text> do projeto) — a chave fica só nele. Para testes, dá para usar sua própria chave Groq neste aparelho.</T>
            <T v="caption">URL do servidor (Cloudflare Worker)</T>
            <TextInput value={apiUrl} onChangeText={setApiUrl} placeholder={CONFIG.apiUrl || 'https://canard-ai.seu-usuario.workers.dev'} placeholderTextColor={t.text3} autoCapitalize="none" style={{ backgroundColor: t.bg, borderRadius: 12, padding: 12, fontFamily: fonts.bodySemi, color: t.text, borderWidth: 1, borderColor: t.border }} />
            <T v="caption">Ou sua chave Groq pessoal (fica só neste aparelho)</T>
            <TextInput value={groq} onChangeText={setGroq} placeholder="gsk_…" placeholderTextColor={t.text3} autoCapitalize="none" secureTextEntry style={{ backgroundColor: t.bg, borderRadius: 12, padding: 12, fontFamily: fonts.bodySemi, color: t.text, borderWidth: 1, borderColor: t.border }} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button title="Salvar" small style={{ flex: 1 }} onPress={() => { actions.setSettings({ apiUrl: apiUrl.trim(), ownGroqKey: groq.trim() }); Alert.alert('Salvo!'); }} />
              <Button title="Pegar chave grátis" small variant="secondary" style={{ flex: 1 }} onPress={() => Linking.openURL('https://console.groq.com/keys')} />
            </View>
          </View>
        ) : null}
      </Group>

      <View style={{ alignItems: 'center', marginTop: 30, gap: 6 }}>
        <Duck size={70} mood="happy" />
        <T v="caption">Le canard français · v{info.version}</T>
        <T v="caption">Feito com 🦆 por patoelho34</T>
      </View>

      <Sheet visible={importOpen} onClose={() => setImportOpen(false)}>
        <T v="h3">Importar progresso</T>
        <T v="small" style={{ marginTop: 4, marginBottom: 10 }}>Cole aqui o texto do backup exportado.</T>
        <TextInput value={importText} onChangeText={setImportText} multiline placeholder='{"xp": ...}' placeholderTextColor={t.text3} style={{ height: 140, textAlignVertical: 'top', backgroundColor: t.bg, borderRadius: 12, padding: 12, fontFamily: fonts.bodySemi, color: t.text, borderWidth: 1, borderColor: t.border }} />
        <Button
          title="Importar"
          style={{ marginTop: 12 }}
          disabled={!importText.trim()}
          onPress={() => {
            try {
              const obj = JSON.parse(importText);
              if (typeof obj !== 'object' || obj.xp === undefined) throw new Error();
              actions.importState({ ...obj, auth: state.auth });
              setImportOpen(false);
              Alert.alert('Importado!', 'Seu progresso foi restaurado. 🎉');
            } catch {
              Alert.alert('Backup inválido', 'Confira se você colou o texto completo.');
            }
          }}
        />
      </Sheet>
    </Screen>
  );
}
