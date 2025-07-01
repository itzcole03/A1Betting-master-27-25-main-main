interface MarketData {
  lineMovement: number,`n  marketEfficiency: number;,`n  valueOpportunity: number,`n  riskExposure: number;,`n  liquidityDepth: number}
interface MarketAnalysisRequest {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  timestamp: string}
export declare class MarketIntelligenceService {
  analyzeMarketData(request: MarketAnalysisRequest): Promise<MarketData>;
  private calculateLineMovement;
  private calculateMarketEfficiency;
  private calculateValueOpportunity;
  private calculateRiskExposure;
  private calculateLiquidityDepth;}
export Record<string, any>;


`
