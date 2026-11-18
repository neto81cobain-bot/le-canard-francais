// Custom reminders: as many as you want, each with its own time, days and type of message.
import React, { useState } from 'react';
import { View, Text, Pressable, Switch, TextInput } from 'react-native';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Screen, Button, Sheet, Chip } from '../components/ui';
import Icon from '../components/Icon';
import Duck from '../components/Duck';
import { REMINDER_KINDS, defaultReminders, testReminder } from '../services/notifications';
import { usualHour, dueItems } from '../store/logic';
import { Alert, toast } from '../services/dialog';

const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const DAY_NAMES = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const pad = (n) => String(n).padStart(2, '0');

function daysLabel(days = []) {
  if (days.length === 7) return 'Todo dia';
  if (days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d))) return 'Seg a sex';
  if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Fim de semana';
  return [...days].sort().map((d) => DAY_NAMES[d]).join(', ');
}

function Stepper({ value, onChange, min, max, step = 1 }) {
  const t = useTheme();
  const btn = (d) => (
    <Pressable onPress={() => { const n = value + d; onChange(n > max ? min : n < min ? max : n); }} hitSlop={6} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.surface2, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 22, color: t.text }}>{d > 0 ? '+' : '−'}</Text>
    </Pressable>
  );
  return (
    <View style={{ alignItems: 'center', gap: 6 }}>
      {btn(step)}
      <Text style={{ fontFamily: fonts.display, fontSize: 40, color: t.text, minWidth: 64, textAlign: 'center' }}>{pad(value)}</Text>
      {btn(-step)}
    </View>
  );
}

