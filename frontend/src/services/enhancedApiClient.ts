import axios, { AxiosInstance, AxiosRequestConfig} from 'axios';

export class EnhancedApiClient {
  private client: AxiosInstance;
  private retryAttempts = 3;
  private retryDelay = 1000;

  constructor(baseURL: string, timeout = 30000) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    this.setupInterceptors();}

  private setupInterceptors() {
    // Request interceptor for auth tokens
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;}
        return config;},
      error => Promise.reject(error)
    );

    // Response interceptor with retry logic
    this.client.interceptors.response.use(
      response => response,
      async error => {
        const config = error.config;

        if (!config || config.__retryCount >= this.retryAttempts) {
          return Promise.reject(error);}

        config.__retryCount = config.__retryCount || 0;
        config.__retryCount += 1;

        // Retry on network errors or 5xx responses
        if (error.code === 'NETWORK_ERROR' || (error.response && error.response.status >= 500)) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * config.__retryCount));
          return this.client(config);}

        return Promise.reject(error);}
    );}

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;}

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;}

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;}

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;}
}


`
