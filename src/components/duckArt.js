// Monsieur Canard as vector art: a plain duck + wearable layers drawn to fit him exactly.
// Nodes are [tag, attrs, children?] so the same data renders in the app (react-native-svg)
// and in the preview script used to check the drawings.
const O = '#2E2723'; // outline
const W = 3.4; // outline width
const BEAK = '#F7A531';
const BEAK2 = '#E5861A';
const st = { stroke: O, strokeWidth: W, strokeLinejoin: 'round', strokeLinecap: 'round' };

// Duck coordinates live inside this group so hats can poke above the head.
export const DUCK_TRANSFORM = 'translate(12 26) scale(0.88)';
// Points (in duck coordinates) used by emoji items.
export const ANCHORS = {
  held: { x: 74, y: 168, s: 46, r: -14 },
  ground: { x: 222, y: 206, s: 50, r: 0 },
};

const feet = [
  ['path', { d: 'M96 196 L72 220 Q80 217 85 224 Q90 216 98 222 Q101 212 110 215 Z', fill: BEAK, ...st }],
  ['path', { d: 'M150 196 L136 220 Q144 216 150 223 Q155 214 162 220 Q166 210 175 212 Z', fill: BEAK, ...st }],
];
const tail = ['path', { d: 'M54 136 Q34 126 36 106 Q46 120 60 118 Q50 106 56 92 Q66 110 78 114 Z', fill: '#FFFFFF', ...st }];
const body = [
  ['ellipse', { cx: 120, cy: 152, rx: 76, ry: 62, fill: '#FFFFFF' }],
  ['ellipse', { cx: 122, cy: 170, rx: 68, ry: 42, fill: '#EFE7DA' }],
  ['ellipse', { cx: 128, cy: 150, rx: 58, ry: 40, fill: '#FFFFFF' }],
  ['ellipse', { cx: 120, cy: 152, rx: 76, ry: 62, fill: 'none', ...st }],
];
const head = [
  ['circle', { cx: 130, cy: 78, r: 46, fill: '#FFFFFF', ...st }],
  ['ellipse', { cx: 127, cy: 118, rx: 31, ry: 13, fill: '#FFFFFF' }],
  ['path', { d: 'M121 34 Q117 22 127 19 Q122 26 129 31', fill: 'none', ...st, strokeWidth: 2.8 }],
  ['ellipse', { cx: 106, cy: 94, rx: 8, ry: 4.6, fill: '#F7B2B2', opacity: 0.75 }],
];
const wing = ['path', { d: 'M64 138 Q58 172 88 188 Q110 197 128 182 Q113 182 109 172 Q101 177 95 166 Q86 169 85 157 Q74 155 64 138 Z', fill: '#F8F3EB', ...st }];

const EYES = {
  open: [
    ['ellipse', { cx: 117, cy: 72, rx: 6.5, ry: 9, fill: O }],
    ['circle', { cx: 119.5, cy: 68, r: 2.5, fill: '#FFFFFF' }],
    ['ellipse', { cx: 148, cy: 70, rx: 6, ry: 8.5, fill: O }],
    ['circle', { cx: 150.3, cy: 66, r: 2.3, fill: '#FFFFFF' }],
    ['path', { d: 'M108 57 Q116 52 124 56', fill: 'none', ...st, strokeWidth: 2.6 }],
    ['path', { d: 'M141 54 Q148 50 156 54', fill: 'none', ...st, strokeWidth: 2.6 }],
  ],
  happy: [
    ['path', { d: 'M110 74 Q117 63 124 74', fill: 'none', ...st, strokeWidth: 3.6 }],
    ['path', { d: 'M141 72 Q148 61 155 72', fill: 'none', ...st, strokeWidth: 3.6 }],
  ],
  closed: [
    ['path', { d: 'M110 72 Q117 78 124 72', fill: 'none', ...st, strokeWidth: 3.2 }],
    ['path', { d: 'M141 70 Q148 76 155 70', fill: 'none', ...st, strokeWidth: 3.2 }],
  ],
  sad: [
    ['ellipse', { cx: 117, cy: 74, rx: 6, ry: 7.5, fill: O }],
    ['circle', { cx: 119, cy: 71, r: 2.2, fill: '#FFFFFF' }],
    ['ellipse', { cx: 148, cy: 72, rx: 5.6, ry: 7, fill: O }],
    ['circle', { cx: 150, cy: 69, r: 2, fill: '#FFFFFF' }],
    ['path', { d: 'M108 60 Q116 61 124 56', fill: 'none', ...st, strokeWidth: 2.6 }],
    ['path', { d: 'M141 55 Q149 60 157 60', fill: 'none', ...st, strokeWidth: 2.6 }],
  ],
  up: [
    ['ellipse', { cx: 118, cy: 70, rx: 6.5, ry: 9, fill: O }],
    ['circle', { cx: 120.5, cy: 64, r: 2.6, fill: '#FFFFFF' }],
    ['ellipse', { cx: 149, cy: 68, rx: 6, ry: 8.5, fill: O }],
    ['circle', { cx: 151.3, cy: 62, r: 2.4, fill: '#FFFFFF' }],
    ['path', { d: 'M108 54 Q116 48 124 53', fill: 'none', ...st, strokeWidth: 2.6 }],
    ['path', { d: 'M141 51 Q148 46 156 51', fill: 'none', ...st, strokeWidth: 2.6 }],
  ],
};

