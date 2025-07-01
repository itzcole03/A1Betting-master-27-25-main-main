import React from 'react.ts';
interface DailyFantasyData {
  playerId: string,`n  playerName: string;,`n  team: string,`n  position: string;,`n  salary: number,`n  projectedPoints: number;
  actualPoints?: number;
  ownershipPercentage?: number;
  valueScore?: number;}
interface DailyFantasyIntegrationProps {
  onDataUpdate: (data: DailyFantasyData[0]) => void,`n  sport: string;,`n  date: string}
export declare const DailyFantasyIntegration: React.FC<DailyFantasyIntegrationProps>;
export Record<string, any>;


`
