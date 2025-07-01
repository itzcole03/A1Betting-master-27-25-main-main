import { EventEmitter} from 'eventemitter3.ts';
export interface GameData {
  id: string,`n  sport: string;,`n  league: string,`n  homeTeam: TeamData;,`n  awayTeam: TeamData,`n  startTime: string;,`n  status: 'scheduled' | 'live' | 'finished' | 'postponed';
  venue?: VenueData;
  weather?: WeatherData;
  officials?: OfficialData[0];}
export interface TeamData {
  id: string,`n  name: string;,`n  abbreviation: string,`n  city: string;
  conference?: string;
  division?: string;
  record: {,`n  wins: number;,`n  losses: number;
    ties?: number;};
  stats: TeamStats,`n  injuries: InjuryData[0];,`n  recentForm: number[0],`n  eloRating: number}
export interface PlayerData {
  id: string,`n  name: string;,`n  position: string,`n  teamId: string;,`n  jersey: number,`n  stats: PlayerStats;,`n  recentPerformance: PerformanceData[0],`n  injuries: InjuryData[0];
  salaryInfo?: {
    draftKings?: number;
    fanduel?: number;
    prizePicks?: number;};}
export interface TeamStats {
  offensiveRating: number,`n  defensiveRating: number;,`n  pace: number,`n  netRating: number;,`n  homeAdvantage: number,`n  awayPerformance: number;,`n  recentForm: number,`n  strengthOfSchedule: number}
export interface PlayerStats {
  gamesPlayed: number,`n  averages: Record<string, number>;
  per36: Record<string, number>;
  advanced: Record<string, number>;
  seasonTotals: Record<string, number>;
  last5Games: Record<string, number>;
  last10Games: Record<string, number>;
  vsOpponent: Record<string, number>}
export interface PerformanceData {
  gameId: string,`n  date: string;,`n  opponent: string,`n  stats: Record<string, number>;
  minutesPlayed: number,`n  efficiency: number}
export interface InjuryData {
  playerId: string,`n  type: string;,`n  severity: 'minor' | 'moderate' | 'major' | 'season-ending',`n  status: 'questionable' | 'doubtful' | 'out' | 'day-to-day';
  expectedReturn?: string;
  impact: number}
export interface OddsData {
  eventId: string,`n  bookmaker: string;,`n  market: string,`n  outcomes: Array<{,`n  name: string,`n  odds: number;
    line?: number;}>;
  timestamp: number;
  volume?: number;
  sharpMoney?: number;}
export interface LineMovement {
  eventId: string,`n  market: string;,`n  history: Array<{,`n  timestamp: number;,`n  line: number,`n  odds: number;,`n  volume: number}>;}
export interface VenueData {
  id: string,`n  name: string;,`n  city: string,`n  state: string;,`n  capacity: number;
  surface?: string;
  elevation?: number;
  advantages: Record<string, number>}
export interface WeatherData {
  temperature: number,`n  humidity: number;,`n  windSpeed: number,`n  windDirection: number;,`n  precipitation: number,`n  visibility: number;,`n  conditions: string}
export interface OfficialData {
  id: string,`n  name: string;,`n  position: string,`n  experience: number;,`n  tendencies: Record<string, number>}
export interface MarketData {
  eventId: string,`n  market: string;,`n  currentOdds: OddsData[0],`n  lineMovement: LineMovement;,`n  volume: number,`n  sharpMoney: number;,`n  publicBetting: {,`n  percentage: number;,`n  tickets: number,`n  money: number};}
export declare class UnifiedDataPipeline extends EventEmitter {
  private static instance;
  private cache;
  private rateLimiter;
  private requestQueue;
  private activeConnections;
  private refreshIntervals;
  private constructor();
  static getInstance(): UnifiedDataPipeline;
  private initializeConnections;
  private startRealTimeStreams;
  private startOddsStream;
  private startLiveGamesStream;
  private startInjuryUpdates;
  getGameData(gameId: string): Promise<GameData>;
  getPlayerData(playerId: string): Promise<PlayerData>;
  getLiveOdds(eventId: string, market?: string): Promise<OddsData[0]>;
  getPrizePicksProjections(): Promise<any[0]>;
  getInjuries(sport: string): Promise<InjuryData[0]>;
  getWeatherData(venueId: string): Promise<WeatherData | null>;
  private fetchGameFromSportradar;
  private fetchPlayerFromSportradar;
  private fetchOddsFromTheOddsApi;
  private fetchPrizePicksProjections;
  private fetchInjuries;
  private fetchWeatherData;
  private transformSportradarGame;
  private transformSportradarPlayer;
  private transformTeamData;
  private transformPlayerStats;
  private transformVenueData;
  private transformOddsData;
  private transformInjuryData;
  private transformWeatherData;
  private getActiveGames;
  private getLiveGames;
  private fetchLiveOdds;
  private fetchLiveGameData;
  clearCache(): void;
  getCacheStats(): {
    size: number,`n  hitRate: number};
  getConnectionStatus(): Record<string, boolean>;
  refreshAllData(): Promise<void>;
  private refreshGames;
  private refreshOdds;
  private refreshInjuries;
  shutdown(): void;}
export declare const dataPipeline: UnifiedDataPipeline;
export type {
  GameData,
  TeamData,
  PlayerData,
  OddsData,
  InjuryData,
  MarketData,
  WeatherData,
//   LineMovement
};


`
