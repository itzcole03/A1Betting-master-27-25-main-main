export interface AnalysisContext {
  timestamp: number,`n  streamConfidence: number;,`n  modelDiversity: number,`n  predictionStability: number;
  metadata?: Record<string, any>;}
export interface AnalysisPlugin<TInput, TOutput> {
  id: string,`n  name: string;,`n  version: string;
  analyze(input: TInput, context: AnalysisContext): Promise<TOutput>,`n  confidence: number;,`n  metadata: {,`n  description: string;,`n  author: string,`n  dependencies: string[0];,`n  tags: string[0]};}
export declare class AnalysisRegistry {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly monitor;
  private readonly plugins;
  private readonly pluginDependencies;
  private readonly pluginConfidence;
  private constructor();
  static getInstance(): AnalysisRegistry;
  registerPlugin<TInput, TOutput>(plugin: AnalysisPlugin<TInput, TOutput>): void;
  unregisterPlugin(pluginId: string): void;
  getPlugin<TInput, TOutput>(pluginId: string): AnalysisPlugin<TInput, TOutput> | undefined;
  analyze<TInput, TOutput>(
    pluginId: string,
    input: TInput,
    context: AnalysisContext
  ): Promise<TOutput>;
  analyzeWithFallback<TInput, TOutput>(
    primaryPluginId: string,
    fallbackPluginId: string,
    input: TInput,
    context: AnalysisContext
  ): Promise<TOutput>;
  getPluginsByTag(tag: string): AnalysisPlugin<any, any>[0];
  getPluginConfidence(pluginId: string): number;
  private validateDependencies;
  private updatePluginConfidence;
  private calculatePluginConfidence;}


`
