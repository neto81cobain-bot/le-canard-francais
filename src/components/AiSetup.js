// Quando a IA não está configurada: em vez de beco sem saída, um passo a passo
// de 2 minutos (chave grátis da Groq) + uma alternativa sem IA.
import { View, Text, Linking } from 'react-native';
import { router } from 'expo-router';
import { useTheme, fonts, radius } from '../theme';
import { T, Button } from './ui';
import Duck from './Duck';

export default function AiSetup({ feature = 'Este recurso', alt, compact }) {
  const t = useTheme();
  const steps = [
    ['1', 'Crie uma chave grátis na Groq', 'console.groq.com → API Keys → Create'],
    ['2', 'Cole no app', 'Perfil → Configurações → Avançado → “sua chave Groq”'],
    ['3', 'Toque em Testar', 'Se aparecer “bonjour”, está pronto!'],
  ];
  return (
    <View style={{ gap: 12, padding: compact ? 0 : 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Duck mood="think" size={compact ? 56 : 72} />
        <View style={{ flex: 1 }}>
          <T v="h3">{feature} usa IA</T>
          <T v="small">Ative uma vez, em uns 2 minutos — é grátis.</T>
        </View>
      </View>
      <View style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 12, gap: 10 }}>
        {steps.map(([n, a, b]) => (
          <View key={n} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: fonts.bodyHeavy, color: '#fff', fontSize: 12 }}>{n}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <T v="bodyBold">{a}</T>
              <T v="caption">{b}</T>
            </View>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="Pegar chave" icon="link" small variant="secondary" style={{ flex: 1 }} onPress={() => Linking.openURL('https://console.groq.com/keys')} />
        <Button title="Configurar" icon="gear" small style={{ flex: 1 }} onPress={() => router.push('/settings')} />
      </View>
      {alt ? (
        <Button title={alt.title} variant="ghost" small onPress={alt.onPress} />
      ) : null}
    </View>
  );
}
