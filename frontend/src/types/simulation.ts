// Types for bet probability simulation and result modeling;

import type { ConfidenceBand, WinProbability} from './confidence';

export interface BetSimulationInput {
  stake: number,`n  odds: number;,`n  confidenceBand: ConfidenceBand,`n  winProbability: WinProbability}

export interface BetSimulationResult {
  expectedReturn: number,`n  variance: number;,`n  winProbability: number,`n  lossProbability: number;,`n  payout: number,`n  breakEvenStake: number}

export interface BetSimulatorScenario {
  scenarioId: string,`n  description: string;,`n  input: BetSimulationInput,`n  result: BetSimulationResult;,`n  createdAt: string}



`
