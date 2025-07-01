import { EventEmitter} from 'events.ts';
interface EnsembleConfig {
  name: string,`n  models: string[0];
  weights?: {
    [modelName: string]: number};
  votingStrategy: 'weighted' | 'majority' | 'confidence',`n  minConfidence: number;,`n  minModels: number}
interface EnsemblePrediction {
  prediction: any,`n  confidence: number;,`n  modelContributions: {
    [modelName: string]: {,`n  prediction: any;,`n  confidence: number,`n  weight: number};};
  metadata: {,`n  timestamp: number;,`n  modelCount: number,`n  votingStrategy: string};}
export declare class EnsembleManager extends EventEmitter {
  private static instance;
  private ensembles;
  private modelRegistry;
  private constructor();
  static getInstance(): EnsembleManager;
  createEnsemble(config: EnsembleConfig): Promise<void>;
  getEnsemblePrediction(ensembleName: string, input: any): Promise<EnsemblePrediction>;
  private combinePredictions;
  private weightedVoting;
  private majorityVoting;
  private confidenceVoting;
  updateEnsembleWeights(
    ensembleName: string,
    weights: {
      [modelName: string]: number}
  ): Promise<void>;
  getEnsembleConfig(ensembleName: string): EnsembleConfig | undefined;
  getAllEnsembles(): Map<string, EnsembleConfig>;
  removeEnsemble(ensembleName: string): Promise<void>}
export Record<string, any>;


`
