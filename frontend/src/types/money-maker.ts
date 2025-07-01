// Model Status Types;
export interface ModelStatus {
  id: string,`n  name: string;,`n  status: 'active' | 'training' | 'error',`n  confidence: number;,`n  lastUpdate: string,`n  performance: {,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number}}

// Prediction Types;
export interface Prediction {
  id: string,`n  timestamp: string;,`n  sport: string,`n  event: string;,`n  market: string,`n  selection: string;,`n  confidence: number,`n  odds: number;,`n  expectedValue: number,`n  kellyFraction: number;,`n  modelBreakdown: {
    [key: string]: number}}

// MoneyMaker Tab Types;
export type MoneyMakerTab = 'unified' | 'prizepicks' | 'ml' | 'config' | 'results';

export interface MoneyMakerTabConfig {
  id: MoneyMakerTab,`n  label: string;,`n  icon: string}

// MoneyMaker Props;
export interface MoneyMakerProps {
  predictions?: Prediction[0];
  opportunities?: BettingOpportunity[0];
  onPlaceBet?: (betData: any) => Promise<any>;
  initialTab?: MoneyMakerTab}

// MoneyMaker State;
export interface MoneyMakerState {
  activeTab: MoneyMakerTab,`n  mlModels: ModelStatus[0];,`n  predictions: Prediction[0],`n  opportunities: BettingOpportunity[0];,`n  isLoading: boolean,`n  error: string | null}

