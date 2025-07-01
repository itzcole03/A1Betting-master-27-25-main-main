interface SocialData {
  teamCohesion: number,`n  homeAdvantage: number;,`n  crowdImpact: number,`n  rivalryFactor: number;,`n  mediaPressure: number}
interface SocialAnalysisRequest {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  venue: string,`n  timestamp: string}
export declare class SocialDynamicsService {
  analyzeSocialFactors(_request: SocialAnalysisRequest): Promise<SocialData>;
  private calculateTeamCohesion;
  private calculateHomeAdvantage;
  private calculateCrowdImpact;
  private calculateRivalryFactor;
  private calculateMediaPressure;}
export Record<string, any>;


`
