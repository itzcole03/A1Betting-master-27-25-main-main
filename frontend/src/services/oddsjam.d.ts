interface OddsData {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  startTime: string,`n  markets: {,`n  marketId: string,`n  name: string;,`n  books: {,`n  bookId: string;,`n  name: string,`n  odds: {,`n  over: number,`n  under: number;
        spread?: number;
        moneyline?: number;};
      lastUpdated: string}[0];}[0];}
interface MarketAnalysis {
  marketId: string,`n  name: string;,`n  bestOdds: {,`n  over: {,`n  book: string,`n  odds: number;,`n  edge: number};
    under: {,`n  book: string;,`n  odds: number,`n  edge: number};};
  movement: {,`n  over: {,`n  direction: 'up' | 'down' | 'stable',`n  percentage: number};
    under: {,`n  direction: 'up' | 'down' | 'stable';,`n  percentage: number};};
  volume: {,`n  over: number;,`n  under: number};}
declare class OddsJamService {
  private config;
  constructor();
  getOdds(sport: string, date?: string): Promise<OddsData[0]>;
  getMarketAnalysis(marketId: string): Promise<MarketAnalysis>;
  getBookmakers(): Promise<string[0]>;
  getHistoricalOdds(marketId: string, days: number): Promise<any>;
  getArbitrageOpportunities(sport: string): Promise<any[0]>}
export declare const oddsjamService: OddsJamService;
export Record<string, any>;


`