const BEAKS = {
  closed: [
    ['path', { d: 'M134 98 Q156 104 178 100 Q175 111 153 111 Q139 109 134 98 Z', fill: BEAK2, ...st }],
    ['path', { d: 'M128 87 Q150 78 177 86 Q191 90 185 98 Q171 105 146 101 Q131 99 128 92 Z', fill: BEAK, ...st }],
    ['circle', { cx: 162, cy: 87, r: 1.8, fill: O }],
  ],
  open: [
    ['path', { d: 'M134 100 Q140 120 160 121 Q176 119 180 104 Q160 106 134 100 Z', fill: '#B4451F', ...st }],
    ['path', { d: 'M142 112 Q156 120 170 113 Q160 109 142 112 Z', fill: '#F47C7C' }],
    ['path', { d: 'M128 86 Q150 76 177 84 Q191 88 185 96 Q171 103 146 99 Q131 97 128 91 Z', fill: BEAK, ...st }],
    ['circle', { cx: 162, cy: 85, r: 1.8, fill: O }],
  ],
};

// mood → eyes + beak
export const MOOD_FACE = {
  happy: ['open', 'closed'], wave: ['happy', 'closed'], teach: ['open', 'open'], celebrate: ['happy', 'open'],
  think: ['up', 'closed'], comfort: ['happy', 'closed'], listen: ['open', 'closed'], speak: ['open', 'open'],
  sleep: ['closed', 'closed'], proud: ['happy', 'closed'], offline: ['sad', 'closed'], sad: ['sad', 'closed'],
};

