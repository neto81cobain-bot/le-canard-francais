// Level certificates (PDF) — earned by finishing every unit of a level.
import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Card, Button } from './ui';
import { levelStatus, shareCertificate } from '../services/export';
import { Alert } from '../services/dialog';

export default function Certificates() {
  const { state } = useStore();
  const t = useTheme();
  const [busy, setBusy] = useState(null);
  const levels = levelStatus(state);
  const go = async (lv) => {
    setBusy(lv.level);
    try {
      await shareCertificate(state, lv);
    } catch (e) {
      Alert.alert(e.needsApk ? 'Precisa do app novo' : 'Não deu certo', e.message);
    } finally {
      setBusy(null);
    }
  };
  return (
    <Card style={{ gap: 10 }}>
      <T v="small">Termine todas as unidades de um nível para ganhar um certificado em PDF para guardar ou compartilhar.</T>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {levels.map((lv) => (
          <View key={lv.level} style={{ flex: 1, alignItems: 'center', gap: 4, padding: 10, borderRadius: radius.md || 12, backgroundColor: lv.done ? t.goldSoft : t.surface2, opacity: lv.done ? 1 : 0.6 }}>
            <Text style={{ fontSize: 22 }}>{lv.done ? '📜' : '🔒'}</Text>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: t.text }}>{lv.level}</Text>
          </View>
        ))}
      </View>
      {levels.filter((l) => l.done).map((lv) => (
        <Button key={lv.level} title={busy === lv.level ? 'Gerando…' : `Baixar certificado ${lv.level}`} icon="download" small variant="secondary" disabled={!!busy} onPress={() => go(lv)} />
      ))}
      {!levels.some((l) => l.done) ? <T v="caption">O primeiro certificado chega ao terminar a unidade 5 (A1). Bora! 💪</T> : null}
    </Card>
  );
}
