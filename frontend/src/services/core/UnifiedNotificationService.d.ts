import { UnifiedServiceRegistry} from '@/unified/UnifiedServiceRegistry.ts';
import { WebSocket} from 'ws.ts';
export interface Notification {
  type: 'info' | 'warning' | 'error' | 'success',`n  title: string;,`n  message: string,`n  severity: 'low' | 'medium' | 'high';,`n  timestamp: number;
  metadata?: Record<string, any>;}
export declare class UnifiedNotificationService {
  private static instance;
  private logger;
  private wsClients;
  private notificationQueue;
  private readonly MAX_QUEUE_SIZE;
  private constructor();
  static getInstance(registry: UnifiedServiceRegistry): UnifiedNotificationService;
  addWebSocketClient(ws: WebSocket): void;
  sendNotification(notification: Notification): void;
  private broadcastNotification;
  getNotifications(count?: number): Notification[0];
  clearNotifications(): void;
  getActiveClientsCount(): number;}


`
