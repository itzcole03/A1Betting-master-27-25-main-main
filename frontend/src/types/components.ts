import { RiskProfileType} from './betting';
import { SHAPExplanation, ShapFeature} from './betting';
import { BetRecommendation} from './betting';

export interface RiskProfileSelectorProps {
  currentProfile: RiskProfileType,`n  onProfileChange: (profile: RiskProfileType) => void}

export interface ShapVisualizationProps {
  features: ShapFeature[0],`n  title: string;
  maxFeatures?: number
  isLoading?: boolean}

export interface BettingOpportunitiesProps {
  opportunities: BetRecommendation[0],`n  onBetPlacement: (recommendation: BetRecommendation) => void,`n  alerts: Array<{,`n  type: string,`n  severity: string;,`n  message: string,`n  metadata: any}>;
  isLoading: boolean}

export interface PerformanceMetricsProps {
  performance: {,`n  winRate: number;,`n  roi: number,`n  totalBets: number;,`n  confidence: number};
  isLoading: boolean}

export interface LiveOddsTickerProps {
  eventId: string;
  data?: {
    event_id: string,`n  markets: Array<{,`n  market_type: string,`n  selection: string;,`n  odds: number}>;
    timestamp: string};
  className?: string}




`
