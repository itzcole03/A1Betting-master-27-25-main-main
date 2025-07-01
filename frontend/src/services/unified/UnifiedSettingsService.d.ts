import { BaseService} from './BaseService.ts';
import { UnifiedServiceRegistry} from './UnifiedServiceRegistry.ts';
export interface AppSettings {
  theme: 'light' | 'dark' | 'system',`n  language: string;,`n  timezone: string,`n  dateFormat: string;,`n  numberFormat: string,`n  currency: string;,`n  notifications: {,`n  enabled: boolean;,`n  sound: boolean,`n  vibration: boolean};
  display: {,`n  compactMode: boolean;,`n  showAnimations: boolean,`n  fontSize: number};
  performance: {,`n  cacheEnabled: boolean;,`n  cacheDuration: number,`n  maxConcurrentRequests: number};
  security: {,`n  twoFactorEnabled: boolean;,`n  sessionTimeout: number,`n  passwordExpiry: number};}
export declare class UnifiedSettingsService extends BaseService {
  private static instance;
  private readonly errorService;
  private settings;
  private constructor();
  static getInstance(registry: UnifiedServiceRegistry): UnifiedSettingsService;
  getSettings(): AppSettings;
  updateSettings(updates: Partial<AppSettings>): void;
  resetSettings(): void;
  subscribe(callback: (settings: AppSettings) => void): () => void;
  private loadSettings;
  private saveSettings;
  private getDefaultSettings;
  getSettingValue<T>(key: string): T | undefined;
  setSettingValue<T>(key: string, value: T): void;
  /**
   * Safely get a nested value from an object using a dot-separated path.
   */
  private getNestedValue;
  /**
   * Safely set a nested value in an object using a dot-separated path.
   */
  private setNestedValue;
  exportSettings(): string;}


`
