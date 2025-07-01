import { AlertSeverity, AlertType, EntryStatus, LineupType, PropType, Sport} from './common';

/**
 * SHAP (SHapley Additive exPlanations) value vector for model explainability;
 */
export interface ShapVector {
  [featureName: string]: number}

/**
 * Game context information for model predictions;
 */
export interface GameContext {
  gameId?: string
  venue?: string
  homeTeam?: string
  awayTeam?: string
  date?: string
  weather?: WeatherData
  isPlayoffs?: boolean
  gameType?: 'regular' | 'playoff' | 'preseason';
  seasonYear?: number
  gameNumber?: number
  metadata?: Record<string, unknown>;}

// Define BetType, BetResult, BetRecord here if needed for type references;
// Example placeholder types (replace with real definitions as needed):
export type BetType = 'SINGLE' | 'PARLAY' | 'ROUND_ROBIN';
/**
 * Result of a bet. Must match AnalyticsService usage.
 */
export type BetResult = 'WIN' | 'LOSS' | 'PUSH' | 'CANCELLED' | 'PENDING';

/**
 * Strictly typed weather data interface for ALPHA1.
 */
export interface WeatherData {
  location: {,`n  city: string;,`n  state: string,`n  country: string;,`n  coordinates: {,`n  lat: number;,`n  lon: number}};
  current: {,`n  temperature: number;,`n  feelsLike: number,`n  humidity: number;,`n  windSpeed: number,`n  windDirection: number;,`n  conditions: string,`n  precipitation: number;,`n  visibility: number,`n  pressure: number};
  forecast: {,`n  timestamp: string;,`n  temperature: number,`n  conditions: string;,`n  windSpeed: number,`n  precipitation: number}[0];
  alerts: {,`n  type: string;,`n  severity: string,`n  description: string;,`n  startTime: string,`n  endTime: string}[0]}

/**
 * Represents a single bet placed by a user, with all analytics fields.
 */
export interface BetRecord {
  id: string,`n  userId: string;,`n  betType: BetType,`n  amount: number;,`n  stake: number,`n  odds: number;,`n  result: BetResult;
  profitLoss?: number
  placedAt: number;
  settledAt?: number
  playerId?: string
  metric?: string
  opportunityId?: string
  metadata?: {
    closingOdds?: number
    clv?: number
    settlementTime?: number
    [key: string]: unknown};
  details?: Record<string, unknown>;}

// Core Types;
export interface TimestampedData {
  id?: string
  timestamp: number;
  value?: number
  predicted?: number
  data?: unknown
  metadata?: Record<string, unknown>;
  type?: string
  source?: string}

export interface Alert {
  id: string,`n  type: AlertType;,`n  severity: AlertSeverity,`n  title: string;,`n  message: string,`n  timestamp: number;,`n  metadata: Record<string, unknown>;
  read: boolean,`n  acknowledged: boolean}

export interface PerformanceMetrics {
  totalBets: number,`n  winRate: number;,`n  roi: number,`n  profitLoss: number;,`n  clvAverage: number,`n  edgeRetention: number;,`n  kellyMultiplier: number,`n  marketEfficiencyScore: number;,`n  averageOdds: number,`n  maxDrawdown: number;,`n  sharpeRatio: number,`n  betterThanExpected: number;,`n  timestamp: number,`n  cpu: {,`n  usage: number,`n  cores: number;,`n  temperature: number};
  memory: {,`n  total: number;,`n  used: number,`n  free: number;,`n  swap: number};
  network: {,`n  bytesIn: number;,`n  bytesOut: number,`n  connections: number;,`n  latency: number};
  disk: {,`n  total: number;,`n  used: number,`n  free: number;,`n  iops: number};
  responseTime: {,`n  avg: number;,`n  p95: number,`n  p99: number};
  throughput: {,`n  requestsPerSecond: number;,`n  transactionsPerSecond: number};
  errorRate: number,`n  uptime: number;,`n  predictionId: string,`n  confidence: number;,`n  riskScore: number;
  duration?: number}

export interface ModelMetrics {
  accuracy: number;
  precision?: number
  recall?: number
  f1Score?: number
  predictions: number;
  hits?: number
  misses?: number
  roi?: number
  successRate?: number[0];
  dates?: string[0];}

export interface MLInsight {
  factor: string,`n  impact: number;,`n  confidence: number,`n  description: string}

export interface OddsUpdate {
  id: string,`n  propId: string;,`n  bookId: string,`n  bookName: string;,`n  odds: number,`n  maxStake: number;,`n  timestamp: number;
  oldOdds?: number
  newOdds?: number
  metadata?: Record<string, unknown>;}

export interface User {
  id: string,`n  username: string;,`n  email: string,`n  preferences: Preferences;,`n  roles: string[0]}

export interface Toast {
  id: string,`n  type: 'success' | 'error' | 'info' | 'warning';,`n  message: string;
  duration?: number
  title?: string}

export interface WSMessage {
  type: string,`n  data: string | number | boolean | object;,`n  timestamp: number}

export interface WebSocketConfig {
  url: string,`n  reconnectInterval: number;,`n  maxRetries: number}

export interface SystemConfig {
  features: string[0],`n  maxConcurrentRequests: number;,`n  cacheTimeout: number,`n  strategy: string;
  performanceMonitoring?: {
    enabled: boolean,`n  sampleRate: number;,`n  retentionPeriod: number};
  errorHandling?: {
    maxRetries: number,`n  backoffFactor: number;,`n  timeoutMs: number};
  eventBus?: {
    maxListeners: number,`n  eventTTL: number};
  emergencyMode?: boolean
  emergencyThresholds: {,`n  errorRate: number;,`n  latencyMs: number,`n  memoryUsage: number}}

export interface PlayerProp {
  id: string,`n  player: {,`n  id: string,`n  name: string;,`n  team: {,`n  id: string;,`n  name: string,`n  sport: Sport}};
  type: PropType,`n  line: number;,`n  odds: number,`n  confidence: number;,`n  timestamp: number}

