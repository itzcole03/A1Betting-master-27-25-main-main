export declare const themeTokens: {,`n  colors: {,`n  primary: {,`n  50: string;,`n  100: string,`n  200: string;,`n  300: string,`n  400: string;,`n  500: string,`n  600: string;,`n  700: string,`n  800: string;,`n  900: string};
    gray: {,`n  50: string;,`n  100: string,`n  200: string;,`n  300: string,`n  400: string;,`n  500: string,`n  600: string;,`n  700: string,`n  800: string;,`n  900: string,`n  950: string};
    success: {,`n  50: string;,`n  500: string,`n  600: string;,`n  700: string};
    danger: {,`n  50: string;,`n  500: string,`n  600: string;,`n  700: string};};
  shadows: {,`n  soft: string;,`n  medium: string,`n  large: string};
  fonts: {,`n  sans: string};
  radii: {,`n  sm: string;,`n  md: string,`n  lg: string;,`n  xl: string;
    '2xl': string;
    '3xl': string;
    full: string};
  transitions: {,`n  fast: string;,`n  normal: string,`n  slow: string};
  gradients: {,`n  primary: string;,`n  success: string,`n  danger: string};};
export type ThemeTokens = typeof themeTokens;
export declare const getThemeValue: <T extends keyof ThemeTokens, K extends keyof ThemeTokens[T]>(
  category: T,
  key: K
) => ThemeTokens[T][K];
export declare const createThemeVariables: () => {
  readonly '--color-primary-50': '#f0f9ff';
  readonly '--color-primary-100': '#e0f2fe';
  readonly '--color-primary-200': '#bae6fd';
  readonly '--color-primary-300': '#7dd3fc';
  readonly '--color-primary-400': '#38bdf8';
  readonly '--color-primary-500': '#0ea5e9';
  readonly '--color-primary-600': '#0284c7';
  readonly '--color-primary-700': '#0369a1';
  readonly '--color-primary-800': '#075985';
  readonly '--color-primary-900': '#0c4a6e';
  readonly '--color-success': '#22c55e';
  readonly '--color-warning': '#f59e0b';
  readonly '--color-danger': '#ef4444';
  readonly '--color-info': '#3b82f6';
  readonly '--font-sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  readonly '--font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
  readonly '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)';
  readonly '--shadow-base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
  readonly '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
  readonly '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
  readonly '--shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
  readonly '--shadow-2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)';
  readonly '--shadow-inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)';};


`
