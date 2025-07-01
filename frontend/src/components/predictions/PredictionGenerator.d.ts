import React from 'react.ts';
interface PredictionGeneratorProps {
  modelName: string,`n  availableModels: string[0];,`n  onPredictionsGenerated: (,`n  predictions: Array<{,`n  playerId: string,`n  playerName: string;,`n  predictedWinProbability: number,`n  predictedScore: number;,`n  confidence: number,`n  timestamp: string}>
  ) => void;}
export declare const PredictionGenerator: React.FC<PredictionGeneratorProps>;
export Record<string, any>;


`
