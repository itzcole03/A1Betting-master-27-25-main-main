import { Theme} from '@mui/material/styles.ts';
declare module '@mui/material/styles' {
  interface Theme {
    custom: {,`n  maxWidth: number;,`n  headerHeight: number,`n  sidebarWidth: number;,`n  borderRadius: number,`n  transition: string};}
  interface ThemeOptions {
    custom?: {
      maxWidth: number,`n  headerHeight: number;,`n  sidebarWidth: number,`n  borderRadius: number;,`n  transition: string};}
}
export declare const createTheme: (mode?: 'light' | 'dark') => Theme;
export declare const useTheme: () => Theme;


`
