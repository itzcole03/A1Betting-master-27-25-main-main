import React from 'react';
import './A1BettingPreview.css';

/**
 * PrizePicksTab - Displays PrizePicks AI engine, top picks, and multiplier analysis.
 * Used as the PrizePicks tab in A1BettingPreview.
 */
const PrizePicksTab: React.FC = () => (
  <div className='prizepicks-tab'>
    <div className='grid grid-2'>
      <div className='glass-card'>
        <h3 style={{ padding: '20px', color: 'var(--cyber-primary)' }}>🎯 PrizePicks AI Engine</h3>
        <div style={{ padding: '0 20px 20px' }}>
          <div className='prizepicks-interface'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>
              Enhanced PrizePicks Integration
            </div>
            <div style={{ marginBottom: 5 }}>Active Lineups: 47 | Win Rate: 87.3%</div>
            <div>Total Projected Value: +$2,847.32</div>
          </div>
          <div className='opportunity-card'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Today's Top Picks</div>
            <div
              style={{
                margin: '5px 0',
                padding: 8,
                background: 'rgba(6,255,165,0.1)',
                borderRadius: 6,
              }}
            >
              <div>LeBron James - Points: Over 25.5</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--cyber-secondary)' }}>
                Confidence: 94% | Expected: +32.8%
              </div>
            </div>
            <div
              style={{
                margin: '5px 0',
                padding: 8,
                background: 'rgba(6,255,165,0.1)',
                borderRadius: 6,
              }}
            >
              <div>Josh Allen - Passing Yards: Over 267.5</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--cyber-secondary)' }}>
                Confidence: 91% | Expected: +28.4%
              </div>
            </div>
            <div
              style={{
                margin: '5px 0',
                padding: 8,
                background: 'rgba(6,255,165,0.1)',
                borderRadius: 6,
              }}
            >
              <div>Mookie Betts - Hits: Over 1.5</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--cyber-secondary)' }}>
                Confidence: 89% | Expected: +24.1%
              </div>
            </div>
          </div>
          <button className='cyber-button' style={{ width: '100%', marginTop: 15 }}>
            🚀 Generate Optimal Lineup
          </button>
        </div>
      </div>
      <div className='glass-card'>
        <h3 style={{ padding: '20px', color: 'var(--cyber-primary)' }}>📈 Multiplier Analysis</h3>
        <div style={{ padding: '0 20px 20px' }}>
          <div className='opportunity-card'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>2-Pick Multipliers</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>3x: 87.5% Win</div>
              <div>5x: 76.2% Win</div>
              <div>10x: 45.8% Win</div>
              <div>25x: 18.3% Win</div>
            </div>
          </div>
          <div className='opportunity-card'>
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>3-Pick Multipliers</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>5x: 65.4% Win</div>
              <div>10x: 43.7% Win</div>
              <div>25x: 22.1% Win</div>
              <div>100x: 8.9% Win</div>
            </div>
          </div>
          <div className='kelly-criterion-display'>
            <div style={{ fontWeight: 'bold' }}>Kelly Criterion Recommendation</div>
            <div>Optimal Stake: $247 (24.7% of bankroll)</div>
            <div>Expected ROI: +31.8%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PrizePicksTab;
