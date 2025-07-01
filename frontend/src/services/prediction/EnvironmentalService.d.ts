interface EnvironmentalData {
  weatherImpact: number,`n  venueAdvantage: number;,`n  surfaceCondition: number,`n  timeOfDay: number;,`n  seasonality: number}
interface EnvironmentalAnalysisRequest {
  eventId: string,`n  sport: string;,`n  venue: string,`n  timestamp: string}
export declare class EnvironmentalService {
  analyzeEnvironmentalFactors(request: EnvironmentalAnalysisRequest): Promise<EnvironmentalData>;
  private calculateWeatherImpact;
  private calculateVenueAdvantage;
  private calculateSurfaceCondition;
  private calculateTimeOfDayImpact;
  private calculateSeasonalityImpact;}
export Record<string, any>;


`
