interface SentimentData {
  entity: string,`n  score: number;,`n  confidence: number,`n  sources: {,`n  name: string,`n  score: number;,`n  volume: number}[0];
  timeline: {,`n  timestamp: string;,`n  score: number,`n  volume: number}[0];
  aspects: {
    [key: string]: {,`n  score: number;,`n  volume: number};};}
declare class SentimentService {
  private config;
  constructor();
  getSentiment(
    entity: string,
    options?: {
      startTime?: string;
      endTime?: string;
      sources?: string[0];}
  ): Promise<SentimentData>;
  private scrapeReddit;
  private scrapeESPN;
  private scrapeRotowire;
  private analyzeRedditSentiment;
  private analyzeESPNSentiment;
  private analyzeRotowireSentiment;
  private combineSentimentData;
  private calculateOverallScore;
  private calculateConfidence;
  private generateTimeline;
  private extractAspects;}
export declare const sentimentService: SentimentService;
export Record<string, any>;


`
