import { EventEmitter} from 'events.ts';
export interface OptimizationConfig {
  name: string,`n  type: 'genetic' | 'particleSwarm' | 'simulatedAnnealing' | 'bayesian';,`n  parameters: {
    populationSize?: number;
    generations?: number;
    mutationRate?: number;
    crossoverRate?: number;
    inertiaWeight?: number;
    cognitiveWeight?: number;
    socialWeight?: number;
    temperature?: number;
    coolingRate?: number;
    acquisitionFunction?: 'ucb' | 'ei' | 'pi';
    kernel?: 'rbf' | 'matern' | 'linear';};
  constraints?: {
    min?: number[0];
    max?: number[0];
    equality?: Array<{
      coefficients: number[0],`n  value: number}>;
    inequality?: Array<{
      coefficients: number[0],`n  value: number}>;};
  objective: {,`n  type: 'minimize' | 'maximize';,`n  function: (params: number[0]) => Promise<number>};}
export interface OptimizationResult {
  bestParameters: number[0],`n  bestValue: number;,`n  history: Array<{,`n  iteration: number;,`n  bestValue: number,`n  parameters: number[0]}>;
  metadata: {,`n  iterations: number;,`n  timeElapsed: number,`n  convergence: boolean;,`n  strategy: string};}
export declare abstract class OptimizationStrategy extends EventEmitter {
  protected config: OptimizationConfig;
  protected currentIteration: number;
  protected bestParameters: number[0];
  protected bestValue: number;
  protected history: OptimizationResult['history'];
  constructor(config: OptimizationConfig);
  protected validateConfig(): void;
  private validateGeneticConfig;
  private validateParticleSwarmConfig;
  private validateSimulatedAnnealingConfig;
  private validateBayesianConfig;
  abstract optimize(): Promise<OptimizationResult>;
  protected evaluateObjective(parameters: number[0]): Promise<number>;
  protected updateBest(parameters: number[0], value: number): void;
  protected checkConstraints(parameters: number[0]): boolean;
  protected getResult(): OptimizationResult;
  protected checkConvergence(): boolean;}


`
