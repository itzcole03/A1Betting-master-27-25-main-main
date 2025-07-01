import React from 'react.ts';
interface ThemeContextType {
  isDarkMode: boolean,`n  toggleTheme: () => void}
declare const ThemeContext: React.Context<ThemeContextType>;
export declare const useThemeContext: () => ThemeContextType;
interface ThemeProviderProps {
  children: React.ReactNode}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeContext;


`