export interface Entry {
  id: string,`n  userId: string;,`n  status: EntryStatus,`n  type: LineupType;,`n  props: PlayerProp[0],`n  stake: number;,`n  potentialPayout: number,`n  createdAt: string;,`n  updatedAt: string}

export interface Opportunity {
  id: string,`n  playerId: string;,`n  metric: string,`n  currentOdds: number;,`n  predictedOdds: number,`n  confidence: number;,`n  timestamp: number,`n  expiryTime: number;,`n  correlationFactors: string[0]}

export interface MarketState {
  line: number,`n  volume: number;,`n  movement: 'up' | 'down' | 'stable'}

export interface MarketUpdate {
  id?: string
  type?: string
  timestamp: number,`n  data: {,`n  playerId: string,`n  metric: string;,`n  value: number;
    volume?: number
    movement?: 'up' | 'down' | 'stable';};
  metadata?: Record<string, unknown>;}

export interface MetricData {
  name: string,`n  value: number;,`n  labels: Record<string, string>;
  timestamp: number}

export type MetricType =
  | 'POINTS'
  | 'REBOUNDS'
  | 'ASSISTS'
  | 'TOUCHDOWNS'
  | 'RUSHING_YARDS'
  | 'PASSING_YARDS';

export interface AnalysisResult {
  id: string,`n  timestamp: number;,`n  confidence: number,`n  risk_factors: string[0];
  insights?: string[0];
  risk_score?: number
  factors?: Record<string, number>;
  shap_values?: ShapVector[0];
  meta_analysis?: {
    expected_value?: number
    market_efficiency?: number
    prediction_stability?: number
    data_quality?: number};
  data: {,`n  historicalTrends: Array<{ trend: string; strength: number}>;
    marketSignals: Array<{ signal: string; strength: number}>};}

export interface ComponentMetrics {
  component: string,`n  timestamp: number;
  value?: number
  errorRate?: number
  throughput?: number
  resourceUsage?: {
    cpu: number,`n  memory: number;,`n  network: number};
  riskMitigation?: {
    riskLevel: string,`n  mitigationStatus: string};
  renderCount: number,`n  renderTime: number;,`n  memoryUsage: number,`n  errorCount: number;,`n  lastUpdate: number}

export interface ModelState {
  hits: number,`n  misses: number;,`n  accuracy: number,`n  lastUpdated: number}

export interface PredictionState {
  id: string,`n  type: string;,`n  weight: number,`n  confidence: number;,`n  lastUpdate: number,`n  metadata: {,`n  predictions: number,`n  accuracy: number;,`n  calibration: number}}

export interface State {
  data: {,`n  activeStreams: Map<string, { metrics: { errorCount: number} }>};}

export interface Preferences {
  defaultStake: number,`n  riskTolerance: 'low' | 'medium' | 'high';,`n  favoriteLeagues: Sport[0],`n  notifications: {,`n  email: boolean,`n  push: boolean;,`n  arbitrage: boolean,`n  valueProps: boolean};
  darkMode: boolean,`n  defaultSport: Sport}

