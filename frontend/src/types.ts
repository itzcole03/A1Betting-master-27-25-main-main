// Type definitions for feature engineering analytics;
export type FeatureConfig = object;

export type EngineeredFeatures = object;

export type RawPlayerData = object;

// Feature flags interface for configService;
export interface FeatureFlags {
  // Basic features;
  INJURIES?: boolean
  NEWS?: boolean
  WEATHER?: boolean
  REALTIME?: boolean
  ESPN?: boolean
  ODDS?: boolean
  ANALYTICS?: boolean

  // Extended features;
  enableNews?: boolean
  enableWeather?: boolean
  enableInjuries?: boolean
  enableAnalytics?: boolean
  enableSocialSentiment?: boolean
  enableExperimentalOddsCalculation?: boolean
  showAdvancedAnalyticsDashboard?: boolean
  useNewSentimentModel?: boolean

  // Model features;
  enablePvPModel?: boolean
  enablePlayerFormModel?: boolean
  enableVenueEffectModel?: boolean
  enableRefereeImpactModel?: boolean
  enableLineupSynergyModel?: boolean

  // Additional features can be added as needed;
  [key: string]: boolean | undefined}

// ESPN Headline interface for newsService;
export interface ESPNHeadline {
  id: string,`n  title: string;,`n  summary: string,`n  link: string;,`n  publishedAt: string,`n  source: string;,`n  imageUrl: string,`n  category: string}




`
