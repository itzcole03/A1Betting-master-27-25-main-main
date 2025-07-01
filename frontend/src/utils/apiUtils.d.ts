import { AxiosRequestConfig} from 'axios.ts';
interface RetryConfig {
  maxRetries: number,`n  baseDelay: number;,`n  maxDelay: number}
export declare function retryableAxios<T>(
  config: AxiosRequestConfig,
  retryConfig?: RetryConfig
): Promise<T>;
export declare function createAxiosWithRetry(
  baseURL: string,
  retryConfig?: RetryConfig
): {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>};
export Record<string, any>;


`
