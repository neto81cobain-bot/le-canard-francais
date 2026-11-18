// Imagem para compartilhar (formato story 1080×1920) — WhatsApp, Instagram, etc.
// Tudo desenhado em SVG (sem módulo nativo novo): react-native-svg gera o PNG com toDataURL,
// expo-file-system salva e expo-sharing abre o menu de compartilhar.
import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, Share, Platform, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect, Circle, Path, G, Text as SvgText, Ellipse } from 'react-native-svg';
import { useStore } from '../store';
import { useTheme, fonts, radius } from '../theme';
import { T, Sheet, Button } from './ui';
import { duckLayers, DUCK_TRANSFORM, SCENES } from './duckArt';
import { wornOf, missionProgress, goalXP } from '../store/logic';
import { mondayKey, addDays, dayKey } from '../store/dates';
import { UNITS } from '../content';
import { toast } from '../services/dialog';

let Sharing = null;
let FS = null;
try { Sharing = require('expo-sharing'); } catch { Sharing = null; }
try { FS = require('expo-file-system'); } catch { FS = null; }

const W = 1080;
const H = 1920;
const NAVY = '#14296B';
const GOLD = '#F4A261';
const RED = '#E63946';
const CREAM = '#FBF7F0';
const DISPLAY = fonts.display;
const HEAVY = fonts.bodyHeavy;
const BOLD = fonts.bodyBold;
const TILE_COLORS = ['#3B82F6', '#2A9D8F', '#7C5CFC', '#EF6F6C', '#F4A261', '#22B8CF'];
const DOW = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

const TAGS = { path: Path, circle: Circle, ellipse: Ellipse, rect: Rect, g: G };
function nodes(list) {
  return list.map(([tag, attrs, kids], i) => {
    const C = TAGS[tag];
    if (!C) return null;
    return <C key={i} {...attrs}>{kids ? nodes(kids) : null}</C>;
  });
}

function fmtDate(k) {
  const [, m, d] = k.split('-');
  return `${d}/${m}`;
}

// Dados para cada modo
export function shareData(state, mode) {
  const unit = UNITS[(state.unlockedUnit || 1) - 1] || UNITS[0];
  const name = (state.profile?.name || '').trim().split(' ')[0];
  const base = { name, level: `${unit.level} · Unidade ${unit.number}`, streak: state.streak?.count || 0 };
  if (mode === 'dia') {
    const d = state.daily || {};
    const ms = (d.missions ? missionProgress(d) : []);
    const goal = goalXP(state.profile?.dailyMinutes);
    return {
      ...base,
      title: 'Meu dia de francês',
      sub: `${fmtDate(dayKey())} · ${base.level}`,
      xp: d.xp || 0,
      tiles: [
        ['Lições', d.lessons || 0], ['Acertos', d.correct || 0], ['Frases faladas', d.spoken || 0],
        ['Minutos', Math.round((d.seconds || 0) / 60)], ['Revisões', d.reviews || 0], ['Escuta', d.listen || 0],
      ],
      bar: { label: `Missões ${ms.filter((m) => m.done).length}/${ms.length || 5}`, value: ms.length ? ms.filter((m) => m.done).length / ms.length : 0, goal: `Meta ${Math.min(d.xp || 0, goal)}/${goal} XP`, goalValue: Math.min(1, (d.xp || 0) / goal) },
    };
  }
  const w = state.week || {};
  const mon = mondayKey(dayKey());
  const days = DOW.map((l, i) => ({ l, on: (state.history?.[addDays(mon, i)] || 0) > 0, today: addDays(mon, i) === dayKey() }));
  return {
    ...base,
    title: 'Minha semana de francês',
    sub: `${fmtDate(mon)} a ${fmtDate(addDays(mon, 6))} · ${base.level}`,
    xp: w.xp || 0,
    tiles: [
      ['Lições', w.lessons || 0], ['Acertos', w.correct || 0], ['Frases faladas', w.spoken || 0],
      ['Minutos', w.minutes || 0], ['Escuta', w.listen || 0], ['Histórias', w.stories || 0],
    ],
    days,
    medal: !!state.medals?.[w.key],
  };
}

