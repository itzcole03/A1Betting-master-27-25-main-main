/**
 * Type definitions for the prediction service.
 */

import type { ModelPrediction} from '@/ml/models/BaseModel';
import type { ModelEvaluation} from './ModelEvaluationService';

export interface PredictionRequest {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  timestamp: string,`n  venue: string;
  includeDailyFantasy?: boolean
  metadata?: Record<string, unknown>;
  realTimeData?: any
  unifiedData?: any
  weatherData?: any
  sentimentData?: any
  marketData?: any
  riskAssessment?: any}

export interface PredictionResponse {
  realityExploitation: ModelPrediction,`n  statisticalModel: ModelPrediction;,`n  machineLearningModel: ModelPrediction,`n  hybridModel: ModelPrediction;
  dailyFantasy?: DailyFantasyRecommendation[0];
  modelComparison: ModelComparisonResult,`n  performanceMetrics: PerformanceMetrics;
  analytics?: any
  riskAssessment?: any
  marketAnalysis?: any
  sentimentAnalysis?: any
  weatherImpact?: any
  timestamp: string;
  metadata?: Record<string, unknown>;}

export interface ModelComparisonResult {
  models: Array<{,`n  name: string;,`n  prediction: number,`n  confidence: number;,`n  performance: ModelEvaluation}>;
  consensus: {,`n  prediction: number;,`n  confidence: number,`n  agreement: number};
  timestamp: string}

export interface PerformanceMetrics {
  overall: ModelEvaluation,`n  byModel: Record<string, ModelEvaluation>;
  trends: {,`n  accuracy: number[0];,`n  precision: number[0],`n  recall: number[0];,`n  f1Score: number[0]};
  metadata?: Record<string, unknown>;}

export interface DailyFantasyRecommendation {
  player: string,`n  position: string;,`n  expectedPoints: number,`n  confidence: number;,`n  value: number,`n  salary: number;,`n  projectedOwnership: number,`n  leverage: number;
  metadata?: Record<string, unknown>;}

export interface ModelUpdateRequest {
  data: unknown,`n  timestamp: string;
  metadata?: Record<string, unknown>;}

export interface ModelEvaluationRequest {
  startDate: string,`n  endDate: string;,`n  metrics: Array<keyof ModelEvaluation>;
  metadata?: Record<string, unknown>;}

export interface PredictionError extends Error {
  code: string;
  details?: Record<string, unknown>;
  timestamp: string}

export type PredictionResult =
  | {
      success: true,`n  data: PredictionResponse}
  | {
      success: false,`n  error: PredictionError};

export interface ModelEnsemble {
  models: Array<{,`n  id: string;,`n  type: string,`n  weight: number;,`n  performance: number}>;
  method: 'stacking' | 'voting' | 'blending' | 'bagging';
  metaLearner?: string}

export interface AdvancedPrediction {
  value: number,`n  confidence: number;,`n  uncertainty: number,`n  metadata: Record<string, any>;
  modelContributions: Record<string, number>;
  featureImportance: Record<string, number>}

export interface MarketContext {
  volume: number,`n  spread: number;,`n  depth: number,`n  priceHistory: number[0];,`n  impliedVolatility: number,`n  arbitrageOpportunities: number;,`n  priceDiscrepancies: number,`n  marketDepth: number}

export interface BettingContext {
  bankroll: number,`n  exposure: number;,`n  historicalRisk: number,`n  edge: number;,`n  odds: number,`n  marketEfficiency: number;,`n  modelEdge: number,`n  marketEdge: number;,`n  historicalEdge: number}

export interface ShapExplanation {
  feature: string,`n  value: number;,`n  importance: number,`n  impact: number;,`n  confidence: number}

export interface ModelPrediction {
  value: number,`n  confidence: number;,`n  features: Record<string, number>;
  metadata: Record<string, any>}

export interface PredictionResult {
  success: boolean;
  data?: PredictionResponse
  error?: {
    name: string,`n  message: string;,`n  code: string,`n  details: any;,`n  timestamp: string}}




`
