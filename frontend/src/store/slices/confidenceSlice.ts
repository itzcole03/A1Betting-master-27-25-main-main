// confidenceSlice.ts;
// Zustand slice for confidence band and win probability state;

import { create} from 'zustand';
import type {
  ConfidenceBand,
  WinProbability,
//   PredictionWithConfidence
} from '@/types/confidence';

interface ConfidenceState {
  prediction: PredictionWithConfidence | null,`n  setPrediction: (prediction: PredictionWithConfidence) => void,`n  confidenceBand: ConfidenceBand | null;,`n  setConfidenceBand: (band: ConfidenceBand) => void,`n  winProbability: WinProbability | null;,`n  setWinProbability: (prob: WinProbability) => void,`n  clear: () => void}

export const useConfidenceStore = create<ConfidenceState>(set => ({
  prediction: null,
  setPrediction: prediction =>
    set({
      prediction,
      confidenceBand: prediction.confidenceBand,
      winProbability: prediction.winProbability
    }),
  confidenceBand: null,
  setConfidenceBand: confidenceBand => set({ confidenceBand}),
  winProbability: null,
  setWinProbability: winProbability => set({ winProbability}),
  clear: () => set({ prediction: null, confidenceBand: null, winProbability: null})
}));



`
