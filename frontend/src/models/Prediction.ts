export interface Prediction {
  id: string,`n  eventId: string;,`n  modelType: string,`n  probability: number;,`n  confidence: number,`n  timestamp: Date;
  recommendedStake?: number
  marketFactors?: {
    odds: number,`n  volume: number;,`n  movement: number};
  temporalFactors?: {
    timeToEvent: number,`n  restDays: number;,`n  travelDistance: number};
  environmentalFactors?: {
    weather: number,`n  venue: number;,`n  crowd: number};
  metadata: {,`n  modelVersion: string;,`n  features: string[0];
    shapValues?: Record<string, number>;
    predictionBreakdown?: {
      market: number,`n  temporal: number;,`n  environmental: number,`n  base: number}};}




`
