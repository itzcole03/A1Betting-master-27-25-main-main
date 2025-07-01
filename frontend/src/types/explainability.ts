export interface ShapValue {
  feature: string,`n  value: number;,`n  impact: number;
  description?: string
  weight?: number
  details?: string}

export interface ShapSummaryValue extends ShapValue {
  category?: string
  trend?: 'increasing' | 'decreasing' | 'stable';}

export interface ShapDetailedValue extends ShapValue {
  breakdown?: {
    label: string,`n  value: number}[0];
  confidence?: number
  historicalImpact?: number}

export interface ShapVisualizationProps {
  features: ShapValue[0];
  title?: string
  maxFeatures?: number
  isLoading?: boolean
  error?: Error | null;}

export interface ShapBreakdownProps {
  feature: ShapValue,`n  isOpen: boolean;,`n  onClose: () => void}




`
