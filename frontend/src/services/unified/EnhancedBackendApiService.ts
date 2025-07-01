/**
 * Enhanced Backend API Integration Service;
 * Complete integration with enhanced mathematical backend services;
 */

import axios, { AxiosInstance, AxiosResponse} from 'axios';
import { UnifiedLogger} from './UnifiedLogger';
import { UnifiedCache} from './UnifiedCache';
import { UnifiedErrorService} from './UnifiedErrorService';

// Enhanced prediction request/response types;
export interface EnhancedPredictionRequest {
  event_id: string,`n  sport: string;,`n  features: Record<string, number>;

  // Mathematical rigor settings;
  enable_neuromorphic: boolean,`n  neuromorphic_timesteps: number;,`n  enable_mamba: boolean,`n  mamba_sequence_length: number;,`n  enable_causal_inference: boolean,`n  causal_significance_level: number;,`n  enable_topological: boolean,`n  topological_max_dimension: number;,`n  enable_riemannian: boolean,`n  riemannian_manifold_dim: number;

  // Advanced computation settings;
  use_gpu: boolean,`n  numerical_precision: string;,`n  convergence_tolerance: number,`n  context: Record<string, any>}

export interface EnhancedPredictionResponse {
  event_id: string,`n  strategy_used: string;

  // Core predictions with enhanced accuracy;
  base_prediction: number,`n  neuromorphic_enhancement: number;,`n  mamba_temporal_refinement: number,`n  causal_adjustment: number;,`n  topological_smoothing: number,`n  riemannian_projection: number;,`n  final_prediction: number;

  // Mathematical rigor metrics;
  neuromorphic_metrics: Record<string, any>;
  mamba_metrics: Record<string, any>;
  causal_metrics: Record<string, any>;
  topological_metrics: Record<string, any>;
  riemannian_metrics: Record<string, any>;

  // Advanced mathematical properties;
  riemannian_curvature: number,`n  persistent_betti_numbers: Record<string, number>;
  causal_graph_structure: Record<string, string[0]>;
  mamba_eigenvalue_spectrum: number[0],`n  neuromorphic_spike_statistics: Record<string, number>;
  topological_persistence_barcode: number[0][0];

  // Convergence and stability analysis;
  convergence_rate: number,`n  stability_margin: number;,`n  lyapunov_exponent: number,`n  mathematical_guarantees: Record<string, boolean>;

  // Computational complexity analysis;
  actual_complexity: Record<string, any>;
  runtime_analysis: Record<string, number>;
  memory_usage: Record<string, number>;

  // Uncertainty quantification;
  prediction_confidence: number,`n  uncertainty_bounds: number[0];,`n  confidence_intervals: Record<string, number[0]>;

  // Performance metrics;
  total_processing_time: number,`n  component_processing_times: Record<string, number>;
  timestamp: string;

  // Mathematical validation;
  numerical_stability: Record<string, boolean>;
  convergence_diagnostics: Record<string, any>;
  theoretical_bounds_satisfied: boolean}

export interface FeatureEngineeringRequest {
  data: Record<string, number[0]>;
  feature_types: string[0],`n  enable_wavelet_transforms: boolean;,`n  enable_manifold_learning: boolean,`n  enable_information_theory: boolean;,`n  enable_graph_features: boolean;
  target_dimensionality?: number}

export interface FeatureEngineeringResponse {
  original_features: Record<string, number[0]>;
  engineered_features: Record<string, number[0]>;
  feature_importance: Record<string, number>;
  dimensionality_reduction: {,`n  original_dim: number;,`n  reduced_dim: number,`n  explained_variance: number;,`n  intrinsic_dimension: number};
  manifold_properties: {,`n  curvature_estimates: number[0];,`n  topology_summary: Record<string, any>;
    geodesic_distances: number[0][0]};
  information_theory_metrics: {,`n  mutual_information: Record<string, number>;
    transfer_entropy: Record<string, number>;
    feature_relevance: Record<string, number>};
  processing_time: number,`n  mathematical_validation: Record<string, boolean>}

export interface RiskAssessmentRequest {
  portfolio: Record<string, number>;
  market_data: Record<string, number[0]>;
  risk_metrics: string[0],`n  confidence_level: number;,`n  time_horizon: number}

export interface RiskAssessmentResponse {
  portfolio_risk: {,`n  value_at_risk: number;,`n  expected_shortfall: number,`n  maximum_drawdown: number;,`n  sharpe_ratio: number,`n  sortino_ratio: number};
  extreme_value_analysis: {,`n  gev_parameters: Record<string, number>;
    return_levels: Record<string, number>;
    tail_index: number,`n  hill_estimator: number};
  copula_analysis: {,`n  dependence_structure: string;,`n  tail_dependence: Record<string, number>;
    model_selection: Record<string, number>};
  stress_testing: {,`n  scenarios: Record<string, number>;
    portfolio_impact: Record<string, number>;
    worst_case_loss: number};
  risk_decomposition: Record<string, number>;
  processing_time: number,`n  model_validation: Record<string, boolean>}

