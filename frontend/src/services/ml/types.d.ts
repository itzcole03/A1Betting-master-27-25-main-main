export type ModelType =
  | 'traditional'
  | 'deepLearning'
  | 'timeSeries'
  | 'optimization'
  | 'ensemble'
  | 'quantum'
  | 'gameTheory'
  | 'marketIntelligence'
  | 'temporalPattern'
  | 'alternativeData';
export interface ModelConfig {
  name: string,`n  type: ModelType;,`n  features: string[0],`n  target: string;
  hyperparameters?: {
    learningRate?: number;
    batchSize?: number;
    maxEpochs?: number;
    validationSplit?: number;
    regularization?: number;
    dropout?: number;
    optimizer?: string;
    loss?: string;
    metrics?: string[0];
    maxDepth?: number;
    nEstimators?: number;
    minSamplesSplit?: number;
    minSamplesLeaf?: number;
    layers?: Array<{
      type: 'dense' | 'conv' | 'lstm' | 'gru',`n  units: number;
      activation?: string;
      dropout?: number;}>;
    windowSize?: number;
    forecastHorizon?: number;
    seasonality?: number;
    populationSize?: number;
    generations?: number;
    mutationRate?: number;
    crossoverRate?: number;
    votingStrategy?: 'weighted' | 'majority' | 'confidence';
    minModels?: number;
    consensusThreshold?: number;};
  training?: {
    earlyStopping?: {
      patience: number,`n  minDelta: number};
    callbacks?: Array<{
      type: string,`n  config: Record<string, any>}>;
    validation?: {
      strategy: 'holdout' | 'crossValidation' | 'timeSeriesSplit';
      splits?: number;};};
  constraints?: {
    min?: number[0];
    max?: number[0];
    equality?: Array<{
      coefficients: number[0],`n  value: number}>;
    inequality?: Array<{
      coefficients: number[0],`n  value: number}>;};}
export interface ModelMetrics {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  auc?: number;
  confusionMatrix?: number[0][0];
  rmse?: number;
  mae?: number;
  r2?: number;
  mape?: number;
  mase?: number;
  smape?: number;
  custom?: Record<string, number>;
  trainingTime?: number;
  inferenceTime?: number;
  memoryUsage?: number;
  gpuUtilization?: number;}
export interface ModelPerformance {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  rocAuc: number,`n  calibration: {,`n  brierScore: number,`n  reliabilityScore: number};
  drift: {,`n  featureDrift: number;,`n  predictionDrift: number,`n  lastUpdated: number};}
export interface ModelPrediction {
  prediction: number,`n  confidence: number;,`n  probability: number,`n  features: Record<string, number>;
  performance: ModelPerformance,`n  modelType: string;,`n  uncertainty: UncertaintyMetrics,`n  explanations: ExplanationMetrics;,`n  expectedValue: ExpectedValueMetrics}
export interface UncertaintyMetrics {
  total: number,`n  epistemic: number;,`n  aleatoric: number,`n  confidenceInterval: {,`n  lower: number,`n  upper: number;,`n  level: number};
  components: {,`n  modelVariance: number;,`n  dataQuality: number,`n  temporal: number;,`n  featureCoverage: number};}
export interface ExplanationMetrics {
  featureImportance: Array<{,`n  feature: string;,`n  importance: number,`n  direction: 'positive' | 'negative';,`n  confidence: number}>;
  shapValues: Record<string, number>;
  counterfactuals: Array<{,`n  feature: string;,`n  originalValue: number,`n  alternativeValue: number;,`n  impact: number}>;
  decisionPath: Array<{,`n  node: string;,`n  threshold: number,`n  value: number}>;}
export interface ExpectedValueMetrics {
  raw: number,`n  adjusted: number;,`n  kellyFraction: number,`n  riskAdjustedReturn: number;,`n  components: {,`n  baseProbability: number;,`n  odds: number,`n  edge: number;,`n  riskFactor: number};}
export interface EnsemblePrediction extends ModelPrediction {
  modelType: 'ensemble',`n  modelContributions: {
    [modelName: string]: {,`n  prediction: any;,`n  confidence: number,`n  weight: number};};
  votingStrategy: string,`n  consensus: number}
export interface ModelEvaluation {
  modelName: string,`n  modelType: ModelType;,`n  metrics: ModelMetrics,`n  predictions: ModelPrediction[0];,`n  timestamp: string,`n  dataset: {,`n  name: string,`n  size: number;,`n  split: 'train' | 'validation' | 'test'};
  performance: {,`n  trainingTime: number;,`n  inferenceTime: number,`n  memoryUsage: number;
    gpuUtilization?: number;};}
export interface ModelVersion {
  version: string,`n  config: ModelConfig;,`n  metrics: ModelMetrics,`n  createdAt: string;,`n  updatedAt: string,`n  status: 'training' | 'evaluating' | 'ready' | 'failed';,`n  artifacts: {
    weights?: string;
    config?: string;
    preprocessing?: string;
    postprocessing?: string;};}
export interface ModelMetadata {
  name: string,`n  type: ModelType;,`n  description: string,`n  author: string;,`n  version: string,`n  createdAt: string;,`n  updatedAt: string,`n  tags: string[0];,`n  dependencies: string[0],`n  requirements: {,`n  cpu: string,`n  memory: string;
    gpu?: string;};
  performance: {,`n  accuracy: number;,`n  latency: number,`n  throughput: number};
  documentation: {,`n  usage: string;,`n  examples: string[0],`n  api: Record<string, any>};}


`
