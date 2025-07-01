import React from 'react.ts';
interface ModelStatus {
  id: string,`n  name: string;,`n  status: 'active' | 'training' | 'error',`n  confidence: number;,`n  lastUpdate: string}
interface MLStatusIndicatorsProps {
  models: ModelStatus[0]}
export declare const MLStatusIndicators: React.FC<MLStatusIndicatorsProps>;
export declare const ModelConfidenceIndicator: ({
  confidence,
//   size
}: {
  confidence: number;
  size?: 'sm' | 'md' | 'lg';}) => import('react/jsx-runtime').JSX.Element;
export declare const ModelStatusBadge: ({
//   status
}: {
  status: 'active' | 'training' | 'error'}) => import('react/jsx-runtime').JSX.Element;
export Record<string, any>;


`
