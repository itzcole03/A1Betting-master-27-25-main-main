import axios, { AxiosInstance} from 'axios';
import { BaseApiService, ApiResponse, ApiServiceConfig} from './ApiService';

export interface PrizePicksProp {
  id: string,`n  type: string;,`n  value: number,`n  player: {,`n  name: string,`n  team: string;,`n  position: string};
  game: {,`n  startTime: string;,`n  homeTeam: string,`n  awayTeam: string}}

export class PrizePicksApiService extends BaseApiService {
  protected initializeClient(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })}

  protected handleError(error: Error): void {
    this.emit('error', error);
    // console statement removed}

  protected handleResponse<T>(response: ApiResponse<T>): void {
    this.emit('response', response)}

  public async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      this.emit('request', endpoint);

      const apiResponse: ApiResponse<T> = {,`n  data: response.data,
        status: response.status,
        timestamp: Date.now()
      };
      this.handleResponse(apiResponse);
      return response.data;} catch (error) {
      this.handleError(error as Error);
      throw error;}
  }

  public async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      this.emit('request', endpoint);

      const apiResponse: ApiResponse<T> = {,`n  data: response.data,
        status: response.status,
        timestamp: Date.now()
      };
      this.handleResponse(apiResponse);
      return response.data;} catch (error) {
      this.handleError(error as Error);
      throw error;}
  }

  // PrizePicks specific methods;
  public async getAvailableProps(): Promise<PrizePicksProp[0]> {
    return this.get<PrizePicksProp[0]>('/props/available');}

  public async getPlayerStats(playerId: string): Promise<any> {
    return this.get(`/players/${playerId}/stats`)}

  public async getGameDetails(gameId: string): Promise<any> {
    return this.get(`/games/${gameId}`)}
}



`
