// Home building blocks: tabs, shortcuts, daily plan, next milestone, night mode, Sunday review, Explore.
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette, shadow } from '../theme';
import { T, Card, Tap, Chip, ProgressBar, Sheet, Button } from './ui';
import Icon from './Icon';
import Duck from './Duck';
import { dayKey } from '../store/dates';
import { dueItems, SHOP } from '../store/logic';
import { nextLesson, UNITS } from '../content';
import { STORY_LIST, NEWS_LIST } from '../content/stories';
import { levelOpen } from '../content/levels';

const P = (mode, params = {}) => () => router.push({ pathname: '/practice/[mode]', params: { mode, ...params } });

// Every activity in the app (used by shortcuts, the daily plan and Explorar)
export const ACTIVITIES = {
  quick: { emoji: '⚡', label: '5 minutos', color: '#E0A526', go: P('quick'), kind: 'quick' },
  review: { emoji: '🧠', label: 'Revisão', color: '#1E3A8A', go: P('review'), kind: 'review' },
  listening: { emoji: '👂', label: 'Escuta', color: '#0E7490', go: P('listening'), kind: 'listening' },
  speaking: { emoji: '🗣️', label: 'Pronúncia', color: '#E63946', go: P('speaking'), kind: 'speaking' },
  writing: { emoji: '✍️', label: 'Escrita', color: '#2A9D8F', go: P('writing'), kind: 'writing' },
  dictation: { emoji: '📝', label: 'Ditado', color: '#0F766E', go: P('dictation'), kind: 'dictation' },
  marathon: { emoji: '🏃', label: 'Maratona', color: '#C2417B', go: P('marathon'), kind: 'marathon' },
  timed: { emoji: '⏱️', label: 'Relógio', color: '#D9822B', go: P('timed'), kind: 'timed' },
  daily: { emoji: '🔥', label: 'Desafio', color: '#E63946', go: P('daily'), kind: 'daily' },
  verbs: { emoji: '🔁', label: 'Verbos', color: '#7C5CFC', go: P('verbs'), kind: 'verbs' },
  mistakes: { emoji: '🎯', label: 'Erros', color: '#EF6F6C', go: () => router.push('/mistakes'), kind: 'mistakes' },
  flashcards: { emoji: '🃏', label: 'Flashcards', color: '#2E9E5B', go: () => router.push('/flashcards'), kind: 'flashcards' },
  library: { emoji: '📚', label: 'Biblioteca', color: '#7C5CFC', go: () => router.push('/library'), kind: 'story' },
  adventure: { emoji: '🎮', label: 'Aventura', color: '#6D28D9', go: () => router.push({ pathname: '/library', params: { tab: 'adventures' } }), kind: 'adventure' },
  news: { emoji: '📰', label: 'Notícia', color: '#0E7490', go: () => router.push({ pathname: '/library', params: { tab: 'news' } }), kind: 'story' },
  music: { emoji: '🎵', label: 'Música', color: '#C2417B', go: () => router.push({ pathname: '/library', params: { tab: 'music' } }), kind: 'music' },
  vocab: { emoji: '🗂️', label: 'Vocabulário', color: '#D9822B', go: () => router.push('/vocab'), kind: 'vocab' },
  grammar: { emoji: '📐', label: 'Gramática', color: '#1E3A8A', go: () => router.push('/grammar'), kind: 'grammar' },
  sounds: { emoji: '🎧', label: 'Sons', color: '#C2417B', go: () => router.push('/sounds'), kind: 'pairs' },
  handsfree: { emoji: '🚗', label: 'Mãos-livres', color: '#334155', go: () => router.push('/handsfree'), kind: 'handsfree' },
  travel: { emoji: '✈️', label: 'Viagem', color: '#0EA5E9', go: () => router.push('/travel'), kind: 'travel' },
  diary: { emoji: '📓', label: 'Diário', color: '#B87333', go: () => router.push('/diary'), kind: 'diary' },
  conversation: { emoji: '💬', label: 'Conversa', color: '#E63946', go: () => router.push('/(tabs)/falar'), kind: 'conversation' },
  translate: { emoji: '🔁', label: 'Tradutor', color: '#0E7490', go: () => router.push('/translate'), kind: 'translate' },
  wordquiz: { emoji: '💬', label: 'Frase do dia', color: '#2A9D8F', go: P('wordquiz'), kind: 'wordquiz' },
};
export const DEFAULT_SHORTCUTS = ['quick', 'review', 'marathon', 'library'];

