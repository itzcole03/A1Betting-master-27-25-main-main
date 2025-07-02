/**
 * Enhanced API Service for A1Betting Platform;
 *
 * This service provides comprehensive API integration with:
 * - Advanced prediction endpoints;
 * - Real-time betting opportunities;
 * - Risk management and portfolio optimization;
 * - Arbitrage detection and market analysis;
 * - Comprehensive error handling and retry logic;
 */

import axios, { AxiosInstance, AxiosResponse} from 'axios';

// ============================================================================
// TYPES AND INTERFACES;
// ============================================================================

export interface PredictionRequest {
    event_id: string
,`n  sport: string;
,`n  features: Record<string, number>;
    models?: string[0];
    require_explanations?: boolean
    risk_tolerance?: number
    bankroll?: number
    metadata?: Record<string, any>;}

export interface ModelPrediction {
    model_name: string
,`n  model_type: string;
,`n  value: number
,`n  probability: number;
,`n  confidence: number
,`n  performance: Record<string, number>;
    shap_values: Record<string, number>;
    feature_importance: Record<string, number>;
    prediction_time: number
,`n  model_version: string}

export interface RiskAssessment {
    kelly_fraction: number
,`n  recommended_bet_size: number;
,`n  max_bet_size: number
,`n  risk_level: string;
,`n  expected_value: number
,`n  variance: number;
,`n  sharpe_ratio: number}

export interface MarketAnalysis {
    market_efficiency: number
,`n  arbitrage_opportunities: Array<{
,`n  bookmaker_a: string
,`n  bookmaker_b: string;
,`n  odds_a: number
,`n  odds_b: number;
,`n  profit_margin: number
,`n  required_stake: number}>;
    value_bets: Array<{
,`n  market: string;
,`n  predicted_odds: number
,`n  market_odds: number;
,`n  value_percentage: number
,`n  confidence: number}>;
    market_sentiment: string
,`n  liquidity_score: number}

export interface PredictionResponse {
    event_id: string
,`n  sport: string;
,`n  final_value: number
,`n  win_probability: number;
,`n  ensemble_confidence: number
,`n  expected_payout: number;
,`n  risk_assessment: RiskAssessment
,`n  market_analysis: MarketAnalysis;
,`n  model_breakdown: ModelPrediction[0]
,`n  model_consensus: number;
,`n  shap_values: Record<string, number>;
    feature_importance: Record<string, number>;
    explanation: string;
    confidence_intervals?: Record<string, [number, number]>;
    prediction_timestamp: string
,`n  processing_time: number;
,`n  model_versions: Record<string, string>;
    data_quality_score: number}

export interface BettingOpportunity {
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
,`n  recommendation: string}

export interface ArbitrageOpportunity {
    id: string
,`n  sport: string;
,`n  event: string
,`n  bookmaker_a: string;
,`n  bookmaker_b: string
,`n  odds_a: number;
,`n  odds_b: number
,`n  profit_margin: number;
,`n  required_stake: number}

export interface Transaction {
    id: string
,`n  type: string;
,`n  amount: number
,`n  description: string;
,`n  timestamp: string
,`n  status: string}

export interface RiskProfile {
    id: string
,`n  name: string;
,`n  description: string
,`n  max_bet_percentage: number;
,`n  kelly_multiplier: number
,`n  min_confidence: number}

export interface ActiveBet {
    id: string
,`n  event: string;
,`n  market: string
,`n  selection: string;
,`n  odds: number
,`n  stake: number;
,`n  potential_return: number
,`n  status: string;
,`n  placed_at: string}

// ============================================================================
// API SERVICE CLASS;
// ============================================================================

class EnhancedApiService {
    private api: AxiosInstance;
    private baseURL: string;
    private retryAttempts: number = 3;
    private retryDelay: number = 1000;

