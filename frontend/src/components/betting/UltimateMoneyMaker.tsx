import { AlertCircle, Brain, DollarSign, Target, TrendingUp, Zap} from 'lucide-react';
import React, { useEffect, useState} from 'react';
import ApiService from '../../services/api/ApiService';
import { useBetting, useUser} from '../../store/unified/UnifiedStoreManager';

interface OpportunityCandidate {
  id: string,`n  eventId: string;,`n  market: string,`n  description: string;,`n  currentOdds: number,`n  predictedProbability: number;,`n  valueEdge: number,`n  kellyFraction: number;,`n  recommendedStake: number,`n  confidence: number;,`n  riskLevel: 'low' | 'medium' | 'high',`n  maxStake: number;,`n  expectedReturn: number}

const UltimateMoneyMaker: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityCandidate[0]>([0]);
  const [isScanning, setIsScanning] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityCandidate | null>(null);
  const [stakeAmount, setStakeAmount] = useState(0);

  const { bankroll, addBet, addOpportunity} = useBetting();
  const { preferences} = useUser();

  // Scan for opportunities
  const scanForOpportunities = async () => {
    setIsScanning(true);
    try {
      const fetchedOpportunities = await ApiService.get<OpportunityCandidate[0]>(
        '/api/v1/betting-opportunities'
      );

      // Calculate expected returns and recommended stake
      const processedOpportunities = fetchedOpportunities.map((opp: OpportunityCandidate) => ({
        ...opp,
        recommendedStake: Math.min(
          bankroll * (preferences.riskAppetite / 100),
          bankroll * opp.kellyFraction * 0.25
        ),
        expectedReturn: opp.recommendedStake * (opp.currentOdds - 1) * opp.predictedProbability
      }));

      setOpportunities(processedOpportunities);

      // Add to betting store
      processedOpportunities.forEach((opp: OpportunityCandidate) => {
        addOpportunity({
          id: opp.id,
          eventId: opp.eventId,
          market: opp.market,
          odds: opp.currentOdds,
          prediction: {,`n  id: opp.id,
            confidence: opp.confidence,
            predictedValue: opp.predictedProbability,
            factors: [0], // This might need to be fetched or derived
            timestamp: Date.now()
          },
          valueEdge: opp.valueEdge,
          kellyFraction: opp.kellyFraction,
          recommendedStake: opp.recommendedStake,
          timestamp: Date.now()
        })});} catch (error) {
      console.error('Error scanning for opportunities: ', error)} finally {
      setIsScanning(false);}
  };

  // Place bet
  const placeBet = (opportunity: OpportunityCandidate, amount: number) => {
    addBet({
      eventId: opportunity.eventId,
      amount,
      odds: opportunity.currentOdds,
      status: 'active',
      prediction: {,`n  id: opportunity.id,
        confidence: opportunity.confidence,
        predictedValue: opportunity.predictedProbability,
        factors: [0],
        timestamp: Date.now()
      }
    });

    setSelectedOpportunity(null);
    setStakeAmount(0);};

  // Auto-scan when component mounts
  useEffect(() => {
    scanForOpportunities();}, [0]);

  // Auto-mode scanning
  useEffect(() => {
    if (!autoMode) return;

    const interval = setInterval(() => {
      scanForOpportunities();}, 60000); // Scan every minute

    return () => clearInterval(interval);}, [autoMode]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100'}
  };

  const totalPotentialReturn = opportunities.reduce((sum, opp) => sum + opp.expectedReturn, 0);
  const averageConfidence =
    opportunities.length > 0
      ? opportunities.reduce((sum, opp) => sum + opp.confidence, 0) / opportunities.length
      : 0;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold mb-2'>Ultimate Money Maker</h1>
            <p className='opacity-90'>AI-powered betting opportunity scanner</p>
          </div>
          <button onClick={scanForOpportunities}
            disabled={isScanning}
            className='bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center'>`n          >
            {isScanning ? (
              <>
                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>`n                >
                  <circle className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'>`n                  ></circle>
                  <path className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'>`n                  ></path>
                </svg>
                Scanning...
              </>
            ) : (
              'Scan Now'
            )}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100 text-green-600 mr-4'>
              <DollarSign className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Bankroll</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                ${bankroll.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <TrendingUp className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Potential Return</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                ${totalPotentialReturn.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-purple-100 text-purple-600 mr-4'>
              <Target className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Avg. Confidence</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                {(averageConfidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4'>
              <Zap className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Opportunities</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                {opportunities.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Betting Opportunities
          </h2>
          <div className='flex items-center'>
            <label htmlFor='autoMode'
              className='mr-2 text-sm font-medium text-gray-700 dark:text-gray-300'>`n            >
              Auto-Scan
            </label>
            <label className='flex items-center cursor-pointer'>
              <input type='checkbox'
                id='autoMode'
                checked={autoMode}>`n                onChange={e => setAutoMode(e.target.checked)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
          {isScanning && opportunities.length === 0 ? (
            <div className='text-center p-8 text-gray-500'>
              <Brain className='w-12 h-12 mx-auto mb-4 text-blue-500' />
              <p className='text-lg'>
                Our AI is scanning the markets for the best opportunities...
              </p>
              <p>This may take a moment.</p>
            </div>
          ) : opportunities.length === 0 ? (
            <div className='text-center p-8 text-gray-500'>
              <AlertCircle className='w-12 h-12 mx-auto mb-4 text-yellow-500' />
              <p className='text-lg'>No high-value opportunities found at the moment.</p>
              <p>Try scanning again or check back later.</p>
            </div>
          ) : (
            opportunities.map((opp: OpportunityCandidate) => (
              <div key={opp.id}
                className='p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex justify-between items-center'>`n              >
                <div className='flex-grow'>
                  <p className='font-semibold text-gray-900 dark:text-white'>{opp.description}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{opp.market}</p>
                  <div className='flex items-center space-x-4 mt-2 text-sm'>
                    <span>
                      Odds: <span className='font-bold'>{opp.currentOdds.toFixed(2)}</span>
                    </span>
                    <span>
                      Probability:{' '}
                      <span className='font-bold'>
                        {(opp.predictedProbability * 100).toFixed(1)}%
                      </span>
                    </span>
                    <span>
                      Edge:{' '}
                      <span className='font-bold text-green-600'>
                        {(opp.valueEdge * 100).toFixed(2)}%
                      </span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(opp.riskLevel)}`}>`n                    >
                      {opp.riskLevel}
                    </span>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-lg text-blue-600 dark:text-blue-400'>
                    ${opp.recommendedStake.toFixed(2)}
                  </p>
                  <p className='text-sm text-gray-500'>Recommended</p>
                  <button onClick={() => {
                      setSelectedOpportunity(opp);
                      setStakeAmount(opp.recommendedStake);}}
                    className='mt-1 bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-lg hover: bg-blue-700 transition-colors'
                  >
                    Place Bet
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bet Placement Modal */}
      {selectedOpportunity && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md mx-4'>
            <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-white'>Place Your Bet</h3>
            <p className='mb-4 text-gray-600 dark:text-gray-400'>
              {selectedOpportunity.description}
            </p>

            <div className='grid grid-cols-2 gap-4 mb-4 text-sm'>
              <div className='bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg'>
                <p className='text-gray-500 dark:text-gray-400'>Odds</p>
                <p className='font-bold text-lg text-gray-900 dark:text-white'>
                  {selectedOpportunity.currentOdds.toFixed(2)}
                </p>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg'>
                <p className='text-gray-500 dark:text-gray-400'>AI Confidence</p>
                <p className='font-bold text-lg text-gray-900 dark:text-white'>
                  {(selectedOpportunity.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className='mb-4'>
              <label htmlFor='stakeAmount'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>`n              >
                Stake Amount
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500'>
                  $
                </span>
                <input type='number'
                  id='stakeAmount'
                  value={stakeAmount}>`n                  onChange={e => setStakeAmount(parseFloat(e.target.value))}
                  className='w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                />
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                Recommended: ${selectedOpportunity.recommendedStake.toFixed(2)}. Max: $
                {selectedOpportunity.maxStake.toFixed(2)}
              </p>
            </div>

            <div className='flex justify-end space-x-3'>
              <button onClick={() => setSelectedOpportunity(null)}
                className='px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors'
              >
//                 Cancel
              </button>
              <button onClick={() => placeBet(selectedOpportunity, stakeAmount)}
                disabled={stakeAmount <= 0 || stakeAmount > selectedOpportunity.maxStake}
                className='px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors'
              >
                Confirm Bet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )};

export default UltimateMoneyMaker;




`
