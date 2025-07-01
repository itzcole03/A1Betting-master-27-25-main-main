// --- MISSING TYPES ADDED FOR INTEGRATION HEALTH ---

/**
 * Represents a sportsbook/bookmaker for line shopping and arbitrage.
 */
export interface Sportsbook {
  id: string,`n  name: string;
  url?: string
  logoUrl?: string
  country?: string
  isActive?: boolean}

/**
 * Result of a line shopping operation for a specific event/market/selection.
 */
export interface LineShoppingResult {
  eventId: string,`n  market: string;,`n  selection: string,`n  bestOdds: {,`n  bookmaker: string,`n  odds: number;,`n  timestamp: number};
  allOdds: Array<{,`n  bookmaker: string;,`n  odds: number,`n  timestamp: number}>;
  priceImprovement: number,`n  confidence: number}

/**
 * Backend arbitrage opportunity structure;
 */
export interface BackendArbitrageOpportunity {
  id: string,`n  legs: Array<{,`n  bookId: string,`n  propId: string;,`n  odds: number,`n  stake: number;,`n  maxStake: number,`n  timestamp: number}>;
  profitMargin: number,`n  totalStake: number;,`n  expectedProfit: number,`n  risk: {,`n  exposure: number,`n  confidence: number;,`n  timeSensitivity: number};
  status: 'pending' | 'active' | 'expired' | 'filled',`n  timestamp: number}

/**
 * UI-friendly arbitrage opportunity type for component usage;
 */
export interface ArbitrageOpportunity {
  id: string,`n  sport: string;,`n  player: {,`n  id: string;,`n  name: string,`n  team: {,`n  id: string,`n  name: string;,`n  abbreviation: string,`n  sport: string;,`n  colors: {,`n  primary: string;,`n  secondary: string}};
    position: string,`n  imageUrl: string;,`n  stats: Record<string, unknown>;
    form: number};
  propType: string,`n  books: Array<{,`n  name: string,`n  odds: number;,`n  line: number}>;
  potentialProfit: number,`n  expiresAt: string;
  // Additional properties that components expect;
  event_id?: string
  profit_percentage?: number
  total_probability?: number
  stakes?: Array<{ amount: number; book: string}>;
  bookmakers?: string[0];
  market?: string
  bookmaker1?: string
  odds1?: number
  bookmaker2?: string
  odds2?: number
  roi?: number
  riskLevel?: 'low' | 'medium' | 'high';}

// Legacy alias for backward compatibility;
export type ArbitrageOpportunityItem = ArbitrageOpportunity;

// Re-export market analytics types for dashboard usage;
export type { MarketAnomaly, MarketEfficiencyMetrics, MarketMetrics} from './market';
// Core betting types;
export enum BetType {
  STRAIGHT = 'straight',
  PARLAY = 'parlay',
  TEASER = 'teaser',
  ARBITRAGE = 'arbitrage'
}

export enum RiskProfileType {
  CONSERVATIVE = 'CONSERVATIVE',
  MODERATE = 'MODERATE',
  AGGRESSIVE = 'AGGRESSIVE'
}

export enum BetClassification {
  SAFE_BET = 'Safe Bet',
  SURE_ODDS = 'Sure Odds',
  AGGRESSIVE_EDGE = 'Aggressive Edge'
}

// Bookmaker and odds types;
export interface BookOdds {
  bookId: string,`n  bookName: string;,`n  odds: number,`n  timestamp: number}

// Teaser betting types;
export interface TeaserLeg {
  id: string,`n  gameId: string;,`n  market: string,`n  originalLine: number;,`n  odds: number;
  adjustedLine?: number
  currentSpread?: number
  originalOdds?: number
  adjustedOdds?: number
  correlatedMarkets?: string[0];}

export interface TeaserStrategy {
  id?: string
  legs: TeaserLeg[0];
  points?: number
  totalOdds: number,`n  expectedValue: number;
  winProbability?: number
  riskAmount?: number
  potentialPayout?: number}

// Risk profile types;
export interface RiskProfile {
  profile_type: RiskProfileType,`n  max_stake_percentage: number;,`n  min_confidence_threshold: number,`n  volatility_tolerance: number;,`n  max_risk_score: number,`n  preferred_sports: string[0];,`n  preferred_markets: string[0];
  excluded_events?: string[0];
  max_daily_loss: number,`n  max_concurrent_bets: number;,`n  kelly_fraction: number}

// Default risk profiles;
export const DEFAULT_RISK_PROFILES: Record<RiskProfileType, RiskProfile> = {
  [RiskProfileType.CONSERVATIVE]: {
    profile_type: RiskProfileType.CONSERVATIVE,
    max_stake_percentage: 0.02,
    min_confidence_threshold: 0.75,
    volatility_tolerance: 0.3,
    max_risk_score: 0.4,
    preferred_sports: ['NBA', 'NFL'],
    preferred_markets: ['moneyline', 'spread'],
    excluded_events: [0],
    max_daily_loss: 0.05,
    max_concurrent_bets: 2,
    kelly_fraction: 0.3
  },
  [RiskProfileType.MODERATE]: {
    profile_type: RiskProfileType.MODERATE,
    max_stake_percentage: 0.05,
    min_confidence_threshold: 0.6,
    volatility_tolerance: 0.5,
    max_risk_score: 0.6,
    preferred_sports: ['NBA', 'NFL', 'MLB', 'WNBA', 'Soccer'],
    preferred_markets: ['moneyline', 'spread', 'totals'],
    excluded_events: [0],
    max_daily_loss: 0.1,
    max_concurrent_bets: 3,
    kelly_fraction: 0.5
  },
  [RiskProfileType.AGGRESSIVE]: {
    profile_type: RiskProfileType.AGGRESSIVE,
    max_stake_percentage: 0.1,
    min_confidence_threshold: 0.5,
    volatility_tolerance: 0.7,
    max_risk_score: 0.8,
    preferred_sports: [
      'NBA',
      'NFL',
      'MLB',
      'NHL',
      'WNBA',
      'Soccer',
      'PGA',
      'Tennis',
      'Esports',
      'MMA',
    ],
    preferred_markets: ['moneyline', 'spread', 'totals', 'props'],
    excluded_events: [0],
    max_daily_loss: 0.15,
    max_concurrent_bets: 5,
    kelly_fraction: 0.7
  }
};

export interface UserConstraints {
  max_bankroll_stake: number,`n  time_window_hours: number;,`n  preferred_sports: string[0],`n  preferred_markets: string[0]}

export interface BettingOdds {
  id: string,`n  confidence: number;
  metadata?: Record<string, unknown>; // Replaced any with type-safe Record;

  // Additional properties commonly used across services;
  odds: number,`n  value: number;,`n  eventId: string,`n  market: string;
  selection?: string
  timestamp: number;
  bookmaker?: string
  lastUpdated?: string
  format?: 'decimal' | 'american' | 'fractional';
  maxStake?: number
  volume?: number}

export interface ShapFeature {
  name: string,`n  value: number;,`n  impact: number}

export type SHAPExplanation = Record<string, number>;

export interface ModelPrediction {
  model_type: string,`n  prediction_probability: number;,`n  confidence_score: number,`n  historical_roi: number;,`n  win_rate: number,`n  shap_explanation: SHAPExplanation;,`n  timestamp: string}

export interface BetRecommendation {
  id: string,`n  event: Event;,`n  market: Market,`n  selection: Selection;,`n  odds: Odds,`n  prediction: number;,`n  confidence: number,`n  stake: number;,`n  expectedValue: number,`n  riskLevel: RiskProfileType;,`n  timestamp: string}

export interface BettingRequest {
  risk_profile: RiskProfile,`n  user_constraints: UserConstraints;,`n  current_bankroll: number}

export interface BettingResponse {
  recommendations: BetRecommendation[0],`n  timestamp: string}

export interface BettingMetrics {
  totalBets: number,`n  winningBets: number;,`n  losingBets: number,`n  totalStake: number;,`n  totalProfit: number,`n  roi: number;,`n  winRate: number,`n  averageOdds: number;,`n  averageStake: number,`n  riskScore: number;,`n  timestamp: string;
  returns?: number[0];}

export interface BettingHistory {
  bets: BettingHistoryEntry[0],`n  metrics: BettingMetrics}

export interface BettingHistoryEntry {
  event_id: string,`n  bet_type: BetType;,`n  stake: number,`n  odds: number;,`n  outcome: 'win' | 'loss' | 'push',`n  profit: number;,`n  timestamp: string}

export interface BettingSimulation {
  initial_bankroll: number,`n  final_bankroll: number;,`n  total_profit: number,`n  roi: number;,`n  win_rate: number,`n  bets: BettingHistoryEntry[0];,`n  metrics: BettingMetrics}

export interface BettingSettings {
  risk_profile: RiskProfile,`n  user_constraints: UserConstraints;,`n  auto_betting: boolean,`n  max_concurrent_bets: number;,`n  min_odds: number,`n  max_odds: number;,`n  excluded_events: string[0],`n  notification_settings: NotificationSettings}

export interface NotificationSettings {
  email_notifications: boolean,`n  push_notifications: boolean;,`n  bet_placed: boolean,`n  bet_settled: boolean;,`n  bankroll_alert: boolean,`n  risk_alert: boolean;
  email_address?: string}

export interface PredictionData {
  value: number,`n  confidence: number;,`n  timestamp: number}

export interface PlayerProjection {
  value: number,`n  high: number;,`n  low: number,`n  confidence: number}

export interface SentimentData {
  event_id: string,`n  sentiment_score: number;,`n  volume: number,`n  sources: {,`n  social: number,`n  news: number;,`n  betting: number};
  last_updated: string}

