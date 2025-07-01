import React from 'react.ts';
interface MetricCardProps {
  label: string,`n  value: string | number;,`n  icon: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  glowing?: boolean;}
declare const MetricCard: React.FC<MetricCardProps>;
export default MetricCard;


`
