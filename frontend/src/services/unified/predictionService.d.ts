import { BettingOpportunity} from '@/types/betting.ts';
import type { ModelPrediction} from '@/types/prediction.ts';
export interface WeatherCondition {
  temperature: number,`n  windSpeed: number;,`n  precipitation: number,`n  humidity: number;,`n  windDirection: number}
export interface InjuryReport {
  playerId: string,`n  playerName: string;,`n  position: string,`n  status: 'OUT' | 'DOUBTFUL' | 'QUESTIONABLE' | 'PROBABLE';,`n  details: string,`n  impactScore: number}
export interface SentimentData {
  source: 'TWITTER' | 'NEWS' | 'REDDIT',`n  sentiment: number;,`n  volume: number,`n  keywords: string[0];,`n  timestamp: number}
export interface PredictionResult {
  predictedValue: number,`n  confidence: number;,`n  factors: PredictionFactor[0],`n  metadata: Record<string, unknown>;
  kellyValue: number,`n  marketEdge: number;,`n  shapValues: Record<string, number>}
export interface PredictionFactor {
  name: string,`n  impact: number;,`n  confidence: number,`n  description: string;,`n  metadata: Record<string, unknown>}
export interface WeatherData {
  temperature: number,`n  windSpeed: number;,`n  precipitation: number,`n  humidity: number;,`n  conditions: string}
export interface HistoricalPattern {
  pattern: string,`n  similarity: number;,`n  outcome: string,`n  confidence: number;,`n  metadata: {,`n  matchCount: number;,`n  winRate: number,`n  averageOddsMovement: number};}
interface PredictionConfig {
  minConfidence: number,`n  maxStakePercentage: number;,`n  riskProfile: 'conservative' | 'moderate' | 'aggressive',`n  autoRefresh: boolean;,`n  refreshInterval: number}
interface ModelOutput {
  type: string,`n  prediction: number;,`n  confidence: number,`n  shapValues: Record<string, number>}
interface Prediction {
  id: string,`n  timestamp: string;,`n  prediction: number,`n  confidence: number;,`n  shapValues: Record<string, number>;
  kellyValue: number,`n  marketEdge: number}
declare class UnifiedPredictionService {
  private static instance;
  private weatherCache;
  private injuryCache;
  private sentimentCache;
  private modelWeights;
  private config;
  private readonly apiUrl;
  private readonly wsUrl;
  protected constructor();
  static getInstance(): UnifiedPredictionService;
  analyzePredictionFactors(opportunity: BettingOpportunity): Promise<PredictionFactor[0]>;
  private analyzeInjuryImpact;
  private calculateInjuryConfidence;
  private analyzeWeatherImpact;
  private calculateWeatherImpact;
  private analyzeSentiment;
  private aggregateKeywords;
  private findHistoricalPatterns;
  private findSimilarHistoricalScenarios;
  private calculatePatternImpact;
  private normalizePredictionFactors;
  getPredictions(eventId: string): Promise<ModelPrediction[0]>;
  private processPredictions;
  private calculateConfidence;
  private calculateTimeDecay;
  private calculatePerformanceFactor;
  updateModelWeights(performance: { [key: string]: number}): Promise<void>;
  setConfig(newConfig: Partial<PredictionConfig>): void;
  getConfig(): PredictionConfig;
  getRecentPredictions(): Promise<Prediction[0]>;
  generatePrediction(modelOutputs: ModelOutput[0]): Promise<Prediction | null>;
  getEngineMetrics(): Promise<Record<string, unknown>>;
  getModelPerformance(modelType: string): Promise<Record<string, unknown>>;
  getFeatureImportance(modelType: string): Promise<Record<string, number>>;
  getShapValues(eventId: string): Promise<Record<string, number>>;
  updateWeatherData(market: string, data: WeatherData): void;
  updateInjuryData(market: string, data: InjuryReport[0]): void;
  updateSentimentData(market: string, data: SentimentData): void;
  clearCaches(): void;}
export default UnifiedPredictionService;


`
