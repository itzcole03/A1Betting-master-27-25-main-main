/**
 * Enhanced Backend API Integration Service;
 * Complete integration with enhanced mathematical backend services;
 */
export interface EnhancedPredictionRequest {
  event_id: string,`n  sport: string;,`n  features: Record<string, number>;
  enable_neuromorphic: boolean,`n  neuromorphic_timesteps: number;,`n  enable_mamba: boolean,`n  mamba_sequence_length: number;,`n  enable_causal_inference: boolean,`n  causal_significance_level: number;,`n  enable_topological: boolean,`n  topological_max_dimension: number;,`n  enable_riemannian: boolean,`n  riemannian_manifold_dim: number;,`n  use_gpu: boolean,`n  numerical_precision: string;,`n  convergence_tolerance: number,`n  context: Record<string, any>}
export interface EnhancedPredictionResponse {
  event_id: string,`n  strategy_used: string;,`n  base_prediction: number,`n  neuromorphic_enhancement: number;,`n  mamba_temporal_refinement: number,`n  causal_adjustment: number;,`n  topological_smoothing: number,`n  riemannian_projection: number;,`n  final_prediction: number,`n  neuromorphic_metrics: Record<string, any>;
  mamba_metrics: Record<string, any>;
  causal_metrics: Record<string, any>;
  topological_metrics: Record<string, any>;
  riemannian_metrics: Record<string, any>;
  riemannian_curvature: number,`n  persistent_betti_numbers: Record<string, number>;
  causal_graph_structure: Record<string, string[0]>;
  mamba_eigenvalue_spectrum: number[0],`n  neuromorphic_spike_statistics: Record<string, number>;
  topological_persistence_barcode: number[0][0],`n  convergence_rate: number;,`n  stability_margin: number,`n  lyapunov_exponent: number;,`n  mathematical_guarantees: Record<string, boolean>;
  actual_complexity: Record<string, any>;
  runtime_analysis: Record<string, number>;
  memory_usage: Record<string, number>;
  prediction_confidence: number,`n  uncertainty_bounds: number[0];,`n  confidence_intervals: Record<string, number[0]>;
  total_processing_time: number,`n  component_processing_times: Record<string, number>;
  timestamp: string,`n  numerical_stability: Record<string, boolean>;
  convergence_diagnostics: Record<string, any>;
  theoretical_bounds_satisfied: boolean}
export interface FeatureEngineeringRequest {
  data: Record<string, number[0]>;
  feature_types: string[0],`n  enable_wavelet_transforms: boolean;,`n  enable_manifold_learning: boolean,`n  enable_information_theory: boolean;,`n  enable_graph_features: boolean;
  target_dimensionality?: number;}
export interface FeatureEngineeringResponse {
  original_features: Record<string, number[0]>;
  engineered_features: Record<string, number[0]>;
  feature_importance: Record<string, number>;
  dimensionality_reduction: {,`n  original_dim: number;,`n  reduced_dim: number,`n  explained_variance: number;,`n  intrinsic_dimension: number};
  manifold_properties: {,`n  curvature_estimates: number[0];,`n  topology_summary: Record<string, any>;
    geodesic_distances: number[0][0]};
  information_theory_metrics: {,`n  mutual_information: Record<string, number>;
    transfer_entropy: Record<string, number>;
    feature_relevance: Record<string, number>};
  processing_time: number,`n  mathematical_validation: Record<string, boolean>}
export interface RiskAssessmentRequest {
  portfolio: Record<string, number>;
  market_data: Record<string, number[0]>;
  risk_metrics: string[0],`n  confidence_level: number;,`n  time_horizon: number}
export interface RiskAssessmentResponse {
  portfolio_risk: {,`n  value_at_risk: number;,`n  expected_shortfall: number,`n  maximum_drawdown: number;,`n  sharpe_ratio: number,`n  sortino_ratio: number};
  extreme_value_analysis: {,`n  gev_parameters: Record<string, number>;
    return_levels: Record<string, number>;
    tail_index: number,`n  hill_estimator: number};
  copula_analysis: {,`n  dependence_structure: string;,`n  tail_dependence: Record<string, number>;
    model_selection: Record<string, number>};
  stress_testing: {,`n  scenarios: Record<string, number>;
    portfolio_impact: Record<string, number>;
    worst_case_loss: number};
  risk_decomposition: Record<string, number>;
  processing_time: number,`n  model_validation: Record<string, boolean>}
export interface MathematicalAnalysisRequest {
  prediction_data: Array<Record<string, any>>;
  analysis_depth: string,`n  include_stability_analysis: boolean;,`n  include_convergence_analysis: boolean,`n  include_sensitivity_analysis: boolean;,`n  include_robustness_analysis: boolean,`n  verify_theoretical_guarantees: boolean;,`n  check_mathematical_consistency: boolean}
export interface MathematicalAnalysisResponse {
  mathematical_analysis: Record<string, any>;
  analysis_depth: string,`n  data_dimensions: {,`n  num_samples: number,`n  num_features: number;,`n  has_outcomes: boolean};
  computational_performance: {,`n  analysis_time: number;,`n  samples_per_second: number};
  mathematical_rigor_score: number,`n  timestamp: string}
export interface ModelStatusResponse {
  models: Array<{,`n  id: string;,`n  name: string,`n  status: 'active' | 'training' | 'error' | 'updating';,`n  accuracy: number,`n  last_update: string;,`n  mathematical_properties: {,`n  convergence_verified: boolean;,`n  stability_guaranteed: boolean,`n  theoretical_bounds: boolean};
    performance_metrics: {,`n  prediction_speed: number;,`n  memory_usage: number,`n  computational_complexity: string};}>;
  system_health: {,`n  overall_status: string;,`n  component_status: Record<string, string>;
    error_rate: number,`n  average_response_time: number};
  mathematical_foundations: Record<string, any>}
declare class EnhancedBackendApiService {
  private static instance;
  private client;
  private logger;
  private cache;
  private errorService;
  private baseURL;
  private constructor();
  static getInstance(): EnhancedBackendApiService;
  private setupInterceptors;
  getEnhancedRevolutionaryPrediction(
    request: EnhancedPredictionRequest
  ): Promise<EnhancedPredictionResponse>;
  getEnhancedFeatureEngineering(
    request: FeatureEngineeringRequest
  ): Promise<FeatureEngineeringResponse>;
  getEnhancedRiskAssessment(request: RiskAssessmentRequest): Promise<RiskAssessmentResponse>;
  getMathematicalAnalysis(
    request: MathematicalAnalysisRequest
  ): Promise<MathematicalAnalysisResponse>;
  getMathematicalFoundations(): Promise<Record<string, any>>;
  getEnhancedModelStatus(): Promise<ModelStatusResponse>;
  getUnifiedPrediction(request: {,`n  event_id: string;,`n  sport: string,`n  features: Record<string, number>;
    include_all_enhancements: boolean,`n  processing_level: 'basic' | 'advanced' | 'research_grade' | 'revolutionary'}): Promise<{
    predictions: Record<string, number>;
    enhanced_revolutionary: EnhancedPredictionResponse,`n  feature_engineering: FeatureEngineeringResponse;,`n  risk_assessment: RiskAssessmentResponse,`n  mathematical_analysis: MathematicalAnalysisResponse;,`n  unified_confidence: number,`n  processing_summary: Record<string, any>}>;
  healthCheck(): Promise<{
    status: string,`n  services: Record<string, boolean>;
    mathematical_engines: Record<string, boolean>;
    response_time: number}>;}
export default EnhancedBackendApiService;


`
