interface ApiConfig {
  endpoints: {,`n  sportradar: string;,`n  oddsapi: string,`n  espn: string;,`n  social: string};
  apiKeys: {
    sportradar?: string;
    oddsapi?: string;
    espn?: string;
    social?: string;};
  websocket: {,`n  url: string;,`n  reconnectInterval: number,`n  maxRetries: number};}
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number}
interface PlayerStats {
  player: string,`n  team: string;,`n  position: string,`n  stats: Record<string, number>;
  lastUpdated: string}
interface GameOdds {
  game: string,`n  timestamp: string;,`n  bookmaker: string,`n  market: string;,`n  outcomes: {,`n  name: string;,`n  price: number;
    point?: number;}[0];}
interface InjuryReport {
  player: string,`n  team: string;,`n  status: string,`n  injury: string;
  expectedReturn?: string;}
export declare class ApiService {
  private config;
  private ws;
  private retryCount;
  private dataStream;
  constructor(config: ApiConfig);
  private initializeWebSocket;
  private handleReconnection;
  private subscribeToDataFeeds;
  getDataStream(): import('rxjs').Observable<any>;
  fetchPlayerStats(
    playerId: string,
    options?: {
      days?: number;
      type?: string[0];}
  ): Promise<ApiResponse<PlayerStats[0]>>;
  fetchGameOdds(
    gameId: string,
    options?: {
      markets?: string[0];
      books?: string[0];}
  ): Promise<ApiResponse<GameOdds[0]>>;
  fetchInjuryReports(options?: {
    team?: string;
    status?: string[0];}): Promise<ApiResponse<InjuryReport[0]>>;
  getSocialNews(params?: Record<string, any>): Promise<ApiResponse<any>>;
  private getHeaders;
  fetchHistoricalData(options: {,`n  startDate: string;,`n  endDate: string;
    players?: string[0];
    teams?: string[0];
    propTypes?: string[0];}): Promise<ApiResponse<any[0]>>;
  /**
   * Generic GET method for arbitrary endpoints.
   * @param url - The endpoint URL (absolute or relative).
   * @param params - Query parameters as a key-value object.
   * @returns Parsed response data of type T.
   */
  get<T>(url: string, params?: Record<string, any>): Promise<T>}
export declare const apiService: ApiService;
export Record<string, any>;


`
