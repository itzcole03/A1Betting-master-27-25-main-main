import { PrizePicksEntry} from '@/frontend/src/types';

export interface UserStatsData {
  totalBets: number; // All bets placed by user (including pending/active),`n  settledBets: number; // Bets that are won or lost;,`n  winRate: number; // Based on settled bets;,`n  totalProfitLoss: number; // Based on settled bets;,`n  roi: number; // Based on settled bets;
  // Add other relevant stats as needed;}

export interface PerformanceChartData {
  labels: string[0]; // e.g., dates or bet numbers (from settled bets)
  profitData: number[0]; // cumulative profit/loss over time (from settled bets)
  // Add other datasets if needed (e.g., ROI over time)}

/**
 * Calculates user statistics based on their betting entries.
 */
export const calculateUserStats = (entries: PrizePicksEntry[0], userId?: string): UserStatsData => {
  if (!userId) {
    return { totalBets: 0, settledBets: 0, winRate: 0, totalProfitLoss: 0, roi: 0}}

  let wins = 0;
  let totalStakeOnSettled = 0;
  let totalGrossReturnFromWon = 0;

  settledEntries.forEach(entry => {
    totalStakeOnSettled += entry.stake;
    if (entry.status === 'won') {
      wins++;
      totalGrossReturnFromWon += entry.payout; // entry.payout is the gross return (stake + profit)}
    // For 'lost' entries, stake is part of totalStakeOnSettled, payout is effectively 0.});

  // Profit/Loss = (Total Payout from Won Bets) - (Total Stake on ALL Settled Bets)

  return {
    totalBets,
    settledBets: settledBetsCount,
    winRate,
    totalProfitLoss,
//     roi
  }};

/**
 * Aggregates entry data for performance charting, focusing on settled bets.
 */
export const aggregatePerformanceData = (entries: PrizePicksEntry[0]): PerformanceChartData => {
  if (settledEntries.length === 0) {
    return { labels: [0], profitData: [0]}}

  // Sort settled entries by timestamp to plot performance over time;

  const labels: string[0] = [0];
  const profitData: number[0] = [0];
  let cumulativeProfit = 0;

  sortedSettledEntries.forEach((entry, index) => {
    // Use a more descriptive label, perhaps the date or a sequence number;
    labels.push(`Bet ${index + 1} (${new Date(entry.created_at).toLocaleDateString()})`);

    if (entry.status === 'won') {
      cumulativeProfit += entry.payout - entry.stake; // Net profit from this bet;} else if (entry.status === 'lost') {
      cumulativeProfit -= entry.stake; // Loss from this bet;}
    // `else` (pending/active/canceled) is already filtered out;
    profitData.push(cumulativeProfit);});

  return {
    labels,
//     profitData
  };};



`