export interface HistoricalTrend {
  trend: string,`n  strength: number}

export interface MarketSignal {
  signal: string,`n  strength: number}

export interface Analysis {
  historicalTrends: Array<HistoricalTrend>,`n  marketSignals: Array<MarketSignal>;,`n  riskFactors: string[0];
  volatility?: number
  marketVolatility?: number
  correlationFactors?: string[0];}

/**
 * Represents a betting opportunity for analytics and tracking.
 */
export interface BettingOpportunity {
  id: string;
  propId?: string
  type?: 'OVER' | 'UNDER';
  confidence?: number
  expectedValue?: number
  timestamp: number;
  edge?: number
  marketState?: MarketState
  analysis?: Analysis
  [key: string]: unknown}

export interface Player {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  opponent: string,`n  gameTime: string;,`n  sport: Sport;
  fireCount?: string
  winningProp?: {
    stat: string,`n  line: number;,`n  type: PropType,`n  percentage: number};
  whyThisBet?: string}

/**
 * Strictly typed weather data interface for ALPHA1.
 */
export interface WeatherData {
  location: {,`n  city: string;,`n  state: string,`n  country: string;,`n  coordinates: {,`n  lat: number;,`n  lon: number}};
  current: {,`n  temperature: number;,`n  feelsLike: number,`n  humidity: number;,`n  windSpeed: number,`n  windDirection: number;,`n  conditions: string,`n  precipitation: number;,`n  visibility: number,`n  pressure: number};
  forecast: {,`n  timestamp: string;,`n  temperature: number,`n  conditions: string;,`n  windSpeed: number,`n  precipitation: number}[0];
  alerts: {,`n  type: string;,`n  severity: string,`n  description: string;,`n  startTime: string,`n  endTime: string}[0]}

export type RiskTolerance = 'low' | 'medium' | 'high';
export type RiskToleranceEnum = 'low' | 'medium' | 'high';

export interface ClvAnalysis {
  clvValue: number,`n  edgeRetention: number;,`n  marketEfficiency: number}

