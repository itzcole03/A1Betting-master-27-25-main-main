import React from 'react';
import './A1BettingPreview.css';

/**
 * MoneyMakerTab - Displays top value bets and profit optimization analytics.
 * Used as the Money Maker tab in A1BettingPreview.
 */
const MoneyMakerTab: React.FC = () => (
  <div className='moneymaker-tab'>
    <div className='glass-card'>
      <h3 style={{ padding: '20px', color: 'var(--cyber-primary)' }}>💎 Money Maker Engine</h3>
      <div className='grid grid-2' style={{ padding: '20px' }}>
        <div className='glass-card'>
          <h4 style={{ padding: '15px', color: 'var(--cyber-accent)' }}>Top Value Bets</h4>
          <div style={{ padding: '0 15px 15px' }}>
            <div className='opportunity-card'>
              <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Lakers - Over 228.5</div>
              <div>Stake: $1,200 | Expected Profit: +$312</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                Kelly: 12.0% | Confidence: 92.3%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--cyber-accent)' }}>
                Model Consensus: 41/47
              </div>
            </div>
            <div className='opportunity-card'>
              <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Chiefs -3.5</div>
              <div>Stake: $950 | Expected Profit: +$210</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                Kelly: 9.5% | Confidence: 89.7%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--cyber-accent)' }}>
                Model Consensus: 38/47
              </div>
            </div>
          </div>
        </div>
        <div className='glass-card'>
          <h4 style={{ padding: '15px', color: 'var(--cyber-accent)' }}>Profit Optimization</h4>
          <div style={{ padding: '0 15px 15px' }}>
            <div className='opportunity-card'>
              <div style={{ fontWeight: 'bold', marginBottom: 10 }}>
                Kelly Criterion Recommendation
              </div>
              <div>Optimal Stake: $247 (24.7% of bankroll)</div>
              <div>Expected ROI: +31.8%</div>
            </div>
            <div className='opportunity-card'>
              <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Sharpe Ratio Optimization</div>
              <div>Current Sharpe: 2.47</div>
              <div>Optimal Sharpe: 3.21</div>
              <div>Efficiency: 76.9%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MoneyMakerTab;
