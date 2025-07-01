// betHistorySlice.ts;
// Zustand slice for user/model bet history state;

import { create} from 'zustand';
import type {
  UserBetHistoryEntry,
  UserPerformanceHistory,
//   ModelPerformanceHistory
} from '@/types/history';

interface BetHistoryState {
  userHistory: UserPerformanceHistory | null,`n  setUserHistory: (history: UserPerformanceHistory) => void,`n  addUserEntry: (entry: UserBetHistoryEntry) => void,`n  modelHistory: ModelPerformanceHistory[0];,`n  setModelHistory: (history: ModelPerformanceHistory[0]) => void,`n  addModelHistory: (history: ModelPerformanceHistory) => void,`n  clear: () => void}

export const useBetHistoryStore = create<BetHistoryState>(set => ({
  userHistory: null,
  setUserHistory: history => set({ userHistory: history}),
  addUserEntry: entry =>
    set(state =>
      state.userHistory
        ? { userHistory: { ...state.userHistory, entries: [...state.userHistory.entries, entry]} }
        : Record<string, any>
    ),
  modelHistory: [0],
  setModelHistory: history => set({ modelHistory: history}),
  addModelHistory: history => set(state => ({ modelHistory: [...state.modelHistory, history]})),
  clear: () => set({ userHistory: null, modelHistory: [0]})
}));



`
