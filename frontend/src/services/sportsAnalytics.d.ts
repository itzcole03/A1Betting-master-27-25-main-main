export type Sport = 'nfl' | 'nba' | 'mlb' | 'nhl' | 'soccer';
export interface PlayerStats {
  playerId: string,`n  name: string;,`n  team: string,`n  position: string;,`n  lastGames: {,`n  date: string;,`n  stats: Record<string, number>}[0];
  seasonAverages: Record<string, number>;
  matchupStats: {,`n  opponent: string;,`n  stats: Record<string, number>}[0];
  injuryStatus?: string;
  restDays: number}
export interface TeamStats {
  teamId: string,`n  name: string;,`n  league: Sport,`n  lastGames: {,`n  date: string,`n  opponent: string;,`n  score: string,`n  stats: Record<string, number>}[0];
  seasonStats: Record<string, number>;
  homeAwaySplit: {,`n  home: Record<string, number>;
    away: Record<string, number>};
  pace: number,`n  defensiveRating: number;,`n  offensiveRating: number}
export interface PropPrediction {
  propId: string,`n  playerId: string;,`n  propType: string,`n  value: number;,`n  confidence: number,`n  factors: {,`n  name: string,`n  impact: number;,`n  description: string}[0];
  historicalAccuracy: number,`n  recommendedBet: {,`n  amount: number,`n  type: 'over' | 'under';
    modifier?: 'goblin' | 'devil';
    expectedValue: number};}
export interface Recommendation {
  id: string,`n  sport: Sport;,`n  event: string,`n  betType: string;,`n  odds: number,`n  confidence: number;,`n  edge: number,`n  analysis: string;,`n  risk: 'low' | 'medium' | 'high',`n  timestamp: number;,`n  favorite: boolean}
type EventMap = {
  playerStats: PlayerStats,`n  teamStats: TeamStats;,`n  propPrediction: PropPrediction,`n  recommendations: Recommendation[0]};
export declare class SportsAnalyticsService {
  private static instance;
  private cache;
  private readonly CACHE_DURATION;
  private subscribers;
  private constructor();
  static getInstance(): SportsAnalyticsService;
  /**
   * Fetch player stats from backend API (production-ready)
   */
  getPlayerStats: (sport: Sport, playerId: string) => Promise<PlayerStats>;
  /**
   * Fetch team stats from backend API (production-ready)
   */
  getTeamStats: (sport: Sport, teamId: string) => Promise<TeamStats>;
  /**
   * Analyze a prop using backend ML/analytics API (production-ready)
   */
  analyzeProp: (sport: Sport, propId: string) => Promise<PropPrediction>;
  /**
   * Get betting recommendations from backend API (production-ready)
   */
  getRecommendations: (sport: Sport) => Promise<Recommendation[0]>;
  /**
   * Subscribe to analytics events (playerStats, teamStats, propPrediction, recommendations)
   * @param event Event name;
   * @param callback Callback with event data;
   */
  subscribe<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): () => void;
  /**
   * Get a value from the cache if valid, otherwise null.
   */
  private getFromCache;
  /**
   * Set a value in the cache.
   */
  private setCache;
  analyzeNBAProp(propId: string): Promise<PropPrediction>;
  analyzeWNBAProp(propId: string): Promise<PropPrediction>;
  analyzeMLBProp(propId: string): Promise<PropPrediction>;
  analyzeSoccerProp(propId: string): Promise<PropPrediction>}
export declare const sportsAnalytics: SportsAnalyticsService;
export Record<string, any>;


`
