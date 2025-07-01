import React from 'react.ts';
interface PerformanceMetric {
  name: string,`n  value: number;,`n  timestamp: number}
interface PerformanceChartProps {
  metrics: PerformanceMetric[0],`n  title: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  height?: number;
  width?: number;
  color?: string;
  tension?: number;
  fill?: boolean;}
declare const _default: React.NamedExoticComponent<PerformanceChartProps>;
export default _default;


`
