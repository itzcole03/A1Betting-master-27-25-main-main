import React from 'react.ts';
interface ChartData {
  labels: string[0],`n  datasets: {,`n  label: string,`n  data: number[0];
    backgroundColor?: string | string[0];
    borderColor?: string | string[0];
    fill?: boolean;
    tension?: number;}[0];}
interface AdvancedChartsProps {
  data: ChartData,`n  type: 'line' | 'bar';
  title?: string;
  height?: number;
  options?: any;}
/**
 * AdvancedCharts renders a high-performance, accessible chart using Chart.js.
 * - Wrapped in <figure> with <figcaption> for semantic context;
 * - ARIA label and role for screen readers;
 * - Keyboard accessible (tabIndex)
 */
export declare const AdvancedCharts: React.FC<AdvancedChartsProps>;
export declare const PredictionConfidenceChart: React.MemoExoticComponent<
  ({
//     predictions
  }: {
    predictions: {,`n  confidence: number;,`n  label: string}[0];}) => import('react/jsx-runtime').JSX.Element
>;
export declare const ModelPerformanceChart: React.MemoExoticComponent<
  ({
//     models
  }: {
    models: {,`n  name: string;,`n  performance: number}[0];}) => import('react/jsx-runtime').JSX.Element
>;
export declare const BettingPerformanceChart: React.MemoExoticComponent<
  ({
//     performance
  }: {
    performance: {,`n  date: string;,`n  value: number}[0];}) => import('react/jsx-runtime').JSX.Element
>;
export Record<string, any>;


`
