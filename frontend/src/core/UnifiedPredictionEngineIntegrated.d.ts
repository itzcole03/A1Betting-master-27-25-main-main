/**
 * Unified Prediction Engine - Integrated Version;
 *
 * This is the consolidated prediction engine that integrates all existing models;
 * and connects properly to the backend services for Items 1 & 2 of the integration checklist.
 */
import { TimestampedData, BettingOpportunity, PredictionState} from '@/types/core.ts';
export interface PredictionRequest {
  features: Record<string, number>;
  playerId?: string;
  metric?: string;
  context?: Record<string, any>;}
export interface BackendPredictionResponse {
  final_value: number,`n  ensemble_confidence: number;,`n  payout: number,`n  model_breakdown: Array<{,`n  model_name: string,`n  value: number;,`n  confidence: number,`n  performance: Record<string, number>;
    shap_values: Record<string, number>}>;
  shap_values: Record<string, number>;
  explanation: string}
export interface PredictionContext {
  playerId: string,`n  metric: string;,`n  timestamp: number;
  marketState?: {
    line: number,`n  volume: number;,`n  movement: 'up' | 'down' | 'stable'};
  historicalData?: TimestampedData[0];
  features?: Record<string, number>;}
export interface ModelPrediction {
  value: number,`n  confidence: number;,`n  factors: PredictionFactor[0],`n  analysis: {,`n  risk_factors: string[0],`n  meta_analysis: {,`n  market_efficiency: number,`n  playerId: string;,`n  metric: string};};
  shap_values?: Record<string, number>;
  explanation?: string;}
export interface PredictionFactor {
  name: string,`n  weight: number;,`n  source: string,`n  confidence: number}
export declare class UnifiedPredictionEngineIntegrated {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly configManager;
  private readonly monitor;
  private readonly models;
  private readonly predictions;
  private isInitialized;
  private backendHealthy;
  private constructor();
  static getInstance(): UnifiedPredictionEngineIntegrated;
  initialize(): Promise<void>;
  private checkBackendHealth;
  private initializePredictionModels;
  private setupEventListeners;
  private handleMarketUpdate;
  generatePrediction(context: PredictionContext): Promise<BettingOpportunity>;
  private getBackendPrediction;
  private convertBackendResponse;
  private getLocalPrediction;
  private getModelPredictions;
  private generateModelPrediction;
  private generateTimeSeriesPrediction;
  private generateMarketAnalysisPrediction;
  private generatePerformanceAnalysisPrediction;
  private generateMLEnsemblePrediction;
  private generateRealityExploitationPrediction;
  private combineModelPredictions;
  private extractFeatures;
  private calculateTrend;
  private extractRiskFactors;
  private calculateMarketEfficiency;
  private convertToBettingOpportunity;
  private calculateExpectedValue;
  private calculateKellyFraction;
  isBackendHealthy(): boolean;
  getModelStatus(): Map<string, PredictionState>;}
export default UnifiedPredictionEngineIntegrated;


`
