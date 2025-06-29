import type { ESPNHeadline } from '../../types/news';
import ApiService from '../api/ApiService';

// Define interfaces for the data we expect from the backend.
// These should align with the backend's API response models.

export interface PlayerStats {
  // Define structure based on backend response
  playerId: string;
  stats: Record<string, any>;
}

export interface GameOdds {
  // Define structure based on backend response
  gameId: string;
  odds: any[];
}

export interface InjuryReport {
  // Define structure based on backend response
  playerId: string;
  report: any;
}

class DataIntegrationService {

  /**
   * Fetches news headlines from the backend.
   * @param source - The source of the news (e.g., 'espn').
   * @param limit - The number of headlines to fetch.
   * @returns A promise that resolves with an array of news headlines.
   */
  public async getNews(source: string, limit: number): Promise<ESPNHeadline[]> {
    try {
      const headlines = await ApiService.get<ESPNHeadline[]>('/api/v1/data/news', {
        params: { source, limit },
      });
      return headlines;
    } catch (error) {
      console.error('Error fetching news headlines:', error);
      return []; // Return empty array on error
    }
  }

  /**
   * Fetches player stats from the backend.
   * @param playerId - The ID of the player.
   * @returns A promise that resolves with the player's stats.
   */
  public async getPlayerStats(playerId: string): Promise<PlayerStats | null> {
    try {
      const stats = await ApiService.get<PlayerStats>(`/api/v1/data/stats/player/${playerId}`);
      return stats;
    } catch (error) {
      console.error(`Error fetching stats for player ${playerId}:`, error);
      return null;
    }
  }

  /**
   * Fetches game odds from the backend.
   * @param gameId - The ID of the game.
   * @returns A promise that resolves with the game's odds.
   */
  public async getGameOdds(gameId: string): Promise<GameOdds | null> {
    try {
      const odds = await ApiService.get<GameOdds>(`/api/v1/data/odds/game/${gameId}`);
      return odds;
    } catch (error) {
      console.error(`Error fetching odds for game ${gameId}:`, error);
      return null;
    }
  }

  /**
   * Fetches injury reports from the backend.
   * @param team - The team to get injury reports for (optional).
   * @returns A promise that resolves with an array of injury reports.
   */
  public async getInjuryReports(team?: string): Promise<InjuryReport[]> {
    try {
      const reports = await ApiService.get<InjuryReport[]>('/api/v1/data/injuries', { team });
      return reports;
    } catch (error) {
      console.error('Error fetching injury reports:', error);
      return [];
    }
  }
}

export const dataIntegrationService = new DataIntegrationService();
