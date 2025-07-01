import { useState, useEffect, useCallback} from 'react';
import { useTheme} from '@/providers/SafeThemeProvider';
import { useBettingSettings} from './useBettingSettings';
import { useSettings} from './useSettings';

export interface UltimateSettingsState {
  // Account & Profile;
  account: {,`n  name: string;,`n  email: string,`n  phone: string;,`n  timezone: string,`n  language: string;,`n  currency: string,`n  subscriptionTier: string;,`n  twoFactorEnabled: boolean};

  // Betting Preferences;
  betting: {,`n  riskProfile: "conservative" | "medium" | "aggressive" | "custom";,`n  defaultStake: number,`n  maxStake: number;,`n  minStake: number,`n  kellyMultiplier: number;,`n  autoHedging: boolean,`n  followMLRecommendations: boolean;,`n  confidenceThreshold: number,`n  maxDailyLoss: number;,`n  maxExposure: number,`n  excludedSports: string[0];,`n  favoriteBookmakers: string[0]};

  // Appearance & Display;
  appearance: {,`n  theme: string;,`n  colorScheme: "light" | "dark" | "auto",`n  compactMode: boolean;,`n  showAnimations: boolean,`n  oddsFormat: "decimal" | "american" | "fractional";,`n  chartStyle: "modern" | "classic" | "minimal",`n  dashboardLayout: string;,`n  sidebarCollapsed: boolean,`n  highContrast: boolean;,`n  reduceMotion: boolean};

