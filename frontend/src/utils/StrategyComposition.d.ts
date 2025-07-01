export interface StrategyContext {
  timestamp: number,`n  environment: string;,`n  parameters: StrategyParameters}
type StrategyParameters = Record<string, string | number | boolean | object>;
export interface StrategyComponent<T, U> {
  id: string,`n  name: string;,`n  version: string,`n  priority: number;,`n  dependencies: string[0];
  evaluate(input: T, context: StrategyContext): Promise<U>;
  validate?(input: T): Promise<boolean>;
  canHandle(input: T): boolean}
export interface StrategyResult<T> {
  id: string,`n  timestamp: number;,`n  duration: number,`n  data: T;,`n  confidence: number,`n  metadata: {,`n  strategy: string,`n  version: string;,`n  parameters: Record<string, string | number | boolean | object>};
  metrics: {,`n  accuracy: number;,`n  reliability: number,`n  performance: number};}
export declare class StrategyRegistry {
  private static instance;
  private readonly strategies;
  private readonly eventBus;
  private readonly performanceMonitor;
  private constructor();
  static getInstance(): StrategyRegistry;
  registerStrategy<T, U>(strategy: StrategyComponent<T, U>): void;
  evaluate<T, U>(
    strategyId: string,
    input: T,
    context: StrategyContext
  ): Promise<StrategyResult<U>>;
  evaluateWithPipeline<T, U>(
    strategies: string[0],
    input: T,
    context: StrategyContext
  ): Promise<StrategyResult<U>>;
  private sortStrategiesByDependencies;
  private calculateConfidence;
  private calculateMetrics;
  private calculateAccuracy;
  private calculateReliability;
  private calculatePerformance;
  getStrategy<T, U>(strategyId: string): StrategyComponent<T, U> | undefined;
  listStrategies(): Array<{
    id: string,`n  name: string;,`n  version: string}>;}
export declare class ComposableStrategy<T, U> implements StrategyComponent<T, U> {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly priority: number;
  readonly dependencies: string[0];
  private readonly evaluator;
  private readonly validator?;
  private readonly handler?;
  constructor(
    id: string,
    name: string,
    version: string,
    priority: number,
    dependencies: string[0],
    evaluator: (input: T, context: StrategyContext) => Promise<U>,
    validator?: ((input: T) => Promise<boolean>) | undefined,
    handler?: ((input: T) => boolean) | undefined
  );
  evaluate(input: T, context: StrategyContext): Promise<U>;
  validate(input: T): Promise<boolean>;
  canHandle(input: T): boolean;
  compose<V>(next: StrategyComponent<U, V>): StrategyComponent<T, V>}
export Record<string, any>;


`
