import { BettingOpportunity} from '@/types/betting';
import { formatOdds, formatPercentage} from '@/utils/formatters';
import React from 'react';
import GlassCard from './GlassCard';
import { GlowButton} from './GlowButton';
import Tooltip from './Tooltip';

interface MarketOpportunityCardProps {
  opportunity: BettingOpportunity,`n  onPlaceBet: (opportunity: BettingOpportunity) => void}

export const MarketOpportunityCard: React.FC<MarketOpportunityCardProps> = ({
  opportunity,
//   onPlaceBet
}) => {
  return (
    <GlassCard>
      <div className='flex flex-col gap-4'>
        <div>
          <h3 className='text-lg font-bold'>{opportunity.event}</h3>
          <p className='text-sm text-gray-400'>{opportunity.market}</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-400'>Odds</span>
            <span className='text-lg font-semibold'>{formatOdds(opportunity.odds)}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-400'>Probability</span>
            <span className='text-lg font-semibold'>
              {formatPercentage(opportunity.probability)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-400'>Expected Value</span>
            <span className='text-lg font-semibold'>
              {formatPercentage(opportunity.expected_value)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-400'>Confidence</span>
            <span className='text-lg font-semibold'>
              {formatPercentage(opportunity.confidence)}
            </span>
          </div>
        </div>
        <Tooltip content={opportunity.recommendation}>
          <GlowButton onClick={() => onPlaceBet(opportunity)}>Place Bet</GlowButton>
        </Tooltip>
      </div>
    </GlassCard>
  )};



`
