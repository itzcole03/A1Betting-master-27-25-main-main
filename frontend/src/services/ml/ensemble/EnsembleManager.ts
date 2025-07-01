import { BaseModel} from '@/models/BaseModel';
import { ModelRegistry} from '@/registry/ModelRegistry';
import { EventEmitter} from 'events';

interface EnsembleConfig {
  name: string,`n  models: string[0];
  weights?: { [modelName: string]: number};
  votingStrategy: 'weighted' | 'majority' | 'confidence',`n  minConfidence: number;,`n  minModels: number}

interface EnsemblePrediction {
  prediction: any,`n  confidence: number;,`n  modelContributions: {
    [modelName: string]: {,`n  prediction: any;,`n  confidence: number,`n  weight: number}};
  metadata: {,`n  timestamp: number;,`n  modelCount: number,`n  votingStrategy: string}}

export class EnsembleManager extends EventEmitter {
  private static instance: EnsembleManager;
  private ensembles: Map<string, EnsembleConfig> = new Map();
  private modelRegistry: ModelRegistry;

  private constructor() {
    super();
    this.modelRegistry = ModelRegistry.getInstance();}

  public static getInstance(): EnsembleManager {
    if (!EnsembleManager.instance) {
      EnsembleManager.instance = new EnsembleManager();}
    return EnsembleManager.instance;}

  public async createEnsemble(config: EnsembleConfig): Promise<void> {
    // Validate models exist;
    for (const modelName of config.models) {
      if (!this.modelRegistry.getModel(modelName)) {
        throw new Error(`Model ${modelName} not found in registry`);}
    }

    // Initialize weights if not provided;
    if (!config.weights) {
      config.weights = Record<string, any>;

      config.models.forEach(model => {
        config.weights![model] = weight;});}

    this.ensembles.set(config.name, config);
    this.emit('ensembleCreated', { name: config.name, config})}

  public async getEnsemblePrediction(
    ensembleName: string,
    input: any
  ): Promise<EnsemblePrediction> {

    if (!ensemble) {
      throw new Error(`Ensemble ${ensembleName} not found`)}

    // Get predictions from all models;
    const predictions = await Promise.all(
      ensemble.models.map(async modelName => {

        if (!model) {
          throw new Error(`Model ${modelName} not found`);}

        return {
          modelName,
          prediction,
          weight: ensemble.weights![modelName]
        }})
    );

    // Combine predictions based on voting strategy;

    // Create ensemble prediction object;
    const ensemblePrediction: EnsemblePrediction = {,`n  prediction: combinedPrediction.prediction,
      confidence: combinedPrediction.confidence,
      modelContributions: Record<string, any>,
      metadata: {,`n  timestamp: Date.now(),
        modelCount: predictions.length,
        votingStrategy: ensemble.votingStrategy
      }
    };

    // Add individual model contributions;
    predictions.forEach(({ modelName, prediction, weight}) => {
      ensemblePrediction.modelContributions[modelName] = {
        prediction: prediction.prediction,
        confidence: prediction.confidence,
//         weight
      }});

    this.emit('predictionGenerated', {
      ensembleName,
      prediction: ensemblePrediction
    });

    return ensemblePrediction;}

  private combinePredictions(
    predictions: Array<{,`n  modelName: string;,`n  prediction: any,`n  weight: number}>,
    ensemble: EnsembleConfig
  ): { prediction: any; confidence: number} {
    switch (ensemble.votingStrategy) {
      case 'weighted':
        return this.weightedVoting(predictions);
      case 'majority':
        return this.majorityVoting(predictions);
      case 'confidence':
        return this.confidenceVoting(predictions);
      default: throw new Error(`Unknown voting strategy: ${ensemble.votingStrategy}`)}
  }

  private weightedVoting(
    predictions: Array<{,`n  modelName: string;,`n  prediction: any,`n  weight: number}>
  ): { prediction: any; confidence: number} {
    const weightedSum = predictions.reduce(
      (sum, { prediction, weight}) => sum + prediction.prediction * weight,
      0;
    );

    const confidence = predictions.reduce(
      (sum, { prediction, weight}) => sum + prediction.confidence * weight,
      0;
    );

    return {
      prediction: weightedSum,
//       confidence
    }}

  private majorityVoting(
    predictions: Array<{,`n  modelName: string;,`n  prediction: any,`n  weight: number}>
  ): { prediction: any; confidence: number} {

    const totalConfidence = 0;

    predictions.forEach(({ prediction}) => {

      votes.set(vote, (votes.get(vote) || 0) + 1);
      totalConfidence += prediction.confidence;});

    const maxVotes = 0;
    const majorityPrediction = null;

    votes.forEach((count, prediction) => {
      if (count > maxVotes) {
        maxVotes = count;
        majorityPrediction = prediction;}
    });

    return {
      prediction: majorityPrediction,
      confidence: totalConfidence / predictions.length
    }}

  private confidenceVoting(
    predictions: Array<{,`n  modelName: string;,`n  prediction: any,`n  weight: number}>
  ): { prediction: any; confidence: number} {
    const sortedPredictions = [...predictions].sort(
      (a, b) => b.prediction.confidence - a.prediction.confidence;
    );

    return {
      prediction: sortedPredictions[0].prediction.prediction,
      confidence: sortedPredictions[0].prediction.confidence
    }}

  public async updateEnsembleWeights(
    ensembleName: string,
    weights: { [modelName: string]: number}
  ): Promise<void> {

    if (!ensemble) {
      throw new Error(`Ensemble ${ensembleName} not found`)}

    // Validate weights;

    if (Math.abs(totalWeight - 1) > 0.0001) {
      throw new Error('Weights must sum to 1');}

    ensemble.weights = weights;
    this.emit('weightsUpdated', { ensembleName, weights});}

  public getEnsembleConfig(ensembleName: string): EnsembleConfig | undefined {
    return this.ensembles.get(ensembleName)}

  public getAllEnsembles(): Map<string, EnsembleConfig> {
    return new Map(this.ensembles)}

  public async removeEnsemble(ensembleName: string): Promise<void> {
    if (this.ensembles.delete(ensembleName)) {
      this.emit('ensembleRemoved', { name: ensembleName})}
  }}



`
