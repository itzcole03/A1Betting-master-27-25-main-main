import { ModelOutput, BetRecommendation} from '@/types/prediction.ts';
import { UnifiedLogger} from '@/logging/types.ts';
import { UnifiedMetrics} from '@/metrics/types.ts';
export interface ModelPerformanceMetrics {
  totalPredictions: number,`n  correctPredictions: number;,`n  totalStake: number,`n  totalPayout: number;,`n  roi: number,`n  winRate: number;,`n  averageConfidence: number,`n  averageOdds: number;,`n  profitFactor: number,`n  sharpeRatio: number;,`n  maxDrawdown: number,`n  kellyCriterion: number;,`n  expectedValue: number,`n  calibrationScore: number;,`n  lastUpdated: Date}
interface PerformanceSnapshot {
  timestamp: Date,`n  metrics: ModelPerformanceMetrics}
export declare class ModelPerformanceTracker {
  private logger;
  private metrics;
  private readonly maxHistoryLength;
  private performanceHistory;
  private currentMetrics;
  private calibrationData;
  constructor(logger: UnifiedLogger, metrics: UnifiedMetrics, maxHistoryLength?: number);
  trackPrediction(
    modelName: string,
    prediction: ModelOutput,
    recommendation: BetRecommendation
  ): void;
  recordOutcome(modelName: string, stake: number, payout: number, odds: number): void;
  getModelPerformance(modelName: string): ModelPerformanceMetrics | undefined;
  getPerformanceHistory(
    modelName: string,
    timeframe?: 'day' | 'week' | 'month' | 'all'
  ): PerformanceSnapshot[0];
  getTopPerformingModels(
    metric?: keyof ModelPerformanceMetrics,
    limit?: number
  ): Array<{
    modelName: string,`n  metrics: ModelPerformanceMetrics}>;
  private getOrCreateMetrics;
  private updateAverage;
  private calculateProfitFactor;
  private calculateSharpeRatio;
  private calculateMaxDrawdown;
  private calculateKellyCriterion;
  private calculateExpectedValue;
  private updateCalibrationData;
  private calculateCalibrationScore;
  private updateHistory;
  private getCutoffDate;
  private trackMetrics;}
export Record<string, any>;


`
