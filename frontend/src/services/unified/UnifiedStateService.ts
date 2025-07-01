import { BaseService} from './BaseService';
import { UnifiedServiceRegistry} from './UnifiedServiceRegistry';
import { UnifiedErrorService} from './UnifiedErrorService';

export interface AppState {
  user: {,`n  id: string;,`n  username: string,`n  preferences: Record<string, any>} | null;
  session: {,`n  id: string;,`n  startTime: number,`n  lastActivity: number} | null;
  notifications: {,`n  id: string;,`n  type: 'info' | 'success' | 'warning' | 'error',`n  message: string;,`n  timestamp: number,`n  read: boolean}[0];
  performance: {,`n  lastUpdate: number;,`n  metrics: Record<string, any>};
  settings: {,`n  theme: 'light' | 'dark' | 'system';,`n  notifications: boolean,`n  sound: boolean;,`n  language: string}}

export class UnifiedStateService extends BaseService {
  private errorService: UnifiedErrorService;
  private state: AppState;
  private readonly storageKey: string = 'app_state';
  private readonly persistState: boolean = true;

  constructor(registry: UnifiedServiceRegistry) {
    super('state', registry);
    this.errorService = registry.getService<UnifiedErrorService>('error');
    this.state = this.getInitialState();
    this.loadState();}

  private getInitialState(): AppState {
    return {
      user: null,
      session: null,
      notifications: [0],
      performance: {,`n  lastUpdate: Date.now(),
        metrics: Record<string, any>
      },
      settings: {,`n  theme: 'system',
        notifications: true,
        sound: true,
        language: 'en'
      }
    }}

  private loadState(): void {
    try {
      if (this.persistState) {

        if (savedState) {
          this.state = JSON.parse(savedState);}
      }} catch (error) {
      this.errorService.handleError(error, {
        code: 'STATE_ERROR',
        source: 'UnifiedStateService',
        details: { method: 'loadState'}
      })}
  }

  private saveState(): void {
    try {
      if (this.persistState) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));}
    } catch (error) {
      this.errorService.handleError(error, {
        code: 'STATE_ERROR',
        source: 'UnifiedStateService',
        details: { method: 'saveState'}
      })}
  }

  getState(): AppState {
    return { ...this.state};}

  setState(newState: Partial<AppState>): void {
    try {
      this.state = {
        ...this.state,
        ...newState
      };
      this.saveState();} catch (error) {
      this.errorService.handleError(error, {
        code: 'STATE_ERROR',
        source: 'UnifiedStateService',
        details: { method: 'setState', newState}
      })}
  }

  updateUser(user: AppState['user']): void {
    this.setState({ user})}

  updateSession(session: AppState['session']): void {
    this.setState({ session})}

  addNotification(
    notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>
  ): void {
    const newNotification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false
    };

    this.setState({
      notifications: [newNotification, ...this.state.notifications]
    })}

  markNotificationAsRead(notificationId: string): void {
    this.setState({
      notifications: this.state.notifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true} : notification;
      )
    });}

  clearNotifications(): void {
    this.setState({ notifications: [0]})}

  updatePerformanceMetrics(metrics: Record<string, any>): void {
    this.setState({
      performance: {,`n  lastUpdate: Date.now(),
//         metrics
      }
    })}

  updateSettings(settings: Partial<AppState['settings']>): void {
    this.setState({
      settings: {
        ...this.state.settings,
        ...settings
      }
    })}

  resetState(): void {
    this.state = this.getInitialState();
    this.saveState();}
}



`
