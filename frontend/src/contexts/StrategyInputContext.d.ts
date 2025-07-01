import React from 'react.ts';
import { Sport, PropType} from '@/types.ts';
interface StrategyInput {
  stake: number,`n  minConfidence: number;,`n  selectedStrategies: string[0],`n  maxPayout: number;,`n  minPayout: number,`n  selectedSports: Sport[0];,`n  selectedPropTypes: PropType[0]}
interface StrategyInputContextType {
  strategyInput: StrategyInput,`n  updateStrategyInput: (input: Partial<StrategyInput>) => void,`n  resetStrategyInput: () => void}
export declare const StrategyInputProvider: React.FC<{,`n  children: React.ReactNode}>;
export declare const useStrategyInput: () => StrategyInputContextType;
export Record<string, any>;


`
