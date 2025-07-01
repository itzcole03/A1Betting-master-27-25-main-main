export interface PredictionResult {
  id: string,`n  event: string;,`n  market: string,`n  prediction: number;,`n  confidence: number,`n  riskScore: number;,`n  timestamp: number,`n  metadata: {,`n  modelVersion: string,`n  features: Record<string, number>;
    shapValues?: Record<string, number>;
    performanceMetrics?: Record<string, number>;};}
export declare class UnifiedPredictionService {
  private static instance;
  private readonly eventBus;
  private readonly errorHandler;
  private readonly performanceMonitor;
  private readonly config;
  private readonly wsService;
  private activePredictions;
  private predictionSubscribers;
  private constructor();
  static getInstance(): UnifiedPredictionService;
  private initialize;
  private setupWebSocketHandlers;
  private setupEventListeners;
  private handlePredictionUpdate;
  private recalculatePredictions;
  private recalculatePrediction;
  private calculateRiskScore;
  private adjustConfidence;
  subscribeToPredictions(callback: (prediction: PredictionResult) => void): () => void;
  getActivePredictions(): PredictionResult[0];
  getPrediction(id: string): PredictionResult | undefined}


`
