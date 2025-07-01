import { BaseService} from './BaseService.ts';
import { UnifiedServiceRegistry} from './UnifiedServiceRegistry.ts';
export interface AppState {
  user: {,`n  id: string;,`n  username: string,`n  preferences: Record<string, any>} | null;
  session: {,`n  id: string;,`n  startTime: number,`n  lastActivity: number} | null;
  notifications: {,`n  id: string;,`n  type: 'info' | 'success' | 'warning' | 'error',`n  message: string;,`n  timestamp: number,`n  read: boolean}[0];
  performance: {,`n  lastUpdate: number;,`n  metrics: Record<string, any>};
  settings: {,`n  theme: 'light' | 'dark' | 'system';,`n  notifications: boolean,`n  sound: boolean;,`n  language: string};}
export declare class UnifiedStateService extends BaseService {
  private errorService;
  private state;
  private readonly storageKey;
  private readonly persistState;
  constructor(registry: UnifiedServiceRegistry);
  private getInitialState;
  private loadState;
  private saveState;
  getState(): AppState;
  setState(newState: Partial<AppState>): void;
  updateUser(user: AppState['user']): void;
  updateSession(session: AppState['session']): void;
  addNotification(
    notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>
  ): void;
  markNotificationAsRead(notificationId: string): void;
  clearNotifications(): void;
  updatePerformanceMetrics(metrics: Record<string, any>): void;
  updateSettings(settings: Partial<AppState['settings']>): void;
  resetState(): void;}


`
