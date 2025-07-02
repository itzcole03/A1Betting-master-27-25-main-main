import { BettingOpportunity} from '@/types/betting';
import axios from 'axios';
import type { ModelPrediction} from '@/types/prediction';
import { toast} from 'react-toastify';

// Core interfaces;
export interface WeatherCondition {
  temperature: number
,`n  windSpeed: number;
,`n  precipitation: number
,`n  humidity: number;
,`n  windDirection: number}

export interface InjuryReport {
  playerId: string
,`n  playerName: string;
,`n  position: string
,`n  status: 'OUT' | 'DOUBTFUL' | 'QUESTIONABLE' | 'PROBABLE';
,`n  details: string
,`n  impactScore: number}

export interface SentimentData {
  source: 'TWITTER' | 'NEWS' | 'REDDIT'
,`n  sentiment: number;
,`n  volume: number
,`n  keywords: string[0];
,`n  timestamp: number}

export interface PredictionResult {
  predictedValue: number
,`n  confidence: number;
,`n  factors: PredictionFactor[0]
,`n  metadata: Record<string, unknown>;
  kellyValue: number
,`n  marketEdge: number;
,`n  shapValues: Record<string, number>}

export interface PredictionFactor {
  name: string
,`n  impact: number;
,`n  confidence: number
,`n  description: string;
,`n  metadata: Record<string, unknown>}

export interface WeatherData {
  temperature: number
,`n  windSpeed: number;
,`n  precipitation: number
,`n  humidity: number;
,`n  conditions: string}

export interface HistoricalPattern {
  pattern: string
,`n  similarity: number;
,`n  outcome: string
,`n  confidence: number;
,`n  metadata: {
,`n  matchCount: number;
,`n  winRate: number
,`n  averageOddsMovement: number}}

interface ModelWeights {
  [key: string]: number}

interface PredictionConfig {
  minConfidence: number
,`n  maxStakePercentage: number;
,`n  riskProfile: 'conservative' | 'moderate' | 'aggressive'
,`n  autoRefresh: boolean;
,`n  refreshInterval: number}

interface ModelOutput {
  type: string
,`n  prediction: number;
,`n  confidence: number
,`n  shapValues: Record<string, number>}

interface Prediction {
  id: string
,`n  timestamp: string;
,`n  prediction: number
,`n  confidence: number;
,`n  shapValues: Record<string, number>;
  kellyValue: number
,`n  marketEdge: number}

class UnifiedPredictionService {
  private static instance: UnifiedPredictionService | null = null;
  private weatherCache: Map<string, WeatherData>;
  private injuryCache: Map<string, InjuryReport[0]>;
  private sentimentCache: Map<string, SentimentData[0]>;
  private modelWeights: ModelWeights = {
,`n  xgboost: 0.3,
    lightgbm: 0.25,
    catboost: 0.2,
    neuralNetwork: 0.15,
    randomForest: 0.1
  };

