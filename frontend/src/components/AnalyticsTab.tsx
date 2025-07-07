import React from 'react';
import './A1BettingPreview.css';

/**
 * AnalyticsTab - Displays neural network status, performance metrics, and system health.
 * Used as the ML Analytics tab in A1BettingPreview.
 */
const AnalyticsTab: React.FC = () => (
  <div className='analytics-tab'>
    <div className='grid grid-3'>
      <div className='glass-card'>
        <h4 style={{ padding: '20px 20px 0', color: 'var(--cyber-primary)' }}>
          🧠 Neural Networks Status
        </h4>
        <div style={{ padding: '20px' }}>
          <div className='neural-network'>
            <span>Ensemble Model #1</span>
            <span style={{ color: 'var(--cyber-secondary)' }}>97.2% ✓</span>
          </div>
          <div className='neural-network'>
            <span>XGBoost Predictor</span>
            <span style={{ color: 'var(--cyber-secondary)' }}>94.8% ✓</span>
          </div>
          <div className='neural-network'>
            <span>LSTM Time Series</span>
            <span style={{ color: 'var(--cyber-secondary)' }}>92.1% ✓</span>
          </div>
          <div className='neural-network'>
            <span>Random Forest</span>
            <span style={{ color: '#ffa502' }}>89.3% ⚠</span>
          </div>
          <div className='neural-network'>
            <span>Support Vector Machine</span>
            <span style={{ color: 'var(--cyber-secondary)' }}>91.7% ✓</span>
          </div>
        </div>
      </div>
      <div className='glass-card'>
        <h4 style={{ padding: '20px 20px 0', color: 'var(--cyber-primary)' }}>
          📈 Performance Metrics
        </h4>
        <div className='chart-container'>
          <div className='chart-placeholder'>Real-time Performance Chart</div>
        </div>
      </div>
      <div className='glass-card'>
        <h4 style={{ padding: '20px 20px 0', color: 'var(--cyber-primary)' }}>⚡ System Health</h4>
        <div style={{ padding: '20px' }}>
          <div className='neural-network'>
            <span>API Status</span>
            <span className='status-indicator status-online'></span>
            <span style={{ color: 'var(--cyber-secondary)' }}>Online</span>
          </div>
          <div className='neural-network'>
            <span>Data Quality</span>
            <span style={{ color: 'var(--cyber-secondary)' }}>98.7%</span>
          </div>
          <div className='neural-network'>
            <span>Latency</span>
            <span style={{ color: 'var(--cyber-secondary)' }}>12ms</span>
          </div>
          <div className='neural-network'>
            <span>Memory Usage</span>
            <span style={{ color: '#ffa502' }}>78%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsTab;
