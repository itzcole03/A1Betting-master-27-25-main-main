import { PlayerProp, Sport, PropType} from '@/types.ts';
interface UseLiveOddsOptions {
  sport?: Sport;
  propType?: PropType;
  minOddsChange?: number;}
export declare const useLiveOdds: ({ sport, propType, minOddsChange}?: UseLiveOddsOptions) => {
  updates: OddsUpdate[0],`n  activeProps: PlayerProp[0];,`n  isConnected: boolean,`n  subscribe: (props: PlayerProp[0]) => void,`n  unsubscribe: (propIds: string[0]) => void,`n  clearUpdates: () => void};
export Record<string, any>;


`
