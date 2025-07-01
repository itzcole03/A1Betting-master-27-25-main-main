export interface WebSocketState {
  isConnected: boolean,`n  clientId: string | null;,`n  activeSubscriptions: Array<{,`n  feedName: string;
    parameters?: Record<string, unknown>;}>;
  lastMessage: unknown,`n  error: string | null;,`n  setConnected: (isConnected: boolean) => void,`n  setClientId: (clientId: string) => void,`n  addSubscription: (subscription: {,`n  feedName: string;
    parameters?: Record<string, unknown>;}) => void;
  removeSubscription: (feedName: string) => void,`n  setLastMessage: (message: unknown) => void,`n  setError: (error: string | null) => void,`n  reset: () => void}
/**
 * Zustand store for WebSocket state, fully synchronized with WebSocketManager events.
 * On initialization, subscribes to connection, message, and error events.
 * Keeps all state reactive to the backend WebSocket.
 */
export declare const useWebSocketStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<WebSocketState>, 'persist'> & {
    persist: {,`n  setOptions: (,`n  options: Partial<
          import('zustand/middleware').PersistOptions<
            WebSocketState,
            {
              setConnected: (isConnected: boolean) => void,`n  setClientId: (clientId: string) => void,`n  addSubscription: (subscription: {,`n  feedName: string;
                parameters?: Record<string, unknown>;}) => void;
              removeSubscription: (feedName: string) => void,`n  setLastMessage: (message: unknown) => void,`n  setError: (error: string | null) => void,`n  reset: () => void;,`n  error: string | null,`n  lastMessage: unknown;,`n  isConnected: boolean,`n  activeSubscriptions: Array<{,`n  feedName: string;
                parameters?: Record<string, unknown>;}>;
              clientId: string | null}
          >
        >
      ) => void;
      clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: WebSocketState) => void) => () => void,`n  onFinishHydration: (fn: (state: WebSocketState) => void) => () => void,`n  getOptions: () => Partial<
        import('zustand/middleware').PersistOptions<
          WebSocketState,
          {
            setConnected: (isConnected: boolean) => void,`n  setClientId: (clientId: string) => void,`n  addSubscription: (subscription: {,`n  feedName: string;
              parameters?: Record<string, unknown>;}) => void;
            removeSubscription: (feedName: string) => void,`n  setLastMessage: (message: unknown) => void,`n  setError: (error: string | null) => void,`n  reset: () => void;,`n  error: string | null,`n  lastMessage: unknown;,`n  isConnected: boolean,`n  activeSubscriptions: Array<{,`n  feedName: string;
              parameters?: Record<string, unknown>;}>;
            clientId: string | null}
        >
      >;};}
>;


`
