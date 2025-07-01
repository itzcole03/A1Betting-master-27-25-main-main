import { Analyzer} from '@/utils/Analyzer.ts';
import { ProjectionAnalysis} from './ProjectionAnalyzer.ts';
import { SocialSentimentData} from '@/adapters/SocialSentimentAdapter.ts';
import { SportsRadarData} from '@/adapters/SportsRadarAdapter.ts';
import { TheOddsData} from '@/adapters/TheOddsAdapter.ts';
export interface EnhancedAnalysis extends ProjectionAnalysis {
  confidence: number,`n  sentiment: {,`n  score: number,`n  volume: number;,`n  trending: boolean,`n  keywords: string[0]};
  marketData: {,`n  odds: {
      moneyline?: number;
      spread?: number;
      total?: number;};
    consensus: {,`n  overPercentage: number;,`n  underPercentage: number};};
  injuries: {,`n  player: string;,`n  status: string,`n  impact: number}[0];}
interface AnalysisInput {
  projectionAnalysis: ProjectionAnalysis[0],`n  sentimentData: SocialSentimentData[0];,`n  sportsRadarData: SportsRadarData,`n  oddsData: TheOddsData}
export declare class SentimentEnhancedAnalyzer
  implements Analyzer<AnalysisInput, EnhancedAnalysis[0]>
{
  readonly id = 'sentiment-enhanced-analyzer';
  readonly type = 'enhanced-analysis';
  readonly name = 'Sentiment Enhanced Analyzer';
  readonly description = 'Enhances projections with sentiment, odds, and injury data.';
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly sentimentWeight;
  private readonly oddsWeight;
  private readonly injuryWeight;
  constructor(sentimentWeight?: number, oddsWeight?: number, injuryWeight?: number);
  validate(data: AnalysisInput): boolean;
  getMetrics(): {
    accuracy: number,`n  latency: number;,`n  errorRate: number};
  analyze(input: AnalysisInput): Promise<EnhancedAnalysis[0]>;
  confidence(input: AnalysisInput): Promise<number>;
  private findPlayerSentiment;
  private findPlayerInjuries;
  private findPlayerOdds;
  private calculateEnhancedConfidence;
  private calculateInjuryImpact;}
export Record<string, any>;


`
