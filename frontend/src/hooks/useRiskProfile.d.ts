import { RiskProfile} from '@/types/core.ts';
export declare function useRiskProfile(): {
  activeProfile: RiskProfile | null,`n  profiles: RiskProfile[0];,`n  isLoading: boolean,`n  error: Error | null;,`n  updateProfile: (profile: RiskProfile) => Promise<boolean>,`n  setActiveProfile: (profileId: string) => Promise<boolean>};


`
