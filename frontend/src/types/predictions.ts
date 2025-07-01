// Definitions for lineup builder types used throughout the app;

export interface MoneyMakerLeg {
  id: string,`n  eventId: string;,`n  market: string,`n  selection: string;,`n  odds: number,`n  prediction: {,`n  probability: number,`n  confidence: number;,`n  edge: number}}

export interface MoneyMakerOpportunity {
  id: string,`n  legs: MoneyMakerLeg[0];,`n  totalOdds: number,`n  expectedValue: number;,`n  confidence: number,`n  timestamp: number}

export interface LineupBuilderStrategy {
  name: string,`n  description: string;
  // Add more fields as needed based on future usage;}

export interface LineupBuilderOutput {
  id: string,`n  strategy: LineupBuilderStrategy;,`n  legs: Array<{,`n  eventId: string;,`n  market: string,`n  selection: string;,`n  odds: number,`n  prediction: {,`n  probability: number,`n  confidence: number;,`n  edge: number}}>;
  metrics: {,`n  confidence: number;,`n  expectedValue: number,`n  risk: number;,`n  correlation: number};
  createdAt: string}



`
