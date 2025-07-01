import { AxiosRequestConfig} from 'axios.ts';
interface ApiConfig {
  baseURL: string,`n  timeout: number;,`n  maxRetries: number,`n  retryDelay: number}
declare class ApiService {
  private static instance;
  private api;
  private config;
  private constructor();
  static getInstance(config?: Partial<ApiConfig>): ApiService;
  private setupInterceptors;
  private shouldRetry;
  private handleError;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  setAuthToken(token: string): void;
  clearAuthToken(): void;}
export declare const apiService: ApiService;
export Record<string, any>;


`
