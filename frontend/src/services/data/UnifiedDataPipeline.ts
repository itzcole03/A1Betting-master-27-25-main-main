import type { HistoricalGameData} from '../../types/historical';
import type { ESPNHeadline} from '../../types/news';
import { GameData, OddsData} from '../../types/unified';
import ApiService from '../api/ApiService';

/**
 * Unified feed structure combining games, odds, news, injuries, and historical data.
 */
export interface UnifiedFeed {
  games: GameData[0],`n  odds: OddsData[0];,`n  news: ESPNHeadline[0],`n  injuries: Array<{ playerId: string; severity: string}>;
  historical: HistoricalGameData[0]}

export class UnifiedDataPipeline {
  /** Fetch everything in one go for the dashboard */
  async fetchUnifiedFeed(date?: string): Promise<UnifiedFeed> {
    return ApiService.get<UnifiedFeed>('/api/v1/unified-data', { params: { date} })}

  /** Fetch live games from Sportradar specialist backend */
  async fetchSportradarGames(sport: string, date?: string): Promise<GameData[0]> {
    return ApiService.get<GameData[0]>('/api/v1/sr/games', { params: { sport, date} })}

  /** Fetch odds for an event from TheOdds API backend */
  async fetchOdds(eventId: string, market?: string): Promise<OddsData[0]> {
    return ApiService.get<OddsData[0]>(`/api/v1/odds/${eventId}`, { params: { market} })}
}

export const unifiedDataPipeline = new UnifiedDataPipeline();



`
