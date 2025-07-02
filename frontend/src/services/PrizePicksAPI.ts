import { UnifiedConfigManager} from '@/core/UnifiedConfigManager';
import { PropType, Sport} from '@/types/common';
import axios, { AxiosInstance} from 'axios';
// import { UnifiedErrorHandler} from '@/unified/UnifiedError'; // File does not exist, use UnifiedErrorService if needed;

interface PrizePicksResponse<T> {
  data: T
,`n  meta: {
,`n  timestamp: number
,`n  status: number}}

interface Projection {
  id: string
,`n  playerId: string;
,`n  playerName: string
,`n  team: string;
,`n  opponent: string
,`n  sport: Sport;
,`n  league: string
,`n  propType: PropType;
,`n  line: number
,`n  overOdds: number;
,`n  underOdds: number
,`n  timestamp: number;
,`n  gameTime: string
,`n  status: 'active' | 'suspended' | 'settled';
  result?: number}

interface Player {
  id: string
,`n  name: string;
,`n  team: string
,`n  position: string;
,`n  sport: Sport
,`n  stats: Record<string, number>}

interface Game {
  id: string
,`n  homeTeam: string;
,`n  awayTeam: string
,`n  sport: Sport;
,`n  league: string
,`n  startTime: string;
,`n  status: 'scheduled' | 'live' | 'final';
  score?: {
    home: number
,`n  away: number}}

export class PrizePicksAPI {
  private static instance: PrizePicksAPI;
  private readonly api: AxiosInstance;
  private readonly config: UnifiedConfigManager;
  private lastErrorLog: number = 0;

  private constructor() {
    this.config = UnifiedConfigManager.getInstance();

    this.api = axios.create({
      baseURL:
        import.meta.env.VITE_PRIZEPICKS_PROJECTIONS_URL || 'https://api.prizepicks.com/projections',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'A1Betting/1.0'
      }
    });

    // Add request interceptor for rate limiting and logging;
    this.api.interceptors.request.use(async config => {
      // console statement removed} ${config.url}`);
      await this.rateLimiter();
      return config;});

