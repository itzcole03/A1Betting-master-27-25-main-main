import React from 'react.ts';
interface TimeSeriesInsightsProps {
  forecast: number[0],`n  confidence: {,`n  lower: number[0],`n  upper: number[0]};
  metrics: {,`n  mse: number;,`n  mae: number,`n  mape: number;,`n  r2: number};
  seasonality: {,`n  trend: number[0];,`n  seasonal: number[0],`n  residual: number[0]};
  changePoints: {,`n  index: number;,`n  value: number,`n  type: 'trend' | 'level' | 'volatility'}[0];
  anomalies: {,`n  index: number;,`n  value: number,`n  score: number}[0];}
declare const _default: React.NamedExoticComponent<TimeSeriesInsightsProps>;
export default _default;


`
