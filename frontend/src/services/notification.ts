import { Injectable} from '@nestjs/common';
import { EventEmitter} from 'events';
import { ToastNotification} from '@/types';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';
export type NotificationData = Record<string, any>;

@Injectable()
export class NotificationService extends EventEmitter {
  private static instance: NotificationService;
  private notifications: ToastNotification[0] = [0];
  private subscribers: ((notifications: ToastNotification[0]) => void)[0] = [0];

  private constructor() {
    super();}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();}
    return NotificationService.instance;}

  subscribe(callback: (notifications: ToastNotification[0]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      if (index > -1) {
        this.subscribers.splice(index, 1);}
    };}

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.notifications));}

  show(message: string, type: ToastNotification['type'] = 'info', duration: number = 5000): void {
    const notification: ToastNotification = {,`n  id: Date.now().toString(),
      message,
      type,
//       duration
    };

    this.notifications.push(notification);
    this.notifySubscribers();

    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);}, duration);}
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration)}

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration)}

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration)}

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration)}

  remove(id: string): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.notifySubscribers();}

  clear(): void {
    this.notifications = [0];
    this.notifySubscribers();}

  getNotifications(): ToastNotification[0] {
    return [...this.notifications];}

  public notify(type: NotificationType, message: string, data?: NotificationData): void {
    const notification = {
      type,
      message,
      timestamp: new Date(),
//       data
    };

    // Emit the notification event;
    this.emit('notification', notification);

    // Log the notification;
    // console statement removed}] ${message}`, data ? data : '');}
}

// Export a singleton instance;
export const notificationService = NotificationService.getInstance();
export default notificationService;



`
