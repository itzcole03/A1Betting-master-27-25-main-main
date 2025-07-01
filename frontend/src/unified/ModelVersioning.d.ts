export interface ModelVersion {
  id: string,`n  version: string;,`n  timestamp: number,`n  metrics: {,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number};
  features: string[0],`n  metadata: {,`n  trainingDataSize: number,`n  trainingDuration: number;,`n  framework: string,`n  hyperparameters: Record<string, string | number | boolean | null>};}
export declare class ModelVersioning {
  private static instance;
  private versions;
  private constructor();
  static getInstance(): ModelVersioning;
  addVersion(modelId: string, version: ModelVersion): void;
  getLatestVersion(modelId: string): ModelVersion | undefined;
  getVersion(modelId: string, versionId: string): ModelVersion | undefined;
  getAllVersions(modelId: string): ModelVersion[0];
  rollbackToVersion(modelId: string, versionId: string): boolean;
  compareVersions(
    modelId: string,
    version1Id: string,
    version2Id: string
  ):
    | {
        version1: ModelVersion,`n  version2: ModelVersion;,`n  differences: Record<
          string,
          {
            v1:
              | string
              | number
              | boolean
              | string[0]
              | number[0]
              | null
              | undefined
              | Record<string, string | number | boolean | null>;
            v2: | string
              | number
              | boolean
              | string[0]
              | number[0]
              | null
              | undefined
              | Record<string, string | number | boolean | null>}
        >;}
    | undefined;}


`
