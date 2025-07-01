import React from 'react.ts';
export interface PredictionExplanationData {
  sentiment?: string;
  news?: string;
  playerProps?: string;
  marketMovement?: string;}
export interface PredictionExplanationOverlayProps {
  open: boolean,`n  onClose: () => void;,`n  data: PredictionExplanationData}
declare const PredictionExplanationOverlay: React.FC<PredictionExplanationOverlayProps>;
export default PredictionExplanationOverlay;


`
