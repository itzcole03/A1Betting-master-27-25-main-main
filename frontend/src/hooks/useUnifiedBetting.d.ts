import { BettingDecision} from '@/core/UnifiedBettingSystem.ts';
interface UseUnifiedBettingOptions {
  playerId?: string;
  metric?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onNewOpportunity?: (decision: BettingDecision) => void}
export declare function useUnifiedBetting({
  playerId,
  metric,
  autoRefresh,
  refreshInterval,
//   onNewOpportunity
}?: UseUnifiedBettingOptions): {
  decision: any,`n  isAnalyzing: boolean;,`n  error: Error | null,`n  analyze: () => Promise<void>};
export Record<string, any>;


`
