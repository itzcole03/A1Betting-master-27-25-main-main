import React from 'react.ts';
export interface SmartControlsBarProps {
  investment: number,`n  onInvestmentChange: (v: number) => void,`n  strategy: string;,`n  onStrategyChange: (v: string) => void,`n  confidence: number;,`n  onConfidenceChange: (v: number) => void,`n  model: string;,`n  onModelChange: (v: string) => void,`n  dataQuality: number;,`n  onDataQualityChange: (v: number) => void,`n  patternStrength: number;,`n  onPatternStrengthChange: (v: number) => void;
  className?: string;}
export declare const SmartControlsBar: React.FC<SmartControlsBarProps>;
export default SmartControlsBar;


`
