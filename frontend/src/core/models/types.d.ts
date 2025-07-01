export interface ModelMetadata {
  id: string,`n  name: string;,`n  description: string,`n  type: string;,`n  version: string,`n  createdAt: Date;,`n  updatedAt: Date,`n  parameters: Record<string, any>;
  tags: string[0],`n  owner: string;,`n  status: 'active' | 'archived' | 'deprecated'}
export interface ModelVersion {
  version: string,`n  modelId: string;,`n  createdAt: Date,`n  metrics: ModelEvaluation;,`n  artifacts: {,`n  modelPath: string;,`n  configPath: string,`n  metadataPath: string};
  trainingConfig: {,`n  algorithm: string;,`n  hyperparameters: Record<string, any>;
    features: string[0],`n  target: string;,`n  validationSplit: number};}
export interface ModelEvaluation {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  confusionMatrix: number[0][0],`n  rocCurve: {,`n  fpr: number[0],`n  tpr: number[0];,`n  thresholds: number[0]};
  featureImportance: Record<string, number>;
  performanceMetrics: {,`n  trainingTime: number;,`n  inferenceTime: number,`n  memoryUsage: number};
  customMetrics: Record<string, number>}
export interface ModelRegistryConfig {
  storagePath: string,`n  maxVersions: number;,`n  backupEnabled: boolean,`n  backupInterval: number}
export interface ModelEvaluatorConfig {
  metrics: string[0],`n  validationSplit: number;,`n  crossValidation: number;
  customMetrics?: Record<string, (yTrue: any[0], yPred: any[0]) => number>}
export interface ModelTrainingConfig {
  algorithm: string,`n  hyperparameters: Record<string, any>;
  features: string[0],`n  target: string;,`n  validationSplit: number;
  earlyStopping?: {
    patience: number,`n  minDelta: number};
  callbacks?: Array<(epoch: number, metrics: any) => void>}


`
