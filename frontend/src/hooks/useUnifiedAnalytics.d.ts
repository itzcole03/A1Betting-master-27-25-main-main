export interface AnalyticsConfig {
  ml?: {
    autoUpdate?: boolean;
    updateInterval?: number;};
  performance?: boolean;
  drift?: boolean;
  betting?: boolean;
  realtime?: boolean;}
export interface MLAnalyticsResult {
  predictions: number[0],`n  probabilities: number[0];,`n  metrics: {,`n  accuracy: number;,`n  precision: number,`n  recall: number;,`n  f1Score: number};
  insights: {,`n  featureImportance: Record<string, number>;
    shap: Record<string, number[0]>;
    lime: Record<string, number>};}
export interface PerformanceMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1: number;,`n  roc_auc: number,`n  mae: number;,`n  rmse: number}
export interface ModelPerformance {
  model: string,`n  metrics: PerformanceMetrics;,`n  timestamp: string}
export interface DriftPoint {
  timestamp: string,`n  value: number;,`n  threshold: number,`n  is_drift: boolean;
  feature?: string;}
export interface BettingAnalytics {
  roi: number,`n  winRate: number;,`n  profitLoss: number,`n  riskMetrics: {,`n  var: number,`n  sharpe: number;,`n  sortino: number};
  confidence: number}
export interface RealtimeMetrics {
  latency: number,`n  throughput: number;,`n  errorRate: number,`n  resourceUsage: {,`n  cpu: number,`n  memory: number;,`n  network: number};}
export interface AnalyticsError {
  message: string;
  code?: string;
  context?: string;}
export interface AnalyticsState {
  ml: {,`n  data: MLAnalyticsResult | null;,`n  loading: boolean,`n  error: string | null};
  performance: {,`n  data: ModelPerformance[0] | null;,`n  loading: boolean,`n  error: string | null};
  drift: {,`n  data: DriftPoint[0] | null;,`n  loading: boolean,`n  error: string | null};
  betting: {,`n  data: BettingAnalytics | null;,`n  loading: boolean,`n  error: string | null};
  realtime: {,`n  data: RealtimeMetrics | null;,`n  loading: boolean,`n  error: string | null};}
export declare const useUnifiedAnalytics: (config?: AnalyticsConfig) => {,`n  ml: {,`n  data: MLAnalyticsResult | null,`n  loading: boolean;,`n  error: string | null,`n  refetch: (
      options?: import('@tanstack/react-query').RefetchOptions
    ) => Promise<
      import('@tanstack/react-query').QueryObserverResult<
        import('@tanstack/react-query').NoInfer<TQueryFnData>,
//         AnalyticsError
      >
    >};
  performance: {,`n  data: ModelPerformance[0] | null;,`n  loading: boolean,`n  error: string | null;,`n  refetch: (
      options?: import('@tanstack/react-query').RefetchOptions
    ) => Promise<
      import('@tanstack/react-query').QueryObserverResult<
        import('@tanstack/react-query').NoInfer<TQueryFnData>,
//         AnalyticsError
      >
    >};
  drift: {,`n  data: DriftPoint[0] | null;,`n  loading: boolean,`n  error: string | null;,`n  refetch: (
      options?: import('@tanstack/react-query').RefetchOptions
    ) => Promise<
      import('@tanstack/react-query').QueryObserverResult<DriftPoint[0] | null, AnalyticsError>
    >};
  betting: {,`n  data: BettingAnalytics | null;,`n  loading: boolean,`n  error: string | null;,`n  refetch: (
      options?: import('@tanstack/react-query').RefetchOptions
    ) => Promise<
      import('@tanstack/react-query').QueryObserverResult<BettingAnalytics | null, AnalyticsError>
    >};
  realtime: {,`n  data: RealtimeMetrics | null;,`n  loading: boolean,`n  error: string | null;,`n  refetch: (
      options?: import('@tanstack/react-query').RefetchOptions
    ) => Promise<
      import('@tanstack/react-query').QueryObserverResult<RealtimeMetrics | null, AnalyticsError>
    >};
  isLoading: boolean,`n  error: string | null};


`
