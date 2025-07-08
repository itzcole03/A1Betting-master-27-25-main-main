import React, { useEffect, useMemo, useState } from 'react';

interface AdvancedArbitrageScannerProps {
  opportunities: any[];
  realTimeData: any;
}

const AdvancedArbitrageScanner: React.FC<AdvancedArbitrageScannerProps> = ({ 
  opportunities = [], 
  realTimeData 
}) => {
  const [filterSport, setFilterSport] = useState('all');
  const [filterProfit, setFilterProfit] = useState(0);
  const [sortBy, setSortBy] = useState('profit');
  const [scanningStatus, setScanningStatus] = useState('active');
  const [liveOpportunities, setLiveOpportunities] = useState(opportunities);

  // Simulated real-time opportunities
  useEffect(() => {
    const simulatedOpportunities = [
      {
        id: 'arb_001',
        sport: 'NBA',
        game: 'Lakers vs Warriors',
        homeTeam: 'Lakers',
        awayTeam: 'Warriors',
        type: 'moneyline',
        profit: 127.43,
        profitMargin: 4.2,
        totalStake: 3000,
        guaranteedProfit: 127.43,
        expiresAt: new Date(Date.now() + 300000).toISOString(),
        riskLevel: 'low',
        confidence: 94,
        books: [
          { sportsbook: 'DraftKings', side: 'Lakers', odds: -110, stake: 1500 },
          { sportsbook: 'FanDuel', side: 'Warriors', odds: +120, stake: 1500 }
        ]
      },
      {
        id: 'arb_002',
        sport: 'NFL',
        game: 'Chiefs vs Bills',
        homeTeam: 'Chiefs',
        awayTeam: 'Bills',
        type: 'spread',
        profit: 89.21,
        profitMargin: 2.8,
        totalStake: 3200,
        guaranteedProfit: 89.21,
        expiresAt: new Date(Date.now() + 180000).toISOString(),
        riskLevel: 'medium',
        confidence: 87,
        books: [
          { sportsbook: 'BetMGM', side: 'Chiefs -3', odds: -105, stake: 1600 },
          { sportsbook: 'Caesars', side: 'Bills +3', odds: -102, stake: 1600 }
        ]
      },
      {
        id: 'arb_003',
        sport: 'Soccer',
        game: 'Real Madrid vs Barcelona',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        type: 'total',
        profit: 203.67,
        profitMargin: 5.1,
        totalStake: 4000,
        guaranteedProfit: 203.67,
        expiresAt: new Date(Date.now() + 420000).toISOString(),
        riskLevel: 'low',
        confidence: 91,
        books: [
          { sportsbook: 'Bet365', side: 'Over 2.5', odds: +105, stake: 2000 },
          { sportsbook: 'PointsBet', side: 'Under 2.5', odds: -98, stake: 2000 }
        ]
      }
    ];
    
    setLiveOpportunities(simulatedOpportunities);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveOpportunities(prev => 
        prev.map(opp => ({
          ...opp,
          profit: opp.profit + (Math.random() - 0.5) * 10,
          profitMargin: opp.profitMargin + (Math.random() - 0.5) * 0.5,
          confidence: Math.max(75, Math.min(99, opp.confidence + (Math.random() - 0.5) * 5))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredOpportunities = useMemo(() => {
    return liveOpportunities
      .filter(opp => filterSport === 'all' || opp.sport === filterSport)
      .filter(opp => opp.profit >= filterProfit)
      .sort((a, b) => {
        switch (sortBy) {
          case 'profit':
            return b.profit - a.profit;
          case 'margin':
            return b.profitMargin - a.profitMargin;
          case 'confidence':
            return b.confidence - a.confidence;
          case 'expires':
            return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
          default:
            return 0;
        }
      });
  }, [liveOpportunities, filterSport, filterProfit, sortBy]);

  const stats = useMemo(() => {
    return {
      totalOpportunities: filteredOpportunities.length,
      totalProfit: filteredOpportunities.reduce((sum, opp) => sum + opp.profit, 0),
      averageMargin: filteredOpportunities.length > 0 
        ? filteredOpportunities.reduce((sum, opp) => sum + opp.profitMargin, 0) / filteredOpportunities.length 
        : 0,
      highConfidence: filteredOpportunities.filter(opp => opp.confidence > 90).length
    };
  }, [filteredOpportunities]);

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date().getTime();
    const expires = new Date(expiresAt).getTime();
    const diff = expires - now;
    
    if (diff <= 0) return 'EXPIRED';
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="advanced-arbitrage-scanner">
      <style jsx>{`
        .advanced-arbitrage-scanner {
          padding: 20px;
          color: white;
        }

        .scanner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(20px) saturate(180%);
        }

        .scanner-title {
          font-size: 1.8rem;
          font-weight: bold;
          background: linear-gradient(45deg, #06ffa5, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .scanning-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(6, 255, 165, 0.1);
          border: 1px solid rgba(6, 255, 165, 0.3);
          border-radius: 25px;
          font-size: 0.9rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #06ffa5;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .controls-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .control-input, .control-select {
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .control-input:focus, .control-select:focus {
          outline: none;
          border-color: #06ffa5;
          box-shadow: 0 0 15px rgba(6, 255, 165, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(20px) saturate(180%);
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(6, 255, 165, 0.05);
          border-color: rgba(6, 255, 165, 0.2);
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(45deg, #06ffa5, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 5px;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .opportunities-grid {
          display: grid;
          gap: 20px;
        }

        .opportunity-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(20px) saturate(180%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .opportunity-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(45deg, #06ffa5, #00d4ff);
        }

        .opportunity-card:hover {
          background: rgba(6, 255, 165, 0.05);
          border-color: rgba(6, 255, 165, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(6, 255, 165, 0.2);
        }

        .opportunity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .game-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sport-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(6, 255, 165, 0.2);
          color: #06ffa5;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .game-title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-top: 8px;
        }

        .opportunity-type {
          background: rgba(124, 58, 237, 0.2);
          color: #a855f7;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .profit-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(6, 255, 165, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(6, 255, 165, 0.2);
        }

        .profit-item {
          text-align: center;
        }

        .profit-value {
          font-size: 1.4rem;
          font-weight: bold;
          color: #06ffa5;
          margin-bottom: 2px;
        }

        .profit-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .books-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .book-card {
          padding: 15px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
        }

        .book-name {
          font-weight: bold;
          margin-bottom: 5px;
          color: #00d4ff;
        }

        .book-bet {
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .book-odds {
          font-size: 1.1rem;
          font-weight: bold;
          color: #06ffa5;
          margin-bottom: 5px;
        }

        .book-stake {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .opportunity-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .time-remaining {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .time-value {
          font-weight: bold;
          color: #f72585;
        }

        .confidence-meter {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .confidence-bar {
          width: 60px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: linear-gradient(90deg, #f72585, #06ffa5);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .risk-badge {
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .risk-low {
          background: rgba(67, 170, 139, 0.2);
          color: #43aa8b;
        }

        .risk-medium {
          background: rgba(255, 107, 53, 0.2);
          color: #ff6b35;
        }

        .risk-high {
          background: rgba(247, 37, 133, 0.2);
          color: #f72585;
        }

        .execute-button {
          padding: 10px 20px;
          background: linear-gradient(45deg, #06ffa5, #00ff88);
          color: #0f172a;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .execute-button:hover {
          background: linear-gradient(45deg, #00ff88, #06ffa5);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(6, 255, 165, 0.4);
        }

        .no-opportunities {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.1rem;
        }

        .scanning-animation {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(6, 255, 165, 0.3);
          border-top: 3px solid #06ffa5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="scanner-header">
        <h1 className="scanner-title">⚡ Advanced Arbitrage Scanner</h1>
        <div className="scanning-status">
          <div className="status-indicator"></div>
          <span>Live Scanning</span>
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label className="control-label">Sport Filter</label>
          <select 
            className="control-select"
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
          >
            <option value="all">All Sports</option>
            <option value="NBA">NBA</option>
            <option value="NFL">NFL</option>
            <option value="NHL">NHL</option>
            <option value="MLB">MLB</option>
            <option value="Soccer">Soccer</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Minimum Profit ($)</label>
          <input 
            type="number"
            className="control-input"
            value={filterProfit}
            onChange={(e) => setFilterProfit(Number(e.target.value))}
            min="0"
            step="10"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Sort By</label>
          <select 
            className="control-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="profit">Highest Profit</option>
            <option value="margin">Highest Margin</option>
            <option value="confidence">Highest Confidence</option>
            <option value="expires">Expires Soon</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalOpportunities}</div>
          <div className="stat-label">Active Opportunities</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${stats.totalProfit.toFixed(2)}</div>
          <div className="stat-label">Total Available Profit</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.averageMargin.toFixed(1)}%</div>
          <div className="stat-label">Average Margin</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.highConfidence}</div>
          <div className="stat-label">High Confidence (90%+)</div>
        </div>
      </div>

      <div className="opportunities-grid">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="opportunity-card">
              <div className="opportunity-header">
                <div className="game-info">
                  <span className="sport-badge">{opportunity.sport}</span>
                  <h3 className="game-title">{opportunity.game}</h3>
                </div>
                <div className="opportunity-type">{opportunity.type}</div>
              </div>

              <div className="profit-section">
                <div className="profit-item">
                  <div className="profit-value">${opportunity.profit.toFixed(2)}</div>
                  <div className="profit-label">Profit</div>
                </div>
                <div className="profit-item">
                  <div className="profit-value">{opportunity.profitMargin.toFixed(1)}%</div>
                  <div className="profit-label">Margin</div>
                </div>
                <div className="profit-item">
                  <div className="profit-value">${opportunity.totalStake}</div>
                  <div className="profit-label">Total Stake</div>
                </div>
                <div className="profit-item">
                  <div className="profit-value">{opportunity.confidence}%</div>
                  <div className="profit-label">Confidence</div>
                </div>
              </div>

              <div className="books-section">
                {opportunity.books.map((book: any, index: number) => (
                  <div key={index} className="book-card">
                    <div className="book-name">{book.sportsbook}</div>
                    <div className="book-bet">{book.side}</div>
                    <div className="book-odds">{book.odds > 0 ? '+' : ''}{book.odds}</div>
                    <div className="book-stake">Stake: ${book.stake}</div>
                  </div>
                ))}
              </div>

              <div className="opportunity-footer">
                <div className="time-remaining">
                  <span>⏰</span>
                  <span>Expires: </span>
                  <span className="time-value">{formatTimeRemaining(opportunity.expiresAt)}</span>
                </div>
                
                <div className="confidence-meter">
                  <span>Confidence:</span>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${opportunity.confidence}%` }}
                    ></div>
                  </div>
                  <span>{opportunity.confidence}%</span>
                </div>

                <div className={`risk-badge risk-${opportunity.riskLevel}`}>
                  {opportunity.riskLevel} Risk
                </div>

                <button className="execute-button">
                  Execute Arbitrage
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-opportunities">
            <div className="scanning-animation"></div>
            <div>Scanning for arbitrage opportunities...</div>
            <div>No opportunities match your current filters.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedArbitrageScanner;
