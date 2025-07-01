export interface ShapExplanation {
  feature: string,`n  value: number;,`n  importance: number,`n  impact: number;,`n  confidence: number}

export interface ModelPerformance {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  rocAuc: number,`n  confusionMatrix: {,`n  truePositives: number,`n  falsePositives: number;,`n  trueNegatives: number,`n  falseNegatives: number};
  calibrationScore: number,`n  brierScore: number}

export interface FeatureImportance {
  feature: string,`n  importance: number;,`n  rank: number,`n  correlation: number;,`n  stability: number,`n  confidence: number}

export interface ModelMetrics {
  performance: ModelPerformance,`n  featureImportance: FeatureImportance[0];,`n  shapValues: ShapExplanation[0],`n  timestamp: number;,`n  version: string}

export interface ModelConfig {
  name: string,`n  version: string;,`n  parameters: Record<string, any>;
  features: string[0],`n  target: string;,`n  validationSplit: number,`n  testSplit: number;,`n  randomState: number}

export interface ModelEvaluation {
  config: ModelConfig,`n  metrics: ModelMetrics;,`n  predictions: Array<{,`n  actual: number;,`n  predicted: number,`n  confidence: number;,`n  timestamp: number}>;
  errors: Array<{,`n  type: string;,`n  message: string,`n  timestamp: number}>}



`
