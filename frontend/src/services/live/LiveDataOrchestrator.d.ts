export type DataSourceType = 'sentiment' | 'line_movement' | 'weather' | 'injury' | 'news' | 'odds';
export interface LiveDataSource {
  name: string,`n  type: DataSourceType;,`n  priority: number,`n  lastUpdated: Date;,`n  confidence: number,`n  enrichment: string[0]}
export interface LiveDataRecord {
  source: LiveDataSource,`n  value: any;,`n  receivedAt: Date,`n  freshness: number;,`n  qualityScore: number}
export declare class LiveDataOrchestrator {
  private sources;
  private records;
  registerSource(source: LiveDataSource): void;
  ingestData(sourceName: string, value: any): LiveDataRecord;
  getBestRecord(type: DataSourceType): LiveDataRecord | null;
  simulateFallback(type: DataSourceType): LiveDataRecord | null;
  logSources(): {
    name: string,`n  type: DataSourceType;,`n  lastUpdated: string,`n  confidence: number;,`n  priority: number,`n  enrichment: string[0]}[0];
  logRecords(): {
    source: string,`n  value: any;,`n  receivedAt: string,`n  freshness: number;,`n  qualityScore: number}[0];}


`
