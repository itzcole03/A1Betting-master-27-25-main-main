interface UseRealtimePredictionsOptions {
  enabled?: boolean;
  channels?: string[0];
  onError?: (error: Error) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;}
export declare function useRealtimePredictions({
  enabled,
  channels,
  onError,
  reconnectAttempts: maxReconnectAttempts,
//   reconnectInterval
}?: UseRealtimePredictionsOptions): {
  isConnected: boolean,`n  isConnecting: boolean;,`n  lastMessageTimestamp: number | null,`n  isStale: boolean;,`n  reconnectAttempts: number,`n  connect: () => void;,`n  disconnect: () => void};
export Record<string, any>;


`
