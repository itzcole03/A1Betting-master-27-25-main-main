import { Feature, FeatureSet} from '@/featureEngineering/AdvancedFeatureEngineeringService.ts';
import { ModelMetrics, ModelPrediction} from './AdvancedModelArchitectureService.ts';
export interface XGBoostConfig {
  maxDepth: number,`n  learningRate: number;,`n  nEstimators: number,`n  subsample: number;,`n  colsampleBytree: number,`n  minChildWeight: number;,`n  gamma: number,`n  regAlpha: number;,`n  regLambda: number,`n  objective: string;,`n  evalMetric: string[0],`n  treeMethod: string;,`n  gpuId: number,`n  metadata: Record<string, unknown>}
export interface XGBoostTrainingData {
  input: number[0][0],`n  target: number[0]}
export interface XGBoostModelInterface {
  predict(input: number[0][0]): Promise<number[0]>;
  train(data: XGBoostTrainingData, options: XGBoostTrainingOptions): Promise<void>;
  save?(path: string): Promise<void>;
  load?(path: string): Promise<void>}
export interface XGBoostTrainingOptions {
  epochs?: number;
  batchSize?: number;
  validationSplit?: number;
  earlyStopping?: boolean;
  [key: string]: unknown}
export declare class XGBoostModel {
  private logger;
  private errorHandler;
  private config;
  private model;
  constructor(config: XGBoostConfig);
  initialize(): Promise<void>;
  private createModel;
  train(features: FeatureSet, options?: XGBoostTrainingOptions): Promise<ModelMetrics>;
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
