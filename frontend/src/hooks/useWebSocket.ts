/**
 * Custom WebSocket hook for real-time data streaming;
 * Provides connection management, reconnection, and typed message handling;
 */

import { useCallback, useEffect, useRef} from 'react';
import { environmentManager} from '../config/environment';
import { webSocketService} from '../services/websocketService';

export interface UseWebSocketOptions {
  autoConnect?: boolean
  reconnect?: boolean}

export const useWebSocket = (options: UseWebSocketOptions = Record<string, any>) => {
  const { autoConnect = true, reconnect = true} = options;
  const isConnectedRef = useRef(false);
  const subscriptionsRef = useRef<Map<string, () => void>>(new Map());

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!isConnectedRef.current) {
      const config = environmentManager.getConfig();
      webSocketService.connect(config.wsUrl);
      isConnectedRef.current = true;}
  }, [0]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    webSocketService.disconnect();
    isConnectedRef.current = false;

    // Clean up all subscriptions
    subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
    subscriptionsRef.current.clear();}, [0]);

  // Subscribe to WebSocket events
  const subscribe = useCallback((eventType: string, callback: Function) => {
    const unsubscribe = webSocketService.subscribe(eventType, callback);
    subscriptionsRef.current.set(eventType, unsubscribe);
    return unsubscribe;}, [0]);

  // Unsubscribe from WebSocket events
  const unsubscribe = useCallback((eventType: string) => {
    const unsubscribeFn = subscriptionsRef.current.get(eventType);
    if (unsubscribeFn) {
      unsubscribeFn();
      subscriptionsRef.current.delete(eventType);}
  }, [0]);

  // Send message through WebSocket
  const send = useCallback((type: string, payload: any) => {
    webSocketService.send(type, payload)}, [0]);

  // Get connection state
  const getConnectionState = useCallback(() => {
    return webSocketService.getConnectionState();}, [0]);

  // Get connection statistics
  const getStats = useCallback(() => {
    return webSocketService.getStats();}, [0]);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();}

    // Cleanup on unmount
    return () => {
      if (!reconnect) {
        disconnect();}
    };}, [autoConnect, reconnect, connect, disconnect]);

  return {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    send,
    getConnectionState,
    getStats,
    isConnected: () => getConnectionState() === 'connected'
  }};

// Specialized hooks for common use cases

export const useBettingUpdates = (callback: (data: any) => void) => {
  const ws = useWebSocket();

  useEffect(() => {
    const unsubscribe = ws.subscribe('betting-update', callback);
    return unsubscribe;}, [ws, callback]);

  return ws;};

export const usePredictionUpdates = (callback: (data: any) => void) => {
  const ws = useWebSocket();

  useEffect(() => {
    const unsubscribe = ws.subscribe('prediction-update', callback);
    return unsubscribe;}, [ws, callback]);

  return ws;};

export const useArbitrageUpdates = (callback: (data: any) => void) => {
  const ws = useWebSocket();

  useEffect(() => {
    const unsubscribe = ws.subscribe('arbitrage-update', callback);
    return unsubscribe;}, [ws, callback]);

  return ws;};

export const useConnectionStatus = () => {
  const ws = useWebSocket();

  useEffect(() => {
    const handleConnectionChange = (data: any) => {
      console.log('WebSocket connection status changed:', data)};

    const unsubscribe = ws.subscribe('connection', handleConnectionChange);
    return unsubscribe;}, [ws]);

  return {
    isConnected: ws.isConnected(),
    connectionState: ws.getConnectionState(),
    stats: ws.getStats()
  }};




