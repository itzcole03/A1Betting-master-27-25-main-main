export interface ModelMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  auc: number,`n  confusionMatrix: {,`n  truePositives: number,`n  trueNegatives: number;,`n  falsePositives: number,`n  falseNegatives: number};
  featureImportance: Record<string, number>;
  shapValues?: Record<string, number[0]>;
  predictionConfidence: {,`n  mean: number;,`n  std: number,`n  distribution: number[0]};
  trainingMetrics: {,`n  loss: number[0];,`n  validationLoss: number[0],`n  learningRate: number[0];,`n  gradientNorm: number[0]};
  performanceMetrics: {,`n  inferenceTime: number;,`n  throughput: number,`n  latency: number;,`n  memoryUsage: number};
  driftMetrics?: {
    featureDrift: Record<string, number>;
    predictionDrift: number,`n  dataQuality: Record<string, number>};
  customMetrics?: Record<string, number>;}
export declare class ModelMetricsManager {
  private metrics;
  constructor(metrics: ModelMetrics);
  getMetrics(): ModelMetrics;
  updateMetrics(updates: Partial<ModelMetrics>): void;
  addCustomMetric(name: string, value: number): void;
  removeCustomMetric(name: string): void;
  calculateDriftMetrics(newData: any): void;
  toJSON(): string;
  static fromJSON(json: string): ModelMetricsManager}


`
