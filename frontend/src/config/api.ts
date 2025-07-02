/**
 * Unified API Configuration for A1Betting Frontend
 * This file centralizes all API endpoint definitions and base URL configuration
 * to ensure consistency across all services and prevent endpoint mismatches.
 */

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_BACKEND_URL || '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
  timeout: 30000,

  endpoints: {
    // Ultra-Accuracy Prediction Endpoints
    ultraAccuracy: '/api/ultra-accuracy/predict',
    ultraAccuracyHealth: '/api/ultra-accuracy/health',
    ultraAccuracyMetrics: '/api/ultra-accuracy/performance-metrics',
    ultraAccuracyStatus: '/api/ultra-accuracy/system-status',

    // Legacy Compatibility Endpoints
    legacyUltraAccuracy: '/api/v4/predict/ultra-accuracy',

    // Core Prediction Endpoints
    predictions: '/api/predictions/prizepicks',
    bettingOpportunities: '/api/betting-opportunities',
    arbitrageOpportunities: '/api/arbitrage-opportunities',

    // Analytics & Performance
    analytics: '/api/analytics/summary',
    performanceStats: '/api/v1/performance-stats',
    modelPerformance: '/api/ultra-accuracy/model-performance',

    // Health & Monitoring
    health: '/api/health/status',
    systemHealth: '/health',

    // PrizePicks Integration
    prizePicksProps: '/api/prizepicks/props',
    prizePicksRecommendations: '/api/prizepicks/recommendations',

    // User & Authentication
    authLogin: '/auth/login',
    authRegister: '/auth/register',
    authMe: '/auth/me',
    userProfile: '/api/user/profile',

    // Trading & Transactions
    transactions: '/api/transactions',
    activeBets: '/api/active-bets',
    riskProfiles: '/api/risk-profiles',

    // Data Sources
    sportRadarGames: '/api/v1/sr/games',
    eventOdds: '/api/v1/odds',
    unifiedData: '/api/v1/unified-data',

    // Match Predictions
    matchPrediction: '/api/v1/match-prediction',

    // Features & ML
    features: '/features',
    predict: '/predict'
  },

  // Request headers
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.endpoints;

/**
 * Get the full URL for an API endpoint
 */
export const getApiUrl = (endpoint: ApiEndpoint): string => {
  return `${API_CONFIG.baseURL}${API_CONFIG.endpoints[endpoint]}`};

/**
 * Get the endpoint path only (without base URL)
 */
export const getApiEndpoint = (endpoint: ApiEndpoint): string => {
  return API_CONFIG.endpoints[endpoint]};

export default API_CONFIG;



`