// ─── WEARABLES (drawn) ────────────────────────────────────
const dark = '#1F2937';
export const WEARABLES = {
  // head
  boina: [
    ['path', { d: 'M87 46 Q86 16 130 12 Q176 12 176 40 Q154 50 130 50 Q104 50 87 46 Z', fill: dark, ...st }],
    ['path', { d: 'M96 40 Q130 30 168 36', fill: 'none', stroke: '#374151', strokeWidth: 3 }],
    ['path', { d: 'M131 12 Q131 4 137 2', fill: 'none', ...st, strokeWidth: 3.6 }],
  ],
  beret: [ // boné
    ['path', { d: 'M94 46 Q94 10 132 10 Q168 10 168 46 Z', fill: '#3B82F6', ...st }],
    ['path', { d: 'M132 10 Q120 24 118 46 M132 10 Q146 26 148 46', fill: 'none', stroke: '#1D4ED8', strokeWidth: 2.4 }],
    ['path', { d: 'M150 42 Q184 38 198 48 Q182 56 150 50 Z', fill: '#2563EB', ...st }],
    ['circle', { cx: 132, cy: 11, r: 3.4, fill: '#1D4ED8', ...st, strokeWidth: 2 }],
  ],
  chef: [ // cartola
    ['ellipse', { cx: 130, cy: 40, rx: 44, ry: 9, fill: '#111827', ...st }],
    ['path', { d: 'M106 40 L108 -18 Q130 -24 152 -18 L154 40 Z', fill: '#111827', ...st }],
    ['path', { d: 'M107.4 22 L152.8 22 L153.4 34 L106.8 34 Z', fill: '#DC2626' }],
    ['path', { d: 'M114 -12 L116 16', stroke: '#4B5563', strokeWidth: 3, strokeLinecap: 'round' }],
  ],
  crown: [
    ['path', { d: 'M98 42 L102 8 L116 26 L130 0 L144 26 L158 8 L162 42 Q130 50 98 42 Z', fill: '#F5B829', ...st }],
    ['circle', { cx: 130, cy: 34, r: 4.5, fill: '#E63946', ...st, strokeWidth: 2 }],
    ['circle', { cx: 112, cy: 36, r: 3.4, fill: '#2EC4B6', ...st, strokeWidth: 2 }],
    ['circle', { cx: 148, cy: 36, r: 3.4, fill: '#2EC4B6', ...st, strokeWidth: 2 }],
    ['circle', { cx: 130, cy: 0, r: 3.4, fill: '#F5B829', ...st, strokeWidth: 2 }],
  ],
  grad: [
    ['path', { d: 'M104 34 L104 48 Q130 58 156 48 L156 34 Z', fill: '#111827', ...st }],
    ['path', { d: 'M80 28 L130 10 L180 28 L130 46 Z', fill: '#1F2937', ...st }],
    ['path', { d: 'M130 28 L172 32 L172 56', fill: 'none', stroke: '#F5B829', strokeWidth: 3, strokeLinecap: 'round' }],
    ['path', { d: 'M168 54 L176 54 L178 66 L166 66 Z', fill: '#F5B829', ...st, strokeWidth: 2 }],
    ['circle', { cx: 130, cy: 28, r: 3, fill: '#F5B829' }],
  ],
  toque: [
    ['path', { d: 'M102 44 L102 26 Q86 20 94 6 Q100 -6 114 0 Q122 -12 136 -4 Q150 -10 158 2 Q172 12 160 26 L160 44 Z', fill: '#FFFFFF', ...st }],
    ['path', { d: 'M102 32 L160 32', stroke: '#E5E7EB', strokeWidth: 3 }],
    ['path', { d: 'M118 30 L118 8 M132 30 L132 4 M146 30 L146 8', stroke: '#E5E7EB', strokeWidth: 2.4, strokeLinecap: 'round' }],
  ],
  bow: [
    ['path', { d: 'M100 40 L82 26 L84 52 Z', fill: '#F472B6', ...st }],
    ['path', { d: 'M100 40 L118 24 L120 50 Z', fill: '#F472B6', ...st }],
    ['circle', { cx: 101, cy: 39, r: 6, fill: '#EC4899', ...st }],
  ],
  // eyes
  glasses: [
    ['path', { d: 'M90 66 L104 66 M132 68 L136 67', stroke: O, strokeWidth: 3, strokeLinecap: 'round' }],
    ['rect', { x: 103, y: 61, width: 30, height: 21, rx: 9, fill: '#111827', ...st }],
    ['rect', { x: 135, y: 59, width: 27, height: 20, rx: 9, fill: '#111827', ...st }],
    ['path', { d: 'M108 66 L116 64 M140 64 L147 62', stroke: '#9CA3AF', strokeWidth: 2.4, strokeLinecap: 'round' }],
  ],
  specs: [
    ['circle', { cx: 117, cy: 72, r: 13, fill: '#BFDBFE', fillOpacity: 0.28, stroke: '#7C4A1E', strokeWidth: 3.4 }],
    ['circle', { cx: 148, cy: 70, r: 12, fill: '#BFDBFE', fillOpacity: 0.28, stroke: '#7C4A1E', strokeWidth: 3.4 }],
    ['path', { d: 'M130 71 Q133 67 136 70 M104 70 L90 66', fill: 'none', stroke: '#7C4A1E', strokeWidth: 3, strokeLinecap: 'round' }],
  ],
  monocle: [
    ['circle', { cx: 148, cy: 70, r: 12.5, fill: '#FEF3C7', fillOpacity: 0.3, stroke: '#D4A017', strokeWidth: 3.6 }],
    ['path', { d: 'M150 82 Q154 104 142 122', fill: 'none', stroke: '#D4A017', strokeWidth: 2, strokeDasharray: '3 3' }],
  ],
  // face
  mustache: [
    ['path', { d: 'M156 95 Q148 89 140 94 Q133 99 127 93 Q128 102 139 102 Q150 101 156 97 Q162 101 173 102 Q184 102 185 93 Q179 99 172 94 Q164 89 156 95 Z', fill: O }],
  ],
  // neck
  lenco: [
    ['path', { d: 'M93 108 Q127 128 162 106 L164 114 Q127 138 91 116 Z', fill: '#FFFFFF', ...st }],
    ['path', { d: 'M93 108 Q127 128 162 106', fill: 'none', stroke: '#1D4ED8', strokeWidth: 4 }],
    ['path', { d: 'M91 116 Q127 138 164 114', fill: 'none', stroke: '#DC2626', strokeWidth: 4 }],
    ['path', { d: 'M150 118 L168 146 L176 126 Z', fill: '#1D4ED8', ...st, strokeWidth: 2.6 }],
    ['path', { d: 'M150 118 L150 150 L162 132 Z', fill: '#DC2626', ...st, strokeWidth: 2.6 }],
    ['circle', { cx: 152, cy: 118, r: 6, fill: '#FFFFFF', ...st, strokeWidth: 2.6 }],
  ],
  scarf: [
    ['path', { d: 'M88 108 Q127 132 168 104 L170 118 Q127 146 86 122 Z', fill: '#DC2626', ...st }],
    ['path', { d: 'M100 117 L104 128 M116 122 L118 133 M134 123 L134 134 M150 119 L148 130', stroke: '#FFFFFF', strokeWidth: 3.2, strokeLinecap: 'round' }],
    ['path', { d: 'M146 122 L160 124 L156 168 L140 164 Z', fill: '#DC2626', ...st }],
    ['path', { d: 'M144 140 L158 142 M142 154 L157 156', stroke: '#FFFFFF', strokeWidth: 3.2, strokeLinecap: 'round' }],
  ],
  bowtie: [
    ['path', { d: 'M128 124 L108 112 L108 136 Z', fill: '#B91C1C', ...st }],
    ['path', { d: 'M128 124 L148 112 L148 136 Z', fill: '#B91C1C', ...st }],
    ['rect', { x: 122, y: 118, width: 12, height: 12, rx: 3, fill: '#991B1B', ...st, strokeWidth: 2.6 }],
  ],
  tie: [
    ['path', { d: 'M110 112 Q128 124 146 112 L140 126 Q128 132 116 126 Z', fill: '#FFFFFF', ...st, strokeWidth: 2.6 }],
    ['path', { d: 'M122 124 L134 124 L132 132 L124 132 Z', fill: '#1E3A8A', ...st, strokeWidth: 2.4 }],
    ['path', { d: 'M124 132 L132 132 L138 168 L128 178 L118 168 Z', fill: '#1E3A8A', ...st, strokeWidth: 2.6 }],
    ['path', { d: 'M125 142 L134 138 M123 154 L136 148 M122 166 L137 160', stroke: '#F5B829', strokeWidth: 2.4, strokeLinecap: 'round' }],
  ],
  medal: [
    ['path', { d: 'M108 112 L126 150 L134 150 L150 110', fill: 'none', stroke: '#2563EB', strokeWidth: 7, strokeLinejoin: 'round' }],
    ['path', { d: 'M108 112 L126 150 L134 150 L150 110', fill: 'none', stroke: '#DC2626', strokeWidth: 2.4 }],
    ['circle', { cx: 130, cy: 160, r: 13, fill: '#F5B829', ...st }],
    ['path', { d: 'M130 151 L133 157 L139 158 L134.5 162 L136 168 L130 165 L124 168 L125.5 162 L121 158 L127 157 Z', fill: '#FDE68A' }],
  ],
  pearls: Array.from({ length: 11 }).map((_, i) => {
    const t = i / 10;
    const x = 92 + t * 72;
    const y = 112 + Math.sin(t * Math.PI) * 18 - t * 4;
    return ['circle', { cx: Math.round(x * 10) / 10, cy: Math.round(y * 10) / 10, r: 4.4, fill: '#FFFDF7', stroke: '#CBBFA8', strokeWidth: 1.6 }];
  }),
};

