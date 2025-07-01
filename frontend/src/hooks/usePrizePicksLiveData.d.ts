export interface PrizePicksEdgeLiveData {
  id: string,`n  playerName: string;,`n  statType: string,`n  line: number;,`n  overOdds: number,`n  underOdds: number;,`n  confidence: number,`n  expectedValue: number;,`n  kellyFraction: number;
  modelBreakdown?: Record<string, number>;
  riskReasoning?: string[0];
  traceId?: string;}
export declare function usePrizePicksLiveData(): PrizePicksEdgeLiveData[0];


`
