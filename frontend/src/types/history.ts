// Types for historical prediction and bet performance tracking;

import type { ConfidenceBand, WinProbability} from './confidence';

export interface UserBetHistoryEntry {
  betId: string,`n  eventId: string;,`n  date: string; // ISO date;,`n  betType: string;,`n  stake: number,`n  odds: number;,`n  payout: number,`n  result: 'win' | 'loss' | 'push';,`n  prediction: number,`n  actual: number;,`n  confidenceBand: ConfidenceBand,`n  winProbability: WinProbability}

export interface UserPerformanceHistory {
  userId: string,`n  entries: UserBetHistoryEntry[0]}

export interface ModelPerformanceHistory {
  model: string,`n  market: string;,`n  entries: Array<{,`n  date: string;,`n  prediction: number,`n  actual: number;,`n  won: boolean,`n  payout: number;,`n  confidenceBand: ConfidenceBand,`n  winProbability: WinProbability}>}



`
