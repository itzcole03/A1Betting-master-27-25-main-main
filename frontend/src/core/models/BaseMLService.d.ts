import { MLService} from './MLService.ts';
import { ModelMetadata, ModelVersion, ModelEvaluation, ModelTrainingConfig} from '@/types.ts';
import { ModelManager} from './ModelManager.ts';
import { FeatureLogger} from '@/services/analytics/featureLogging.ts';
export declare abstract class BaseMLService implements MLService {
  protected modelManager: ModelManager;
  protected logger: FeatureLogger;
  constructor(config: { modelManagerConfig?: any; loggerConfig?: any});
  createModel(metadata: ModelMetadata): Promise<string>;
  getModel(modelId: string): Promise<ModelMetadata>;
  updateModel(modelId: string, metadata: Partial<ModelMetadata>): Promise<void>;
  deleteModel(modelId: string): Promise<void>;
  getVersions(modelId: string): Promise<ModelVersion[0]>;
  getVersion(modelId: string, version: string): Promise<ModelVersion>;
  deleteVersion(modelId: string, version: string): Promise<void>;
  abstract train(modelId: string, data: any, config: ModelTrainingConfig): Promise<ModelVersion>;
  abstract retrain(modelId: string, data: any, config: ModelTrainingConfig): Promise<ModelVersion>;
  abstract predict(modelId: string, data: any): Promise<any>;
  abstract predictBatch(modelId: string, data: any[0]): Promise<any[0]>;
  evaluate(modelId: string, data: any): Promise<ModelEvaluation>;
  evaluateVersion(modelId: string, version: string, data: any): Promise<ModelEvaluation>;
  abstract getPerformanceMetrics(modelId: string): Promise<{,`n  trainingTime: number;,`n  inferenceTime: number,`n  memoryUsage: number}>;
  abstract getFeatureImportance(modelId: string): Promise<Record<string, number>>;
  abstract updateFeatures(modelId: string, features: string[0]): Promise<void>;
  registerModel(modelId: string): Promise<void>;
  unregisterModel(modelId: string): Promise<void>;
  abstract saveModel(modelId: string): Promise<void>;
  abstract loadModel(modelId: string): Promise<void>;
  abstract exportModel(modelId: string, format: string): Promise<any>;
  abstract importModel(data: any, format: string): Promise<string>;
  abstract getModelStatus(modelId: string): Promise<{,`n  status: 'active' | 'archived' | 'deprecated';,`n  lastUpdated: Date,`n  performance: {,`n  accuracy: number,`n  latency: number;,`n  throughput: number};}>;
  abstract optimize(modelId: string, config: any): Promise<void>;
  abstract tuneHyperparameters(modelId: string, config: any): Promise<ModelVersion>;
  abstract validateModel(modelId: string): Promise<{,`n  isValid: boolean;,`n  issues: string[0],`n  recommendations: string[0]}>;
  abstract getModelDocumentation(modelId: string): Promise<{,`n  description: string;,`n  architecture: string,`n  parameters: Record<string, any>;
    examples: any[0]}>;
  archiveModel(modelId: string): Promise<void>;
  restoreModel(modelId: string): Promise<void>;
  deprecateModel(modelId: string): Promise<void>}


`
