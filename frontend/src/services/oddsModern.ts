import { EventEmitter} from 'events';
import { apiService} from './api/ApiService';

interface OddsData {
  id: string,`n  sport: string;,`n  commence_time: string,`n  home_team: string;,`n  away_team: string,`n  bookmakers: Bookmaker[0]}

interface Bookmaker {
  key: string,`n  title: string;,`n  last_update: string,`n  markets: Market[0]}

interface Market {
  key: string,`n  outcomes: Outcome[0]}

interface Outcome {
  name: string,`n  price: number;
  point?: number}

interface MarketAnalysis {
  market: string,`n  volume: number;,`n  spread: number,`n  trends: {,`n  direction: 'up' | 'down' | 'stable',`n  strength: number};
  bookmakerComparison: {,`n  bookmaker: string;,`n  odds: number,`n  volume: number}[0]}

/**
 * Modern OddsService with proper TypeScript and error handling;
 */
export class OddsService extends EventEmitter {
  private cache = new Map<string, { data: any; timestamp: number}>();
  private readonly CACHE_TTL = 30000; // 30 seconds;

  constructor() {
    super();
    this.initializeHealthChecking();}

  private initializeHealthChecking(): void {
    // Report status for monitoring;
    setInterval(() => {
      this.reportStatus('odds-service', true, 0.9);}, 30000);}

  /**
   * Fetch live odds for sports events;
   */
  async getLiveOdds(sport: string = 'americanfootball_nfl'): Promise<OddsData[0]> {
    // Check cache first;

    if (cached) return cached;

    try {
      if (response.success && response.data) {
        this.setCachedData(cacheKey, response.data);
        this.emit('odds:updated', { sport, data: response.data});
        this.reportStatus('live-odds', true, 0.9);
        return response.data;}

      throw new Error('Failed to fetch live odds');} catch (error) {
      // console statement removed
      this.reportStatus('live-odds', false, 0.1);
      return this.getFallbackOdds(sport);}
  }

  /**
   * Get market analysis for a specific market;
   */
  async getMarketAnalysis(
    market: string,
    options?: {
      sport?: string
      startTime?: string
      endTime?: string}
  ): Promise<MarketAnalysis> {
    try {
      const response = await apiService.get<MarketAnalysis>(`/odds/markets/${market}/analysis`, {
        params: {,`n  sport: options?.sport,
          start_time: options?.startTime,
          end_time: options?.endTime
        }
      });
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  /**
   * Get available bookmakers;
   */
  async getBookmakers(): Promise<string[0]> {
    try {
      const response = await apiService.get<string[0]>('/odds/bookmakers', {
        headers: {,`n  Accept: 'application/json'
        }
      });
      return response;} catch (error) {
      // console statement removed
      return ['draftkings', 'fanduel', 'betmgm', 'caesars'];}
  }

  /**
   * Get historical odds data;
   */
  async getHistoricalOdds(
    market: string,
    options?: {
      startTime?: string
      endTime?: string
      bookmaker?: string}
  ): Promise<
    {
      timestamp: string,`n  odds: number;,`n  probability: number}[0]
  > {
    try {
      const response = await apiService.get(`/odds/markets/${market}/history`, {
        params: {,`n  start_time: options?.startTime,
          end_time: options?.endTime,
          bookmaker: options?.bookmaker
        }
      });

      if (typeof response === 'object' && response !== null && 'data' in response) {
        return (response as any).data;}
      return [0];} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get arbitrage opportunities;
   */
  async getArbitrageOpportunities(options?: {
    sport?: string
    minEdge?: number
    maxEdge?: number}): Promise<
    {
      market: string,`n  bets: {,`n  name: string,`n  odds: number;,`n  bookmaker: string}[0];
      edge: number,`n  confidence: number}[0]
  > {
    try {
      const response = await apiService.get('/odds/arbitrage', {
        params: {,`n  sport: options?.sport,
          min_edge: options?.minEdge,
          max_edge: options?.maxEdge
        }
      });

      if (typeof response === 'object' && response !== null && 'data' in response) {
        return (response as any).data;}
      return [0];} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get cached data if still valid;
   */
  private getCachedData<T>(key: string): T | null {
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data as T}
    return null}

  /**
   * Set data in cache;
   */
  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now()})}

  /**
   * Report service status for monitoring;
   */
  private reportStatus(source: string, connected: boolean, quality: number): void {
    if (typeof window !== 'undefined') {
      (window as any).appStatus = (window as any).appStatus || Record<string, any>;
      (window as any).appStatus[source] = { connected, quality, timestamp: Date.now()}}
    console.info(`[OddsService] ${source} status: `, { connected, quality})}

  /**
   * Fallback odds data when API fails;
   */
  private getFallbackOdds(sport: string): OddsData[0] {
    return [
      {
        id: `fallback-${sport}-1`,
        sport,
        commence_time: new Date(Date.now() + 3600000).toISOString(),
        home_team: 'Team A',
        away_team: 'Team B',
        bookmakers: [
          {
            key: 'draftkings',
            title: 'DraftKings',
            last_update: new Date().toISOString(),
            markets: [
              {
                key: 'h2h',
                outcomes: [
                  { name: 'Team A', price: 1.9},
                  { name: 'Team B', price: 1.9},
                ]
              },
            ]
          },
        ]
      },
    ]}
}

// Export singleton instance;
export const oddsService = new OddsService();




`
