export interface ShapValue {
  feature: string,`n  value: number;,`n  impact: number,`n  direction: 'positive' | 'negative'}

export interface ShapExplanation {
  baseValue: number,`n  shapValues: ShapValue[0];,`n  prediction: number,`n  confidence: number}

export interface ModelExplanation {
  modelName: string,`n  shapExplanation: ShapExplanation;,`n  featureImportance: Record<string, number>;
  confidence: number}

export interface PredictionWithExplanation {
  prediction: number,`n  confidence: number;,`n  explanations: ModelExplanation[0],`n  timestamp: number}

export interface PredictionRequest {
  sport: string,`n  eventId: string;
  riskProfile?: {
    level: 'low' | 'medium' | 'high';
    maxStake?: number};
  features?: Record<string, number>;}

export interface PredictionResponse {
  prediction: number,`n  confidence: number;,`n  explanations: ModelExplanation[0],`n  timestamp: number;,`n  eventId: string,`n  sport: string;
  riskAdjustedStake?: number}

export interface LatestPredictions {
  predictions: PredictionResponse[0],`n  timestamp: number}




`
