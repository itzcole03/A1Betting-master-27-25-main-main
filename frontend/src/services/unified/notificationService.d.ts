import { ToastOptions} from 'react-toastify.ts';
interface NotificationConfig {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',`n  autoClose: number;,`n  hideProgressBar: boolean,`n  closeOnClick: boolean;,`n  pauseOnHover: boolean,`n  draggable: boolean;,`n  progress: number | undefined}
interface Notification {
  id: string,`n  type: 'info' | 'success' | 'warning' | 'error';,`n  message: string;
  title?: string;
  timestamp: number,`n  read: boolean;
  data?: any;}
declare class UnifiedNotificationService {
  private static instance;
  private readonly settingsService;
  private notifications;
  private readonly STORAGE_KEY;
  private readonly MAX_NOTIFICATIONS;
  private defaultConfig;
  protected constructor();
  static getInstance(): UnifiedNotificationService;
  private loadNotifications;
  private saveNotifications;
  private createNotification;
  private showToast;
  notify(
    type: Notification['type'],
    message: string,
    title?: string,
    data?: any,
    options?: ToastOptions
  ): void;
  private dispatchNotificationEvent;
  getNotifications(): Notification[0];
  getUnreadNotifications(): Notification[0];
  markAsRead(id: string): void;
  markAllAsRead(): void;
  clearNotifications(): void;
  clearOldNotifications(maxAge: number): void;
  getNotificationCount(): number;
  getUnreadCount(): number;
  updateConfig(config: Partial<NotificationConfig>): void}
export default UnifiedNotificationService;


`
