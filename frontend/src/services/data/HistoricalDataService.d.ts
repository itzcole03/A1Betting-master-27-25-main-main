import { z} from 'zod.ts';
import { DataSource} from '@/UnifiedDataService.ts';
export declare const HistoricalGameDataSchema: z.ZodObject<
  {
    gameId: z.ZodString,`n  date: z.ZodString;,`n  homeTeam: z.ZodString,`n  awayTeam: z.ZodString;,`n  venue: z.ZodString,`n  result: z.ZodObject<
      {
        homeScore: z.ZodNumber,`n  awayScore: z.ZodNumber;,`n  winner: z.ZodString,`n  margin: z.ZodNumber},
      'strip',
      z.ZodTypeAny,
      {
        margin: number,`n  homeScore: number;,`n  awayScore: number,`n  winner: string},
      {
        margin: number,`n  homeScore: number;,`n  awayScore: number,`n  winner: string}
    >;
    weather: z.ZodObject<
      {
        temperature: z.ZodNumber,`n  humidity: z.ZodNumber;,`n  windSpeed: z.ZodNumber,`n  precipitation: z.ZodNumber;,`n  conditions: z.ZodString},
      'strip',
      z.ZodTypeAny,
      {
        temperature: number,`n  humidity: number;,`n  windSpeed: number,`n  precipitation: number;,`n  conditions: string},
      {
        temperature: number,`n  humidity: number;,`n  windSpeed: number,`n  precipitation: number;,`n  conditions: string}
    >;
    attendance: z.ZodNumber,`n  duration: z.ZodNumber;,`n  officials: z.ZodArray<z.ZodString, 'many'>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    result: {,`n  margin: number;,`n  homeScore: number,`n  awayScore: number;,`n  winner: string};
    date: string,`n  duration: number;,`n  homeTeam: string,`n  awayTeam: string;,`n  weather: {,`n  temperature: number;,`n  humidity: number,`n  windSpeed: number;,`n  precipitation: number,`n  conditions: string};
    gameId: string,`n  venue: string;,`n  attendance: number,`n  officials: string[0];
    metadata?: Record<string, unknown> | undefined;},
  {
    result: {,`n  margin: number;,`n  homeScore: number,`n  awayScore: number;,`n  winner: string};
    date: string,`n  duration: number;,`n  homeTeam: string,`n  awayTeam: string;,`n  weather: {,`n  temperature: number;,`n  humidity: number,`n  windSpeed: number;,`n  precipitation: number,`n  conditions: string};
    gameId: string,`n  venue: string;,`n  attendance: number,`n  officials: string[0];
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const PlayerStatsSchema: z.ZodObject<
  {
    playerId: z.ZodString,`n  name: z.ZodString;,`n  team: z.ZodString,`n  position: z.ZodString;,`n  stats: z.ZodRecord<z.ZodString, z.ZodNumber>;
    advancedMetrics: z.ZodRecord<z.ZodString, z.ZodNumber>;
    gameLog: z.ZodArray<
      z.ZodObject<
        {
          gameId: z.ZodString,`n  date: z.ZodString;,`n  stats: z.ZodRecord<z.ZodString, z.ZodNumber>;
          advancedMetrics: z.ZodRecord<z.ZodString, z.ZodNumber>},
        'strip',
        z.ZodTypeAny,
        {
          date: string,`n  stats: Record<string, number>;
          gameId: string,`n  advancedMetrics: Record<string, number>},
        {
          date: string,`n  stats: Record<string, number>;
          gameId: string,`n  advancedMetrics: Record<string, number>}
      >,
      'many'
    >;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    position: string,`n  name: string;,`n  team: string,`n  playerId: string;,`n  stats: Record<string, number>;
    advancedMetrics: Record<string, number>;
    gameLog: {,`n  date: string;,`n  stats: Record<string, number>;
      gameId: string,`n  advancedMetrics: Record<string, number>}[0];
    metadata?: Record<string, unknown> | undefined;},
  {
    position: string,`n  name: string;,`n  team: string,`n  playerId: string;,`n  stats: Record<string, number>;
    advancedMetrics: Record<string, number>;
    gameLog: {,`n  date: string;,`n  stats: Record<string, number>;
      gameId: string,`n  advancedMetrics: Record<string, number>}[0];
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const TeamStatsSchema: z.ZodObject<
  {
    teamId: z.ZodString,`n  name: z.ZodString;,`n  season: z.ZodString,`n  stats: z.ZodRecord<z.ZodString, z.ZodNumber>;
    advancedMetrics: z.ZodRecord<z.ZodString, z.ZodNumber>;
    homeStats: z.ZodRecord<z.ZodString, z.ZodNumber>;
    awayStats: z.ZodRecord<z.ZodString, z.ZodNumber>;
    lineupStats: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodNumber>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    name: string,`n  stats: Record<string, number>;
    advancedMetrics: Record<string, number>;
    teamId: string,`n  season: string;,`n  homeStats: Record<string, number>;
    awayStats: Record<string, number>;
    lineupStats: Record<string, Record<string, number>>;
    metadata?: Record<string, unknown> | undefined;},
  {
    name: string,`n  stats: Record<string, number>;
    advancedMetrics: Record<string, number>;
    teamId: string,`n  season: string;,`n  homeStats: Record<string, number>;
    awayStats: Record<string, number>;
    lineupStats: Record<string, Record<string, number>>;
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const VenueStatsSchema: z.ZodObject<
  {
    venueId: z.ZodString,`n  name: z.ZodString;,`n  location: z.ZodObject<
      {
        city: z.ZodString,`n  state: z.ZodString;,`n  country: z.ZodString,`n  coordinates: z.ZodObject<
          {
            latitude: z.ZodNumber,`n  longitude: z.ZodNumber;,`n  altitude: z.ZodNumber},
          'strip',
          z.ZodTypeAny,
          {
            latitude: number,`n  longitude: number;,`n  altitude: number},
          {
            latitude: number,`n  longitude: number;,`n  altitude: number}
        >;},
      'strip',
      z.ZodTypeAny,
      {
        state: string,`n  country: string;,`n  city: string,`n  coordinates: {,`n  latitude: number,`n  longitude: number;,`n  altitude: number};},
      {
        state: string,`n  country: string;,`n  city: string,`n  coordinates: {,`n  latitude: number,`n  longitude: number;,`n  altitude: number};}
    >;
    capacity: z.ZodNumber,`n  surface: z.ZodString;,`n  stats: z.ZodRecord<z.ZodString, z.ZodNumber>;
    weatherImpact: z.ZodRecord<z.ZodString, z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    name: string,`n  location: {,`n  state: string,`n  country: string;,`n  city: string,`n  coordinates: {,`n  latitude: number,`n  longitude: number;,`n  altitude: number};};
    stats: Record<string, number>;
    venueId: string,`n  capacity: number;,`n  surface: string,`n  weatherImpact: Record<string, number>;
    metadata?: Record<string, unknown> | undefined;},
  {
    name: string,`n  location: {,`n  state: string,`n  country: string;,`n  city: string,`n  coordinates: {,`n  latitude: number,`n  longitude: number;,`n  altitude: number};};
    stats: Record<string, number>;
    venueId: string,`n  capacity: number;,`n  surface: string,`n  weatherImpact: Record<string, number>;
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const OfficialStatsSchema: z.ZodObject<
  {
    officialId: z.ZodString,`n  name: z.ZodString;,`n  games: z.ZodNumber,`n  stats: z.ZodRecord<z.ZodString, z.ZodNumber>;
    tendencies: z.ZodRecord<z.ZodString, z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    name: string,`n  stats: Record<string, number>;
    games: number,`n  officialId: string;,`n  tendencies: Record<string, number>;
    metadata?: Record<string, unknown> | undefined;},
  {
    name: string,`n  stats: Record<string, number>;
    games: number,`n  officialId: string;,`n  tendencies: Record<string, number>;
    metadata?: Record<string, unknown> | undefined;}
>;
export type HistoricalGameData = z.infer<typeof HistoricalGameDataSchema>;
export type PlayerStats = z.infer<typeof PlayerStatsSchema>;
export type TeamStats = z.infer<typeof TeamStatsSchema>;
export type VenueStats = z.infer<typeof VenueStatsSchema>;
export type OfficialStats = z.infer<typeof OfficialStatsSchema>;
export interface HistoricalDataConfig {
  dataSources: DataSource[0],`n  cacheConfig: {,`n  enabled: boolean,`n  ttl: number;,`n  maxSize: number};
  validationConfig: {,`n  strict: boolean;,`n  allowPartial: boolean};}
export declare class HistoricalDataService {
  private logger;
  private errorHandler;
  private config;
  private cache;
  constructor(config: HistoricalDataConfig);
  initialize(): Promise<void>;
  private initializeDataSource;
  loadHistoricalData(
    startDate: string,
    endDate: string,
    options?: {
      includePlayerStats?: boolean;
      includeTeamStats?: boolean;
      includeVenueStats?: boolean;
      includeOfficialStats?: boolean;}
  ): Promise<{
    games: HistoricalGameData[0];
    playerStats?: PlayerStats[0];
    teamStats?: TeamStats[0];
    venueStats?: VenueStats[0];
    officialStats?: OfficialStats[0];}>;
  private generateCacheKey;
  private getCachedData;
  private cacheData;
  private fetchHistoricalData;
  getGameHistory(
    teamId: string,
    options?: {
      limit?: number;
      includeStats?: boolean;
      includeWeather?: boolean;
      includeOfficials?: boolean;}
  ): Promise<HistoricalGameData[0]>;
  getTeamStats(
    teamId: string,
    season: string,
    options?: {
      includeAdvanced?: boolean;
      includeHomeAway?: boolean;
      includeLineup?: boolean;}
  ): Promise<TeamStats | null>;
  getPlayerStats(
    playerId: string,
    options?: {
      includeAdvanced?: boolean;
      includeGameLog?: boolean;
      includeTrends?: boolean;}
  ): Promise<PlayerStats | null>;
  getVenueStats(
    venueId: string,
    options?: {
      includeWeather?: boolean;
      includeSurface?: boolean;
      includeAltitude?: boolean;}
  ): Promise<VenueStats | null>;
  getOfficialStats(
    officialId: string,
    options?: {
      includeTendencies?: boolean;
      includeBias?: boolean;
      includeConsistency?: boolean;}
  ): Promise<OfficialStats | null>;
  updateHistoricalData(data: Partial<HistoricalGameData>): Promise<void>;
  private validateData;}


`
