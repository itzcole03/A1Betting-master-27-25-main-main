import { useEffect, useState } from 'react'

interface KellyCalculatorResult {
  kelly_fraction: number
  recommended_bet: number
  expected_value: number
  win_probability: number
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH'
}

interface ArbitrageOpportunity {
  id: string
  event: string
  book1: { name: string; odds: number; price: number }
  book2: { name: string; odds: number; price: number }
  profit_margin: number
  total_stake: number
  guaranteed_profit: number
}

interface Portfolio {
  totalValue: number
  allocations: {
    sport: string
    allocation: number
    currentValue: number
    roi: number
  }[]
}

interface RiskMetrics {
  sharpeRatio: number
  maxDrawdown: number
  var95: number
  beta: number
  correlationMatrix: number[][]
}

interface BacktestResult {
  totalReturn: number
  annualizedReturn: number
  volatility: number
  maxDrawdown: number
  winRate: number
  trades: number
  profitFactor: number
}

export default function MoneyMakerPro() {
  const [kellyInputs, setKellyInputs] = useState({
    probability: 55,
    odds: -110,
    bankroll: 1000
  })
  const [kellyResult, setKellyResult] = useState<KellyCalculatorResult | null>(null)
  const [arbitrageOpps, setArbitrageOpps] = useState<ArbitrageOpportunity[]>([])
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null)
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null)
  const [activeTab, setActiveTab] = useState('kelly')
  const [loading, setLoading] = useState(false)

  // Advanced risk management settings
  const [riskSettings, setRiskSettings] = useState({
    maxPositionSize: 0.1, // 10% max per position
    maxDailyRisk: 0.02,   // 2% max daily risk
    stopLoss: 0.05,       // 5% stop loss
    takeProfit: 0.15,     // 15% take profit
    correlationLimit: 0.7, // Max correlation between positions
    diversificationMin: 5  // Minimum number of positions
  })

  // Portfolio optimization settings
  const [optimizationSettings, setOptimizationSettings] = useState({
    targetReturn: 0.15,    // 15% annual target
    riskTolerance: 0.12,   // 12% volatility tolerance
    rebalanceFreq: 'weekly',
    constraints: {
      minSportAllocation: 0.05, // 5% minimum per sport
      maxSportAllocation: 0.4   // 40% maximum per sport
    }
  })

  useEffect(() => {
    calculateKelly()
    loadArbitrageOpportunities()
    generatePortfolioData()
    calculateRiskMetrics()
    runBacktest()
  }, [kellyInputs])

  const calculateKelly = () => {
    const { probability, odds, bankroll } = kellyInputs
    const winProb = probability / 100
    const decimalOdds = odds > 0 ? (odds / 100) + 1 : (100 / Math.abs(odds)) + 1
    
    const b = decimalOdds - 1
    const q = 1 - winProb
    const kellyFraction = (b * winProb - q) / b
    
    const safeFraction = Math.max(0, Math.min(kellyFraction, riskSettings.maxPositionSize))
    const recommendedBet = bankroll * safeFraction
    const expectedValue = winProb * (decimalOdds - 1) - (1 - winProb)
    
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW'
    if (safeFraction > 0.05) riskLevel = 'MEDIUM'
    if (safeFraction > 0.1) riskLevel = 'HIGH'
    
    setKellyResult({
      kelly_fraction: kellyFraction,
      recommended_bet: Math.max(0, recommendedBet),
      expected_value: expectedValue,
      win_probability: winProb,
      risk_level: riskLevel
    })
  }

  const loadArbitrageOpportunities = () => {
    // Enhanced arbitrage with more sophisticated calculations
    const mockArbs: ArbitrageOpportunity[] = [
      {
        id: '1',
        event: 'Lakers vs Warriors',
        book1: { name: 'DraftKings', odds: 1.95, price: 500 },
        book2: { name: 'FanDuel', odds: 2.15, price: 450 },
        profit_margin: 0.025,
        total_stake: 950,
        guaranteed_profit: 23.75
      },
      {
        id: '2',
        event: 'Chiefs vs Bills',
        book1: { name: 'BetMGM', odds: 1.85, price: 600 },
        book2: { name: 'Caesars', odds: 2.05, price: 550 },
        profit_margin: 0.018,
        total_stake: 1150,
        guaranteed_profit: 20.70
      }
    ]
    setArbitrageOpps(mockArbs)
  }

  const generatePortfolioData = () => {
    const mockPortfolio: Portfolio = {
      totalValue: 25750.00,
      allocations: [
        { sport: 'NFL', allocation: 0.35, currentValue: 9012.50, roi: 0.18 },
        { sport: 'NBA', allocation: 0.28, currentValue: 7210.00, roi: 0.15 },
        { sport: 'MLB', allocation: 0.20, currentValue: 5150.00, roi: 0.12 },
        { sport: 'NHL', allocation: 0.12, currentValue: 3090.00, roi: 0.09 },
        { sport: 'Soccer', allocation: 0.05, currentValue: 1287.50, roi: 0.22 }
      ]
    }
    setPortfolio(mockPortfolio)
  }

  const calculateRiskMetrics = () => {
    const mockRisk: RiskMetrics = {
      sharpeRatio: 1.85,
      maxDrawdown: 0.082,
      var95: 0.035,
      beta: 0.92,
      correlationMatrix: [
        [1.0, 0.45, 0.32, 0.28, 0.15],
        [0.45, 1.0, 0.38, 0.35, 0.22],
        [0.32, 0.38, 1.0, 0.41, 0.18],
        [0.28, 0.35, 0.41, 1.0, 0.25],
        [0.15, 0.22, 0.18, 0.25, 1.0]
      ]
    }
    setRiskMetrics(mockRisk)
  }

  const runBacktest = () => {
    const mockBacktest: BacktestResult = {
      totalReturn: 0.247,
      annualizedReturn: 0.189,
      volatility: 0.125,
      maxDrawdown: 0.088,
      winRate: 0.678,
      trades: 1247,
      profitFactor: 1.94
    }
    setBacktestResult(mockBacktest)
  }

  const optimizePortfolio = () => {
    setLoading(true)
    // Simulate portfolio optimization
    setTimeout(() => {
      const optimizedAllocations = portfolio?.allocations.map(alloc => ({
        ...alloc,
        allocation: Math.max(
          optimizationSettings.constraints.minSportAllocation,
          Math.min(
            optimizationSettings.constraints.maxSportAllocation,
            alloc.allocation * (1 + (Math.random() - 0.5) * 0.2)
          )
        )
      }))
      
      if (portfolio && optimizedAllocations) {
        setPortfolio({
          ...portfolio,
          allocations: optimizedAllocations
        })
      }
      setLoading(false)
    }, 2000)
  }

  const getRiskColor = (riskLevel: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (riskLevel) {
      case 'LOW': return '#10b981'
      case 'MEDIUM': return '#f59e0b'
      case 'HIGH': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const tabs = [
    { id: 'kelly', label: '🧮 Kelly Calculator', icon: '⚡' },
    { id: 'arbitrage', label: '💰 Arbitrage Scanner', icon: '🔍' },
    { id: 'portfolio', label: '📊 Portfolio Optimizer', icon: '📈' },
    { id: 'risk', label: '⚠️ Risk Management', icon: '🛡️' },
    { id: 'backtest', label: '📉 Backtesting', icon: '🔬' }
  ]

  return (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          💎 MoneyMaker Pro Suite
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Advanced Betting Mathematics & Portfolio Optimization
        </p>
      </div>

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === tab.id 
                ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' 
                : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === tab.id ? '#000' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div style={{ 
        display: activeTab === 'kelly' ? 'block' : 'none',
        animation: 'fadeIn 0.5s'
      }}>
        {/* Kelly Calculator */}
        <div className="card">
          <h2 style={{ color: '#8b5cf6', marginBottom: '1.5rem' }}>
            🎯 Kelly Calculator
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e5e7eb' }}>
              Win Probability (%)
            </label>
            <input
              type="range"
              min="1"
              max="99"
              value={kellyInputs.probability}
              onChange={(e) => setKellyInputs(prev => ({ 
                ...prev, 
                probability: parseInt(e.target.value) 
              }))}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <span style={{ color: '#10b981', fontSize: '1.1rem' }}>
              {kellyInputs.probability}%
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e5e7eb' }}>
              Odds (American)
            </label>
            <input
              type="number"
              value={kellyInputs.odds}
              onChange={(e) => setKellyInputs(prev => ({ 
                ...prev, 
                odds: parseInt(e.target.value) 
              }))}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #374151',
                background: '#1f2937',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e5e7eb' }}>
              Bankroll ($)
            </label>
            <input
              type="number"
              value={kellyInputs.bankroll}
              onChange={(e) => setKellyInputs(prev => ({ 
                ...prev, 
                bankroll: parseFloat(e.target.value) 
              }))}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #374151',
                background: '#1f2937',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          {kellyResult && (
            <div style={{ 
              padding: '1.5rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Calculation Results</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ margin: '0.5rem 0' }}>
                    Kelly Fraction: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {(kellyResult.kelly_fraction * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Recommended Bet: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      ${kellyResult.recommended_bet.toFixed(2)}
                    </span>
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0.5rem 0' }}>
                    Expected Value: <span style={{ 
                      color: kellyResult.expected_value > 0 ? '#10b981' : '#ef4444',
                      fontWeight: 'bold' 
                    }}>
                      {(kellyResult.expected_value * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Risk Level: <span style={{ 
                      color: getRiskColor(kellyResult.risk_level),
                      fontWeight: 'bold' 
                    }}>
                      {kellyResult.risk_level}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        display: activeTab === 'arbitrage' ? 'block' : 'none',
        animation: 'fadeIn 0.5s'
      }}>
        {/* Arbitrage Scanner */}
        <div className="card">
          <h2 style={{ color: '#f59e0b', marginBottom: '1.5rem' }}>
            ⚡ Arbitrage Scanner
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={loadArbitrageOpportunities}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              🔄 Scan for Opportunities
            </button>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {arbitrageOpps.map(opp => (
              <div 
                key={opp.id} 
                style={{ 
                  padding: '1rem', 
                  background: '#1a1f2e', 
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: '1px solid #374151'
                }}
              >
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
                  {opp.event}
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}>
                      <strong>{opp.book1.name}:</strong> {opp.book1.odds > 0 ? '+' : ''}{opp.book1.odds}
                    </p>
                    <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}>
                      <strong>{opp.book2.name}:</strong> {opp.book2.odds > 0 ? '+' : ''}{opp.book2.odds}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}>
                      Profit: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                        {opp.profit_margin.toFixed(1)}%
                      </span>
                    </p>
                    <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}>
                      Guaranteed: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                        ${opp.guaranteed_profit}
                      </span>
                    </p>
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'linear-gradient(45deg, #1e40af, #10b981)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Calculate Stake Split
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ 
        display: activeTab === 'portfolio' ? 'block' : 'none',
        animation: 'fadeIn 0.5s'
      }}>
        {/* Portfolio Optimizer */}
        <div className="card">
          <h2 style={{ color: '#4ade80', marginBottom: '1.5rem' }}>
            📈 Portfolio Optimizer
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={optimizePortfolio}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                background: loading ? '#374151' : 'linear-gradient(45deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {loading ? '🔄 Optimizing...' : '⚙️ Optimize Portfolio'}
            </button>
          </div>

          {portfolio && (
            <div>
              <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>
                Total Portfolio Value: ${portfolio.totalValue.toFixed(2)}
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                {portfolio.allocations.map((alloc, index) => (
                  <div key={index} style={{ 
                    padding: '1rem', 
                    background: '#1a1f2e', 
                    borderRadius: '8px',
                    border: '1px solid #374151',
                    position: 'relative'
                  }}>
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        background: alloc.roi > 0 ? '#10b981' : '#ef4444',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {alloc.roi > 0 ? '+' : ''}{(alloc.roi * 100).toFixed(1)}%
                      </span>
                    </div>

                    <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>
                      {alloc.sport}
                    </h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                      Allocation: <strong>{(alloc.allocation * 100).toFixed(1)}%</strong>
                    </p>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                      Current Value: <strong>${alloc.currentValue.toFixed(2)}</strong>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '1rem' 
              }}>
                <div style={{ 
                  padding: '1rem', 
                  background: '#1a1f2e', 
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
                    Optimization Settings
                  </h4>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Target Return: <strong>{(optimizationSettings.targetReturn * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Risk Tolerance: <strong>{(optimizationSettings.riskTolerance * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Rebalance Frequency: <strong>{optimizationSettings.rebalanceFreq}</strong>
                  </p>
                </div>

                <div style={{ 
                  padding: '1rem', 
                  background: '#1a1f2e', 
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
                    Risk Management
                  </h4>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Max Position Size: <strong>{(riskSettings.maxPositionSize * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Max Daily Risk: <strong>${(riskSettings.maxDailyRisk * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Stop Loss: <strong>{(riskSettings.stopLoss * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Take Profit: <strong>{(riskSettings.takeProfit * 100).toFixed(1)}%</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        display: activeTab === 'risk' ? 'block' : 'none',
        animation: 'fadeIn 0.5s'
      }}>
        {/* Risk Management */}
        <div className="card">
          <h2 style={{ color: '#ef4444', marginBottom: '1.5rem' }}>
            ⚠️ Risk Management
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ 
              padding: '1rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
                Position Sizing
              </h4>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Max Position Size: <strong>{(riskSettings.maxPositionSize * 100).toFixed(1)}%</strong>
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Min Position Size: <strong>{(optimizationSettings.constraints.minSportAllocation * 100).toFixed(1)}%</strong>
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
                Daily Risk
              </h4>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Max Daily Risk: <strong>${(riskSettings.maxDailyRisk * 100).toFixed(1)}%</strong>
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
                Stop Loss / Take Profit
              </h4>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Stop Loss: <strong>{(riskSettings.stopLoss * 100).toFixed(1)}%</strong>
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Take Profit: <strong>{(riskSettings.takeProfit * 100).toFixed(1)}%</strong>
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
                Correlation & Diversification
              </h4>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Max Correlation: <strong>{riskSettings.correlationLimit}</strong>
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                Min Positions: <strong>{riskSettings.diversificationMin}</strong>
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1rem' 
          }}>
            <div style={{ 
              padding: '1rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
                Risk Metrics
              </h4>
              {riskMetrics ? (
                <div>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Sharpe Ratio: <strong>{riskMetrics.sharpeRatio.toFixed(2)}</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Max Drawdown: <strong>{(riskMetrics.maxDrawdown * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    VaR (95%): <strong>{(riskMetrics.var95 * 100).toFixed(1)}%</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    Beta: <strong>{riskMetrics.beta.toFixed(2)}</strong>
                  </p>
                </div>
              ) : (
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                  Loading risk metrics...
                </p>
              )}
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
                Correlation Matrix
              </h4>
              {riskMetrics && (
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {riskMetrics.correlationMatrix.map((row, i) => (
                    <div key={i} style={{ display: 'flex' }}>
                      {row.map((val, j) => (
                        <div key={j} style={{ 
                          flex: 1, 
                          padding: '0.25rem',
                          textAlign: 'center',
                          background: val > 0.5 ? '#10b981' : val > 0.2 ? '#f59e0b' : '#ef4444',
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '4px',
                          margin: '0 2px'
                        }}>
                          {val.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        display: activeTab === 'backtest' ? 'block' : 'none',
        animation: 'fadeIn 0.5s'
      }}>
        {/* Backtesting */}
        <div className="card">
          <h2 style={{ color: '#6366f1', marginBottom: '1.5rem' }}>
            📉 Backtesting
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={runBacktest}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              🔄 Run Backtest
            </button>
          </div>

          {backtestResult && (
            <div style={{ 
              padding: '1.5rem', 
              background: '#1a1f2e', 
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <h3 style={{ color: '#6366f1', marginBottom: '1rem' }}>Backtest Results</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ margin: '0.5rem 0' }}>
                    Total Return: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {(backtestResult.totalReturn * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Annualized Return: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {(backtestResult.annualizedReturn * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Volatility: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {(backtestResult.volatility * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Max Drawdown: <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
                      {(backtestResult.maxDrawdown * 100).toFixed(2)}%
                    </span>
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0.5rem 0' }}>
                    Win Rate: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {(backtestResult.winRate * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Trades: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {backtestResult.trades}
                    </span>
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    Profit Factor: <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {backtestResult.profitFactor.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: '#111827', 
        borderRadius: '8px',
        border: '1px solid #374151',
        textAlign: 'center',
        color: '#fff'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          &copy; 2023 MoneyMaker Pro. All rights reserved.
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
          Advanced betting tools for serious bettors.
        </p>
      </div>
    </div>
  )
}
