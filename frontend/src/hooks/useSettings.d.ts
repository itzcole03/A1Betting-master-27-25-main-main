interface Settings {
  darkMode: boolean,`n  useMocks: boolean;,`n  logLevel: 'debug' | 'info' | 'warning' | 'error'}
export declare const useSettings: () => {,`n  settings: Settings;,`n  updateSettings: (newSettings: Partial<Settings>) => void};
export Record<string, any>;


`
