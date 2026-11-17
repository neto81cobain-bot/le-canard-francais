import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { Screen, T, Card, Button, Chip } from '../components/ui';
import Duck from '../components/Duck';
import { SHOP } from '../store/logic';
import { fx } from '../services/feedback';

export default function Shop() {
  const { state, actions } = useStore();
  const t = useTheme();
  return (
    <Screen title="Loja do Canard" right={<Chip label={`${state.coins} 💶`} big color={t.success} bg={t.successSoft} />}>
      <Card style={{ alignItems: 'center', gap: 6 }}>
        <Duck size={140} mood="happy" noBadge />
        <T v="small" center>Ganhe 💶 em baús, missões e conquistas. Toque num item que você já tem para vestir ou tirar.</T>
      </Card>
      <View style={{ gap: 12, marginTop: 18 }}>
        {SHOP.filter((i) => i.kind !== 'info').map((item) => {
          const owned = state.inventory.owned.includes(item.id);
          const equipped = state.inventory.equipped === item.id;
          const canBuy = state.coins >= item.price;
          return (
            <Card key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <View style={{ width: 58, height: 58, borderRadius: 18, backgroundColor: item.kind === 'freeze' ? t.skySoft : palette.goldSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <T v="bodyBold">{item.title}</T>
                <T v="small">{item.desc}</T>
                {item.kind === 'freeze' ? <T v="caption">Você tem {state.streak.freezes || 0}</T> : null}
              </View>
              {owned && item.kind === 'outfit' ? (
                <Button title={equipped ? 'Tirar' : 'Vestir'} small variant={equipped ? 'secondary' : 'success'} onPress={() => actions.equip(item.id)} />
              ) : (
                <Button
                  title={`${item.price} 💶`}
                  small
                  variant="gold"
                  disabled={!canBuy}
                  onPress={() => {
                    if (actions.buy(item.id)) {
                      fx.chest();
                      Alert.alert('Comprado!', item.kind === 'freeze' ? 'Seu streak está protegido por mais um dia. 🥐' : 'Le Canard ficou ainda mais chique! ✨');
                    }
                  }}
                />
              )}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