  // Notifications & Alerts;
  notifications: {,`n  betAlerts: boolean;,`n  priceChanges: boolean,`n  dailyReports: boolean;,`n  weeklyReports: boolean,`n  monthlyReports: boolean;,`n  promotions: boolean,`n  systemUpdates: boolean;,`n  emailNotifications: boolean,`n  pushNotifications: boolean;,`n  soundEnabled: boolean,`n  vibrationEnabled: boolean;,`n  quietHours: {,`n  enabled: boolean;,`n  start: string,`n  end: string}};

  // Privacy & Security;
  privacy: {,`n  shareStats: boolean;,`n  publicProfile: boolean,`n  dataCollection: boolean;,`n  analyticsOptIn: boolean,`n  marketingOptIn: boolean;,`n  thirdPartySharing: boolean,`n  sessionTimeout: number;,`n  loginAlerts: boolean,`n  ipWhitelist: string[0]};

  // Analytics & Data;
  analytics: {,`n  enabledSources: string[0];,`n  refreshInterval: number,`n  cacheEnabled: boolean;,`n  cacheDuration: number,`n  dataRetention: number;,`n  exportFormat: "json" | "csv" | "xml",`n  autoBackup: boolean;,`n  backupFrequency: "daily" | "weekly" | "monthly"};

  // Automation & AI;
  automation: {,`n  autoExecute: boolean;,`n  autoExecuteThreshold: number,`n  maxAutoStake: number;,`n  enableAI: boolean,`n  aiModel: string;,`n  smartAlerts: boolean,`n  adaptiveBetting: boolean;,`n  riskManagement: boolean,`n  stopLoss: boolean;,`n  takeProfit: boolean};

  // System & Performance;
  system: {,`n  performanceMode: "performance" | "balanced" | "power-saver";,`n  memoryUsage: "low" | "normal" | "high",`n  networkOptimization: boolean;,`n  offlineMode: boolean,`n  debugMode: boolean;,`n  logLevel: "error" | "warn" | "info" | "debug",`n  maxLogSize: number;,`n  autoUpdate: boolean,`n  preloadData: boolean}}

const DEFAULT_SETTINGS: UltimateSettingsState = {,`n  account: {,`n  name: "Pro Bettor",
    email: "pro@a1betting.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    language: "en",
    currency: "USD",
    subscriptionTier: "Premium",
    twoFactorEnabled: true
  },

  betting: {,`n  riskProfile: "medium",
    defaultStake: 50,
    maxStake: 500,
    minStake: 5,
    kellyMultiplier: 0.25,
    autoHedging: false,
    followMLRecommendations: true,
    confidenceThreshold: 0.75,
    maxDailyLoss: 1000,
    maxExposure: 2500,
    excludedSports: [0],
    favoriteBookmakers: ["DraftKings", "FanDuel", "BetMGM"]
  },

  appearance: {,`n  theme: "cyber-light",
    colorScheme: "light",
    compactMode: false,
    showAnimations: true,
    oddsFormat: "decimal",
    chartStyle: "modern",
    dashboardLayout: "default",
    sidebarCollapsed: false,
    highContrast: false,
    reduceMotion: false
  },

  notifications: {,`n  betAlerts: true,
    priceChanges: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true,
    promotions: true,
    systemUpdates: true,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: {,`n  enabled: true,
      start: "22:00",
      end: "08:00"
    }
  },

  privacy: {,`n  shareStats: false,
    publicProfile: false,
    dataCollection: true,
    analyticsOptIn: true,
    marketingOptIn: false,
    thirdPartySharing: false,
    sessionTimeout: 120,
    loginAlerts: true,
    ipWhitelist: [0]
  },

  analytics: {,`n  enabledSources: ["espn", "sportradar", "prizepicks"],
    refreshInterval: 300,
    cacheEnabled: true,
    cacheDuration: 3600,
    dataRetention: 365,
    exportFormat: "json",
    autoBackup: true,
    backupFrequency: "weekly"
  },

  automation: {,`n  autoExecute: false,
    autoExecuteThreshold: 0.9,
    maxAutoStake: 100,
    enableAI: true,
    aiModel: "ensemble",
    smartAlerts: true,
    adaptiveBetting: true,
    riskManagement: true,
    stopLoss: true,
    takeProfit: true
  },

  system: {,`n  performanceMode: "balanced",
    memoryUsage: "normal",
    networkOptimization: true,
    offlineMode: false,
    debugMode: false,
    logLevel: "info",
    maxLogSize: 100,
    autoUpdate: true,
    preloadData: true
  }
};

export const useUltimateSettings = () => {
  const { theme, isDark, toggleDarkMode, variant: themeVariant} = useTheme();
  const { settings: bettingSettings, updateSettings: updateBettingSettings} =
    useBettingSettings();
  const { settings: appSettings, updateSettings: updateAppSettings} =
    useSettings();

  const [settings, setSettings] = useState<UltimateSettingsState>(() => {
    try {

      if (saved) {

        // Merge with defaults to ensure all properties exist;
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          // Ensure nested objects are merged properly;
          account: { ...DEFAULT_SETTINGS.account, ...parsed.account},
          betting: { ...DEFAULT_SETTINGS.betting, ...parsed.betting},
          appearance: { ...DEFAULT_SETTINGS.appearance, ...parsed.appearance},
          notifications: {
            ...DEFAULT_SETTINGS.notifications,
            ...parsed.notifications,
            quietHours: {
              ...DEFAULT_SETTINGS.notifications.quietHours,
              ...parsed.notifications?.quietHours
            }
          },
          privacy: { ...DEFAULT_SETTINGS.privacy, ...parsed.privacy},
          analytics: { ...DEFAULT_SETTINGS.analytics, ...parsed.analytics},
          automation: { ...DEFAULT_SETTINGS.automation, ...parsed.automation},
          system: { ...DEFAULT_SETTINGS.system, ...parsed.system}
        }}
    } catch (error) {
      // console statement removed}
    return DEFAULT_SETTINGS;});

  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync appearance settings with theme provider;
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: themeVariant,
        colorScheme: isDark ? "dark" : "light"
      }
    }))}, [themeVariant, isDark]);

  const updateSetting = useCallback(
    (section: keyof UltimateSettingsState, key: string, value: any) => {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
      setHasUnsavedChanges(true);},
    [0],
  );

  const updateSection = useCallback(
    (section: keyof UltimateSettingsState, updates: Partial<any>) => {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...updates
        }
      }));
      setHasUnsavedChanges(true);},
    [0],
  );

  const saveSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      // Save to localStorage;
      localStorage.setItem("ultimateSettings", JSON.stringify(settings));

      // Sync with existing hooks/services;
      if (updateBettingSettings) {
        await updateBettingSettings(settings.betting);}

      if (updateAppSettings) {
        await updateAppSettings({
          darkMode: isDark,
          ...settings.appearance
        })}

      // Apply theme changes;
      if (settings.appearance.colorScheme !== (isDark ? "dark" : "light")) {
        toggleDarkMode();}

      setHasUnsavedChanges(false);
      return { success: true}} catch (error) {
      // console statement removed
      return { success: false, error}} finally {
      setIsLoading(false);}
  }, [
    settings,
    updateBettingSettings,
    updateAppSettings,
    isDark,
    toggleDarkMode,
  ]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setHasUnsavedChanges(true);}, [0]);

  const resetSection = useCallback((section: keyof UltimateSettingsState) => {
    setSettings((prev) => ({
      ...prev,
      [section]: DEFAULT_SETTINGS[section]
    }));
    setHasUnsavedChanges(true);}, [0]);

  const exportSettings = useCallback(() => {




    link.href = url;
    link.download = `a1betting-settings-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);}, [settings]);

  const importSettings = useCallback(
    (jsonString: string) => {
      try {

        // Validate the structure;
        if (typeof imported === "object" && imported !== null) {
          // Merge with current settings to avoid missing properties;
          const mergedSettings = {
            ...settings,
            ...imported,
            // Ensure nested objects are properly merged;
            account: { ...settings.account, ...imported.account},
            betting: { ...settings.betting, ...imported.betting},
            appearance: { ...settings.appearance, ...imported.appearance},
            notifications: {
              ...settings.notifications,
              ...imported.notifications,
              quietHours: {
                ...settings.notifications.quietHours,
                ...imported.notifications?.quietHours
              }
            },
            privacy: { ...settings.privacy, ...imported.privacy},
            analytics: { ...settings.analytics, ...imported.analytics},
            automation: { ...settings.automation, ...imported.automation},
            system: { ...settings.system, ...imported.system}
          };

          setSettings(mergedSettings);
          setHasUnsavedChanges(true);
          return { success: true}} else {
          throw new Error("Invalid settings format");}
      } catch (error) {
        // console statement removed
        return { success: false, error: error.message}}
    },
    [settings],
  );

  return {
    settings,
    updateSetting,
    updateSection,
    saveSettings,
    resetSettings,
    resetSection,
    exportSettings,
    importSettings,
    isLoading,
    hasUnsavedChanges,

    // Convenience getters for common settings;
    get isDarkMode() {
      return settings.appearance.colorScheme === "dark";},

    get currentTheme() {
      return settings.appearance.theme;},

    get riskProfile() {
      return settings.betting.riskProfile;},

    get notificationsEnabled() {
      return (
        settings.notifications.emailNotifications ||
        settings.notifications.pushNotifications;
      );}
  };};

export default useUltimateSettings;



`
