// Interactive story: read, listen and choose what to say. Kind choices lead to the best ending.
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useStore } from '../../store';
import { useTheme, fonts, radius, palette } from '../../theme';
import { T, Screen, Button, Chip, Empty } from '../../components/ui';
import Duck from '../../components/Duck';
import { AudioButton, SpeedChip } from '../../components/extras';
import { getAdventure } from '../../content/adventures';
import { speak } from '../../services/speech';
import { fx } from '../../services/feedback';

export default function Adventure() {
  const { id } = useLocalSearchParams();
  const adv = getAdventure(id);
  const { state, actions } = useStore();
  const t = useTheme();
  const [path, setPath] = useState(() => (adv ? [{ node: adv.start }] : []));
  const [showPt, setShowPt] = useState(false);
  const sv = useRef(null);
  const cur = path[path.length - 1];
  const node = adv?.nodes[cur?.node];

  useEffect(() => {
    if (node?.lines?.[0] && state.settings.autoAudio) speak(node.lines.map((l) => l.split('|')[0]).join(' '));
    setTimeout(() => sv.current?.scrollToEnd({ animated: true }), 150);
    if (node?.end) {
      fx.complete();
      const best = node.end === 'best';
      const first = !state.adventures?.[adv.id];
      actions.addXP(first ? (best ? 30 : 20) : 5);
      actions.markKind('adventure');
      actions.set((s) => ({ adventures: { ...(s.adventures || {}), [adv.id]: { best: best || !!s.adventures?.[adv.id]?.best, at: Date.now() } } }));
    }
  }, [cur?.node]);

  if (!adv) return <Screen title="Aventura"><Empty emoji="🗺️" title="Aventura não encontrada" action="Voltar" onAction={() => router.back()} /></Screen>;

  const choose = (c) => {
    fx.tap?.();
    speak(c.fr);
    setPath((p) => [...p.slice(0, -1), { ...p[p.length - 1], chose: c }, { node: c.to }]);
  };

  return (
    <Screen title={`${adv.emoji} ${adv.title}`} scroll={false} right={<SpeedChip />}>
      <ScrollView ref={sv} contentContainerStyle={{ paddingBottom: 30, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Chip label={adv.level} color={t.primary} bg={t.primarySoft} />
          <T v="small" style={{ flex: 1 }}>{adv.desc}</T>
          <Pressable onPress={() => setShowPt((x) => !x)} hitSlop={8}><Text style={{ fontSize: 18, opacity: showPt ? 1 : 0.5 }}>🇧🇷</Text></Pressable>
        </View>
        {path.map((step, i) => {
          const n = adv.nodes[step.node];
          if (!n) return null;
          return (
            <View key={i} style={{ gap: 8 }}>
              {n.lines.map((l, k) => {
                const [fr, pt] = l.split('|');
                return (
                  <Pressable key={k} onPress={() => speak(fr)} style={{ padding: 12, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, gap: 4 }}>
                    <Text style={{ fontFamily: fonts.displayItalic, fontSize: 18, lineHeight: 25, color: t.text }}>{fr}</Text>
                    {showPt ? <T v="small">{pt}</T> : null}
                  </Pressable>
                );
              })}
              {step.chose ? (
                <View style={{ alignSelf: 'flex-end', maxWidth: '88%', gap: 4 }}>
                  <View style={{ backgroundColor: t.primary, borderRadius: 16, borderBottomRightRadius: 4, padding: 12 }}>
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: '#fff' }}>{step.chose.fr}</Text>
                  </View>
                  {step.chose.tip ? <View style={{ flexDirection: 'row', gap: 6, padding: 8, borderRadius: 10, backgroundColor: palette.goldSoft }}><Text>💡</Text><T v="caption" color={t.text} style={{ flex: 1 }}>{step.chose.tip}</T></View> : null}
                </View>
              ) : null}
            </View>
          );
        })}
        {node?.end ? (
          <View style={{ alignItems: 'center', gap: 8, padding: 16, borderRadius: radius.xl, backgroundColor: node.end === 'best' ? t.successSoft : t.surface2 }}>
            <Duck size={100} mood="celebrate" />
            <T v="h3" center>{node.end === 'best' ? 'Final perfeito! 🌟' : 'Fim da aventura!'}</T>
            <T v="small" center>{node.end === 'best' ? 'Você escolheu as frases mais naturais e educadas.' : 'Deu certo! Tente de novo e descubra o final perfeito.'}</T>
            <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'stretch' }}>
              <Button title="Jogar de novo" icon="refresh" small variant="secondary" style={{ flex: 1 }} onPress={() => setPath([{ node: adv.start }])} />
              <Button title="Sair" small style={{ flex: 1 }} onPress={() => router.back()} />
            </View>
          </View>
        ) : (
          <View style={{ gap: 8, marginTop: 4 }}>
            <T v="label">O que você diz?</T>
            {node?.choices?.map((c) => (
              <Pressable key={c.fr} onPress={() => choose(c)} style={{ padding: 14, borderRadius: radius.lg, borderWidth: 2, borderBottomWidth: 4, borderColor: t.sky, backgroundColor: t.skySoft, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 16, color: t.text }}>{c.fr}</Text>
                  <AudioButton text={c.fr} size={32} />
                </View>
                <T v="caption">{c.pt}</T>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
