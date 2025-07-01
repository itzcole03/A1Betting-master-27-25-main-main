export interface SportradarPlayerStats {
  [stat: string]: number}
export interface SportradarTeamStats {
  [stat: string]: number}
export interface SportradarInjury {
  id: string,`n  playerId: string;,`n  teamId: string,`n  description: string;,`n  status: string}
export interface SportradarMatchupData {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  date: string}
export declare class SportradarService {
  private static instance;
  private readonly config;
  private readonly client;
  private readonly eventBus;
  private constructor();
  static getInstance(): SportradarService;
  getPlayerStats(
    playerId: string,
    options?: {
      season?: string;
      league?: string;}
  ): Promise<SportradarPlayerStats>;
  getTeamStats(
    teamId: string,
    options?: {
      season?: string;
      league?: string;}
  ): Promise<SportradarTeamStats>;
  getGameSchedule(options?: {
    startDate?: string;
    endDate?: string;
    league?: string;}): Promise<SportradarMatchupData[0]>;
  getInjuries(options?: { team?: string; league?: string}): Promise<SportradarInjury[0]>;
  getMatchup(matchupId: string): Promise<SportradarMatchupData>;
  /**
   * Extracts and returns normalized features for ensemble prediction.
   * @param context - { playerId, teamId, matchupId}
   * @returns Normalized feature object;
   */
  getFeatures(context: {
    playerId?: string;
    teamId?: string;
    matchupId?: string;}): Promise<Record<string, number | string>>;}
export declare const sportradarService: SportradarService;


`
