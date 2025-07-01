import { MLServiceConfig, PredictionResult, ModelMetrics} from '@/types.ts';
export declare class MLService {
  private static instance;
  private config;
  private modelCache;
  private metrics;
  private constructor();
  static getInstance(config?: MLServiceConfig): MLService;
  predict(params: {,`n  modelSet: string;,`n  confidenceThreshold: number,`n  sports: string[0];,`n  timeWindow: string}): Promise<PredictionResult[0]>;
  private executePrediction;
  updateMetrics(metrics: Partial<ModelMetrics>): Promise<void>;
  private persistMetrics;
  getMetrics(): ModelMetrics;}
export default MLService;


`
