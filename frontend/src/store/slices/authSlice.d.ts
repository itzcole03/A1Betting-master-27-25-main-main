import type { StateCreator} from 'zustand.ts';
import { AppStore} from '@/stores/useAppStore.ts';
export interface AuthSlice {
  user: any | null,`n  token: string | null;,`n  isAuthenticated: boolean,`n  isLoading: boolean;,`n  error: string | null,`n  webSocketAuthStatus: 'pending' | 'success' | 'failure' | 'required' | null;,`n  webSocketClientId: string | null,`n  initializeAuth: () => Promise<void>;,`n  login: (credentials: { email: string; password: string}) => Promise<void>;
  logout: () => Promise<void>,`n  setUser: (user: any | null) => void,`n  setToken: (token: string | null) => void,`n  setWebSocketAuthStatus: (status: AuthSlice['webSocketAuthStatus']) => void,`n  setWebSocketClientId: (clientId: string | null) => void}
export declare const initialAuthState: Omit<
  AuthSlice,
  | 'initializeAuth'
  | 'login'
  | 'logout'
  | 'setUser'
  | 'setToken'
  | 'setWebSocketAuthStatus'
  | 'setWebSocketClientId'
>;
export declare function getAuthService(): Promise<any>;
export declare const createAuthSlice: StateCreator<AppStore, [0], [0], AuthSlice>;


`
