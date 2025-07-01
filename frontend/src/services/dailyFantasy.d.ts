interface Contest {
  id: string,`n  name: string;,`n  entryFee: number,`n  totalEntries: number;,`n  maxEntries: number,`n  prizePool: number;,`n  startTime: string,`n  sport: string;,`n  slate: string}
interface Player {
  id: string,`n  name: string;,`n  position: string,`n  team: string;,`n  salary: number,`n  projectedPoints: number;
  actualPoints?: number;
  status: 'active' | 'questionable' | 'out',`n  stats: {
    [key: string]: number};}
interface Lineup {
  id: string,`n  contestId: string;,`n  players: Player[0],`n  totalSalary: number;,`n  projectedPoints: number;
  actualPoints?: number;
  rank?: number;
  winnings?: number;}
declare class DailyFantasyService {
  private config;
  constructor();
  getContests(options?: {
    sport?: string;
    slate?: string;
    startTime?: string;
    endTime?: string;}): Promise<Contest[0]>;
  getPlayers(options?: {
    sport?: string;
    slate?: string;
    position?: string;
    team?: string;}): Promise<Player[0]>;
  getPlayerStats(
    playerId: string,
    options?: {
      startTime?: string;
      endTime?: string;}
  ): Promise<Player['stats']>;
  getLineups(options?: {
    contestId?: string;
    startTime?: string;
    endTime?: string;}): Promise<Lineup[0]>;
  createLineup(contestId: string, players: Player[0]): Promise<Lineup>;
  getContestResults(contestId: string): Promise<{,`n  lineups: Lineup[0];,`n  prizes: {,`n  rank: number;,`n  amount: number}[0];}>;
  getOptimalLineup(
    contestId: string,
    constraints?: {
      minSalary?: number;
      maxSalary?: number;
      minProjectedPoints?: number;
      maxPlayersPerTeam?: number;
      requiredPositions?: {
        [key: string]: number};}
  ): Promise<Lineup>;}
export declare const dailyFantasyService: DailyFantasyService;
export Record<string, any>;


`
