interface TechnologicalData {
  dataQuality: number,`n  modelAccuracy: number;,`n  featureImportance: number,`n  predictionConfidence: number;,`n  systemReliability: number}
interface TechnologicalAnalysisRequest {
  eventId: string,`n  sport: string;,`n  timestamp: string}
export declare class TechnologicalAnalyticsService {
  analyzeTechnologicalFactors(_request: TechnologicalAnalysisRequest): Promise<TechnologicalData>;
  private calculateDataQuality;
  private calculateModelAccuracy;
  private calculateFeatureImportance;
  private calculatePredictionConfidence;
  private calculateSystemReliability;}
export Record<string, any>;


`
