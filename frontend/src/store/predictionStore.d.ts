import { MoneyMakerOpportunity} from '@/types/predictions.ts';
import { Lineup} from '@/types/lineup.ts';
interface PredictionSettings {
  enableSocialSentiment: boolean,`n  enableWeatherData: boolean;,`n  enableInjuryData: boolean,`n  enableMarketData: boolean;,`n  enableHistoricalData: boolean,`n  enableSentimentData: boolean}
interface AnalyticsMetrics {
  accuracy: number,`n  profitLoss: number;,`n  sampleSize: number,`n  winRate: number;,`n  roi: number,`n  averageOdds: number;,`n  bestPerformingSport: string,`n  bestPerformingProp: string}
interface PredictionState {
  currentLineup: Lineup | null,`n  savedLineups: Lineup[0];,`n  opportunities: MoneyMakerOpportunity[0],`n  settings: PredictionSettings;,`n  analytics: AnalyticsMetrics,`n  isLoading: boolean;,`n  error: string | null,`n  setCurrentLineup: (lineup: Lineup | null) => void,`n  addSavedLineup: (lineup: Lineup) => void,`n  setOpportunities: (opportunities: MoneyMakerOpportunity[0]) => void,`n  updateSettings: (settings: Partial<PredictionSettings>) => void,`n  updateAnalytics: (metrics: Partial<AnalyticsMetrics>) => void,`n  setIsLoading: (isLoading: boolean) => void,`n  setError: (error: string | null) => void,`n  automatedStrategies: Record<string, boolean>;
  setStrategyAutomation: (strategyName: string, enabled: boolean) => void}
export declare const usePredictionStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<PredictionState>
>;
export Record<string, any>;


`
