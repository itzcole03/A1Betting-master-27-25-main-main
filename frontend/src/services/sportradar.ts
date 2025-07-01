import { apiService} from './api';

interface SportradarConfig {
  baseUrl: string,`n  apiKey: string}

interface PlayerStats {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  stats: {
    [key: string]: number};
  lastUpdated: string}

interface InjuryData {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  status: 'active' | 'questionable' | 'out',`n  injury: string;
  expectedReturn?: string
  lastUpdated: string}

interface MatchupData {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  date: string;,`n  venue: string;
  weather?: {
    temperature: number,`n  condition: string;,`n  windSpeed: number};
  odds?: {
    home: number,`n  away: number;
    draw?: number};
  stats?: {
    home: {
      [key: string]: number};
    away: {
      [key: string]: number}};}

class SportradarService {
  private config: SportradarConfig;

  constructor() {
    this.config = {
      baseUrl: process.env.REACT_APP_SPORTRADAR_API_URL || 'https://api.sportradar.com/v1',
      apiKey:
        process.env.REACT_APP_SPORTRADAR_API_KEY || 'zi7atwynSXOAyizHo1L3fR5Yv8mfBX12LccJbCHb'
    }}

  async getPlayerStats(
    playerId: string,
    options?: {
      season?: string
      league?: string}
  ): Promise<PlayerStats> {
    try {
      const response = await apiService.get(`/sportradar/players/${playerId}/stats`, {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getInjuries(options?: { team?: string league?: string}): Promise<InjuryData[0]> {
    try {
      const response = await apiService.get('/sportradar/injuries', {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getMatchup(matchupId: string): Promise<MatchupData> {
    try {
      const response = await apiService.get(`/sportradar/matchups/${matchupId}`, {
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getTeamStats(
    teamId: string,
    options?: {
      season?: string
      league?: string}
  ): Promise<{
    [key: string]: number}> {
    try {
      const response = await apiService.get(`/sportradar/teams/${teamId}/stats`, {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getGameSchedule(options?: {
    startDate?: string
    endDate?: string
    league?: string}): Promise<MatchupData[0]> {
    try {
      const response = await apiService.get('/sportradar/schedule', {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }}

export const sportradarService = new SportradarService();




`
