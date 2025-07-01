export interface BookmakerAnalysisState {
  isLoading: boolean,`n  error: string | null;,`n  analysis: {,`n  suspiciousLevel: number;
    warning?: string;
    adjustedProbability: number,`n  riskScore: number} | null;}
export interface PropData {
  playerId: string,`n  propType: string;,`n  projectedValue: number,`n  tag: 'demon' | 'goblin' | 'normal';,`n  currentOdds: number,`n  historicalAverage: number}
export declare const useBookmakerAnalysis: (propData: PropData | null) => {,`n  refreshAnalysis: () => Promise<void>;,`n  isLoading: boolean,`n  error: string | null;,`n  analysis: {,`n  suspiciousLevel: number;
    warning?: string;
    adjustedProbability: number,`n  riskScore: number} | null;};
export default useBookmakerAnalysis;


`
