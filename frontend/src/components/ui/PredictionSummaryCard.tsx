import React, { useState } from 'react';
import GlassCard from './GlassCard';

// Simple Info icon component
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

// Simple tooltip component
const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex items-center justify-center"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded-md shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {content}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
};

/**
 * Props for the PredictionSummaryCard component;
 */
export interface PredictionSummaryProps {
  /** Model's prediction accuracy (0-100) */
  accuracy: number;
  /** Expected payout multiplier */
  payout: number;
  /** Kelly Criterion value (0-1) */
  kelly: number;
  /** Market edge percentage (can be negative) */
  marketEdge: number;
  /** Data quality score (0-100) */
  dataQuality: number;
  /** Name of the prediction model */
  modelName?: string;
  /** Confidence level (0-100) */
  confidence?: number;
  /** Additional CSS classes */
  className?: string;
  /** Last updated timestamp */
  lastUpdated?: Date;
  /** Risk level indicator */
  riskLevel?: 'low' | 'medium' | 'high';
  /** Callback when details button is clicked */
  onDetailsClick?: () => void;
  /** Callback when add to betslip is clicked */
  onAddToBetslip?: () => void;
  /** Whether the card is interactive */
  interactive?: boolean;
}

const getRiskLevelColor = (level?: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return 'bg-green-500/20 text-green-400';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'high':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export const PredictionSummaryCard: React.FC<PredictionSummaryProps> = (props) => {
  // Destructure props with defaults first;
  const {
    accuracy,
    payout,
    kelly,
    marketEdge,
    dataQuality,
    modelName,
    confidence,
    className = '',
    lastUpdated,
    riskLevel,
    onDetailsClick,
    onAddToBetslip,
    interactive = true,
  } = props;

  const formattedKelly = (kelly * 100).toFixed(2);
  const formattedMarketEdge = marketEdge.toFixed(2);
  const formattedAccuracy = accuracy.toFixed(2);

  const renderMetric = (label: string, value: string, tooltip: string, colorClass: string) => (
    <div className="flex flex-col items-center">
      <Tooltip content={tooltip}>
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </Tooltip>
    </div>
  );

  return (
    <GlassCard className={`relative overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-white">Prediction Summary</h3>
            {modelName && <p className="text-xs text-gray-400">Model: {modelName}</p>}
          </div>
          {riskLevel && (
            <div className={`px-2 py-1 text-xs rounded-full ${getRiskLevelColor(riskLevel)}`}>
              {riskLevel.toUpperCase()} RISK
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 my-6 text-center">
          {renderMetric('Accuracy', `${formattedAccuracy}%`, 'Model prediction accuracy', 'text-green-400')}
          {renderMetric('Payout', `${payout.toFixed(2)}x`, 'Expected payout multiplier', 'text-blue-400')}
          {renderMetric('Kelly', `${formattedKelly}%`, 'Optimal bet size percentage', 'text-purple-400')}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Market Edge</span>
            <span className={marketEdge > 0 ? 'text-green-400' : 'text-red-400'}>{formattedMarketEdge}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(marketEdge + 10) * 5}%` }}></div>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Data Quality</span>
            <span className="text-yellow-400">{dataQuality.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${dataQuality}%` }}></div>
          </div>
        </div>

        {confidence && (
          <div className="space-y-3 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Confidence</span>
              <span className="text-teal-400">{confidence.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${confidence}%` }}></div>
            </div>
          </div>
        )}

        {interactive && (
          <div className="mt-6 flex space-x-4">
            <button
              onClick={onAddToBetslip}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Add to Betslip
            </button>
            <button
              onClick={onDetailsClick}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              <InfoIcon /> Details
            </button>
          </div>
        )}
      </div>
      {lastUpdated && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 px-4 py-1 text-center text-xs text-gray-400">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}
    </GlassCard>
  );
};

export default PredictionSummaryCard;
