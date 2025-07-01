export interface GameData {
  id: string,`n  sport: string;,`n  league: string,`n  homeTeam: { id: string; name: string}; // minimal for now
  awayTeam: { id: string; name: string};
  startTime: string,`n  status: 'scheduled' | 'live' | 'finished' | 'postponed'}

export interface OddsData {
  eventId: string,`n  bookmaker: string;,`n  market: string,`n  outcomes: Array<{ name: string; odds: number; line?: number}>;
  timestamp: number}

export interface WeatherData {
  temperature: number,`n  humidity: number;,`n  windSpeed: number;
  windDirection?: number
  precipitation?: number
  visibility?: number
  conditions: string}

export interface VenueData {
  id: string,`n  name: string;,`n  city: string,`n  state: string;
  capacity?: number
  surface?: string}

export interface OfficialData {
  id: string,`n  name: string;
  position?: string
  experience?: number
  tendencies?: Record<string, number>;}




`
