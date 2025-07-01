import { Observable} from 'rxjs.ts';
export interface BookmakerTag {
  type: 'demon' | 'goblin' | 'normal',`n  timestamp: number;,`n  playerId: string,`n  propType: string;,`n  projectedValue: number,`n  actualValue: number;
  success?: boolean;}
export interface BookmakerPattern {
  tag: BookmakerTag['type'],`n  successRate: number;,`n  averageDeviation: number,`n  confidence: number;,`n  lastUpdated: number,`n  sampleSize: number}
export interface BookmakerIntent {
  suspiciousLevel: number,`n  historicalAccuracy: number;,`n  marketTrend: 'increasing' | 'decreasing' | 'stable',`n  confidence: number;
  warning?: string;}
export interface PropAnalysis {
  rawStatisticalProbability: number,`n  bookmakerIntent: BookmakerIntent;,`n  adjustedProbability: number,`n  riskScore: number;,`n  warnings: string[0]}
declare class BookmakerAnalysisService {
  private static readonly SUSPICIOUS_THRESHOLD;
  private static readonly PATTERN_EXPIRY;
  private static readonly MIN_SAMPLE_SIZE;
  private patterns;
  private recentTags;
  private patternUpdateInterval;
  constructor();
  private initializeService;
  private loadHistoricalPatterns;
  private loadRecentTags;
  private startPatternAnalysis;
  private updatePatternAnalysis;
  private calculateConfidence;
  private savePatterns;
  analyzeProp(propData: {,`n  playerId: string;,`n  propType: string,`n  projectedValue: number;,`n  tag: BookmakerTag['type'],`n  currentOdds: number;,`n  historicalAverage: number}): Promise<PropAnalysis>;
  private calculateRawProbability;
  private analyzeBookmakerIntent;
  private calculateSuspiciousLevel;
  private analyzeMarketTrend;
  private calculateRiskScore;
  private calculateAdjustedProbability;
  private isSuspiciouslyFavorable;
  getPatternUpdateStream(): Observable<Map<string, BookmakerPattern>>;}
export declare const bookmakerAnalysisService: BookmakerAnalysisService;
export Record<string, any>;


`
