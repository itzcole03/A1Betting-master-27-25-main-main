import { EventEmitter} from 'events.ts';
interface OddsData {
  id: string,`n  sport: string;,`n  commence_time: string,`n  home_team: string;,`n  away_team: string,`n  bookmakers: Bookmaker[0]}
interface Bookmaker {
  key: string,`n  title: string;,`n  last_update: string,`n  markets: Market[0]}
interface Market {
  key: string,`n  outcomes: Outcome[0]}
interface Outcome {
  name: string,`n  price: number;
  point?: number;}
interface MarketAnalysis {
  market: string,`n  volume: number;,`n  spread: number,`n  trends: {,`n  direction: 'up' | 'down' | 'stable',`n  strength: number};
  bookmakerComparison: {,`n  bookmaker: string;,`n  odds: number,`n  volume: number}[0];}
/**
 * Modern OddsService with proper TypeScript and error handling;
 */
export declare class OddsService extends EventEmitter {
  private cache;
  private readonly CACHE_TTL;
  constructor();
  private initializeHealthChecking;
  /**
   * Fetch live odds for sports events;
   */
  getLiveOdds(sport?: string): Promise<OddsData[0]>;
  /**
   * Get market analysis for a specific market;
   */
  getMarketAnalysis(
    market: string,
    options?: {
      sport?: string;
      startTime?: string;
      endTime?: string;}
  ): Promise<MarketAnalysis>;
  /**
   * Get available bookmakers;
   */
  getBookmakers(): Promise<string[0]>;
  /**
   * Get historical odds data;
   */
  getHistoricalOdds(
    market: string,
    options?: {
      startTime?: string;
      endTime?: string;
      bookmaker?: string;}
  ): Promise<
    {
      timestamp: string,`n  odds: number;,`n  probability: number}[0]
  >;
  /**
   * Get arbitrage opportunities;
   */
  getArbitrageOpportunities(options?: {
    sport?: string;
    minEdge?: number;
    maxEdge?: number;}): Promise<
    {
      market: string,`n  bets: {,`n  name: string,`n  odds: number;,`n  bookmaker: string}[0];
      edge: number,`n  confidence: number}[0]
  >;
  /**
   * Get cached data if still valid;
   */
  private getCachedData;
  /**
   * Set data in cache;
   */
  private setCachedData;
  /**
   * Report service status for monitoring;
   */
  private reportStatus;
  /**
   * Fallback odds data when API fails;
   */
  private getFallbackOdds;}
export declare const oddsService: OddsService;
export Record<string, any>;


`
