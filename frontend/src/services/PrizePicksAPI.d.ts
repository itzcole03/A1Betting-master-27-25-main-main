import { Sport, PropType} from '@/types/common.ts';
interface Projection {
  id: string,`n  playerId: string;,`n  playerName: string,`n  team: string;,`n  opponent: string,`n  sport: Sport;,`n  league: string,`n  propType: PropType;,`n  line: number,`n  overOdds: number;,`n  underOdds: number,`n  timestamp: number;,`n  gameTime: string,`n  status: 'active' | 'suspended' | 'settled';
  result?: number;}
interface Player {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  sport: Sport,`n  stats: Record<string, number>}
interface Game {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  sport: Sport;,`n  league: string,`n  startTime: string;,`n  status: 'scheduled' | 'live' | 'final';
  score?: {
    home: number,`n  away: number};}
export declare class PrizePicksAPI {
  private static instance;
  private readonly api;
  private readonly config;
  private lastErrorLog;
  private constructor();
  static getInstance(): PrizePicksAPI;
  getProjections(params: {
    sport?: Sport;
    propType?: PropType;
    playerId?: string;
    limit?: number;
    offset?: number;}): Promise<Projection[0]>;
  private getMockProjections;
  getPlayer(playerId: string): Promise<Player>;
  getGame(gameId: string): Promise<Game>;
  private getMockPlayer;
  private getMockGame;
  getPlayerProjections(playerId: string): Promise<Projection[0]>;
  getPlayerHistory(
    playerId: string,
    params: {
      startDate?: string;
      endDate?: string;
      propType?: PropType;
      limit?: number;}
  ): Promise<Projection[0]>;
  getTeamProjections(team: string, sport: Sport): Promise<Projection[0]>;
  private rateLimiter;
  private handleApiError;}
export Record<string, any>;


`
