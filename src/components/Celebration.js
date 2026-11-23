import React, { useEffect } from 'react';
import { Modal, View, Text } from 'react-native';
import { useStore } from '../store';
import { ACHIEVEMENTS, STREAK_MILESTONES } from '../store/logic';
import { useTheme, fonts } from '../theme';
import { T, Button } from './ui';
import Duck from './Duck';
import { Confetti } from './extras';
import { fx } from '../services/feedback';

export default function Celebration() {
  const { state, actions } = useStore();
  const t = useTheme();
  const item = (state.pendingCelebrations || [])[0];
  const visible = !!item && !state.inLesson;

  useEffect(() => {
    if (visible) fx.levelup();
  }, [visible, item?.id, item?.count]);

  if (!item) return null;
  let emoji = '🎉', title = '', text = '';
  if (item.type === 'achievement') {
    const a = ACHIEVEMENTS.find((x) => x.id === item.id);
    emoji = a?.emoji || '🏅';
    title = 'Conquista desbloqueada!';
    text = `${a?.title || ''} — ${a?.desc || ''}\n+20 💶`;
  } else if (item.type === 'streak') {
    const milestone = STREAK_MILESTONES.includes(item.count);
    emoji = '🔥';
    title = milestone ? `${item.count} dias seguidos!` : `Streak: ${item.count} ${item.count === 1 ? 'dia' : 'dias'}!`;
    text = milestone ? 'Que marca incrível! Continue assim — petit à petit!' : 'Meta diária cumprida. Volte amanhã para manter o fogo aceso!';
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => actions.shiftCelebration()} statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: t.overlay, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Confetti run={visible} />
        <View style={{ width: '100%', maxWidth: 440, backgroundColor: t.surface, borderRadius: 28, padding: 24, alignItems: 'center', gap: 10 }}>
          <Duck mood="celebrate" size={130} />
          <Text style={{ fontSize: 46 }}>{emoji}</Text>
          <T v="h2" center>{title}</T>
          <T v="body" center color={t.text2}>{text}</T>
          <Button title="Continuar" onPress={() => actions.shiftCelebration()} style={{ alignSelf: 'stretch', marginTop: 10 }} />
        </View>
      </View>
    </Modal>
  );
}
