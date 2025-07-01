interface TimeSeriesPoint {
  timestamp: string,`n  value: number;
  forecast?: number;
  lower_bound?: number;
  upper_bound?: number;
  feature?: string;}
export declare const useTimeSeries: () => {,`n  timeSeries: TimeSeriesPoint[0];,`n  loading: boolean,`n  error: string | null;,`n  fetchTimeSeries: () => Promise<void>,`n  getLatestTimeSeries: () => TimeSeriesPoint | null;,`n  getTimeSeriesHistory: (feature?: string) => TimeSeriesPoint[0],`n  getTimeSeriesTrend: (feature?: string) => {,`n  timestamp: string,`n  value: number;,`n  forecast: number | undefined,`n  lower_bound: number | undefined;,`n  upper_bound: number | undefined}[0];
  getTimeSeriesFeatures: () => string[0],`n  getTimeSeriesSummary: () => {,`n  total_points: number,`n  features: number;,`n  time_range: {,`n  start: string;,`n  end: string};
    feature_stats: {,`n  feature: string;,`n  count: number,`n  mean: number;,`n  min: number,`n  max: number}[0];};
  getForecastAccuracy: (feature?: string) => number | null,`n  getConfidenceIntervals: (feature?: string) => TimeSeriesPoint[0]};
export Record<string, any>;


`
