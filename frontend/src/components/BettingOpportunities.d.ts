import React from 'react.ts';
import { BetRecommendation} from '@/types.ts';
interface BettingOpportunitiesProps {
  opportunities: BetRecommendation[0],`n  onBetPlacement: (recommendation: BetRecommendation) => void,`n  alerts: Array<{,`n  type: string,`n  severity: string;,`n  message: string,`n  metadata: Record<string, unknown>}>;
  isLoading: boolean}
export declare const BettingOpportunities: React.FC<BettingOpportunitiesProps>;
export Record<string, any>;


`
