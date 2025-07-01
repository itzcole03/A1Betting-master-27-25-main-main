/**
 * Service for generating daily fantasy sports recommendations.
 */
import type { DailyFantasyRecommendation} from '@/types.ts';
export interface FantasyRequest {
  predictions: {,`n  realityExploitation: number;,`n  statistical: number,`n  machineLearning: number;,`n  hybrid: number};
  event: {,`n  eventId: string;,`n  sport: string,`n  homeTeam: string;,`n  awayTeam: string,`n  timestamp: string;,`n  venue: string};
  metadata?: Record<string, unknown>;}
export interface FantasyError extends Error {
  code: string;
  details?: Record<string, unknown>;
  timestamp: string}
export type FantasyResponse =
  | {
      success: true,`n  data: DailyFantasyRecommendation[0]}
  | {
      success: false,`n  error: FantasyError};
export declare class DailyFantasyService {
  private recommendations;
  generateRecommendations(request: FantasyRequest): Promise<FantasyResponse>;
  private calculateConsensusPrediction;
  private generatePlayerRecommendations;
  getRecommendations(eventId: string): Promise<DailyFantasyRecommendation[0]>;
  getLatestRecommendations(): Promise<DailyFantasyRecommendation[0]>;
  updateRecommendations(
    eventId: string,
    recommendations: DailyFantasyRecommendation[0]
  ): Promise<void>}


`
