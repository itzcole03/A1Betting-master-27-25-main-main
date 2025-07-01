import { Analyzer} from '@/core/Analyzer.ts';
import { DailyFantasyData} from '@/adapters/DailyFantasyAdapter.ts';
export interface ProjectionAnalysis {
  player: string,`n  predictions: {,`n  points: PredictionMetrics,`n  rebounds: PredictionMetrics;,`n  assists: PredictionMetrics,`n  steals: PredictionMetrics;,`n  blocks: PredictionMetrics,`n  threes: PredictionMetrics;,`n  minutes: PredictionMetrics};
  confidence: number,`n  metadata: {,`n  team: string,`n  position: string;,`n  opponent: string,`n  isHome: boolean};}
interface PredictionMetrics {
  predicted: number,`n  confidence: number;,`n  range: {,`n  min: number;,`n  max: number};}
export declare class ProjectionAnalyzer
  implements Analyzer<DailyFantasyData, ProjectionAnalysis[0]>
{
  readonly id = 'projection-analyzer';
  readonly type = 'sports-projections';
  readonly name = 'Projection Analyzer';
  readonly description = 'Analyzes player projections for fantasy sports.';
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly confidenceThreshold;
  constructor(confidenceThreshold?: number);
  analyze(data: DailyFantasyData): Promise<ProjectionAnalysis[0]>;
  confidence(data: DailyFantasyData): Promise<number>;
  private analyzePlayerProjection;
  private calculateBaseConfidence;
  private calculateMetrics;
  private calculateVariance;
  private getStatTypeConfidence;
  private isValidProjection;
  validate(data: DailyFantasyData): boolean;
  getMetrics(): {
    accuracy: number,`n  latency: number;,`n  errorRate: number};}
export Record<string, any>;


`
