import { Feature, FeatureSet} from '@/featureEngineering/AdvancedFeatureEngineeringService.ts';
import { ModelMetrics, ModelPrediction} from './AdvancedModelArchitectureService.ts';
export interface LSTMConfig {
  inputSize: number,`n  hiddenSize: number;,`n  numLayers: number,`n  dropout: number;,`n  bidirectional: boolean,`n  batchFirst: boolean;,`n  learningRate: number,`n  optimizer: string;,`n  lossFunction: string,`n  epochs: number;,`n  batchSize: number,`n  sequenceLength: number;,`n  metadata: Record<string, unknown>}
export interface TrainingData {
  input: number[0][0],`n  target: number[0]}
export interface ModelState {
  config: Record<string, unknown>;
  weights: number[0] | null,`n  compiled: boolean}
export interface LSTMModelInterface {
  predict(input: number[0][0]): Promise<number[0]>;
  train(data: TrainingData, options: TrainingOptions): Promise<void>;
  save?(path: string): Promise<void>;
  load?(path: string): Promise<void>}
export interface TrainingOptions {
  epochs?: number;
  batchSize?: number;
  validationSplit?: number;
  earlyStopping?: boolean;}
export declare class LSTMModel {
  private logger;
  private errorHandler;
  private config;
  private model;
  constructor(config: LSTMConfig);
  initialize(): Promise<void>;
  private createModel;
  train(features: FeatureSet, options?: TrainingOptions): Promise<ModelMetrics>;
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
