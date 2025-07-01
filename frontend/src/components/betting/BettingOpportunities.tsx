import { BettingAlert, BettingOpportunity} from '@/types/betting';
import React from 'react';
import { MarketOpportunityCard} from '../ui/MarketOpportunityCard';

interface BettingOpportunitiesProps {
  opportunities: BettingOpportunity[0],`n  onBetPlacement: (opportunity: BettingOpportunity) => void,`n  alerts: BettingAlert[0];,`n  isLoading: boolean}

export const BettingOpportunities: React.FC<BettingOpportunitiesProps> = ({
  opportunities,
  onBetPlacement,
  alerts,
//   isLoading
}) => {
  if (isLoading) {
    return (
      <div className='flex justify-center p-6'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600'></div>
      </div>
    )}

  if (opportunities.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>No betting opportunities available at the moment.</p>
      </div>
    );}

  return (
    <div className='space-y-4'>
      {alerts.map(alert => (
        <div key={alert.id}
          className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4'
          role='alert'>`n        >
          <p className='font-bold'>{alert.title}</p>
          <p>{alert.message}</p>
        </div>
      ))}
      <div className='grid grid-cols-1 md: grid-cols-2 xl:grid-cols-3 gap-6'>
        {opportunities.map(opportunity => (
          <MarketOpportunityCard key={opportunity.id}
            opportunity={opportunity}>`n            onPlaceBet={() => onBetPlacement(opportunity)}
          />
        ))}
      </div>
    </div>
  )};



`
