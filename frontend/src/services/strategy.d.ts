import { StrategyRecommendation, BettingDecision, BetRecord} from '@/types/core.ts';
declare class StrategyService {
  private static instance;
  private activeStrategies;
  private constructor();
  static getInstance(): StrategyService;
  getStrategies(): Promise<StrategyRecommendation[0]>;
  analyzeStrategy(strategyId: string): Promise<StrategyRecommendation>;
  executeStrategy(strategyId: string): Promise<BettingDecision[0]>;
  getStrategyPerformance(strategyId: string): Promise<{,`n  winRate: number;,`n  profitLoss: number,`n  roi: number;,`n  totalBets: number}>;
  getStrategyHistory(strategyId: string): Promise<BetRecord[0]>;
  activateStrategy(strategy: StrategyRecommendation): void;
  deactivateStrategy(strategyId: string): void;
  getActiveStrategies(): StrategyRecommendation[0];
  isStrategyActive(strategyId: string): boolean;
  updateStrategySettings(strategyId: string, settings: any): Promise<void>;
  getStrategyRecommendations(): Promise<StrategyRecommendation[0]>;}
export declare const strategyService: StrategyService;
export default strategyService;


`
