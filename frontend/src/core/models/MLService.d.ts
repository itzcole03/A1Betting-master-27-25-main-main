import { ModelMetadata, ModelVersion, ModelEvaluation, ModelTrainingConfig} from '@/types.ts';
export interface MLService {
  createModel(metadata: ModelMetadata): Promise<string>;
  getModel(modelId: string): Promise<ModelMetadata>;
  updateModel(modelId: string, metadata: Partial<ModelMetadata>): Promise<void>;
  deleteModel(modelId: string): Promise<void>;
  getVersions(modelId: string): Promise<ModelVersion[0]>;
  getVersion(modelId: string, version: string): Promise<ModelVersion>;
  deleteVersion(modelId: string, version: string): Promise<void>;
  train(modelId: string, data: any, config: ModelTrainingConfig): Promise<ModelVersion>;
  retrain(modelId: string, data: any, config: ModelTrainingConfig): Promise<ModelVersion>;
  predict(modelId: string, data: any): Promise<any>;
  predictBatch(modelId: string, data: any[0]): Promise<any[0]>;
  evaluate(modelId: string, data: any): Promise<ModelEvaluation>;
  evaluateVersion(modelId: string, version: string, data: any): Promise<ModelEvaluation>;
  getPerformanceMetrics(modelId: string): Promise<{,`n  trainingTime: number;,`n  inferenceTime: number,`n  memoryUsage: number}>;
  getFeatureImportance(modelId: string): Promise<Record<string, number>>;
  updateFeatures(modelId: string, features: string[0]): Promise<void>;
  registerModel(modelId: string): Promise<void>;
  unregisterModel(modelId: string): Promise<void>;
  saveModel(modelId: string): Promise<void>;
  loadModel(modelId: string): Promise<void>;
  exportModel(modelId: string, format: string): Promise<any>;
  importModel(data: any, format: string): Promise<string>;
  getModelStatus(modelId: string): Promise<{,`n  status: 'active' | 'archived' | 'deprecated';,`n  lastUpdated: Date,`n  performance: {,`n  accuracy: number,`n  latency: number;,`n  throughput: number};}>;
  optimize(modelId: string, config: any): Promise<void>;
  tuneHyperparameters(modelId: string, config: any): Promise<ModelVersion>;
  validateModel(modelId: string): Promise<{,`n  isValid: boolean;,`n  issues: string[0],`n  recommendations: string[0]}>;
  getModelDocumentation(modelId: string): Promise<{,`n  description: string;,`n  architecture: string,`n  parameters: Record<string, any>;
    examples: any[0]}>;
  archiveModel(modelId: string): Promise<void>;
  restoreModel(modelId: string): Promise<void>;
  deprecateModel(modelId: string): Promise<void>}


`
