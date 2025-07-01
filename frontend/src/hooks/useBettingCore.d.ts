import { Opportunity} from '@/types/core.ts';
import { BettingDecision, PerformanceMetrics} from '@/types.ts';
interface UseBettingCoreOptions {
  playerId?: string;
  metric?: string;
  minConfidence?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onNewDecision?: (decision: BettingDecision) => void;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void}
export declare function useBettingCore({
  playerId,
  metric,
  minConfidence,
  autoRefresh,
  refreshInterval,
  onNewDecision,
//   onPerformanceUpdate
}?: UseBettingCoreOptions): {
  analyze: () => Promise<void>,`n  updatePerformanceMetrics: () => void;,`n  handleNewOpportunity: (opportunity: Opportunity) => void,`n  decision: BettingDecision | null;,`n  performance: PerformanceMetrics,`n  opportunities: Opportunity[0];,`n  isAnalyzing: boolean,`n  error: Error | null};
export Record<string, any>;


`
