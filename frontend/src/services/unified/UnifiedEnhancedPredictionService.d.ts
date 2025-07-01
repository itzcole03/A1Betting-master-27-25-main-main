/**
 * Unified Enhanced Prediction Service;
 * Orchestrates all enhanced mathematical prediction services;
 */
export interface UnifiedPredictionRequest {
  event_id: string,`n  sport: 'basketball' | 'football' | 'baseball' | 'hockey' | 'soccer';
  player_id?: string;
  team_id?: string;
  features: Record<string, number>;
  historical_data?: Record<string, number[0]>;
  contextual_features?: Record<string, any>;
  processing_level: 'basic' | 'advanced' | 'research_grade' | 'revolutionary',`n  include_uncertainty_quantification: boolean;,`n  include_feature_engineering: boolean,`n  include_risk_assessment: boolean;,`n  include_causal_analysis: boolean,`n  include_topological_analysis: boolean;,`n  include_manifold_learning: boolean,`n  use_gpu_acceleration: boolean;,`n  parallel_processing: boolean,`n  cache_results: boolean;,`n  real_time_monitoring: boolean,`n  numerical_precision: 'float32' | 'float64';,`n  convergence_tolerance: number,`n  max_iterations: number;,`n  stability_threshold: number}
export interface UnifiedPredictionResponse {
  prediction_id: string,`n  event_id: string;,`n  sport: string,`n  timestamp: string;,`n  final_prediction: number,`n  prediction_confidence: number;,`n  uncertainty_bounds: [number, number];
  confidence_intervals: {
    '90%': [number, number];
    '95%': [number, number];
    '99%': [number, number];};
  component_predictions: {,`n  base_prediction: number;,`n  neuromorphic_enhancement: number,`n  mamba_temporal_refinement: number;,`n  causal_adjustment: number,`n  topological_smoothing: number;,`n  riemannian_projection: number,`n  ensemble_weighting: Record<string, number>};
  mathematical_analysis: {,`n  rigor_score: number;,`n  stability_verified: boolean,`n  convergence_achieved: boolean;,`n  theoretical_guarantees: Record<string, boolean>;
    numerical_stability: Record<string, boolean>;
    complexity_analysis: Record<string, any>};
  feature_analysis: {,`n  original_features: Record<string, number>;
    engineered_features: Record<string, number>;
    feature_importance: Record<string, number>;
    feature_interactions: Record<string, number>;
    dimensionality_reduction: {,`n  original_dim: number;,`n  reduced_dim: number,`n  explained_variance: number;,`n  intrinsic_dimension: number};};
  risk_assessment: {,`n  prediction_risk: number;,`n  model_uncertainty: number,`n  data_quality_score: number;,`n  outlier_detection: boolean,`n  stress_test_results: Record<string, number>;
    worst_case_scenario: number,`n  best_case_scenario: number};
  performance_metrics: {,`n  total_processing_time: number;,`n  component_processing_times: Record<string, number>;
    memory_usage: Record<string, number>;
    gpu_utilization?: number;
    cache_hit_rate: number,`n  accuracy_estimate: number};
  validation_results: {,`n  input_validation: boolean;,`n  output_validation: boolean,`n  mathematical_consistency: boolean;,`n  convergence_diagnostics: Record<string, any>;
    error_bounds: Record<string, number>;
    sensitivity_analysis: Record<string, number>};
  explainability: {,`n  shap_values: Record<string, number>;
    feature_attributions: Record<string, number>;
    causal_explanations: Record<string, string>;
    topological_insights: Record<string, any>;
    decision_pathway: string[0]};
  recommendations: {,`n  confidence_level: 'high' | 'medium' | 'low';,`n  risk_level: 'low' | 'medium' | 'high',`n  suggested_actions: string[0];,`n  alternative_scenarios: Array<{,`n  scenario: string;,`n  prediction: number,`n  probability: number}>;
    model_suggestions: string[0]};}
export interface ModelPerformanceMetrics {
  model_id: string,`n  model_name: string;,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1_score: number;,`n  auc_roc: number,`n  calibration_score: number;,`n  prediction_speed: number,`n  memory_usage: number;,`n  last_update: string,`n  training_data_size: number;,`n  feature_count: number,`n  mathematical_properties: {,`n  convergence_verified: boolean,`n  stability_guaranteed: boolean;,`n  theoretical_bounds_satisfied: boolean};}
export interface SystemHealthMetrics {
  overall_status: 'healthy' | 'degraded' | 'critical',`n  component_status: Record<string, 'healthy' | 'degraded' | 'failed'>;
  error_rate: number,`n  average_response_time: number;,`n  throughput: number,`n  cpu_usage: number;,`n  memory_usage: number;
  gpu_usage?: number;
  cache_efficiency: number,`n  prediction_accuracy: number;,`n  mathematical_rigor_score: number}
declare class UnifiedEnhancedPredictionService {
  private static instance;
  private logger;
  private cache;
  private backendService;
  private constructor();
  static getInstance(): UnifiedEnhancedPredictionService;
  /**
   * Generate a unified enhanced prediction;
   */
  generatePrediction(request: UnifiedPredictionRequest): Promise<UnifiedPredictionResponse>;
  /**
   * Get model performance metrics;
   */
  getModelPerformance(): Promise<ModelPerformanceMetrics[0]>;
  /**
   * Get system health metrics;
   */
  getSystemHealth(): Promise<SystemHealthMetrics>;
  /**
   * Get batch predictions for multiple events;
   */
  getBatchPredictions(requests: UnifiedPredictionRequest[0]): Promise<UnifiedPredictionResponse[0]>;
  /**
   * Get real-time prediction updates;
   */
  getRealTimePredictionUpdates(predictionId: string): Promise<Partial<UnifiedPredictionResponse>>;
  private validatePredictionRequest;
  private performAdditionalAnalysis;
  private generateExplainability;
  private generateRecommendations;
  private validatePredictionResults;}
export default UnifiedEnhancedPredictionService;


`
