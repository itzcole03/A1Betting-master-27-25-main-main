import { BetRecord} from '@/types/core.js';
/**
 * Analytics service for tracking performance metrics.
 */
export interface AnalyticsConfig {
  retentionPeriod: number,`n  aggregationIntervals: string[0];,`n  metrics: string[0],`n  dimensions: string[0];,`n  filters: Record<string, unknown>}
export interface PerformanceMetrics {
  totalBets: number,`n  winningBets: number;,`n  losingBets: number,`n  pushBets: number;,`n  pendingBets: number,`n  totalStake: number;,`n  totalReturn: number,`n  profitLoss: number;,`n  roi: number,`n  winRate: number;,`n  averageOdds: number,`n  averageStake: number;,`n  maxDrawdown: number,`n  sharpeRatio: number;,`n  kellyMultiplier: number,`n  clvAverage: number;,`n  edgeRetention: number,`n  timeInMarket: number}
export interface MetricBreakdown {
  metric: string,`n  bets: number;,`n  stake: number,`n  profitLoss: number;,`n  roi: number,`n  winRate: number;,`n  averageOdds: number,`n  clv: number}
export interface PlayerBreakdown {
  playerId: string,`n  bets: number;,`n  stake: number,`n  profitLoss: number;,`n  roi: number,`n  winRate: number;,`n  averageOdds: number,`n  metrics: string[0]}
export interface TimeSeriesData {
  timestamp: number,`n  metrics: {,`n  bets: number,`n  stake: number;,`n  profitLoss: number,`n  roi: number;,`n  winRate: number,`n  clv: number};}
/**
 * Analytics service for tracking performance metrics.
 */
/**
 * Simulated fallback metrics for disabled/feature-flag scenarios.
 */
export declare class AnalyticsService {
  private static instance;
  private readonly eventBus;
  private readonly config;
  private readonly bets;
  private readonly opportunities;
  private readonly riskAssessments;
  private readonly timeSeriesData;
  private metrics;
  /**
   * Returns the current analytics status: 'enabled', 'disabled', or 'error'.
   */
  /**
   * Returns the current analytics status: 'enabled', 'disabled', or 'error'.
   */
  /**
   * Returns true if analytics is enabled via feature flag.
   */
  static isEnabled(): boolean;
  private constructor();
  /**
   * Returns the singleton instance of AnalyticsService.
   */
  static getInstance(): AnalyticsService;
  private initializeConfig;
  private initializeMetrics;
  private setupEventListeners;
  private startPeriodicUpdates;
  private updateTimeSeriesData;
  private cleanupOldData;
  private handleBetSettlement;
  private updateMetrics;
  private calculateMaxDrawdown;
  private calculateSharpeRatio;
  private calculateKellyMultiplier;
  private calculateTimeInMarket;
  /**
   * Returns a breakdown of metrics by metric type. If analytics is disabled, returns an empty array.
   */
  getMetricBreakdown(): MetricBreakdown[0];
  /**
   * Returns a breakdown of metrics by player. If analytics is disabled, returns an empty array.
   */
  getPlayerBreakdown(): PlayerBreakdown[0];
  getTimeSeriesData(interval: '1d' | '7d' | '30d'): TimeSeriesData[0];
  getMetrics(): PerformanceMetrics;
  getBets(): BetRecord[0];
  getConfig(): AnalyticsConfig;}


`
