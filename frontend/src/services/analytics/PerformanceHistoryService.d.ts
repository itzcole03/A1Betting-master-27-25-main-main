import type { UserPerformanceHistory, ModelPerformanceHistory} from '@/types/history.ts';
export declare class PerformanceHistoryService {
  private static instance;
  private userHistories;
  private modelHistories;
  private constructor();
  static getInstance(): PerformanceHistoryService;
  getUserHistory(userId: string): UserPerformanceHistory | undefined;
  getModelHistory(model: string, market: string): ModelPerformanceHistory | undefined;
  addUserHistoryEntry(userId: string, entry: UserPerformanceHistory['entries'][0]): void;
  addModelHistoryEntry(
    model: string,
    market: string,
    entry: ModelPerformanceHistory['entries'][0]
  ): void;
  getUserStats(userId: string): {,`n  wins: number;,`n  losses: number,`n  roi: number} | null;}


`
