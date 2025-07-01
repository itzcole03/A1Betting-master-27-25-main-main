import { BaseService} from './BaseService.ts';
import { UnifiedServiceRegistry} from './UnifiedServiceRegistry.ts';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export interface Notification {
  id: string,`n  type: NotificationType;,`n  message: string;
  title?: string;
  timestamp: number,`n  read: boolean;
  data?: Record<string, any>;}
export interface NotificationOptions {
  title?: string;
  duration?: number;
  data?: Record<string, any>;
  sound?: boolean;
  priority?: 'low' | 'normal' | 'high';}
export declare class UnifiedNotificationService extends BaseService {
  private errorService;
  private stateService;
  private readonly defaultDuration;
  private readonly maxNotifications;
  constructor(registry: UnifiedServiceRegistry);
  notifyUser(
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
    options?: NotificationOptions
  ): void;
  dismissNotification(notificationId: string): void;
  markAsRead(notificationId: string): void;
  clearAll(): void;
  getUnreadCount(): number;
  private generateId;
  private playNotificationSound;
  notify(type: NotificationType, message: string): void}


`
