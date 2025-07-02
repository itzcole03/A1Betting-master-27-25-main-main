/**
 * Real API Service
 * Replaces cloudMockService with actual backend integration
 * Production-ready implementation with error handling and retry logic
 */

export interface ApiConfig {
  baseUrl: string
,`n  timeout: number;
,`n  retryAttempts: number
,`n  retryDelay: number}

export class RealApiService {
  private config: ApiConfig;
  private retryCount = new Map<string, number>();

  constructor(config?: Partial<ApiConfig>) {
    this.config = {
      baseUrl: process.env.REACT_APP_API_URL || '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    }}

  private async makeRequest<T>(endpoint: string, options: RequestInit = Record<string, any>): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestKey = `${options.method || 'GET'}-${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {.catch(error => console.error("API Error:", error))
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);}

      const data = await response.json();

      // Reset retry count on success
      this.retryCount.delete(requestKey);

      return data;} catch (error) {
      clearTimeout(timeoutId);

      // Handle retry logic
      const currentRetries = this.retryCount.get(requestKey) || 0;

      if (
        currentRetries < this.config.retryAttempts &&
        (error instanceof TypeError || error.message.includes('fetch'))
      ) {
        this.retryCount.set(requestKey, currentRetries + 1);

        // Exponential backoff
        const delay = this.config.retryDelay * Math.pow(2, currentRetries);
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.makeRequest<T>(endpoint, options);}

      // Reset retry count and throw error
      this.retryCount.delete(requestKey);
      throw error;}
  }

  public async getHealth() {
    return this.makeRequest<{
      status: string
,`n  timestamp: string;
,`n  version: string
,`n  uptime: number;
,`n  services: Record<string, string>}>('/health');}

  public async getBettingOpportunities() {
    return this.makeRequest<
      Array<{
        id: string
,`n  sport: string;
,`n  event: string
,`n  market: string;
,`n  odds: number
,`n  probability: number;
,`n  expected_value: number
,`n  kelly_fraction: number;
,`n  confidence: number
,`n  risk_level: string;
,`n  recommendation: string}>
    >('/api/betting-opportunities')}

  public async getArbitrageOpportunities() {
    return this.makeRequest<
      Array<{
        id: string
,`n  sport: string;
,`n  event: string
,`n  bookmaker_a: string;
,`n  bookmaker_b: string
,`n  odds_a: number;
,`n  odds_b: number
,`n  profit_margin: number;
,`n  required_stake: number}>
    >('/api/arbitrage-opportunities')}

  public async getPredictions() {
    return this.makeRequest<{
      predictions: Array<{
,`n  id: string;
,`n  sport: string
,`n  event: string;
,`n  prediction: string
,`n  confidence: number;
,`n  odds: number
,`n  expected_value: number;
,`n  timestamp: string
,`n  model_version: string}>;
      total_count: number}>('/api/predictions/prizepicks')}

  public async getModelPerformance() {
    return this.makeRequest<{
      overall_accuracy: number
,`n  recent_accuracy: number;
,`n  model_metrics: {
,`n  precision: number;
,`n  recall: number
,`n  f1_score: number;
,`n  auc_roc: number};
      performance_by_sport: Record<string, { accuracy: number; games: number}>}>('/api/ultra-accuracy/model-performance');}

  public async isBackendAvailable(): Promise<boolean> {
    try {
      await this.getHealth();
      return true;} catch (error) {
//       console.warn('Backend not available:', error);
      return false;}
  }}

export const realApiService = new RealApiService();



`
