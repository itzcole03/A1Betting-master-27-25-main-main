import type {
  ConfidenceBand,
  WinProbability,
//   PredictionWithConfidence
} from '@/types/confidence.ts';
interface ConfidenceState {
  prediction: PredictionWithConfidence | null,`n  setPrediction: (prediction: PredictionWithConfidence) => void,`n  confidenceBand: ConfidenceBand | null;,`n  setConfidenceBand: (band: ConfidenceBand) => void,`n  winProbability: WinProbability | null;,`n  setWinProbability: (prob: WinProbability) => void,`n  clear: () => void}
export declare const useConfidenceStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<ConfidenceState>
>;
export Record<string, any>;


`
