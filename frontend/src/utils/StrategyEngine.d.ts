import { StrategyRecommendation, RiskTolerance} from '@/types/core.ts';
interface StrategyPerformance {
  totalExecutions: number,`n  successRate: number;,`n  averageReturn: number,`n  riskProfile: {,`n  level: RiskTolerance,`n  factors: string[0]};
  lastUpdated: number}
interface CompositeStrategy {
  id: string,`n  name: string;,`n  strategies: string[0],`n  weights: number[0];,`n  performance: StrategyPerformance,`n  conditions: {,`n  minConfidence: number,`n  maxRisk: RiskTolerance;,`n  marketStates: string[0]};}
export declare class StrategyEngine {
  /**
   * [ROADMAP] Feature flag manager for gating experimental/ensemble logic.
   * Use for toggling advanced strategies, data sources, or ML models.
   */
  private readonly featureManager;
  /**
   * [ROADMAP] Prediction engine for ensembling and orchestrating prediction modules.
   * Use for ultimate prediction output surfaced to UI/UX.
   */
  private readonly predictionEngine;
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly analysisEngine;
  private readonly dataHub;
  private readonly config;
  private readonly state;
  private readonly strategyPerformance;
  private readonly PERFORMANCE_UPDATE_INTERVAL;
  private compositeStrategies;
  private constructor();
  static getInstance(): StrategyEngine;
  private getDefaultConfig;
  private getDefaultState;
  private setupPerformanceTracking;
  createCompositeStrategy(
    name: string,
    strategies: string[0],
    weights: number[0],
    conditions: CompositeStrategy['conditions']
  ): string;
  analyzeOpportunity(playerId: string, metric: string): Promise<StrategyRecommendation | null>;
  private meetsQualityThresholds;
  private generateRecommendation;
  private analyzeMarketData;
  private findRelevantMarkets;
  private isMarketRelevant;
  private calculateWeightedLine;
  private analyzeMarketMovement;
  private findEventIdForMarket;
  private calculateMarketValueGap;
  private analyzeSentiment;
  private calculateValueGap;
  private assessRisk;
  private calculateRiskLevel;
  private identifyRiskFactors;
  private calculateExpectedValue;
  private determineSentimentTrend;
  private getRiskLevel;
  private applyCompositeStrategies;
  private shouldApplyStrategy;
  private executeStrategy;
  private determineMarketState;
  private analyzeHistoricalTrends;
  private analyzeMarketSignals;
  private analyzeRiskFactors;
  private updateStrategyResult;
  private adjustStrategyWeights;
  private updateStrategyPerformance;
  private recalculatePerformanceMetrics;
  private validateRecommendation;
  private generateStrategy;
  private calculateExposure;
  private calculateStake;
  private determineExecutionTiming;
  private determineExecutionConditions;
  private determineExitCriteria;
  private findHedgingOpportunities;
  private calculateStopLoss;
  private calculateTakeProfit;
  private determinePosition;}
export Record<string, any>;


`