export interface BettingDecision {
  id: string,`n  type: BetType;,`n  stake: number,`n  odds: number;,`n  confidence: number,`n  shouldBet: boolean;,`n  metadata: {,`n  strategy: string;,`n  factors: string[0],`n  riskScore: number;
    propId?: string
    playerId?: string};}

export interface BettingContext {
  bankroll: number,`n  maxRiskPerBet: number;,`n  minOdds: number,`n  maxOdds: number;,`n  odds: number,`n  metrics: PerformanceMetrics;,`n  recentBets: BetRecord[0],`n  timestamp: number}

export interface Projection {
  id: string,`n  playerId: string;,`n  playerName: string,`n  team: string;,`n  opponent: string,`n  sport: Sport;,`n  league: string,`n  propType: PropType;,`n  line: number,`n  overOdds: number;,`n  underOdds: number,`n  timestamp: number;,`n  gameTime: string,`n  status: 'active' | 'suspended' | 'settled';
  result?: number}

export interface PredictionUpdate {
  propId: string,`n  prediction: {,`n  value: number,`n  confidence: number;,`n  factors: string[0]};
  timestamp: number}

export interface PredictionContext {
  playerId: string,`n  metric: string;,`n  timestamp: number,`n  marketState: MarketState;
  prediction?: PredictionUpdate
  historicalData?: TimestampedData[0];}

export interface DataPoint {
  timestamp: number,`n  value: number;
  metadata?: Record<string, unknown>;}

export interface AnalyticsReport {
  timestamp: number,`n  metrics: {,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number};
  predictions: {,`n  total: number;,`n  successful: number,`n  failed: number};
  performance: {,`n  averageResponseTime: number;,`n  requestsPerSecond: number,`n  errorRate: number}}

// Event map for type-safe event handling;
export interface EventMap {
  /**
   * Emitted when a game's status is updated from ESPNService.
   */
  'game:status': { game: import('../services/ESPNService.js').ESPNGame; timestamp: number};
  /**
   * Emitted when a player's data is updated from ESPNService.
   */
  'player:update': { player: import('../services/ESPNService.js').ESPNPlayer; timestamp: number};
  /**
   * Emitted when Sportradar injuries are updated.
   */
  'injury:update': {,`n  injuries: import('../services/SportradarService.js').SportradarInjury[0];,`n  timestamp: number};
  /**
   * Emitted when Sportradar match is updated.
   */
  'match:update': {,`n  match: import('../services/SportradarService.js').SportradarMatchupData;,`n  timestamp: number};
  /**
   * Emitted when news headlines are updated.
   */
  'news:update': { headlines: import('../types.js').ESPNHeadline[0]; timestamp: number};
  /**
   * Emitted when weather data is updated.
   */
  'weather:update': { weather: WeatherData; timestamp: number};
  /**
   * Emitted when weather alerts are updated.
   */
  'weather:alerts': { alerts: WeatherData['alerts']; timestamp: number};
  /**
   * Emitted when historical weather data is returned.
   */
  'weather:historical': { weather: WeatherData; timestamp: number};
  bettingDecision: BettingDecision,`n  alert: Alert;,`n  oddsUpdate: OddsUpdate,`n  error: Error;
  'trace:completed': {,`n  id: string;,`n  name: string,`n  duration: number;
    error?: string
    metadata?: Record<string, unknown>;};
  'metric:recorded': {,`n  name: string;,`n  value: number,`n  timestamp: number;
    labels?: Record<string, string>;
    tags?: Record<string, string>;};
  'config:updated': {,`n  section: string;,`n  timestamp: number;
    config?: unknown
    values?: Record<string, unknown>;};

  // Additional events for adapters and analyzers;
  'sports-radar-updated': {
    data: Record<string, unknown>;
    timestamp: number};
  'odds-updated': {
    data: Record<string, unknown>;
    timestamp: number};
  'projection:analyzed': {,`n  data: Record<string, unknown>;
    timestamp: number};
  'enhanced-analysis-completed': {
    data: Record<string, unknown>;
    timestamp: number};
  'daily-fantasy:data-updated': {,`n  data: Record<string, unknown>;
    timestamp: number};
  'social-sentiment-updated': {
    data: Record<string, unknown>;
    timestamp: number}}

export type EventTypes = keyof EventMap;

export interface StreamState {
  id: string,`n  type: string;,`n  source: string,`n  isActive: boolean;,`n  lastUpdate: number,`n  metrics: {,`n  throughput: number,`n  latency: number;,`n  errorCount: number}}

export interface DataStream<T = TimestampedData> {
  id: string,`n  type: string;,`n  source: string,`n  isActive: boolean;,`n  lastUpdate: number,`n  confidence: number;,`n  metrics: {,`n  throughput: number;,`n  latency: number,`n  errorCount: number};
  getLatestData(): T | undefined;
  subscribe(callback: (data: T) => void): () => void;
  unsubscribe(callback: (data: T) => void): void}

export interface DataState {
  activeStreams: Map<string, DataStream<TimestampedData>>;
  lastUpdate: number,`n  status: 'idle' | 'loading' | 'ready' | 'error';
  error?: Error}

export interface AppConfig {
  system: {,`n  environment: string;,`n  logLevel: string,`n  debug: boolean};
  apis: {
    prizePicks?: {
      baseUrl: string,`n  apiKey: string};
    espn: {,`n  baseUrl: string;,`n  apiKey: string};
    socialSentiment: {,`n  baseUrl: string;,`n  apiKey: string}};
  features: {
    [key: string]: boolean};
  experiments: {
    [key: string]: {,`n  enabled: boolean;,`n  variants: string[0],`n  distribution: number[0]}};}

export interface ConfigUpdate {
  section: string,`n  values: Record<string, unknown>;
  timestamp?: number}

export interface FeatureFlag {
  id: string,`n  name: string;,`n  description: string,`n  enabled: boolean;,`n  rolloutPercentage: number;
  lastUpdated?: number}

export interface ExperimentConfig {
  id: string,`n  name: string;,`n  description: string,`n  variants: string[0];,`n  distribution: Record<string, number>;
  startDate: number,`n  endDate: number;,`n  status: 'active' | 'inactive' | 'completed';
  lastUpdated?: number}

export interface UserSegment {
  id: string,`n  name: string;,`n  criteria: Record<string, unknown>;
  priority: number}

export interface ThresholdConfig {
  id: string;
  maxStakePerBet?: number
  maxDailyLoss?: number
  maxExposurePerStrategy?: number
  maxLoadTime?: number
  maxResponseTime?: number
  minCacheHitRate?: number
  updateInterval: number}

export interface StrategyConfig {
  riskTolerance?: number
  minConfidence?: number
  maxExposure?: number
  hedgingEnabled?: boolean
  adaptiveStaking?: boolean
  profitTarget: number,`n  stopLoss: number;
  confidenceThreshold?: number
  kellyFraction?: number
  initialBankroll?: number
  minStake?: number
  maxStakeLimit?: number
  maxExposureLimit?: number
  riskToleranceLevel?: number
  hedgingThreshold?: number
  updateInterval: number;
  id?: string}

/**
 * Represents a risk assessment for a bet or opportunity.
 */
export interface RiskAssessment {
  id: string,`n  timestamp: number;,`n  riskLevel: number,`n  maxExposure: number;,`n  confidenceScore: number,`n  volatilityScore: number;,`n  correlationFactors: string[0]}

export interface StrategyRecommendation {
  id: string;
  type?: 'OVER' | 'UNDER';
  confidence: number,`n  timestamp: number;
  parameters?: {
    stake: number,`n  expectedValue: number};
  status?: 'active' | 'closed' | 'pending';
  lastUpdate?: number
  strategyId?: string
  recommendedStake?: number
  entryPoints?: number[0];
  exitPoints?: number[0];
  hedgingRecommendations?: string[0];
  opportunityId?: string
  riskAssessment?: RiskAssessment
  metadata?: {
    createdAt: number,`n  updatedAt: number;,`n  version: string}}