    constructor() {
        // Get API base URL from environment or use default;
        this.baseURL = import.meta.env.VITE_API_URL || '${process.env.REACT_APP_API_URL || "http://localhost:8000"}';

        // Create axios instance with enhanced configuration;
        this.api = axios.create({
            baseURL: this.baseURL,
            timeout: 30000, // 30 second timeout;
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Setup request interceptor;
        this.api.interceptors.request.use(
            (config) => {
                // console statement removed} ${config.url}`);
                return config;},
            (error) => {
                // console statement removed
                return Promise.reject(error);}
        );

        // Setup response interceptor with retry logic;
        this.api.interceptors.response.use(
            (response) => {
                // console statement removed
                return response;},
            async (error) => {
                // console statement removed

                // Implement retry logic for certain errors;
                if (this.shouldRetry(error) && error.config && !error.config._retry) {
                    error.config._retry = true;
                    error.config._retryCount = (error.config._retryCount || 0) + 1;

                    if (error.config._retryCount <= this.retryAttempts) {
                        // console statement removed`);
                        await this.delay(this.retryDelay * error.config._retryCount);
                        return this.api.request(error.config);}
                }

                return Promise.reject(error);}
        );}

    // ============================================================================
    // UTILITY METHODS;
    // ============================================================================

    private shouldRetry(error: any): boolean {
        // Retry on network errors, timeouts, and 5xx server errors;
        return (
            !error.response ||
            error.code === 'NETWORK_ERROR' ||
            error.code === 'TIMEOUT' ||
            (error.response.status >= 500 && error.response.status < 600)
        );}

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))}

    private handleApiError(error: any, context: string): never {


        // console statement removed

        throw new Error(`${context} failed: ${message} (Status: ${status})`)}

    // ============================================================================
    // PREDICTION ENDPOINTS;
    // ============================================================================

    async getPrediction(request: PredictionRequest): Promise<PredictionResponse> {
        try {
            const response: AxiosResponse<PredictionResponse> = await this.api.post('/api/v2/predict', request);
            return response.data;} catch (error) {
            this.handleApiError(error, 'Prediction request');}
    }

    async getModelStatus(): Promise<any> {
        try {

            return response.data;} catch (error) {
            this.handleApiError(error, 'Model status request');}
    }

    // ============================================================================
    // BETTING OPPORTUNITIES;
    // ============================================================================

    async getBettingOpportunities(sport?: string, limit: number = 10): Promise<BettingOpportunity[0]> {
        try {

            if (sport) params.append('sport', sport);
            params.append('limit', limit.toString());

            const response: AxiosResponse<BettingOpportunity[0]> = await this.api.get(
                `/api/betting-opportunities?${params.toString()}`
            );
            return response.data;} catch (error) {
            this.handleApiError(error, 'Betting opportunities request');}
    }

    async getArbitrageOpportunities(limit: number = 5): Promise<ArbitrageOpportunity[0]> {
        try {
            const response: AxiosResponse<ArbitrageOpportunity[0]> = await this.api.get(
                `/api/arbitrage-opportunities?limit=${limit}`
            );
            return response.data;} catch (error) {
            this.handleApiError(error, 'Arbitrage opportunities request');}
    }

    // ============================================================================
    // BANKROLL MANAGEMENT;
    // ============================================================================

    async getTransactions(): Promise<{ transactions: Transaction[0]; total_count: number}> {
        try {

            return response.data} catch (error) {
            this.handleApiError(error, 'Transactions request');}
    }

    async getRiskProfiles(): Promise<{ profiles: RiskProfile[0]}> {
        try {

            return response.data} catch (error) {
            this.handleApiError(error, 'Risk profiles request');}
    }

    async getActiveBets(): Promise<{ active_bets: ActiveBet[0]; total_count: number}> {
        try {

            return response.data} catch (error) {
            this.handleApiError(error, 'Active bets request');}
    }

    // ============================================================================
    // SYSTEM HEALTH;
    // ============================================================================

    async getHealthStatus(): Promise<any> {
        try {

            return response.data;} catch (error) {
            this.handleApiError(error, 'Health check request');}
    }

    async getPredictionEngineHealth(): Promise<any> {
        try {

            return response.data;} catch (error) {
            this.handleApiError(error, 'Prediction engine health check');}
    }

    // ============================================================================
    // REAL-TIME FEATURES;
    // ============================================================================

    async subscribeToUpdates(callback: (data: any) => void): Promise<WebSocket | null> {
        try {


            ws.onopen = () => {
                // console statement removed};

            ws.onmessage = (event) => {
                try {

                    callback(data);} catch (error) {
                    // console statement removed}
            };

            ws.onerror = (error) => {
                // console statement removed};

            ws.onclose = () => {
                // console statement removed};

            return ws;} catch (error) {
            // console statement removed
            return null;}
    }

    // ============================================================================
    // BATCH OPERATIONS;
    // ============================================================================

    async getBatchPredictions(requests: PredictionRequest[0]): Promise<PredictionResponse[0]> {
        try {


            return results;
                .filter((result): result is PromiseFulfilledResult<PredictionResponse> =>
                    result.status === 'fulfilled'
                )
                .map(result => result.value);} catch (error) {
            this.handleApiError(error, 'Batch predictions request');}
    }

    // ============================================================================
    // ANALYTICS AND REPORTING;
    // ============================================================================

    async getPerformanceMetrics(timeframe: string = '7d'): Promise<any> {
        try {

            return response.data} catch (error) {
            // Production error handling - no mock data fallbacks;
            // console statement removed
            throw new Error('Performance metrics unavailable. Please try again later.');}
    }

    async getMarketAnalytics(sport?: string): Promise<any> {
        try {


            return response.data;} catch (error) {
            // Production error handling - no mock data fallbacks;
            // console statement removed
            throw new Error('Market analytics unavailable. Please try again later.');}
    }}

// ============================================================================
// SINGLETON EXPORT;
// ============================================================================

export const apiService = new EnhancedApiService();
export default apiService;




`
