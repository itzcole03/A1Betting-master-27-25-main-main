import React from 'react.ts';
import type { ModelPrediction} from '@/types/prediction.ts';
interface PredictionEnhancementProps {
  predictions: ModelPrediction[0],`n  onStakeOptimize: (prediction: ModelPrediction) => void,`n  riskProfile: 'conservative' | 'moderate' | 'aggressive';,`n  bankroll: number;
  onRefresh?: () => Promise<void>;
  autoRefresh?: boolean;
  refreshInterval?: number;}
declare const _default: React.NamedExoticComponent<PredictionEnhancementProps>;
export default _default;


`