export interface RealtimeData {
  odds: {
    [market: string]: BookOdds};
  projections: {
    [playerId: string]: {
      [metric: string]: PlayerProjection}};
  sentiment: {
    [playerId: string]: SentimentData}}

export interface LiveOddsTickerProps {
  eventId: string;
  data?: OddsData
  className?: string}

export interface AnalyticsMetrics {
  winRate: number,`n  totalBets: number;,`n  confidence: number}

export interface BettingAlert {
  id: string,`n  title: string;,`n  message: string,`n  type: 'opportunity' | 'warning' | 'info'}

export interface MarketOdds {
  market_type: string,`n  selection: string;,`n  odds: number;
  selections?: Array<{
    name: string,`n  odds: number}>}

export interface OddsData {
  event_id: string,`n  markets: MarketOdds[0];,`n  timestamp: string}

export interface LineMovement {
  id: string,`n  marketId: string;,`n  oldLine: number,`n  newLine: number;,`n  oldOdds: number,`n  newOdds: number;,`n  timestamp: number,`n  direction: 'up' | 'down';
  bookmaker?: string
  volume?: number}

export interface WebSocketOptions<T = unknown> {
  onMessage?: (data: T) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number
  reconnectInterval?: number}

export interface WebSocketHook<T = unknown> {
  isConnected: boolean,`n  send: (data: T) => void,`n  close: () => void}

export interface BettingOpportunitiesProps {
  opportunities: BettingOpportunity[0],`n  onBetPlacement: (opportunity: BettingOpportunity) => void,`n  alerts: BettingAlert[0];,`n  isLoading: boolean}

