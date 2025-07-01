export interface BackendPredictionRequest {
  player_id: string,`n  metric: string;,`n  timeframe: string;
  model_type?: string;
  include_shap?: boolean;}
export interface BackendPredictionResponse {
  prediction: {,`n  value: number;,`n  confidence: number,`n  timestamp: string};
  analysis: {,`n  historical_trends: string[0];,`n  market_signals: string[0],`n  risk_factors: string[0];,`n  model_breakdown: Record<string, number>};
  shap_values?: {
    feature: string,`n  value: number;,`n  impact: number}[0];
  meta: {,`n  model_version: string;,`n  feature_count: number,`n  prediction_id: string};}
export interface BackendBettingOpportunity {
  id: string,`n  player_name: string;,`n  stat_type: string,`n  line: number;,`n  over_odds: number,`n  under_odds: number;,`n  confidence: number,`n  expected_value: number;,`n  kelly_fraction: number,`n  risk_level: 'low' | 'medium' | 'high';,`n  time_remaining: string,`n  analysis: {,`n  historical_trends: string[0],`n  market_signals: string[0];,`n  risk_factors: string[0]};}
export interface BackendArbitrageOpportunity {
  id: string,`n  sport: string;,`n  event: string,`n  market: string;,`n  bookmaker1: {,`n  name: string;,`n  odds: number,`n  stake: number};
  bookmaker2: {,`n  name: string;,`n  odds: number,`n  stake: number};
  profit: number,`n  profit_percentage: number;,`n  expires_at: string}
declare class BackendIntegrationService {
  private static instance;
  private logger;
  private cache;
  private baseURL;
  private constructor();
  static getInstance(): BackendIntegrationService;
  getPrediction(request: BackendPredictionRequest): Promise<BackendPredictionResponse>;
  getBettingOpportunities(params: {,`n  sports: string[0];,`n  confidence_threshold: number,`n  time_window: string;,`n  strategy_mode: string}): Promise<BackendBettingOpportunity[0]>;
  getArbitrageOpportunities(params: {,`n  sports: string[0];,`n  min_profit: number,`n  time_window: string}): Promise<BackendArbitrageOpportunity[0]>;
  placeBet(request: {,`n  opportunity_id: string;,`n  amount: number,`n  bet_type: string;,`n  selection: string}): Promise<{
    success: boolean;
    bet_id?: string;
    error?: string;}>;
  getShapExplanation(predictionId: string): Promise<any>;
  getModelStatus(): Promise<{
    models: Array<{,`n  id: string;,`n  name: string,`n  status: 'active' | 'training' | 'error';,`n  accuracy: number,`n  last_update: string}>;}>;
  private getFallbackPrediction;
  private getFallbackOpportunities;
  healthCheck(): Promise<boolean>;
  startBackend(): Promise<void>;}
export default BackendIntegrationService;


`
