import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Bubble } from '../components/ui';
import Duck from '../components/Duck';
import { AudioButton, Appear } from '../components/extras';
import { FALSE_FRIENDS } from '../content/extras';

export default function FalseFriends() {
  const t = useTheme();
  return (
    <Screen title="Falsos cognatos">
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 20 }}>
        <Duck mood="think" size={90} />
        <Bubble style={{ flex: 1, marginBottom: 20 }}><T v="bodyBold">Cuidado! Estas palavras parecem português, mas querem dizer outra coisa.</T></Bubble>
      </View>
      <View style={{ gap: 12 }}>
        {FALSE_FRIENDS.map((f, i) => {
          const [exFr, exPt] = f.ex.split('|');
          return (
            <Appear key={f.fr} delay={Math.min(i, 8) * 50}>
              <View style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 16, gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ flex: 1, fontFamily: fonts.displayItalic, fontSize: 22, color: t.text }}>{f.fr}</Text>
                  <AudioButton text={f.fr} size={38} />
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={{ flex: 1, backgroundColor: t.errorSoft, borderRadius: 12, padding: 10 }}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: t.error }}>PARECE ❌</Text>
                    <T v="bodyBold">{f.looks}</T>
                  </View>
                  <View style={{ flex: 1, backgroundColor: t.successSoft, borderRadius: 12, padding: 10 }}>
                    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, color: t.success }}>SIGNIFICA ✓</Text>
                    <T v="bodyBold">{f.means}</T>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <AudioButton text={exFr} size={30} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.displayItalic, fontSize: 15, color: t.text }}>{exFr}</Text>
                    <T v="caption">{exPt}</T>
                  </View>
                </View>
              </View>
            </Appear>
          );
        })}
      </View>
    </Screen>
  );
}
