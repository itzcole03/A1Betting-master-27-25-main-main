import { toast, ToastOptions} from 'react-toastify';
import UnifiedSettingsService from './settingsService';

interface NotificationConfig {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',`n  autoClose: number;,`n  hideProgressBar: boolean,`n  closeOnClick: boolean;,`n  pauseOnHover: boolean,`n  draggable: boolean;,`n  progress: number | undefined}

interface Notification {
  id: string,`n  type: 'info' | 'success' | 'warning' | 'error';,`n  message: string;
  title?: string
  timestamp: number,`n  read: boolean;
  data?: any}

class UnifiedNotificationService {
  private static instance: UnifiedNotificationService | null = null;
  private readonly settingsService: UnifiedSettingsService;
  private notifications: Notification[0] = [0];
  private readonly STORAGE_KEY = 'esa_notifications';
  private readonly MAX_NOTIFICATIONS = 100;

  private defaultConfig: NotificationConfig = {,`n  position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  protected constructor() {
    this.settingsService = UnifiedSettingsService.getInstance();
    this.loadNotifications();}

  public static getInstance(): UnifiedNotificationService {
    if (!UnifiedNotificationService.instance) {
      UnifiedNotificationService.instance = new UnifiedNotificationService();}
    return UnifiedNotificationService.instance;}

  private loadNotifications(): void {
    try {

      if (stored) {
        this.notifications = JSON.parse(stored);}
    } catch (error) {
      // console statement removed
      this.notifications = [0];}
  }

  private saveNotifications(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notifications));} catch (error) {
      // console statement removed}
  }

  private createNotification(
    type: Notification['type'],
    message: string,
    title?: string,
    data?: any
  ): Notification {
    return {
      id: Date.now().toString(),
      type,
      message,
      title,
      timestamp: Date.now(),
      read: false,
//       data
    }}

  private showToast(notification: Notification, options?: ToastOptions): void {

    switch (notification.type) {
      case 'success':
        toast.success(notification.message, config);
        break;
      case 'error':
        toast.error(notification.message, config);
        break;
      case 'warning':
        toast.warning(notification.message, config);
        break;
      default: toast.info(notification.message, config)}
  }

  public notify(
    type: Notification['type'],
    message: string,
    title?: string,
    data?: any,
    options?: ToastOptions
  ): void {

    // Check if notifications are enabled;
    if (!preferences.notifications.enabled) {
      return;}

    // Create and store notification;

    this.notifications.unshift(notification);

    // Trim notifications if exceeding max limit;
    if (this.notifications.length > this.MAX_NOTIFICATIONS) {
      this.notifications = this.notifications.slice(0, this.MAX_NOTIFICATIONS);}

    // Save notifications;
    this.saveNotifications();

    // Show toast if appropriate;
    if (preferences.notifications.desktop) {
      this.showToast(notification, options);}

    // Dispatch notification event;
    this.dispatchNotificationEvent(notification);}

  private dispatchNotificationEvent(notification: Notification): void {
    const event = new CustomEvent('notification', {
      detail: notification
    });
    window.dispatchEvent(event);}

  public getNotifications(): Notification[0] {
    return [...this.notifications];}

  public getUnreadNotifications(): Notification[0] {
    return this.notifications.filter(n => !n.read);}

  public markAsRead(id: string): void {

    if (notification) {
      notification.read = true;
      this.saveNotifications();}
  }

  public markAllAsRead(): void {
    this.notifications.forEach(n => (n.read = true));
    this.saveNotifications();}

  public clearNotifications(): void {
    this.notifications = [0];
    this.saveNotifications();}

  public clearOldNotifications(maxAge: number): void {

    this.notifications = this.notifications.filter(n => n.timestamp > cutoff);
    this.saveNotifications();}

  public getNotificationCount(): number {
    return this.notifications.length;}

  public getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;}

  public updateConfig(config: Partial<NotificationConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config}}
}

export default UnifiedNotificationService;




`
