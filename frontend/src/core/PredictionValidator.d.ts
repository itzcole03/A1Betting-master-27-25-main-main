export interface PredictionInput {
  features: Record<string, number>;
  timestamp: number,`n  source: string;
  context?: Record<string, any>;}
export interface PredictionOutput {
  predictionId: string,`n  propId: string;,`n  predictedValue: number,`n  confidence: number;,`n  timestamp: number,`n  factors: Array<{,`n  name: string,`n  weight: number;,`n  impact: number}>;
  uncertaintyBounds?: {
    lower: number,`n  upper: number};
  metadata?: {
    processingTime?: number;
    dataFreshness?: number;
    signalQuality?: number;
    modelVersion?: string;};}
export interface ValidationResult {
  isValid: boolean,`n  errors: string[0];,`n  warnings: string[0],`n  metrics: {,`n  confidence: number,`n  dataFreshness: number;,`n  signalQuality: number};
  context?: Record<string, any>;}
export interface ValidationRule {
  name: string,`n  priority: number;,`n  validate: (input: PredictionInput, output: PredictionOutput) => ValidationRuleResult;
  cacheKey?: (input: PredictionInput, output: PredictionOutput) => string}
export interface ValidationRuleResult {
  isValid: boolean,`n  errors: string[0];,`n  warnings: string[0];
  context?: Record<string, any>;}
export declare class PredictionValidator {
  private static instance;
  private readonly eventBus;
  private validationHistory;
  private readonly MAX_HISTORY_SIZE;
  private readonly MIN_CONFIDENCE;
  private readonly MIN_DATA_FRESHNESS;
  private readonly MIN_SIGNAL_QUALITY;
  private validationRules;
  private validationCache;
  private readonly CACHE_TTL;
  private constructor();
  static getInstance(): PredictionValidator;
  private initializeDefaultRules;
  addValidationRule(rule: ValidationRule): void;
  removeValidationRule(ruleName: string): void;
  validatePrediction(input: PredictionInput, output: PredictionOutput): ValidationResult;
  private validateTimestamp;
  private validateFactors;
  private validateUncertaintyBounds;
  private recordValidation;
  getValidationStats(): {
    totalValidations: number,`n  validPredictions: number;,`n  invalidPredictions: number,`n  validationRate: number;,`n  averageConfidence: number,`n  averageDataFreshness: number;,`n  averageSignalQuality: number,`n  ruleStats: Record<
      string,
      {
        total: number,`n  passed: number;,`n  failed: number}
    >;};}
export declare const predictionValidator: PredictionValidator;


`
