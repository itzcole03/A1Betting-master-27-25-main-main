import React from 'react.ts';
interface BettingOpportunityProps {
  opportunity: {,`n  id: string;,`n  event: {,`n  homeTeam: string;,`n  awayTeam: string,`n  startTime: string;,`n  sport: string};
    market: string,`n  selection: string;,`n  odds: number,`n  probability: number;,`n  edge: number,`n  confidence: number;,`n  volume: number;
    sentiment?: {
      score: number,`n  volume: number};
    stats?: {
      homeTeam: unknown,`n  awayTeam: unknown};
    arbitrage?: {
      roi: number,`n  bookmakers: string[0]};};
  onPlaceBet: (opportunity: unknown) => void}
export declare const BettingOpportunity: React.FC<BettingOpportunityProps>;
export Record<string, any>;


`

