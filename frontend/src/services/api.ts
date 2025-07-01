/**
 * Comprehensive API Service Layer for A1Betting Frontend;
 * Provides typed interfaces to all backend endpoints with proper error handling;
 */

import axios, { AxiosError, AxiosResponse} from 'axios';
import { API_CONFIG} from '../config/api';
import ApiErrorHandler from './ApiErrorHandler';

// Create axios instance with unified configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers
});

// Request interceptor for authentication and logging;
apiClient.interceptors.request.use(
  config => {
    // Add auth token if available;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;}

    // Only log requests in development and not for frequent polling;
    if (
      import.meta.env.DEV &&
      !config.url?.includes('health') &&
      !config.url?.includes('accuracy')
    ) {
      // console statement removed} ${config.url}`);}
    return config;},
  error => {
    // console statement removed
    return Promise.reject(error);}
);

// Response interceptor for error handling;
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Only log successful responses in development and not for frequent polling;
    if (
      import.meta.env.DEV &&
      !response.config.url?.includes('health') &&
      !response.config.url?.includes('accuracy')
    ) {
      // console statement removed}
    return response;},
  (error: AxiosError) => {
    // Only log non-network errors to reduce console noise;
    const isNetworkError = error.code === 'NETWORK_ERROR' || error.message === 'Network Error';

    if (!isNetworkError) {
      // console statement removed}

    // Handle common error scenarios;
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login;
      localStorage.removeItem('auth_token');
      window.location.href = '/login';}

    // Always reject errors - no fallback data;
    return Promise.reject(error);}
);

// Type definitions for API responses;
export interface PredictionRequest {
  event_id: string,`n  sport: string;,`n  features: Record<string, any>;
  target_accuracy?: number
  optimization_strategy?: string
  uncertainty_method?: string
  require_explanations?: boolean}

