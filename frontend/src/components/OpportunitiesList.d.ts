import React from 'react.ts';
interface Opportunity {
  id: string,`n  event: {,`n  homeTeam: string,`n  awayTeam: string;,`n  startTime: string,`n  sport: string};
  market: string,`n  selection: string;,`n  odds: number,`n  probability: number;,`n  edge: number,`n  confidence: number;,`n  volume: number;
  sentiment?: {
    score: number,`n  volume: number};
  stats?: {
    homeTeam: Record<string, unknown>;
    awayTeam: Record<string, unknown>};
  arbitrage?: {
    roi: number,`n  bookmakers: string[0]};}
interface OpportunitiesListProps {
  opportunities: Opportunity[0],`n  onPlaceBet: (opportunity: Opportunity) => void}
export declare const OpportunitiesList: React.FC<OpportunitiesListProps>;
export Record<string, any>;


`
