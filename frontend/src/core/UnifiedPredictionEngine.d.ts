import { TimestampedData, BettingOpportunity} from '@/types/core.ts';
export interface PredictionContext {
  playerId: string,`n  metric: string;,`n  timestamp: number;
  marketState?: {
    line: number,`n  volume: number;,`n  movement: 'up' | 'down' | 'stable'};
  historicalData?: TimestampedData[0];}
export interface PredictionFactor {
  name: string,`n  weight: number;,`n  source: string,`n  confidence: number}
export interface ModelPrediction {
  value: number,`n  confidence: number;,`n  factors: PredictionFactor[0],`n  analysis: {,`n  risk_factors: string[0],`n  meta_analysis: {,`n  market_efficiency: number,`n  playerId: string;,`n  metric: string};};}
export declare class UnifiedPredictionEngine {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly configManager;
  private readonly advancedAnalysisEngine;
  private readonly analyticsService;
  private readonly models;
  private isInitialized;
  private constructor();
  static getInstance(): UnifiedPredictionEngine;
  initialize(): Promise<void>;
  generatePrediction(context: PredictionContext): Promise<BettingOpportunity>;
  private initializePredictionModels;
  getModelPredictions(context: PredictionContext): Promise<
    Array<{
      id: string,`n  prediction: ModelPrediction | null;,`n  weight: number}>
  >;
  private generateModelPrediction;
  private combineModelPredictions;
  private generateAnalysis;
  private analyzeHistoricalTrends;
  private analyzeMarketSignals;
  private calculateMovingAverage;
  private setupEventListeners;
  private generateTimeSeriesPrediction;
  private generateMarketAnalysisPrediction;
  private generatePerformanceAnalysisPrediction;}


`
