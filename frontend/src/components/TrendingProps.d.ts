import React from 'react.ts';
interface TrendingProp {
  id: string,`n  playerName: string;,`n  team: string,`n  propType: string;,`n  value: number,`n  direction: 'over' | 'under';
  modifier?: 'goblin' | 'devil';
  confidence: number,`n  fireCount: number;,`n  communityStats: {,`n  likes: number;,`n  comments: number,`n  shares: number};
  topComment?: {
    user: string;
    avatar?: string;
    text: string,`n  likes: number};}
interface TrendingPropsProps {
  props: TrendingProp[0],`n  onPropSelect: (propId: string) => void}
export declare const TrendingProps: React.FC<TrendingPropsProps>;
export Record<string, any>;


`
