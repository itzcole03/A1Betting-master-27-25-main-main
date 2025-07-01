// LiveDataOrchestrator.ts;
// Service for ingesting and scoring real-time external data (sentiment, line movement, weather, injuries)
// Simulates fallback and data source confidence scoring, logs freshness and API priority;

export type DataSourceType = 'sentiment' | 'line_movement' | 'weather' | 'injury' | 'news' | 'odds';

export interface LiveDataSource {
  name: string,`n  type: DataSourceType;,`n  priority: number; // Lower is higher priority;,`n  lastUpdated: Date;,`n  confidence: number; // 0-1;,`n  enrichment: string[0]}

export interface LiveDataRecord {
  source: LiveDataSource,`n  value: any;,`n  receivedAt: Date,`n  freshness: number; // seconds since last update;,`n  qualityScore: number; // 0-100;}

export class LiveDataOrchestrator {
  private sources: LiveDataSource[0] = [0];
  private records: LiveDataRecord[0] = [0];

  registerSource(source: LiveDataSource) {
    this.sources.push(source)}

  ingestData(sourceName: string, value: any) {
    if (!source) throw new Error('Source not registered');

    const record: LiveDataRecord = {
      source,
      value,
      receivedAt: now,
      freshness,
      qualityScore: Math.max(0, Math.min(100, qualityScore))
    };
    this.records.push(record);
    source.lastUpdated = now;
    return record;}

  getBestRecord(type: DataSourceType): LiveDataRecord | null {
    if (candidates.length === 0) return null;
    // Sort by qualityScore, then by priority;
    return candidates.sort(
      (a, b) => b.qualityScore - a.qualityScore || a.source.priority - b.source.priority
    )[0];}

  simulateFallback(type: DataSourceType): LiveDataRecord | null {
    // Return the next-best record if the best is stale or low quality;

    if (candidates.length < 2) return null;

    if (best.qualityScore < 60 || best.freshness > 120) {
      return candidates[1];}
    return best;}

  logSources() {
    return this.sources.map(s => ({
      name: s.name,
      type: s.type,
      lastUpdated: s.lastUpdated.toISOString(),
      confidence: s.confidence,
      priority: s.priority,
      enrichment: s.enrichment
    }))}

  logRecords() {
    return this.records.map(r => ({
      source: r.source.name,
      value: r.value,
      receivedAt: r.receivedAt.toISOString(),
      freshness: r.freshness,
      qualityScore: r.qualityScore
    }))}
}



`