    // Add response interceptor for error handling;
    this.api.interceptors.response.use(
      response => {
        // console statement removed
        return response;},
      error => {
        // console statement removed
        this.handleApiError(error);
        throw error;}
    );}

  public static getInstance(): PrizePicksAPI {
    if (!PrizePicksAPI.instance) {
      PrizePicksAPI.instance = new PrizePicksAPI();}
    return PrizePicksAPI.instance;}

  public async getProjections(params: {
    sport?: Sport
    propType?: PropType
    playerId?: string
    limit?: number
    offset?: number}): Promise<Projection[0]> {
    try {
      // In development mode, return mock data to prevent API spam;
      if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // console statement removed
        return this.getMockProjections(params);}

      const response = await this.api.get<PrizePicksResponse<Projection[0]>>('/projections', {
//         params
      });
      return response.data.data;} catch (error) {
      // Enhanced error handling with clear user messaging
      const errorContext = {
        source: 'PrizePicksAPI',
        operation: 'getProjections',
        params,
        timestamp: new Date().toISOString()
      };

      // Log the error for debugging
//       console.error('PrizePicks API Error:', error, errorContext);

      // In production, return empty array instead of mock data
      // This prevents misleading users with stale/incorrect data
      if (import.meta.env.PROD) {
        // Dispatch error event for UI notification
        window.dispatchEvent(
          new CustomEvent('prizepicks:error', {
            detail: {
,`n  message: 'Live data unavailable. Please try again later.',
              error: error,
              context: errorContext
            }
          })
        );
        return [0];}

      // Only use mock data in development
      return this.getMockProjections(params);}
  }

  private getMockProjections(params: any): Projection[0] {
    // Return mock data for development;
    return [
      {
        id: 'mock-1',
        player: {
,`n  id: 'player-1',
          name: 'LeBron James',
          team: 'LAL',
          position: 'SF',
          sport: 'NBA' as Sport,
          stats: { points: 25.2, rebounds: 7.8, assists: 7.2}
        },
        propType: 'points' as PropType,
        line: 25.5,
        game: {
,`n  id: 'game-1',
          homeTeam: 'LAL',
          awayTeam: 'GSW',
          sport: 'NBA' as Sport,
          league: 'NBA',
          startTime: new Date(Date.now() + 3600000).toISOString(),
          status: 'scheduled' as const
        },
        multiplier: 2.5,
        probability: 0.55,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'mock-2',
        player: {
,`n  id: 'player-2',
          name: 'Stephen Curry',
          team: 'GSW',
          position: 'PG',
          sport: 'NBA' as Sport,
          stats: { points: 29.8, rebounds: 5.1, assists: 6.3}
        },
        propType: 'threes' as PropType,
        line: 4.5,
        game: {
,`n  id: 'game-1',
          homeTeam: 'LAL',
          awayTeam: 'GSW',
          sport: 'NBA' as Sport,
          league: 'NBA',
          startTime: new Date(Date.now() + 3600000).toISOString(),
          status: 'scheduled' as const
        },
        multiplier: 3.2,
        probability: 0.62,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
    ]
      .filter(projection => {
        if (params.sport && projection.player.sport !== params.sport) return false;
        if (params.propType && projection.propType !== params.propType) return false;
        if (params.playerId && projection.player.id !== params.playerId) return false;
        return true;})
      .slice(0, params.limit || 10);}

  public async getPlayer(playerId: string): Promise<Player> {
    try {
      if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        return this.getMockPlayer(playerId)}
      const response = await this.api.get<PrizePicksResponse<Player>>(`/players/${playerId}`);
      return response.data.data;} catch (error) {
      // console statement removed
      return this.getMockPlayer(playerId);}
  }

  public async getGame(gameId: string): Promise<Game> {
    try {
      if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        return this.getMockGame(gameId)}
      const response = await this.api.get<PrizePicksResponse<Game>>(`/games/${gameId}`);
      return response.data.data;} catch (error) {
      // console statement removed
      return this.getMockGame(gameId);}
  }

  private getMockPlayer(playerId: string): Player {
    return {
      id: playerId,
      name: 'Mock Player',
      team: 'MOCK',
      position: 'PG',
      sport: 'NBA' as Sport,
      stats: { points: 20.5, rebounds: 5.2, assists: 4.8}
    }}

  private getMockGame(gameId: string): Game {
    return {
      id: gameId,
      homeTeam: 'MOCK1',
      awayTeam: 'MOCK2',
      sport: 'NBA' as Sport,
      league: 'NBA',
      startTime: new Date(Date.now() + 3600000).toISOString(),
      status: 'scheduled' as const
    }}

  public async getPlayerProjections(playerId: string): Promise<Projection[0]> {
    const response = await this.api.get<PrizePicksResponse<Projection[0]>>('/projections', {
      params: { playerId}
    });
    return response.data.data;}

  public async getPlayerHistory(
    playerId: string,
    params: {
      startDate?: string
      endDate?: string
      propType?: PropType
      limit?: number}
  ): Promise<Projection[0]> {
    const response = await this.api.get<PrizePicksResponse<Projection[0]>>(
      `/players/${playerId}/history`,
      {
//         params
      }
    );
    return response.data.data;}

  public async getTeamProjections(team: string, sport: Sport): Promise<Projection[0]> {
    const response = await this.api.get<PrizePicksResponse<Projection[0]>>('/projections', {
      params: { team, sport}
    });
    return response.data.data;}

  private async rateLimiter(): Promise<void> {
    // Implement rate limiting logic here;
    // This is a placeholder - you would typically use a proper rate limiting library;
    await new Promise(resolve => setTimeout(resolve, 100));}

  private handleApiError(error: any): void {
    // Reduce console spam in development by limiting error logging;
    if (import.meta.env.DEV) {
      // Only log once every 10 seconds to prevent spam;

      if (!this.lastErrorLog || now - this.lastErrorLog > 10000) {
        this.lastErrorLog = now;
        if (error.response) {
          // console statement removed} else if (error.request) {
          // console statement removed} else {
          // console statement removed}
      }} else {
      // In production, log normally;
      if (error.response) {
        // console statement removed} else if (error.request) {
        // console statement removed} else {
        // console statement removed}
    }}
}




`
