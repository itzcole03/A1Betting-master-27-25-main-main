import { EventEmitter} from 'events.ts';
export interface BetRecommendation {
  id: string,`n  market: string;,`n  odds: number,`n  prediction: number;,`n  confidence: number,`n  recommendedStake: number;,`n  expectedValue: number,`n  riskLevel: 'low' | 'medium' | 'high';,`n  riskFactors: string[0],`n  hedgingOpportunities: Array<{,`n  market: string,`n  odds: number;,`n  recommendedStake: number}>;}
export interface BettingStrategy {
  id: string,`n  name: string;,`n  riskLevel: 'low' | 'medium' | 'high',`n  stakePercentage: number;,`n  minOdds: number,`n  maxOdds: number}
export interface PredictionModel {
  id: string,`n  name: string;,`n  accuracy: number,`n  lastUpdated: Date;,`n  parameters: Record<string, unknown>}
export interface BettingAnalysis {
  predictionConfidence: number,`n  recommendedStake: number;,`n  expectedValue: number,`n  riskAssessment: {,`n  level: 'low' | 'medium' | 'high',`n  factors: string[0]};
  hedgingOpportunities: Array<{,`n  market: string;,`n  odds: number,`n  recommendedStake: number}>;
  /**
   * Optional array of risk reasoning strings, propagated from strategy/model layer.
   */
  risk_reasoning?: string[0];}
export declare class UnifiedBettingAnalytics extends EventEmitter {
  private static instance;
  private dataService;
  private activeStrategies;
  private predictionModels;
  private constructor();
  static getInstance(): UnifiedBettingAnalytics;
  private initializeEventListeners;
  private calculateKellyCriterion;
  analyzeBettingOpportunity(market: string, odds: number, stake: number): Promise<BettingAnalysis>;
  /**
   * Generate a prediction for a given market and data by calling the backend ML/analytics API.
   * Emits 'error' event on failure.
   */
  private generatePrediction;
  private assessRiskFactors;
  private calculateRiskLevel;
  private findHedgingOpportunities;
  private calculateHedgeStake;
  private analyzeOddsMovement;
  private updatePredictions;
  addStrategy(strategy: BettingStrategy): void;
  removeStrategy(strategyId: string): void;
  addPredictionModel(model: PredictionModel): void;
  removePredictionModel(modelId: string): void;
  getBettingOpportunities(minConfidence?: number): Promise<BetRecommendation[0]>;
  getPerformanceMetrics(): Promise<{
    winRate: number,`n  roi: number;,`n  edgeRetention: number,`n  totalBets: number;,`n  averageOdds: number,`n  profitLoss: number}>;}


`
