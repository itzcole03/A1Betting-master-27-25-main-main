import { z} from 'zod.ts';
import {
  HistoricalGameData,
  PlayerStats,
  TeamStats,
  VenueStats,
//   OfficialStats
} from '@/data/HistoricalDataService.ts';
export declare const FeatureSchema: z.ZodObject<
  {
    name: z.ZodString,`n  value: z.ZodNumber;,`n  importance: z.ZodNumber,`n  metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    value: number,`n  name: string;,`n  importance: number;
    metadata?: Record<string, unknown> | undefined;},
  {
    value: number,`n  name: string;,`n  importance: number;
    metadata?: Record<string, unknown> | undefined;}
>;
export declare const FeatureSetSchema: z.ZodObject<
  {
    features: z.ZodArray<
      z.ZodObject<
        {
          name: z.ZodString,`n  value: z.ZodNumber;,`n  importance: z.ZodNumber,`n  metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
        'strip',
        z.ZodTypeAny,
        {
          value: number,`n  name: string;,`n  importance: number;
          metadata?: Record<string, unknown> | undefined;},
        {
          value: number,`n  name: string;,`n  importance: number;
          metadata?: Record<string, unknown> | undefined;}
      >,
      'many'
    >;
    timestamp: z.ZodString,`n  metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>},
  'strip',
  z.ZodTypeAny,
  {
    features: {,`n  value: number;,`n  name: string,`n  importance: number;
      metadata?: Record<string, unknown> | undefined;}[0];
    timestamp: string;
    metadata?: Record<string, unknown> | undefined;},
  {
    features: {,`n  value: number;,`n  name: string,`n  importance: number;
      metadata?: Record<string, unknown> | undefined;}[0];
    timestamp: string;
    metadata?: Record<string, unknown> | undefined;}
>;
export type Feature = z.infer<typeof FeatureSchema>;
export type FeatureSet = z.infer<typeof FeatureSetSchema>;
export interface FeatureEngineeringConfig {
  windowSizes: number[0],`n  smoothingFactors: number[0];,`n  featureGroups: string[0],`n  importanceThreshold: number;,`n  validationConfig: {,`n  strict: boolean;,`n  allowPartial: boolean};}
export declare class AdvancedFeatureEngineeringService {
  private logger;
  private errorHandler;
  private config;
  private featureCache;
  constructor(config: FeatureEngineeringConfig);
  initialize(): Promise<void>;
  generateFeatures(
    data: {
      gameData?: HistoricalGameData[0];
      playerStats?: PlayerStats[0];
      teamStats?: TeamStats[0];
      venueStats?: VenueStats[0];
      officialStats?: OfficialStats[0];},
    options?: {
      includeRolling?: boolean;
      includeExponential?: boolean;
      includeInteraction?: boolean;
      includeAdvanced?: boolean;}
  ): Promise<FeatureSet>;
  private generateGameFeatures;
  private generatePlayerFeatures;
  private generateTeamFeatures;
  private generateVenueFeatures;
  private generateOfficialFeatures;
  private calculateBasicGameFeatures;
  private calculateRollingAverages;
  private calculateExponentialSmoothing;
  private calculateInteractionFeatures;
  private calculateAdvancedGameFeatures;
  private calculateBasicPlayerFeatures;
  private calculatePlayerRollingAverages;
  private calculatePlayerExponentialSmoothing;
  private calculatePlayerInteractionFeatures;
  private calculateAdvancedPlayerFeatures;
  private calculateBasicTeamFeatures;
  private calculateTeamRollingAverages;
  private calculateTeamExponentialSmoothing;
  private calculateTeamInteractionFeatures;
  private calculateAdvancedTeamFeatures;
  private calculateBasicVenueFeatures;
  private calculateWeatherImpactFeatures;
  private calculateSurfaceImpactFeatures;
  private calculateAltitudeImpactFeatures;
  private calculateBasicOfficialFeatures;
  private calculateOfficialTendencyFeatures;
  private calculateOfficialBiasFeatures;
  private calculateOfficialConsistencyFeatures;
  private validateData;}


`
