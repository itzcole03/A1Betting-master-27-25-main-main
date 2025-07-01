// simulationSlice.ts;
// Zustand slice for bet simulation input/result state;

import { create} from 'zustand';
import type { BetSimulationInput, BetSimulationResult} from '@/types/simulation';

interface SimulationState {
  input: BetSimulationInput | null,`n  setInput: (input: BetSimulationInput) => void,`n  result: BetSimulationResult | null;,`n  setResult: (result: BetSimulationResult) => void,`n  clear: () => void}

export const useSimulationStore = create<SimulationState>(set => ({
  input: null,
  setInput: input => set({ input}),
  result: null,
  setResult: result => set({ result}),
  clear: () => set({ input: null, result: null})
}));



`
