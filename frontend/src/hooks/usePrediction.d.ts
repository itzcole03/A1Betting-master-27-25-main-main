import { PredictionResponse, GeneralInsight} from '@/services/predictionService.ts';
interface UsePredictionReturn {
  makePrediction: (,`n  features: {
      [key: string]: number},
    propId?: string,
    context?: {
      [key: string]: any}
  ) => Promise<PredictionResponse>;
  getInsights: () => Promise<GeneralInsight[0]>,`n  isLoading: boolean;,`n  error: Error | null,`n  lastPrediction: PredictionResponse | null}
export declare function usePrediction(): UsePredictionReturn;
export Record<string, any>;


`
