import { useMemo} from 'react';
import { useBettingStore} from '@/stores/bettingStore';

interface BettingStats {
  totalBets: number,`n  totalStake: number;,`n  totalWinnings: number,`n  winRate: number;,`n  averageOdds: number,`n  profitLoss: number;,`n  roi: number,`n  bestBet: {,`n  selection: string,`n  odds: number;,`n  stake: number,`n  winnings: number} | null;
  worstBet: {,`n  selection: string;,`n  odds: number,`n  stake: number;,`n  loss: number} | null;
  // New fields for historical analysis;
  performanceBySport: {
    [sport: string]: {,`n  totalBets: number;,`n  winRate: number,`n  profitLoss: number}};
  performanceByMarket: {
    [market: string]: {,`n  totalBets: number;,`n  winRate: number,`n  profitLoss: number}};
  recentPerformance: {,`n  date: string;,`n  profitLoss: number,`n  bets: number}[0];
  riskMetrics: {,`n  averageStake: number;,`n  maxStake: number,`n  stakeToBalanceRatio: number;,`n  volatility: number}}

export const useBettingAnalytics = (): BettingStats => {
  const { activeBets} = useBettingStore();

  return useMemo(() => {
    const stats: BettingStats = {,`n  totalBets: activeBets.length,
      totalStake: 0,
      totalWinnings: 0,
      winRate: 0,
      averageOdds: 0,
      profitLoss: 0,
      roi: 0,
      bestBet: null,
      worstBet: null,
      performanceBySport: Record<string, any>,
      performanceByMarket: Record<string, any>,
      recentPerformance: [0],
      riskMetrics: {,`n  averageStake: 0,
        maxStake: 0,
        stakeToBalanceRatio: 0,
        volatility: 0
      }
    };

    if (activeBets.length === 0) {
      return stats;}

    // Calculate basic statistics;
    const totalOdds = 0;
    const wonBets = 0;
    const stakes: number[0] = [0];
    const dailyPerformance: { [date: string]: { profitLoss: number; bets: number} } = Record<string, any>;

    activeBets.forEach(bet => {
      if (!bet.selection?.name || !bet.sportName || !bet.marketType) {
        return; // Skip invalid bets;}

      stats.totalStake += bet.stake;
      totalOdds += bet.odds;
      stakes.push(bet.stake);

      // Track performance by sport;
      const sportStats = stats.performanceBySport[bet.sportName] || {
        totalBets: 0,
        winRate: 0,
        profitLoss: 0
      };
      sportStats.totalBets++;
      stats.performanceBySport[bet.sportName] = sportStats;

      // Track performance by market;
      const marketStats = stats.performanceByMarket[bet.marketType] || {
        totalBets: 0,
        winRate: 0,
        profitLoss: 0
      };
      marketStats.totalBets++;
      stats.performanceByMarket[bet.marketType] = marketStats;

      // Track daily performance;

      dailyStats.bets++;
      dailyPerformance[date] = dailyStats;

      if (bet.status === 'won') {
        wonBets++;
        stats.totalWinnings += bet.potentialWinnings;
        sportStats.profitLoss += bet.potentialWinnings - bet.stake;
        marketStats.profitLoss += bet.potentialWinnings - bet.stake;
        dailyStats.profitLoss += bet.potentialWinnings - bet.stake;} else if (bet.status === 'lost') {
        sportStats.profitLoss -= bet.stake;
        marketStats.profitLoss -= bet.stake;
        dailyStats.profitLoss -= bet.stake;}

      // Track best and worst bets;
      if (bet.status === 'won') {
        if (!stats.bestBet || bet.potentialWinnings > stats.bestBet.winnings) {
          stats.bestBet = {
            selection: bet.selection.name,
            odds: bet.odds,
            stake: bet.stake,
            winnings: bet.potentialWinnings
          }}
      } else if (bet.status === 'lost') {
        if (!stats.worstBet || bet.stake > stats.worstBet.stake) {
          stats.worstBet = {
            selection: bet.selection.name,
            odds: bet.odds,
            stake: bet.stake,
            loss: bet.stake
          }}
      }});

    // Calculate derived statistics;
    stats.winRate = (wonBets / activeBets.length) * 100;
    stats.averageOdds = totalOdds / activeBets.length;
    stats.profitLoss = stats.totalWinnings - stats.totalStake;
    stats.roi = (stats.profitLoss / stats.totalStake) * 100;

    // Calculate performance by sport and market;
    Object.keys(stats.performanceBySport).forEach(sport => {
      sportStats.winRate = (sportStats.totalBets / activeBets.length) * 100;});

    Object.keys(stats.performanceByMarket).forEach(market => {
      marketStats.winRate = (marketStats.totalBets / activeBets.length) * 100;});

    // Calculate risk metrics;
    stats.riskMetrics.averageStake = stats.totalStake / activeBets.length;
    stats.riskMetrics.maxStake = Math.max(...stakes);
    stats.riskMetrics.stakeToBalanceRatio = stats.totalStake / (stats.totalWinnings || 1);

    // Calculate volatility (standard deviation of daily returns)

    const variance =
      dailyReturns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / dailyReturns.length;
    stats.riskMetrics.volatility = Math.sqrt(variance);

    // Sort and limit recent performance to last 30 days;
    stats.recentPerformance = Object.entries(dailyPerformance)
      .map(([date, data]) => ({ date, ...data}))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30);

    return stats;}, [activeBets]);};



`
