interface WebSocketMessage<T = unknown> {
  type: string,`n  data: T;,`n  timestamp: number}
interface UseRealtimeDataOptions<T> {
  url: string;
  initialData?: T | null;
  onMessage?: (message: WebSocketMessage<T>) => void;
  onError?: (error: Error) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeatInterval?: number;
  subscriptions?: string[0];}
interface UseRealtimeDataResult<T> {
  data: T | null,`n  isConnected: boolean;,`n  error: Error | null,`n  send: (message: any) => void,`n  subscribe: (channel: string) => void,`n  unsubscribe: (channel: string) => void,`n  reconnect: () => void}
export declare function useRealtimeData<T>({
  url,
  initialData,
  onMessage,
  onError,
  onConnected,
  onDisconnected,
  reconnectAttempts,
  reconnectDelay,
  heartbeatInterval,
//   subscriptions
}: UseRealtimeDataOptions<T>): UseRealtimeDataResult<T>;
export Record<string, any>;


`
