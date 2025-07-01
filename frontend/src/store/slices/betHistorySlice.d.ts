import type {
  UserBetHistoryEntry,
  UserPerformanceHistory,
//   ModelPerformanceHistory
} from '@/types/history.ts';
interface BetHistoryState {
  userHistory: UserPerformanceHistory | null,`n  setUserHistory: (history: UserPerformanceHistory) => void,`n  addUserEntry: (entry: UserBetHistoryEntry) => void,`n  modelHistory: ModelPerformanceHistory[0];,`n  setModelHistory: (history: ModelPerformanceHistory[0]) => void,`n  addModelHistory: (history: ModelPerformanceHistory) => void,`n  clear: () => void}
export declare const useBetHistoryStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<BetHistoryState>
>;
export Record<string, any>;


`
