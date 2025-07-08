import React, { useEffect, useState } from 'react';

interface BettingOpportunity {
  id: string;
  type: 'arbitrage' | 'value' | 'sharp' | 'steam';
  sport: string;
  league: string;
  teams: string;
  market: string;
  bookmaker1: string;
  odds1: number;
  bookmaker2?: string;
  odds2?: number;
  impliedProb: number;
  trueProb: number;
  expectedValue: number;
  roi: number;
  confidence: number;
  timeRemaining: string;
  volume: 'low' | 'medium' | 'high';
  sharpMoney: boolean;
  steamMove: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const liveOpportunitiesStyles = `
  .live-opportunities {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(20px) saturate(180%);
    margin-bottom: 20px;
  }

  .opportunities-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--glass-border);
  }

  .opportunities-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--cyber-primary);
    font-size: 1.3rem;
    font-weight: 600;
  }

  .opportunity-count {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .count-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .count-badge.arbitrage {
    background: linear-gradient(45deg, var(--cyber-primary), var(--cyber-secondary));
    color: var(--cyber-dark);
  }

  .count-badge.value {
    background: linear-gradient(45deg, var(--neural-green), var(--cyber-accent));
    color: white;
  }

  .count-badge.sharp {
    background: linear-gradient(45deg, var(--cyber-purple), var(--cyber-pink));
    color: white;
  }

  .filters-section {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-select, .filter-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    padding: 6px 12px;
    color: white;
    font-size: 0.9rem;
    min-width: 120px;
  }

  .filter-select:focus, .filter-input:focus {
    outline: none;
    border-color: var(--cyber-primary);
    box-shadow: 0 0 10px rgba(6, 255, 165, 0.3);
  }

  .opportunities-grid {
    display: grid;
    gap: 12px;
  }

  .opportunity-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .opportunity-item:hover {
    border-color: var(--cyber-primary);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(6, 255, 165, 0.1);
  }

  .opportunity-item.critical {
    border-left: 4px solid var(--cyber-pink);
    background: rgba(247, 37, 133, 0.05);
  }

  .opportunity-item.high {
    border-left: 4px solid var(--cyber-orange);
    background: rgba(255, 107, 53, 0.05);
  }

  .opportunity-item.medium {
    border-left: 4px solid var(--cyber-accent);
    background: rgba(0, 212, 255, 0.05);
  }

  .opportunity-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .opportunity-main {
    flex: 1;
  }

  .opportunity-type {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .opportunity-type.arbitrage {
    background: var(--cyber-primary);
    color: var(--cyber-dark);
  }

  .opportunity-type.value {
    background: var(--neural-green);
    color: white;
  }

  .opportunity-type.sharp {
    background: var(--cyber-purple);
    color: white;
  }

  .opportunity-type.steam {
    background: var(--cyber-orange);
    color: white;
  }

  .teams-info {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .league-info {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .opportunity-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 8px;
    margin-top: 12px;
  }

  .metric-item {
    text-align: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }

  .metric-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.7rem;
    margin-bottom: 2px;
    text-transform: uppercase;
  }

  .metric-value {
    color: var(--cyber-primary);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .metric-value.positive {
    color: var(--cyber-secondary);
  }

  .metric-value.negative {
    color: var(--cyber-pink);
  }

  .bookmaker-odds {
    display: flex;
    gap: 12px;
    margin-top: 10px;
  }

  .bookmaker-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }

  .bookmaker-name {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.8rem;
    margin-bottom: 4px;
  }

  .bookmaker-odd {
    color: var(--cyber-primary);
    font-size: 1.1rem;
    font-weight: bold;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .action-btn {
    flex: 1;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-btn.primary {
    background: linear-gradient(45deg, var(--cyber-primary), var(--cyber-secondary));
    color: var(--cyber-dark);
  }

  .action-btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid var(--glass-border);
  }

  .action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(6, 255, 165, 0.3);
  }

  .time-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
  }

  .urgency-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .urgency-indicator.critical {
    background: var(--cyber-pink);
  }

  .urgency-indicator.high {
    background: var(--cyber-orange);
  }

  .urgency-indicator.medium {
    background: var(--cyber-accent);
  }

  .sharp-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    padding: 4px 8px;
    background: rgba(124, 58, 237, 0.2);
    border-radius: 6px;
    font-size: 0.7rem;
    color: var(--cyber-purple);
  }
`;

export const LiveBettingOpportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    sport: 'all',
    minRoi: 0,
    minConfidence: 0
  });

  useEffect(() => {
    loadOpportunities();
    const interval = setInterval(loadOpportunities, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadOpportunities = () => {
    // Simulate loading real betting opportunities
    const mockOpportunities: BettingOpportunity[] = [
      {
        id: '1',
        type: 'arbitrage',
        sport: 'Basketball',
        league: 'NBA',
        teams: 'Lakers vs Warriors',
        market: 'Moneyline',
        bookmaker1: 'DraftKings',
        odds1: 2.1,
        bookmaker2: 'FanDuel',
        odds2: 2.05,
        impliedProb: 47.6,
        trueProb: 48.2,
        expectedValue: 4.7,
        roi: 4.7,
        confidence: 92,
        timeRemaining: '2h 34m',
        volume: 'high',
        sharpMoney: true,
        steamMove: false,
        priority: 'critical'
      },
      {
        id: '2',
        type: 'value',
        sport: 'Football',
        league: 'NFL',
        teams: 'Chiefs vs Bills',
        market: 'Over/Under 47.5',
        bookmaker1: 'Bet365',
        odds1: 1.95,
        impliedProb: 51.3,
        trueProb: 58.7,
        expectedValue: 7.4,
        roi: 14.4,
        confidence: 87,
        timeRemaining: '1d 5h',
        volume: 'medium',
        sharpMoney: true,
        steamMove: true,
        priority: 'high'
      },
      {
        id: '3',
        type: 'sharp',
        sport: 'Hockey',
        league: 'NHL',
        teams: 'Bruins vs Rangers',
        market: 'Puck Line -1.5',
        bookmaker1: 'BetMGM',
        odds1: 2.4,
        impliedProb: 41.7,
        trueProb: 45.2,
        expectedValue: 3.5,
        roi: 8.4,
        confidence: 79,
        timeRemaining: '6h 12m',
        volume: 'low',
        sharpMoney: true,
        steamMove: false,
        priority: 'medium'
      }
    ];

    setOpportunities(mockOpportunities);
    setLoading(false);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (filters.type !== 'all' && opp.type !== filters.type) return false;
    if (filters.sport !== 'all' && opp.sport !== filters.sport) return false;
    if (opp.roi < filters.minRoi) return false;
    if (opp.confidence < filters.minConfidence) return false;
    return true;
  });

  const opportunityCounts = {
    arbitrage: opportunities.filter(o => o.type === 'arbitrage').length,
    value: opportunities.filter(o => o.type === 'value').length,
    sharp: opportunities.filter(o => o.type === 'sharp').length
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
        <div>Scanning Live Opportunities...</div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: liveOpportunitiesStyles }} />
      
      <div className="live-opportunities">
        <div className="opportunities-header">
          <div className="opportunities-title">
            <span>🎯</span>
            <span>Live Betting Opportunities</span>
          </div>
          <div className="opportunity-count">
            <div className="count-badge arbitrage">
              <span>⚡</span>
              <span>{opportunityCounts.arbitrage} Arbitrage</span>
            </div>
            <div className="count-badge value">
              <span>💰</span>
              <span>{opportunityCounts.value} Value</span>
            </div>
            <div className="count-badge sharp">
              <span>🧠</span>
              <span>{opportunityCounts.sharp} Sharp</span>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Type:</label>
            <select 
              className="filter-select"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="all">All Types</option>
              <option value="arbitrage">Arbitrage</option>
              <option value="value">Value Bets</option>
              <option value="sharp">Sharp Money</option>
              <option value="steam">Steam Moves</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sport:</label>
            <select 
              className="filter-select"
              value={filters.sport}
              onChange={(e) => setFilters({...filters, sport: e.target.value})}
            >
              <option value="all">All Sports</option>
              <option value="Basketball">Basketball</option>
              <option value="Football">Football</option>
              <option value="Baseball">Baseball</option>
              <option value="Hockey">Hockey</option>
              <option value="Soccer">Soccer</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min ROI:</label>
            <input 
              type="number"
              className="filter-input"
              placeholder="0%"
              value={filters.minRoi}
              onChange={(e) => setFilters({...filters, minRoi: Number(e.target.value)})}
            />
          </div>

          <div className="filter-group">
            <label>Min Confidence:</label>
            <input 
              type="number"
              className="filter-input"
              placeholder="0%"
              value={filters.minConfidence}
              onChange={(e) => setFilters({...filters, minConfidence: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="opportunities-grid">
          {filteredOpportunities.map(opportunity => (
            <div key={opportunity.id} className={`opportunity-item ${opportunity.priority}`}>
              <div className="opportunity-header">
                <div className="opportunity-main">
                  <div className={`opportunity-type ${opportunity.type}`}>
                    {opportunity.type}
                  </div>
                  <div className="teams-info">{opportunity.teams}</div>
                  <div className="league-info">
                    {opportunity.league} • {opportunity.market}
                  </div>
                </div>
                <div className="time-indicator">
                  <div className={`urgency-indicator ${opportunity.priority}`}></div>
                  <span>{opportunity.timeRemaining}</span>
                </div>
              </div>

              <div className="bookmaker-odds">
                <div className="bookmaker-card">
                  <div className="bookmaker-name">{opportunity.bookmaker1}</div>
                  <div className="bookmaker-odd">{opportunity.odds1.toFixed(2)}</div>
                </div>
                {opportunity.bookmaker2 && (
                  <div className="bookmaker-card">
                    <div className="bookmaker-name">{opportunity.bookmaker2}</div>
                    <div className="bookmaker-odd">{opportunity.odds2?.toFixed(2)}</div>
                  </div>
                )}
              </div>

              <div className="opportunity-metrics">
                <div className="metric-item">
                  <div className="metric-label">ROI</div>
                  <div className={`metric-value ${opportunity.roi > 0 ? 'positive' : 'negative'}`}>
                    {opportunity.roi.toFixed(1)}%
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Edge</div>
                  <div className="metric-value positive">
                    {opportunity.expectedValue.toFixed(1)}%
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Confidence</div>
                  <div className="metric-value">
                    {opportunity.confidence}%
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Volume</div>
                  <div className={`metric-value ${opportunity.volume === 'high' ? 'positive' : ''}`}>
                    {opportunity.volume.toUpperCase()}
                  </div>
                </div>
              </div>

              {opportunity.sharpMoney && (
                <div className="sharp-indicator">
                  <span>🧠</span>
                  <span>Sharp Money Movement Detected</span>
                </div>
              )}

              <div className="action-buttons">
                <button className="action-btn primary">
                  Place Bet
                </button>
                <button className="action-btn secondary">
                  Track
                </button>
                <button className="action-btn secondary">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.6)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
            <div>No opportunities match your current filters</div>
            <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              Try adjusting your criteria or wait for new opportunities to be detected
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveBettingOpportunities;
