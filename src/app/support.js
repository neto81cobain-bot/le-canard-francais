import React from 'react';
import { View, Text } from 'react-native';
import { Alert } from '../services/dialog';
import * as Clipboard from 'expo-clipboard';
import Svg, { Rect } from 'react-native-svg';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Card, Button, Bubble } from '../components/ui';
import Duck from '../components/Duck';
import { CONFIG } from '../services/config';
import { pixPayload, qrMatrix } from '../services/pix';

function QR({ text, size = 220 }) {
  const m = qrMatrix(text);
  if (!m) return null;
  const n = m.length;
  const cell = size / (n + 8);
  return (
    <Svg width={size} height={size} style={{ backgroundColor: '#fff', borderRadius: 16 }}>
      {m.flatMap((row, y) => row.map((v, x) => (v ? <Rect key={x + '-' + y} x={(x + 4) * cell} y={(y + 4) * cell} width={cell + 0.3} height={cell + 0.3} fill="#111" /> : null)))}
    </Svg>
  );
}

export default function Support() {
  const t = useTheme();
  const payload = pixPayload({ key: CONFIG.pixKey, name: CONFIG.pixName, city: 'ORIXIMINA' });
  return (
    <Screen title="Apoiar o projeto">
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        <Duck size={120} mood="happy" outfit={null} />
        <Bubble style={{ flex: 1, marginBottom: 28 }}>
          <T v="bodyBold">Merci beaucoup ! 🥐 O Le Canard Français é feito com carinho e é gratuito. Um PIX de qualquer valor ajuda a manter o app e a IA funcionando.</T>
        </Bubble>
      </View>
      <Card style={{ alignItems: 'center', gap: 14, marginTop: 10 }}>
        <T v="label">PIX copia e cola / QR Code</T>
        <QR text={payload} />
        <Button title="Copiar código PIX (copia e cola)" icon="copy" onPress={() => { Clipboard.setStringAsync(payload); Alert.alert('Copiado!', 'Cole no app do seu banco, em PIX copia e cola.'); }} style={{ alignSelf: 'stretch' }} />
      </Card>
      <Card style={{ marginTop: 14, gap: 6 }}>
        <T v="label">Chave aleatória</T>
        <Text selectable style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: t.text }}>{CONFIG.pixKey}</Text>
        <T v="small">{CONFIG.pixName} · {CONFIG.pixBank}</T>
        <Button title="Copiar só a chave" small variant="secondary" icon="copy" onPress={() => { Clipboard.setStringAsync(CONFIG.pixKey); Alert.alert('Chave copiada!'); }} style={{ marginTop: 6 }} />
      </Card>
      <T v="small" center style={{ marginTop: 20 }}>Desenvolvido com 🦆 por patoelho34</T>
    </Screen>
  );
}
