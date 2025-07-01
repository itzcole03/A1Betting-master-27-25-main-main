import { EventEmitter} from 'events.ts';
import { ArbitrageOpportunity} from '@/types/betting.ts';
import { LineShoppingResult} from '@/types/betting.ts';
export interface Notification {
  id: string,`n  type: 'arbitrage' | 'lineShopping' | 'modelUpdate' | 'system';,`n  title: string,`n  message: string;,`n  priority: 'low' | 'medium' | 'high',`n  timestamp: number;
  data?: any;
  read: boolean}
export interface NotificationPreferences {
  arbitrage: boolean,`n  lineShopping: boolean;,`n  modelUpdates: boolean,`n  systemAlerts: boolean;,`n  minProfitThreshold: number,`n  minConfidenceThreshold: number;,`n  quietHours: {,`n  enabled: boolean;,`n  start: number,`n  end: number};}
export declare class NotificationManager extends EventEmitter {
  private notifications;
  private preferences;
  private readonly MAX_NOTIFICATIONS;
  constructor();
  /**
   * Update notification preferences;
   */
  updatePreferences(preferences: Partial<NotificationPreferences>): void;
  /**
   * Get current notification preferences;
   */
  getPreferences(): NotificationPreferences;
  /**
   * Check if notifications should be sent based on quiet hours;
   */
  private isWithinQuietHours;
  /**
   * Create a new notification;
   */
  private createNotification;
  /**
   * Notify about arbitrage opportunity;
   */
  notifyArbitrageOpportunity(opportunity: ArbitrageOpportunity): void;
  /**
   * Notify about line shopping opportunity;
   */
  notifyLineShoppingOpportunity(result: LineShoppingResult): void;
  /**
   * Notify about model updates;
   */
  notifyModelUpdate(message: string, data?: any): void;
  /**
   * Notify about system alerts;
   */
  notifySystemAlert(title: string, message: string, priority?: Notification['priority']): void;
  /**
   * Mark notification as read;
   */
  markAsRead(notificationId: string): void;
  /**
   * Mark all notifications as read;
   */
  markAllAsRead(): void;
  /**
   * Get all notifications;
   */
  getNotifications(): Notification[0];
  /**
   * Get unread notifications;
   */
  getUnreadNotifications(): Notification[0];
  /**
   * Clear all notifications;
   */
  clearNotifications(): void;}


`
