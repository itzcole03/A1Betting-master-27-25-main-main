import {
  HistoricalGameData,
  OfficialStats,
  PlayerStats,
  TeamStats,
  VenueStats,
} from '../../types/historical';
import ApiService from '../api/ApiService';

/**
 * Service to fetch historical game and stats data from backend.
 */
export class HistoricalDataService {
  async loadHistoricalData(
    startDate: string,
    endDate: string,
    options: {
      includePlayerStats?: boolean;
      includeTeamStats?: boolean;
      includeVenueStats?: boolean;
      includeOfficialStats?: boolean;
    } = {}
  ): Promise<{
    games: HistoricalGameData[];
    playerStats?: PlayerStats[];
    teamStats?: TeamStats[];
    venueStats?: VenueStats[];
    officialStats?: OfficialStats[];
  }> {
    return ApiService.get('/api/v1/historical', {
      params: { startDate, endDate, ...options },
    });
  }

  async getGameHistory(
    teamId: string,
    options: { limit?: number; includeStats?: boolean } = {}
  ): Promise<HistoricalGameData[]> {
    return ApiService.get<HistoricalGameData[]>(`/api/v1/historical/games/${teamId}`, {
      params: options,
    });
  }

  async getTeamStats(
    teamId: string,
    season: string,
    options: { includeAdvanced?: boolean } = {}
  ): Promise<TeamStats> {
    return ApiService.get<TeamStats>(`/api/v1/historical/teams/${teamId}`, {
      params: { season, ...options },
    });
  }

  async getPlayerStats(
    playerId: string,
    options: { includeGameLog?: boolean } = {}
  ): Promise<PlayerStats> {
    return ApiService.get<PlayerStats>(`/api/v1/historical/players/${playerId}`, {
      params: options,
    });
  }

  async getVenueStats(
    venueId: string,
    options: { includeWeather?: boolean } = {}
  ): Promise<VenueStats> {
    return ApiService.get<VenueStats>(`/api/v1/historical/venues/${venueId}`, {
      params: options,
    });
  }

  async getOfficialStats(
    officialId: string,
    options: { includeTendencies?: boolean } = {}
  ): Promise<OfficialStats> {
    return ApiService.get<OfficialStats>(`/api/v1/historical/officials/${officialId}`, {
      params: options,
    });
  }
}

export const historicalDataService = new HistoricalDataService();
