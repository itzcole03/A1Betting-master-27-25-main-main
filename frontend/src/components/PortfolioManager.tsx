import React, { useEffect, useState } from 'react';

interface PortfolioBet {
  id: string;
  sport: string;
  league: string;
  teams: string;
  market: string;
  betType: 'single' | 'parlay' | 'system';
  stake: number;
  odds: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost' | 'void' | 'cashout';
  placedAt: Date;
  settledAt?: Date;
  confidence: number;
  expectedValue: number;
  bookmaker: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface BankrollMetrics {
  totalBalance: number;
  availableBalance: number;
  totalStaked: number;
  totalWon: number;
  totalLost: number;
  netProfit: number;
  roi: number;
  winRate: number;
  averageOdds: number;
  sharpeRatio: number;
  maxDrawdown: number;
  kellyOptimal: number;
}

interface RiskProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  maxBetSize: number;
  maxDailyRisk: number;
  diversificationRules: Array<{ rule: string; limit: number }>;
  stopLossLimit: number;
  profitTarget: number;
}

const portfolioManagerStyles = `
  .portfolio-manager {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(20px) saturate(180%);
    margin-bottom: 20px;
  }

  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--glass-border);
  }

  .manager-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--cyber-primary);
    font-size: 1.3rem;
    font-weight: 600;
  }

  .portfolio-controls {
    display: flex;
    gap: 10px;
  }

  .portfolio-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 25px;
  }

  .overview-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .overview-card:hover {
    border-color: var(--cyber-primary);
    transform: translateY(-2px);
  }

  .overview-card.profit {
    border-left: 4px solid var(--cyber-secondary);
  }

  .overview-card.loss {
    border-left: 4px solid var(--cyber-pink);
  }

  .overview-card.neutral {
    border-left: 4px solid var(--cyber-accent);
  }

  .overview-value {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .overview-value.positive {
    color: var(--cyber-secondary);
  }

  .overview-value.negative {
    color: var(--cyber-pink);
  }

  .overview-value.neutral {
    color: var(--cyber-primary);
  }

  .overview-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  .overview-change {
    font-size: 0.8rem;
    font-weight: 500;
  }

  .overview-change.positive {
    color: var(--cyber-secondary);
  }

  .overview-change.negative {
    color: var(--cyber-pink);
  }

  .risk-gauge-container {
    background: rgba(6, 255, 165, 0.05);
    border: 1px solid rgba(6, 255, 165, 0.2);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .risk-gauge-title {
    color: var(--cyber-primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .risk-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .risk-metric {
    text-align: center;
  }

  .risk-value {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .risk-value.low {
    color: var(--cyber-secondary);
  }

  .risk-value.medium {
    color: var(--cyber-orange);
  }

  .risk-value.high {
    color: var(--cyber-pink);
  }

  .risk-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
  }

  .bets-section {
    margin-top: 20px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .section-title {
    color: var(--cyber-primary);
    font-size: 1.1rem;
    font-weight: 600;
  }

  .bets-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  .filter-btn {
    padding: 6px 12px;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-btn.active {
    background: linear-gradient(45deg, var(--cyber-primary), var(--cyber-secondary));
    color: var(--cyber-dark);
    border-color: var(--cyber-primary);
  }

  .filter-btn:hover {
    border-color: var(--cyber-primary);
    color: var(--cyber-primary);
  }

  .bets-grid {
    display: grid;
    gap: 12px;
  }

  .bet-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s ease;
  }

  .bet-item:hover {
    border-color: var(--cyber-primary);
    transform: translateY(-1px);
  }

  .bet-item.won {
    border-left: 4px solid var(--cyber-secondary);
    background: rgba(67, 170, 139, 0.05);
  }

  .bet-item.lost {
    border-left: 4px solid var(--cyber-pink);
    background: rgba(247, 37, 133, 0.05);
  }

  .bet-item.pending {
    border-left: 4px solid var(--cyber-accent);
    background: rgba(0, 212, 255, 0.05);
  }

  .bet-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .bet-info {
    flex: 1;
  }

  .bet-teams {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .bet-details {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .bet-status {
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .bet-status.won {
    background: rgba(67, 170, 139, 0.2);
    color: var(--cyber-secondary);
  }

  .bet-status.lost {
    background: rgba(247, 37, 133, 0.2);
    color: var(--cyber-pink);
  }

  .bet-status.pending {
    background: rgba(0, 212, 255, 0.2);
    color: var(--cyber-accent);
  }

  .bet-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
    margin-top: 12px;
  }

  .bet-metric {
    text-align: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }

  .bet-metric-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.7rem;
    margin-bottom: 2px;
  }

  .bet-metric-value {
    color: var(--cyber-primary);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .kelly-calculator {
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-top: 20px;
  }

  .kelly-title {
    color: var(--cyber-purple);
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .kelly-inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin-bottom: 12px;
  }

  .kelly-input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .kelly-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.8rem;
  }

  .kelly-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    padding: 6px 10px;
    color: white;
    font-size: 0.9rem;
  }

  .kelly-result {
    text-align: center;
    padding: 10px;
    background: rgba(124, 58, 237, 0.2);
    border-radius: 8px;
  }

  .kelly-recommendation {
    color: var(--cyber-purple);
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export const PortfolioManager: React.FC = () => {
  const [bankrollMetrics, setBankrollMetrics] = useState<BankrollMetrics>({
    totalBalance: 10000,
    availableBalance: 7350,
    totalStaked: 2650,
    totalWon: 3847,
    totalLost: 1563,
    netProfit: 2284,
    roi: 22.84,
    winRate: 67.3,
    averageOdds: 2.14,
    sharpeRatio: 1.87,
    maxDrawdown: -8.4,
    kellyOptimal: 4.2
  });

  const [activeBets, setActiveBets] = useState<PortfolioBet[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [kellyInputs, setKellyInputs] = useState({
    odds: 2.0,
    winProbability: 50,
    bankroll: 10000
  });

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = () => {
    const mockBets: PortfolioBet[] = [
      {
        id: '1',
        sport: 'Basketball',
        league: 'NBA',
        teams: 'Lakers vs Warriors',
        market: 'Moneyline',
        betType: 'single',
        stake: 250,
        odds: 2.1,
        potentialWin: 525,
        status: 'pending',
        placedAt: new Date(Date.now() - 3600000),
        confidence: 87,
        expectedValue: 4.7,
        bookmaker: 'DraftKings',
        riskLevel: 'medium'
      },
      {
        id: '2',
        sport: 'Football',
        league: 'NFL',
        teams: 'Chiefs vs Bills',
        market: 'Over 47.5',
        betType: 'single',
        stake: 150,
        odds: 1.95,
        potentialWin: 292.5,
        status: 'won',
        placedAt: new Date(Date.now() - 86400000),
        settledAt: new Date(Date.now() - 3600000),
        confidence: 92,
        expectedValue: 7.2,
        bookmaker: 'FanDuel',
        riskLevel: 'low'
      },
      {
        id: '3',
        sport: 'Hockey',
        league: 'NHL',
        teams: 'Bruins vs Rangers',
        market: 'Puck Line -1.5',
        betType: 'single',
        stake: 100,
        odds: 2.4,
        potentialWin: 240,
        status: 'lost',
        placedAt: new Date(Date.now() - 172800000),
        settledAt: new Date(Date.now() - 86400000),
        confidence: 73,
        expectedValue: 3.1,
        bookmaker: 'BetMGM',
        riskLevel: 'high'
      }
    ];

    setActiveBets(mockBets);
  };

  const calculateKellyBet = () => {
    const { odds, winProbability, bankroll } = kellyInputs;
    const decimalOdds = odds;
    const winProb = winProbability / 100;
    const loseProb = 1 - winProb;
    
    // Kelly Criterion: f = (bp - q) / b
    // where b = odds - 1, p = win probability, q = lose probability
    const b = decimalOdds - 1;
    const kellyFraction = (b * winProb - loseProb) / b;
    const kellyAmount = Math.max(0, kellyFraction * bankroll);
    
    return {
      fraction: kellyFraction * 100,
      amount: kellyAmount,
      recommendation: kellyAmount > 0 ? 'BET' : 'SKIP'
    };
  };

  const filteredBets = activeBets.filter(bet => {
    if (selectedFilter === 'all') return true;
    return bet.status === selectedFilter;
  });

  const getBetStatusColor = (status: PortfolioBet['status']) => {
    switch (status) {
      case 'won': return 'var(--cyber-secondary)';
      case 'lost': return 'var(--cyber-pink)';
      case 'pending': return 'var(--cyber-accent)';
      default: return 'rgba(255, 255, 255, 0.7)';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'var(--cyber-secondary)';
      case 'medium': return 'var(--cyber-orange)';
      case 'high': return 'var(--cyber-pink)';
      default: return 'var(--cyber-primary)';
    }
  };

  const kellyResult = calculateKellyBet();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: portfolioManagerStyles }} />
      
      <div className="portfolio-manager">
        <div className="manager-header">
          <div className="manager-title">
            <span>💰</span>
            <span>Portfolio & Bankroll Manager</span>
          </div>
          <div className="portfolio-controls">
            <button className="control-btn primary">
              <span>📊</span>
              <span>Analytics</span>
            </button>
            <button className="control-btn secondary">
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="portfolio-overview">
          <div className={`overview-card ${bankrollMetrics.netProfit >= 0 ? 'profit' : 'loss'}`}>
            <div className="overview-label">Total Balance</div>
            <div className={`overview-value ${bankrollMetrics.netProfit >= 0 ? 'positive' : 'negative'}`}>
              ${bankrollMetrics.totalBalance.toLocaleString()}
            </div>
            <div className={`overview-change ${bankrollMetrics.netProfit >= 0 ? 'positive' : 'negative'}`}>
              {bankrollMetrics.netProfit >= 0 ? '+' : ''}${bankrollMetrics.netProfit.toFixed(0)}
            </div>
          </div>

          <div className="overview-card neutral">
            <div className="overview-label">Available Balance</div>
            <div className="overview-value neutral">
              ${bankrollMetrics.availableBalance.toLocaleString()}
            </div>
            <div className="overview-change neutral">
              {((bankrollMetrics.availableBalance / bankrollMetrics.totalBalance) * 100).toFixed(1)}% available
            </div>
          </div>

          <div className="overview-card profit">
            <div className="overview-label">ROI</div>
            <div className={`overview-value ${bankrollMetrics.roi >= 0 ? 'positive' : 'negative'}`}>
              {bankrollMetrics.roi >= 0 ? '+' : ''}{bankrollMetrics.roi.toFixed(1)}%
            </div>
            <div className={`overview-change ${bankrollMetrics.roi >= 0 ? 'positive' : 'negative'}`}>
              Sharpe: {bankrollMetrics.sharpeRatio.toFixed(2)}
            </div>
          </div>

          <div className="overview-card profit">
            <div className="overview-label">Win Rate</div>
            <div className="overview-value positive">
              {bankrollMetrics.winRate.toFixed(1)}%
            </div>
            <div className="overview-change positive">
              Avg Odds: {bankrollMetrics.averageOdds.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Risk Gauge */}
        <div className="risk-gauge-container">
          <div className="risk-gauge-title">
            <span>🛡️</span>
            <span>Risk Management Dashboard</span>
          </div>
          <div className="risk-metrics">
            <div className="risk-metric">
              <div className="risk-value low">LOW</div>
              <div className="risk-label">Current Risk Level</div>
            </div>
            <div className="risk-metric">
              <div className="risk-value medium">{bankrollMetrics.maxDrawdown.toFixed(1)}%</div>
              <div className="risk-label">Max Drawdown</div>
            </div>
            <div className="risk-metric">
              <div className="risk-value low">{bankrollMetrics.kellyOptimal.toFixed(1)}%</div>
              <div className="risk-label">Kelly Optimal</div>
            </div>
            <div className="risk-metric">
              <div className="risk-value low">3.2%</div>
              <div className="risk-label">Risk per Bet</div>
            </div>
          </div>
        </div>

        {/* Kelly Calculator */}
        <div className="kelly-calculator">
          <div className="kelly-title">
            <span>🧮</span>
            <span>Kelly Criterion Calculator</span>
          </div>
          <div className="kelly-inputs">
            <div className="kelly-input-group">
              <label className="kelly-label">Odds</label>
              <input
                type="number"
                className="kelly-input"
                value={kellyInputs.odds}
                onChange={(e) => setKellyInputs({...kellyInputs, odds: Number(e.target.value)})}
                step="0.1"
                min="1"
              />
            </div>
            <div className="kelly-input-group">
              <label className="kelly-label">Win % Probability</label>
              <input
                type="number"
                className="kelly-input"
                value={kellyInputs.winProbability}
                onChange={(e) => setKellyInputs({...kellyInputs, winProbability: Number(e.target.value)})}
                min="0"
                max="100"
              />
            </div>
            <div className="kelly-input-group">
              <label className="kelly-label">Bankroll</label>
              <input
                type="number"
                className="kelly-input"
                value={kellyInputs.bankroll}
                onChange={(e) => setKellyInputs({...kellyInputs, bankroll: Number(e.target.value)})}
                step="100"
                min="0"
              />
            </div>
          </div>
          <div className="kelly-result">
            <div className="kelly-recommendation">
              {kellyResult.recommendation}: ${kellyResult.amount.toFixed(0)} ({kellyResult.fraction.toFixed(1)}% of bankroll)
            </div>
          </div>
        </div>

        {/* Active Bets */}
        <div className="bets-section">
          <div className="section-header">
            <div className="section-title">Portfolio Positions</div>
          </div>
          
          <div className="bets-filters">
            {['all', 'pending', 'won', 'lost'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="bets-grid">
            {filteredBets.map(bet => (
              <div key={bet.id} className={`bet-item ${bet.status}`}>
                <div className="bet-header">
                  <div className="bet-info">
                    <div className="bet-teams">{bet.teams}</div>
                    <div className="bet-details">
                      {bet.league} • {bet.market} • {bet.bookmaker}
                    </div>
                  </div>
                  <div className={`bet-status ${bet.status}`}>
                    {bet.status}
                  </div>
                </div>

                <div className="bet-metrics">
                  <div className="bet-metric">
                    <div className="bet-metric-label">Stake</div>
                    <div className="bet-metric-value">${bet.stake}</div>
                  </div>
                  <div className="bet-metric">
                    <div className="bet-metric-label">Odds</div>
                    <div className="bet-metric-value">{bet.odds.toFixed(2)}</div>
                  </div>
                  <div className="bet-metric">
                    <div className="bet-metric-label">Potential</div>
                    <div className="bet-metric-value">${bet.potentialWin.toFixed(0)}</div>
                  </div>
                  <div className="bet-metric">
                    <div className="bet-metric-label">Confidence</div>
                    <div className="bet-metric-value">{bet.confidence}%</div>
                  </div>
                  <div className="bet-metric">
                    <div className="bet-metric-label">EV</div>
                    <div className="bet-metric-value">+{bet.expectedValue.toFixed(1)}%</div>
                  </div>
                  <div className="bet-metric">
                    <div className="bet-metric-label">Risk</div>
                    <div className="bet-metric-value" style={{ color: getRiskColor(bet.riskLevel) }}>
                      {bet.riskLevel.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioManager;
