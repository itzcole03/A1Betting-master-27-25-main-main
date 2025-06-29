import ApiService from '../api/ApiService';

interface PlayerProp {
  player: string;
  statType: string; // e.g., points, rebounds, assists
  line: number;
  odds: {
    over: number;
    under: number;
  };
  book: string;
  timestamp: number;
}

interface PropAnalysis {
  prop: PlayerProp;
  prediction: {
    expectedValue: number;
    probability: number;
    confidence: number;
    recommendation: 'over' | 'under' | 'pass';
  };
  insights: {
    keyFactors: string[];
    trendStrength: number;
    valueRating: number;
    riskScore: number;
  };
  models?: {
    modelId: string;
    prediction: number;
    confidence: number;
  }[];
}

interface LineupOptimization {
  legs: PropAnalysis[];
  expectedValue: number;
  winProbability: number;
  riskScore: number;
  correlationMatrix: number[][];
}

export class PlayerPropService {
  /**
   * Analyzes a single player prop by sending it to the backend for evaluation.
   * @param prop - The player prop to analyze.
   * @returns A promise that resolves with the detailed analysis from the backend.
   */
  public async analyzeProp(prop: PlayerProp): Promise<PropAnalysis> {
    try {
      // The backend is expected to handle the feature extraction, prediction, and insight generation.
      const analysis = await ApiService.post<PropAnalysis>('/api/v1/props/analyze', prop);
      return analysis;
    } catch (error) {
      console.error(`Error analyzing prop for ${prop.player}:`, error);
      // Return a default/error state or re-throw
      throw new Error('Failed to analyze prop.');
    }
  }

  /**
   * Sends a list of available props to the backend to get an optimized lineup.
   * @param availableProps - An array of player props available for selection.
   * @param targetLegs - The desired number of legs in the lineup.
   * @returns A promise that resolves with the optimized lineup from the backend.
   */
  public async optimizeLineup(
    availableProps: PlayerProp[],
    targetLegs: number
  ): Promise<LineupOptimization> {
    try {
      const optimizationRequest = {
        props: availableProps,
        target_legs: targetLegs,
      };
      const lineup = await ApiService.post<LineupOptimization>('/api/v1/lineups/optimize', optimizationRequest);
      return lineup;
    } catch (error) {
      console.error('Error optimizing lineup:', error);
      throw new Error('Failed to optimize lineup.');
    }
  }
}

export const playerPropService = new PlayerPropService();
