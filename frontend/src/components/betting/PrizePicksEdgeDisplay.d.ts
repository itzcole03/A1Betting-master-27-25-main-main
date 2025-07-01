import React from 'react.ts';
export interface PrizePicksEdgeDisplayProps {
  id: string,`n  playerName: string;,`n  statType: string,`n  line: number;,`n  overOdds: number,`n  underOdds: number;,`n  confidence: number,`n  expectedValue: number;,`n  kellyFraction: number;
  modelBreakdown?: Record<string, number>;
  riskReasoning?: string[0];
  traceId?: string;
  showDebug?: boolean;}
export declare const PrizePicksEdgeDisplay: React.FC<PrizePicksEdgeDisplayProps>;


`
