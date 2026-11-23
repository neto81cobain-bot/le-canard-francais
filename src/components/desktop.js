// Layout dedicado para computador (janela larga): barra lateral à esquerda,
// conteúdo no centro e um painel com streak, meta e missões à direita.
// Em lições/treinos entra em "modo foco": some tudo e ficam só a atividade e os atalhos.
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { router, useSegments } from 'expo-router';
import { useStore } from '../store';
import { useTheme, fonts, radius, palette } from '../theme';
import { T, Ring, ProgressBar, Button, Row } from './ui';
import Icon from './Icon';
import Duck, { DuckAvatar, autoMood } from './Duck';
import { avatarOf } from '../services/photo';
import { goalXP, missionProgress, levelInfo } from '../store/logic';
import { nextLesson } from '../content';
import { dayKey } from '../store/dates';
import { isWeb } from '../services/webfile';

export const SIDEBAR_W = 248;
export const RAIL_W = 320;

export function useDesktop() {
  const { width } = useWindowDimensions();
  return { desktop: isWeb && width >= 980, wide: isWeb && width >= 1300, width };
}

const FOCUS = new Set(['lesson', 'practice', 'placement', 'onboarding', 'story', 'adventure', 'handsfree', 'speak', 'flashcards', 'oauthredirect']);
export function useFocusMode() {
  const seg = useSegments();
  if (!seg.length) return true; // abertura animada
  if (FOCUS.has(seg[0])) return true;
  if ((seg[0] === 'guided' || seg[0] === 'conversation') && seg.length > 1 && seg[1] !== 'index') return true;
  return false;
}

const MAIN = [
  { key: 'index', label: 'Aprender', icon: 'home', href: '/' },
  { key: 'praticar', label: 'Praticar', icon: 'dumbbell', href: '/praticar' },
  { key: 'falar', label: 'Falar', icon: 'mic', href: '/falar' },
  { key: 'liga', label: 'Clube', icon: 'trophy', href: '/liga' },
  { key: 'perfil', label: 'Perfil', icon: 'user', href: '/perfil' },
];
const MORE = [
  { key: 'library', label: 'Biblioteca', emoji: '📚', href: '/library' },
  { key: 'stories', label: 'Histórias', emoji: '📖', href: '/stories' },
  { key: 'grammar', label: 'Gramática', emoji: '📐', href: '/grammar' },
  { key: 'verbs', label: 'Verbos', emoji: '🔤', href: '/verbs' },
  { key: 'dictionary', label: 'Dicionário', emoji: '🔎', href: '/dictionary' },
  { key: 'mistakes', label: 'Meus erros', emoji: '🩹', href: '/mistakes' },
  { key: 'shop', label: 'Loja', emoji: '🛍️', href: '/shop' },
  { key: 'settings', label: 'Configurações', emoji: '⚙️', href: '/settings' },
];

function NavItem({ active, label, icon, emoji, onPress, t }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      style={({ hovered }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: icon ? 11 : 8,
        paddingHorizontal: 14,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: active ? (t.mode === 'dark' ? t.sky : t.primary) : 'transparent',
        backgroundColor: active ? t.primarySoft : hovered ? t.surface2 : 'transparent',
        cursor: 'pointer',
      })}
    >
      {icon ? (
        <Icon name={icon} size={22} color={active ? (t.mode === 'dark' ? t.sky : t.primary) : t.text2} stroke={active ? 2.6 : 2.1} />
      ) : (
        <Text style={{ fontSize: 17, width: 22, textAlign: 'center' }}>{emoji}</Text>
      )}
      <Text style={{ fontFamily: active ? fonts.bodyHeavy : fonts.bodyBold, fontSize: icon ? 15.5 : 14, letterSpacing: icon ? 0.3 : 0, color: active ? (t.mode === 'dark' ? t.sky : t.primary) : icon ? t.text : t.text2, textTransform: icon ? 'uppercase' : 'none' }}>{label}</Text>
    </Pressable>
  );
}

