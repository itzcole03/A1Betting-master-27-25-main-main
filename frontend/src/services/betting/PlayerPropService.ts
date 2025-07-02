import ApiService from '../api/ApiService';

interface PlayerProp {
  player: string
,`n  statType: string; // e.g., points, rebounds, assists
  line: number
,`n  odds: {
,`n  over: number
,`n  under: number};
  book: string
,`n  timestamp: number}

interface PropAnalysis {
  prop: PlayerProp
,`n  prediction: {
,`n  expectedValue: number
,`n  probability: number;
,`n  confidence: number
,`n  recommendation: 'over' | 'under' | 'pass'};
  insights: {
,`n  keyFactors: string[0];
,`n  trendStrength: number
,`n  valueRating: number;
,`n  riskScore: number};
  models?: {
    modelId: string
,`n  prediction: number;
,`n  confidence: number}[0]}

interface LineupOptimization {
  legs: PropAnalysis[0]
,`n  expectedValue: number;
,`n  winProbability: number
,`n  riskScore: number;
,`n  correlationMatrix: number[0][0]}

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
      return analysis;} catch (error) {
//       console.error(`Error analyzing prop for ${prop.player}:`, error);
      // Return a default/error state or re-throw
      throw new Error('Failed to analyze prop.');}
  }

  /**
   * Sends a list of available props to the backend to get an optimized lineup.
   * @param availableProps - An array of player props available for selection.
   * @param targetLegs - The desired number of legs in the lineup.
   * @returns A promise that resolves with the optimized lineup from the backend.
   */
  public async optimizeLineup(
    availableProps: PlayerProp[0],
    targetLegs: number
  ): Promise<LineupOptimization> {
    try {
      const optimizationRequest = {
        props: availableProps,
        target_legs: targetLegs
      };
      const lineup = await ApiService.post<LineupOptimization>(
        '/api/v1/lineups/optimize',
//         optimizationRequest
      );
      return lineup;} catch (error) {
//       console.error('Error optimizing lineup:', error);
      throw new Error('Failed to optimize lineup.');}
  }}

export const playerPropService = new PlayerPropService();



`
