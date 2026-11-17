import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useTheme, fonts, radius } from '../theme';
import { T } from './ui';
import { AudioButton, Appear } from './extras';
import { speak } from '../services/speech';
import Duck from './Duck';

// Renders lesson text: *francês em itálico* (tocável) and **negrito**.
export function Rich({ text, style, size = 16 }) {
  const t = useTheme();
  const paragraphs = String(text || '').split('\n');
  return (
    <View style={{ gap: 6 }}>
      {paragraphs.map((p, pi) => {
        const parts = p.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
        return (
          <Text key={pi} style={[{ fontFamily: fonts.body, fontSize: size, lineHeight: size * 1.5, color: t.text }, style]}>
            {parts.map((x, i) => {
              if (x.startsWith('**')) return <Text key={i} style={{ fontFamily: fonts.bodyHeavy }}>{x.slice(2, -2)}</Text>;
              if (x.startsWith('*')) {
                const fr = x.slice(1, -1);
                return (
                  <Text key={i} onPress={() => speak(fr)} style={{ fontFamily: fonts.displayItalic, color: t.mode === 'dark' ? t.sky : t.primary }}>
                    {fr}
                  </Text>
                );
              }
              return <Text key={i}>{x}</Text>;
            })}
          </Text>
        );
      })}
    </View>
  );
}

// A teaching card: title, text, table, examples with audio, and the duck's tip.
export function TeachCard({ card, color }) {
  const t = useTheme();
  return (
    <View style={{ gap: 16 }}>
      {card.title ? <T v="h2">{card.title}</T> : null}
      {card.text ? <Rich text={card.text} size={17} /> : null}
      {card.table ? (
        <View style={{ borderRadius: radius.lg, overflow: 'hidden', borderWidth: 2, borderColor: t.border }}>
          {card.table.map((row, i) => {
            const header = card.table[0][0] === '' && i === 0;
            const sayable = row.slice(0, 2).filter(Boolean).join(' ').replace(/['’]\s/g, "'");
            return (
              <Appear key={i} delay={i * 50} from={8}>
                <Pressable
                  onPress={() => !header && speak(row[0].length > 3 && /\d/.test(row[0]) ? row[1] : sayable)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: 14, gap: 10, backgroundColor: header ? color.main : i % 2 ? t.surface : t.surface2 }}
                >
                  {row.map((c, ci) => (
                    <Text
                      key={ci}
                      style={{
                        flex: ci === row.length - 1 && row.length > 2 ? 1.3 : 1,
                        fontFamily: header ? fonts.bodyHeavy : ci === 1 ? fonts.bodyHeavy : ci === 0 ? fonts.displayItalic : fonts.bodySemi,
                        fontSize: ci === 1 ? 17 : 15,
                        color: header ? '#fff' : ci === 1 ? color.main : ci === 0 ? t.text : t.text2,
                      }}
                    >
                      {c}
                    </Text>
                  ))}
                  {!header ? <Text style={{ fontSize: 12, color: t.text3 }}>🔊</Text> : null}
                </Pressable>
              </Appear>
            );
          })}
        </View>
      ) : null}
      {card.ex?.length ? (
        <View style={{ gap: 10 }}>
          {card.ex.map((e, i) => (
            <Appear key={i} delay={i * 80}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: t.border, padding: 12 }}>
                <AudioButton text={e.fr} size={42} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, color: t.text }}>{e.fr}</Text>
                  <T v="small">{e.pt}</T>
                </View>
              </View>
            </Appear>
          ))}
        </View>
      ) : null}
      {card.tip ? (
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end' }}>
          <Duck mood="teach" size={70} />
          <View style={{ flex: 1, backgroundColor: t.mode === 'dark' ? t.surface2 : color.soft, borderRadius: 18, borderBottomLeftRadius: 4, padding: 14 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, color: t.mode === 'dark' ? t.gold : color.dark, fontSize: 12, letterSpacing: 1, marginBottom: 4 }}>DICA DO CANARD</Text>
            <Rich text={card.tip} size={15} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
