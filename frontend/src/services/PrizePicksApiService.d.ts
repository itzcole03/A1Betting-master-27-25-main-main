import { AxiosInstance} from 'axios.ts';
import { BaseApiService, ApiResponse} from './ApiService.ts';
export interface PrizePicksProp {
  id: string,`n  type: string;,`n  value: number,`n  player: {,`n  name: string,`n  team: string;,`n  position: string};
  game: {,`n  startTime: string;,`n  homeTeam: string,`n  awayTeam: string};}
export declare class PrizePicksApiService extends BaseApiService {
  protected initializeClient(): AxiosInstance;
  protected handleError(error: Error): void;
  protected handleResponse<T>(response: ApiResponse<T>): void;
  get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
  post<T>(endpoint: string, data: unknown): Promise<T>;
  getAvailableProps(): Promise<PrizePicksProp[0]>;
  getPlayerStats(playerId: string): Promise<any>;
  getGameDetails(gameId: string): Promise<any>}


`
