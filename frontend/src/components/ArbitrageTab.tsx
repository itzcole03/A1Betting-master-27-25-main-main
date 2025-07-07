import React from 'react';
import './A1BettingPreview.css';

/**
 * ArbitrageTab - Displays real-time arbitrage opportunities and execution interface.
 * Used as the Arbitrage tab in A1BettingPreview.
 */
const ArbitrageTab: React.FC = () => (
  <div className='arbitrage-tab'>
    <div className='glass-card'>
      <h3 style={{ padding: '20px', color: 'var(--cyber-primary)' }}>⚡ Arbitrage Scanner</h3>
      <div style={{ padding: '0 20px 20px' }}>
        <div className='arbitrage-scanner'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              Real-Time Arbitrage Detection
            </div>
            <div style={{ color: 'var(--cyber-accent)', fontWeight: 'bold' }}>
              Scanner Status: ACTIVE
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            Scanning 23 sportsbooks | 1,247 markets | 89ms latency
          </div>
        </div>
        <div className='opportunity-card cyber-glow'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 'bold' }}>Lakers vs Warriors - Total Points</div>
            <div style={{ color: 'var(--cyber-secondary)', fontWeight: 'bold' }}>+5.2% ROI</div>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}
          >
            <div>DraftKings: Over 228.5 (+110)</div>
            <div>FanDuel: Under 229.5 (-105)</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
            Stake Distribution: $547 / $453 | Total Profit: $52 | Duration: 12min
          </div>
          <button className='cyber-button' style={{ marginTop: 10, fontSize: '0.9rem' }}>
            ⚡ Execute Arbitrage
          </button>
        </div>
        <div className='opportunity-card cyber-glow'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 'bold' }}>Chiefs vs Bills - Spread</div>
            <div style={{ color: 'var(--cyber-secondary)', fontWeight: 'bold' }}>+3.8% ROI</div>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}
          >
            <div>BetMGM: Chiefs -3 (-110)</div>
            <div>Caesars: Bills +3.5 (-105)</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
            Stake Distribution: $523 / $477 | Total Profit: $38 | Duration: 8min
          </div>
          <button className='cyber-button' style={{ marginTop: 10, fontSize: '0.9rem' }}>
            ⚡ Execute Arbitrage
          </button>
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
            <div style={{ fontWeight: 'bold' }}>Dodgers vs Giants - Moneyline</div>
            <div style={{ color: 'var(--cyber-secondary)', fontWeight: 'bold' }}>+2.1% ROI</div>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}
          >
            <div>PointsBet: Dodgers (+145)</div>
            <div>Barstool: Giants (-135)</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
            Stake Distribution: $591 / $409 | Total Profit: $21 | Duration: 15min
          </div>
          <button className='cyber-button' style={{ marginTop: 10, fontSize: '0.9rem' }}>
            ⚡ Execute Arbitrage
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ArbitrageTab;
