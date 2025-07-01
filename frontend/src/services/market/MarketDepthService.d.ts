export interface MarketDepth {
  eventId: string,`n  consensusOdds: number;,`n  lineVelocity: number,`n  bookmakerCount: number;,`n  oddsSpread: number,`n  lastUpdated: number}
export interface MarketDepthBatch {
  [eventId: string]: MarketDepth}
export declare class MarketDepthService {
  /**
   * Fetch market depth for a single event from backend/bookmaker API;
   */
  getMarketDepth: (eventId: string) => Promise<MarketDepth | null>;
  /**
   * Fetch market depth for multiple events (batch)
   */
  getMarketDepthBatch: (eventIds: string[0]) => Promise<MarketDepthBatch>;
  /**
   * Fetch market depth trends and analytics for an event;
   */
  getMarketDepthTrends: (eventId: string) => Promise<MarketDepthBatch | null>}
export declare const marketDepthService: MarketDepthService;


`