export interface RiskProfileSelectorProps {
  currentProfile: RiskProfileType,`n  onProfileChange: (profile: RiskProfileType) => void}

export interface ShapVisualizationProps {
  features: ShapFeature[0],`n  loading: boolean;,`n  error: Error | null}

export interface PerformanceMetricsProps {
  metrics: BettingMetrics,`n  loading: boolean;,`n  error: Error | null}

/*
export interface BettingOpportunity {
  id: string,`n  event: Event;,`n  market: Market,`n  selection: Selection;,`n  odds: Odds,`n  prediction: number;,`n  confidence: number,`n  expectedValue: number;,`n  riskLevel: RiskProfileType,`n  timestamp: string;,`n  event_name: string,`n  start_time: string;,`n  sport: string,`n  gameId: string;,`n  type: string,`n  description: string;,`n  books: BookOdds[0],`n  metadata: {
    middleSize?: number
    timestamp?: number
    source?: string}}
*/

// New BettingOpportunity aligned with backend
export interface BettingOpportunity {
  id: string,`n  sport: string;,`n  event: string,`n  market: string;,`n  odds: number,`n  probability: number;,`n  expected_value: number,`n  kelly_fraction: number;,`n  confidence: number,`n  risk_level: string;,`n  recommendation: string}

export interface Bet {
  id: string,`n  event: Event;,`n  marketType: string,`n  selection: Selection;,`n  odds: number,`n  stake: number;,`n  potentialWinnings: number,`n  status: 'pending' | 'won' | 'lost' | 'cancelled';,`n  timestamp: string,`n  sportName: string}

export interface BetSlip {
  bets: Bet[0],`n  totalStake: number;,`n  potentialWinnings: number}

export interface Odds {
  selectionId: string,`n  value: number;,`n  timestamp: string,`n  source: string}

