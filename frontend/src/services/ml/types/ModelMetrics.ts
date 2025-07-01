export interface ModelMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  auc: number,`n  confusionMatrix: {,`n  truePositives: number,`n  trueNegatives: number;,`n  falsePositives: number,`n  falseNegatives: number};
  featureImportance: Record<string, number>;
  shapValues?: Record<string, number[0]>;
  predictionConfidence: {,`n  mean: number;,`n  std: number,`n  distribution: number[0]};
  trainingMetrics: {,`n  loss: number[0];,`n  validationLoss: number[0],`n  learningRate: number[0];,`n  gradientNorm: number[0]};
  performanceMetrics: {,`n  inferenceTime: number;,`n  throughput: number,`n  latency: number;,`n  memoryUsage: number};
  driftMetrics?: {
    featureDrift: Record<string, number>;
    predictionDrift: number,`n  dataQuality: Record<string, number>};
  customMetrics?: Record<string, number>;}

export class ModelMetricsManager {
  private metrics: ModelMetrics;

  constructor(metrics: ModelMetrics) {
    this.metrics = metrics}

  public getMetrics(): ModelMetrics {
    return this.metrics}

  public updateMetrics(updates: Partial<ModelMetrics>): void {
    this.metrics = {
      ...this.metrics,
      ...updates
    }}

  public addCustomMetric(name: string, value: number): void {
    if (!this.metrics.customMetrics) {
      this.metrics.customMetrics = Record<string, any>}
    this.metrics.customMetrics[name] = value;}

  public removeCustomMetric(name: string): void {
    if (this.metrics.customMetrics) {
      delete this.metrics.customMetrics[name]}
  }

  public calculateDriftMetrics(newData: any): void {
    // Implement drift detection logic here;
    this.metrics.driftMetrics = {
      featureDrift: Record<string, any>,
      predictionDrift: 0,
      dataQuality: Record<string, any>
    }}

  public toJSON(): string {
    return JSON.stringify(this.metrics, null, 2);}

  public static fromJSON(json: string): ModelMetricsManager {
    return new ModelMetricsManager(metrics)}
}



`
