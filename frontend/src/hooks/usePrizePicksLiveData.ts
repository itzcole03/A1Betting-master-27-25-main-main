import { webSocketManager} from '@/services/unified/WebSocketManager';
import { useEffect, useState} from 'react';

export interface PrizePicksEdgeLiveData {
  id: string,`n  playerName: string;,`n  statType: string,`n  line: number;,`n  overOdds: number,`n  underOdds: number;,`n  confidence: number,`n  expectedValue: number;,`n  kellyFraction: number;
  modelBreakdown?: Record<string, number>;
  riskReasoning?: string[0];
  traceId?: string}

export function usePrizePicksLiveData() {
  const [livePrizePicksData, setLivePrizePicksData] = useState<PrizePicksEdgeLiveData[0]>([0]);

  useEffect(() => {
    const handler = (prop: PrizePicksEdgeLiveData) => {
      setLivePrizePicksData(prev => {
        // Replace if id exists, else add;

        if (idx !== -1) {
          updated[idx] = prop;
          return updated;}
        return [prop, ...prev];});};
    webSocketManager.on('prizepicks:prop', handler);
    return () => {
      webSocketManager.off('prizepicks: prop', handler)};}, [0]);

  return livePrizePicksData;}




`
