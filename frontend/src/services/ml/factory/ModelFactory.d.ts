import { BaseModel} from '@/models/BaseModel.ts';
import { ModelConfig, AdvancedEnsembleConfig} from '@/types.ts';
export declare class ModelFactory {
  private static instance;
  private models;
  private configs;
  private metrics;
  private predictionHistory;
  private logger;
  private errorHandler;
  private monitor;
  private constructor();
  static getInstance(): ModelFactory;
  createModel(config: ModelConfig | AdvancedEnsembleConfig): BaseModel;
  trainModel(modelId: string, data: any): Promise<void>;
  predict(modelId: string, input: any): Promise<any>;
  getModel(modelId: string): BaseModel | undefined;
  getModelConfig(modelId: string): ModelConfig | AdvancedEnsembleConfig | undefined;
  getModelMetrics(modelId: string): any;
  getPredictionHistory(modelId?: string): Array<{
    timestamp: string,`n  modelId: string;,`n  input: any,`n  output: any;
    confidence?: number;}>;
  saveModel(modelId: string, path: string): Promise<void>;
  loadModel(modelId: string, path: string): Promise<void>;
  removeModel(modelId: string): void;
  listModels(): string[0];
  getModelInfo(modelId: string):
    | {
        config: ModelConfig | AdvancedEnsembleConfig,`n  isTrained: boolean;,`n  lastUpdate: string,`n  metrics: any}
    | undefined;
  isModelTrained(modelId: string): boolean}


`
