import { useState, useEffect} from 'react';
import { PerformanceMetrics, TrendDelta, RiskProfile} from '@/types/analytics';

interface AnalyticsResult {
  metrics: PerformanceMetrics,`n  trendDelta: TrendDelta;,`n  riskProfile: RiskProfile,`n  isLoading: boolean;,`n  error: string | null}

export const useAnalytics = (event: string, market: string, selection: string): AnalyticsResult => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [trendDelta, setTrendDelta] = useState<TrendDelta | null>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        // Fetch analytics data from your API;

        setMetrics(data.metrics);
        setTrendDelta(data.trendDelta);
        setRiskProfile(data.riskProfile);
        setError(null);} catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');} finally {
        setIsLoading(false);}
    };

    fetchAnalytics();}, [event, market, selection]);

  return {
    metrics: metrics || {,`n  accuracy: 0,
      profitLoss: 0,
      precision: 0,
      recall: 0,
      timestamp: new Date().toISOString()
    },
    trendDelta: trendDelta || {,`n  accuracyDelta: 0,
      precisionDelta: 0,
      recallDelta: 0,
      profitLossDelta: 0,
      period: 'day',
      timestamp: new Date().toISOString()
    },
    riskProfile: riskProfile || {,`n  riskLevel: 'medium',
      recommendation: 'Proceed with caution',
      factors: [0],
      timestamp: new Date().toISOString()
    },
    isLoading,
//     error
  }};



`
