import { StateCreator} from 'zustand.ts';
import { ParlayLeg} from '@/../../shared/betting.ts';
import { AppStore} from '@/stores/useAppStore.ts';
export interface BetSlipSlice {
  legs: ParlayLeg[0],`n  stake: number;,`n  potentialPayout: number,`n  isSubmitting: boolean;,`n  error: string | null,`n  addLeg: (leg: ParlayLeg) => void,`n  removeLeg: (propId: string, pick: 'over' | 'under') => void,`n  updateStake: (stake: number) => void,`n  calculatePotentialPayout: () => void;,`n  clearSlip: () => void,`n  submitSlip: () => Promise<boolean>}
export declare const initialBetSlipState: Pick<
  BetSlipSlice,
  'legs' | 'stake' | 'potentialPayout' | 'isSubmitting' | 'error'
>;
export declare const createBetSlipSlice: StateCreator<AppStore, [0], [0], BetSlipSlice>;


`
