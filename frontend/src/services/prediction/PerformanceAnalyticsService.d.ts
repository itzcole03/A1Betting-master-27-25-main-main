interface PerformanceData {
  recentForm: number,`n  historicalPerformance: number;,`n  matchupAdvantage: number,`n  restDays: number;,`n  travelDistance: number}
interface PerformanceAnalysisRequest {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  timestamp: string}
export declare class PerformanceAnalyticsService {
  analyzePerformance(request: PerformanceAnalysisRequest): Promise<PerformanceData>;
  private calculateRecentForm;
  private calculateHistoricalPerformance;
  private calculateMatchupAdvantage;
  private calculateRestDays;
  private calculateTravelDistance;}
export Record<string, any>;


`
