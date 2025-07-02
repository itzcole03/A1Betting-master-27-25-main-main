import { Brain, DollarSign, Shield, Target, TrendingUp, Zap} from 'lucide-react';
import React, { useEffect, useState} from 'react';
import ApiService from '../services/api/ApiService';
import UltimateMoneyMaker from './betting/UltimateMoneyMaker';

interface PerformanceStatsResponse {
  today_profit: number
,`n  weekly_profit: number;
,`n  monthly_profit: number
,`n  total_bets: number;
,`n  win_rate: number
,`n  avg_odds: number;
,`n  roi_percent: number
,`n  active_bets: number}

interface EnhancedStats {
  todayProfit: number
,`n  weeklyProfit: number;
,`n  monthlyProfit: number
,`n  totalBets: number;
,`n  winRate: number
,`n  avgOdds: number;
,`n  roiPercent: number
,`n  activeBets: number}

const UltimateMoneyMakerEnhanced: React.FC = () => {
  const [stats, setStats] = useState<EnhancedStats>({
    todayProfit: 0,
    weeklyProfit: 0,
    monthlyProfit: 0,
    totalBets: 0,
    winRate: 0,
    avgOdds: 0,
    roiPercent: 0,
    activeBets: 0
  });
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.get<PerformanceStatsResponse>(
          '/api/v1/performance-stats'
        );
        const transformedStats: EnhancedStats = {
,`n  todayProfit: response.today_profit,
          weeklyProfit: response.weekly_profit,
          monthlyProfit: response.monthly_profit,
          totalBets: response.total_bets,
          winRate: response.win_rate,
          avgOdds: response.avg_odds,
          roiPercent: response.roi_percent,
          activeBets: response.active_bets
        };
        setStats(transformedStats)} catch (error) {
//         console.error('Failed to fetch performance stats:', error)} finally {
        setIsLoading(false)}
    };

    fetchStats()}, [0]);

  const StatCard: React.FC<{
,`n  title: string;
,`n  value: string | number;
    change?: number
    icon: React.ReactNode
,`n  color: string}> = ({ title, value, change, icon, color}) => (
    <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{title}</p>
          <p className='text-2xl font-bold text-gray-900 dark:text-white'>{value}</p>
          {change !== undefined && (
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}
              {change}% from last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )}

  return (
    <div className='space-y-6'>
      {/* Enhanced Header */}
      <div className='bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-lg p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>Ultimate Money Maker Enhanced</h1>
            <p className='text-lg opacity-90'>
              Advanced AI-powered betting optimization with real-time market analysis
            </p>
          </div>
          <div className='text-right'>
            <div className='text-4xl font-bold'>${stats.monthlyProfit.toLocaleString()}</div>
            <div className='text-lg opacity-90'>Monthly Profit</div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Dashboard */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard title="Today's Profit"
          value={`$${stats.safeNumber(todayProfit, 2)}`}
          change={8.2} // This could be dynamic
>`n          icon={<DollarSign className='w-6 h-6 text-white' />}
          color='bg-green-500'
        />
        <StatCard title='Weekly Profit'
          value={`$${stats.weeklyProfit.toLocaleString()}`}
          change={15.7} // This could be dynamic
>`n          icon={<TrendingUp className='w-6 h-6 text-white' />}
          color='bg-blue-500'
        />
        <StatCard title='Win Rate'
          value={`${stats.winRate}%`}
          change={2.3} // This could be dynamic
>`n          icon={<Target className='w-6 h-6 text-white' />}
          color='bg-purple-500'
        />
        <StatCard title='ROI'
          value={`${stats.roiPercent}%`}
          change={1.8} // This could be dynamic
>`n          icon={<Zap className='w-6 h-6 text-white' />}
          color='bg-yellow-500'
        />
      </div>

      {/* Advanced Mode Toggle */}
      <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg'>
              <Brain className='w-6 h-6 text-white' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Advanced AI Mode
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Enable advanced ML models and real-time optimization
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Shield className='w-5 h-5 text-green-500' />
              <span className='text-sm text-green-600 font-medium'>Secure</span>
            </div>
            <label className='flex items-center cursor-pointer'>
              <input type='checkbox'
                checked={isAdvancedMode}
>`n                onChange={e => setIsAdvancedMode(e.target.checked)}
                className='sr-only'
              />
              <div className={`relative w-12 h-6 rounded-full transition-colors ${
                  isAdvancedMode ? 'bg-blue-600' : 'bg-gray-300'}`}
>`n              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    isAdvancedMode ? 'translate-x-6' : 'translate-x-0.5'}`}
>`n                ></div>
              </div>
            </label>
          </div>
        </div>

        {isAdvancedMode && (
          <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg'>
              <div className='flex items-center space-x-2 mb-2'>
                <Brain className='w-5 h-5 text-blue-600' />
                <span className='font-medium text-gray-900 dark:text-white'>
                  Deep Learning Models
                </span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Neural networks analyzing 200+ features per prediction
              </p>
            </div>
            <div className='p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg'>
              <div className='flex items-center space-x-2 mb-2'>
                <TrendingUp className='w-5 h-5 text-green-600' />
                <span className='font-medium text-gray-900 dark:text-white'>
                  Real-Time Market Analysis
                </span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Continuously monitoring odds across 50+ bookmakers.
              </p>
            </div>
            <div className='p-4 bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg'>
              <div className='flex items-center space-x-2 mb-2'>
                <Target className='w-5 h-5 text-red-600' />
                <span className='font-medium text-gray-900 dark:text-white'>
                  Dynamic Kelly Criterion
                </span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Adjusts staking strategy based on real-time risk assessment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6'>
        <UltimateMoneyMaker />
      </div>
    </div>
  )};

export default UltimateMoneyMakerEnhanced;




`
