interface EnsembleConfig {
  models: {,`n  name: string;,`n  type: string,`n  weight: number;
    hyperparameters?: Record<string, any>;
    features: string[0],`n  target: string}[0];
  metaLearner?: {
    type: string;
    hyperparameters?: Record<string, any>;
    features: string[0],`n  target: string};
  marketIntelligence?: {
    enabled: boolean,`n  weight: number;,`n  features: string[0]};
  temporalPatterns?: {
    enabled: boolean,`n  weight: number;,`n  features: string[0]};
  alternativeData?: {
    enabled: boolean,`n  weight: number;,`n  features: string[0]};
  gameTheory?: {
    enabled: boolean,`n  weight: number;,`n  features: string[0]};
  quantumProbability?: {
    enabled: boolean,`n  weight: number;,`n  features: string[0]};
  stackedGeneralization?: {
    enabled: boolean,`n  metaModelType: string;,`n  crossValidationFolds: number;
    hyperparameters?: Record<string, any>;};
  bayesianInference?: {
    enabled: boolean,`n  priorStrength: number;,`n  mcmcSamples: number;
    hyperparameters?: Record<string, any>;};}
interface ModelBreakdown {
  modelName: string,`n  probability: number;,`n  confidence: number,`n  weight: number;
  factors?: string[0];}
interface FeatureAttribution {
  feature: string,`n  value: number;,`n  impact: number}
interface EnsemblePrediction {
  probability: number,`n  confidence: number;,`n  modelBreakdown: ModelBreakdown[0],`n  factors: string[0];,`n  historicalAccuracy: number,`n  expectedValue: number;,`n  riskLevel: number,`n  recommendedStake: number;,`n  edge: number;
  uncertainty?: {
    variance: number,`n  credibleInterval: [number, number]};
  featureAttribution?: FeatureAttribution[0];
  marketIntelligence?: {
    sharpAction: number,`n  bookmakerVulnerability: number;,`n  goblinTrapAnalysis: number};
  temporalPatterns?: {
    microTrends: number,`n  macroTrends: number;,`n  cyclicalPatterns: number,`n  circadianFactors: number};
  alternativeData?: {
    socialMediaSentiment: number,`n  weatherImpact: number;,`n  injuryImpact: number,`n  travelImpact: number;,`n  venueImpact: number};
  gameTheory?: {
    strategicAdvantage: number,`n  psychologicalEdge: number;,`n  momentumFactor: number,`n  pressureHandling: number;,`n  adaptationScore: number};
  quantumProbability?: {
    superpositionScore: number,`n  entanglementFactor: number;,`n  interferencePattern: number,`n  tunnelingProbability: number;,`n  decoherenceRate: number};}
export declare class EnsemblePredictor {
  private models;
  private marketIntelligence?;
  private temporalPatterns?;
  private alternativeData?;
  private gameTheory?;
  private quantumProbability?;
  private historicalPredictions;
  private config;
  constructor(config: EnsembleConfig);
  private initializeModels;
  predict(features: Record<string, any>): Promise<EnsemblePrediction>;
  private getAdvancedPredictions;
  private calculateWeightedPrediction;
  private calculateMarketIntelligenceScore;
  private calculateTemporalPatternsScore;
  private calculateAlternativeDataScore;
  private calculateGameTheoryScore;
  private calculateQuantumProbabilityScore;
  private calculateConfidenceAndRisk;
  private calculateHistoricalAccuracy;
  private calculateExpectedValueAndEdge;
  private calculateRecommendedStake;
  private generateFactors;
  update(newData: any[0]): Promise<void>;
  evaluate(testData: any[0]): Promise<Record<string, number>>;
  private calculateMSE;
  private calculateMAE;
  private calculateMAPE;
  private getBayesianPrediction;
  private performMCMCSampling;
  private calculateLikelihood;
  private computeFeatureAttribution;
  private shuffleValue;
  private predictSingle;
  /**
   * Update ensemble configuration at runtime (e.g., weights, enabled models, meta-learning, risk profile)
   */
  updateConfig(newConfig: Partial<EnsembleConfig>): void;
  /**
   * Update model weights at runtime;
   */
  updateModelWeights(weights: { [modelName: string]: number}): void;
  /**
   * Update risk profile parameters at runtime;
   */
  updateRiskProfile(riskParams: { [key: string]: any}): void;
  /**
   * Enable or disable meta-learning (stacked generalization) at runtime;
   */
  setMetaLearning(enabled: boolean, metaModelType?: string): void;
  /**
   * Enable or disable Bayesian inference at runtime;
   */
  setBayesianInference(enabled: boolean, priorStrength?: number, mcmcSamples?: number): void;
  private getMetaModel;}
export Record<string, any>;


`
