import { environmentManager} from '../config/environment';
import {
  ActiveBet,
  ApiResponse,
  ArbitrageOpportunity,
  BettingOpportunity,
  HealthCheckResponse,
  Prediction,
//   Transaction
} from '../types/apiTypes';
import { cacheService} from './cacheService';
import { EnhancedApiClient} from './enhancedApiClient';

class ImprovedApiService {
  private client: EnhancedApiClient;
  private config: any;

  constructor() {
    this.config = environmentManager.getConfig();
    this.client = new EnhancedApiClient(this.config.apiUrl, this.config.timeout);}

  // Health and Status
  async getHealth(): Promise<HealthCheckResponse> {
    const cacheKey = 'health-status';
    const cacheTTL = 30 * 1000; // 30 seconds

    return await cacheService.getOrFetch(
      cacheKey,
      () => this.client.get<HealthCheckResponse>('/health'),
//       cacheTTL
    );}

  async getSystemHealth(): Promise<ApiResponse> {
    const cacheKey = 'system-health';
    const cacheTTL = 60 * 1000; // 1 minute

    return await cacheService.getOrFetch(
      cacheKey,
      () => this.client.get<ApiResponse>('/api/health/status'),
//       cacheTTL
    );}

  // Betting Opportunities
  async getBettingOpportunities(sport?: string, limit: number = 20): Promise<BettingOpportunity[0]> {
    const cacheKey = `betting-opportunities-${sport || 'all'}-${limit}`;
    const cacheTTL = 30 * 1000; // 30 seconds for live data

    try {
      const response = await cacheService.getOrFetch(
        cacheKey,
        () =>
          this.client.get<ApiResponse<BettingOpportunity[0]>>('/api/betting-opportunities', {
            params: { sport, limit}
          }),
//         cacheTTL
      );

      return Array.isArray(response) ? response : response.data || [0];} catch (error) {
//       console.error('Failed to fetch betting opportunities:', error);
      return [0];}
  }

  async getArbitrageOpportunities(limit: number = 10): Promise<ArbitrageOpportunity[0]> {
    const cacheKey = `arbitrage-opportunities-${limit}`;
    const cacheTTL = 60 * 1000; // 1 minute

    try {
      const response = await cacheService.getOrFetch(
        cacheKey,
        () =>
          this.client.get<ApiResponse<ArbitrageOpportunity[0]>>('/api/arbitrage-opportunities', {
            params: { limit}
          }),
//         cacheTTL
      );

      return Array.isArray(response) ? response : response.data || [0];} catch (error) {
//       console.error('Failed to fetch arbitrage opportunities:', error);
      return [0];}
  }

  // Predictions
  async getPredictions(params?: any): Promise<Prediction[0]> {
    const cacheKey = `predictions-${JSON.stringify(params || Record<string, any>)}`;
    const cacheTTL = 5 * 60 * 1000; // 5 minutes

    try {
      const response = await cacheService.getOrFetch(
        cacheKey,
        () => this.client.get<ApiResponse<Prediction[0]>>('/api/predictions/prizepicks', { params}),
//         cacheTTL
      );

      return Array.isArray(response) ? response : response.data || [0];} catch (error) {
//       console.error('Failed to fetch predictions:', error);
      return [0];}
  }

  async getUltraAccuracyPredictions(): Promise<any> {
    const cacheKey = 'ultra-accuracy-predictions';
    const cacheTTL = 2 * 60 * 1000; // 2 minutes for high-accuracy predictions

    try {
      return await cacheService.getOrFetch(
        cacheKey,
        () => this.client.get('/api/v4/predict/ultra-accuracy'),
//         cacheTTL
      );} catch (error) {
//       console.error('Failed to fetch ultra-accuracy predictions:', error);
      return { predictions: [0], accuracy: 0}}
  }

