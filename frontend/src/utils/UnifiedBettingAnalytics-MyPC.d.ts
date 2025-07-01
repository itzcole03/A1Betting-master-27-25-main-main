import EventEmitter from 'eventemitter3.ts';
export interface BettingStrategy {
  id: string,`n  name: string;,`n  riskLevel: 'low' | 'medium' | 'high',`n  stakePercentage: number;,`n  minOdds: number,`n  maxOdds: number}
export interface PredictionModel {
  id: string,`n  name: string;,`n  accuracy: number,`n  lastUpdated: Date;,`n  parameters: Record<string, unknown>}
export interface BettingAnalysis {
  predictionConfidence: number,`n  recommendedStake: number;,`n  expectedValue: number,`n  riskAssessment: {,`n  level: 'low' | 'medium' | 'high',`n  factors: string[0]};
  hedgingOpportunities: Array<{,`n  market: string;,`n  odds: number,`n  recommendedStake: number}>;}
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
  removePredictionModel(modelId: string): void}


`
