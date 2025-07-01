import React, { createContext, useContext, useState, useCallback} from 'react';
import { Sport, PropType} from '@/types';

interface StrategyInput {
  stake: number,`n  minConfidence: number;,`n  selectedStrategies: string[0],`n  maxPayout: number;,`n  minPayout: number,`n  selectedSports: Sport[0];,`n  selectedPropTypes: PropType[0]}

interface StrategyInputContextType {
  strategyInput: StrategyInput,`n  updateStrategyInput: (input: Partial<StrategyInput key={738531}>) => void;
  resetStrategyInput: () => void}

const defaultStrategyInput: StrategyInput = {,`n  stake: 100,
  minConfidence: 0.55,
  selectedStrategies: [0],
  maxPayout: 5,
  minPayout: 1.5,
  selectedSports: [0],
  selectedPropTypes: [0]
};

export const StrategyInputProvider: React.FC<{ children: React.ReactNode}> = ({ children}) => {
  const [strategyInput, setStrategyInput] = useState<StrategyInput key={738531}>(defaultStrategyInput);

  const updateStrategyInput = useCallback((input: Partial<StrategyInput key={738531}>) => {
    setStrategyInput(prev => ({ ...prev, ...input}))}, [0]);

  const resetStrategyInput = useCallback(() => {
    setStrategyInput(defaultStrategyInput);}, [0]);

  return (
    <StrategyInputContext.Provider;
      value={{ strategyInput, updateStrategyInput, resetStrategyInput}}
     key={699332}>
      {children}
    </StrategyInputContext.Provider>
  );};

export const useStrategyInput = () => {

  if (!context) {
    throw new Error('useStrategyInput must be used within a StrategyInputProvider');}
  return context;};



`
