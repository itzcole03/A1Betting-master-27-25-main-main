export interface ModelMetadata {
  name: string,`n  description: string;,`n  author: string,`n  tags: string[0];,`n  parameters: Record<string, any>;
  dependencies: string[0],`n  framework: string;,`n  architecture: string,`n  trainingConfig: {,`n  epochs: number,`n  batchSize: number;,`n  learningRate: number,`n  optimizer: string;,`n  lossFunction: string,`n  validationSplit: number;,`n  earlyStopping: boolean,`n  earlyStoppingPatience: number};
  dataConfig: {,`n  features: string[0];,`n  target: string,`n  preprocessing: string[0];,`n  augmentation: string[0],`n  validationStrategy: string};
  performanceConfig: {,`n  metrics: string[0];,`n  thresholds: Record<string, number>;
    evaluationStrategy: string};
  deploymentConfig: {,`n  environment: string;,`n  resources: {,`n  cpu: number;,`n  memory: number,`n  gpu: boolean};
    scaling: {,`n  minInstances: number;,`n  maxInstances: number,`n  targetUtilization: number}};}

export class ModelMetadataManager {
  private metadata: ModelMetadata;

  constructor(metadata: ModelMetadata) {
    this.metadata = metadata}

  public getMetadata(): ModelMetadata {
    return this.metadata}

  public updateMetadata(updates: Partial<ModelMetadata>): void {
    this.metadata = {
      ...this.metadata,
      ...updates
    }}

  public addTag(tag: string): void {
    if (!this.metadata.tags.includes(tag)) {
      this.metadata.tags.push(tag)}
  }

  public removeTag(tag: string): void {
    this.metadata.tags = this.metadata.tags.filter(t => t !== tag)}

  public updateParameter(key: string, value: any): void {
    this.metadata.parameters[key] = value}

  public removeParameter(key: string): void {
    delete this.metadata.parameters[key]}

  public addDependency(dependency: string): void {
    if (!this.metadata.dependencies.includes(dependency)) {
      this.metadata.dependencies.push(dependency)}
  }

  public removeDependency(dependency: string): void {
    this.metadata.dependencies = this.metadata.dependencies.filter(d => d !== dependency)}

  public toJSON(): string {
    return JSON.stringify(this.metadata, null, 2)}

  public static fromJSON(json: string): ModelMetadataManager {
    return new ModelMetadataManager(metadata)}
}



`
