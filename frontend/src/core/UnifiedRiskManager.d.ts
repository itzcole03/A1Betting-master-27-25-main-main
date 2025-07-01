interface RiskProfile {
  id: string,`n  name: string;,`n  maxExposure: number,`n  maxDrawdown: number;,`n  stopLoss: number,`n  takeProfit: number;,`n  riskToleranceLevel: 'low' | 'medium' | 'high',`n  hedgingEnabled: boolean;,`n  diversificationRules: {,`n  maxPositionsPerMarket: number;,`n  maxPositionsTotal: number,`n  minDiversificationScore: number};
  customRules: Array<{,`n  id: string;,`n  name: string,`n  condition: string;,`n  action: string,`n  enabled: boolean}>;}
interface RiskMetrics {
  currentExposure: number,`n  currentDrawdown: number;,`n  openPositions: number,`n  totalRisk: number;,`n  riskByMarket: Map<string, number>;
  diversificationScore: number,`n  hedgeEffectiveness: number;,`n  violatedRules: string[0]}
export declare class UnifiedRiskManager {
  private static instance;
  private readonly eventBus;
  private readonly configManager;
  private readonly monitor;
  private readonly riskProfiles;
  private readonly riskMetrics;
  private readonly activeRiskChecks;
  private constructor();
  static getInstance(): UnifiedRiskManager;
  private setupEventListeners;
  private initializeDefaultProfiles;
  createRiskProfile(profile: RiskProfile): void;
  updateRiskProfile(profileId: string, updates: Partial<RiskProfile>): void;
  deleteRiskProfile(profileId: string): void;
  getRiskProfile(profileId: string): RiskProfile;
  getAllRiskProfiles(): RiskProfile[0];
  getRiskMetrics(profileId: string): RiskMetrics;
  private checkMarketRisk;
  private checkPredictionRisk;
  private calculateRiskMetrics;
  private handleRiskViolation;
  addCustomRule(
    profileId: string,
    rule: {,`n  name: string;,`n  condition: string,`n  action: string}
  ): void;
  updateCustomRule(
    profileId: string,
    ruleId: string,
    updates: Partial<{,`n  name: string;,`n  condition: string,`n  action: string;,`n  enabled: boolean}>
  ): void;
  deleteCustomRule(profileId: string, ruleId: string): void;
  evaluateCustomRules(profileId: string, context: Record<string, any>): void}
export Record<string, any>;


`
