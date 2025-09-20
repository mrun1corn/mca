import React from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type Mode = 'light' | 'dark' | 'system';
type Scheme = 'light' | 'dark';

type Palette = {
  bg: string;
  surface: string;
  card: string;
  overlay: string;
  border: string;
  text: string;
  textDim: string;
  textMuted: string;
  primary: string;
  primaryMuted: string;
  onPrimary: string;
  success: string;
  successSurface: string;
  danger: string;
  dangerSurface: string;
  chipBg: string;
  chipBgActive: string;
  chipTextActive: string;
};

type Typography = {
  title: number;
  subtitle: number;
  body: number;
  caption: number;
};

type ThemeContextType = {
  mode: Mode;
  scheme: Scheme;
  setMode: (m: Mode) => void;
  colors: Palette;
  typography: Typography;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const COLORS: Record<Scheme, Palette> = {
  light: {
    bg: '#f8fafc',
    surface: '#eef2ff',
    card: '#ffffff',
    overlay: 'rgba(15, 23, 42, 0.35)',
    border: '#e2e8f0',
    text: '#0f172a',
    textDim: '#64748b',
    textMuted: '#94a3b8',
    primary: '#2563eb',
    primaryMuted: '#1d4ed8',
    onPrimary: '#ffffff',
    success: '#15803d',
    successSurface: '#dcfce7',
    danger: '#b91c1c',
    dangerSurface: '#fee2e2',
    chipBg: '#e2e8f0',
    chipBgActive: '#dbeafe',
    chipTextActive: '#1d4ed8',
  },
  dark: {
    bg: '#0b1220',
    surface: '#111c2f',
    card: '#121c33',
    overlay: 'rgba(8, 15, 30, 0.65)',
    border: '#1f2a37',
    text: '#e2e8f0',
    textDim: '#94a3b8',
    textMuted: '#64748b',
    primary: '#60a5fa',
    primaryMuted: '#3b82f6',
    onPrimary: '#06111f',
    success: '#34d399',
    successSurface: 'rgba(34,197,94,0.16)',
    danger: '#f87171',
    dangerSurface: 'rgba(248,113,113,0.18)',
    chipBg: '#1f2937',
    chipBgActive: 'rgba(96,165,250,0.2)',
    chipTextActive: '#93c5fd',
  },
};

const TYPOGRAPHY: Typography = {
  title: 22,
  subtitle: 18,
  body: 15,
  caption: 13,
};

const KEY = 'theme-mode';

function resolveScheme(scheme: ColorSchemeName): Scheme {
  return scheme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<Mode>('system');
  const [system, setSystem] = React.useState<Scheme>(resolveScheme(Appearance.getColorScheme()));

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!colorScheme) return;
      setSystem(resolveScheme(colorScheme));
    });
    (async () => {
      const saved = await SecureStore.getItemAsync(KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') setModeState(saved);
    })();
    return () => subscription.remove();
  }, []);

  const setMode = React.useCallback(async (m: Mode) => {
    setModeState(m);
    await SecureStore.setItemAsync(KEY, m);
  }, []);

  const scheme: Scheme = mode === 'system' ? system : mode;
  const colors = COLORS[scheme];

  const value = React.useMemo(
    () => ({ mode, scheme, setMode, colors, typography: TYPOGRAPHY }),
    [mode, scheme, setMode, colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
