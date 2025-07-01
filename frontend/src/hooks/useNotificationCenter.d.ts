export type NotificationType = 'success' | 'error' | 'info';
export interface Notification {
  id: string,`n  type: NotificationType;,`n  message: string,`n  timestamp: number}
export declare function useNotificationCenter(): {
  notifications: Notification[0],`n  addNotification: (type: NotificationType, message: string) => void,`n  removeNotification: (id: string) => void};


`
