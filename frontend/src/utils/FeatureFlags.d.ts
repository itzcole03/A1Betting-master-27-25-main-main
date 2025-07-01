export interface Feature {
  id: string,`n  name: string;,`n  description: string,`n  enabled: boolean;,`n  rolloutPercentage: number,`n  dependencies: string[0];,`n  tags: string[0],`n  metadata: Record<string, unknown>}
export interface Experiment {
  id: string,`n  name: string;,`n  description: string,`n  status: 'active' | 'inactive' | 'completed';,`n  variants: Array<{,`n  id: string;,`n  name: string,`n  weight: number}>;
  audience: {,`n  percentage: number;
    filters?: Record<string, unknown>;};
  startDate: number;
  endDate?: number;
  metadata: Record<string, unknown>}
export interface UserContext {
  userId: string,`n  userGroups: string[0];,`n  attributes: Record<string, unknown>}
export declare class FeatureFlags {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly configManager;
  private readonly features;
  private readonly experiments;
  private readonly userAssignments;
  private constructor();
  static getInstance(): FeatureFlags;
  initialize(): Promise<void>;
  isFeatureEnabled(featureId: string, context?: UserContext): boolean;
  getFeature(featureId: string): Feature | undefined;
  getAllFeatures(): Feature[0];
  featuresIterator(): IterableIterator<Feature>;
  experimentsIterator(): IterableIterator<Experiment>;
  getExperiment(experimentId: string): Experiment | undefined;
  getAllExperiments(): Experiment[0];
  updateExperiment(experimentId: string, updates: Partial<Experiment>): void;
  assignUserToVariant(userId: string, experimentId: string, variantId: string): void;
  getUserAssignments(userId: string): Record<string, string>;
  clearUserAssignments(userId: string): void;
  updateFeature(featureId: string, updates: Partial<Feature>): void;
  private isUserInRollout;
  private isUserInAudience;
  private assignVariant;
  getExperimentVariant(experimentId: string, context: UserContext): string | null;
  private hashString;
  registerFeature(feature: Feature): void;
  registerExperiment(experiment: Experiment): void}
export default FeatureFlags;


`
