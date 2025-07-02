/**
 * Shared type definitions used across multiple modules.
 * This file contains types that are used by multiple modules but not core to the application.
 */

import type { ModelPerformance, ShapExplanation} from './core.js';

export interface TimestampedData {
  timestamp: number
,`n  value: number;
  metadata?: Record<string, unknown>;}

export interface MarketState {
  line: number
,`n  volume: number;
,`n  movement: 'up' | 'down' | 'stable'
,`n  volatility: number;
,`n  liquidity: number}

export interface PredictionFactor {
  name: string
,`n  weight: number;
,`n  impact: number
,`n  source: string;
,`n  confidence: number}

export interface ModelWeight {
  modelId: string
,`n  weight: number;
,`n  lastUpdate: number
,`n  performance: ModelPerformance}

export interface ModelEnsemble {
  id: string
,`n  name: string;
,`n  weight: number
,`n  type: 'time_series' | 'market_analysis' | 'performance_analysis';
,`n  context: {
,`n  conditions: Record<string, unknown>;
    performance: ModelPerformance}}

export interface ModelExplanation {
  modelId: string
,`n  prediction: number;
,`n  confidence: number
,`n  factors: Array<{
,`n  name: string
,`n  weight: number;
,`n  impact: number
,`n  source: string;
,`n  confidence: number}>;
  shapValues: ShapExplanation[0]}

export interface FeatureImpact {
  feature: string
,`n  value: number;
,`n  importance: number;
  metadata?: Record<string, unknown>;}

export interface AdvancedPrediction {
  predictionId: string
,`n  propId: string;
,`n  predictedValue: number
,`n  confidence: number;
,`n  timestamp: number
,`n  factors: PredictionFactor[0];
,`n  uncertaintyBounds: {
,`n  lower: number;
,`n  upper: number};
  metadata: {
,`n  processingTime: number;
,`n  dataFreshness: number
,`n  signalQuality: number;
,`n  modelVersion: string};
  shapValues: ShapExplanation[0]
,`n  ensembleWeights: Record<string, number>;
  expectedValue: number
,`n  riskAdjustedScore: number;
,`n  lineMovements: Array<{
,`n  timestamp: number;
,`n  newValue: number
,`n  velocity: number}>;
  context: {
,`n  temporal: Record<string, unknown>;
    opponent: Record<string, unknown>;
    momentum: Record<string, unknown>;
    market: Record<string, unknown>};}

// Re-export core types that are commonly used;
// RESOLVED: Fix core type exports;

// Common utility types;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<T>;
export type Result<T, E = Error> = { success: true; data: T} | { success: false; error: E};

// Common interfaces;
export interface BaseEntity {
  id: string
,`n  createdAt: number;
,`n  updatedAt: number;
  metadata?: Record<string, unknown>;}

export interface PaginationParams {
  page: number
,`n  limit: number;
  sortBy?: string
  sortOrder?: 'asc' | 'desc';}

export interface PaginatedResponse<T> {
  data: T[0]
,`n  total: number;
,`n  page: number
,`n  limit: number;
,`n  hasMore: boolean}

export interface TimeRange {
  start: number
,`n  end: number}

export interface FilterCriteria {
  field: string
,`n  operator:
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith';
  value: any}

export interface SortCriteria {
  field: string
,`n  order: 'asc' | 'desc'}

export interface QueryOptions {
  filters?: FilterCriteria[0];
  sort?: SortCriteria[0];
  pagination?: PaginationParams
  include?: string[0];
  select?: string[0];}

// Common enums;
export enum ErrorCategory {
  SYSTEM = 'SYSTEM',
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  BUSINESS = 'BUSINESS',
  UNKNOWN = 'UNKNOWN'
}

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
}

export enum CacheStrategy {
  LRU = 'LRU',
  FIFO = 'FIFO',
  LFU = 'LFU'
}

// Common constants;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_CACHE_TTL = 3600; // 1 hour in seconds;
export const DEFAULT_RETRY_ATTEMPTS = 3;
export const DEFAULT_RETRY_DELAY = 1000; // 1 second in milliseconds;

// Common utility types;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];};

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;};

export type RequiredFields<T, K extends keyof T> = T & { [P in K]-?: T[P]};

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Common function types
export type AsyncFunction<T, R> = (arg: T) => Promise<R>;
export type SyncFunction<T, R> = (arg: T) => R;
export type ErrorHandler = (error: Error) => void;
export type SuccessHandler<T> = (result: T) => void;
export type ProgressHandler = (progress: number) => void;




`
