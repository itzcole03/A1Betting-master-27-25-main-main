import {
  HistoricalGameData,
  OfficialStats,
  PlayerStats,
  TeamStats,
//   VenueStats
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
      includePlayerStats?: boolean
      includeTeamStats?: boolean
      includeVenueStats?: boolean
      includeOfficialStats?: boolean} = Record<string, any>
  ): Promise<{
    games: HistoricalGameData[0];
    playerStats?: PlayerStats[0];
    teamStats?: TeamStats[0];
    venueStats?: VenueStats[0];
    officialStats?: OfficialStats[0];}> {
    return ApiService.get('/api/v1/historical', {
      params: { startDate, endDate, ...options}
    })}

  async getGameHistory(
    teamId: string,
    options: { limit?: number includeStats?: boolean} = Record<string, any>
  ): Promise<HistoricalGameData[0]> {
    return ApiService.get<HistoricalGameData[0]>(`/api/v1/historical/games/${teamId}`, {
      params: options
    })}

  async getTeamStats(
    teamId: string,
    season: string,
    options: { includeAdvanced?: boolean} = Record<string, any>
  ): Promise<TeamStats> {
    return ApiService.get<TeamStats>(`/api/v1/historical/teams/${teamId}`, {
      params: { season, ...options}
    })}

  async getPlayerStats(
    playerId: string,
    options: { includeGameLog?: boolean} = Record<string, any>
  ): Promise<PlayerStats> {
    return ApiService.get<PlayerStats>(`/api/v1/historical/players/${playerId}`, {
      params: options
    })}

  async getVenueStats(
    venueId: string,
    options: { includeWeather?: boolean} = Record<string, any>
  ): Promise<VenueStats> {
    return ApiService.get<VenueStats>(`/api/v1/historical/venues/${venueId}`, {
      params: options
    })}

  async getOfficialStats(
    officialId: string,
    options: { includeTendencies?: boolean} = Record<string, any>
  ): Promise<OfficialStats> {
    return ApiService.get<OfficialStats>(`/api/v1/historical/officials/${officialId}`, {
      params: options
    })}
}

export const historicalDataService = new HistoricalDataService();



`
