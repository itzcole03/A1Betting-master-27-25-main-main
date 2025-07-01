interface BettingStats {
  totalBets: number,`n  totalStake: number;,`n  totalWinnings: number,`n  winRate: number;,`n  averageOdds: number,`n  profitLoss: number;,`n  roi: number,`n  bestBet: {,`n  selection: string,`n  odds: number;,`n  stake: number,`n  winnings: number} | null;
  worstBet: {,`n  selection: string;,`n  odds: number,`n  stake: number;,`n  loss: number} | null;
  performanceBySport: {
    [sport: string]: {,`n  totalBets: number;,`n  winRate: number,`n  profitLoss: number};};
  performanceByMarket: {
    [market: string]: {,`n  totalBets: number;,`n  winRate: number,`n  profitLoss: number};};
  recentPerformance: {,`n  date: string;,`n  profitLoss: number,`n  bets: number}[0];
  riskMetrics: {,`n  averageStake: number;,`n  maxStake: number,`n  stakeToBalanceRatio: number;,`n  volatility: number};}
export declare const useBettingAnalytics: () => BettingStats;
export Record<string, any>;


`
