import React from 'react.ts';
interface FeatureInsightsProps {
  features: {,`n  name: string;,`n  importance: number,`n  correlation: number;,`n  entropy: number,`n  uniqueness: number;,`n  missing: number,`n  stats: {,`n  mean: number,`n  std: number;,`n  min: number,`n  max: number;,`n  q25: number,`n  q50: number;,`n  q75: number};}[0];
  interactions: {,`n  feature1: string;,`n  feature2: string,`n  strength: number;,`n  type: 'linear' | 'nonlinear' | 'categorical'}[0];
  embeddings: {,`n  feature: string;,`n  vector: number[0]}[0];
  signals: {,`n  source: string;,`n  features: {,`n  name: string;,`n  value: number,`n  impact: number}[0];}[0];
  eventId?: string;
  modelType?: string;}
declare const _default: React.NamedExoticComponent<FeatureInsightsProps>;
export default _default;


`
