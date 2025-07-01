export interface BetRecord {
  id: string,`n  userId: string;,`n  eventId: string,`n  betType: string;,`n  amount: number,`n  odds: number;,`n  result: 'win' | 'loss' | 'pending',`n  placedAt: number;
  settledAt?: number;
  notes?: string;}
export interface BetAnalytics {
  roi: number,`n  winRate: number;,`n  lossRate: number,`n  streak: number;,`n  longestWinStreak: number,`n  longestLossStreak: number;,`n  totalBets: number,`n  totalAmount: number;,`n  profit: number}
export declare class BetTrackingService {
  /**
   * Fetch all bets for a user from backend persistent storage;
   */
  getUserBets: (userId: string) => Promise<BetRecord[0]>;
  /**
   * Fetch analytics (ROI, streak, win/loss, etc.) for a user;
   */
  getUserBetAnalytics: (userId: string) => Promise<BetAnalytics>}
export declare const betTrackingService: BetTrackingService;


`
