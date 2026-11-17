import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Ellipse, Circle, G } from 'react-native-svg';
import { useTheme, fonts } from '../theme';

// Simple front-view mouth diagrams to show lip position for each sound family.
const SHAPES = {
  neutral: { label: 'Lábios relaxados', rx: 30, ry: 9, tongue: true },
  rounded: { label: 'Lábios em bico (como para assobiar)', rx: 14, ry: 14, tongue: false },
  spread: { label: 'Lábios esticados (sorriso)', rx: 38, ry: 6, tongue: false },
  open: { label: 'Boca bem aberta, relaxada', rx: 26, ry: 20, tongue: true },
  nasal: { label: 'Ar saindo também pelo nariz', rx: 24, ry: 12, tongue: false, nose: true },
};

export default function Mouth({ shape = 'neutral', color = '#E63946' }) {
  const t = useTheme();
  const s = SHAPES[shape] || SHAPES.neutral;
  return (
    <View style={{ alignItems: 'center', gap: 6 }}>
      <Svg width={180} height={150} viewBox="0 0 180 150">
        {/* face */}
        <Ellipse cx={90} cy={78} rx={70} ry={68} fill={t.mode === 'dark' ? '#3A4A66' : '#FBE3CF'} />
        {/* nose */}
        <Path d="M90 40 Q84 62 80 70 Q90 76 100 70 Q96 62 90 40" fill="none" stroke={t.mode === 'dark' ? '#8EA0BC' : '#D9A47F'} strokeWidth={2.5} strokeLinecap="round" />
        {s.nose ? (
          <G>
            <Path d="M78 74 Q66 70 58 58" stroke={t.sky} strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="5 5" />
            <Path d="M102 74 Q114 70 122 58" stroke={t.sky} strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="5 5" />
            <Circle cx={56} cy={55} r={4} fill={t.sky} />
            <Circle cx={124} cy={55} r={4} fill={t.sky} />
          </G>
        ) : null}
        {/* mouth */}
        <Ellipse cx={90} cy={108} rx={s.rx + 6} ry={s.ry + 6} fill={color} />
        <Ellipse cx={90} cy={108} rx={s.rx} ry={s.ry} fill="#5B1A22" />
        {s.tongue ? <Ellipse cx={90} cy={108 + s.ry * 0.45} rx={s.rx * 0.6} ry={Math.max(3, s.ry * 0.45)} fill="#E88B95" /> : null}
      </Svg>
      <Text style={{ fontFamily: fonts.bodyBold, color: t.text2, fontSize: 14 }}>{s.label}</Text>
    </View>
  );
}