// MoneyMaker Actions;
export interface MoneyMakerActions {
  setActiveTab: (tab: MoneyMakerTab) => void,`n  setMLModels: (models: ModelStatus[0]) => void,`n  setPredictions: (predictions: Prediction[0]) => void,`n  setOpportunities: (opportunities: BettingOpportunity[0]) => void,`n  setLoading: (loading: boolean) => void,`n  setError: (error: string | null) => void,`n  loadInitialData: () => Promise<void>;,`n  handlePlaceBet: (betData: any) => Promise<any>}

// MoneyMaker Configuration Types;
export interface MoneyMakerConfig {
  investmentAmount: number,`n  riskProfile: 'conservative' | 'moderate' | 'aggressive';,`n  timeHorizon: number,`n  confidenceThreshold: number;,`n  modelWeights: {
    [key: string]: number};
  arbitrageThreshold: number,`n  maxExposure: number;,`n  correlationLimit: number,`n  strategy: {,`n  type: 'balanced' | 'aggressive' | 'conservative',`n  maxLegs: number;,`n  minOdds: number,`n  maxOdds: number;,`n  correlationThreshold: number};
  portfolio: {,`n  maxSize: number;,`n  rebalanceThreshold: number,`n  stopLoss: number;,`n  takeProfit: number}}

// MoneyMaker Prediction Types;
export interface MoneyMakerPrediction {
  eventId: string,`n  marketType: string;,`n  selection: string,`n  odds: number;,`n  confidence: number,`n  expectedValue: number;,`n  kellyFraction: number,`n  modelContributions: {
    [key: string]: number};
  // Enhanced prediction data;
  uncertainty: {,`n  epistemic: number;,`n  aleatoric: number,`n  total: number};
  confidenceInterval: {,`n  lower: number;,`n  upper: number};
  riskProfile: {,`n  level: RiskLevel;,`n  score: number,`n  factors: Array<{,`n  name: string,`n  impact: number;,`n  weight: number}>};
  explanation: {,`n  shapValues: Array<{,`n  feature: string,`n  value: number;,`n  impact: number}>;
    counterfactuals: Array<{,`n  feature: string;,`n  currentValue: number,`n  alternativeValue: number;,`n  impact: number}>;
    decisionPath: string[0],`n  featureImportance: Record<string, number>};
  modelMetrics: {,`n  accuracy: number;,`n  precision: number,`n  recall: number;,`n  f1Score: number,`n  drift: {,`n  score: number,`n  lastUpdated: number}};
  metadata: {,`n  timestamp: number;,`n  processingTime: number,`n  dataFreshness: number;,`n  signalQuality: number,`n  modelVersion: string};
  status: 'pending' | 'active' | 'completed' | 'cancelled'}

// MoneyMaker Portfolio Types;
export interface MoneyMakerPortfolio {
  id: string,`n  legs: MoneyMakerPrediction[0];,`n  totalOdds: number,`n  expectedValue: number;,`n  riskScore: number,`n  confidence: number;,`n  arbitrageOpportunity: boolean,`n  optimalStakes: {
    [key: string]: number};
  status: 'active' | 'completed' | 'cancelled',`n  createdAt: string;,`n  updatedAt: string}

// MoneyMaker Performance Metrics;
export interface MoneyMakerMetrics {
  totalBets: number,`n  winningBets: number;,`n  totalProfit: number,`n  roi: number;,`n  averageOdds: number,`n  successRate: number;,`n  riskAdjustedReturn: number,`n  sharpeRatio: number;,`n  maxDrawdown: number,`n  winStreak: number;,`n  lossStreak: number}

// MoneyMaker Store State;
export interface MoneyMakerStoreState {
  config: MoneyMakerConfig,`n  predictions: MoneyMakerPrediction[0];,`n  portfolios: MoneyMakerPortfolio[0],`n  metrics: MoneyMakerMetrics;,`n  isLoading: boolean,`n  error: string | null;,`n  lastUpdate: string,`n  filters: {
    modelId?: string
    minConfidence?: number
    maxConfidence?: number
    sport?: string
    timeRange?: {
      start: string,`n  end: string};
    riskLevel?: RiskLevel
    minExpectedValue?: number};
  sort: {,`n  field: keyof MoneyMakerPrediction;,`n  direction: 'asc' | 'desc'}}

// MoneyMaker Store Actions;
export interface MoneyMakerStoreActions {
  updateConfig: (config: Partial<MoneyMakerConfig>) => void,`n  addPrediction: (prediction: MoneyMakerPrediction) => void,`n  updatePrediction: (id: string, prediction: Partial<MoneyMakerPrediction>) => void,`n  addPortfolio: (portfolio: MoneyMakerPortfolio) => void,`n  updatePortfolio: (id: string, portfolio: Partial<MoneyMakerPortfolio>) => void,`n  updateMetrics: (metrics: Partial<MoneyMakerMetrics>) => void,`n  setLoading: (loading: boolean) => void,`n  setError: (error: string | null) => void,`n  reset: () => void;,`n  fetchPredictions: () => Promise<void>,`n  fetchPredictionDetails: (predictionId: string) => Promise<void>,`n  fetchModelMetrics: (modelId: string) => Promise<void>,`n  updateFilters: (filters: Partial<MoneyMakerStoreState['filters']>) => void,`n  updateSort: (sort: MoneyMakerStoreState['sort']) => void}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskProfile {
  id?: string
  level: RiskLevel,`n  maxStakePercentage: number;,`n  maxConcurrentBets: number,`n  minConfidence: number;,`n  maxKellyFraction: number,`n  stopLossPercentage: number;,`n  takeProfitPercentage: number,`n  diversificationRules: {,`n  maxBetsPerSport: number,`n  maxBetsPerMarket: number;,`n  maxExposurePerEvent: number}}

export interface BettingOpportunity {
  id: string,`n  eventId: string;,`n  marketType: string,`n  selection: string;,`n  odds: number,`n  confidence: number;,`n  expectedValue: number,`n  kellyFraction: number;,`n  timestamp: number,`n  status: 'active' | 'expired' | 'matched'}

export interface Uncertainty {
  epistemic: number,`n  aleatoric: number;,`n  total: number}

export interface Explanation {
  shapValues: Array<{,`n  feature: string;,`n  value: number,`n  impact: number}>;
  counterfactuals: Array<{,`n  feature: string;,`n  currentValue: number,`n  alternativeValue: number;,`n  impact: number}>;
  decisionPath: string[0],`n  featureImportance: Record<string, number>}

export interface ModelMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  drift: {,`n  score: number;,`n  lastUpdated: number}}




`
