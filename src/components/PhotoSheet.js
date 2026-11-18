// "Foto do perfil" chooser: gallery, Google photo or the duck.
import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius } from '../theme';
import { T, Sheet } from './ui';
import Icon from './Icon';
import { DuckAvatar } from './Duck';
import { pickProfilePhoto, avatarOf } from '../services/photo';
import { Alert, toast } from '../services/dialog';

export default function PhotoSheet({ visible, onClose }) {
  const { state, actions } = useStore();
  const t = useTheme();
  const [busy, setBusy] = useState(false);
  const cur = avatarOf(state);
  const google = state.auth?.photo;
  const choose = async () => {
    setBusy(true);
    try {
      const uri = await pickProfilePhoto();
      if (uri) {
        actions.setProfile({ photo: uri });
        toast('📸 Foto atualizada!', 'success');
        onClose();
      }
    } catch (e) {
      Alert.alert(e.needsApk ? 'Precisa do app novo' : 'Não deu certo', e.message);
    } finally {
      setBusy(false);
    }
  };
  const set = (photo, msg) => { actions.setProfile({ photo }); toast(msg, 'success'); onClose(); };
  const Opt = ({ icon, emoji, title, sub, onPress, active, right }) => (
    <Pressable onPress={onPress} disabled={busy} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: active ? t.skySoft : t.bg, borderWidth: 2, borderColor: active ? t.sky : 'transparent' }}>
      <View style={{ width: 46, height: 46, borderRadius: 23, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: t.surface2 }}>
        {right || (emoji ? <Text style={{ fontSize: 24 }}>{emoji}</Text> : <Icon name={icon} size={22} color={t.text2} />)}
      </View>
      <View style={{ flex: 1 }}>
        <T v="bodyBold">{title}</T>
        {sub ? <T v="small">{sub}</T> : null}
      </View>
      {active ? <Icon name="check" size={20} color={t.sky} /> : null}
    </Pressable>
  );
  return (
    <Sheet visible={visible} onClose={onClose}>
      <View style={{ alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <DuckAvatar size={96} photo={cur} />
        <Text style={{ fontFamily: fonts.display, fontSize: 21, color: t.text }}>Foto do perfil</Text>
        <T v="small" center>Aparece no seu perfil e para os amigos do Clube.</T>
      </View>
      <View style={{ gap: 8 }}>
        <Opt emoji="🖼️" title="Escolher da galeria" sub="Você recorta em quadrado" onPress={choose} right={busy ? <ActivityIndicator color={t.primary} /> : null} active={!!state.profile.photo && state.profile.photo.startsWith('data:')} />
        {google ? <Opt title="Foto do Google" sub={state.auth?.email} onPress={() => set(null, 'Usando a foto do Google')} active={!state.profile.photo} right={<DuckAvatar size={46} photo={google} />} /> : null}
        <Opt title="Monsieur Canard" sub="Seu pato, com o visual que você montou 🦆" onPress={() => set('none', '🦆 Agora sua foto é o Canard!')} active={state.profile.photo === 'none' || (!state.profile.photo && !google)} right={<DuckAvatar size={46} photo={null} />} />
      </View>
    </Sheet>
  );
}
