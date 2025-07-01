import EventEmitter from 'eventemitter3.ts';
type ModelParameters = Record<string, unknown>;
export interface BettingStrategy {
  id: string,`n  name: string;,`n  riskLevel: 'low' | 'medium' | 'high',`n  stakePercentage: number;,`n  minOdds: number,`n  maxOdds: number}
export interface PredictionModel {
  id: string,`n  name: string;,`n  accuracy: number,`n  lastUpdated: Date;,`n  parameters: ModelParameters}
export interface BettingAnalysis {
  predictionConfidence: number,`n  recommendedStake: number;,`n  expectedValue: number,`n  riskAssessment: {,`n  level: 'low' | 'medium' | 'high',`n  factors: string[0]};
  hedgingOpportunities: Array<{,`n  market: string;,`n  odds: number,`n  recommendedStake: number}>;}
export declare class UnifiedBettingAnalytics extends EventEmitter {
  private static instance;
  private activeStrategies;
  private constructor();
  static getInstance(): UnifiedBettingAnalytics;
  private initializeEventListeners;
  private calculateKellyCriterion;
  analyzeBettingOpportunity(stake: number): Promise<BettingAnalysis>;
  private generatePrediction;
  /**
   * Analyze current strategies, odds, and prediction confidence to identify risk factors.
   * Returns an array of human-readable risk factor strings for UI display.
   *
   * This implementation checks for high odds, low prediction confidence, and missing strategies.
   * Extend as needed for more advanced analytics.
   */
  private assessRiskFactors;
  private calculateRiskLevel;
  private findHedgingOpportunities;
  addStrategy(strategy: BettingStrategy): void;
  removeStrategy(strategyId: string): void}
export Record<string, any>;


`
