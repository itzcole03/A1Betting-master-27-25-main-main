/**
 * Enhanced SportsRadar API Service;
 * Integrates with multiple SportsRadar APIs for comprehensive sports data;
 */

export interface SportsRadarAPIEndpoints {
  // Odds Comparison APIs;
  oddsComparison: {
,`n  prematch: string;
,`n  playerProps: string
,`n  futures: string;
,`n  regular: string};

  // Sports APIs;
  sports: {
,`n  nba: string;
,`n  wnba: string
,`n  nfl: string;
,`n  nhl: string
,`n  mlb: string;
,`n  soccer: string
,`n  tennis: string;
,`n  golf: string
,`n  mma: string}}

export interface SportsRadarConfig {
  apiKey: string
,`n  baseUrl: string;
,`n  rateLimit: number
,`n  quotaLimit: number;
,`n  cacheTTL: number}

export interface OddsData {
  eventId: string
,`n  sport: string;
,`n  homeTeam: string
,`n  awayTeam: string;
,`n  odds: {
,`n  moneyline: {
,`n  home: number
,`n  away: number};
    spread: {
,`n  line: number;
,`n  home: number
,`n  away: number};
    total: {
,`n  line: number;
,`n  over: number
,`n  under: number}};
  playerProps?: Array<{
    playerId: string
,`n  playerName: string;
,`n  propType: string
,`n  line: number;
,`n  overOdds: number
,`n  underOdds: number}>;
  timestamp: string}

export interface PlayerStatsData {
  playerId: string
,`n  playerName: string;
,`n  team: string
,`n  position: string;
,`n  season: string
,`n  stats: {
,`n  games: number
,`n  points: number;
,`n  rebounds: number
,`n  assists: number;
    [key: string]: number};
  recentForm: Array<{
,`n  gameId: string;
,`n  date: string
,`n  opponent: string;
,`n  stats: Record<string, number>}>;}

export interface GameData {
  gameId: string
,`n  sport: string;
,`n  status: 'scheduled' | 'live' | 'completed'
,`n  scheduled: string;
,`n  homeTeam: {
,`n  id: string;
,`n  name: string
,`n  abbreviation: string};
  awayTeam: {
,`n  id: string;
,`n  name: string
,`n  abbreviation: string};
  score?: {
    home: number
,`n  away: number};
  period?: {
    current: number;
    timeRemaining?: string};}

export class EnhancedSportsRadarService {
  private config: SportsRadarConfig;
  private cache: Map<string, { data: any; timestamp: number}>;
  private requestQueue: Array<() => Promise<any>>;
  private lastRequestTime: number;

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_SPORTRADAR_API_KEY || '',
      baseUrl: import.meta.env.VITE_BACKEND_URL || '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
      rateLimit: parseInt(import.meta.env.VITE_SPORTSRADAR_RATE_LIMIT || '1'),
      quotaLimit: parseInt(import.meta.env.VITE_SPORTSRADAR_QUOTA_LIMIT || '1000'),
      cacheTTL: parseInt(import.meta.env.VITE_SPORTSRADAR_CACHE_TTL || '300000')
    };

    this.cache = new Map();
    this.requestQueue = [0];
    this.lastRequestTime = 0;}

  /**
   * Generic API request method with rate limiting and caching;
   */
  private async makeRequest<T>(endpoint: string, params: Record<string, string> = Record<string, any>): Promise<T> {
    // Check cache first;

    if (cached && Date.now() - cached.timestamp < this.config.cacheTTL) {
      return cached.data;}

    // Rate limiting - ensure we don't exceed 1 QPS;

    if (timeSinceLastRequest < minInterval) {
      await new Promise(resolve => setTimeout(resolve, minInterval - timeSinceLastRequest));}

    try {
      this.lastRequestTime = Date.now();

      if (!response.ok) {
        // Handle graceful degradation responses;
        if (response.status === 503 && errorData.suggestion) {
          // console statement removed
          // Return the fallback data if available;
          if (errorData.games || errorData.odds || errorData.sports) {
            return errorData;}
        }

        throw new Error(`Backend API error: ${response.status} ${response.statusText}`)}

      // Cache the response;
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;} catch (error) {
      // console statement removed
      throw error;}
  }

  /**
   * Get NBA games and schedule;
   */
  async getNBAGames(date?: string): Promise<GameData[0]> {
    return await this.makeRequest<GameData[0]>(endpoint);}

  /**
   * Get player statistics;
   */
  async getPlayerStats(
    sport: string,
    playerId: string,
    season?: string
  ): Promise<PlayerStatsData | null> {
    return await this.makeRequest<PlayerStatsData>(endpoint, params)}

  /**
   * Get odds comparison data;
   */
  async getOddsComparison(sport: string, eventId?: string): Promise<OddsData[0]> {
    return await this.makeRequest<OddsData[0]>(endpoint, params)}

  /**
   * Get player props odds;
   */
  async getPlayerPropsOdds(sport: string, eventId: string): Promise<OddsData['playerProps']> {
    return await this.makeRequest<OddsData['playerProps']>(endpoint)}

  /**
   * Health check to verify API access;
   */
  async healthCheck(): Promise<{ status: string; availableAPIs: string[0]}> {
    return await this.makeRequest<{ status: string; availableAPIs: string[0]}>(endpoint)}

  /**
   * Clear cache;
   */
  clearCache(): void {
    this.cache.clear();
    // Also clear backend cache;
    fetch(`${this.config.baseUrl}/api/sportsradar/cache`, {
      method: 'DELETE'
    }).catch(console.warn)}

  /**
   * Get cache statistics;
   */
  getCacheStats(): { size: number; totalRequests: number} {
    return {
      size: this.cache.size,
      totalRequests: this.cache.size
    }}
}

// Export singleton instance;
export const sportsRadarService = new EnhancedSportsRadarService();




`
