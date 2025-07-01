import { apiService} from './api';

interface DailyFantasyConfig {
  baseUrl: string,`n  apiKey: string}

interface Contest {
  id: string,`n  name: string;,`n  entryFee: number,`n  totalEntries: number;,`n  maxEntries: number,`n  prizePool: number;,`n  startTime: string,`n  sport: string;,`n  slate: string}

interface Player {
  id: string,`n  name: string;,`n  position: string,`n  team: string;,`n  salary: number,`n  projectedPoints: number;
  actualPoints?: number
  status: 'active' | 'questionable' | 'out',`n  stats: {
    [key: string]: number}}

interface Lineup {
  id: string,`n  contestId: string;,`n  players: Player[0],`n  totalSalary: number;,`n  projectedPoints: number;
  actualPoints?: number
  rank?: number
  winnings?: number}

class DailyFantasyService {
  private config: DailyFantasyConfig;

  constructor() {
    this.config = {
      baseUrl: import.meta.env.VITE_DAILY_FANTASY_API_URL || 'https://api.dailyfantasy.com/v1',
      apiKey: import.meta.env.VITE_DAILY_FANTASY_API_KEY || 'f3ac5a9c-cf01-4dc8-8edb-c02bf6c31a4d'
    }}

  async getContests(options?: {
    sport?: string
    slate?: string
    startTime?: string
    endTime?: string}): Promise<Contest[0]> {
    try {
      const response = await apiService.get('/daily-fantasy/contests', {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getPlayers(options?: {
    sport?: string
    slate?: string
    position?: string
    team?: string}): Promise<Player[0]> {
    try {
      const response = await apiService.get('/daily-fantasy/players', {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getPlayerStats(
    playerId: string,
    options?: {
      startTime?: string
      endTime?: string}
  ): Promise<Player['stats']> {
    try {
      const response = await apiService.get(`/daily-fantasy/players/${playerId}/stats`, {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getLineups(options?: {
    contestId?: string
    startTime?: string
    endTime?: string}): Promise<Lineup[0]> {
    try {
      const response = await apiService.get('/daily-fantasy/lineups', {
        params: options,
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async createLineup(contestId: string, players: Player[0]): Promise<Lineup> {
    try {
      const response = await apiService.post(
        '/daily-fantasy/lineups',
        {
          contestId,
//           players
        },
        {
          headers: {
            'X-API-Key': this.config.apiKey
          }
        }
      );
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getContestResults(contestId: string): Promise<{,`n  lineups: Lineup[0];,`n  prizes: {,`n  rank: number;,`n  amount: number}[0]}> {
    try {
      const response = await apiService.get(`/daily-fantasy/contests/${contestId}/results`, {
        headers: {
          'X-API-Key': this.config.apiKey
        }
      });
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getOptimalLineup(
    contestId: string,
    constraints?: {
      minSalary?: number
      maxSalary?: number
      minProjectedPoints?: number
      maxPlayersPerTeam?: number
      requiredPositions?: { [key: string]: number}}
  ): Promise<Lineup> {
    try {
      const response = await apiService.post(
        `/daily-fantasy/contests/${contestId}/optimal-lineup`,
        {
          constraints
        },
        {
          headers: {
            'X-API-Key': this.config.apiKey
          }
        }
      );
      return response.data;} catch (error) {
      // console statement removed
      throw error;}
  }}

export const dailyFantasyService = new DailyFantasyService();




`
