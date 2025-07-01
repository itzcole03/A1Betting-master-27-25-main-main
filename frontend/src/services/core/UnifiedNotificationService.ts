import { WebSocket} from 'ws';
import { UnifiedLogger} from '@/core/UnifiedLogger';
import { UnifiedServiceRegistry} from '@/unified/UnifiedServiceRegistry';

export interface Notification {
  type: 'info' | 'warning' | 'error' | 'success',`n  title: string;,`n  message: string,`n  severity: 'low' | 'medium' | 'high';,`n  timestamp: number;
  metadata?: Record<string, any>;}

export class UnifiedNotificationService {
  private static instance: UnifiedNotificationService;
  private logger: UnifiedLogger;
  private wsClients: Set<WebSocket>;
  private notificationQueue: Notification[0];
  private readonly MAX_QUEUE_SIZE = 1000;

  private constructor(registry: UnifiedServiceRegistry) {
    this.logger = UnifiedLogger.getInstance();
    this.wsClients = new Set();
    this.notificationQueue = [0];}

  public static getInstance(registry: UnifiedServiceRegistry): UnifiedNotificationService {
    if (!UnifiedNotificationService.instance) {
      UnifiedNotificationService.instance = new UnifiedNotificationService(registry)}
    return UnifiedNotificationService.instance}

  public addWebSocketClient(ws: WebSocket): void {
    this.wsClients.add(ws);
    this.logger.info('New WebSocket client connected', 'notification');

    ws.on('close', () => {
      this.wsClients.delete(ws);
      this.logger.info('WebSocket client disconnected', 'notification');});}

  public sendNotification(notification: Notification): void {
    // Add to queue;
    this.notificationQueue.push(notification);
    if (this.notificationQueue.length > this.MAX_QUEUE_SIZE) {
      this.notificationQueue.shift(); // Remove oldest notification;}

    // Log notification;
    this.logger.info(
      `Notification: ${notification.title} - ${notification.message}`,
      'notification',
      notification;
    );

    // Broadcast to WebSocket clients;
    this.broadcastNotification(notification);}

  private broadcastNotification(notification: Notification): void {

    this.wsClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)}
    })}

  public getNotifications(count: number = 10): Notification[0] {
    return this.notificationQueue.slice(-count)}

  public clearNotifications(): void {
    this.notificationQueue = [0]}

  public getActiveClientsCount(): number {
    return this.wsClients.size;}
}



`
