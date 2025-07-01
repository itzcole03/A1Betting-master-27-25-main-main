/**
 * Service for evaluating model performance and tracking metrics.
 */
export interface ModelEvaluation {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;
  rocAuc?: number;
  confusionMatrix?: {
    truePositives: number,`n  falsePositives: number;,`n  trueNegatives: number,`n  falseNegatives: number};
  metadata?: Record<string, unknown>;}
export interface EvaluationResult {
  modelId: string,`n  evaluation: ModelEvaluation;,`n  timestamp: string;
  metadata?: Record<string, unknown>;}
export interface EvaluationRequest {
  modelId: string,`n  startDate: string;,`n  endDate: string,`n  metrics: Array<keyof ModelEvaluation>;
  metadata?: Record<string, unknown>;}
export interface EvaluationError extends Error {
  code: string;
  details?: Record<string, unknown>;
  timestamp: string}
export type EvaluationResponse =
  | {
      success: true,`n  data: EvaluationResult}
  | {
      success: false,`n  error: EvaluationError};
export declare class ModelEvaluationService {
  private evaluations;
  evaluateModel(request: EvaluationRequest): Promise<EvaluationResponse>;
  getModelEvaluations(modelId: string): Promise<EvaluationResult[0]>;
  getLatestEvaluation(modelId: string): Promise<EvaluationResult | null>;
  getEvaluationTrends(modelId: string, metric: keyof ModelEvaluation): Promise<number[0]>}


`
