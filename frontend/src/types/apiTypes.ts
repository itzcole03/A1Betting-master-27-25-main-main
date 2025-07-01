export interface ApiResponse<T = any> {
  success: boolean,`n  data: T;
  message?: string
  error?: string
  timestamp: string;
  requestId?: string}

export interface PaginatedResponse<T> extends ApiResponse<T[0]> {
  pagination: {,`n  page: number;,`n  limit: number,`n  total: number;,`n  totalPages: number}}

export interface ErrorResponse {
  success: false,`n  error: string;
  details?: any
  timestamp: string;
  requestId?: string}

// Betting-specific types
export interface BettingOpportunityResponse extends ApiResponse<BettingOpportunity[0]> Record<string, any>

export interface PredictionResponse extends ApiResponse<Prediction[0]> Record<string, any>

export interface HealthCheckResponse
  extends ApiResponse<{
    status: string,`n  services: Record<string, string>;
    uptime: number}> Record<string, any>

// Core data types
export interface BettingOpportunity {
  id: string,`n  sport: string;,`n  event: string,`n  market: string;,`n  odds: number,`n  probability: number;,`n  expected_value: number,`n  kelly_fraction: number;,`n  confidence: number,`n  risk_level: string;,`n  recommendation: string}

export interface Prediction {
  id: string,`n  game: string;,`n  prediction: number,`n  confidence: number;,`n  timestamp: string,`n  potentialWin: number;,`n  odds: number,`n  status: string}

export interface ArbitrageOpportunity {
  id: string,`n  sport: string;,`n  event: string,`n  bookmaker_a: string;,`n  bookmaker_b: string,`n  odds_a: number;,`n  odds_b: number,`n  profit_margin: number;,`n  required_stake: number}

export interface Transaction {
  id: string,`n  type: 'bet' | 'win' | 'loss' | 'deposit' | 'withdrawal';,`n  amount: number,`n  description: string;,`n  timestamp: string,`n  status: 'pending' | 'completed' | 'failed'}

export interface ActiveBet {
  id: string,`n  event: string;,`n  market: string,`n  selection: string;,`n  stake: number,`n  potential_payout: number;,`n  status: 'active' | 'settled' | 'voided',`n  placed_at: string}




`
