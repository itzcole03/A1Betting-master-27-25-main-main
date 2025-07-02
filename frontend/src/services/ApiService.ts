/**
 * 🚀 PHASE 5: Real Backend API Integration Service
 * 
 * Centralized API management for A1Betting frontend with:
 * - Real backend integration (localhost:8000)
 * - JWT authentication handling
 * - Request/response interceptors
 * - Error handling and retry logic
 * - Type-safe API calls
 */

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  data?: any;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean;
}

class ApiService {
  private baseURL: string;
  private defaultTimeout: number;
  private maxRetries: number;
  private authToken: string | null;

  constructor() {
    this.baseURL = '${process.env.REACT_APP_API_URL || "http://localhost:8000"}';
    this.defaultTimeout = 10000; // 10 seconds
    this.maxRetries = 3;
    this.authToken = localStorage.getItem('auth_token');
  }

  /**
   * Set authentication token for API requests
   */
  setAuthToken(token: string | null): void {
    this.authToken = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Get current authentication token
   */
  getAuthToken(): string | null {
    return this.authToken;
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return url.toString();
  }

  /**
   * Build request headers with authentication
   */
  private buildHeaders(config: RequestConfig): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.headers,
    };

    // Add authentication header if token exists and auth is required
    if (config.requiresAuth !== false && this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Handle API errors with proper typing
   */
  private handleError(error: any, endpoint: string): ApiError {
//     console.error(`🚨 API Error [${endpoint}]:`, error);

    if (error.name === 'AbortError') {
      return {
        message: 'Request timeout',
        status: 408,
        code: 'TIMEOUT',
      };
    }

    if (!error.response) {
      return {
        message: 'Network error - Backend may be offline',
        status: 0,
        code: 'NETWORK_ERROR',
        details: { endpoint, baseURL: this.baseURL },
      };
    }

    return {
      message: error.response?.data?.message || error.message || 'Unknown API error',
      status: error.response?.status || 500,
      code: error.response?.data?.code || 'API_ERROR',
      details: error.response?.data,
    };
  }

  /**
   * Make HTTP request with retry logic
   */
  private async makeRequest<T>(config: RequestConfig, attempt = 1): Promise<ApiResponse<T>> {
    const url = this.buildUrl(config.endpoint, config.params);
    const headers = this.buildHeaders(config);
    const timeout = config.timeout || this.defaultTimeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
//       console.log(`🌐 API Request [${config.method}] ${url} (attempt ${attempt})`);

      const response = await fetch(url, {.catch(error => console.error("API Error:", error))
        method: config.method,
        headers,
        body: config.data ? JSON.stringify(config.data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          response: {
            status: response.status,
            data: errorData,
          },
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      
//       console.log(`✅ API Success [${config.method}] ${url}:`, data);

      return {
        data,
        status: response.status,
        message: 'Success',
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic for failed requests
      const maxRetries = config.retries ?? this.maxRetries;
      if (attempt < maxRetries && this.shouldRetry(error)) {
//         console.log(`🔄 Retrying API request [${config.method}] ${url} (${attempt}/${maxRetries})`);
        await this.delay(1000 * attempt); // Exponential backoff
        return this.makeRequest<T>(config, attempt + 1);
      }

      throw this.handleError(error, config.endpoint);
    }
  }

  /**
   * Determine if request should be retried
   */
  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response || 
      error.response.status >= 500 || 
      error.name === 'AbortError'
    );
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generic GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, string>, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'GET',
      endpoint,
      params,
      ...options,
    });
  }

  /**
   * Generic POST request
   */
  async post<T = any>(endpoint: string, data?: any, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'POST',
      endpoint,
      data,
      ...options,
    });
  }

  /**
   * Generic PUT request
   */
  async put<T = any>(endpoint: string, data?: any, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'PUT',
      endpoint,
      data,
      ...options,
    });
  }

  /**
   * Generic DELETE request
   */
  async delete<T = any>(endpoint: string, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'DELETE',
      endpoint,
      ...options,
    });
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<ApiResponse> {
    return this.get('/api/health/status', undefined, { 
      requiresAuth: false,
      timeout: 5000,
      retries: 1,
    });
  }

  /**
   * Authentication endpoints
   */
  async login(credentials: { username: string; password: string }): Promise<ApiResponse<{ token: string; user: any }>> {
    return this.post('/api/auth/login', credentials, { 
      requiresAuth: false,
      timeout: 15000,
    });
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.post('/api/auth/logout', {}, { 
      timeout: 5000,
    });
    this.setAuthToken(null);
    return response;
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.post('/api/auth/refresh', {}, {
      timeout: 10000,
    });
  }

  /**
   * Betting data endpoints
   */
  async getBettingOpportunities(sport?: string): Promise<ApiResponse<any[]>> {
    return this.get('/api/betting/opportunities', sport ? { sport } : undefined);
  }

  async getPrizePicksProps(): Promise<ApiResponse<any[]>> {
    return this.get('/api/prizepicks/props');
  }

  async getComprehensiveProjections(): Promise<ApiResponse<any[]>> {
    return this.get('/api/prizepicks/comprehensive-projections');
  }

  /**
   * Analytics endpoints
   */
  async getAnalyticsSummary(): Promise<ApiResponse<any>> {
    return this.get('/api/analytics/summary');
  }

  async getAdvancedAnalytics(): Promise<ApiResponse<any>> {
    return this.get('/api/analytics/summary');
  }

  async getPerformanceMetrics(): Promise<ApiResponse<any>> {
    return this.get('/api/performance/metrics');
  }

  /**
   * Unified data feed
   */
  async getUnifiedData(date?: string): Promise<ApiResponse<any>> {
    return this.get('/api/v1/unified-data', date ? { date } : undefined);
  }

  /**
   * ML Prediction endpoints
   */
  async makePrediction(data: any): Promise<ApiResponse<any>> {
    return this.post('/predict', data);
  }

  async getUltraAccuracyPrediction(data: any): Promise<ApiResponse<any>> {
    return this.post('/api/v4/predict/ultra-accuracy', data);
  }

  /**
   * Feature extraction
   */
  async extractFeatures(data: any): Promise<ApiResponse<any>> {
    return this.post('/features', data);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types for use in components
export type { ApiError, ApiResponse, RequestConfig };

// Export class for testing
    export { ApiService };

