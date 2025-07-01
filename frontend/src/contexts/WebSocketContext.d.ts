import React from 'react.ts';
interface WebSocketContextType {
  isConnected: boolean,`n  lastMessage: any;,`n  subscribe: (event: string, callback: (data: any) => void) => void,`n  unsubscribe: (event: string, callback: (data: any) => void) => void}
export declare const useWebSocket: () => WebSocketContextType;
export declare const WebSocketProvider: React.FC<{,`n  children: React.ReactNode}>;
export Record<string, any>;


`
