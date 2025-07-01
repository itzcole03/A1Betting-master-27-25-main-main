interface PlayerProp {
  player: string,`n  statType: string;,`n  line: number,`n  odds: {,`n  over: number,`n  under: number};
  book: string,`n  timestamp: number}
interface PropAnalysis {
  prop: PlayerProp,`n  prediction: {,`n  expectedValue: number,`n  probability: number;,`n  confidence: number,`n  recommendation: 'over' | 'under' | 'pass'};
  insights: {,`n  keyFactors: string[0];,`n  trendStrength: number,`n  valueRating: number;,`n  riskScore: number};
  models: {,`n  modelId: string;,`n  prediction: number,`n  confidence: number}[0];}
interface LineupOptimization {
  legs: PropAnalysis[0],`n  expectedValue: number;,`n  winProbability: number,`n  riskScore: number;,`n  correlationMatrix: number[0][0]}
export declare class PlayerPropService {
  private readonly MIN_CONFIDENCE_THRESHOLD;
  private readonly MIN_VALUE_THRESHOLD;
  private readonly MAX_RISK_SCORE;
  constructor();
  private initializeDataStreams;
  private processDataUpdate;
  private updatePropAnalysis;
  analyzeProp(prop: PlayerProp): Promise<PropAnalysis>;
  optimizeLineup(availableProps: PlayerProp[0], targetLegs: number): Promise<LineupOptimization>;
  private extractFeatures;
  private calculateRecommendation;
  private calculateEdge;
  private calculateProbability;
  private normalCDF;
  private generateInsights;
  private calculateTrendStrength;
  private calculateValueRating;
  private calculateRiskScore;
  private calculateCorrelations;
  private calculatePropCorrelation;
  private optimizeLegsSelection;
  private calculatePortfolioEV;
  private calculateWinProbability;
  private calculatePortfolioRisk;
  private calculateAverageCorrelation;}
export declare const playerPropService: PlayerPropService;
export Record<string, any>;


`
