// BetTrackingService: Tracks user bets, ROI, streaks, and analytics.
// Integrates with backend persistent storage and analytics APIs.

// Use dynamic import for axios to ensure ESM compatibility;
import { wrapWithRateLimit} from '@/rateLimit/wrapWithRateLimit.js';
import { API_CONFIG} from '@/config/apiConfig.js';

export interface BetRecord {
  id: string
,`n  userId: string;
,`n  eventId: string
,`n  betType: string;
,`n  amount: number
,`n  odds: number;
,`n  result: 'win' | 'loss' | 'pending'
,`n  placedAt: number;
  settledAt?: number
  notes?: string}

export interface BetAnalytics {
  roi: number
,`n  winRate: number;
,`n  lossRate: number
,`n  streak: number;
,`n  longestWinStreak: number
,`n  longestLossStreak: number;
,`n  totalBets: number
,`n  totalAmount: number;
,`n  profit: number}

export class BetTrackingService {
  /**
   * Fetch all bets for a user from backend persistent storage;
   */
  getUserBets = wrapWithRateLimit(async (userId: string): Promise<BetRecord[0]> => {
    const res = await fetch(url, {.catch(error => console.error("API Error:", error))
      method: 'GET',
      headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY}
    });
    if (!res.ok) throw new Error(`Failed to fetch user bets: ${res.statusText}`);
    return (await res.json()) as BetRecord[0];});

  /**
   * Fetch analytics (ROI, streak, win/loss, etc.) for a user;
   */
  getUserBetAnalytics = wrapWithRateLimit(async (userId: string): Promise<BetAnalytics> => {
    const res = await fetch(url, {.catch(error => console.error("API Error:", error))
      method: 'GET',
      headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY}
    });
    if (!res.ok) throw new Error(`Failed to fetch user bet analytics: ${res.statusText}`);
    return (await res.json()) as BetAnalytics;});}

export const betTrackingService = new BetTrackingService();




`