export interface MathematicalAnalysisRequest {
  prediction_data: Array<Record<string, any>>;
  analysis_depth: string,`n  include_stability_analysis: boolean;,`n  include_convergence_analysis: boolean,`n  include_sensitivity_analysis: boolean;,`n  include_robustness_analysis: boolean,`n  verify_theoretical_guarantees: boolean;,`n  check_mathematical_consistency: boolean}

export interface MathematicalAnalysisResponse {
  mathematical_analysis: Record<string, any>;
  analysis_depth: string,`n  data_dimensions: {,`n  num_samples: number,`n  num_features: number;,`n  has_outcomes: boolean};
  computational_performance: {,`n  analysis_time: number;,`n  samples_per_second: number};
  mathematical_rigor_score: number,`n  timestamp: string}

export interface ModelStatusResponse {
  models: Array<{,`n  id: string;,`n  name: string,`n  status: "active" | "training" | "error" | "updating";,`n  accuracy: number,`n  last_update: string;,`n  mathematical_properties: {,`n  convergence_verified: boolean;,`n  stability_guaranteed: boolean,`n  theoretical_bounds: boolean};
    performance_metrics: {,`n  prediction_speed: number;,`n  memory_usage: number,`n  computational_complexity: string}}>;
  system_health: {,`n  overall_status: string;,`n  component_status: Record<string, string>;
    error_rate: number,`n  average_response_time: number};
  mathematical_foundations: Record<string, any>}

class EnhancedBackendApiService {
  private static instance: EnhancedBackendApiService;
  private client: AxiosInstance;
  private logger: UnifiedLogger;
  private cache: UnifiedCache;
  private errorService: UnifiedErrorService;
  private baseURL: string;

  private constructor() {
    this.logger = UnifiedLogger.getInstance();
    this.cache = UnifiedCache.getInstance();
    this.errorService = UnifiedErrorService.getInstance();
    this.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // Increased for mathematical computations;
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.setupInterceptors();}

  static getInstance(): EnhancedBackendApiService {
    if (!EnhancedBackendApiService.instance) {
      EnhancedBackendApiService.instance = new EnhancedBackendApiService();}
    return EnhancedBackendApiService.instance;}

