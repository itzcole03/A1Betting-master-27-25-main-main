import { EventEmitter} from 'events.ts';
export interface PredictionConfig {
  investment: number,`n  modelSet: string[0];,`n  confidence: number,`n  strategy: 'maximum' | 'balanced' | 'conservative';,`n  portfolio: string,`n  sports: string[0];
  timeHorizon?: number;
  seasonality?: boolean;
  optimization?: {
    method: string,`n  constraints: Record<string, any>};}
export interface ModelPrediction {
  modelName: string,`n  prediction: string;,`n  confidence: number,`n  probability: number;,`n  features: Record<string, any>;
  performance: {,`n  accuracy: number};
  modelType: 'traditional' | 'deepLearning' | 'timeSeries' | 'optimization' | 'ensemble'}
export interface EnsemblePrediction {
  overallConfidence: number,`n  projectedPayout: number;,`n  opportunities: BettingOpportunity[0],`n  modelBreakdown: Record<string, any>;
  riskAssessment: RiskAssessment,`n  confidence: number}
export interface BettingOpportunity {
  sport: string,`n  event: string;,`n  prediction: string,`n  confidence: number;,`n  odds: number,`n  kellyFraction: number;,`n  riskLevel: 'low' | 'medium' | 'high'}
export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high',`n  confidenceScore: number;,`n  modelAgreement: number,`n  variance: number}
export interface ModelStatus {
  traditional: CollectionStatus,`n  deepLearning: CollectionStatus;,`n  timeSeries: CollectionStatus,`n  optimization: CollectionStatus;,`n  ensemble: CollectionStatus}
export interface CollectionStatus {
  active: number,`n  accuracy: number}
export interface PerformanceMetrics {
  accuracy: number,`n  profitFactor: number;,`n  winRate: number,`n  kellyOptimal: number}
export interface PropAnalysis {
  confidence: number,`n  expectedValue: number;,`n  kellyFraction: number;
  prediction?: string;
  probability?: number;}
export declare class EnsembleMLService extends EventEmitter {
  private models;
  constructor();
  generateEnsemblePrediction(config: PredictionConfig): Promise<EnsemblePrediction>;
  private calculateModelWeights;
  private combinePredictions;
  private determineMajorityPrediction;
  private combineFeatures;
  private calculateEnsembleAccuracy;
  private identifyBettingOpportunities;
  private calculateOdds;
  private calculateKellyFraction;
  private determineRiskLevel;
  private assessRisk;
  private calculateModelAgreement;
  private calculatePredictionVariance;
  private determineOverallRisk;
  private calculateProjectedPayout;
  private createModelBreakdown;
  getModelStatus(): Promise<Record<string, any>>;
  getPerformanceMetrics(): Promise<Record<string, any>>;
  analyzeProp(config: {,`n  player: string;,`n  statType: string,`n  line: number;,`n  opponent: string,`n  venue: string}): Promise<PropAnalysis>;
  private calculateExpectedValue;}


`
