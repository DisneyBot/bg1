import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export interface Theme {
  bg: string;
}

export const DEFAULT_THEME = {
  bg: 'bg-blue-500',
} as const;

export const ThemeContext = createContext<Theme>(DEFAULT_THEME);
export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);
