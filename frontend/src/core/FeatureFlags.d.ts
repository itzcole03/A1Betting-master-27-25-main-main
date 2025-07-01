export interface Feature {
  id: string,`n  name: string;,`n  description: string,`n  enabled: boolean;,`n  rolloutPercentage: number,`n  dependencies: string[0];,`n  tags: string[0],`n  metadata: Record<string, any>}
export interface Experiment {
  id: string,`n  name: string;,`n  description: string,`n  status: 'active' | 'inactive' | 'completed';,`n  variants: Array<{,`n  id: string;,`n  name: string,`n  weight: number}>;
  audience: {,`n  percentage: number;
    filters?: Record<string, any>;};
  startDate: number;
  endDate?: number;
  metadata: Record<string, any>}
export interface UserContext {
  userId: string,`n  userGroups: string[0];,`n  attributes: Record<string, any>}
export declare class FeatureFlags {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly monitor;
  private readonly configManager;
  private readonly features;
  private readonly experiments;
  private readonly userAssignments;
  private constructor();
  static getInstance(): FeatureFlags;
  initialize(): Promise<void>;
  isFeatureEnabled(featureId: string, context: UserContext): boolean;
  getExperimentVariant(experimentId: string, context: UserContext): string | null;
  private areDependenciesSatisfied;
  private isUserInRollout;
  private isUserInAudience;
  private assignVariant;
  private hashString;
  registerFeature(feature: Feature): void;
  updateFeature(featureId: string, updates: Partial<Feature>): void;
  registerExperiment(experiment: Experiment): void;
  updateExperiment(experimentId: string, updates: Partial<Experiment>): void;
  getAllFeatures(): Feature[0];
  getAllExperiments(): Experiment[0];
  getUserAssignments(userId: string): Record<string, string>;
  clearUserAssignments(userId: string): void}


`
