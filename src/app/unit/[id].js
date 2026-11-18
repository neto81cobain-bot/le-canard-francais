import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useStore } from '../../store';
import { useTheme, fonts, radius, unitColors, palette } from '../../theme';
import { Screen, T, Button, Card } from '../../components/ui';
import Icon from '../../components/Icon';
import { TeachCard } from '../../components/Rich';
import { getUnit, lessonState, unitProgress, LEVEL_INFO } from '../../content';
import { PRACTICE_FOCUS, PRACTICE_ROUNDS, unitBank } from '../../engine/exercises';
import { useMemo } from 'react';

export default function UnitGuide() {
  const { id } = useLocalSearchParams();
  const { state } = useStore();
  const t = useTheme();
  const unit = getUnit(id);
  const [open, setOpen] = useState(null);
  const doneIds = Object.keys(state.lessons || {}).filter((k) => state.lessons[k]?.done);
  const bankSize = useMemo(() => (unit ? unitBank(unit, { only: new Set(doneIds) }).length : 0), [id, doneIds.length]);
  if (!unit) return null;
  const color = unitColors[(unit.number - 1) % unitColors.length];
  const prog = unitProgress(state, unit);
  const unitLocked = unit.number > state.unlockedUnit;

  return (
    <Screen title={`Unidade ${unit.number}`}>
      <View style={{ backgroundColor: color.main, borderRadius: radius.xl, padding: 20, gap: 4 }}>
        <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, letterSpacing: 1, color: 'rgba(255,255,255,0.8)' }}>{LEVEL_INFO[unit.level].name.toUpperCase()}</Text>
        <Text style={{ fontFamily: fonts.display, fontSize: 28, color: '#fff' }}>{unit.emoji} {unit.title}</Text>
        <Text style={{ fontFamily: fonts.bodySemi, fontSize: 15, color: 'rgba(255,255,255,0.92)' }}>{unit.desc}</Text>
        <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: '#fff', marginTop: 8 }}>{prog.done}/{prog.total} lições · {prog.tested ? `teste: ${state.unitTests[unit.id]}% 🏆` : 'teste pendente'}</Text>
      </View>

      <T v="h3" style={{ marginTop: 24, marginBottom: 12 }}>Lições</T>
      <View style={{ gap: 10 }}>
        {unit.lessons.map((l) => {
          const st = lessonState(state, unit, l);
          return (
            <Card key={l.id} onPress={() => st !== 'locked' && router.push({ pathname: '/lesson/[id]', params: { id: l.id } })} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: st === 'locked' ? 0.55 : 1 }}>
              <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: st === 'done' ? t.goldSoft : color.soft, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22 }}>{l.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <T v="bodyBold">{l.title}</T>
                <T v="small">{l.goal}</T>
              </View>
              {st === 'done' ? <Text>{'⭐'.repeat(state.lessons[l.id]?.stars || 1)}</Text> : st === 'locked' ? <Icon name="lock" size={18} color={t.text3} /> : <Icon name="play" size={18} color={color.main} fill={color.main} />}
            </Card>
          );
        })}
      </View>

      <T v="h3" style={{ marginTop: 28, marginBottom: 4 }}>Treinos da unidade</T>
      <T v="small" style={{ marginBottom: 12 }}>{PRACTICE_FOCUS.length * PRACTICE_ROUNDS} treinos extras · cada rodada sorteia exercícios diferentes do banco de {bankSize} questões. O banco cresce a cada lição que você termina — só entra o que você já estudou.</T>
      {unitLocked ? (
        <Card style={{ alignItems: 'center', gap: 6 }}><Icon name="lock" size={22} color={t.text3} /><T v="small" center>Os treinos liberam junto com a unidade.</T></Card>
      ) : (
        <View style={{ gap: 10 }}>
          {PRACTICE_FOCUS.map((f) => (
            <View key={f.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: f.color, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{f.emoji}</Text>
              </View>
              <T v="bodyBold" style={{ width: 82 }} numberOfLines={1}>{f.title}</T>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                {Array.from({ length: PRACTICE_ROUNDS }).map((_, i) => {
                  const score = state.unitPractice?.[`${unit.id}:${f.id}:${i + 1}`];
                  const done = score != null;
                  return (
                    <Pressable key={i} onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'unit', unit: unit.id, focus: f.id, round: String(i + 1) } })} hitSlop={4} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: done ? (score >= 0.8 ? t.success : t.goldSoft) : t.surface2, borderWidth: 2, borderColor: done ? (score >= 0.8 ? t.success : palette.gold) : t.border }}>
                      <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: done && score >= 0.8 ? '#fff' : t.text2 }}>{done && score >= 0.8 ? '✓' : i + 1}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
          <Button title={`Banco da unidade · 20 de ${bankSize} questões`} icon="refresh" variant="secondary" onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'unitbank', unit: unit.id } })} />
        </View>
      )}

      <T v="h3" style={{ marginTop: 28, marginBottom: 6 }}>Resumo da gramática</T>
      <T v="small" style={{ marginBottom: 12 }}>Consulte as explicações a qualquer momento — toque para abrir.</T>
      <View style={{ gap: 10 }}>
        {unit.lessons.filter((l) => !l.story).flatMap((l) => l.teach.map((c, ci) => ({ c, key: l.id + ci, lesson: l }))).map(({ c, key, lesson }) => (
          <View key={key} style={{ backgroundColor: t.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: open === key ? color.main : t.border, overflow: 'hidden' }}>
            <Pressable onPress={() => setOpen(open === key ? null : key)} style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 }}>
              <Text style={{ fontSize: 18 }}>{lesson.emoji}</Text>
              <T v="bodyBold" style={{ flex: 1 }}>{c.title || lesson.title}</T>
              <Icon name={open === key ? 'down' : 'chevron'} size={18} color={t.text3} />
            </Pressable>
            {open === key ? <View style={{ padding: 14, paddingTop: 0 }}><TeachCard card={{ ...c, title: null }} color={color} /></View> : null}
          </View>
        ))}
      </View>

      <Button title={prog.tested ? 'Refazer o teste da unidade' : 'Fazer o teste da unidade'} icon="target" color={color.main} style={{ marginTop: 28 }} onPress={() => router.push({ pathname: '/practice/[mode]', params: { mode: 'test', unit: unit.id } })} />
    </Screen>
  );
}
