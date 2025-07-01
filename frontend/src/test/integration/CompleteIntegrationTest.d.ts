/**
 * Complete Frontend-Backend Integration Test;
 * Tests all enhanced mathematical services end-to-end;
 */
declare const mockPredictionRequest: {,`n  event_id: string;,`n  sport: string,`n  features: {,`n  player_performance: number,`n  team_strength: number;,`n  matchup_difficulty: number,`n  historical_performance: number;,`n  injury_impact: number,`n  weather_effect: number;,`n  venue_advantage: number,`n  rest_factor: number;,`n  momentum: number,`n  public_sentiment: number};
  enable_neuromorphic: boolean,`n  neuromorphic_timesteps: number;,`n  enable_mamba: boolean,`n  mamba_sequence_length: number;,`n  enable_causal_inference: boolean,`n  causal_significance_level: number;,`n  enable_topological: boolean,`n  topological_max_dimension: number;,`n  enable_riemannian: boolean,`n  riemannian_manifold_dim: number;,`n  use_gpu: boolean,`n  numerical_precision: 'float32';,`n  convergence_tolerance: number,`n  context: Record<string, any>};
declare const mockPredictionResponse: {,`n  event_id: string;,`n  strategy_used: string,`n  base_prediction: number;,`n  neuromorphic_enhancement: number,`n  mamba_temporal_refinement: number;,`n  causal_adjustment: number,`n  topological_smoothing: number;,`n  riemannian_projection: number,`n  final_prediction: number;,`n  neuromorphic_metrics: {,`n  spike_rate: number;,`n  isi_statistics: {,`n  mean_isi: number;,`n  cv_isi: number};
    network_criticality: number};
  mamba_metrics: {,`n  eigenvalue_spectrum: number[0];,`n  spectral_radius: number,`n  temporal_coherence: number};
  causal_metrics: {,`n  causal_strength: number;,`n  causal_graph: {,`n  X1: string[0];,`n  X2: string[0]};
    pc_algorithm_applied: boolean};
  topological_metrics: {,`n  betti_numbers: {,`n  H0: number,`n  H1: number;,`n  H2: number};
    persistence_barcode: number[0][0]};
  riemannian_metrics: {,`n  curvature: number;,`n  manifold_dimension: number,`n  geodesic_computations: boolean};
  riemannian_curvature: number,`n  persistent_betti_numbers: {,`n  H0: number,`n  H1: number;,`n  H2: number};
  causal_graph_structure: {,`n  X1: string[0];,`n  X2: string[0]};
  mamba_eigenvalue_spectrum: number[0],`n  neuromorphic_spike_statistics: {,`n  mean_isi: number,`n  cv_isi: number};
  topological_persistence_barcode: number[0][0],`n  convergence_rate: number;,`n  stability_margin: number,`n  lyapunov_exponent: number;,`n  mathematical_guarantees: {,`n  neuromorphic_stability: boolean;,`n  mamba_convergence: boolean,`n  causal_identifiability: boolean;,`n  topological_persistence: boolean,`n  riemannian_completeness: boolean};
  actual_complexity: {,`n  neuromorphic: string;,`n  mamba: string,`n  causal: string;,`n  topological: string,`n  riemannian: string};
  runtime_analysis: {,`n  neuromorphic: number;,`n  mamba: number,`n  causal: number;,`n  topological: number,`n  riemannian: number};
  memory_usage: {,`n  neuromorphic: number;,`n  mamba: number,`n  causal: number;,`n  topological: number,`n  riemannian: number};
  prediction_confidence: number,`n  uncertainty_bounds: number[0];,`n  confidence_intervals: {
    '90%': number[0];
    '95%': number[0];
    '99%': number[0];};
  total_processing_time: number,`n  component_processing_times: {,`n  neuromorphic: number,`n  mamba: number;,`n  causal: number,`n  topological: number;,`n  riemannian: number,`n  total_prediction: number};
  timestamp: string,`n  numerical_stability: {,`n  no_nan_values: boolean,`n  no_infinite_values: boolean;,`n  bounded_outputs: boolean,`n  convergence_achieved: boolean;,`n  eigenvalues_stable: boolean};
  convergence_diagnostics: {,`n  convergence_rate: number;,`n  lyapunov_exponent: number,`n  stability_margin: number;,`n  iterations_to_convergence: number,`n  convergence_tolerance_met: boolean};
  theoretical_bounds_satisfied: boolean};
declare const mockSystemHealth: {,`n  overall_status: 'healthy';,`n  component_status: {,`n  prediction_engine: string;,`n  feature_engineering: string,`n  risk_management: string;,`n  data_pipeline: string,`n  neuromorphic_engine: string;,`n  mamba_engine: string,`n  causal_engine: string;,`n  topological_engine: string,`n  riemannian_engine: string};
  error_rate: number,`n  average_response_time: number;,`n  throughput: number,`n  cpu_usage: number;,`n  memory_usage: number,`n  gpu_usage: number;,`n  cache_efficiency: number,`n  prediction_accuracy: number;,`n  mathematical_rigor_score: number};
declare const mockModelMetrics: {,`n  model_id: string;,`n  model_name: string,`n  accuracy: number;,`n  precision: number,`n  recall: number;,`n  f1_score: number,`n  auc_roc: number;,`n  calibration_score: number,`n  prediction_speed: number;,`n  memory_usage: number,`n  last_update: string;,`n  training_data_size: number,`n  feature_count: number;,`n  mathematical_properties: {,`n  convergence_verified: boolean;,`n  stability_guaranteed: boolean,`n  theoretical_bounds_satisfied: boolean};}[0];
export { mockPredictionRequest, mockPredictionResponse, mockSystemHealth, mockModelMetrics};


`