export function HomeTabs({ value, onChange }) {
  const t = useTheme();
  const tabs = [['hoje', '☀️ Hoje'], ['trilha', '🗺️ Trilha'], ['explorar', '🧭 Explorar']];
  return (
    <View style={{ flexDirection: 'row', gap: 4, padding: 4, borderRadius: radius.lg, backgroundColor: t.surface2 }}>
      {tabs.map(([id, l]) => (
        <Pressable key={id} onPress={() => onChange(id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: radius.md || 12, backgroundColor: value === id ? t.surface : 'transparent' }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: value === id ? t.text : t.text2 }}>{l}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function ActTile({ id, size = 'md', done }) {
  const t = useTheme();
  const a = ACTIVITIES[id];
  if (!a) return null;
  return (
    <Tap onPress={a.go} style={{ flex: 1, alignItems: 'center', gap: 6, paddingVertical: size === 'md' ? 12 : 10 }}>
      <View style={[{ width: 54, height: 54, borderRadius: 18, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center' }, shadow(t, 1)]}>
        <Text style={{ fontSize: 26 }}>{a.emoji}</Text>
        {done ? <View style={{ position: 'absolute', right: -4, top: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: t.success, alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={12} color="#fff" stroke={3} /></View> : null}
      </View>
      <Text numberOfLines={1} style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: t.text2 }}>{a.label}</Text>
    </Tap>
  );
}

// 4 shortcuts chosen by the user
export function Shortcuts() {
  const { state, actions } = useStore();
  const t = useTheme();
  const [edit, setEdit] = useState(false);
  const list = (state.settings.shortcuts || DEFAULT_SHORTCUTS).filter((x) => ACTIVITIES[x]).slice(0, 4);
  const [draft, setDraft] = useState(list);
  return (
    <View style={{ marginTop: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T v="label" style={{ flex: 1 }}>Seus atalhos</T>
        <Pressable onPress={() => { setDraft(list); setEdit(true); }} hitSlop={8}><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.sky }}>Editar</Text></Pressable>
      </View>
      <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
        {list.map((id) => <ActTile key={id} id={id} done={(state.daily.kinds || []).includes(ACTIVITIES[id].kind)} />)}
      </View>
      <Sheet visible={edit} onClose={() => setEdit(false)}>
        <Text style={{ fontFamily: fonts.display, fontSize: 21, color: t.text }}>Escolha 4 atalhos</Text>
        <T v="small" style={{ marginBottom: 12 }}>Eles aparecem no topo da tela inicial. {draft.length}/4</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {Object.entries(ACTIVITIES).map(([id, a]) => {
            const on = draft.includes(id);
            return (
              <Pressable key={id} onPress={() => setDraft(on ? draft.filter((x) => x !== id) : draft.length < 4 ? [...draft, id] : [...draft.slice(1), id])} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 99, borderWidth: 2, borderColor: on ? a.color : t.border, backgroundColor: on ? a.color + '22' : t.surface }}>
                <Text>{a.emoji}</Text>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: t.text }}>{a.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Button title="Salvar atalhos" style={{ marginTop: 16 }} disabled={draft.length !== 4} onPress={() => { actions.setSettings({ shortcuts: draft }); setEdit(false); }} />
      </Sheet>
    </View>
  );
}

// Daily plan: 5 varied activities, different every day
function seededPick(arr, n, seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = [...arr];
  const out = [];
  while (out.length < n && a.length) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(a.splice(h % a.length, 1)[0]);
  }
  return out;
}

export function dailyPlan(state) {
  const due = dueItems(state.srs, Date.now(), 999).length;
  const next = nextLesson(state);
  const unit = UNITS[Math.min(UNITS.length, state.unlockedUnit || 1) - 1];
  const items = [];
  if (next) items.push({ id: 'lesson', emoji: next.test ? '🏆' : next.lesson.emoji, label: next.test ? 'Teste da unidade' : `Lição: ${next.lesson.title}`, kind: 'lesson', go: () => router.push(next.test ? { pathname: '/practice/[mode]', params: { mode: 'test', unit: next.unit.id } } : { pathname: '/lesson/[id]', params: { id: next.lesson.id } }) });
  items.push(due ? { id: 'review', emoji: '🧠', label: `Revisar ${Math.min(due, 99)} itens`, kind: 'review', go: ACTIVITIES.review.go } : { id: 'unit', emoji: '🎯', label: `Treino da unidade ${unit.number}`, kind: 'unit', go: P('unit', { unit: unit.id, focus: 'mix', round: '1' }) });
  const rot = seededPick(['listening', 'speaking', 'writing', 'dictation', 'library', 'adventure', 'vocab', 'wordquiz', 'marathon', 'handsfree', 'news', 'verbs'], 3, dayKey());
  rot.forEach((id) => items.push({ id, emoji: ACTIVITIES[id].emoji, label: ACTIVITIES[id].label, kind: ACTIVITIES[id].kind, go: ACTIVITIES[id].go }));
  return items.map((i) => ({ ...i, done: i.kind === 'lesson' ? (state.daily.lessons || 0) > 0 : (state.daily.kinds || []).includes(i.kind) }));
}

export function DailyPlanCard({ style }) {
  const { state } = useStore();
  const t = useTheme();
  const plan = dailyPlan(state);
  const done = plan.filter((p) => p.done).length;
  return (
    <Card style={[{ gap: 10 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 20 }}>📋</Text>
        <T v="bodyBold" style={{ flex: 1 }}>Plano de hoje</T>
        <Chip label={done === plan.length ? 'Completo! 🎉' : `${done}/${plan.length}`} color={done === plan.length ? t.success : t.text2} bg={done === plan.length ? t.successSoft : t.surface2} />
      </View>
      <ProgressBar value={done / plan.length} color={done === plan.length ? t.success : t.sky} height={8} />
      {plan.map((p, i) => (
        <Tap key={p.id} onPress={p.go} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 }}>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: p.done ? t.successSoft : t.surface2, alignItems: 'center', justifyContent: 'center' }}>
            {p.done ? <Icon name="check" size={18} color={t.success} stroke={2.6} /> : <Text style={{ fontSize: 18 }}>{p.emoji}</Text>}
          </View>
          <Text numberOfLines={1} style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 15, color: p.done ? t.text3 : t.text, textDecorationLine: p.done ? 'line-through' : 'none' }}>{p.label}</Text>
          {!p.done ? <Icon name="chevron" size={18} color={t.text3} /> : null}
        </Tap>
      ))}
    </Card>
  );
}

// The closest next milestone, with progress
export function nextMilestone(state) {
  const s = state.streak?.best || 0;
  const cur = state.streak?.count || 0;
  const read = Object.keys(state.stories || {}).filter((k) => /^s\d/.test(k)).length;
  const medals = Object.keys(state.medals || {}).length;
  const cands = [
    cur < 7 && { emoji: '🌙', title: 'Cenário Noite estrelada', sub: `${7 - cur} dias de streak`, v: cur, max: 7, show: s < 7 },
    cur < 30 && { emoji: '👑', title: 'Coroa exclusiva', sub: `${30 - cur} dias de streak`, v: cur, max: 30, show: s < 30 && cur >= 7 },
    read < 10 && { emoji: '🧐', title: 'Monóculo exclusivo', sub: `Leia mais ${10 - read} histórias`, v: read, max: 10, show: true },
    medals < 1 && { emoji: '🥇', title: 'Medalha de ouro', sub: 'Complete um desafio semanal', v: 0, max: 1, show: true },
    (state.unlockedUnit || 1) < 10 && { emoji: '🎓', title: 'Capelo do B1', sub: `Chegue à unidade 10 (faltam ${10 - (state.unlockedUnit || 1)})`, v: state.unlockedUnit || 1, max: 10, show: true },
  ].filter((c) => c && c.show);
  if (!cands.length) return null;
  return cands.sort((a, b) => b.v / b.max - a.v / a.max)[0];
}

export function MilestoneCard({ style }) {
  const { state } = useStore();
  const t = useTheme();
  const m = nextMilestone(state);
  if (!m) return null;
  return (
    <Tap onPress={() => router.push('/shop')} style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border }, style]}>
      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: palette.goldSoft, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26 }}>{m.emoji}</Text>
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <T v="caption">PRÓXIMO MARCO</T>
        <T v="bodyBold">{m.title}</T>
        <ProgressBar value={m.v / m.max} color={palette.gold} height={6} />
        <T v="caption">{m.sub}</T>
      </View>
    </Tap>
  );
}

