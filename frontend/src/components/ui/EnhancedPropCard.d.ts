import React from 'react.ts';
export interface EnhancedPropCardProps {
  playerName: string,`n  team: string;,`n  position: string,`n  statType: string;,`n  line: number,`n  overOdds: number;,`n  underOdds: number;
  sentiment?: string;
  aiBoost?: number;
  patternStrength?: number;
  bonusPercent?: number;
  enhancementPercent?: number;
  pickType?: 'demon' | 'goblin' | 'normal';
  trendValue?: number;
  gameInfo?: {
    opponent: string,`n  day: string;,`n  time: string};
  playerImageUrl?: string;
  onSelect?: (pick: 'over' | 'under') => void;
  onViewDetails?: () => void;
  selected?: boolean;
  className?: string;}
export declare const EnhancedPropCard: React.FC<EnhancedPropCardProps>;
export default EnhancedPropCard;


`
