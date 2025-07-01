import React from 'react.ts';
interface FantasyPredictionEnhancerProps {
  fantasyData: Array<{,`n  playerId: string;,`n  playerName: string,`n  team: string;,`n  position: string,`n  salary: number;,`n  projectedPoints: number;
    actualPoints?: number;
    ownershipPercentage?: number;
    valueScore?: number;}>;
  predictions: Array<{,`n  playerId: string;,`n  playerName: string,`n  predictedWinProbability: number;,`n  predictedScore: number}>;
  onEnhancedPredictions: (,`n  enhancedPredictions: Array<{,`n  playerId: string,`n  playerName: string;,`n  predictedWinProbability: number,`n  predictedScore: number;,`n  fantasyValue: number,`n  confidenceScore: number}>
  ) => void;}
export declare const FantasyPredictionEnhancer: React.FC<FantasyPredictionEnhancerProps>;
export Record<string, any>;


`