  private config: PredictionConfig = {
,`n  minConfidence: 0.7,
    maxStakePercentage: 0.1,
    riskProfile: 'moderate',
    autoRefresh: true,
    refreshInterval: 30000
  };

  private readonly apiUrl: string;
  private readonly wsUrl: string;

  protected constructor() {
    this.weatherCache = new Map();
    this.injuryCache = new Map();
    this.sentimentCache = new Map();
    this.apiUrl = import.meta.env.VITE_API_BASE_URL || '${process.env.REACT_APP_API_URL || "http://localhost:8000"}';
    this.wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'ws: //localhost:8000'}

  public static getInstance(): UnifiedPredictionService {
    if (!UnifiedPredictionService.instance) {
      UnifiedPredictionService.instance = new UnifiedPredictionService()}
    return UnifiedPredictionService.instance;}

  public async analyzePredictionFactors(
    opportunity: BettingOpportunity
  ): Promise<PredictionFactor[0]> {
    const factors: PredictionFactor[0] = [0];

    // Parallel execution of factor analysis;
    const [injuryFactors, weatherFactor, sentimentFactor, patternFactors] = await Promise.all([
      this.analyzeInjuryImpact(opportunity),
      this.analyzeWeatherImpact(opportunity),
      this.analyzeSentiment(opportunity),
      this.findHistoricalPatterns(opportunity),
    ]);

    factors.push(...injuryFactors);
    if (weatherFactor) factors.push(weatherFactor);
    factors.push(sentimentFactor);
    factors.push(...patternFactors);

    return this.normalizePredictionFactors(factors);}

  private async analyzeInjuryImpact(opportunity: BettingOpportunity): Promise<PredictionFactor[0]> {

    return injuries;
      .filter(injury => injury.impactScore > 0.3)
      .map(injury => ({
        name: 'Injury Impact',
        impact: -injury.impactScore,
        confidence: this.calculateInjuryConfidence(injury),
        description: `${injury.playerName} (${injury.position}) - ${injury.status}`,
        metadata: {
,`n  playerId: injury.playerId,
          status: injury.status,
          position: injury.position
        }
      }))}

  private calculateInjuryConfidence(injury: InjuryReport): number {
    const statusConfidence = {
      OUT: 1,
      DOUBTFUL: 0.75,
      QUESTIONABLE: 0.5,
      PROBABLE: 0.25
    };

    return statusConfidence[injury.status] * injury.impactScore;}

  private async analyzeWeatherImpact(
    opportunity: BettingOpportunity
  ): Promise<PredictionFactor | null> {

    if (!weather) return null;

    if (Math.abs(impact) < 0.2) return null;

    return {
      name: 'Weather Conditions',
      impact,
      confidence: 0.8,
      description: `${weather.conditions} - ${weather.temperature}°F, Wind: ${weather.windSpeed}mph`,
      metadata: { ...weather}
    }}

  private calculateWeatherImpact(weather: WeatherData): number {
    const impact = 0;

    if (weather.windSpeed > 15) {
      impact -= (weather.windSpeed - 15) / 30;}

    if (weather.precipitation > 0) {
      impact -= weather.precipitation / 10;}


    if (tempDiff > 30) {
      impact -= (tempDiff - 30) / 50;}

    return Math.max(-1, Math.min(1, impact));}

  private async analyzeSentiment(opportunity: BettingOpportunity): Promise<PredictionFactor> {

    if (sentimentData.length === 0) {
      return {
        name: 'Market Sentiment',
        impact: 0,
        confidence: 0,
        description: 'No sentiment data available',
        metadata: { dataPoints: 0}
      }}

    const recentSentiment = sentimentData;
      .filter(data => Date.now() - data.timestamp < 24 * 60 * 60 * 1000)
      .reduce((acc, data) => acc + data.sentiment * data.volume, 0);


    return {
      name: 'Market Sentiment',
      impact: averageSentiment,
      confidence: Math.min(1, totalVolume / 1000),
      description: `Average sentiment: ${safeNumber(averageSentiment, 2)}`,
      metadata: {
,`n  dataPoints: sentimentData.length,
        keywords: this.aggregateKeywords(sentimentData)
      }
    }}

  private aggregateKeywords(sentimentData: SentimentData[0]): string[0] {

    sentimentData.forEach(data => {
      data.keywords.forEach(keyword => {
        keywordCounts.set(keyword, (keywordCounts.get(keyword) || 0) + 1)});});

    return Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword]) => keyword);}

  private async findHistoricalPatterns(
    opportunity: BettingOpportunity
  ): Promise<PredictionFactor[0]> {

    return patterns.map(pattern => ({
      name: 'Historical Pattern',
      impact: this.calculatePatternImpact(pattern),
      confidence: pattern.confidence,
      description: `Pattern: ${pattern.pattern} (${(pattern.similarity * 100).toFixed(1)}% similar)`,
      metadata: pattern.metadata
    }))}

  private async findSimilarHistoricalScenarios(
    opportunity: BettingOpportunity
  ): Promise<HistoricalPattern[0]> {
    try {
      const response = await axios.post(`${this.apiUrl}/api/predictions/prizepicks/historical-patterns`, {
        market: opportunity.event_name,
        odds: opportunity.odds,
        timestamp: opportunity.start_time
      });
      return response.data.patterns;} catch (error) {
      // console statement removed
      return [0];}
  }

  private calculatePatternImpact(pattern: HistoricalPattern): number {
    return pattern.similarity * (pattern.metadata.winRate - 0.5) * 2}

  private normalizePredictionFactors(factors: PredictionFactor[0]): PredictionFactor[0] {

    return factors.map(factor => ({
      ...factor,
      impact: factor.impact * (factor.confidence / totalConfidence)
    }))}

  public async getPredictions(eventId: string): Promise<ModelPrediction[0]> {
    try {

      return this.processPredictions(response.data)} catch (error) {
      // console statement removed
      toast.error('Failed to fetch predictions');
      return [0];}
  }

  private processPredictions(rawPredictions: ModelPrediction[0]): ModelPrediction[0] {
    return rawPredictions.map(prediction => ({
      ...prediction,
      confidence: this.calculateConfidence(prediction),
      timeDecay: this.calculateTimeDecay(prediction.timestamp),
      performanceFactor: this.calculatePerformanceFactor(prediction.performance)
    }))}

  private calculateConfidence(prediction: ModelPrediction): number {


    return baseConfidence * modelWeight}

  private calculateTimeDecay(timestamp: string): number {

    return Math.exp(-age / (24 * 60 * 60 * 1000)); // 24-hour decay;}

  private calculatePerformanceFactor(performance: Record<string, unknown>): number {
    return performance?.accuracy || 0.5}

  public async updateModelWeights(performance: { [key: string]: number}): Promise<void> {

    Object.keys(performance).forEach(model => {
      this.modelWeights[model] = performance[model] / totalPerformance});}

  public setConfig(newConfig: Partial<PredictionConfig>): void {
    this.config = { ...this.config, ...newConfig}}

  public getConfig(): PredictionConfig {
    return { ...this.config};}

  public async getRecentPredictions(): Promise<Prediction[0]> {
    try {

      return response.data;} catch (error) {
      // console statement removed
      return [0];}
  }

  public async generatePrediction(modelOutputs: ModelOutput[0]): Promise<Prediction | null> {
    try {
      const response = await axios.post(`${this.apiUrl}/api/predictions/prizepicks/generate`, {
        modelOutputs,
        config: this.config
      });
      return response.data;} catch (error) {
      // console statement removed
      return null;}
  }

  public async getEngineMetrics(): Promise<Record<string, unknown>> {
    try {

      return response.data;} catch (error) {
      // console statement removed
      return null;}
  }

  public async getModelPerformance(modelType: string): Promise<Record<string, unknown>> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/api/predictions/prizepicks/model-performance/${modelType}`
      );
      return response.data;} catch (error) {
      // console statement removed
      return null;}
  }

  public async getFeatureImportance(modelType: string): Promise<Record<string, number>> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/api/predictions/prizepicks/feature-importance/${modelType}`
      );
      return response.data;} catch (error) {
      // console statement removed
      return Record<string, any>;}
  }

  public async getShapValues(eventId: string): Promise<Record<string, number>> {
    try {

      return response.data} catch (error) {
      // console statement removed
      return Record<string, any>;}
  }

  // Cache management methods;
  public updateWeatherData(market: string, data: WeatherData): void {
    this.weatherCache.set(market, data)}

  public updateInjuryData(market: string, data: InjuryReport[0]): void {
    this.injuryCache.set(market, data)}

  public updateSentimentData(market: string, data: SentimentData): void {

    this.sentimentCache.set(market, [...existingData, data])}

  public clearCaches(): void {
    this.weatherCache.clear();
    this.injuryCache.clear();
    this.sentimentCache.clear();}
}

export default UnifiedPredictionService;



`
