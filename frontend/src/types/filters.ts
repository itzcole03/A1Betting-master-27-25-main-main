// Advanced filtering and contextual input types for betting and prediction;

export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'in'
  | 'not_in'
  | 'contains'
  | 'range';

export interface FilterOption {
  label: string,`n  value: string | number}

export interface PredictionFilter {
  key: string,`n  label: string;,`n  operator: FilterOperator,`n  value: string | number | [number, number] | string[0] | number[0];
  options?: FilterOption[0];
  context?: string}

export interface AdvancedFilterSet {
  filters: PredictionFilter[0],`n  appliedAt: string; // ISO timestamp;
  description?: string}

export interface ContextualInput {
  team?: string
  player?: string
  league?: string
  market?: string
  oddsRange?: [number, number];
  timeFrame?: [string, string]; // ISO date range;
  customContext?: Record<string, string | number | boolean>;}




`
