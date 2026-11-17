import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export const palette = {
  navy: '#1E3A8A',
  navyDark: '#172E6E',
  sky: '#3B82F6',
  skySoft: '#DBEAFE',
  red: '#E63946',
  redDark: '#B92D38',
  redSoft: '#FDE2E4',
  gold: '#F4A261',
  goldDark: '#D9822B',
  goldSoft: '#FDEBD9',
  green: '#2A9D8F',
  greenDark: '#1F7A6F',
  greenSoft: '#D5F0EC',
  coral: '#EF6F6C',
  coralDark: '#D4504D',
  coralSoft: '#FDE4E3',
  purple: '#7C5CFC',
  purpleSoft: '#ECE7FF',
  white: '#FFFFFF',
  cream: '#FBF7F0',
};

const light = {
  mode: 'light',
  bg: '#FBF7F0',
  surface: '#FFFFFF',
  surface2: '#F4EFE6',
  surface3: '#EBE4D7',
  border: '#E7DFD0',
  borderStrong: '#D6CCB9',
  text: '#1F2937',
  text2: '#5B6472',
  text3: '#8C93A0',
  primary: palette.navy,
  primaryDark: palette.navyDark,
  primarySoft: '#E3E9F7',
  onPrimary: '#FFFFFF',
  accent: palette.red,
  success: palette.green,
  successSoft: palette.greenSoft,
  error: palette.coral,
  errorSoft: palette.coralSoft,
  gold: palette.gold,
  goldSoft: palette.goldSoft,
  sky: palette.sky,
  skySoft: palette.skySoft,
  shadow: 'rgba(31, 41, 55, 0.08)',
  overlay: 'rgba(15, 23, 42, 0.45)',
  tabBar: '#FFFFFF',
  statusBar: 'dark',
};

const dark = {
  mode: 'dark',
  bg: '#0F172A',
  surface: '#1E293B',
  surface2: '#253248',
  surface3: '#2E3C55',
  border: '#334155',
  borderStrong: '#46566F',
  text: '#F1F5F9',
  text2: '#AAB6C8',
  text3: '#7A879B',
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primarySoft: '#1E3A5F',
  onPrimary: '#FFFFFF',
  accent: '#F25C66',
  success: '#34B3A3',
  successSoft: '#123A37',
  error: '#F27F7C',
  errorSoft: '#3D1F23',
  gold: '#F6B27A',
  goldSoft: '#3A2A1A',
  sky: '#60A5FA',
  skySoft: '#1B2F4F',
  shadow: 'rgba(0,0,0,0.35)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  tabBar: '#16213A',
  statusBar: 'light',
};

export const fonts = {
  display: 'Fraunces_700Bold',
  displaySemi: 'Fraunces_600SemiBold',
  displayItalic: 'Fraunces_600SemiBold_Italic',
  body: 'Nunito_500Medium',
  bodyRegular: 'Nunito_400Regular',
  bodySemi: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
  bodyHeavy: 'Nunito_800ExtraBold',
};

export const radius = { sm: 10, md: 14, lg: 20, xl: 28, pill: 999 };
export const space = (n) => n * 4;

// Each unit gets its own colour so the trail feels alive
export const unitColors = [
  { main: '#1E3A8A', soft: '#E3E9F7', dark: '#152B66' },
  { main: '#E63946', soft: '#FDE2E4', dark: '#B92D38' },
  { main: '#2A9D8F', soft: '#D5F0EC', dark: '#1F7A6F' },
  { main: '#D9822B', soft: '#FDEBD9', dark: '#B0661C' },
  { main: '#7C5CFC', soft: '#ECE7FF', dark: '#5B3FD4' },
  { main: '#0E7490', soft: '#D7EFF5', dark: '#0A5A70' },
  { main: '#C2417B', soft: '#F9E1EC', dark: '#9C2F60' },
  { main: '#4D7C0F', soft: '#E5F0D3', dark: '#3A5E0B' },
  { main: '#B45309', soft: '#FBE8D2', dark: '#8C3F06' },
  { main: '#4338CA', soft: '#E3E1FA', dark: '#3329A0' },
  { main: '#BE123C', soft: '#FADDE4', dark: '#940E2E' },
  { main: '#0F766E', soft: '#D3EEEB', dark: '#0B5A54' },
];

const ThemeCtx = createContext(light);

export function ThemeProvider({ preference = 'light', children }) {
  const system = useColorScheme();
  const value = useMemo(() => {
    const m = preference === 'system' ? (system === 'dark' ? 'dark' : 'light') : preference;
    return m === 'dark' ? dark : light;
  }, [preference, system]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

export function shadow(t, level = 1) {
  return {
    shadowColor: '#1F2937',
    shadowOpacity: t.mode === 'dark' ? 0.4 : 0.08 * level,
    shadowRadius: 6 * level,
    shadowOffset: { width: 0, height: 2 * level },
    elevation: 2 * level,
  };
}
