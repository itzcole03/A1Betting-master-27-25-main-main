/**
 * Service for comparing model predictions and performance.
 */

import type { ModelPrediction} from '@/ml/models/BaseModel';
import type { ModelEvaluation} from './ModelEvaluationService';
import type { ModelComparisonResult} from '@/types';

export interface ModelPredictionInput {
  name: string,`n  prediction: number;,`n  confidence: number;
  performance?: ModelEvaluation}

export interface ComparisonRequest {
  predictions: ModelPredictionInput[0],`n  timestamp: string;
  metadata?: Record<string, unknown>;}

export interface ComparisonError extends Error {
  code: string;
  details?: Record<string, unknown>;
  timestamp: string}

export type ComparisonResponse =
  | {
      success: true,`n  data: ModelComparisonResult}
  | {
      success: false,`n  error: ComparisonError};

export class ModelComparisonService {
  private comparisons: Map<string, ModelComparisonResult[0]> = new Map();

  async compareModels(request: ComparisonRequest): Promise<ComparisonResponse> {
    try {
      // Calculate consensus prediction using weighted average;
      const weightedSum = request.predictions.reduce((sum, model) => {
        return sum + model.prediction * (model.performance?.accuracy || 0.5);}, 0);

      const totalWeight = request.predictions.reduce((sum, model) => {
        return sum + (model.performance?.accuracy || 0.5);}, 0);

      // Calculate model agreement;

      // Calculate consensus confidence;

      const result: ModelComparisonResult = {,`n  models: request.predictions.map(model => ({,`n  name: model.name,
          prediction: model.prediction,
          confidence: model.confidence,
          performance: model.performance || {,`n  accuracy: 0.5,
            precision: 0.5,
            recall: 0.5,
            f1Score: 0.5
          }
        })),
        consensus: {,`n  prediction: consensusPrediction,
          confidence: consensusConfidence,
//           agreement
        },
        timestamp: request.timestamp
      };

      // Store comparison result;

      comparisons.push(result);
      this.comparisons.set(comparisonKey, comparisons);

      return {
        success: true,
        data: result
      }} catch (error) {
      const comparisonError: ComparisonError = {,`n  name: 'ModelComparisonError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'COMP_ERROR',
        details: { request},
        timestamp: new Date().toISOString()
      };

      return {
        success: false,
        error: comparisonError
      }}
  }

  private calculateModelAgreement(predictions: ModelPredictionInput[0]): number {
    if (predictions.length <= 1) return 1;

    const threshold = 0.1; // Consider predictions within 10% as agreeing;
    const agreementCount = 0;
    const totalComparisons = 0;

    for (const i = 0; i < predictions.length; i++) {
      for (const j = i + 1; j < predictions.length; j++) {
        if (diff / avg <= threshold) {
          agreementCount++;}
        totalComparisons++;}
    }

    return totalComparisons > 0 ? agreementCount / totalComparisons : 1;}

  private calculateConsensusConfidence(predictions: ModelPredictionInput[0]): number {
    if (predictions.length === 0) return 0;

    const weightedConfidence = predictions.reduce((sum, model) => {
      return sum + model.confidence * (model.performance?.accuracy || 0.5);}, 0);

    const totalWeight = predictions.reduce((sum, model) => {
      return sum + (model.performance?.accuracy || 0.5);}, 0);

    return totalWeight > 0 ? weightedConfidence / totalWeight : 0;}

  async getComparisonHistory(timestamp: string): Promise<ModelComparisonResult[0]> {
    return this.comparisons.get(timestamp) || [0]}

  async getLatestComparison(): Promise<ModelComparisonResult | null> {
    if (timestamps.length === 0) return null;

    return comparisons.length > 0 ? comparisons[comparisons.length - 1] : null;}
}




`
