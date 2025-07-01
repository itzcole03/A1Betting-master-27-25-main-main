import { AdvancedPrediction} from '@/types/prediction.ts';
import { MarketContext, BettingContext} from '@/types/core.ts';
import { ShapExplanation} from '@/types/ml.ts';
export declare class AdvancedEnsemble {
  private static instance;
  private readonly MIN_WEIGHT;
  private readonly MAX_WEIGHT;
  private readonly UNCERTAINTY_THRESHOLD;
  private constructor();
  static getInstance(): AdvancedEnsemble;
  calculateDynamicWeights(
    predictions: Array<{,`n  value: number;,`n  confidence: number,`n  weight: number;,`n  metadata: Record<string, any>}>,
    marketContext: MarketContext,
    bettingContext: BettingContext
  ): number[0];
  private calculateConfidenceAdjustments;
  private calculateMarketFactors;
  private calculateBettingFactors;
  private calculateMarketAdjustments;
  private calculateBettingAdjustments;
  private normalizeWeight;
  private normalizeWeights;
  private calculateLiquidityScore;
  private calculateVolatilityScore;
  private calculateMarketEfficiency;
  private calculateRiskScore;
  private calculateValueScore;
  private calculateEdgeScore;
  private calculatePriceVolatility;
  private calculateOddsValue;
  calculateUncertainty(
    predictions: Array<{,`n  value: number;,`n  confidence: number,`n  weight: number;,`n  metadata: Record<string, any>}>,
    weights: number[0]
  ): {
    lower: number,`n  upper: number};
  private calculateVariance;
  generateShapExplanations(
    prediction: AdvancedPrediction,
    marketContext: MarketContext,
    bettingContext: BettingContext
  ): ShapExplanation[0];
  private calculateMarketImpact;
  private calculateBettingContextImpact;
  private calculateEnsembleWeightImpact;
  private calculateFeatureImportance;
  private calculateConfidence;
  private calculateDataQualityFactor;}


`
