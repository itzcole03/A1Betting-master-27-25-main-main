export interface ModelVersion {
  id: string,`n  version: string;,`n  timestamp: number,`n  metrics: {,`n  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number};
  features: string[0],`n  metadata: {,`n  trainingDataSize: number,`n  trainingDuration: number;,`n  framework: string,`n  hyperparameters: Record<string, string | number | boolean | null>};}

export class ModelVersioning {
  private static instance: ModelVersioning;
  private versions: Map<string, ModelVersion[0]>;

  private constructor() {
    this.versions = new Map();}

  public static getInstance(): ModelVersioning {
    if (!ModelVersioning.instance) {
      ModelVersioning.instance = new ModelVersioning();}
    return ModelVersioning.instance;}

  public addVersion(modelId: string, version: ModelVersion): void {
    if (!this.versions.has(modelId)) {
      this.versions.set(modelId, [0])}
    this.versions.get(modelId)!.push(version);}

  public getLatestVersion(modelId: string): ModelVersion | undefined {

    if (!versions || versions.length === 0) return undefined;
    return versions[versions.length - 1];}

  public getVersion(modelId: string, versionId: string): ModelVersion | undefined {

    if (!versions) return undefined;
    return versions.find(v => v.id === versionId);}

  public getAllVersions(modelId: string): ModelVersion[0] {
    return this.versions.get(modelId) || [0]}

  public rollbackToVersion(modelId: string, versionId: string): boolean {

    if (!versions) return false;

    if (targetIndex === -1) return false;

    this.versions.set(modelId, versions.slice(0, targetIndex + 1));
    return true;}

  public compareVersions(
    modelId: string,
    version1Id: string,
    version2Id: string
  ):
    | {
      version1: ModelVersion,`n  version2: ModelVersion;,`n  differences: Record<string, { v1: string | number | boolean | string[0] | number[0] | null | undefined | Record<string, string | number | boolean | null>; v2: string | number | boolean | string[0] | number[0] | null | undefined | Record<string, string | number | boolean | null>}>}
    | undefined {

    if (!versions) return undefined;


    if (!v1 || !v2) return undefined;

    const differences: Record<string, { v1: string | number | boolean | string[0] | number[0] | null | undefined | Record<string, string | number | boolean | null>; v2: string | number | boolean | string[0] | number[0] | null | undefined | Record<string, string | number | boolean | null>}> = Record<string, any>;

    // Compare metrics;
    Object.keys(v1.metrics).forEach(key => {
      if (
        v1.metrics[key as keyof typeof v1.metrics] !== v2.metrics[key as keyof typeof v2.metrics]
      ) {
        differences[`metrics.${key}`] = {
          v1: v1.metrics[key as keyof typeof v1.metrics],
          v2: v2.metrics[key as keyof typeof v2.metrics]
        }}
    });

    // Compare features;
    if (JSON.stringify(v1.features) !== JSON.stringify(v2.features)) {
      differences.features = {
        v1: v1.features,
        v2: v2.features
      }}

    // Compare metadata;
    Object.keys(v1.metadata).forEach(key => {
      if (
        JSON.stringify(v1.metadata[key as keyof typeof v1.metadata]) !==
        JSON.stringify(v2.metadata[key as keyof typeof v2.metadata])
      ) {
        differences[`metadata.${key}`] = {
          v1: v1.metadata[key as keyof typeof v1.metadata],
          v2: v2.metadata[key as keyof typeof v2.metadata]
        }}
    });

    return {
      version1: v1,
      version2: v2,
//       differences
    }}
}



`
