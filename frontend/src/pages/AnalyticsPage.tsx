import React from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';

const AnalyticsPage: React.FC = () => {
  const { data: realtimeData, loading, error } = useRealtimeData();

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-blue-900/80 to-blue-700/80 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-blue-900/80 to-blue-700/80 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-400">Error loading analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-blue-900/80 to-blue-700/80 min-h-screen">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-6">
        📊 Live Analytics Dashboard
      </h1>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Prediction Accuracy</h3>
          <p className="text-3xl font-bold text-green-400">{realtimeData?.accuracy.toFixed(1)}%</p>
          <p className="text-sm text-gray-300">Real-time model performance</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Active Models</h3>
          <p className="text-3xl font-bold text-blue-400">{realtimeData?.activeBots || 0}</p>
          <p className="text-sm text-gray-300">Currently processing</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Data Points</h3>
          <p className="text-3xl font-bold text-purple-400">{realtimeData?.dataPoints.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-300">Processed today</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Confidence</h3>
          <p className="text-3xl font-bold text-yellow-400">{realtimeData?.confidence.toFixed(1)}%</p>
          <p className="text-sm text-gray-300">Overall system confidence</p>
        </div>
      </div>

      {/* Sport Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Sport Performance Breakdown</h2>
          <div className="space-y-4">
            {realtimeData?.sportBreakdown && Object.entries(realtimeData.sportBreakdown).map(([sport, data]) => (
              <div key={sport} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="font-medium text-white">{sport}</span>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{data.accuracy.toFixed(1)}% accuracy</div>
                  <div className="text-blue-400 text-sm">{data.roi.toFixed(1)}% ROI</div>
                  <div className="text-gray-300 text-xs">{data.volume} predictions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">System Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">System Health</span>
              <span className={`font-bold ${realtimeData?.systemMetrics.systemHealth === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}>
                {realtimeData?.systemMetrics.systemHealth || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">Uptime</span>
              <span className="text-blue-400 font-bold">{realtimeData?.systemMetrics.uptime.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">Response Time</span>
              <span className="text-purple-400 font-bold">{realtimeData?.systemMetrics.responseTime.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">Error Rate</span>
              <span className="text-red-400 font-bold">{realtimeData?.systemMetrics.errorRate.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Market Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {realtimeData?.marketData.efficiency.toFixed(1)}%
            </div>
            <div className="text-gray-300">Market Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              {realtimeData?.marketData.arbitrageOpportunities || 0}
            </div>
            <div className="text-gray-300">Arbitrage Opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {realtimeData?.marketData.valueBets || 0}
            </div>
            <div className="text-gray-300">Value Bets Identified</div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white/5 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-white mb-2">Market Sentiment</div>
            <div className="text-yellow-400 font-bold text-xl">{realtimeData?.marketData.sentiment || 'Neutral'}</div>
          </div>
        </div>
      </div>

      {/* Upcoming Opportunities */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">🔥 Live Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {realtimeData?.upcomingOpportunities?.slice(0, 4).map((opportunity, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="font-semibold text-white mb-2">{opportunity.game}</div>
              <div className="text-sm text-gray-300 mb-1">Sport: {opportunity.sport}</div>
              <div className="text-sm text-gray-300 mb-1">Market: {opportunity.market}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-green-400 font-bold">{opportunity.confidence.toFixed(1)}% confidence</span>
                <span className="text-blue-400 font-bold">+{opportunity.expected_value.toFixed(1)}% EV</span>
              </div>
              <div className="text-yellow-400 text-sm mt-1">{opportunity.recommendation}</div>
            </div>
          )) || (
            <div className="col-span-2 text-center text-gray-400 py-8">
              No live opportunities available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
