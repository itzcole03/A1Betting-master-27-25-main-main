import React from 'react.ts';
interface BettingOpportunity {
  id: string,`n  description: string;,`n  odds: number,`n  confidence: number;,`n  expectedValue: number,`n  kellySize: number;,`n  models: string[0]}
interface UltimateMoneyMakerProps {
  opportunities: BettingOpportunity[0],`n  onPlaceBet: (opportunity: BettingOpportunity) => Promise<void>}
export declare const UltimateMoneyMaker: React.FC<Omit<UltimateMoneyMakerProps, 'predictions'>>;
export Record<string, any>;


`
