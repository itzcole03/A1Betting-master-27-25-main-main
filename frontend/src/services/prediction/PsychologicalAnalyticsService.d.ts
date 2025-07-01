interface PsychologicalData {
  pressureHandling: number,`n  clutchPerformance: number;,`n  consistency: number,`n  focus: number;,`n  competitiveDrive: number}
interface PsychologicalAnalysisRequest {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  timestamp: string}
export declare class PsychologicalAnalyticsService {
  analyzePsychologicalFactors(request: PsychologicalAnalysisRequest): Promise<PsychologicalData>;
  private calculatePressureHandling;
  private calculateClutchPerformance;
  private calculateConsistency;
  private calculateFocus;
  private calculateCompetitiveDrive;}
export Record<string, any>;


`
