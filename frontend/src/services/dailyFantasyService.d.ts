interface DailyFantasyPlayer {
  id: string,`n  name: string;,`n  position: string,`n  team: string;,`n  salary: number,`n  projectedPoints: number;
  actualPoints?: number;
  status: 'active' | 'inactive' | 'questionable'}
interface DailyFantasyContest {
  id: string,`n  name: string;,`n  sport: string,`n  startTime: string;,`n  entryFee: number,`n  totalEntries: number;,`n  maxEntries: number,`n  prizePool: number;,`n  status: 'upcoming' | 'live' | 'completed'}
interface DailyFantasyLineup {
  id: string,`n  contestId: string;,`n  players: DailyFantasyPlayer[0],`n  totalSalary: number;,`n  projectedPoints: number;
  actualPoints?: number;
  rank?: number;}
declare class DailyFantasyService {
  private api;
  getContests(sport: string): Promise<DailyFantasyContest[0]>;
  getPlayers(contestId: string): Promise<DailyFantasyPlayer[0]>;
  getPlayerProjections(playerId: string): Promise<number>;
  getOptimalLineup(contestId: string, strategy: string): Promise<DailyFantasyLineup>;
  getContestResults(contestId: string): Promise<DailyFantasyLineup[0]>;
  getPlayerStats(playerId: string, timeframe: string): Promise<any>;
  getContestTrends(contestId: string): Promise<any>;
  getPlayerOwnership(contestId: string): Promise<Record<string, number>>;
  getSalaryChanges(contestId: string): Promise<Record<string, number>>}
export declare const dailyFantasyService: DailyFantasyService;
export Record<string, any>;


`
