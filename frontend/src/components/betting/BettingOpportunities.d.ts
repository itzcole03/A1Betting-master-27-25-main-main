import React from 'react.ts';
import { BetRecommendation, BettingAlert, BettingOpportunity} from '@/types/betting.ts';
interface BettingOpportunitiesProps {
  opportunities: (BetRecommendation | BettingOpportunity)[0],`n  onBetPlacement: (opportunity: BetRecommendation | BettingOpportunity) => void,`n  alerts: BettingAlert[0];,`n  isLoading: boolean}
export declare const BettingOpportunities: React.FC<BettingOpportunitiesProps>;
export Record<string, any>;


`