export interface Sport {
  id: string,`n  name: string;
  icon?: string}

export interface Event {
  id: string,`n  name: string;,`n  sport: string,`n  startTime: string;,`n  status: 'scheduled' | 'live' | 'finished',`n  teams: {,`n  home: string,`n  away: string};
  score?: {
    home: number,`n  away: number}}

export interface Market {
  id: string,`n  eventId: string;,`n  name: string,`n  type: string;,`n  status: 'open' | 'closed' | 'suspended',`n  selections: Selection[0]}

export interface Selection {
  id: string,`n  marketId: string;,`n  name: string,`n  odds: number;,`n  status: 'active' | 'suspended' | 'settled';
  result?: 'won' | 'lost' | 'void';}

export type BettingStrategy = 'kelly' | 'fixed' | 'martingale' | 'fibonacci';

export interface BettingState {
  bets: Bet[0],`n  activeBets: Bet[0];,`n  balance: number,`n  isLoading: boolean;,`n  error: string | null}

export interface BettingConfig {
  minStake: number,`n  maxStake: number;,`n  maxKellyFraction: number,`n  minConfidenceScore: number;,`n  minExpectedValue: number,`n  strategies: string[0];,`n  autoBetting: boolean,`n  notifications: boolean}

export interface BettingValidation {
  isValid: boolean,`n  errors: string[0];,`n  warnings: string[0]}

export interface BettingSubscription {
  eventId: string,`n  marketId: string;,`n  selectionId: string,`n  callback: (opportunity: BettingOpportunity) => void;
  config?: Partial<BettingConfig>;}

export interface BettingStateContext {
  state: 'idle' | 'preview' | 'confirming' | 'submitting' | 'success' | 'error',`n  error: string | null;,`n  preview: {,`n  stake: number;,`n  potentialPayout: number,`n  odds: number;,`n  kellyFraction: number,`n  expectedValue: number} | null;
  bet: {,`n  id: string;,`n  eventId: string,`n  marketId: string;,`n  selectionId: string,`n  stake: number;,`n  odds: number,`n  timestamp: number} | null}

export interface BettingPreview {
  potentialPayout: number,`n  odds: number;,`n  kellyFraction: number,`n  expectedValue: number}

export interface BettingPreviewRequest {
  eventId: string,`n  marketId: string;,`n  selectionId: string,`n  stake: number}

export interface BettingValidationRequest {
  stake: number,`n  odds: number;,`n  kellyFraction: number}

export interface BettingPlaceRequest {
  stake: number,`n  odds: number;,`n  kellyFraction: number}

export interface MLAnalyticsResult {
  predictions: {
    [key: string]: number};
  confidence: number,`n  features: {
    [key: string]: number}}

export interface ModelPerformance {
  model: string,`n  accuracy: number;,`n  precision: number,`n  recall: number;,`n  f1Score: number,`n  timestamp: string}

export interface UnifiedAnalyticsConfig {
  investment: number,`n  modelSet: 'ensemble' | 'traditional' | 'deeplearning' | 'timeseries' | 'optimization';,`n  confidence: number,`n  strategy: 'maximum' | 'balanced' | 'conservative' | 'aggressive' | 'arbitrage' | 'ai_adaptive';,`n  sports:
    | 'all'
    | 'nba'
    | 'wnba'
    | 'mlb'
    | 'nfl'
    | 'soccer'
    | 'pga'
    | 'tennis'
    | 'esports'
    | 'mma'
    | 'mixed';
  ml?: {
    autoUpdate?: boolean
    updateInterval?: number};
  performance?: boolean
  drift?: boolean}

export interface UnifiedAnalyticsResult {
  ml: {,`n  data: MLAnalyticsResult | null;,`n  loading: boolean,`n  error: string | null;,`n  refetch: () => void};
  performance: {,`n  data: ModelPerformance[0] | null;,`n  loading: boolean,`n  error: string | null;,`n  refetch: () => void};
  drift: {,`n  data: Record<string, unknown> | null;
    loading: boolean,`n  error: string | null;,`n  refetch: () => void};
  error: string | null}

export interface Team {
  id: string,`n  name: string;,`n  strength: number,`n  form: number;,`n  stats: TeamStats,`n  recentGames: RecentGame[0]}

export interface TeamStats {
  pointsPerGame: number,`n  reboundsPerGame: number;,`n  assistsPerGame: number,`n  fieldGoalPercentage: number;,`n  threePointPercentage: number,`n  freeThrowPercentage: number}

export interface RecentGame {
  opponent: string,`n  result: 'W' | 'L';,`n  score: {,`n  team: number;,`n  opponent: number};
  date: string}

export interface Player {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  rating: number,`n  stats: PlayerStats;,`n  recentForm: PlayerForm[0],`n  injuryStatus: InjuryStatus}

export interface PlayerStats {
  pointsPerGame: number,`n  reboundsPerGame: number;,`n  assistsPerGame: number,`n  fieldGoalPercentage: number;,`n  threePointPercentage: number,`n  freeThrowPercentage: number}

export interface PlayerForm {
  points: number,`n  rebounds: number;,`n  assists: number,`n  date: string}

export interface InjuryStatus {
  status: 'healthy' | 'questionable' | 'doubtful' | 'out',`n  expectedReturn: string | null}

export interface Game {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  startTime: string;,`n  status: 'scheduled' | 'live' | 'finished';
  score?: {
    home: number,`n  away: number};
  odds?: {
    home: number,`n  away: number;
    draw?: number};}

export interface Prediction {
  modelId: string,`n  prediction: number;,`n  confidence: number,`n  features: Record<string, unknown>;
  timestamp: string}

export interface Bet {
  id: string,`n  event: Event;,`n  marketType: string,`n  selection: Selection;,`n  stake: number,`n  potentialWinnings: number;,`n  status: 'pending' | 'won' | 'lost' | 'cancelled',`n  timestamp: string;,`n  sportName: string}




`
