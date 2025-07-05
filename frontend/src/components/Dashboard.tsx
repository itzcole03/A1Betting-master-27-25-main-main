import { BarChart3, Cpu, DollarSign, TrendingUp, Trophy } from 'lucide-react';
import React from 'react';

/**
 * Dashboard - Main landing page for A1Betting Platform.
 * Shows key stats, ML model health, and recent performance.
 */
const Dashboard: React.FC = () => {
  // Example stats (replace with real data integration as needed)
  const stats = [
    { label: 'Total Profit', value: '$18,500', icon: <DollarSign className="text-green-400" /> },
    { label: 'Win Rate', value: '73.8%', icon: <Trophy className="text-yellow-400" /> },
    { label: 'ML Models', value: '47', icon: <Cpu className="text-cyan-400" /> },
    { label: 'Sharpe Ratio', value: '1.42', icon: <TrendingUp className="text-purple-400" /> },
    { label: 'Active Predictions', value: '23', icon: <BarChart3 className="text-blue-400" /> },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
        Command Center Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-800/60 rounded-xl p-6 flex items-center space-x-4 shadow-lg">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-900/70 rounded-xl p-6 mt-4">
        <h2 className="text-xl font-semibold text-purple-300 mb-2">Recent Performance</h2>
        <p className="text-gray-300">
          The platform has maintained a <span className="font-bold text-green-400">73.8% win rate</span> and an <span className="font-bold text-cyan-400">18.5% ROI</span> over the last 30 days.
        </p>
        <p className="text-gray-400 mt-2">
          All ML models are healthy and real-time data feeds are operational.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
