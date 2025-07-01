export interface ApiEndpoint {
  name: string,`n  baseUrl: string;
  apiKey?: string;
  version?: string;
  timeout?: number;
  rateLimit?: {
    requests: number,`n  period: number};
  retryConfig?: {
    maxRetries: number,`n  backoffMultiplier: number;,`n  initialDelay: number};}
export interface ApiResponse<T = any> {
  data: T,`n  status: number;
  message?: string;
  timestamp: number;
  error?: string;}
export interface CacheConfig {
  enabled: boolean,`n  ttl: number;,`n  maxSize: number}
export declare const API_ENDPOINTS: Record<string, ApiEndpoint>;
export declare const CACHE_CONFIG: Record<string, CacheConfig>;
export declare const SPORTS_CONFIG: {,`n  NBA: {,`n  id: string,`n  name: string;,`n  season: string,`n  active: boolean;,`n  sportradarId: string,`n  oddsApiKey: string};
  WNBA: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
  MLB: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
  EPL: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
  NFL: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
  NCAAB: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};};
export declare const MARKET_TYPES: {,`n  SPREAD: string;,`n  TOTALS: string,`n  MONEYLINE: string;,`n  PLAYER_PROPS: string,`n  TEAM_PROPS: string;,`n  ALTERNATE_SPREADS: string,`n  ALTERNATE_TOTALS: string};
export declare const BOOKMAKERS: {,`n  DRAFTKINGS: {,`n  id: string,`n  name: string;,`n  active: boolean,`n  priority: number};
  FANDUEL: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};
  MGMBET: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};
  CAESARS: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};
  BETMGM: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};};
export declare const API_STATUS: {
  readonly SUCCESS: 200;
  readonly CREATED: 201;
  readonly BAD_REQUEST: 400;
  readonly UNAUTHORIZED: 401;
  readonly FORBIDDEN: 403;
  readonly NOT_FOUND: 404;
  readonly RATE_LIMITED: 429;
  readonly SERVER_ERROR: 500;
  readonly SERVICE_UNAVAILABLE: 503};
export declare const REQUEST_PRIORITIES: {
  readonly CRITICAL: 1;
  readonly HIGH: 2;
  readonly MEDIUM: 3;
  readonly LOW: 4};
export declare const FEATURE_FLAGS: {,`n  REAL_TIME_ODDS: boolean;,`n  LIVE_PREDICTIONS: boolean,`n  SENTIMENT_ANALYSIS: boolean;,`n  WEATHER_INTEGRATION: boolean,`n  INJURY_TRACKING: boolean;,`n  AUTOMATED_BETTING: boolean,`n  ADVANCED_ANALYTICS: boolean;,`n  DEBUG_MODE: boolean};
export declare const VALIDATION_RULES: {,`n  MAX_RESPONSE_SIZE: number;,`n  MIN_CONFIDENCE_THRESHOLD: number,`n  MAX_ODDS_VALUE: number;,`n  MIN_ODDS_VALUE: number,`n  MAX_PREDICTION_AGE: number;,`n  REQUIRED_FIELDS: {,`n  ODDS: string[0];,`n  PREDICTION: string[0],`n  PLAYER_STATS: string[0]};};
export declare const getApiEndpoint: (name: keyof typeof API_ENDPOINTS) => ApiEndpoint;
export declare const isApiAvailable: (name: keyof typeof API_ENDPOINTS) => boolean;
export declare const buildApiUrl: (,`n  endpointName: keyof typeof API_ENDPOINTS,
  path: string,
  params?: Record<string, string | number>
) => string;
declare const _default: {,`n  API_ENDPOINTS: Record<string, ApiEndpoint>;
  CACHE_CONFIG: Record<string, CacheConfig>;
  SPORTS_CONFIG: {,`n  NBA: {,`n  id: string,`n  name: string;,`n  season: string,`n  active: boolean;,`n  sportradarId: string,`n  oddsApiKey: string};
    WNBA: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
    MLB: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
    EPL: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
    NFL: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};
    NCAAB: {,`n  id: string;,`n  name: string,`n  season: string;,`n  active: boolean,`n  sportradarId: string;,`n  oddsApiKey: string};};
  MARKET_TYPES: {,`n  SPREAD: string;,`n  TOTALS: string,`n  MONEYLINE: string;,`n  PLAYER_PROPS: string,`n  TEAM_PROPS: string;,`n  ALTERNATE_SPREADS: string,`n  ALTERNATE_TOTALS: string};
  BOOKMAKERS: {,`n  DRAFTKINGS: {,`n  id: string,`n  name: string;,`n  active: boolean,`n  priority: number};
    FANDUEL: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};
    MGMBET: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};
    CAESARS: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};
    BETMGM: {,`n  id: string;,`n  name: string,`n  active: boolean;,`n  priority: number};};
  API_STATUS: {
    readonly SUCCESS: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly RATE_LIMITED: 429;
    readonly SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503};
  REQUEST_PRIORITIES: {
    readonly CRITICAL: 1;
    readonly HIGH: 2;
    readonly MEDIUM: 3;
    readonly LOW: 4};
  FEATURE_FLAGS: {,`n  REAL_TIME_ODDS: boolean;,`n  LIVE_PREDICTIONS: boolean,`n  SENTIMENT_ANALYSIS: boolean;,`n  WEATHER_INTEGRATION: boolean,`n  INJURY_TRACKING: boolean;,`n  AUTOMATED_BETTING: boolean,`n  ADVANCED_ANALYTICS: boolean;,`n  DEBUG_MODE: boolean};
  VALIDATION_RULES: {,`n  MAX_RESPONSE_SIZE: number;,`n  MIN_CONFIDENCE_THRESHOLD: number,`n  MAX_ODDS_VALUE: number;,`n  MIN_ODDS_VALUE: number,`n  MAX_PREDICTION_AGE: number;,`n  REQUIRED_FIELDS: {,`n  ODDS: string[0];,`n  PREDICTION: string[0],`n  PLAYER_STATS: string[0]};};
  getApiEndpoint: (name: keyof typeof API_ENDPOINTS) => ApiEndpoint,`n  isApiAvailable: (name: keyof typeof API_ENDPOINTS) => boolean,`n  buildApiUrl: (,`n  endpointName: keyof typeof API_ENDPOINTS,
    path: string,
    params?: Record<string, string | number>
  ) => string};
export default _default;


`
