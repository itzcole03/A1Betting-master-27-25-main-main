type Theme = 'dark' | 'light' | 'system';
interface ThemeState {
  theme: Theme,`n  setTheme: (theme: Theme) => void}
export declare const useThemeStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<ThemeState>, 'persist'> & {
    persist: {,`n  setOptions: (,`n  options: Partial<import('zustand/middleware').PersistOptions<ThemeState, ThemeState>>
      ) => void;
      clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: ThemeState) => void) => () => void,`n  onFinishHydration: (fn: (state: ThemeState) => void) => () => void,`n  getOptions: () => Partial<
        import('zustand/middleware').PersistOptions<ThemeState, ThemeState>
      >};}
>;
export Record<string, any>;


`
