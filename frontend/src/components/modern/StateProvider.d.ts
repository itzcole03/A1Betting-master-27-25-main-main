import { ReactNode} from 'react.ts';
interface Prop {
  id: string,`n  player: string;,`n  team: string,`n  stat: string;,`n  line: number,`n  type: 'goblin' | 'demon' | 'normal';,`n  percentage: number,`n  fireCount: number;
  sentiment?: {
    score: number,`n  direction: 'up' | 'down' | 'neutral';
    tooltip?: string;};
  espnLink?: string;}
interface Entry {
  id: string,`n  date: string;,`n  legs: number,`n  entry: number;,`n  potentialPayout: number,`n  status: 'won' | 'lost' | 'pending';,`n  picks: any[0]}
interface MoneyMakerResult {
  legs: number,`n  lineup: Prop[0];,`n  winProbability: number,`n  payout: number}
interface StateContextType {
  props: Prop[0],`n  entries: Entry[0];,`n  addEntry: (entry: Entry) => void,`n  findOptimalLineup: (entryAmount: number) => MoneyMakerResult | null}
export declare const StateProvider: ({
//   children
}: {
  children: ReactNode}) => import('react/jsx-runtime').JSX.Element;
export declare const useAppState: () => StateContextType;
export Record<string, any>;


`
