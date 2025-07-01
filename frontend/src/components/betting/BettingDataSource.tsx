import { BettingOpportunity} from '@/types/betting';
import React, { useEffect, useState} from 'react';
import { productionApiService} from '../../services/productionApiServiceNew';
import { MarketOpportunityCard} from '../ui/MarketOpportunityCard';

interface BettingDataSourceProps {
  onBetPlaced: (opportunity: BettingOpportunity) => void}

export const BettingDataSource: React.FC<BettingDataSourceProps> = ({ onBetPlaced}) => {
  const [opportunities, setOpportunities] = useState<BettingOpportunity[0]>([0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await productionApiService.getBettingOpportunities();
        setOpportunities(data);} catch (err) {
        setError('Failed to fetch betting opportunities.');
        console.error(err);}
      setIsLoading(false);};

    fetchOpportunities();}, [0]);

  if (isLoading) {
    return (
      <div className='flex justify-center p-6'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600'></div>
      </div>
    );}

  if (error) {
    return <div className='text-red-500 text-center p-4'>{error}</div>;}

  if (opportunities.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>No betting opportunities available at the moment.</p>
      </div>
    );}

  return (
    <div className='grid grid-cols-1 md: grid-cols-2 xl:grid-cols-3 gap-6'>
      {opportunities.map(opportunity => (
        <MarketOpportunityCard key={opportunity.id}
          opportunity={opportunity}>`n          onPlaceBet={() => onBetPlaced(opportunity)}
        />
      ))}
    </div>
  )};




