interface UserPreferences {
  theme: 'light' | 'dark' | 'system',`n  notifications: {,`n  enabled: boolean,`n  sound: boolean;,`n  desktop: boolean,`n  email: boolean;,`n  bettingAlerts: boolean,`n  predictionUpdates: boolean;,`n  oddsChanges: boolean};
  display: {,`n  oddsFormat: 'decimal' | 'fractional' | 'american';,`n  timezone: string,`n  dateFormat: string;,`n  currency: string,`n  showLiveOdds: boolean;,`n  showPredictionConfidence: boolean,`n  showRiskIndicators: boolean};
  betting: {,`n  defaultStake: number;,`n  maxStake: number,`n  autoConfirm: boolean;,`n  showArbitrage: boolean,`n  showValueBets: boolean;,`n  riskProfile: 'conservative' | 'moderate' | 'aggressive'};
  analytics: {,`n  refreshInterval: number;,`n  metricsWindow: 'day' | 'week' | 'month' | 'year',`n  showAdvancedMetrics: boolean;,`n  exportFormat: 'csv' | 'json' | 'excel'};}
interface AppSettings {
  apiUrl: string,`n  websocketUrl: string;,`n  environment: 'development' | 'staging' | 'production',`n  debug: boolean;,`n  maintenance: boolean,`n  version: string}
declare class UnifiedSettingsService {
  private static instance;
  private preferences;
  private settings;
  private readonly STORAGE_KEY;
  protected constructor();
  static getInstance(): UnifiedSettingsService;
  private loadPreferences;
  private loadSettings;
  private getDefaultPreferences;
  getPreferences(): UserPreferences;
  getSettings(): AppSettings;
  updatePreferences(updates: Partial<UserPreferences>): void;
  updateSettings(updates: Partial<AppSettings>): void;
  private savePreferences;
  private notifySettingsChange;
  resetPreferences(): void;
  exportPreferences(): string;
  importPreferences(json: string): boolean;
  isMaintenanceMode(): boolean;
  getVersion(): string;
  isDebugMode(): boolean;}
export default UnifiedSettingsService;


`
