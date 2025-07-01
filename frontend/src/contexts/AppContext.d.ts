import React from 'react.ts';
interface AppState {
  darkMode: boolean,`n  connectedSources: number;,`n  dataQuality: number,`n  totalSources: number;,`n  isLoading: boolean,`n  lastUpdate: Date | null;,`n  connectionStatus: 'connected' | 'connecting' | 'disconnected',`n  notifications: Notification[0]}
interface Notification {
  id: string,`n  message: string;,`n  type: 'success' | 'warning' | 'error' | 'info',`n  timestamp: Date}
interface AppContextValue {
  state: AppState,`n  toggleDarkMode: () => void;,`n  setConnectedSources: (count: number) => void,`n  setDataQuality: (quality: number) => void,`n  setLoading: (loading: boolean) => void,`n  updateConnectionStatus: (status: 'connected' | 'connecting' | 'disconnected') => void,`n  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void,`n  refreshData: () => Promise<void>}
declare const AppContext: React.Context<AppContextValue | undefined>;
export declare const AppProvider: React.FC<{,`n  children: React.ReactNode}>;
export declare const useApp: () => AppContextValue;
export default AppContext;


`
