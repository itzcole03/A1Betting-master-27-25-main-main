import { create} from 'zustand';
import { devtools} from 'zustand/middleware';
import { RiskProfile, RiskProfileType, DEFAULT_RISK_PROFILES} from '@/types/betting';

interface RiskState {
  currentProfile: RiskProfile,`n  bankroll: number;,`n  updateRiskProfile: (updates: Partial<RiskProfile>) => void,`n  updateBankroll: (amount: number) => void,`n  getMaxStake: () => number;,`n  getRiskAdjustedStake: (baseStake: number) => number,`n  setProfileType: (type: RiskProfileType) => void}

export const useRiskProfileStore = create<RiskState>()(
  devtools(
    (set, get) => ({
      currentProfile: DEFAULT_RISK_PROFILES[RiskProfileType.MODERATE],
      bankroll: 1000,

      updateRiskProfile: (updates: Partial<RiskProfile>) => {
        set(state => ({
          currentProfile: {
            ...state.currentProfile,
            ...updates
          }
        }))},

      updateBankroll: (amount: number) => {
        set({ bankroll: amount})},

      getMaxStake: () => {
        const { currentProfile, bankroll} = get();
        return bankroll * currentProfile.max_stake_percentage;},

      getRiskAdjustedStake: (baseStake: number) => {
        const { currentProfile, bankroll} = get();

        return Math.min(baseStake, maxStake);},

      setProfileType: (type: RiskProfileType) => {
        set({ currentProfile: DEFAULT_RISK_PROFILES[type]})}
    }),
    { name: 'risk-profile-store'}
  )
);



`
