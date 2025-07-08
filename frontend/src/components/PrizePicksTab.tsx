import React from 'react';
import { PrizePicksProUnified } from './PrizePicksProUnified';

/**
 * PrizePicksTab Component
 *
 * Unified PrizePicks Pro and Lineup Builder interface for the main dashboard.
 * Combines all PrizePicks functionality into a single comprehensive tab.
 */
const PrizePicksTab: React.FC = () => {
  const handleLineupGenerated = (lineup: any) => {
    console.log('Lineup optimized:', lineup);
    // Could add toast notification here
  };

  const handleBetPlaced = (lineup: any) => {
    console.log('Bet placed:', lineup);
    // In production, this would submit to PrizePicks API
    alert(`Bet placed! Expected payout: ${lineup.expected_payout.toFixed(2)}x`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
      <PrizePicksProUnified
        variant='cyber'
        maxSelections={6}
        enableMLPredictions={true}
        enableShapExplanations={true}
        enableKellyOptimization={true}
        enableCorrelationAnalysis={true}
        autoRefresh={true}
        refreshInterval={30000}
        onLineupGenerated={handleLineupGenerated}
        onBetPlaced={handleBetPlaced}
      />
    </div>
  );
};

export default PrizePicksTab;
