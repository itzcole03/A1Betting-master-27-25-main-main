/**
 * Service for comparing model predictions and performance.
 */
import type { ModelEvaluation} from './ModelEvaluationService.ts';
import type { ModelComparisonResult} from '@/types.ts';
export interface ModelPredictionInput {
  name: string,`n  prediction: number;,`n  confidence: number;
  performance?: ModelEvaluation;}
export interface ComparisonRequest {
  predictions: ModelPredictionInput[0],`n  timestamp: string;
  metadata?: Record<string, unknown>;}
export interface ComparisonError extends Error {
  code: string;
  details?: Record<string, unknown>;
  timestamp: string}
export type ComparisonResponse =
  | {
      success: true,`n  data: ModelComparisonResult}
  | {
      success: false,`n  error: ComparisonError};
export declare class ModelComparisonService {
  private comparisons;
  compareModels(request: ComparisonRequest): Promise<ComparisonResponse>;
  private calculateModelAgreement;
  private calculateConsensusConfidence;
  getComparisonHistory(timestamp: string): Promise<ModelComparisonResult[0]>;
  getLatestComparison(): Promise<ModelComparisonResult | null>;}


`
