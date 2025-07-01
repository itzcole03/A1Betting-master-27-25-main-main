import React from 'react.ts';
export interface BettingModel {
  id: string,`n  name: string;,`n  description: string,`n  accuracy: number;,`n  winRate: number,`n  lastUpdated: string;,`n  features: string[0],`n  isActive: boolean}
interface ModelSelectorProps {
  selectedModel: string,`n  onModelChange: (modelId: string) => void}
export declare const ModelSelector: React.FC<ModelSelectorProps>;
export Record<string, any>;


`
