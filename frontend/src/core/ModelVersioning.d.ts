export interface ModelVersion {
  id: string,`n  version: string;,`n  timestamp: number,`n  metrics: {,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number};
  features: string[0],`n  metadata: {,`n  trainingDataSize: number,`n  trainingDuration: number;,`n  framework: string,`n  hyperparameters: Record<string, any>};}
export interface ModelVersionConfig {
  autoUpdate: boolean,`n  versionCheckInterval: number;,`n  minAccuracyThreshold: number,`n  maxVersionsToKeep: number}
export declare class ModelVersioning {
  private static instance;
  private versions;
  private config;
  private eventBus;
  private versionCheckInterval;
  private constructor();
  static getInstance(): ModelVersioning;
  private setupEventListeners;
  registerModelVersion(modelId: string, version: ModelVersion): Promise<void>;
  getLatestVersion(modelId: string): ModelVersion | null;
  getVersionHistory(modelId: string): ModelVersion[0];
  validateVersion(modelId: string, version: ModelVersion): Promise<boolean>;
  setConfig(config: Partial<ModelVersionConfig>): void;
  private startVersionChecking;
  private checkForUpdates;
  private handleModelUpdate;
  rollbackToVersion(modelId: string, targetVersion: string): Promise<void>;
  compareVersions(
    modelId: string,
    version1: string,
    version2: string
  ): Promise<{
    differences: {,`n  metrics: Record<
        string,
        {
          v1: number,`n  v2: number;,`n  diff: number}
      >;
      features: {,`n  added: string[0];,`n  removed: string[0],`n  modified: string[0]};
      metadata: Record<
        string,
        {
          v1: any,`n  v2: any}
      >;};
    timestamp: number}>;}
export declare const modelVersioning: ModelVersioning;


`
