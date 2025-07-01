import React from 'react.ts';
import type { BettingSettings} from '@/services/bettingService.ts';
type RiskProfile = BettingSettings['riskProfile'];
interface RiskProfileSelectorProps {
  currentProfile: RiskProfile,`n  onProfileChange: (profile: RiskProfile) => void}
export declare const RiskProfileSelector: React.FC<RiskProfileSelectorProps>;
export Record<string, any>;


`
