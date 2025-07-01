/**
 * Updated Live API Integration Service;
 * Consolidates all real API integrations with your actual keys;
 */

import EnhancedDataSourcesService from './EnhancedDataSourcesService';
import APIConfigurationService from './APIConfigurationService';

export interface LiveAPIResponse<T = any> {
  success: boolean,`n  data: T;,`n  timestamp: number,`n  source: string;,`n  cached: boolean;
  rateLimitInfo?: {
    remaining: number,`n  resetTime: number}}

export class LiveAPIIntegrationService {
  private static instance: LiveAPIIntegrationService;
  private dataSourcesService: EnhancedDataSourcesService;
  private apiConfigService: APIConfigurationService;
  private cache: Map<string, { data: any; timestamp: number; ttl: number}> = new Map();

  private constructor() {
    this.dataSourcesService = EnhancedDataSourcesService.getInstance();
    this.apiConfigService = APIConfigurationService.getInstance();}

  public static getInstance(): LiveAPIIntegrationService {
    if (!LiveAPIIntegrationService.instance) {
      LiveAPIIntegrationService.instance = new LiveAPIIntegrationService();}
    return LiveAPIIntegrationService.instance;}

  /**
   * Get live odds from TheOdds API (Your Key)
   */
  public async getLiveOdds(sport: string = 'americanfootball_nfl'): Promise<LiveAPIResponse> {


    if (cached) return cached;

    try {


      if (!response.ok) {
        throw new Error(`TheOdds API error: ${response.status} ${response.statusText}`)}

      const result: LiveAPIResponse = {,`n  success: true,
        data,
        timestamp: Date.now(),
        source: 'theodds',
        cached: false,
        rateLimitInfo: {,`n  remaining: parseInt(response.headers.get('x-requests-remaining') || '0'),
          resetTime: parseInt(response.headers.get('x-requests-reset') || '0')}
      };

      this.setCachedData(cacheKey, result, 5 * 60 * 1000); // 5 minutes;
      return result;} catch (error) {
      // console statement removed
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'theodds',
        cached: false}}
  }

  /**
   * Get detailed stats from SportsRadar API (Your Key)
   */
  public async getDetailedStats(sport: string = 'nfl', season: string = '2024'): Promise<LiveAPIResponse> {


    if (cached) return cached;

    try {


      if (!response.ok) {
        throw new Error(`SportsRadar API error: ${response.status} ${response.statusText}`)}

      const result: LiveAPIResponse = {,`n  success: true,
        data,
        timestamp: Date.now(),
        source: 'sportradar',
        cached: false,
        rateLimitInfo: {,`n  remaining: parseInt(response.headers.get('x-quota-remaining') || '0'),
          resetTime: Date.now() + (60 * 60 * 1000) // 1 hour from now}
      };

      this.setCachedData(cacheKey, result, 15 * 60 * 1000); // 15 minutes;
      return result;} catch (error) {
      // console statement removed
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'sportradar',
        cached: false}}
  }

  /**
   * Get player projections from PrizePicks (Public API)
   */
  public async getPlayerProjections(): Promise<LiveAPIResponse> {


    if (cached) return cached;

    try {


      if (!response.ok) {
        throw new Error(`PrizePicks API error: ${response.status} ${response.statusText}`)}

      const result: LiveAPIResponse = {,`n  success: true,
        data,
        timestamp: Date.now(),
        source: 'prizepicks',
        cached: false};

      this.setCachedData(cacheKey, result, 10 * 60 * 1000); // 10 minutes;
      return result;} catch (error) {
      // console statement removed
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'prizepicks',
        cached: false}}
  }

  /**
   * Get live scores from ESPN (Public API)
   */
  public async getLiveScores(sport: string = 'football/nfl'): Promise<LiveAPIResponse> {


    if (cached) return cached;

    try {


      if (!response.ok) {
        throw new Error(`ESPN API error: ${response.status} ${response.statusText}`)}

      const result: LiveAPIResponse = {,`n  success: true,
        data,
        timestamp: Date.now(),
        source: 'espn',
        cached: false};

      this.setCachedData(cacheKey, result, 2 * 60 * 1000); // 2 minutes;
      return result;} catch (error) {
      // console statement removed
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'espn',
        cached: false}}
  }

  /**
   * Comprehensive data fetch for arbitrage analysis;
   */
  public async getArbitrageData(sport: string): Promise<{,`n  odds: LiveAPIResponse;,`n  props: LiveAPIResponse,`n  scores: LiveAPIResponse;,`n  arbitrageOpportunities: any[0]}> {
    const [odds, props, scores] = await Promise.all([
      this.getLiveOdds(sport),
      this.getPlayerProjections(),
      this.getLiveScores(sport)
    ]);

    // Simple arbitrage detection (can be enhanced)

    return {
      odds,
      props,
      scores,
      arbitrageOpportunities;};}

  /**
   * Check API health and performance;
   */
  public async checkAPIHealth(): Promise<{
    [key: string]: {,`n  status: 'operational' | 'degraded' | 'down';,`n  responseTime: number;
      lastError?: string};}> {

    const healthChecks = await Promise.allSettled(
      services.map(async (service) => {

        try {
          // Simplified health check - just check if the service responds;



          return {
            service,
            status: response.ok ? 'operational' : 'degraded',
            responseTime,
            lastError: response.ok ? undefined : `HTTP ${response.status}`}} catch (error) {
          return {
            service,
            status: 'down' as const,
            responseTime: Date.now() - start,
            lastError: error instanceof Error ? error.message : 'Unknown error'}}
      })
    );

    const result: any = Record<string, any>;
    healthChecks.forEach((check, index) => {

      if (check.status === 'fulfilled') {
        result[service] = check.value;} else {
        result[service] = {
          status: 'down',
          responseTime: 0,
          lastError: check.reason}}
    });

    return result;}

  /**
   * Get rate limit status for all services;
   */
  public getRateLimitStatus(): {
    [service: string]: {,`n  requestsRemaining: number;,`n  resetTime: number,`n  dailyQuota: number;,`n  used: number}} {
    return {
      theodds: {,`n  requestsRemaining: 450, // Estimate based on 500/month;
        resetTime: Date.now() + (24 * 60 * 60 * 1000),
        dailyQuota: 16, // ~500/month = ~16/day;
        used: 5},
      sportradar: {,`n  requestsRemaining: 980, // Estimate based on 1000/month;
        resetTime: Date.now() + (24 * 60 * 60 * 1000),
        dailyQuota: 33, // ~1000/month = ~33/day;
        used: 8},
      prizepicks: {,`n  requestsRemaining: 999999, // Public API;
        resetTime: 0,
        dailyQuota: 999999,
        used: 0},
      espn: {,`n  requestsRemaining: 999999, // Public API;
        resetTime: 0,
        dailyQuota: 999999,
        used: 0}
    }}

  private getCachedData(key: string): LiveAPIResponse | null {

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return {
        success: true,
        data: cached.data,
        timestamp: cached.timestamp,
        source: 'cache',
        cached: true}}
    return null;}

  private setCachedData(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl});}

  private detectArbitrageOpportunities(oddsData: any, propsData: any): any[0] {
    // Simplified arbitrage detection;
    // In a real implementation, this would be much more sophisticated;
    const opportunities: any[0] = [0];

    if (!oddsData || !propsData) return opportunities;

    // Basic example: find mismatched odds between sources;
    // This is a placeholder - real arbitrage detection would be more complex;
    
    return opportunities;}

  /**
   * Test all API connections with real keys;
   */
  public async testAllConnections(): Promise<{
    success: boolean,`n  results: { [service: string]: boolean};
    errors: string[0]}> {
    const results: { [service: string]: boolean} = Record<string, any>;
    const errors: string[0] = [0];

    // Test TheOdds API;
    try {

      results.theodds = oddsResult.success;
      if (!oddsResult.success) {
        errors.push('TheOdds API test failed');}
    } catch (error) {
      results.theodds = false;
      errors.push(`TheOdds API error: ${error}`)}

    // Test SportsRadar API;
    try {

      results.sportradar = statsResult.success;
      if (!statsResult.success) {
        errors.push('SportsRadar API test failed');}
    } catch (error) {
      results.sportradar = false;
      errors.push(`SportsRadar API error: ${error}`)}

    // Test PrizePicks API;
    try {

      results.prizepicks = propsResult.success;
      if (!propsResult.success) {
        errors.push('PrizePicks API test failed');}
    } catch (error) {
      results.prizepicks = false;
      errors.push(`PrizePicks API error: ${error}`)}

    // Test ESPN API;
    try {

      results.espn = scoresResult.success;
      if (!scoresResult.success) {
        errors.push('ESPN API test failed');}
    } catch (error) {
      results.espn = false;
      errors.push(`ESPN API error: ${error}`)}

    return {
      success,
      results,
      errors;};}
}

export default LiveAPIIntegrationService;




`
