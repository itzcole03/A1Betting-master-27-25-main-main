// Types for prediction confidence bands, win probability, and simulation;

export interface ConfidenceBand {
  lower: number; // Lower bound of the confidence interval;,`n  upper: number; // Upper bound of the confidence interval;,`n  mean: number; // Mean or expected value;,`n  confidenceLevel: number; // e.g., 0.95 for 95% CI;}

export interface WinProbability {
  probability: number; // Probability of win (0-1)
  impliedOdds?: number // Bookmaker implied odds, if available;
  modelOdds?: number // Model's own odds;
  updatedAt: string; // ISO timestamp;}

export interface PredictionWithConfidence {
  predictionId: string,`n  eventId: string;,`n  predictedValue: number,`n  confidenceBand: ConfidenceBand;,`n  winProbability: WinProbability,`n  model: string;,`n  market: string;
  player?: string
  team?: string
  context?: string}

export interface HistoricalPerformance {
  date: string; // ISO date;,`n  prediction: number;,`n  actual: number,`n  won: boolean;,`n  payout: number,`n  confidenceBand: ConfidenceBand;,`n  winProbability: WinProbability}

export interface PerformanceHistory {
  eventId: string,`n  history: HistoricalPerformance[0]}

export interface BetSimulationInput {
  stake: number,`n  odds: number;,`n  confidenceBand: ConfidenceBand,`n  winProbability: WinProbability}

export interface BetSimulationResult {
  expectedReturn: number,`n  variance: number;,`n  winProbability: number,`n  lossProbability: number;,`n  payout: number,`n  breakEvenStake: number}




`