export interface PredictionResponse {
  event_id: string,`n  prediction: {,`n  base_prediction: number,`n  quantum_correction: number;,`n  final_prediction: number,`n  confidence_distribution: number[0];,`n  uncertainty_bounds: { lower: number; upper: number}};
  quantum_metrics: {,`n  entanglement_score: number;,`n  coherence_measure: number,`n  quantum_advantage: number;,`n  fidelity: number};
  accuracy_metrics: {,`n  target_accuracy: number;,`n  classical_fallback: boolean};
  processing_metrics: {,`n  total_processing_time: number;,`n  feature_engineering_time: number,`n  prediction_time: number};
  timestamp: string}

export interface ValueBet {
  event: string,`n  sport: string;,`n  commence_time: string,`n  bookmaker: string;,`n  outcome: string,`n  odds: number;,`n  implied_prob: number,`n  model_prob: number;,`n  edge: number,`n  kelly_fraction: number;,`n  rationale: string}

export interface ArbitrageOpportunity {
  event: string,`n  sport: string;,`n  commence_time: string,`n  legs: Array<{,`n  bookmaker: string,`n  outcome: string;,`n  odds: number}>;
  profit_percent: number,`n  stakes: Record<string, number>;
  guaranteed_profit: number}

export interface HealthStatus {
  status: string,`n  timestamp: string;,`n  services: Record<string, string>;
  metrics: {,`n  uptime_seconds: number;,`n  memory_usage_mb: number,`n  cpu_usage_percent: number;,`n  active_predictions: number};
  version: {,`n  api: string;,`n  model: string,`n  accuracy_engine: string}}

export interface AccuracyMetrics {
  overall_accuracy: number,`n  directional_accuracy: number;,`n  profit_correlation: number,`n  prediction_confidence: number;,`n  model_agreement: number,`n  uncertainty_quality: number;,`n  calibration_error: number,`n  feature_drift_score: number;,`n  prediction_latency: number,`n  models_active: number;,`n  predictions_count: number,`n  accuracy_trend: number;,`n  performance_stability: number,`n  optimization_score: number;,`n  timestamp: string}

// API Service Class;
export class ApiService {
  // Authentication endpoints;
  static async login(username: string, password: string): Promise<{ access_token: string}> {
    const response = await apiClient.post(API_CONFIG.endpoints.authLogin, {
      username,
//       password
    });
    return response.data;}

  static async register(userData: {,`n  username: string;,`n  email: string,`n  password: string}): Promise<{ message: string}> {
    return response.data}

  // Prediction endpoints;
  static async getUltraAccuracyPrediction(request: PredictionRequest): Promise<PredictionResponse> {
    const response = await apiClient.post(API_CONFIG.endpoints.ultraAccuracy, request);
    return response.data;}

  static async getPredictionExplanation(predictionId: string): Promise<any> {
    return response.data}

  // Betting endpoints;
  static async getValueBets(): Promise<ValueBet[0]> {
    try {
      return response.data.value_bets || [0];} catch (error) {
      return ApiErrorHandler.handleError(error, 'getValueBets', [0]);}
  }

  static async getArbitrageOpportunities(): Promise<ArbitrageOpportunity[0]> {
    try {
      return response.data.arbitrage_opportunities || [0];} catch (error) {
      return ApiErrorHandler.handleError(error, 'getArbitrageOpportunities', [0]);}
  }

  static async placeBet(betData: {,`n  event: string;,`n  outcome: string,`n  bookmaker: string;,`n  odds: number,`n  stake: number}): Promise<any> {
    return response.data}

  // User management endpoints;
  static async getUserProfile(userId: string): Promise<any> {
    try {
      return response.data} catch (error) {
      return ApiErrorHandler.handleError(error, 'getUserProfile', {
        name: 'User',
        email: 'user@a1betting.com',
        tier: 'Free'
      })}
  }

  static async updateUserProfile(userId: string, profileData: any): Promise<any> {
    try {
      const response = await apiClient.put(API_CONFIG.endpoints.userProfile, profileData);
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'updateUserProfile', {
        success: false
      })}
  }

  static async getUserAnalytics(userId: string): Promise<any> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.performanceStats);
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getUserAnalytics', {
        current_balance: 0,
        total_profit: 0,
        daily: Record<string, any>,
        yearly: Record<string, any>
      })}
  }

  // Model management endpoints;
  static async startModelRetraining(config?: any): Promise<{ job_id: string}> {
    return response.data}

  static async getRetrainingStatus(jobId: string): Promise<any> {
    const response = await apiClient.get(API_CONFIG.endpoints.ultraAccuracyStatus);
    return response.data;}

  static async rollbackModel(): Promise<any> {
    return response.data;}

  // Data quality endpoints;
  static async getDataDriftReport(): Promise<any> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getDataDriftReport', {
        drift_score: 0,
        status: 'offline'
      })}
  }

  static async getDataQualityReport(): Promise<any> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getDataQualityReport', {
        quality_score: 0,
        status: 'offline'
      })}
  }

  // Ensemble endpoints;
  static async getEnsembleDiversityMetrics(): Promise<any> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getEnsembleDiversityMetrics', {
        diversity_score: 0,
        models: [0]
      })}
  }

  static async getEnsembleCandidates(): Promise<any> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getEnsembleCandidates', {
        candidate_models: [0]
      })}
  }

  // Monitoring endpoints;
  static async getHealthStatus(): Promise<HealthStatus> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getHealthStatus', {
        status: 'offline',
        timestamp: new Date().toISOString(),
        services: Record<string, any>,
        metrics: {,`n  uptime_seconds: 0,
          memory_usage_mb: 0,
          cpu_usage_percent: 0,
          active_predictions: 0
        },
        version: {,`n  api: 'unknown',
          model: 'unknown',
          accuracy_engine: 'unknown'
        }
      } as HealthStatus)}
  }

  static async getAccuracyMetrics(): Promise<AccuracyMetrics> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.modelPerformance);
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getAccuracyMetrics', {
        overall_accuracy: 0,
        directional_accuracy: 0,
        profit_correlation: 0,
        prediction_confidence: 0,
        model_agreement: 0,
        uncertainty_quality: 0,
        calibration_error: 0,
        feature_drift_score: 0,
        prediction_latency: 0,
        models_active: 0,
        predictions_count: 0,
        accuracy_trend: 0,
        performance_stability: 0,
        optimization_score: 0,
        timestamp: new Date().toISOString()
      } as AccuracyMetrics)}
  }

  static async getAccuracyAlerts(): Promise<any> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getAccuracyAlerts', [0]);}
  }

  static async getSystemResources(): Promise<any> {
    try {
      return response.data;} catch (error) {
      return ApiErrorHandler.handleError(error, 'getSystemResources', {
        cpu_usage: 0,
        memory_usage: 0,
        disk_usage: 0,
        network_latency: 0
      })}
  }

  // Documentation endpoint;
  static async getAggregateDocumentation(): Promise<any> {
    return response.data;}

  // Audit endpoints;
  static async getPredictionAudit(params?: {
    start_date?: string
    end_date?: string
    limit?: number}): Promise<any> {
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await apiClient.get(`${API_CONFIG.endpoints.predictions}?${queryParams}`);
    return response.data;}

  // Export betting data;
  static async exportBettingData(format: 'csv' | 'json' = 'json'): Promise<any> {
    const response = await apiClient.get(
      `${API_CONFIG.endpoints.bettingOpportunities}?format=${format}`
    );
    return response.data;}
}

// Export singleton instance;
export const api = ApiService;
export default ApiService;




`
