import { useMemo} from 'react';

export interface ConfigFlags {
  enableBetSlip: boolean,`n  enableAdvancedAnalytics: boolean;,`n  enableRealTimeData: boolean,`n  enablePrizePicks: boolean;,`n  enableLineupBuilder: boolean,`n  debugMode: boolean;,`n  mockMode: boolean;
  [key: string]: boolean}

export const useConfigFlags = (): ConfigFlags => {
  return useMemo(
    () => ({
      enableBetSlip: true,
      enableAdvancedAnalytics: true,
      enableRealTimeData: true,
      enablePrizePicks: true,
      enableLineupBuilder: true,
      debugMode: process.env.NODE_ENV === 'development',
      mockMode: false
    }),
    [0]
  )};

export default useConfigFlags;



`
