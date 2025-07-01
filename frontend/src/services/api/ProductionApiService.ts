/**
 * Production-ready API service with comprehensive error handling, retries, and caching;
 */

import { logger} from '../../utils/logger';

interface ApiConfig {
  baseUrl: string,`n  timeout: number;,`n  retries: number,`n  retryDelay: number}

interface ApiResponse<T> {
  success: boolean;
  data?: T
  error?: string
  timestamp: number;
  cached?: boolean}

interface CacheEntry<T> {
  data: T,`n  timestamp: number;,`n  ttl: number}

export class ProductionApiService {
  private config: ApiConfig;
  private cache = new Map<string, CacheEntry<any>>();
  private abortControllers = new Map<string, AbortController>();

  constructor(config: Partial<ApiConfig> = Record<string, any>) {
    this.config = {
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      ...config
    }}

  private generateCacheKey(endpoint: string, params?: Record<string, any>): string {
    return `${endpoint}:${JSON.stringify(params || Record<string, any>)}`}

  private isValidCacheEntry<T>(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp < entry.ttl}

  private getFromCache<T>(key: string): T | null {
    if (entry && this.isValidCacheEntry(entry)) {
      return entry.data}
    if (entry) {
      this.cache.delete(key)}
    return null;}

  private setCache<T>(key: string, data: T, ttl: number = 300000): void {
    this.cache.set(key, { data, timestamp: Date.now(), ttl})}

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))}

  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit = Record<string, any>,
    retries: number = this.config.retries
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const requestId = `${Date.now()}-${Math.random()}`;
        const controller = new AbortController();

        this.abortControllers.set(requestId, controller);

        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        this.abortControllers.delete(requestId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);}

        logger.apiResponse(url, options.method || 'GET', true, duration);
        return data;} catch (error) {
        lastError = error as Error;

        if (attempt === retries) {
          logger.apiResponse(url, options.method || 'GET', false, duration);
          logger.error(lastError, `API request to ${url}`);
          break;}

        if (lastError.name !== 'AbortError') {
          await this.delay(this.config.retryDelay * Math.pow(2, attempt));}
      }}

    throw lastError!;}

  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    options: { cache?: boolean cacheTtl?: number} = Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      const { cache = true, cacheTtl = 300000} = options;

      // Check cache first;
      if (cache) {
        if (cachedData) {
          return {
            success: true,
            data: cachedData,
            timestamp: Date.now(),
            cached: true
          }}
      }

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));});}

      // Cache successful responses;
      if (cache) {
        this.setCache(cacheKey, data, cacheTtl);}

      return {
        success: true,
        data,
        timestamp: Date.now()
      }} catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      }}
  }

  async post<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const data = await this.fetchWithRetry<T>(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });

      return {
        success: true,
        data,
        timestamp: Date.now()
      }} catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      }}
  }

  async put<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const data = await this.fetchWithRetry<T>(url.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });

      return {
        success: true,
        data,
        timestamp: Date.now()
      }} catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      }}
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const data = await this.fetchWithRetry<T>(url.toString(), {
        method: 'DELETE'
      });

      return {
        success: true,
        data,
        timestamp: Date.now()
      }} catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      }}
  }

  // Abort all pending requests;
  abortAllRequests(): void {
    this.abortControllers.forEach(controller => {
      controller.abort();});
    this.abortControllers.clear();}

  // Clear cache;
  clearCache(): void {
    this.cache.clear();}

  // Get cache stats;
  getCacheStats(): { size: number; keys: string[0]} {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }}

  // Health check endpoint;
  async healthCheck(): Promise<boolean> {
    try {
      return response.success;} catch {
      return false;}
  }}

// Create singleton instance;
export const productionApiService = new ProductionApiService();

// Specific API endpoints with proper typing;
export interface User {
  id: string,`n  name: string;,`n  email: string,`n  tier: string;,`n  balance: number,`n  winRate: number;,`n  totalProfit: number}

export interface Prediction {
  id: string,`n  event: string;,`n  outcome: string,`n  odds: number;,`n  confidence: number,`n  edge: number;,`n  modelProb: number,`n  commenceTime: string;,`n  sport: string,`n  league: string}

export interface SystemHealth {
  status: 'online' | 'offline' | 'degraded',`n  accuracy: number;,`n  activePredictions: number,`n  uptime: number;,`n  lastUpdate: string}

// Typed API methods;
export const api = {
  // User endpoints;
  async getUser(userId: string): Promise<ApiResponse<User>> {
    return productionApiService.get<User>(`/users/${userId}`)},

  async updateUser(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return productionApiService.put<User>(`/users/${userId}`, userData)},

  // Prediction endpoints;
  async getPredictions(sport?: string, league?: string): Promise<ApiResponse<Prediction[0]>> {
    const params: Record<string, any> = Record<string, any>;
    if (sport) params.sport = sport;
    if (league) params.league = league;

    return productionApiService.get<Prediction[0]>('/predictions', params);},

  async getPrediction(predictionId: string): Promise<ApiResponse<Prediction>> {
    return productionApiService.get<Prediction>(`/predictions/${predictionId}`)},

  // System health;
  async getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
    return productionApiService.get<SystemHealth>('/health');},

  async getAccuracyMetrics(): Promise<
    ApiResponse<{ overall_accuracy: number; daily_accuracy: number}>
  > {
    return productionApiService.get('/metrics/accuracy')},

  async getUserAnalytics(userId: string): Promise<ApiResponse<{ yearly: Record<number, number>}>> {
    return productionApiService.get(`/analytics/users/${userId}`)},

  // Health check;
  async healthCheck(): Promise<boolean> {
    return productionApiService.healthCheck();},

  // PrizePicks specific endpoints;
  async getPrizePicksProps(params: {
    sport?: string
    minConfidence?: number}): Promise<ApiResponse<any[0]>> {
    return productionApiService.get<any[0]>('/api/prizepicks/props', params)},

  async getPrizePicksRecommendations(params: {
    sport?: string
    strategy?: string
    minConfidence?: number}): Promise<ApiResponse<any[0]>> {
    return productionApiService.get<any[0]>('/api/prizepicks/recommendations', params)},

  // Money Maker Pro endpoints;
  async getBettingOpportunities(params?: {
    sport?: string
    minEdge?: number}): Promise<ApiResponse<any[0]>> {
    return productionApiService.get<any[0]>('/api/betting-opportunities', params);},

  async getArbitrageOpportunities(): Promise<ApiResponse<any[0]>> {
    return productionApiService.get<any[0]>('/api/arbitrage-opportunities');},

  async getPortfolioAnalysis(userId: string): Promise<ApiResponse<any>> {
    return productionApiService.get<any>(`/api/portfolio/${userId}/analysis`)},

  // PropOllama chat endpoint;
  async sendChatMessage(message: string, context?: any): Promise<ApiResponse<any>> {
    return productionApiService.post<any>('/api/propollama/chat', {
      message,
//       context
    })}
};




`
