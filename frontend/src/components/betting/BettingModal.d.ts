import React from 'react.ts';
import { BettingStrategy, RiskProfile} from '@/types/betting.ts';
import { Event, Market, Odds, Selection} from '@/types/sports.ts';
interface BettingModalProps {
  isOpen: boolean,`n  onClose: () => void;,`n  event: Event,`n  market: Market;,`n  selection: Selection,`n  odds: Odds;,`n  confidenceScore: number,`n  expectedValue: number;,`n  kellyFraction: number,`n  riskProfile: RiskProfile;,`n  selectedStrategy: BettingStrategy,`n  onStrategyChange: (strategy: BettingStrategy) => void,`n  stake: number;,`n  onStakeChange: (stake: number) => void,`n  onPlaceBet: () => void;,`n  isLoading: boolean,`n  error: string | null}
export declare const BettingModal: React.FC<BettingModalProps>;
export Record<string, any>;


`