// After 21h with the day done: calm mode
export function NightCard({ style }) {
  const t = useTheme();
  return (
    <View style={[{ borderRadius: radius.xl, padding: 16, backgroundColor: '#1E2A4A', flexDirection: 'row', alignItems: 'center', gap: 12 }, style]}>
      <Duck size={70} mood="sleep" noBadge />
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 18, color: '#fff' }}>Revise antes de dormir 🌙</Text>
        <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>O cérebro fixa melhor o que você revisa à noite.</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={ACTIVITIES.review.go} style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.15)' }}><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: '#fff' }}>🧠 Revisão</Text></Pressable>
          <Pressable onPress={ACTIVITIES.handsfree.go} style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.15)' }}><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: '#fff' }}>🎧 Só ouvir</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

export function SundayCard({ style }) {
  const { state } = useStore();
  const t = useTheme();
  if (new Date().getDay() !== 0) return null;
  const done = state.weeklyReview === state.week?.key;
  return (
    <Tap onPress={P('weekly')} style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: done ? t.surface : palette.goldSoft, borderWidth: 2, borderColor: done ? t.border : palette.gold }, style]}>
      <Text style={{ fontSize: 32 }}>{done ? '✅' : '🗓️'}</Text>
      <View style={{ flex: 1 }}>
        <T v="bodyBold">Revisão da semana</T>
        <T v="small">{done ? 'Feita! Pode refazer para fixar mais.' : 'Domingo é dia de revisar a semana · +50 💶'}</T>
      </View>
      <Icon name="chevron" size={18} color={t.text3} />
    </Tap>
  );
}

