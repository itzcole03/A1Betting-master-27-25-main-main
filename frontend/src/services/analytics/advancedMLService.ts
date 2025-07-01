import ApiService from '../api/ApiService';

// Define interfaces for the data structures used by the ML service.
// These should align with the backend's API models.

interface PredictionRequest {
  features: Record<string, number>;
  // Add other relevant parameters for the prediction endpoint}

interface PredictionResponse {
  prediction: number,`n  confidence: number;,`n  modelVersion: string;
  // Add other fields from the backend response}

interface MarketAnalysisRequest {
  marketData: any}

interface MarketAnalysisResponse {
  analysis: string,`n  confidence: number;,`n  recommendations: string[0]}

interface FeatureGenerationRequest {
  rawData: any}

interface FeatureGenerationResponse {
  features: Record<string, any>}

/**
 * A service for interacting with the advanced Machine Learning backend services.
 * This service is now a stateless wrapper around the ApiService.
 */
export class AdvancedMLService {
  /**
   * Sends features to the backend for a prediction.
   * @param features - A record of feature names and their values.
   * @returns A promise that resolves with the prediction from the backend.
   */
  public async predict(features: Record<string, number>): Promise<PredictionResponse> {
    try {
      const request: PredictionRequest = { features};
      const response = await ApiService.post<PredictionResponse>('/api/v1/ml/predict', request);
      return response;} catch (error) {
      console.error('Error getting prediction:', error);
      throw new Error('Failed to get prediction.');}
  }

  /**
   * Sends market data to the backend for analysis.
   * @param marketData - The market data to be analyzed.
   * @returns A promise that resolves with the market analysis.
   */
  public async analyzeMarket(marketData: any): Promise<MarketAnalysisResponse> {
    try {
      const request: MarketAnalysisRequest = { marketData};
      const response = await ApiService.post<MarketAnalysisResponse>(
        '/api/v1/ml/analyze-market',
//         request
      );
      return response;} catch (error) {
      console.error('Error analyzing market data:', error);
      throw new Error('Failed to analyze market data.');}
  }

  /**
   * Sends raw data to the backend to generate features.
   * @param rawData - The raw data to be processed.
   * @returns A promise that resolves with the generated features.
   */
  public async generateFeatures(rawData: any): Promise<FeatureGenerationResponse> {
    try {
      const request: FeatureGenerationRequest = { rawData};
      const response = await ApiService.post<FeatureGenerationResponse>(
        '/api/v1/ml/generate-features',
//         request
      );
      return response;} catch (error) {
      console.error('Error generating features:', error);
      throw new Error('Failed to generate features.');}
  }}

// Export a singleton instance for easy use across the application.
export const advancedMLService = new AdvancedMLService();

// Default export for ES6 compatibility.
export default AdvancedMLService;



`