// ─── BACKGROUNDS (scene slot, full 240×240, behind the duck) ──
export const SCENES = {
  paris: [
    ['rect', { x: 0, y: 0, width: 240, height: 240, fill: '#CFE3F7' }],
    ['circle', { cx: 46, cy: 44, r: 18, fill: '#FDE68A' }],
    ['path', { d: 'M196 196 L206 120 L210 70 L214 120 L224 196 Z M200 160 L220 160 M203 132 L217 132', fill: 'none', stroke: '#6B7280', strokeWidth: 3, strokeLinejoin: 'round' }],
    ['path', { d: 'M210 70 L210 56', stroke: '#6B7280', strokeWidth: 2 }],
    ['path', { d: 'M0 200 Q60 190 120 198 Q180 206 240 196 L240 240 L0 240 Z', fill: '#A7D3A6' }],
  ],
  nice: [
    ['rect', { x: 0, y: 0, width: 240, height: 240, fill: '#BDE6F6' }],
    ['circle', { cx: 196, cy: 46, r: 20, fill: '#FCD34D' }],
    ['rect', { x: 0, y: 150, width: 240, height: 40, fill: '#3BA3D0' }],
    ['path', { d: 'M0 160 Q20 156 40 160 Q60 164 80 160 Q100 156 120 160 Q140 164 160 160 Q180 156 200 160 Q220 164 240 160', fill: 'none', stroke: '#E0F2FE', strokeWidth: 2 }],
    ['path', { d: 'M0 190 Q120 180 240 190 L240 240 L0 240 Z', fill: '#F6DFA9' }],
  ],
  alpes: [
    ['rect', { x: 0, y: 0, width: 240, height: 240, fill: '#DBEAFE' }],
    ['path', { d: 'M-10 200 L60 80 L110 150 L160 60 L250 200 Z', fill: '#94A3B8' }],
    ['path', { d: 'M60 80 L44 108 L60 102 L74 112 Z M160 60 L142 92 L160 84 L176 96 Z', fill: '#FFFFFF' }],
    ['path', { d: 'M0 196 Q120 186 240 196 L240 240 L0 240 Z', fill: '#BBF7D0' }],
  ],
  amazonia: [
    ['rect', { x: 0, y: 0, width: 240, height: 240, fill: '#D1FAE5' }],
    ['ellipse', { cx: 30, cy: 120, rx: 40, ry: 60, fill: '#34A853' }],
    ['ellipse', { cx: 214, cy: 110, rx: 44, ry: 70, fill: '#2E8B57' }],
    ['path', { d: 'M24 170 L24 200 M214 170 L214 200', stroke: '#7C5A3A', strokeWidth: 8 }],
    ['path', { d: 'M0 196 Q120 184 240 196 L240 240 L0 240 Z', fill: '#C59D6A' }],
    ['path', { d: 'M0 214 Q120 206 240 216 L240 232 Q120 222 0 230 Z', fill: '#5DADE2' }],
  ],
  noite: [
    ['rect', { x: 0, y: 0, width: 240, height: 240, fill: '#1E2A4A' }],
    ['circle', { cx: 190, cy: 48, r: 18, fill: '#FDF6D8' }],
    ['circle', { cx: 198, cy: 42, r: 16, fill: '#1E2A4A' }],
    ...[[30, 30], [70, 60], [40, 100], [210, 120], [150, 30], [110, 18], [222, 86]].map(([x, y]) => ['circle', { cx: x, cy: y, r: 2, fill: '#FFFFFF' }]),
    ['path', { d: 'M0 200 Q120 190 240 200 L240 240 L0 240 Z', fill: '#2B3A63' }],
  ],
};

