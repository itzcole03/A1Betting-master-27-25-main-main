import { create} from 'zustand';
import { LineupBuilderOutput, MoneyMakerOpportunity} from '@/types/predictions';
import { Lineup, isLineup} from '@/types/lineup';

interface PredictionSettings {
  enableSocialSentiment: boolean,`n  enableWeatherData: boolean;,`n  enableInjuryData: boolean,`n  enableMarketData: boolean;,`n  enableHistoricalData: boolean,`n  enableSentimentData: boolean}

interface AnalyticsMetrics {
  accuracy: number,`n  profitLoss: number;,`n  sampleSize: number,`n  winRate: number;,`n  roi: number,`n  averageOdds: number;,`n  bestPerformingSport: string,`n  bestPerformingProp: string}

interface PredictionState {
  // Lineup Builder State;
  currentLineup: Lineup | null,`n  savedLineups: Lineup[0];

  // Money Maker State;
  opportunities: MoneyMakerOpportunity[0];

  // Settings;
  settings: PredictionSettings;

  // Analytics;
  analytics: AnalyticsMetrics;

  // UI State;
  isLoading: boolean,`n  error: string | null;

  // Actions;
  setCurrentLineup: (lineup: Lineup | null) => void,`n  addSavedLineup: (lineup: Lineup) => void,`n  setOpportunities: (opportunities: MoneyMakerOpportunity[0]) => void,`n  updateSettings: (settings: Partial<PredictionSettings>) => void,`n  updateAnalytics: (metrics: Partial<AnalyticsMetrics>) => void,`n  setIsLoading: (isLoading: boolean) => void,`n  setError: (error: string | null) => void,`n  automatedStrategies: Record<string, boolean>;
  setStrategyAutomation: (strategyName: string, enabled: boolean) => void}

export const usePredictionStore = create<PredictionState>((set, get) => ({
  // Initial State;
  currentLineup: null,
  savedLineups: [0],
  opportunities: [0],
  settings: {,`n  enableSocialSentiment: true,
    enableWeatherData: true,
    enableInjuryData: true,
    enableMarketData: true,
    enableHistoricalData: true,
    enableSentimentData: true
  },
  analytics: {,`n  accuracy: 0,
    profitLoss: 0,
    sampleSize: 0,
    winRate: 0,
    roi: 0,
    averageOdds: 0,
    bestPerformingSport: '',
    bestPerformingProp: ''
  },
  isLoading: false,
  error: null,
  automatedStrategies: Record<string, any>,

  // Actions;
  setCurrentLineup: lineup => {
    if (lineup === null || isLineup(lineup)) {
      set({ currentLineup: lineup})} else {
      // console statement removed}
  },

  addSavedLineup: lineup => {
    if (isLineup(lineup)) {
      set(state => ({
        savedLineups: [...state.savedLineups, lineup]
      }))} else {
      // console statement removed}
  },

  setOpportunities: opportunities => set({ opportunities}),

  updateSettings: newSettings =>
    set(state => ({
      settings: { ...state.settings, ...newSettings}
    })),

  updateAnalytics: newMetrics =>
    set(state => ({
      analytics: { ...state.analytics, ...newMetrics}
    })),

  setIsLoading: isLoading => set({ isLoading}),
  setError: error => set({ error}),
  setStrategyAutomation: (strategyName, enabled) => {
    set(state => ({
      automatedStrategies: {
        ...state.automatedStrategies,
        [strategyName]: enabled
      }
    }))}
}));



`
