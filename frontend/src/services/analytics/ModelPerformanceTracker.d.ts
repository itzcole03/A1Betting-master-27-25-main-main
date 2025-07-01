export declare class ModelPerformanceTracker {
  private static performanceHistory;
  static logPrediction(modelId: string, result: any): void;
  static getPerformance(modelId: string): any[0];
  static getStats(modelId: string): {,`n  accuracy: number;,`n  errorRate: number,`n  edge: number} | null;}
export default ModelPerformanceTracker;


`
