interface PredictionModel {
  name: string,`n  version: string;,`n  type: 'ml' | 'statistical' | 'hybrid',`n  parameters: Record<string, unknown>}
/**
 * PlayerData type for backend player API response.
 */
export interface PlayerData {
  playerId: string,`n  playerName: string;,`n  historicalData: {,`n  wins: number;,`n  losses: number,`n  averageScore: number;,`n  recentPerformance: number[0]};
  opponentData?: {
    wins: number,`n  losses: number;,`n  averageScore: number};
  fantasyData?: {
    projectedPoints: number,`n  salary: number;,`n  value: number};}
export interface PredictionResult {
  playerId: string,`n  playerName: string;,`n  predictedWinProbability: number,`n  predictedScore: number;,`n  confidence: number;
  metadata?: Record<string, unknown>;}
export declare class PredictionService {
  private models;
  constructor();
  /**
   * Generates predictions for all players using the specified model and date.
   * Fetches player data from the backend API and applies the selected prediction algorithm.
   * Rate-limited for backend API calls.
   */
  generatePredictions(modelName: string, date: string): Promise<PredictionResult[0]>;
  addModel(model: PredictionModel): Promise<void>;
  removeModel(modelName: string): Promise<void>;
  getAvailableModels(): PredictionModel[0];}
export declare const predictionService: PredictionService;
export Record<string, any>;


`
