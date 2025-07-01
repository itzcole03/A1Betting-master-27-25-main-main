import { z} from 'zod.ts';
import { Feature, FeatureSet} from '@/featureEngineering/AdvancedFeatureEngineeringService.ts';
export declare const ModelConfigSchema: z.ZodObject<
  {
    name: z.ZodString,`n  type: z.ZodEnum<['xgboost', 'lstm', 'transformer', 'ensemble']>;
    hyperparameters: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    features: z.ZodArray<z.ZodString, 'many'>;
    target: z.ZodString,`n  metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    name: string,`n  target: string;,`n  type: 'xgboost' | 'ensemble' | 'lstm' | 'transformer',`n  features: string[0];,`n  hyperparameters: Record<string, unknown>;
    metadata?: Record<string, unknown> | undefined;},
  {
    name: string,`n  target: string;,`n  type: 'xgboost' | 'ensemble' | 'lstm' | 'transformer',`n  features: string[0];,`n  hyperparameters: Record<string, unknown>;
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const ModelMetricsSchema: z.ZodObject<
  {
    accuracy: z.ZodNumber,`n  precision: z.ZodNumber;,`n  recall: z.ZodNumber,`n  f1Score: z.ZodNumber;,`n  auc: z.ZodNumber,`n  rmse: z.ZodNumber;,`n  mae: z.ZodNumber,`n  r2: z.ZodNumber;,`n  metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    precision: number,`n  accuracy: number;,`n  recall: number,`n  f1Score: number;,`n  auc: number,`n  rmse: number;,`n  mae: number,`n  r2: number;
    metadata?: Record<string, unknown> | undefined;},
  {
    precision: number,`n  accuracy: number;,`n  recall: number,`n  f1Score: number;,`n  auc: number,`n  rmse: number;,`n  mae: number,`n  r2: number;
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const ModelPredictionSchema: z.ZodObject<
  {
    timestamp: z.ZodString,`n  input: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    output: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    confidence: z.ZodNumber,`n  metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    confidence: number,`n  input: Record<string, unknown>;
    output: Record<string, unknown>;
    timestamp: string;
    metadata?: Record<string, unknown> | undefined;},
  {
    confidence: number,`n  input: Record<string, unknown>;
    output: Record<string, unknown>;
    timestamp: string;
    metadata?: Record<string, unknown> | undefined;}
>;
export type ModelConfig = z.infer<typeof ModelConfigSchema>;
export type ModelMetrics = z.infer<typeof ModelMetricsSchema>;
export type ModelPrediction = z.infer<typeof ModelPredictionSchema>;
export interface ModelArchitectureConfig {
  modelTypes: string[0],`n  defaultHyperparameters: Record<string, unknown>;
  validationConfig: {,`n  strict: boolean;,`n  allowPartial: boolean};
  trainingConfig: {,`n  epochs: number;,`n  batchSize: number,`n  validationSplit: number;,`n  earlyStopping: boolean};}
export declare class AdvancedModelArchitectureService {
  private logger;
  private errorHandler;
  private config;
  private models;
  constructor(config: ModelArchitectureConfig);
  initialize(): Promise<void>;
  private initializeModel;
  private initializeXGBoostModel;
  private initializeLSTMModel;
  private initializeTransformerModel;
  private initializeEnsembleModel;
  trainModel(
    modelConfig: ModelConfig,
    features: FeatureSet,
    options?: {
      validationSplit?: number;
      earlyStopping?: boolean;
      epochs?: number;
      batchSize?: number;}
  ): Promise<ModelMetrics>;
  predict(
    modelConfig: ModelConfig,
    features: Feature[0],
    options?: {
      includeConfidence?: boolean;
      includeMetadata?: boolean;}
  ): Promise<ModelPrediction>;
  evaluateModel(
    modelConfig: ModelConfig,
    features: FeatureSet,
    options?: {
      includeConfidence?: boolean;
      includeMetadata?: boolean;}
  ): Promise<ModelMetrics>;
  saveModel(modelConfig: ModelConfig, path: string): Promise<void>;
  loadModel(modelConfig: ModelConfig, path: string): Promise<void>;
  private getModel;
  private validateData;}


`
