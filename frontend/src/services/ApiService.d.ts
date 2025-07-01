import EventEmitter from 'eventemitter3.ts';
import { AxiosInstance} from 'axios.ts';
export interface ApiResponse<T> {
  data: T,`n  status: number;,`n  timestamp: number}
export interface ApiServiceConfig {
  baseURL: string;
  timeout?: number;
  retryAttempts?: number;}
export interface ApiServiceEvents {
  error: (error: Error) => void,`n  request: (endpoint: string) => void,`n  response: (response: ApiResponse<unknown>) => void}
export declare abstract class BaseApiService extends EventEmitter<ApiServiceEvents> {
  protected readonly client: AxiosInstance;
  protected readonly config: ApiServiceConfig;
  constructor(config: ApiServiceConfig);
  protected abstract initializeClient(): AxiosInstance;
  protected abstract handleError(error: Error): void;
  protected abstract handleResponse<T>(response: ApiResponse<T>): void;
  abstract get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
  abstract post<T>(endpoint: string, data: unknown): Promise<T>}


`