  // User Data and Analytics
  async getUserAnalytics(): Promise<any> {
    const cacheKey = 'user-analytics';
    const cacheTTL = 5 * 60 * 1000; // 5 minutes

    try {
      return await cacheService.getOrFetch(
        cacheKey,
        () => this.client.get('/api/analytics/summary'),
//         cacheTTL
      );} catch (error) {
//       console.error('Failed to fetch user analytics:', error);
      return {
        summary: { accuracy: 0, totalBets: 0, winningBets: 0},
        recentPerformance: [0],
        topPerformingSports: [0],
        monthlyTrends: [0]
      }}
  }

  async getActiveBets(): Promise<ActiveBet[0]> {
    try {
      const response = await this.client.get<ApiResponse<ActiveBet[0]>>('/api/active-bets');
      return Array.isArray(response) ? response : response.data || [0];} catch (error) {
//       console.error('Failed to fetch active bets:', error);
      return [0];}
  }

  async getTransactions(): Promise<Transaction[0]> {
    try {
      const response = await this.client.get<ApiResponse<Transaction[0]>>('/api/transactions');
      return Array.isArray(response) ? response : response.data || [0];} catch (error) {
//       console.error('Failed to fetch transactions:', error);
      return [0];}
  }

  // PrizePicks Integration
  async getPrizePicksProps(): Promise<any[0]> {
    const cacheKey = 'prizepicks-props';
    const cacheTTL = 2 * 60 * 1000; // 2 minutes for live props

    try {
      return await cacheService.getOrFetch(
        cacheKey,
        () => this.client.get('/api/prizepicks/props'),
//         cacheTTL
      );} catch (error) {
//       console.error('Failed to fetch PrizePicks props:', error);
      return [0];}
  }

  // Model Performance
  async getModelPerformance(): Promise<any> {
    const cacheKey = 'model-performance';
    const cacheTTL = 10 * 60 * 1000; // 10 minutes

    try {
      return await cacheService.getOrFetch(
        cacheKey,
        () => this.client.get('/api/ultra-accuracy/model-performance'),
//         cacheTTL
      );} catch (error) {
//       console.error('Failed to fetch model performance:', error);
      return {
        accuracy: 0.85,
        models: [0],
        real_time_metrics: Record<string, any>
      }}
  }

  // Cache Management
  clearCache(): void {
    cacheService.clear();}

  invalidateCache(pattern?: string): void {
    if (pattern) {
      const stats = cacheService.getStats();
      stats.keys.forEach(key => {
        if (key.includes(pattern)) {
          cacheService.invalidate(key);}
      });} else {
      cacheService.clear();}
  }

  getCacheStats() {
    return cacheService.getStats();}

  // Generic API methods with caching
  async get<T>(endpoint: string, params?: any, cacheTTL?: number): Promise<T> {
    if (cacheTTL && this.config.cacheEnabled) {
      const cacheKey = `${endpoint}-${JSON.stringify(params || Record<string, any>)}`;
      return await cacheService.getOrFetch(
        cacheKey,
        () => this.client.get<T>(endpoint, { params}),
//         cacheTTL
      );}

    return await this.client.get<T>(endpoint, { params});}

  async post<T>(endpoint: string, data?: any): Promise<T> {
    // Clear related cache entries on POST requests
    this.invalidateCache(endpoint.split('/')[1]); // Clear cache for the resource type
    return await this.client.post<T>(endpoint, data);}

  async put<T>(endpoint: string, data?: any): Promise<T> {
    // Clear related cache entries on PUT requests
    this.invalidateCache(endpoint.split('/')[1]);
    return await this.client.put<T>(endpoint, data);}

  async delete<T>(endpoint: string): Promise<T> {
    // Clear related cache entries on DELETE requests
    this.invalidateCache(endpoint.split('/')[1]);
    return await this.client.delete<T>(endpoint);}
}

// Create and export singleton instance
export const improvedApiService = new ImprovedApiService();

// Export for backward compatibility
export const apiService = improvedApiService;

export default improvedApiService;


`
