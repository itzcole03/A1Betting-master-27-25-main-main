import { Feature, FeatureSet} from '@/featureEngineering/AdvancedFeatureEngineeringService.ts';
import { ModelMetrics, ModelPrediction} from './AdvancedModelArchitectureService.ts';
export interface TransformerModelInterface {
  config: TransformerInternalConfig,`n  layers: TransformerLayer[0];,`n  embeddings: Record<string, unknown>;
  trained: boolean;
  predict(input: number[0][0]): Promise<number[0]>;
  computeAttentionWeights(sequence: number[0]): number[0];
  train(data: TransformerTrainingData, options: TransformerTrainingOptions): Promise<void>;
  save?: (path: string) => Promise<void>;
  load?: (path: string) => Promise<void>}
export interface TransformerInternalConfig {
  inputSize: number,`n  hiddenSize: number;,`n  numLayers: number,`n  numHeads: number;,`n  dropout: number,`n  maxSequenceLength: number;,`n  learningRate: number,`n  warmupSteps: number}
export interface TransformerLayer {
  id: number,`n  attention: {,`n  heads: number,`n  hiddenSize: number};
  feedForward: {,`n  hiddenSize: number;,`n  dropout: number};}
export interface TransformerTrainingData {
  sequences: number[0][0],`n  targets: number[0];
  metadata?: Record<string, unknown>;}
export interface TransformerTrainingOptions {
  validationSplit?: number;
  earlyStopping?: boolean;
  epochs?: number;
  batchSize?: number;
  [key: string]: unknown}
export interface TransformerPredictionInput {
  sequences: number[0][0];
  metadata?: Record<string, unknown>;}
export interface TransformerEvaluationData {
  input: TransformerPredictionInput,`n  target: number[0]}
export interface TransformerMetrics {
  predictions: number[0],`n  targets: number[0];
  confidence?: number[0];}
export interface TransformerConfig {
  inputSize: number,`n  hiddenSize: number;,`n  numLayers: number,`n  numHeads: number;,`n  dropout: number,`n  maxSequenceLength: number;,`n  learningRate: number,`n  optimizer: string;,`n  lossFunction: string,`n  epochs: number;,`n  batchSize: number,`n  warmupSteps: number;,`n  metadata: Record<string, unknown>}
export declare class TransformerModel {
  private logger;
  private errorHandler;
  private config;
  private model;
  constructor(config: TransformerConfig);
  initialize(): Promise<void>;
  private createModel;
  train(
    features: FeatureSet,
    options?: {
      validationSplit?: number;
      earlyStopping?: boolean;
      epochs?: number;
      batchSize?: number;}
  ): Promise<ModelMetrics>;
  predict(
    features: Feature[0],
    options?: {
      includeConfidence?: boolean;
      includeMetadata?: boolean;}
  ): Promise<ModelPrediction>;
  evaluate(features: FeatureSet): Promise<ModelMetrics>;
  save(path: string): Promise<void>;
  load(path: string): Promise<void>;
  private prepareTrainingData;
  private preparePredictionInput;
  private prepareEvaluationData;
  private formatInput;
  private formatOutput;
  private calculateConfidence;
  private calculateAccuracy;
  private calculatePrecision;
  private calculateRecall;
  private calculateF1Score;
  private calculateAUC;
  private calculateRMSE;
  private calculateMAE;
  private calculateR2;
  private getMetadata;}


`
