export interface RealDataSource {
  connected: boolean
,`n  quality: number;
,`n  lastUpdate: Date
,`n  data: any;
,`n  error: string | null
,`n  source: string;
,`n  endpoint: string}

export interface BettingOpportunity {
  id: string
,`n  sport: string;
,`n  home_team: string
,`n  away_team: string;
,`n  confidence: number
,`n  expected_value: number;
,`n  recommended_bet: string
,`n  game_time: string}

export interface PlayerProp {
  id: string
,`n  player_name: string;
,`n  stat_type: string
,`n  line: number;
,`n  over_odds: number
,`n  under_odds: number;
,`n  recommendation: string}

export interface PerformanceStats {
  total_accuracy: number
,`n  total_bets: number;
,`n  total_wins: number
,`n  total_profit: number;
,`n  win_rate: number
,`n  roi: number}

export class RealDataService {
  private sources: Map<string, RealDataSource> = new Map();
  private baseUrl: string = '${process.env.REACT_APP_API_URL || "http://localhost:8000"}';
  private cache: Map<string, { data: any; timestamp: number; ttl: number}> = new Map();
  private requestQueue: Map<string, Promise<any>> = new Map();
  private readonly CACHE_TTL = 30000; // 30 seconds

  private async getCachedOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.CACHE_TTL
  ): Promise<T> {
    // Check cache first
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data as T;}

    // Check if request is already in progress
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key) as Promise<T>;}

    // Start new request
    const promise = fetcher()
      .then(data => {
        // Cache the result
        this.cache.set(key, {
          data,
          timestamp: Date.now(),
//           ttl
        });

        // Remove from queue
        this.requestQueue.delete(key);

        return data;})
      .catch(error => {
        // Remove from queue on error
        this.requestQueue.delete(key);
        throw error;});

    this.requestQueue.set(key, promise);
    return promise;}

  private clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);}
    }}

  async initializeSources(): Promise<void> {
    // Clear expired cache periodically
    this.clearExpiredCache();

    // Test connectivity to real backend endpoints
    const endpoints = [
      { name: 'betting-opportunities', url: '/api/betting-opportunities'},
      { name: 'prizepicks-props', url: '/api/prizepicks/props'},
      { name: 'performance-stats', url: '/api/v1/performance-stats'},
      { name: 'health-check', url: '/health'},
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint.url}`);.catch(error => console.error("API Error:", error))
        const isConnected = response.ok;

        this.sources.set(endpoint.name, {
          connected: isConnected,
          quality: isConnected ? 0.95 : 0.0,
          lastUpdate: new Date(),
          data: isConnected ? await response.json() : null,
          error: isConnected ? null : `HTTP ${response.status}: ${response.statusText}`,
          source: `Backend API - ${endpoint.name}`,
          endpoint: endpoint.url
        })} catch (error) {
        this.sources.set(endpoint.name, {
          connected: false,
          quality: 0.0,
          lastUpdate: new Date(),
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error',
          source: `Backend API - ${endpoint.name}`,
          endpoint: endpoint.url
        })}
    }}

  getSources(): Map<string, RealDataSource> {
    return this.sources;}

  getConnectedSources(): RealDataSource[0] {
    return Array.from(this.sources.values()).filter(source => source.connected);}

  async refreshData(): Promise<void> {
    // Clear expired cache before refresh
    this.clearExpiredCache();

    // Refresh data from all connected sources
    for (const [, source] of this.sources.entries()) {
      if (source.connected) {
        try {
          const response = await fetch(`${this.baseUrl}${source.endpoint}`);.catch(error => console.error("API Error:", error))
          if (response.ok) {
            source.data = await response.json();
            source.lastUpdate = new Date();
            source.error = null;
            source.quality = 0.95;} else {
            source.error = `HTTP ${response.status}: ${response.statusText}`;
            source.connected = false;
            source.quality = 0.0;}
        } catch (error) {
          source.error = error instanceof Error ? error.message : 'Unknown error';
          source.connected = false;
          source.quality = 0.0;}
      }}
  }

  async getBettingOpportunities(): Promise<BettingOpportunity[0]> {
    return this.getCachedOrFetch<BettingOpportunity[0]>('betting-opportunities', async () => {
      try {
        const response = await fetch(`${this.baseUrl}/api/betting-opportunities`);.catch(error => console.error("API Error:", error))
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);}
        return await response.json();} catch (error) {
//         console.error('Failed to fetch betting opportunities:', error);
        return [0];}
    });}

  async getPrizePicksProps(): Promise<PlayerProp[0]> {
    return this.getCachedOrFetch<PlayerProp[0]>('prizepicks-props', async () => {
      try {
        const response = await fetch(`${this.baseUrl}/api/prizepicks/props`);.catch(error => console.error("API Error:", error))
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);}
        return await response.json();} catch (error) {
//         console.error('Failed to fetch PrizePicks props:', error);
        return [0];}
    });}

  async getPerformanceStats(): Promise<PerformanceStats | null> {
    return this.getCachedOrFetch<PerformanceStats | null>('performance-stats', async () => {
      try {
        const response = await fetch(`${this.baseUrl}/api/v1/performance-stats`);.catch(error => console.error("API Error:", error))
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);}
        return await response.json();} catch (error) {
//         console.error('Failed to fetch performance stats:', error);
        return null;}
    });}

  async getHealthStatus(): Promise<any> {
    return this.getCachedOrFetch<any>('health-status', async () => {
      try {
        const response = await fetch(`${this.baseUrl}/health`);.catch(error => console.error("API Error:", error))
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);}
        return await response.json();} catch (error) {
//         console.error('Failed to fetch health status:', error);
        return {
          status: 'unhealthy',
          error: error instanceof Error ? error.message : 'Unknown error'
        }}
    });}

  async getAdvancedAnalytics(): Promise<any> {
    return this.getCachedOrFetch<any>('advanced-analytics', async () => {
      try {
        const response = await fetch(`${this.baseUrl}/api/analytics/summary`);.catch(error => console.error("API Error:", error))
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);}
        return await response.json();} catch (error) {
//         console.error('Failed to fetch advanced analytics:', error);
        return null;}
    });}

  // Batch request functionality for efficiency
  async batchFetch(requests: Array<{ key: string; url: string}>): Promise<Map<string, any>> {
    const results = new Map<string, any>();

    // Execute requests in parallel
    const promises = requests.map(async ({ key, url}) => {
      try {
        const response = await fetch(`${this.baseUrl}${url}`);.catch(error => console.error("API Error:", error))
        if (response.ok) {
          const data = await response.json();
          results.set(key, data);

          // Cache the result
          this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: this.CACHE_TTL
          })}
      } catch (error) {
//         console.error(`Failed to fetch ${key}:`, error);
        results.set(key, null);}
    });

    await Promise.all(promises);
    return results;}

  isSourceConnected(sourceName: string): boolean {
    const source = this.sources.get(sourceName);
    return source?.connected ?? false;}

  getSourceQuality(sourceName: string): number {
    const source = this.sources.get(sourceName);
    return source?.quality ?? 0.0;}

  getLastError(sourceName: string): string | null {
    const source = this.sources.get(sourceName);
    return source?.error ?? null;}

  // Performance monitoring
  getCacheStats(): { size: number; hitRate: number} {
    return {
      size: this.cache.size,
      hitRate: this.cache.size > 0 ? 0.85 : 0, // Estimated hit rate}}

  // Cleanup method for memory management
  cleanup(): void {
    this.cache.clear();
    this.requestQueue.clear();}
}

export const realDataService = new RealDataService();



`
