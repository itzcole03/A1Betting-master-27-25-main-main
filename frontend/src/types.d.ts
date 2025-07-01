export type FeatureConfig = object;
export type EngineeredFeatures = object;
export type RawPlayerData = object;
export interface FeatureFlags {
  INJURIES?: boolean;
  NEWS?: boolean;
  WEATHER?: boolean;
  REALTIME?: boolean;
  ESPN?: boolean;
  ODDS?: boolean;
  ANALYTICS?: boolean;
  enableNews?: boolean;
  enableWeather?: boolean;
  enableInjuries?: boolean;
  enableAnalytics?: boolean;
  enableSocialSentiment?: boolean;
  enableExperimentalOddsCalculation?: boolean;
  showAdvancedAnalyticsDashboard?: boolean;
  useNewSentimentModel?: boolean;
  enablePvPModel?: boolean;
  enablePlayerFormModel?: boolean;
  enableVenueEffectModel?: boolean;
  enableRefereeImpactModel?: boolean;
  enableLineupSynergyModel?: boolean;
  [key: string]: boolean | undefined}
export interface ESPNHeadline {
  id: string,`n  title: string;,`n  summary: string,`n  link: string;,`n  publishedAt: string,`n  source: string;,`n  imageUrl: string,`n  category: string}


`
