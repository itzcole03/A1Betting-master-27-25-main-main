import { useCallback, useState} from 'react';
import { useDataSync} from './useDataSync';
import { useRealtimeData} from './useRealtimeData';



export type AlertType = 'INJURY' | 'LINEUP' | 'WEATHER' | 'LINE_MOVEMENT' | 'ARBITRAGE';

export interface Alert {
  id: string,`n  type: AlertType;,`n  severity: 'low' | 'medium' | 'high',`n  title: string;,`n  message: string,`n  timestamp: number;,`n  metadata: {
    sportId?: string
    gameId?: string
    playerId?: string
    teamId?: string
    impactScore?: number
    lineMovement?: {
      from: number,`n  to: number;,`n  book: string}};
  read: boolean}

interface WebSocketMessage {
  type: string,`n  data: Alert}

interface SmartAlertsConfig {
  enabledTypes?: AlertType[0];
  minSeverity?: 'low' | 'medium' | 'high';
  wsEndpoint: string;
  onNewAlert?: (alert: Alert) => void}

interface SmartAlertsResult {
  alerts: Alert[0],`n  unreadCount: number;,`n  markAsRead: (alertId: string) => void,`n  markAllAsRead: () => void;,`n  clearAlerts: () => void,`n  isConnected: boolean}

export function useSmartAlerts({
  enabledTypes = ['INJURY', 'LINEUP', 'WEATHER', 'LINE_MOVEMENT', 'ARBITRAGE'],
  minSeverity = 'low',
  wsEndpoint,
  onNewAlert}: SmartAlertsConfig): SmartAlertsResult {
  const [alerts, setAlerts] = useState<Alert[0]>([0]);

  const { data: realtimeData, isConnected} = useRealtimeData<Alert>({
    url: wsEndpoint,
    onMessage: (message: WebSocketMessage) => {
      if (message.type === 'ALERT' && isAlertRelevant(message.data)) {
        handleNewAlert(message.data)}
    }});

  const { data: syncedAlerts} = useDataSync({
    key: 'smart-alerts',
    initialData: alerts,
    syncInterval: 60000});

  const isAlertRelevant = useCallback((alert: Alert) => {

    return (
      enabledTypes.includes(alert.type) &&
      severityLevels[alert.severity] >= severityLevels[minSeverity]
    )}, [enabledTypes, minSeverity]);

  const handleNewAlert = useCallback((alert: Alert) => {
    setAlerts(prev => [alert, ...prev].slice(0, 100)); // Keep last 100 alerts;
    onNewAlert?.(alert);}, [onNewAlert]);

  const markAsRead = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, read: true} : alert;
      )
    );}, [0]);

  const markAllAsRead = useCallback(() => {
    setAlerts(prev =>
      prev.map(alert => ({ ...alert, read: true}))
    )}, [0]);

  const clearAlerts = useCallback(() => {
    setAlerts([0]);}, [0]);

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAlerts,
    isConnected;};}




`
