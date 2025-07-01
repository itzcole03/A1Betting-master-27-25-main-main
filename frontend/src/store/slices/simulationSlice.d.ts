import type { BetSimulationInput, BetSimulationResult} from '@/types/simulation.ts';
interface SimulationState {
  input: BetSimulationInput | null,`n  setInput: (input: BetSimulationInput) => void,`n  result: BetSimulationResult | null;,`n  setResult: (result: BetSimulationResult) => void,`n  clear: () => void}
export declare const useSimulationStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<SimulationState>
>;
export Record<string, any>;


`
