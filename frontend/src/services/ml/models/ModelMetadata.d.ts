export interface ModelMetadata {
  name: string,`n  description: string;,`n  author: string,`n  tags: string[0];,`n  parameters: Record<string, any>;
  dependencies: string[0],`n  framework: string;,`n  architecture: string,`n  trainingConfig: {,`n  epochs: number,`n  batchSize: number;,`n  learningRate: number,`n  optimizer: string;,`n  lossFunction: string,`n  validationSplit: number;,`n  earlyStopping: boolean,`n  earlyStoppingPatience: number};
  dataConfig: {,`n  features: string[0];,`n  target: string,`n  preprocessing: string[0];,`n  augmentation: string[0],`n  validationStrategy: string};
  performanceConfig: {,`n  metrics: string[0];,`n  thresholds: Record<string, number>;
    evaluationStrategy: string};
  deploymentConfig: {,`n  environment: string;,`n  resources: {,`n  cpu: number;,`n  memory: number,`n  gpu: boolean};
    scaling: {,`n  minInstances: number;,`n  maxInstances: number,`n  targetUtilization: number};};}
export declare class ModelMetadataManager {
  private metadata;
  constructor(metadata: ModelMetadata);
  getMetadata(): ModelMetadata;
  updateMetadata(updates: Partial<ModelMetadata>): void;
  addTag(tag: string): void;
  removeTag(tag: string): void;
  updateParameter(key: string, value: any): void;
  removeParameter(key: string): void;
  addDependency(dependency: string): void;
  removeDependency(dependency: string): void;
  toJSON(): string;
  static fromJSON(json: string): ModelMetadataManager}


`
