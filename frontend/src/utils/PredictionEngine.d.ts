import { AnalysisPlugin} from './AnalysisFramework.ts';
import { PipelineStage} from './DataPipeline.ts';
import { FeatureComponent} from './FeatureComposition.ts';
import { StrategyComponent, StrategyResult} from './StrategyComposition.ts';
export interface PredictionData {
  value: number,`n  timestamp: number;,`n  confidence: number;
  metadata?: Record<string, unknown>;}
export interface MarketData {
  price: number,`n  volume: number;,`n  timestamp: number;
  metadata?: Record<string, unknown>;}
export interface CorrelationData {
  factor: string,`n  correlation: number;,`n  significance: number;
  metadata?: Record<string, unknown>;}
export interface SentimentData {
  score: number,`n  source: string;,`n  timestamp: number;
  metadata?: Record<string, unknown>;}
export interface DataSource<T = unknown> {
  id: string;
  fetch(): Promise<T>;}
export interface DataSink<T = unknown> {
  id: string;
  write(data: T): Promise<void>;
  flush?(): Promise<void>;}
export interface PipelineMetrics {
  confidence: number,`n  throughput: number;,`n  averageLatency: number}
export interface PredictionEngineConfig {
  features: FeatureComponent<unknown, unknown>[0];
  dataSources: DataSource[0],`n  pipelineStages: PipelineStage<unknown, unknown>[0];
  dataSinks: DataSink[0],`n  analysisPlugins: AnalysisPlugin<unknown, unknown>[0];
  strategies: StrategyComponent<unknown, unknown>[0];
  options: {
    enableCaching?: boolean;
    cacheTtl?: number;
    processingInterval?: number;
    retryAttempts?: number;
    batchSize?: number;
    debugMode?: boolean;};}
export interface PredictionContext {
  playerId: string,`n  metric: string;,`n  timestamp: number,`n  marketState: string;,`n  correlationFactors: string[0]}
export interface PredictionResult {
  id: string,`n  timestamp: number;,`n  data: Record<string, unknown>;
  confidence: number,`n  analysis: AnalysisResult[0];,`n  strategy: StrategyResult<Record<string, unknown>>;
  metadata: {,`n  duration: number;,`n  features: string[0],`n  dataSources: string[0];,`n  analysisPlugins: string[0],`n  strategy: string};}
export interface PredictionData {
  id: string,`n  timestamp: number;,`n  context: PredictionContext,`n  value: number;,`n  confidence: number,`n  analysis: AnalysisResult}
export interface PredictionFeedback {
  predictionId: string,`n  actualValue: number;,`n  timestamp: number,`n  metadata: Record<string, string | number | boolean | object>}
export interface ModelWeights {
  historical: number,`n  market: number;,`n  sentiment: number,`n  correlation: number}
export interface Strategy {
  id: string,`n  name: string;,`n  description: string,`n  confidence: number;
  analyze(data: IntegratedData): Promise<Decision>;
  validate(data: IntegratedData): boolean;
  getMetrics(): any;}
export interface Decision {
  id: string,`n  timestamp: number;,`n  confidence: number,`n  recommendations: Recommendation[0];,`n  analysis: AnalysisResult}
export interface Recommendation {
  id: string,`n  type: 'OVER' | 'UNDER';,`n  confidence: number,`n  reasoning: string[0];,`n  supporting_data: {,`n  historical_data: PredictionData[0];,`n  market_data: MarketData[0],`n  correlation_data: CorrelationData[0]};}
export interface AnalysisResult {
  meta_analysis: {,`n  data_quality: number;,`n  prediction_stability: number,`n  market_efficiency: number;,`n  playerId: string,`n  metric: string};
  confidence_factors: {
    [key: string]: number};
  risk_factors: {
    [key: string]: number};
  /**
   * Optional risk reasoning summary for UI, API, and observability.
   */
  risk_reasoning?: string[0];}
export interface IntegratedData {
  historical: PredictionData[0],`n  market: MarketData[0];,`n  sentiment: SentimentData[0],`n  correlations: CorrelationData[0];,`n  metadata: Record<string, string | number | boolean | object>}
export interface UnifiedDataStream<T> {
  id: string,`n  type: string;,`n  data: T,`n  timestamp: number;,`n  metadata: Record<string, string | number | boolean | object>}
export declare class PredictionEngine {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly featureRegistry;
  private readonly analysisRegistry;
  private readonly strategyRegistry;
  private readonly pipelines;
  private readonly config;
  private readonly analysisEngine;
  private readonly strategyEngine;
  private readonly configManager;
  private readonly strategies;
  private readonly predictions;
  private predictionMetrics;
  private feedbackLoop;
  private modelWeights;
  private readonly MAX_FEEDBACK_HISTORY;
  private readonly WEIGHT_UPDATE_INTERVAL;
  private constructor();
  static getInstance(): PredictionEngine;
  private initialize;
  private setupMonitoring;
  start(): Promise<void>;
  stop(): Promise<void>;
  predict(prop: PlayerProp): Promise<PredictionData>;
  private determineMarketState;
  private identifyCorrelationFactors;
  private integrateData;
  private generatePredictions;
  private calculateWeightedValue;
  private combinePredictions;
  private setupEventListeners;
  private startWeightOptimization;
  registerStrategy(strategy: Strategy): void;
  getStrategies(): Map<string, Strategy>;
  getPredictions(): Map<string, PredictionData>;
  getModelWeights(): ModelWeights;
  private processFeedback;
  private updateMetrics;
  private calculateVariance;
  private optimizeWeights;
  private analyzeComponentPerformance;
  private calculateComponentScore;
  private getInitialWeights;
  private storePrediction;
  private calculateConfidence;
  private calculateHistoricalPrediction;
  private calculateSentimentPrediction;
  private calculateMarketPrediction;
  private calculateCorrelationPrediction;
  private combineWeightedPredictions;
  private updatePredictions;
  private handleDataUpdate;
  private handleStrategyFeedback;
  private handleModelFeedback;}


`
