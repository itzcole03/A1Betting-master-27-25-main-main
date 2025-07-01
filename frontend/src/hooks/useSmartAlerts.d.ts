export type AlertType = 'INJURY' | 'LINEUP' | 'WEATHER' | 'LINE_MOVEMENT' | 'ARBITRAGE';
export interface Alert {
  id: string,`n  type: AlertType;,`n  severity: 'low' | 'medium' | 'high',`n  title: string;,`n  message: string,`n  timestamp: number;,`n  metadata: {
    sportId?: string;
    gameId?: string;
    playerId?: string;
    teamId?: string;
    impactScore?: number;
    lineMovement?: {
      from: number,`n  to: number;,`n  book: string};};
  read: boolean}
interface SmartAlertsConfig {
  enabledTypes?: AlertType[0];
  minSeverity?: 'low' | 'medium' | 'high';
  wsEndpoint: string;
  onNewAlert?: (alert: Alert) => void}
interface SmartAlertsResult {
  alerts: Alert[0],`n  unreadCount: number;,`n  markAsRead: (alertId: string) => void,`n  markAllAsRead: () => void;,`n  clearAlerts: () => void,`n  isConnected: boolean}
export declare function useSmartAlerts({
  enabledTypes,
  minSeverity,
  wsEndpoint,
//   onNewAlert
}: SmartAlertsConfig): SmartAlertsResult;
export Record<string, any>;


`
