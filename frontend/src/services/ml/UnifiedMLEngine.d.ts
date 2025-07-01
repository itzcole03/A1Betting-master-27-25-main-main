import { EventEmitter} from 'eventemitter3.ts';
export interface MLModelConfig {
  name: string,`n  type: 'xgboost' | 'lightgbm' | 'randomforest' | 'neural_network' | 'ensemble';,`n  version: string,`n  weight: number;,`n  features: string[0],`n  hyperparameters: Record<string, any>;
  performance: {,`n  accuracy: number;,`n  precision: number,`n  recall: number;,`n  f1Score: number,`n  roc_auc: number;,`n  logLoss: number};
  lastTrained: number,`n  isActive: boolean}
export interface FeatureVector {
  [featureName: string]: number}
export interface PredictionInput {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  features: FeatureVector,`n  market: string;,`n  timestamp: number}
export interface ModelPrediction {
  modelName: string,`n  prediction: number;,`n  confidence: number,`n  features: FeatureVector;,`n  shapValues: Record<string, number>;
  processingTime: number,`n  modelVersion: string}
export interface EnsemblePrediction {
  finalPrediction: number,`n  confidence: number;,`n  models: ModelPrediction[0],`n  consensusScore: number;,`n  valueEdge: number,`n  kellyFraction: number;,`n  recommendedStake: number,`n  riskLevel: 'low' | 'medium' | 'high';,`n  factors: Array<{,`n  name: string;,`n  impact: number,`n  weight: number;,`n  direction: 'positive' | 'negative'}>;
  metadata: {,`n  processingTime: number;,`n  dataFreshness: number,`n  signalQuality: number;,`n  modelAgreement: number};}
export interface FeatureImportance {
  name: string,`n  importance: number;,`n  category: 'player' | 'team' | 'game' | 'market' | 'environmental',`n  description: string}
export interface ModelPerformanceMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  rocAuc: number,`n  logLoss: number;,`n  calibrationError: number,`n  profitability: number;,`n  sharpeRatio: number,`n  winRate: number;,`n  averageOdds: number,`n  totalPredictions: number;,`n  lastUpdated: number}
export declare class UnifiedMLEngine extends EventEmitter {
  private static instance;
  private models;
  private cache;
  private performanceMetrics;
  private featureImportances;
  private isTraining;
  private constructor();
  static getInstance(): UnifiedMLEngine;
  private initializeModels;
  generatePrediction(input: PredictionInput): Promise<EnsemblePrediction>;
  private generateModelPrediction;
  private simulateModelPrediction;
  private calculateModelConfidence;
  private combineModelPredictions;
  private calculateConsensusScore;
  private calculateValueEdge;
  private calculateKellyFraction;
  private determineRiskLevel;
  private calculateRecommendedStake;
  private extractKeyFactors;
  private calculateDataFreshness;
  private calculateSignalQuality;
  private calculateModelAgreement;
  private aggregateShapValues;
  private validateInput;
  getActiveModels(): MLModelConfig[0];
  getModelPerformance(modelName: string): ModelPerformanceMetrics | undefined;
  updateModelPerformance(modelName: string, metrics: Partial<ModelPerformanceMetrics>): void;
  retrain(modelName?: string): Promise<void>;
  getCachedPrediction(eventId: string, market: string): EnsemblePrediction | undefined;
  clearCache(): void;}
export declare const mlEngine: UnifiedMLEngine;
export type {
  MLModelConfig,
  FeatureVector,
  PredictionInput,
  ModelPrediction,
  EnsemblePrediction,
  FeatureImportance,
//   ModelPerformanceMetrics
};


`