// Layer order. Scenes are behind; "held"/"ground" are emoji drawn by the component.
export function duckLayers({ mood = 'happy', wear = {} }) {
  const [eyes, beak] = MOOD_FACE[mood] || MOOD_FACE.happy;
  const w = (slot) => (wear[slot] && WEARABLES[wear[slot]]) || [];
  return [
    ...feet,
    tail,
    ...body,
    ...head,
    ...w('neck'),
    wing,
    ...EYES[eyes],
    ...BEAKS[beak],
    ...w('face'),
    ...w('eyes'),
    ...w('head'),
  ];
}

// SVG markup string (for the PDF certificate).
const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const nodeStr = ([tag, attrs, kids]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${kebab(k)}="${v}"`).join(' ')}>${(kids || []).map(nodeStr).join('')}</${tag}>`;
export function duckSvgString({ mood = 'proud', wear = {}, size = 180, emoji = {} } = {}) {
  const em = (slot) => {
    const a = ANCHORS[slot];
    const e = emoji[slot];
    return e ? `<text x="${a.x}" y="${a.y}" font-size="${a.s}" text-anchor="middle" dominant-baseline="central" transform="rotate(${a.r} ${a.x} ${a.y})">${e}</text>` : '';
  };
  const scene = wear.scene && SCENES[wear.scene] ? SCENES[wear.scene].map(nodeStr).join('') : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 240 240">${scene}<g transform="${DUCK_TRANSFORM}">${duckLayers({ mood, wear }).map(nodeStr).join('')}${em('held')}${em('ground')}</g></svg>`;
}
