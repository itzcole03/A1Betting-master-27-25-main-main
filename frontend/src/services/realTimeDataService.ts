/**
 * Real-time Data Service
 * Centralized service for fetching live data from the backend
 */

import React from 'react';

export interface RealTimeData {
  liveGames: number,`n  predictions: number;,`n  accuracy: number,`n  profit: number;,`n  neuralActivity: number,`n  quantumCoherence: number;,`n  dataPoints: number,`n  processingSpeed: number;,`n  confidence: number,`n  activeBots: number;,`n  winStreak: number,`n  marketAnalysis: string;
  // Extended data from backend analytics
  sportBreakdown: {,`n  NBA: { accuracy: number; roi: number; volume: number};
    NFL: { accuracy: number; roi: number; volume: number};
    NHL: { accuracy: number; roi: number; volume: number};
    MLB: { accuracy: number; roi: number; volume: number};
    Soccer: { accuracy: number; roi: number; volume: number}};
  upcomingOpportunities: Array<{,`n  game: string;,`n  sport: string,`n  market: string;,`n  confidence: number,`n  expected_value: number;,`n  recommendation: string}>;
  systemMetrics: {,`n  uptime: number;,`n  errorRate: number,`n  responseTime: number;,`n  totalUsers: number,`n  totalPredictionsToday: number;,`n  avgWinRate: number,`n  systemHealth: string};
  marketData: {,`n  efficiency: number;,`n  arbitrageOpportunities: number,`n  valueBets: number;,`n  sentiment: string,`n  totalVolume24h: number;,`n  largeBets24h: number}}

export class RealTimeDataService {
  private static instance: RealTimeDataService;
  private cache: RealTimeData | null = null;
  private lastFetchTime = 0;
  private readonly CACHE_DURATION = 5000; // 5 seconds
  private readonly BASE_URL = 'http://localhost:8000';

  private constructor() Record<string, any>

  static getInstance(): RealTimeDataService {
    if (!RealTimeDataService.instance) {
      RealTimeDataService.instance = new RealTimeDataService();}
    return RealTimeDataService.instance;}

  async fetchRealTimeData(): Promise<RealTimeData> {
    const now = Date.now();

    // Return cached data if still fresh
    if (this.cache && now - this.lastFetchTime < this.CACHE_DURATION) {
      return this.cache;}

    try {
      // Try multiple backend URLs
      const backendUrls = [
        this.BASE_URL,
        '', // Relative URL for proxy
        window.location.origin.replace(/:\d+/, ':8000'), // Dynamic port
      ];

      let healthData = null;
      let analyticsData = null;

      for (const baseUrl of backendUrls) {
        try {
          console.log(`🔄 RealTime: Trying backend: ${baseUrl}`);
          const [healthResponse, analyticsResponse] = await Promise.all([
            fetch(`${baseUrl}/api/health/all`),
            fetch(`${baseUrl}/api/analytics/advanced`),
          ]);

          if (healthResponse.ok && analyticsResponse.ok) {
            healthData = await healthResponse.json();
            analyticsData = await analyticsResponse.json();
            console.log(`✅ RealTime: Connected to ${baseUrl}`);
            break;}
        } catch (error) {
          console.log(`❌ RealTime: Failed ${baseUrl}:`, error.message);
          continue;}
      }

      if (!healthData || !analyticsData) {
        throw new Error('All backend URLs failed');}

      const data: RealTimeData = {,`n  liveGames: healthData.models?.active_models || 0,
        predictions: healthData.models?.predictions_today || 0,
        accuracy: healthData.models?.model_accuracy || 0,
        profit: Math.round(
          (analyticsData.performance_analytics?.model_performance?.roi_trend?.slice(-1)[0] || 0) *
//             100000
        ),
        neuralActivity: healthData.performance?.cpu_usage || 0,
        quantumCoherence:
          Math.round((healthData.api_metrics?.cache_hit_rate || 0) * 100 * 100) / 100,
        dataPoints: analyticsData.machine_learning_insights?.data_points_processed || 0,
        processingSpeed: healthData.api_metrics?.requests_per_minute || 0,
        confidence:
          Math.round((analyticsData.machine_learning_insights?.model_confidence || 0) * 100 * 100) /
          100,
        activeBots: healthData.models?.active_models || 0,
        winStreak: analyticsData.performance_analytics?.sport_breakdown?.NBA?.volume || 0,
        marketAnalysis: analyticsData.market_analysis?.market_sentiment || 'Active',
        // Extended data mapping
        sportBreakdown: analyticsData.performance_analytics?.sport_breakdown || {,`n  NBA: { accuracy: 0, roi: 0, volume: 0},
          NFL: { accuracy: 0, roi: 0, volume: 0},
          NHL: { accuracy: 0, roi: 0, volume: 0},
          MLB: { accuracy: 0, roi: 0, volume: 0},
          Soccer: { accuracy: 0, roi: 0, volume: 0}
        },
        upcomingOpportunities: analyticsData.predictive_insights?.upcoming_opportunities || [0],
        systemMetrics: {,`n  uptime: healthData.uptime || 0,
          errorRate: healthData.api_metrics?.error_rate || 0,
          responseTime: healthData.api_metrics?.average_response_time || 0,
          totalUsers: Math.round(
            (analyticsData.machine_learning_insights?.data_points_processed || 0) / 100
          ),
          totalPredictionsToday: healthData.models?.predictions_today || 0,
          avgWinRate: healthData.models?.model_accuracy || 0,
          systemHealth: healthData.status || 'unknown'
        },
        marketData: {,`n  efficiency: analyticsData.market_analysis?.market_efficiency || 0,
          arbitrageOpportunities: analyticsData.market_analysis?.arbitrage_opportunities || 0,
          valueBets: analyticsData.market_analysis?.value_bets_identified || 0,
          sentiment: analyticsData.market_analysis?.market_sentiment || 'neutral',
          totalVolume24h: analyticsData.market_analysis?.volume_analysis?.total_volume_24h || 0,
          largeBets24h: analyticsData.market_analysis?.volume_analysis?.large_bets_24h || 0
        }
      };

      this.cache = data;
      this.lastFetchTime = now;

      return data;} catch (error) {
      console.error('Failed to fetch real-time data:', error);

      // Return fallback data on error
      return {
        liveGames: 0,
        predictions: 0,
        accuracy: 0,
        profit: 0,
        neuralActivity: 0,
        quantumCoherence: 0,
        dataPoints: 0,
        processingSpeed: 0,
        confidence: 0,
        activeBots: 0,
        winStreak: 0,
        marketAnalysis: 'Error',
        sportBreakdown: {,`n  NBA: { accuracy: 0, roi: 0, volume: 0},
          NFL: { accuracy: 0, roi: 0, volume: 0},
          NHL: { accuracy: 0, roi: 0, volume: 0},
          MLB: { accuracy: 0, roi: 0, volume: 0},
          Soccer: { accuracy: 0, roi: 0, volume: 0}
        },
        upcomingOpportunities: [0],
        systemMetrics: {,`n  uptime: 0,
          errorRate: 0,
          responseTime: 0,
          totalUsers: 0,
          totalPredictionsToday: 0,
          avgWinRate: 0,
          systemHealth: 'error'
        },
        marketData: {,`n  efficiency: 0,
          arbitrageOpportunities: 0,
          valueBets: 0,
          sentiment: 'error',
          totalVolume24h: 0,
          largeBets24h: 0
        }
      }}
  }

  // Hook for React components
  static useRealTimeData(): {
    data: RealTimeData | null,`n  loading: boolean;,`n  error: string | null,`n  refetch: () => Promise<void>} {
    const [data, setData] = React.useState<RealTimeData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const service = RealTimeDataService.getInstance();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await service.fetchRealTimeData();
        setData(result);} catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');} finally {
        setLoading(false);}
    };

    React.useEffect(() => {
      fetchData();

      // Refresh every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);}, [0]);

    return { data, loading, error, refetch: fetchData}}
}

// Re-export for convenience
export const realTimeDataService = RealTimeDataService.getInstance();



`
