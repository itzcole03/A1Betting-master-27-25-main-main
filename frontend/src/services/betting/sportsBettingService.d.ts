interface MatchPrediction {
  homeWinProbability: number,`n  awayWinProbability: number;,`n  drawProbability: number,`n  recommendedBet: {,`n  type: 'home' | 'away' | 'draw' | 'none',`n  stake: number;,`n  odds: number,`n  expectedValue: number;,`n  confidence: number};
  insights: {,`n  keyFactors: string[0];,`n  riskLevel: 'low' | 'medium' | 'high',`n  valueAssessment: string;,`n  modelConsensus: number};}
declare class SportsBettingService {
  private readonly API_ENDPOINTS;
  private readonly API_KEYS;
  constructor();
  private validateApiConfig;
  getMatchPrediction(
    homeTeam: string,
    awayTeam: string,
    league: string,
    date: string
  ): Promise<MatchPrediction>;
  private fetchOdds;
  private fetchTeamStats;
  private fetchHistoricalMatches;
  private calculateProbabilities;
  private determineOptimalBet;
  private calculateKellyStake;
  private determineRiskLevel;
  private assessValue;}
export declare const sportsBettingService: SportsBettingService;
export Record<string, any>;


`