  private setupInterceptors(): void {
    // Request interceptor;
    this.client.interceptors.request.use(
      (config) => {
        this.logger.info("Enhanced Backend API Request", {
          url: config.url,
          method: config.method,
          timestamp: new Date().toISOString()
        });
        return config;},
      (error) => {
        this.errorService.handleError(error, "API_REQUEST_ERROR");
        return Promise.reject(error);},
    );

    // Response interceptor;
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        this.logger.info("Enhanced Backend API Response", {
          url: response.config.url,
          status: response.status,
          responseTime: response.headers["x-response-time"],
          timestamp: new Date().toISOString()
        });
        return response;},
      (error) => {
        this.errorService.handleError(error, "API_RESPONSE_ERROR");
        return Promise.reject(error);},
    );}

  // Enhanced Revolutionary Prediction;
  async getEnhancedRevolutionaryPrediction(
    request: EnhancedPredictionRequest,
  ): Promise<EnhancedPredictionResponse> {

    try {
      // Check cache first;

      if (cached) {
        this.logger.info("Returning cached enhanced revolutionary prediction", {
          eventId: request.event_id
        });
        return cached;}

      const response = await this.client.post<EnhancedPredictionResponse>(
        "/api/enhanced-revolutionary/predict/enhanced",
        request,
      );

      // Cache for 2 minutes (mathematical computations are expensive)
      await this.cache.set(cacheKey, result, 120);

      this.logger.info("Generated enhanced revolutionary prediction", {
        eventId: request.event_id,
        finalPrediction: result.final_prediction,
        confidence: result.prediction_confidence,
        mathematicalGuarantees: Object.values(
          result.mathematical_guarantees,
        ).filter(Boolean).length,
        processingTime: result.total_processing_time
      });

      return result;} catch (error) {
      this.logger.error("Enhanced revolutionary prediction failed", {
        error: error.message,
//         request
      });
      throw error;}
  }

  // Enhanced Feature Engineering;
  async getEnhancedFeatureEngineering(
    request: FeatureEngineeringRequest,
  ): Promise<FeatureEngineeringResponse> {
    try {
      const response = await this.client.post<FeatureEngineeringResponse>(
        "/api/enhanced-features/engineer",
        request,
      );

      this.logger.info("Enhanced feature engineering completed", {
        originalDim: response.data.dimensionality_reduction.original_dim,
        reducedDim: response.data.dimensionality_reduction.reduced_dim,
        explainedVariance:
          response.data.dimensionality_reduction.explained_variance,
        processingTime: response.data.processing_time
      });

      return response.data;} catch (error) {
      this.logger.error("Enhanced feature engineering failed", {
        error: error.message,
//         request
      });
      throw error;}
  }

  // Enhanced Risk Assessment;
  async getEnhancedRiskAssessment(
    request: RiskAssessmentRequest,
  ): Promise<RiskAssessmentResponse> {
    try {
      const response = await this.client.post<RiskAssessmentResponse>(
        "/api/enhanced-risk/assess",
        request,
      );

      this.logger.info("Enhanced risk assessment completed", {
        valueAtRisk: response.data.portfolio_risk.value_at_risk,
        expectedShortfall: response.data.portfolio_risk.expected_shortfall,
        tailIndex: response.data.extreme_value_analysis.tail_index,
        processingTime: response.data.processing_time
      });

      return response.data;} catch (error) {
      this.logger.error("Enhanced risk assessment failed", {
        error: error.message,
//         request
      });
      throw error;}
  }

  // Mathematical Analysis and Validation;
  async getMathematicalAnalysis(
    request: MathematicalAnalysisRequest,
  ): Promise<MathematicalAnalysisResponse> {
    try {
      const response = await this.client.post<MathematicalAnalysisResponse>(
        "/api/enhanced-revolutionary/analyze/mathematical-rigor",
        request,
      );

      this.logger.info("Mathematical analysis completed", {
        analysisDepth: response.data.analysis_depth,
        rigorScore: response.data.mathematical_rigor_score,
        samplesProcessed: response.data.data_dimensions.num_samples,
        analysisTime: response.data.computational_performance.analysis_time
      });

      return response.data;} catch (error) {
      this.logger.error("Mathematical analysis failed", {
        error: error.message,
//         request
      });
      throw error;}
  }

  // Get Mathematical Foundations;
  async getMathematicalFoundations(): Promise<Record<string, any>> {

    try {

      if (cached) {
        return cached;}

      const response = await this.client.get(
        "/api/enhanced-revolutionary/research/mathematical-foundations",
      );

      // Cache for 1 hour (foundations don't change often)
      await this.cache.set(cacheKey, result, 3600);

      this.logger.info("Retrieved mathematical foundations");
      return result;} catch (error) {
      this.logger.error("Failed to get mathematical foundations", {
        error: error.message
      });
      throw error;}
  }

  // Enhanced Model Status;
  async getEnhancedModelStatus(): Promise<ModelStatusResponse> {
    try {
      const response = await this.client.get<ModelStatusResponse>(
        "/api/enhanced-models/status",
      );

      this.logger.info("Retrieved enhanced model status", {
        totalModels: response.data.models.length,
        activeModels: response.data.models.filter((m) => m.status === "active")
          .length,
        overallStatus: response.data.system_health.overall_status,
        errorRate: response.data.system_health.error_rate
      });

      return response.data;} catch (error) {
      this.logger.error("Failed to get enhanced model status", {
        error: error.message
      });
      throw error;}
  }

  // Unified Prediction (orchestrates all services)
  async getUnifiedPrediction(request: {,`n  event_id: string;,`n  sport: string,`n  features: Record<string, number>;
    include_all_enhancements: boolean,`n  processing_level: "basic" | "advanced" | "research_grade" | "revolutionary"}): Promise<{
    predictions: Record<string, number>;
    enhanced_revolutionary: EnhancedPredictionResponse,`n  feature_engineering: FeatureEngineeringResponse;,`n  risk_assessment: RiskAssessmentResponse,`n  mathematical_analysis: MathematicalAnalysisResponse;,`n  unified_confidence: number,`n  processing_summary: Record<string, any>}> {
    try {

      // Parallel processing for efficiency;
      const [enhancedPrediction, featureEngineering, riskAssessment] =
        await Promise.all([
          // Enhanced revolutionary prediction;
          this.getEnhancedRevolutionaryPrediction({
            event_id: request.event_id,
            sport: request.sport,
            features: request.features,
            enable_neuromorphic: request.processing_level !== "basic",
            neuromorphic_timesteps:
              request.processing_level === "revolutionary" ? 200 : 100,
            enable_mamba: request.processing_level !== "basic",
            mamba_sequence_length:
              request.processing_level === "revolutionary" ? 100 : 50,
            enable_causal_inference:
              request.processing_level === "advanced" ||
              request.processing_level === "revolutionary",
            causal_significance_level: 0.05,
            enable_topological:
              request.processing_level === "research_grade" ||
              request.processing_level === "revolutionary",
            topological_max_dimension: 2,
            enable_riemannian:
              request.processing_level === "research_grade" ||
              request.processing_level === "revolutionary",
            riemannian_manifold_dim: 16,
            use_gpu: request.processing_level === "revolutionary",
            numerical_precision:
              request.processing_level === "revolutionary"
                ? "float64"
                : "float32",
            convergence_tolerance: 1e-6,
            context: {,`n  processing_level: request.processing_level,
              include_all_enhancements: request.include_all_enhancements
            }
          }),

          // Feature engineering;
          this.getEnhancedFeatureEngineering({
            data: { features: Object.values(request.features)},
            feature_types: ["numerical", "temporal", "categorical"],
            enable_wavelet_transforms: request.processing_level !== "basic",
            enable_manifold_learning:
              request.processing_level === "advanced" ||
              request.processing_level === "research_grade" ||
              request.processing_level === "revolutionary",
            enable_information_theory: request.processing_level !== "basic",
            enable_graph_features:
              request.processing_level === "research_grade" ||
              request.processing_level === "revolutionary",
            target_dimensionality:
              request.processing_level === "revolutionary" ? 32 : 16
          }),

          // Risk assessment;
          this.getEnhancedRiskAssessment({
            portfolio: { prediction: 1.0},
            market_data: { features: Object.values(request.features)},
            risk_metrics: ["var", "es", "maximum_drawdown"],
            confidence_level: 0.95,
            time_horizon: 1
          }),
        ]);

      // Mathematical analysis (after other computations)
      const mathematicalAnalysis = await this.getMathematicalAnalysis({
        prediction_data: [
          {
            features: request.features,
            prediction: enhancedPrediction.final_prediction,
            confidence: enhancedPrediction.prediction_confidence
          },
        ],
        analysis_depth:
          request.processing_level === "revolutionary"
            ? "research"
            : "comprehensive",
        include_stability_analysis: true,
        include_convergence_analysis: true,
        include_sensitivity_analysis: request.processing_level !== "basic",
        include_robustness_analysis:
          request.processing_level === "research_grade" ||
          request.processing_level === "revolutionary",
        verify_theoretical_guarantees: request.processing_level !== "basic",
        check_mathematical_consistency: true
      });

      // Calculate unified confidence;
      const confidenceComponents = [
        enhancedPrediction.prediction_confidence,
        featureEngineering.dimensionality_reduction.explained_variance,
        1.0 - riskAssessment.portfolio_risk.value_at_risk,
        mathematicalAnalysis.mathematical_rigor_score / 100,
      ];
      const unifiedConfidence =
        confidenceComponents.reduce((a, b) => a + b, 0) /
        confidenceComponents.length;

      const result = {
        predictions: {,`n  enhanced_revolutionary: enhancedPrediction.final_prediction,
          base_prediction: enhancedPrediction.base_prediction,
          neuromorphic_enhancement: enhancedPrediction.neuromorphic_enhancement,
          mamba_refinement: enhancedPrediction.mamba_temporal_refinement,
          causal_adjustment: enhancedPrediction.causal_adjustment,
          topological_smoothing: enhancedPrediction.topological_smoothing,
          riemannian_projection: enhancedPrediction.riemannian_projection
        },
        enhanced_revolutionary: enhancedPrediction,
        feature_engineering: featureEngineering,
        risk_assessment: riskAssessment,
        mathematical_analysis: mathematicalAnalysis,
        unified_confidence: unifiedConfidence,
        processing_summary: {,`n  total_time_ms: totalTime,
          processing_level: request.processing_level,
          mathematical_guarantees_met: Object.values(
            enhancedPrediction.mathematical_guarantees,
          ).filter(Boolean).length,
          rigor_score: mathematicalAnalysis.mathematical_rigor_score,
          stability_verified:
            mathematicalAnalysis.mathematical_analysis.theoretical_guarantees;
              ?.asymptotic_stability || false,
          convergence_achieved: enhancedPrediction.convergence_rate > 0.8,
          numerical_stability: Object.values(
            enhancedPrediction.numerical_stability,
          ).every(Boolean)
        }
      };

      this.logger.info("Unified prediction completed", {
        eventId: request.event_id,
        processingLevel: request.processing_level,
        unifiedConfidence,
        totalTime,
        guaranteesMet: result.processing_summary.mathematical_guarantees_met
      });

      return result;} catch (error) {
      this.logger.error("Unified prediction failed", {
        error: error.message,
//         request
      });
      throw error;}
  }

  // Health check;
  async healthCheck(): Promise<{
    status: string,`n  services: Record<string, boolean>;
    mathematical_engines: Record<string, boolean>;
    response_time: number}> {

    try {


      return {
        status: "healthy",
        services: response.data.services || Record<string, any>,
        mathematical_engines: response.data.mathematical_engines || Record<string, any>,
        response_time: responseTime
      }} catch (error) {

      this.logger.error("Backend health check failed", {
        error: error.message,
//         responseTime
      });

      return {
        status: "unhealthy",
        services: Record<string, any>,
        mathematical_engines: Record<string, any>,
        response_time: responseTime
      }}
  }}

export default EnhancedBackendApiService;




`
