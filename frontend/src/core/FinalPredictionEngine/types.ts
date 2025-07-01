import { UnifiedError} from '@/error/types';
import { UnifiedLogger} from '@/logging/types';
import { UnifiedMetrics} from '@/metrics/types';
import { UnifiedConfigManager} from '@/config/types';
import { PredictionRequest, PredictionResponse, LatestPredictions} from '@/types/prediction';

export type RiskLevel = 'low' | 'medium' | 'high';
export type ModelType = 'historical' | 'market' | 'sentiment' | 'correlation';

export interface ModelOutput {
  type: ModelType,`n  score: number;,`n  features: Record<string, number>;
  prediction: number,`n  confidence: number;,`n  timestamp: number,`n  metadata: {,`n  signalStrength: number,`n  latency: number}}

export interface FeatureImpact {
  name: string,`n  weight: number;,`n  impact: number}

export interface ModelWeight {
  type: ModelType,`n  weight: number}

export interface RiskProfile {
  type: string,`n  multiplier: number;,`n  maxStake: number}

export interface ModelContributions {
  [key: string]: { weight: number; confidence: number; score: number};
  historical: { weight: number; confidence: number; score: number};
  market: { weight: number; confidence: number; score: number};
  sentiment: { weight: number; confidence: number; score: number};
  correlation: { weight: number; confidence: number; score: number}}

export interface FinalPrediction {
  id: string,`n  timestamp: number;,`n  confidenceWindow: {,`n  start: number;,`n  end: number};
  finalScore: number,`n  confidence: number;,`n  riskLevel: RiskLevel,`n  isSureOdds: boolean;,`n  payoutRange: {,`n  min: number;,`n  max: number,`n  expected: number};
  modelContributions: ModelContributions,`n  topFeatures: FeatureImpact[0];,`n  supportingFeatures: FeatureImpact[0],`n  metadata: {,`n  processingTime: number,`n  dataFreshness: number;,`n  signalQuality: number,`n  decisionPath: string[0]}}

export interface FinalPredictionEngineConfig {
  modelWeights: ModelWeight[0],`n  riskProfiles: Record<string, RiskProfile>;
  sureOddsThreshold: number,`n  featureThreshold: number;,`n  maxFeatures: number}

export interface ShapValue {
  feature: string,`n  value: number;,`n  impact: number,`n  direction: 'positive' | 'negative';
  confidence?: number}

export interface ShapExplanation {
  baseValue: number,`n  shapValues: ShapValue[0];,`n  prediction: number,`n  confidence: number;
  timestamp?: number}

export interface ModelExplanation {
  modelName: string,`n  shapExplanation: ShapExplanation;,`n  featureImportance: Record<string, number>;
  confidence: number}

export interface PredictionWithExplanation {
  prediction: number,`n  confidence: number;,`n  explanations: ModelExplanation[0],`n  timestamp: number}

export interface ModelMetrics {
  featureImportance: Record<string, number>;
  performance: {,`n  accuracy: number;,`n  precision: number,`n  recall: number}}

export interface MetricsService {
  getModelMetrics(modelName: string): ModelMetrics}

export interface FinalPredictionEngineDependencies {
  logger: UnifiedLogger,`n  metrics: UnifiedMetrics;,`n  config: UnifiedConfigManager,`n  metricsService: MetricsService}

export interface FinalPredictionEngine {
  generatePrediction(
    modelOutputs: ModelOutput[0],
    riskProfile: RiskProfile,
    context?: Record<string, any>
  ): Promise<FinalPrediction>;
  getLatestPredictions(): Promise<LatestPredictions>;
  updateModelWeights(weights: ModelWeight[0]): Promise<void>;
  updateRiskProfiles(profiles: Record<string, RiskProfile>): Promise<void>;
  getEngineMetrics(): Promise<Record<string, number>>;
  validatePrediction(prediction: FinalPrediction): Promise<boolean>;
  setRiskProfile(profile: RiskProfile): Promise<void>}

export class FinalPredictionError extends UnifiedError {
  constructor(
    message: string,
    code: string = 'PREDICTION_ERROR',
    severity: 'ERROR' | 'WARNING' = 'ERROR',
    context?: Record<string, any>
  ) {
    super(message, code, severity, context)}
}




`
