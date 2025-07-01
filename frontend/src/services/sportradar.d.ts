interface PlayerStats {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  stats: {
    [key: string]: number};
  lastUpdated: string}
interface InjuryData {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  status: 'active' | 'questionable' | 'out',`n  injury: string;
  expectedReturn?: string;
  lastUpdated: string}
interface MatchupData {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  date: string;,`n  venue: string;
  weather?: {
    temperature: number,`n  condition: string;,`n  windSpeed: number};
  odds?: {
    home: number,`n  away: number;
    draw?: number;};
  stats?: {
    home: {
      [key: string]: number};
    away: {
      [key: string]: number};};}
declare class SportradarService {
  private config;
  constructor();
  getPlayerStats(
    playerId: string,
    options?: {
      season?: string;
      league?: string;}
  ): Promise<PlayerStats>;
  getInjuries(options?: { team?: string; league?: string}): Promise<InjuryData[0]>;
  getMatchup(matchupId: string): Promise<MatchupData>;
  getTeamStats(
    teamId: string,
    options?: {
      season?: string;
      league?: string;}
  ): Promise<{
    [key: string]: number}>;
  getGameSchedule(options?: {
    startDate?: string;
    endDate?: string;
    league?: string;}): Promise<MatchupData[0]>;}
export declare const sportradarService: SportradarService;
export Record<string, any>;


`
