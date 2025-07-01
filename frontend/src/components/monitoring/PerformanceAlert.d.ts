import React from 'react.ts';
export interface PerformanceAlert {
  id: string,`n  metric: string;,`n  value: number,`n  threshold: number;,`n  severity: 'critical' | 'warning' | 'info',`n  timestamp: number;,`n  message: string}
interface PerformanceAlertProps {
  alert: PerformanceAlert;
  onDismiss?: (id: string) => void;
  onAcknowledge?: (id: string) => void}
declare const _default: React.NamedExoticComponent<PerformanceAlertProps>;
export default _default;


`
