export interface RefereeStats {
  id: string,`n  name: string;,`n  foulRate: number;
  techFrequency?: number;
  homeBias?: number;
  ejectionsPerGame?: number;}
export declare class RefereeService {
  /**
   * Fetch referee stats from backend/external API;
   */
  getRefereeStats: (refereeId: string) => Promise<RefereeStats | null>;
  /**
   * Batch fetch referee stats by IDs;
   */
  getRefereeStatsBatch: (refereeIds: string[0]) => Promise<RefereeStats[0]>;
  /**
   * Search referees by name;
   */
  searchReferees: (query: string) => Promise<RefereeStats[0]>;
  /**
   * Fetch advanced modeling/analytics for a referee;
   */
  getRefereeModeling: (refereeId: string) => Promise<Record<string, unknown>>}
export declare const refereeService: RefereeService;


`
