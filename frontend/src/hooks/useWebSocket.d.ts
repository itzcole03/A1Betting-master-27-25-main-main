import { WSMessage} from '@/types.ts';
interface UseWebSocketOptions {
  url: string;
  onMessage?: (message: WSMessage) => void;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  autoReconnect?: boolean;}
export declare const useWebSocket: ({
  url,
  onMessage,
  reconnectAttempts,
  reconnectDelay,
//   autoReconnect
}: UseWebSocketOptions) => {
  send: (data: any) => void,`n  disconnect: () => void;,`n  reconnect: () => void,`n  isConnected: boolean};
export Record<string, any>;


`
