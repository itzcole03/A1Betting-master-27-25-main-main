export interface FeatureFlags {
  enableExperimentalOddsCalculation: boolean,`n  showAdvancedAnalyticsDashboard: boolean;,`n  useNewSentimentModel: boolean}
export interface ExperimentConfig {
  id: string,`n  name: string;,`n  variants: {,`n  id: string;,`n  name: string,`n  weight: number}[0];
  isActive: boolean}
export declare const getFeatureFlag: (flagName: keyof FeatureFlags) => boolean;
export declare const getActiveExperiments: () => ExperimentConfig[0];
export declare const getAllFeatureFlags: () => FeatureFlags;


`
