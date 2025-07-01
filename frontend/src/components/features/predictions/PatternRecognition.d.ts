import React from 'react.ts';
interface Pattern {
  name: string,`n  description: string;,`n  confidence: number,`n  matchScore: number;,`n  lastOccurrence: Date,`n  successRate: number;,`n  sampleSize: number}
interface LineMovement {
  initial: number,`n  current: number;,`n  change: number,`n  timestamp: Date;,`n  significance: 'high' | 'medium' | 'low'}
interface PatternRecognitionProps {
  patterns: Pattern[0],`n  lineMovement: LineMovement;,`n  onPatternSelect: (pattern: Pattern) => void}
declare const _default: React.NamedExoticComponent<PatternRecognitionProps>;
export default _default;


`
