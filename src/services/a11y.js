// Accessibility prefs read by low-level components (set from settings in _layout).
export const a11y = { textScale: 1, reduceMotion: false };
export function setA11y(p) {
  a11y.textScale = p.textScale || 1;
  a11y.reduceMotion = !!p.reduceMotion;
}
