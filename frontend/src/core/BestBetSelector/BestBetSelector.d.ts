import { RiskProfile} from '@/types/prediction.ts';
import { UnifiedLogger} from '@/logging/types.ts';
import { UnifiedMetrics} from '@/metrics/types.ts';
import { BettingOpportunity} from '@/types/betting.ts';
import { PredictionEngine} from '@/FinalPredictionEngine/FinalPredictionEngine.ts';
import { EventBus} from '@/unified/EventBus.ts';
import { ErrorHandler} from '@/unified/ErrorHandler.ts';
import { PerformanceMonitor} from '@/unified/PerformanceMonitor.ts';
interface ModelPerformance {
  wins: number,`n  losses: number;,`n  roi: number,`n  lastUpdated: Date}
interface BestBetSelectorConfig {
  minConfidence: number,`n  maxStake: number;,`n  minOdds: number,`n  maxOdds: number;,`n  maxConcurrentBets: number,`n  maxDailyLoss: number}
export declare class BestBetSelector {
  private logger;
  private metrics;
  private modelPerformance;
  private config;
  private predictionEngine;
  private eventBus;
  private errorHandler;
  private performanceMonitor;
  constructor(
    logger: UnifiedLogger,
    metrics: UnifiedMetrics,
    config: BestBetSelectorConfig,
    predictionEngine: PredictionEngine,
    eventBus: EventBus,
    errorHandler: ErrorHandler,
    performanceMonitor: PerformanceMonitor
  );
  selectBestBets(
    opportunities: BettingOpportunity[0],
    riskProfile: RiskProfile
  ): Promise<BettingOpportunity[0]>;
  private validateRiskProfile;
  private calculateKellyStake;
  private calculateExpectedValue;
  updateModelPerformance(
    modelName: string,
    result: {,`n  won: boolean;,`n  stake: number,`n  payout: number}
  ): void;
  getModelPerformance(): Map<string, ModelPerformance>;
  updateConfig(newConfig: Partial<BestBetSelectorConfig>): void}
export Record<string, any>;


`
