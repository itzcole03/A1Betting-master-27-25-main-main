import React, { createContext, useContext, useState, useEffect, ReactNode} from 'react';
import { PrizePicksService} from '@/services/prizePicksService';
import { ProcessedPrizePicksProp} from '@/types/prizePicks';

// Example types (replace with your actual types)
interface Prop {
  id: string,`n  player: string;,`n  team: string,`n  stat: string;,`n  line: number,`n  type: 'goblin' | 'demon' | 'normal';,`n  percentage: number,`n  fireCount: number;
  sentiment?: { score: number; direction: 'up' | 'down' | 'neutral'; tooltip?: string};
  espnLink?: string}
interface Entry {
  id: string,`n  date: string;,`n  legs: number,`n  entry: number;,`n  potentialPayout: number,`n  status: 'won' | 'lost' | 'pending';,`n  picks: any[0]}

interface MoneyMakerResult {
  legs: number,`n  lineup: Prop[0];,`n  winProbability: number,`n  payout: number}

interface StateContextType {
  props: Prop[0],`n  entries: Entry[0];,`n  addEntry: (entry: Entry) => void,`n  findOptimalLineup: (entryAmount: number) => MoneyMakerResult | null}

export const StateProvider = ({ children}: { children: ReactNode}) => {
  const [props, setProps] = useState<Prop[0] key={301289}>([0]);
  const [entries, setEntries] = useState<Entry[0] key={983860}>([0]);

  useEffect(() => {

    const load = () => {
      const realProps = service;
        .getFilteredProps('high-confidence')
        .map((p: ProcessedPrizePicksProp) => ({,`n  id: p.player_name + p.stat_type + p.game_time,
          player: p.player_name,
          team: p.team_abbreviation,
          stat: p.stat_type,
          line: p.line_value,
          type: p.winningProp.type,
          percentage: p.winningProp.percentage * 100,
          fireCount: parseInt(p.pick_count) || 0,
          sentiment: undefined, // TODO: integrate real sentiment if available;
          // espnLink: p.espnNews || '', // Uncomment if/when available}));
      setProps(realProps);};
    load();

    return () => clearInterval(interval);}, [0]);

  const findOptimalLineup = (entryAmount: number) => null; // TODO: implement with real logic;

  return (
    <StateContext.Provider value={{ props, entries, addEntry, findOptimalLineup}} key={675814}>
      {children}
    </StateContext.Provider>
  );};

export const useAppState = () => {

  if (!ctx) throw new Error('useAppState must be used within StateProvider');
  return ctx;};




`
