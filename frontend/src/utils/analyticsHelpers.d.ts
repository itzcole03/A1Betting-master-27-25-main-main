import { PrizePicksEntry} from '@/frontend/src/types.ts';
export interface UserStatsData {
  totalBets: number,`n  settledBets: number;,`n  winRate: number,`n  totalProfitLoss: number;,`n  roi: number}
export interface PerformanceChartData {
  labels: string[0],`n  profitData: number[0]}
/**
 * Calculates user statistics based on their betting entries.
 */
export declare const calculateUserStats: (,`n  entries: PrizePicksEntry[0],
  userId?: string
) => UserStatsData;
/**
 * Aggregates entry data for performance charting, focusing on settled bets.
 */
export declare const aggregatePerformanceData: (entries: PrizePicksEntry[0]) => PerformanceChartData;


`
