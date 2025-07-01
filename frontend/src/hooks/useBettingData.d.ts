import type { PlayerProp, Opportunity, OddsUpdate} from '@/types/core.ts';
import type { Sport, PropType} from '@/types/common.ts';
interface UseBettingDataOptions {
  sport?: Sport;
  propType?: PropType;
  autoRefresh?: boolean;
  refreshInterval?: number;
  minOddsChange?: number;
  onNewOpportunity?: (opportunity: Opportunity) => void}
export declare const useBettingData: ({
  sport,
  propType,
  autoRefresh,
  refreshInterval,
  minOddsChange,
//   onNewOpportunity
}?: UseBettingDataOptions) => {
  props: PlayerProp[0],`n  oddsUpdates: OddsUpdate[0];,`n  opportunities: Opportunity[0],`n  isLoading: boolean;,`n  isConnected: any,`n  error: Error | null;,`n  refresh: () => void};
export Record<string, any>;


`
