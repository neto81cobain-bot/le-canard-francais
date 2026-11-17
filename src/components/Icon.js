import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, Polygon } from 'react-native-svg';

// A single consistent line-icon set (24×24, round caps) used everywhere.
const P = {
  home: (c) => (<><Path d="M3 10.5 12 3l9 7.5" /><Path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></>),
  map: () => (<><Polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><Line x1="9" y1="3" x2="9" y2="18" /><Line x1="15" y1="6" x2="15" y2="21" /></>),
  dumbbell: () => (<><Path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" /></>),
  mic: () => (<><Rect x="9" y="2.5" width="6" height="12" rx="3" /><Path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7" /></>),
  trophy: () => (<><Path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" /><Path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" /></>),
  user: () => (<><Circle cx="12" cy="8" r="4" /><Path d="M4 21a8 8 0 0 1 16 0" /></>),
  gear: () => (<><Circle cx="12" cy="12" r="3" /><Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>),
  back: () => <Polyline points="15 18 9 12 15 6" />,
  chevron: () => <Polyline points="9 18 15 12 9 6" />,
  down: () => <Polyline points="6 9 12 15 18 9" />,
  close: () => (<><Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" /></>),
  check: () => <Polyline points="4 12.5 9.5 18 20 6.5" />,
  flame: () => <Path d="M12 22c4 0 7-2.7 7-6.8 0-3.6-2.4-5.6-3.6-7.7-.6 1.6-1.6 2.6-2.6 3C13 7 11.5 4 9 2c.3 3.4-1.7 5.6-3.3 7.6C4.6 11 4 12.6 4 15.2 4 19.3 8 22 12 22Z" />,
  bolt: () => <Polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2" />,
  gem: () => (<><Polygon points="6 3 18 3 22 9 12 21 2 9 6 3" /><Path d="M2 9h20M12 21 8 9l4-6 4 6-4 12" /></>),
  heart: () => <Path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  volume: () => (<><Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><Path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></>),
  turtle: () => (<><Path d="M4 15c0-4 3.6-7 8-7s8 3 8 7H4Z" /><Path d="M20 15h1.5a1.5 1.5 0 0 0 0-3H20M7 15l-1 3M17 15l1 3M9 8.5 12 12l3-3.5" /></>),
  lock: () => (<><Rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" /><Path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></>),
  star: () => <Polygon points="12 2.5 15 8.8 22 9.8 17 14.6 18.2 21.5 12 18.2 5.8 21.5 7 14.6 2 9.8 9 8.8 12 2.5" />,
  book: () => (<><Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" /><Path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></>),
  target: () => (<><Circle cx="12" cy="12" r="9" /><Circle cx="12" cy="12" r="5" /><Circle cx="12" cy="12" r="1" /></>),
  refresh: () => (<><Polyline points="21 4 21 10 15 10" /><Path d="M3 20v-6h6" /><Path d="M5.5 9a8 8 0 0 1 14-2.5L21 10M3 14l1.5 3.5A8 8 0 0 0 18.5 15" /></>),
  headphones: () => (<><Path d="M3 18v-6a9 9 0 0 1 18 0v6" /><Rect x="2.5" y="14" width="5" height="7" rx="2" /><Rect x="16.5" y="14" width="5" height="7" rx="2" /></>),
  clock: () => (<><Circle cx="12" cy="12" r="9" /><Polyline points="12 7 12 12 15.5 14" /></>),
  gift: () => (<><Rect x="3" y="8" width="18" height="4" rx="1" /><Path d="M5 12v9h14v-9M12 8v13" /><Path d="M12 8H8a2.5 2.5 0 1 1 0-5c3 0 4 5 4 5ZM12 8h4a2.5 2.5 0 1 0 0-5c-3 0-4 5-4 5Z" /></>),
  plus: () => (<><Line x1="12" y1="5" x2="12" y2="19" /><Line x1="5" y1="12" x2="19" y2="12" /></>),
  copy: () => (<><Rect x="9" y="9" width="12" height="12" rx="2" /><Path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></>),
  trash: () => (<><Polyline points="3 6 5 6 21 6" /><Path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" /></>),
  download: () => (<><Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><Polyline points="7 10 12 15 17 10" /><Line x1="12" y1="15" x2="12" y2="3" /></>),
  upload: () => (<><Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><Polyline points="17 8 12 3 7 8" /><Line x1="12" y1="3" x2="12" y2="15" /></>),
  logout: () => (<><Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><Polyline points="16 17 21 12 16 7" /><Line x1="21" y1="12" x2="9" y2="12" /></>),
  bell: () => (<><Path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><Path d="M13.7 21a2 2 0 0 1-3.4 0" /></>),
  moon: () => <Path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  sun: () => (<><Circle cx="12" cy="12" r="4.5" /><Path d="M12 1.5v2M12 20.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M1.5 12h2M20.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></>),
  globe: () => (<><Circle cx="12" cy="12" r="9.5" /><Path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19M12 2.5a14.5 14.5 0 0 0 0 19" /></>),
  info: () => (<><Circle cx="12" cy="12" r="9.5" /><Line x1="12" y1="11" x2="12" y2="16.5" /><Circle cx="12" cy="7.8" r="0.6" /></>),
  flag: () => (<><Path d="M4 21V4M4 4h12l-2 4 2 4H4" /></>),
  cards: () => (<><Rect x="7" y="3" width="13" height="16" rx="2" /><Path d="M4 6.5v12A2.5 2.5 0 0 0 6.5 21H16" /></>),
  list: () => (<><Line x1="9" y1="6" x2="20" y2="6" /><Line x1="9" y1="12" x2="20" y2="12" /><Line x1="9" y1="18" x2="20" y2="18" /><Circle cx="4.5" cy="6" r="1" /><Circle cx="4.5" cy="12" r="1" /><Circle cx="4.5" cy="18" r="1" /></>),
  search: () => (<><Circle cx="11" cy="11" r="7" /><Line x1="21" y1="21" x2="16" y2="16" /></>),
  swap: () => (<><Polyline points="17 3 21 7 17 11" /><Path d="M3 7h18" /><Polyline points="7 21 3 17 7 13" /><Path d="M21 17H3" /></>),
  send: () => (<><Line x1="22" y1="2" x2="11" y2="13" /><Polygon points="22 2 15 22 11 13 2 9 22 2" /></>),
  cloud: () => <Path d="M17.5 19H7a5 5 0 1 1 .9-9.9A6 6 0 0 1 19.5 11a4 4 0 0 1-2 8Z" />,
  sparkles: () => (<><Path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" /><Path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>),
  chat: () => <Path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.4A8.5 8.5 0 1 1 21 12Z" />,
  shop: () => (<><Path d="M4 7h16l-1.5 13.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5L4 7Z" /><Path d="M8.5 10V6a3.5 3.5 0 0 1 7 0v4" /></>),
  users: () => (<><Circle cx="9" cy="8" r="3.5" /><Path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><Path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18.5 14a6.5 6.5 0 0 1 3 6" /></>),
  medal: () => (<><Circle cx="12" cy="15" r="6" /><Path d="M8.5 10 6 2h4l2 5 2-5h4l-2.5 8" /></>),
  calendar: () => (<><Rect x="3" y="4.5" width="18" height="17" rx="2" /><Path d="M16 2.5v4M8 2.5v4M3 10h18" /></>),
  chart: () => (<><Line x1="6" y1="20" x2="6" y2="12" /><Line x1="12" y1="20" x2="12" y2="5" /><Line x1="18" y1="20" x2="18" y2="9" /></>),
  edit: () => (<><Path d="M12 20h9" /><Path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></>),
  keyboard: () => (<><Rect x="2" y="5" width="20" height="14" rx="2" /><Path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M8 16h8" /></>),
  stop: () => <Rect x="6" y="6" width="12" height="12" rx="2.5" />,
  play: () => <Polygon points="7 4 20 12 7 20 7 4" />,
  bookmark: () => <Path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />,
  eye: () => (<><Path d="M1.5 12S5.5 4.5 12 4.5 22.5 12 22.5 12 18.5 19.5 12 19.5 1.5 12 1.5 12Z" /><Circle cx="12" cy="12" r="3" /></>),
  layers: () => (<><Polygon points="12 2 2 7 12 12 22 7 12 2" /><Polyline points="2 17 12 22 22 17" /><Polyline points="2 12 12 17 22 12" /></>),
  coffee: () => (<><Path d="M17 8h1a4 4 0 0 1 0 8h-1" /><Path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" /><Path d="M6 1.5v3M10 1.5v3M14 1.5v3" /></>),
  wave: () => <Path d="M2 12h2l2-6 3 12 3-15 3 15 3-9 2 3h2" />,
  link: () => (<><Path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><Path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>),
  heartFill: () => null,
};

export default function Icon({ name, size = 22, color = '#1F2937', stroke = 2, fill = 'none', style }) {
  const draw = P[name] || P.info;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {draw(color)}
    </Svg>
  );
}
