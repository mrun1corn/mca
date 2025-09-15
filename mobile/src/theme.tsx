import React from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type Mode = 'light' | 'dark' | 'system';
type Scheme = 'light' | 'dark';

type ThemeContextType = {
  mode: Mode;
  scheme: Scheme;
  setMode: (m: Mode) => void;
  colors: {
    bg: string;
    card: string;
    text: string;
    textDim: string;
    border: string;
    primary: string;
    success: string;
    danger: string;
  };
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const COLORS = {
  light: {
    bg: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    textDim: '#64748b',
    border: '#e2e8f0',
    primary: '#2563eb',
    success: '#166534',
    danger: '#b91c1c',
  },
  dark: {
    bg: '#0b1220',
    card: '#0f172a',
    text: '#e5e7eb',
    textDim: '#94a3b8',
    border: '#1f2a37',
    primary: '#60a5fa',
    success: '#34d399',
    danger: '#f87171',
  },
};

const KEY = 'theme-mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<Mode>('system');
  const [system, setSystem] = React.useState<Scheme>((Appearance.getColorScheme() as Scheme) || 'light');

  React.useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => setSystem((colorScheme || 'light') as Scheme));
    (async () => {
      const saved = await SecureStore.getItemAsync(KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') setModeState(saved);
    })();
  }, []);

  const setMode = React.useCallback(async (m: Mode) => {
    setModeState(m);
    await SecureStore.setItemAsync(KEY, m);
  }, []);

  const scheme: Scheme = mode === 'system' ? system : mode;
  const colors = scheme === 'dark' ? COLORS.dark : COLORS.light;

  return (
    <ThemeContext.Provider value={{ mode, scheme, setMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

