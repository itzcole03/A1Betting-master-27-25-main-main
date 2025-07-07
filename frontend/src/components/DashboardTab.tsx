import React from 'react';
import './A1BettingPreview.css';

/**
 * DashboardTab - Displays portfolio metrics, top opportunities, and advanced analytics.
 * Used as the main dashboard in A1BettingPreview.
 */
const DashboardTab: React.FC = () => (
  <div className='dashboard-tab'>
    <div className='grid grid-3'>
      <div className='glass-card metric-card'>
        <div className='metric-value'>$18,420.73</div>
        <div className='metric-label'>Portfolio Value</div>
        <div className='metric-change positive'>+12.4% (24h)</div>
      </div>
      <div className='glass-card metric-card'>
        <div className='metric-value'>73.8%</div>
        <div className='metric-label'>Win Rate</div>
        <div className='metric-change positive'>+2.1% (7d)</div>
      </div>
      <div className='glass-card metric-card'>
        <div className='metric-value'>18.5%</div>
        <div className='metric-label'>ROI</div>
        <div className='metric-change positive'>+0.7% (30d)</div>
      </div>
    </div>
    <div className='grid grid-2'>
      <div className='glass-card'>
        <h4 style={{ padding: '15px', color: 'var(--cyber-accent)' }}>Today's Top Opportunities</h4>
        <div style={{ padding: '0 15px 15px' }}>
          <div className='opportunity-card'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <div style={{ fontWeight: 'bold' }}>Chiefs -3.5 vs Bills</div>
              <div style={{ color: 'var(--cyber-secondary)', fontWeight: 'bold' }}>+31.2% ROI</div>
            </div>
            <div style={{ margin: '5px 0' }}>Optimal Stake: $1,847 | Expected Profit: +$576</div>
            <div style={{ margin: '5px 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
              Kelly: 18.47% | Confidence: 94.1% | Sharpe: 2.87
            </div>
            <div style={{ margin: '5px 0', fontSize: '0.8rem', color: 'var(--cyber-accent)' }}>
              Risk-Adjusted Score: 89.4/100 | Model Consensus: 44/47
            </div>
          </div>
          <div className='opportunity-card'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <div style={{ fontWeight: 'bold' }}>Dodgers ML +145</div>
              <div style={{ color: 'var(--cyber-secondary)', fontWeight: 'bold' }}>+24.7% ROI</div>
            </div>
            <div style={{ margin: '5px 0' }}>Optimal Stake: $987 | Expected Profit: +$244</div>
            <div style={{ margin: '5px 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
              Kelly: 9.87% | Confidence: 87.3% | Sharpe: 2.12
            </div>
            <div style={{ margin: '5px 0', fontSize: '0.8rem', color: 'var(--cyber-accent)' }}>
              Risk-Adjusted Score: 78.6/100 | Model Consensus: 38/47
            </div>
          </div>
        </div>
      </div>
      <div className='glass-card'>
        <h4 style={{ padding: '15px', color: 'var(--cyber-accent)' }}>Advanced Analytics</h4>
        <div style={{ padding: '0 15px 15px' }}>
          <div className='opportunity-card'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>
              Evolutionary Algorithm Results
            </div>
            <div style={{ margin: '5px 0' }}>
              <div>Generation: 2,847 | Best Fitness: 97.8%</div>
              <div>Mutation Rate: 0.034 | Selection Pressure: High</div>
              <div>Convergence: 98.7% | Diversity Index: 0.23</div>
            </div>
          </div>
          <div className='opportunity-card'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Clustering Analysis</div>
            <div style={{ margin: '5px 0' }}>
              <div>Optimal Clusters: 7 | Silhouette Score: 0.847</div>
              <div>High-Value Cluster: 12 opportunities</div>
              <div>Medium-Value Cluster: 8 opportunities</div>
            </div>
          </div>
          <div className='opportunity-card'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Ensemble Model Performance</div>
            <div style={{ margin: '5px 0' }}>
              <div>XGBoost Weight: 0.347 | Accuracy: 94.8%</div>
              <div>LSTM Weight: 0.234 | Accuracy: 92.1%</div>
              <div>Random Forest Weight: 0.419 | Accuracy: 89.3%</div>
            </div>
          </div>
          <div className='weather-impact' style={{ marginTop: 15 }}>
            <div style={{ fontWeight: 'bold' }}>Multi-Timeframe Analysis</div>
            <div>1H ROI: +12.4% | 4H ROI: +28.7% | Daily ROI: +47.8%</div>
            <div style={{ color: 'var(--cyber-secondary)' }}>
              Optimal Entry: 2.5 hours before game
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardTab;
