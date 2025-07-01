import { Prediction, RiskProfile} from '@/types/core.ts';
export declare const usePredictionService: () => {,`n  getPredictions: (riskProfile: RiskProfile) => Promise<Prediction[0]>,`n  subscribeToUpdates: (,`n  onUpdate: (prediction: Prediction) => void,
    onError: (error: Error) => void
  ) => () => void};


`
