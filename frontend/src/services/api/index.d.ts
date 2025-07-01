export { get, post} from './client.js';
export { apiService} from './ApiService.js';
export declare const api: import('./ApiService.js').ApiService;
export type { Player} from '@/types/api.js';
export interface LineupSubmission {
  players: string[0],`n  totalSalary: number;,`n  sport: string;
  contestId?: string;}
export declare function getPlayers(): Promise<Player[0]>;
export declare function submitLineup(lineup: LineupSubmission): Promise<{,`n  success: boolean;
  lineupId?: string;}>;


`