export function Sidebar() {
  const t = useTheme();
  const seg = useSegments();
  const { state } = useStore();
  const current = seg[0] === '(tabs)' ? seg[1] || 'index' : seg[0];
  const go = (href) => router.navigate(href);
  return (
    <View style={{ width: SIDEBAR_W, flexShrink: 0, borderRightWidth: 2, borderRightColor: t.border, backgroundColor: t.bg, paddingHorizontal: 14, paddingTop: 22, paddingBottom: 16 }}>
      <Pressable onPress={() => go('/')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 8, marginBottom: 22, cursor: 'pointer' }}>
        <Duck size={44} head noBadge />
        <View>
          <Text style={{ fontFamily: fonts.display, fontSize: 20, color: t.mode === 'dark' ? '#fff' : palette.navy, lineHeight: 22 }}>Le canard</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 20, color: palette.red, lineHeight: 22 }}>français</Text>
        </View>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 4 }} style={{ flex: 1 }}>
        {MAIN.map((it) => (
          <NavItem key={it.key} t={t} active={current === it.key} label={it.label} icon={it.icon} onPress={() => go(it.href)} />
        ))}
        <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, letterSpacing: 1.2, color: t.text3, marginTop: 18, marginBottom: 4, paddingHorizontal: 14 }}>MAIS</Text>
        {MORE.map((it) => (
          <NavItem key={it.key} t={t} active={current === it.key} label={it.label} emoji={it.emoji} onPress={() => go(it.href)} />
        ))}
      </ScrollView>
      <Pressable onPress={() => go('/perfil')} style={({ hovered }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 14, backgroundColor: hovered ? t.surface2 : 'transparent', marginTop: 8, cursor: 'pointer' })}>
        <DuckAvatar size={36} photo={avatarOf(state)} mood={autoMood('happy', state)} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: t.text }}>{(state.profile?.name || 'Você').split(' ')[0]}</Text>
          <Text numberOfLines={1} style={{ fontFamily: fonts.bodySemi, fontSize: 12, color: t.text3 }}>{`${levelInfo(state.xp).emoji} ${levelInfo(state.xp).pt} · ${state.xp} XP`}</Text>
        </View>
      </Pressable>
    </View>
  );
}

function Panel({ t, children, style }) {
  return <View style={[{ borderWidth: 2, borderColor: t.border, borderRadius: radius.lg, padding: 18, gap: 12, backgroundColor: t.surface }, style]}>{children}</View>;
}

export function RightRail() {
  const t = useTheme();
  const { state } = useStore();
  const goal = goalXP(state.profile.dailyMinutes);
  const missions = missionProgress(state.daily);
  const next = nextLesson(state);
  const lv = levelInfo(state.xp);
  const today = state.streak.lastDay === dayKey();
  const startNext = () => {
    if (!next) return;
    if (next.test) router.push({ pathname: '/practice/[mode]', params: { mode: 'test', unit: next.unit.id } });
    else router.push({ pathname: '/lesson/[id]', params: { id: next.lesson.id } });
  };
  const stats = [
    ['flame', state.streak.count, today ? palette.red : t.text3, 'dias'],
    ['bolt', state.xp, palette.gold, 'XP'],
    ...(state.settings.hearts ? [['heart', state.hearts.count, palette.coral, 'vidas']] : []),
  ];
  return (
    <View style={{ width: RAIL_W, flexShrink: 0, flexGrow: 0 }}>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 22, paddingLeft: 8, gap: 16 }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 4 }}>
        {stats.map(([ic, v, c, l]) => (
          <Pressable key={ic} onPress={() => router.navigate('/perfil')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, cursor: 'pointer' }} accessibilityLabel={`${v} ${l}`}>
            <Icon name={ic} size={22} color={c} stroke={2.6} />
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 17, color: t.text }}>{v}</Text>
          </Pressable>
        ))}
      </View>

      {next ? (
        <Panel t={t} style={{ backgroundColor: t.mode === 'dark' ? '#1E3A8A' : palette.navy, borderColor: 'transparent' }}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, letterSpacing: 1.2, color: '#C7D6FF' }}>{next.test ? 'PROVA DA UNIDADE' : `CONTINUAR · UNIDADE ${next.unit.number}`}</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 21, color: '#fff' }} numberOfLines={2}>{next.test ? next.unit.title : next.lesson.title}</Text>
          <Button title={next.test ? 'Fazer a prova' : 'Começar lição'} icon="play" onPress={startNext} color={palette.gold} small />
        </Panel>
      ) : null}

      <Panel t={t}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Ring value={state.daily.xp / goal} size={62} stroke={8} color={state.daily.goalHit ? t.success : palette.gold}>
            <Icon name={state.daily.goalHit ? 'check' : 'bolt'} size={22} color={state.daily.goalHit ? t.success : palette.gold} stroke={2.6} />
          </Ring>
          <View style={{ flex: 1, gap: 2 }}>
            <T v="bodyBold">Meta de hoje</T>
            <T v="small">{Math.min(state.daily.xp, goal)} / {goal} XP{state.daily.goalHit ? ' · cumprida! 🔥' : ''}</T>
          </View>
        </View>
      </Panel>

      <Panel t={t}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <T v="bodyBold">Missões do dia</T>
          <Pressable onPress={() => router.navigate('/')} style={{ cursor: 'pointer' }}><Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.sky }}>VER TUDO</Text></Pressable>
        </View>
        {missions.map((m) => (
          <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: m.done ? t.successSoft : t.surface2, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={m.done ? 'check' : m.icon} size={16} color={m.done ? t.success : t.primary} stroke={2.4} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <T v="small" color={t.text} numberOfLines={1}>{m.title}</T>
              <ProgressBar value={m.value / m.target} height={7} color={m.done ? t.success : palette.gold} />
            </View>
            <T v="caption">{m.value}/{m.target}</T>
          </View>
        ))}
      </Panel>

      <Panel t={t}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <T v="bodyBold">Nível {lv.index + 1}</T>
          <T v="caption">{lv.next ? `faltam ${lv.toNext} XP` : 'nível máximo'}</T>
        </View>
        <ProgressBar value={lv.progress} height={9} color={t.sky} />
        <Pressable onPress={() => router.push('/placement')} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Text style={{ fontSize: 16 }}>🎯</Text>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: t.sky }}>Fazer o teste de nível (A1 → C1)</Text>
        </Pressable>
      </Panel>

      <Panel t={t} style={{ backgroundColor: 'transparent' }}>
        <T v="bodyBold">⌨️ Atalhos no computador</T>
        {[
          ['1 – 9', 'escolher a alternativa'],
          ['Enter', 'verificar / continuar'],
          ['Esc', 'voltar'],
        ].map(([k, v]) => (
          <View key={k} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 12, color: t.text, borderWidth: 1.5, borderBottomWidth: 3, borderColor: t.border, borderRadius: 7, paddingHorizontal: 7, paddingVertical: 2, minWidth: 48, textAlign: 'center' }}>{k}</Text>
            <T v="small">{v}</T>
          </View>
        ))}
      </Panel>
    </ScrollView>
    </View>
  );
}

