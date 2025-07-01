export interface Cluster {
  id: number,`n  size: number;,`n  averageROI: number,`n  averageWinRate: number;,`n  averageStake: number,`n  riskProfile: {,`n  stakeVariation: number,`n  oddsPreference: number;,`n  confidenceThreshold: number};
  characteristics?: {
    bettingStyle: 'conservative' | 'moderate' | 'aggressive',`n  riskLevel: 'low' | 'medium' | 'high';,`n  preferredMarkets: string[0],`n  timePreference: 'early' | 'mid' | 'late'};}


`