export default function Reminders() {
  const { state, actions } = useStore();
  const t = useTheme();
  const list = state.settings.reminders || defaultReminders(state.profile.reminder, state.settings.nightly);
  const [edit, setEdit] = useState(null);
  const save = (next) => actions.setSettings({ reminders: next });
  const usual = usualHour(state.studyHours);

  const openNew = () => setEdit({ id: 'r' + Date.now(), enabled: true, hour: 20, minute: 0, days: [0, 1, 2, 3, 4, 5, 6], kind: 'smart', label: '', text: '', isNew: true });
  const commit = () => {
    const r = { ...edit };
    delete r.isNew;
    if (r.kind === 'custom' && !r.text.trim()) return Alert.alert('Escreva a mensagem', 'O lembrete personalizado precisa de um texto. 🙂');
    if (!r.days.length) return Alert.alert('Escolha os dias', 'Marque pelo menos um dia da semana.');
    save(edit.isNew ? [...list, r] : list.map((x) => (x.id === r.id ? r : x)));
    setEdit(null);
    toast('🔔 Lembrete salvo!', 'success');
  };

  return (
    <Screen title="Lembretes">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Duck size={72} mood="wave" />
        <T v="bodyBold" style={{ flex: 1 }}>Monte seus lembretes do seu jeito: horário, dias da semana e o tipo de mensagem.</T>
      </View>

      <View style={{ gap: 10 }}>
        {list.map((r) => {
          const kind = REMINDER_KINDS.find((k) => k.id === r.kind) || REMINDER_KINDS[0];
          return (
            <Pressable key={r.id} onPress={() => setEdit({ ...r })} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, opacity: r.enabled ? 1 : 0.6 }}>
              <View style={{ alignItems: 'center', width: 70 }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 26, color: t.text }}>{r.auto ? '🧠' : `${pad(r.hour)}:${pad(r.minute)}`}</Text>
                {r.auto ? <T v="caption">{usual != null ? `~${usual}h` : 'auto'}</T> : null}
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <T v="bodyBold" numberOfLines={1}>{kind.emoji} {r.label || kind.label}</T>
                <T v="small" numberOfLines={1}>{daysLabel(r.days)}{r.kind === 'custom' && r.text ? ` · “${r.text}”` : ''}</T>
              </View>
              <Switch value={!!r.enabled} onValueChange={(v) => save(list.map((x) => (x.id === r.id ? { ...x, enabled: v } : x)))} trackColor={{ true: t.primary }} />
            </Pressable>
          );
        })}
      </View>

      <Button title="Novo lembrete" icon="plus" style={{ marginTop: 16 }} onPress={openNew} />
      <T v="caption" center style={{ marginTop: 10 }}>Dica: o “Proteger o streak” só toca nos dias em que você ainda não estudou.</T>

      <Sheet visible={!!edit} onClose={() => setEdit(null)}>
        {edit ? (
          <View style={{ gap: 14 }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 21, color: t.text }}>{edit.isNew ? 'Novo lembrete' : 'Editar lembrete'}</Text>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable onPress={() => setEdit({ ...edit, auto: false })} style={{ flex: 1 }}><Chip label="⏰ Horário fixo" big bg={!edit.auto ? t.primary : t.surface2} color={!edit.auto ? '#fff' : t.text2} /></Pressable>
              <Pressable onPress={() => setEdit({ ...edit, auto: true })} style={{ flex: 1 }}><Chip label="🧠 Meu horário" big bg={edit.auto ? t.primary : t.surface2} color={edit.auto ? '#fff' : t.text2} /></Pressable>
            </View>
            {edit.auto ? (
              <T v="small">{usual != null ? `Você costuma estudar por volta das ${usual}h — o lembrete vem nesse horário.` : 'O Canard aprende seu horário depois de algumas sessões. Até lá, usa o horário abaixo.'}</T>
            ) : null}
            {!edit.auto || usual == null ? (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <Stepper value={edit.hour} min={0} max={23} onChange={(h) => setEdit({ ...edit, hour: h })} />
                <Text style={{ fontFamily: fonts.display, fontSize: 40, color: t.text3 }}>:</Text>
                <Stepper value={edit.minute - (edit.minute % 5)} min={0} max={55} step={5} onChange={(m) => setEdit({ ...edit, minute: m })} />
              </View>
            ) : null}

            <View>
              <T v="label">Dias</T>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
                {DAYS.map((d, i) => {
                  const on = edit.days.includes(i);
                  return (
                    <Pressable key={i} onPress={() => setEdit({ ...edit, days: on ? edit.days.filter((x) => x !== i) : [...edit.days, i] })} style={{ flex: 1, aspectRatio: 1, borderRadius: 99, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? t.primary : t.surface2 }}>
                      <Text style={{ fontFamily: fonts.bodyHeavy, color: on ? '#fff' : t.text2 }}>{d}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
                {[['Todo dia', [0, 1, 2, 3, 4, 5, 6]], ['Seg a sex', [1, 2, 3, 4, 5]], ['Fim de semana', [0, 6]]].map(([l, ds]) => (
                  <Pressable key={l} onPress={() => setEdit({ ...edit, days: ds })}><Chip label={l} /></Pressable>
                ))}
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <T v="label">Tipo de mensagem</T>
              {REMINDER_KINDS.map((k) => (
                <Pressable key={k.id} onPress={() => setEdit({ ...edit, kind: k.id })} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 12, borderWidth: 2, borderColor: edit.kind === k.id ? t.sky : t.border, backgroundColor: edit.kind === k.id ? t.skySoft : t.surface }}>
                  <Text style={{ fontSize: 20 }}>{k.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <T v="bodyBold">{k.label}</T>
                    <T v="caption">{k.desc}</T>
                  </View>
                </Pressable>
              ))}
            </View>

            <View style={{ gap: 6 }}>
              <T v="label">Nome (opcional)</T>
              <TextInput value={edit.label} onChangeText={(v) => setEdit({ ...edit, label: v })} placeholder="Ex.: Francês no almoço" placeholderTextColor={t.text3} style={{ backgroundColor: t.bg, borderRadius: 12, padding: 12, fontFamily: fonts.bodyBold, fontSize: 16, color: t.text, borderWidth: 1, borderColor: t.border }} />
              {edit.kind === 'custom' ? (
                <TextInput value={edit.text} onChangeText={(v) => setEdit({ ...edit, text: v })} placeholder="Ex.: Bora, Raimundo! 10 minutinhos de francês 🇫🇷" placeholderTextColor={t.text3} multiline style={{ backgroundColor: t.bg, borderRadius: 12, padding: 12, minHeight: 70, textAlignVertical: 'top', fontFamily: fonts.bodyBold, fontSize: 16, color: t.text, borderWidth: 1, borderColor: t.border }} />
              ) : null}
            </View>

            <Button title="Salvar" onPress={commit} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button title="Testar agora" icon="bell" small variant="secondary" style={{ flex: 1 }} onPress={async () => { const ok = await testReminder(edit, { streakCount: state.streak.count, due: dueItems(state.srs, Date.now(), 999).length }); toast(ok ? '🔔 Chega em 3 segundos!' : 'Permita as notificações nas configurações do celular.'); }} />
              {!edit.isNew ? (
                <Button title="Apagar" icon="trash" small variant="secondary" style={{ flex: 1 }} onPress={() => Alert.alert('Apagar lembrete?', '', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Apagar', style: 'destructive', onPress: () => { save(list.filter((x) => x.id !== edit.id)); setEdit(null); } }])} />
              ) : null}
            </View>
          </View>
        ) : null}
      </Sheet>
    </Screen>
  );
}