// Atalhos de teclado (só no computador): 1–9 escolhe a alternativa, Enter confirma,
// Esc volta. Funciona marcando os botões com testID ("kb-opt" e "kb-primary").
const visible = (el) => !!el && el.offsetParent !== null && el.getAttribute('aria-disabled') !== 'true';
export function useKeyboardShortcuts(enabled) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target?.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;
      // Uma janela/folha aberta? Os atalhos agem só dentro dela.
      const dialogs = Array.from(document.querySelectorAll('[role="dialog"], [aria-modal="true"]')).filter((d) => d.offsetParent !== null || d.getClientRects().length);
      const scope = dialogs.length ? dialogs[dialogs.length - 1] : document;
      if (e.key === 'Enter' && !e.shiftKey) {
        const prim = Array.from(scope.querySelectorAll('[data-testid="kb-primary"]')).filter(visible);
        const btn = prim[prim.length - 1];
        if (btn) {
          e.preventDefault();
          btn.click();
        }
        return;
      }
      if (typing) return;
      if (/^[1-9]$/.test(e.key)) {
        const opts = Array.from(scope.querySelectorAll('[data-testid="kb-opt"]')).filter(visible);
        const el = opts[Number(e.key) - 1];
        if (el) {
          e.preventDefault();
          el.click();
        }
        return;
      }
      if (e.key === 'Escape' && !dialogs.length && router.canGoBack()) {
        e.preventDefault();
        router.back();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled]);
}

// Linha das Configurações (app de PC): estado da voz francesa neural.
export function DesktopVoiceRow() {
  const t = useTheme();
  const desk = typeof window !== 'undefined' ? window.canardDesktop : null;
  const [st, setSt] = useState(null);
  useEffect(() => {
    if (!desk?.voice) return undefined;
    desk.voice.status().then(setSt).catch(() => {});
    return desk.voice.onChange(setSt);
  }, []);
  if (!desk?.voice) return null;
  const sub = !st ? 'Verificando…'
    : st.state === 'ready' ? 'Voz neural instalada · funciona offline ✓'
      : st.state === 'downloading' ? `Baixando a voz… ${st.progress}%`
        : st.state === 'error' ? '⚠️ Não deu para baixar. Toque para tentar de novo.'
          : 'Toque para baixar (~80 MB, só uma vez)';
  return (
    <View>
      <Row icon="volume" title="Voz francesa" subtitle={sub} onPress={() => desk.voice.install().then(setSt).catch(() => {})} />
      {st?.state === 'downloading' ? <ProgressBar value={st.progress / 100} height={6} color={t.sky} style={{ marginHorizontal: 16, marginBottom: 12 }} /> : null}
    </View>
  );
}
