// Shop with a fitting room: tap any item to try it on the duck, then buy or wear it.
// One item per slot (hat, glasses, neck, wing, scenery) — they combine.
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Alert } from '../services/dialog';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Button, Chip } from '../components/ui';
import Duck, { DuckAvatar } from '../components/Duck';
import { SHOP, SLOT_NAMES, SLOT_ORDER, wornOf, isOwned } from '../store/logic';
import { fx } from '../services/feedback';

const CATS = [['all', 'Tudo'], ...SLOT_ORDER.map((k) => [k, SLOT_NAMES[k]]), ['items', 'Itens']];

export default function Shop() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [cat, setCat] = useState('all');
  const [trying, setTrying] = useState(null); // item id being previewed
  const worn = wornOf(state.inventory);
  const tryItem = trying && SHOP.find((x) => x.id === trying);
  const preview = useMemo(() => (tryItem?.slot ? { ...worn, [tryItem.slot]: tryItem.id } : worn), [worn, tryItem]);
  const list = SHOP.filter((i) => i.kind !== 'info' && (cat === 'all' || (cat === 'items' ? i.kind === 'freeze' : i.slot === cat)));
  const wornItems = SLOT_ORDER.map((k) => worn[k] && SHOP.find((x) => x.id === worn[k])).filter(Boolean);

  const buy = (item) => {
    if (actions.buy(item.id)) {
      fx.chest();
      setTrying(null);
      if (item.kind === 'freeze') Alert.alert('Comprado!', 'Seu streak está protegido por mais um dia. 🥐');
      else Alert.alert('Comprado!', `${item.emoji} Le Canard ficou ainda mais chique! ✨`);
    }
  };

  const tap = (item) => {
    fx.tap?.();
    if (item.kind === 'freeze') return;
    if (isOwned(state, item)) {
      setTrying(null);
      actions.equip(item.id);
    } else setTrying(trying === item.id ? null : item.id);
  };

  return (
    <Screen title="Loja do Canard" scroll={false} right={<Chip label={`${state.coins} 💶`} big color={t.success} bg={t.successSoft} />}>
      {/* FITTING ROOM */}
      <View style={{ borderRadius: radius.xl, overflow: 'hidden', backgroundColor: t.mode === 'dark' ? '#22304A' : '#EAF0FB', borderWidth: 1, borderColor: t.border }}>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 46, backgroundColor: t.mode === 'dark' ? '#1B263B' : '#DCE5F5' }} />
        <View style={{ alignItems: 'center', paddingTop: 12 }}>
          <View style={{ borderRadius: 24, overflow: 'hidden' }}>
            <Duck size={180} mood={tryItem ? 'celebrate' : 'happy'} noBadge outfit={preview} scene />
          </View>
        </View>
        <View style={{ padding: 12, paddingTop: 4, minHeight: 52, justifyContent: 'center' }}>
          {tryItem ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <T v="small" color={t.text} style={{ flex: 1 }}>Provando: <Text style={{ fontFamily: fonts.bodyHeavy }}>{tryItem.emoji} {tryItem.title}</Text></T>
              <Button title="Tirar" small variant="secondary" onPress={() => setTrying(null)} />
              {tryItem.unlock ? <Chip label={`🔒 ${tryItem.unlock.label}`} /> : <Button title={`${tryItem.price} 💶`} small variant="gold" disabled={state.coins < tryItem.price} onPress={() => buy(tryItem)} />}
            </View>
          ) : wornItems.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              {wornItems.map((it) => (
                <Pressable key={it.id} onPress={() => actions.equip(it.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 4, paddingRight: 10, paddingVertical: 3, borderRadius: 99, backgroundColor: t.surface }}>
                  {['held', 'ground'].includes(it.slot) ? <Text style={{ marginLeft: 4 }}>{it.emoji}</Text> : <DuckAvatar size={24} outfit={{ [it.slot]: it.id }} />}
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: t.text2 }}>✕</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => actions.undressAll()} hitSlop={6}>
                <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.text3, marginLeft: 4 }}>Tirar tudo</Text>
              </Pressable>
            </View>
          ) : (
            <T v="small" center>Seu pato começa sem nada. Toque num item para provar 👗</T>
          )}
        </View>
      </View>

      {/* CATEGORIES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginTop: 12 }} contentContainerStyle={{ gap: 6 }}>
        {CATS.map(([k, l]) => (
          <Pressable key={k} onPress={() => setCat(k)}>
            <Chip label={l} big bg={cat === k ? t.primary : t.surface2} color={cat === k ? '#fff' : t.text2} />
          </Pressable>
        ))}
      </ScrollView>

      {/* ITEMS */}
      <ScrollView style={{ flex: 1, marginTop: 10 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingBottom: 40 }}>
        {list.map((item) => {
          const has = isOwned(state, item);
          const drawn = ['head', 'eyes', 'face', 'neck', 'scene'].includes(item.slot);
          const wearing = item.slot && worn[item.slot] === item.id;
          const isTry = trying === item.id;
          const missing = Math.max(0, item.price - state.coins);
          return (
            <Pressable key={item.id} onPress={() => tap(item)} style={{ width: '48%', flexGrow: 1, borderRadius: radius.lg, padding: 12, gap: 6, backgroundColor: t.surface, borderWidth: 2, borderColor: wearing ? t.success : isTry ? t.sky : t.border }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {drawn ? (
                  <DuckAvatar size={56} outfit={{ [item.slot]: item.id }} />
                ) : (
                  <View style={{ width: 56, height: 56, borderRadius: 18, backgroundColor: item.kind === 'freeze' ? t.skySoft : palette.goldSoft, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30 }}>{item.emoji}</Text>
                  </View>
                )}
                {wearing ? <Chip label="Vestindo" color={t.success} bg={t.successSoft} /> : has ? <Chip label="Seu" color={t.text2} bg={t.surface2} /> : item.unlock ? <Chip label="Exclusivo" color={palette.purple || '#7C5CFC'} bg={t.surface2} /> : null}
              </View>
              <T v="bodyBold" numberOfLines={1}>{item.title}</T>
              <T v="caption" numberOfLines={2}>{item.kind === 'freeze' ? `${item.desc} · você tem ${state.streak.freezes || 0}` : item.desc}</T>
              {item.kind === 'freeze' ? (
                <Button title={`${item.price} 💶`} small variant="gold" disabled={state.coins < item.price} onPress={() => buy(item)} />
              ) : has ? (
                <Button title={wearing ? 'Tirar' : 'Vestir'} small variant={wearing ? 'secondary' : 'success'} onPress={() => actions.equip(item.id)} />
              ) : item.unlock ? (
                <View style={{ paddingVertical: 8, paddingHorizontal: 8, borderRadius: 12, backgroundColor: t.surface2, alignItems: 'center' }}>
                  <T v="caption" center>🔒 {item.unlock.label}</T>
                </View>
              ) : (
                <View style={{ gap: 4 }}>
                  <Button title={`${item.price} 💶`} small variant="gold" disabled={!!missing} onPress={() => buy(item)} />
                  {missing ? <T v="caption" center>Faltam {missing} 💶</T> : null}
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