// Explorar: every activity, grouped
const GROUPS = [
  ['Treinar agora', ['quick', 'marathon', 'timed', 'daily', 'review', 'mistakes']],
  ['Habilidades', ['listening', 'speaking', 'writing', 'dictation', 'sounds', 'verbs']],
  ['Ler, ouvir e jogar', ['library', 'adventure', 'news', 'music', 'handsfree', 'wordquiz']],
  ['Palavras e regras', ['vocab', 'grammar', 'flashcards']],
  ['Vida real', ['conversation', 'travel', 'diary', 'translate']],
];
export function ExploreTab() {
  const { state } = useStore();
  const t = useTheme();
  const unit = UNITS[Math.min(UNITS.length, state.unlockedUnit || 1) - 1];
  const newsOpen = NEWS_LIST.filter((n) => levelOpen(n.level, state)).length;
  return (
    <View style={{ gap: 14 }}>
      <Tap onPress={() => router.push({ pathname: '/unit/[id]', params: { id: unit.id } })} style={[{ borderRadius: radius.xl, padding: 16, backgroundColor: t.primary, flexDirection: 'row', alignItems: 'center', gap: 12 }, shadow(t, 1)]}>
        <Text style={{ fontSize: 36 }}>🎯</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.8)' }}>UNIDADE {unit.number} · {unit.level}</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#fff' }}>35 treinos extras da unidade</Text>
          <Text style={{ fontFamily: fonts.bodySemi, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>Vocabulário, escuta, escrita, gramática, fala, conversa e mistão</Text>
        </View>
      </Tap>
      {GROUPS.map(([title, ids]) => (
        <View key={title}>
          <T v="label" style={{ marginBottom: 2 }}>{title}</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {ids.map((id) => (
              <View key={id} style={{ width: '25%' }}><ActTile id={id} size="sm" done={(state.daily.kinds || []).includes(ACTIVITIES[id].kind)} /></View>
            ))}
          </View>
        </View>
      ))}
      <T v="caption" center>{STORY_LIST.length} histórias · {newsOpen}/{NEWS_LIST.length} notícias abertas · {SHOP.filter((i) => i.kind === 'outfit').length} itens para o Canard</T>
    </View>
  );
}