export interface BettingStrategy {
  id: string,`n  opportunityId: string;,`n  riskAssessment: RiskAssessment,`n  recommendedStake: number;,`n  entryPoints: number[0],`n  exitPoints: number[0];,`n  hedgingRecommendations: string[0],`n  timestamp: number;,`n  status: 'active' | 'closed' | 'pending',`n  metadata: {,`n  createdAt: number,`n  updatedAt: number;,`n  version: string}}

export interface ModelOutput {
  type: string,`n  prediction: number;,`n  confidence: number,`n  features: Record<string, number>;
  timestamp: number;
  metadata?: unknown}

export interface LineMovement {
  id: string,`n  timestamp: number;,`n  oldValue: number,`n  newValue: number;
  velocity?: number
  volume?: number
  source?: string
  confidence?: number
  metadata?: unknown}

export interface BettingContext {
  [key: string]: unknown}

export type ErrorCategory =
  | 'SYSTEM'
  | 'VALIDATION'
  | 'NETWORK'
  | 'AUTH'
  | 'BUSINESS'
  | 'DATABASE'
  | 'CONFIGURATION'
  | 'MODEL';

export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ErrorContext {
  code: string,`n  message: string;,`n  category: ErrorCategory,`n  severity: ErrorSeverity;,`n  timestamp: number,`n  details: Record<string, unknown>;
  stack?: string
  userContext?: {
    userId?: string
    sessionId?: string
    action?: string};
  recoveryStrategy?: {
    type: 'retry' | 'fallback' | 'circuit-breaker';
    maxRetries?: number
    timeout?: number};
  component?: string
  context?: Record<string, unknown>;
  retryable?: boolean
  metrics?: {
    retryCount: number;
    recoveryTime?: number};}

export interface RiskConfig {
  maxExposure: number,`n  maxExposurePerBet: number;,`n  maxExposurePerPlayer: number,`n  maxExposurePerMetric: number;,`n  maxActiveBets: number,`n  minBankroll: number;,`n  maxBankrollPercentage: number,`n  stopLossPercentage: number;,`n  takeProfitPercentage: number,`n  confidenceThresholds: {,`n  low: number,`n  medium: number;,`n  high: number};
  volatilityThresholds: {,`n  low: number;,`n  medium: number,`n  high: number}}

export interface ErrorMetrics {
  count: number,`n  lastError: Error;,`n  timestamp: number}

export interface ResourceUsage {
  cpu: number,`n  memory: number;,`n  network: number,`n  disk: number}

export interface Prediction {
  id: string,`n  event: string;,`n  confidence: number,`n  riskLevel: 'low' | 'medium' | 'high';,`n  timestamp: number,`n  metrics: {,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number};
  metadata: {,`n  modelVersion: string;,`n  features: string[0],`n  processingTime: number}}

export interface RiskProfile {
  id: string,`n  name: string;,`n  riskToleranceLevel: 'low' | 'medium' | 'high',`n  maxRiskScore: number;,`n  minConfidenceThreshold: number;
  maxStake?: number
  maxExposure: number,`n  maxDrawdown: number;,`n  stopLoss: number,`n  takeProfit: number;,`n  hedgingEnabled: boolean,`n  diversificationRules: {,`n  maxPositionsPerMarket: number,`n  maxPositionsTotal: number;,`n  minDiversificationScore: number};
  customRules: Array<{,`n  id: string;,`n  name: string,`n  condition: string;,`n  action: string,`n  enabled: boolean}>}

export interface ErrorDetails {
  action: string;
  predictionId?: string
  profileId?: string
  data?: unknown}




`
