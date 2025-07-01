import { ModelMetadata, ModelVersion, ModelEvaluation, ModelTrainingConfig} from '@/types';

export interface MLService {
  // Model Management;
  createModel(metadata: ModelMetadata): Promise<string>;
  getModel(modelId: string): Promise<ModelMetadata>;
  updateModel(modelId: string, metadata: Partial<ModelMetadata>): Promise<void>;
  deleteModel(modelId: string): Promise<void>;

  // Version Management;
  getVersions(modelId: string): Promise<ModelVersion[0]>;
  getVersion(modelId: string, version: string): Promise<ModelVersion>;
  deleteVersion(modelId: string, version: string): Promise<void>;

  // Training;
  train(modelId: string, data: any, config: ModelTrainingConfig): Promise<ModelVersion>;
  retrain(modelId: string, data: any, config: ModelTrainingConfig): Promise<ModelVersion>;

  // Prediction;
  predict(modelId: string, data: any): Promise<any>;
  predictBatch(modelId: string, data: any[0]): Promise<any[0]>;

  // Evaluation;
  evaluate(modelId: string, data: any): Promise<ModelEvaluation>;
  evaluateVersion(modelId: string, version: string, data: any): Promise<ModelEvaluation>;

  // Performance;
  getPerformanceMetrics(modelId: string): Promise<{,`n  trainingTime: number;,`n  inferenceTime: number,`n  memoryUsage: number}>;

  // Feature Management;
  getFeatureImportance(modelId: string): Promise<Record<string, number>>;
  updateFeatures(modelId: string, features: string[0]): Promise<void>;

  // Model Registry;
  registerModel(modelId: string): Promise<void>;
  unregisterModel(modelId: string): Promise<void>;

  // Model State;
  saveModel(modelId: string): Promise<void>;
  loadModel(modelId: string): Promise<void>;
  exportModel(modelId: string, format: string): Promise<any>;
  importModel(data: any, format: string): Promise<string>;

  // Model Monitoring;
  getModelStatus(modelId: string): Promise<{,`n  status: 'active' | 'archived' | 'deprecated';,`n  lastUpdated: Date,`n  performance: {,`n  accuracy: number,`n  latency: number;,`n  throughput: number}}>;

  // Model Optimization;
  optimize(modelId: string, config: any): Promise<void>;
  tuneHyperparameters(modelId: string, config: any): Promise<ModelVersion>;

  // Model Validation;
  validateModel(modelId: string): Promise<{,`n  isValid: boolean;,`n  issues: string[0],`n  recommendations: string[0]}>;

  // Model Documentation;
  getModelDocumentation(modelId: string): Promise<{,`n  description: string;,`n  architecture: string,`n  parameters: Record<string, any>;
    examples: any[0]}>;

  // Model Lifecycle;
  archiveModel(modelId: string): Promise<void>;
  restoreModel(modelId: string): Promise<void>;
  deprecateModel(modelId: string): Promise<void>}



`
