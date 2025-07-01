export interface HistoricalGameData {
  gameId: string,`n  date: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  venue: string,`n  result: {,`n  homeScore: number,`n  awayScore: number;,`n  winner: string,`n  margin: number};
  weather: {,`n  temperature: number;,`n  humidity: number,`n  windSpeed: number;,`n  precipitation: number,`n  conditions: string};
  attendance: number,`n  duration: number;,`n  officials: string[0];
  metadata?: Record<string, unknown>;}

export interface PlayerStats {
  playerId: string,`n  name: string;,`n  team: string,`n  position: string;,`n  stats: Record<string, number>;
  advancedMetrics: Record<string, number>;
  gameLog: {,`n  gameId: string;,`n  date: string,`n  stats: Record<string, number>;
    advancedMetrics: Record<string, number>}[0];
  metadata?: Record<string, unknown>;}

export interface TeamStats {
  teamId: string,`n  name: string;,`n  season: string,`n  stats: Record<string, number>;
  advancedMetrics: Record<string, number>;
  homeStats: Record<string, number>;
  awayStats: Record<string, number>;
  lineupStats: Record<string, Record<string, number>>;
  metadata?: Record<string, unknown>;}

export interface VenueStats {
  venueId: string,`n  name: string;,`n  location: {,`n  city: string;,`n  state: string,`n  country: string;,`n  coordinates: {,`n  latitude: number;,`n  longitude: number,`n  altitude: number}};
  capacity: number,`n  surface: string;,`n  stats: Record<string, number>;
  weatherImpact: Record<string, number>;
  metadata?: Record<string, unknown>;}

export interface OfficialStats {
  officialId: string,`n  name: string;,`n  games: number,`n  stats: Record<string, number>;
  tendencies: Record<string, number>;
  metadata?: Record<string, unknown>;}



`
