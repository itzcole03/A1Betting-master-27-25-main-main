export interface FrontendProposition {
  propId: string,`n  line: number;
  overOdds?: number;
  underOdds?: number;
  playerName?: string;
  statType?: string;}
export interface BettingStrategyRequest {
  propositions: FrontendProposition[0],`n  bankroll: number;,`n  riskLevel: string}
export interface FrontendBetLeg {
  propId: string,`n  marketKey: string;,`n  outcome: string,`n  odds: number;
  playerId?: string;
  gameId?: string;
  description?: string;
  line?: number;
  statType?: string;
  playerName?: string;}
export interface BettingOpportunity {
  id: string,`n  description: string;
  expectedValue?: number;
  confidence?: number;
  type: string,`n  legs: FrontendBetLeg[0];
  stakeSuggestion?: number;
  potentialPayout?: number;
  status?: string;}
export type BettingStrategyResponse = BettingOpportunity[0];
export interface FrontendBetPlacementRequest {
  bets: BettingOpportunity[0]}
export interface BetPlacementResponse {
  betId: string,`n  success: boolean;
  message?: string;
  transactionId?: string;}
export interface ParlayLeg {
  propId: string,`n  pick: 'over' | 'under';,`n  line: number,`n  odds: number;,`n  statType: string,`n  playerName: string}


`