function Flame({ x, y, s = 1 }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${s})`}>
      <Path d="M0 -34 C14 -18 26 -6 26 12 C26 30 14 42 0 42 C-14 42 -26 30 -26 12 C-26 0 -18 -8 -12 -16 C-10 -6 -6 0 0 2 C2 -10 -4 -22 0 -34 Z" fill={GOLD} />
      <Path d="M0 8 C8 16 12 22 12 28 C12 36 6 40 0 40 C-6 40 -12 36 -12 28 C-12 22 -6 16 0 8 Z" fill="#FFE29A" />
    </G>
  );
}

export function ShareArt({ data, wear, size, svgRef }) {
  const scene = wear.scene && SCENES[wear.scene];
  const duckScale = 2.15;
  const duckX = (W - 240 * duckScale) / 2;
  const duckY = 395;
  const cols = 3;
  const tw = 296;
  const th = 176;
  const gap = 26;
  const gx = (W - (cols * tw + (cols - 1) * gap)) / 2;
  const gy = 1215;
  return (
    <Svg ref={svgRef} width={size.w} height={size.h} viewBox={`0 0 ${W} ${H}`}>
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
          <Stop offset="0" stopColor="#0E1E52" />
          <Stop offset="0.55" stopColor={NAVY} />
          <Stop offset="1" stopColor="#2453C9" />
        </LinearGradient>
        <RadialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.14" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.06" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={W} height={H} fill="url(#bg)" />
      {/* confete discreto */}
      {[[90, 420, 10, GOLD], [980, 360, 14, RED], [140, 1010, 8, '#FFFFFF'], [960, 980, 9, GOLD], [70, 700, 6, '#FFFFFF'], [1010, 720, 7, '#FFFFFF'], [960, 560, 6, GOLD], [110, 560, 7, RED]].map(([x, y, r, c], i) => (
        <Circle key={i} cx={x} cy={y} r={r} fill={c} opacity={0.8} />
      ))}
      {/* faixa tricolor */}
      <Rect x="0" y="0" width={W / 3} height="22" fill="#2453C9" />
      <Rect x={W / 3} y="0" width={W / 3} height="22" fill="#FFFFFF" />
      <Rect x={(2 * W) / 3} y="0" width={W / 3} height="22" fill={RED} />

      <SvgText x={W / 2} y="128" textAnchor="middle" fill="#FFFFFF" opacity={0.75} fontFamily={HEAVY} fontSize="34" letterSpacing="8">LE CANARD FRANÇAIS</SvgText>
      <SvgText x={W / 2} y="228" textAnchor="middle" fill="#FFFFFF" fontFamily={DISPLAY} fontSize="76">{data.title}</SvgText>
      <SvgText x={W / 2} y="290" textAnchor="middle" fill="#C7D6FF" fontFamily={BOLD} fontSize="36">{(data.name ? data.name + ' · ' : '') + data.sub}</SvgText>

      {/* pato */}
      <Circle cx={W / 2} cy={duckY + 270} r="330" fill="url(#glow)" />
      <Circle cx={W / 2} cy={duckY + 270} r="250" fill={CREAM} />
      {scene ? (
        <G transform={`translate(${W / 2 - 250} ${duckY + 20}) scale(${500 / 240})`}>{nodes(scene)}</G>
      ) : null}
      <Ellipse cx={W / 2} cy={duckY + 470} rx="170" ry="22" fill="#000" opacity={0.12} />
      <G transform={`translate(${duckX} ${duckY}) scale(${duckScale})`}>
        <G transform={DUCK_TRANSFORM}>{nodes(duckLayers({ mood: 'proud', wear }))}</G>
      </G>

      {/* streak */}
      <Rect x={W / 2 - 230} y="905" width="460" height="92" rx="46" fill="#FFFFFF" opacity={0.12} />
      <Flame x={W / 2 - 165} y={948} s={0.95} />
      <SvgText x={W / 2 + 25} y="966" textAnchor="middle" fill="#FFFFFF" fontFamily={HEAVY} fontSize="42">{data.streak} {data.streak === 1 ? 'dia seguido' : 'dias seguidos'}</SvgText>

      {/* XP herói */}
      <SvgText x={W / 2} y="1108" textAnchor="middle" fill={GOLD} fontFamily={DISPLAY} fontSize="140">{String(data.xp)}</SvgText>
      <SvgText x={W / 2} y="1166" textAnchor="middle" fill="#FFFFFF" fontFamily={HEAVY} fontSize="36" letterSpacing="4">{data.days ? 'XP NA SEMANA' : 'XP HOJE'}</SvgText>

      {/* blocos */}
      {data.tiles.map(([label, v], i) => {
        const x = gx + (i % cols) * (tw + gap);
        const y = gy + Math.floor(i / cols) * (th + gap);
        return (
          <G key={label}>
            <Rect x={x} y={y} width={tw} height={th} rx="34" fill="url(#tile)" />
            <Rect x={x + 28} y={y + 30} width="44" height="10" rx="5" fill={TILE_COLORS[i]} />
            <SvgText x={x + 28} y={y + 112} fill="#FFFFFF" fontFamily={DISPLAY} fontSize="68">{String(v)}</SvgText>
            <SvgText x={x + 28} y={y + 152} fill="#C7D6FF" fontFamily={BOLD} fontSize="30">{label}</SvgText>
          </G>
        );
      })}

      {/* rodapé do modo */}
      {data.days ? (
        <G>
          {data.days.map((d, i) => {
            const cx = W / 2 + (i - 3) * 118;
            return (
              <G key={i}>
                <Circle cx={cx} cy="1690" r="44" fill={d.on ? GOLD : '#FFFFFF'} opacity={d.on ? 1 : 0.12} />
                {d.today ? <Circle cx={cx} cy="1690" r="52" fill="none" stroke="#FFFFFF" strokeWidth="5" /> : null}
                {d.on ? <Path d={`M${cx - 16} 1690 l11 12 l22 -24`} stroke={NAVY} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" /> : null}
                <SvgText x={cx} y="1775" textAnchor="middle" fill="#C7D6FF" fontFamily={HEAVY} fontSize="30">{d.l}</SvgText>
              </G>
            );
          })}
        </G>
      ) : data.bar ? (
        <G>
          {[[data.bar.label, data.bar.value, 1650, GOLD], [data.bar.goal, data.bar.goalValue, 1740, '#2A9D8F']].map(([l, v, y, c]) => (
            <G key={l}>
              <SvgText x={gx} y={y - 18} fill="#FFFFFF" fontFamily={HEAVY} fontSize="32">{l}</SvgText>
              <Rect x={gx} y={y} width={W - 2 * gx} height="26" rx="13" fill="#FFFFFF" opacity={0.14} />
              <Rect x={gx} y={y} width={Math.max(26, (W - 2 * gx) * v)} height="26" rx="13" fill={c} />
            </G>
          ))}
        </G>
      ) : null}

      <SvgText x={W / 2} y="1862" textAnchor="middle" fill="#FFFFFF" fontFamily={DISPLAY} fontSize="40">{data.medal ? 'Medalha da semana conquistada!' : 'Bora aprender francês comigo?'}</SvgText>
    </Svg>
  );
}

async function sharePng(svg, data) {
  if (Platform.OS === 'web' || !svg?.toDataURL || !Sharing?.shareAsync || !FS?.File) throw new Error('sem-imagem');
  const b64 = await new Promise((res, rej) => {
    const timer = setTimeout(() => rej(new Error('timeout')), 8000);
    svg.toDataURL((d) => { clearTimeout(timer); res(d); }, { width: W, height: H });
  });
  const f = new FS.File(FS.Paths.cache, `le-canard-${Date.now()}.png`);
  await f.write(b64.replace(/^data:image\/png;base64,/, ''), { encoding: 'base64' });
  await Sharing.shareAsync(f.uri, { mimeType: 'image/png', dialogTitle: data.title, UTI: 'public.png' });
}

function shareText(data) {
  const lines = data.tiles.filter(([, v]) => v).map(([l, v]) => `• ${l}: ${v}`).join('\n');
  return `🦆 ${data.title}\n⭐ ${data.xp} XP · 🔥 ${data.streak} dias seguidos\n${lines}\nBora aprender francês comigo?`;
}

// Folha com prévia + escolha Hoje/Semana
export function ShareSheet({ visible, onClose, initial = 'semana' }) {
  const { state } = useStore();
  const t = useTheme();
  const { width, height } = useWindowDimensions();
  const [mode, setMode] = useState(initial);
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);
  const data = useMemo(() => shareData(state, mode), [state, mode]);
  const wear = wornOf(state.inventory);
  const ph = Math.min(height * 0.52, 520);
  const size = { w: Math.min((ph * W) / H, width - 80), h: ph };
  size.h = (size.w * H) / W;
  const go = async () => {
    setBusy(true);
    try {
      await sharePng(ref.current, data);
    } catch (e) {
      if (e?.message === 'sem-imagem') Share.share({ message: shareText(data) }).catch(() => {});
      else toast('Não deu para gerar a imagem. Tente de novo.');
    }
    setBusy(false);
  };
  return (
    <Sheet visible={visible} onClose={onClose}>
      <View style={{ gap: 14, alignItems: 'center' }}>
        <T v="h3">Compartilhar</T>
        <View style={{ flexDirection: 'row', gap: 4, padding: 4, borderRadius: radius.lg, backgroundColor: t.surface2, alignSelf: 'stretch' }}>
          {[['dia', 'Hoje'], ['semana', 'Semana']].map(([id, l]) => (
            <Pressable key={id} onPress={() => setMode(id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 12, backgroundColor: mode === id ? t.surface : 'transparent' }}>
              <Text numberOfLines={1} style={{ fontFamily: fonts.bodyHeavy, fontSize: 14, color: mode === id ? t.text : t.text2 }}>{l}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{ borderRadius: 18, overflow: 'hidden' }}>
          <ShareArt data={data} wear={wear} size={size} svgRef={ref} />
        </View>
        <Button title={busy ? 'Gerando imagem…' : 'Compartilhar imagem'} icon="send" onPress={go} disabled={busy} style={{ alignSelf: 'stretch' }} />
        <Pressable onPress={() => Share.share({ message: shareText(data) }).catch(() => {})} hitSlop={8}>
          <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 13, color: t.text2 }}>Enviar só o texto</Text>
        </Pressable>
      </View>
    </Sheet>
  );
}
