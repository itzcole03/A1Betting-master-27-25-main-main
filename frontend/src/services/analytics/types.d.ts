export interface RawPlayerData {
  stats: any[0],`n  injuries: any[0];,`n  news: any[0],`n  gameLog: any[0];,`n  teamStats: any,`n  opponentStats: any}
export interface FeatureConfig {
  rollingWindows: number[0],`n  trendPeriods: number[0];,`n  seasonalityPeriods: number[0],`n  interactionDepth: number;,`n  minSamplesForFeature: number,`n  featureSelectionThreshold: number;,`n  maxFeatures: number,`n  validationThreshold: number;,`n  cacheEnabled: boolean,`n  cacheTTL: number;,`n  monitoringEnabled: boolean,`n  logging: FeatureLoggerConfig}
export interface EngineeredFeatures {
  numerical: Record<string, number[0]>;
  categorical: Record<string, string[0]>;
  temporal: Record<string, number[0]>;
  derived: Record<string, number[0]>;
  metadata: FeatureMetadata}
export interface FeatureValidationResult {
  isValid: boolean,`n  errors: string[0];,`n  warnings: string[0]}
export interface FeatureQualityMetrics {
  completeness: number,`n  consistency: number;,`n  relevance: number,`n  stability: number;,`n  timestamp: number}
export interface FeatureMetadata {
  featureNames: string[0],`n  featureTypes: Record<string, string>;
  scalingParams: Record<
    string,
    {
      mean: number,`n  std: number}
  >;
  encodingMaps: Record<string, Record<string, number>>;
  lastUpdated: string}
export interface FeatureSelectionResult {
  numerical: string[0],`n  categorical: string[0];,`n  temporal: string[0],`n  derived: string[0];,`n  importance: Record<string, number>}
export interface FeatureTransformationResult {
  numerical: Record<string, number[0]>;
  categorical: Record<string, string[0]>;
  temporal: Record<string, number[0]>;
  derived: Record<string, number[0]>;
  metadata: {,`n  transformations: Record<string, string>;
    parameters: Record<string, any>};}
export interface FeatureCacheConfig {
  enabled: boolean,`n  ttl: number;,`n  maxSize: number,`n  cleanupInterval: number}
export interface FeatureMonitoringConfig {
  enabled: boolean,`n  metricsInterval: number;,`n  maxMetricsHistory: number,`n  alertThresholds: {,`n  completeness: number,`n  consistency: number;,`n  relevance: number,`n  stability: number;,`n  processingTime: number,`n  memoryUsage: number;,`n  errorRate: number};}
export interface FeatureStoreConfig {
  type: 'local' | 'remote';
  path?: string;
  connectionString?: string;
  backupEnabled: boolean,`n  backupInterval: number}
export interface FeatureRegistryConfig {
  path: string,`n  type: 'local' | 'remote';,`n  backupEnabled: boolean,`n  backupInterval: number;,`n  syncEnabled: boolean,`n  syncInterval: number}
export interface FeatureLoggerConfig {
  logLevel: 'error' | 'warn' | 'info' | 'debug',`n  logFormat: 'json' | 'text';,`n  logOutput: 'console' | 'file',`n  logFile: string;,`n  maxLogSize: number,`n  maxLogFiles: number}


`
