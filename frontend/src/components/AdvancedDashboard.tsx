import { useCallback, useEffect, useState } from 'react'
import { apiService, BettingAnalytics, PrizePicksProp } from '../services/api'
import MLPredictionEngine from './MLPredictionEngine'
import MoneyMakerPro from './MoneyMakerPro'
import RealTimeDataHub from './RealTimeDataHub'

interface LiveOdds {
  id: string
  sport: string
  event: string
  odds: {
    home: number
    away: number
    over: number
    under: number
  }
  timestamp: number
}

interface ArbitrageOpportunity {
  id: string
  sport: string
  event: string
  profit: number
  stakes: {
    book1: { name: string, bet: string, odds: number, stake: number }
    book2: { name: string, bet: string, odds: number, stake: number }
  }
  roi: number
}

interface RealTimeMetrics {
  totalProfitToday: number
  winRate: number
  activeOpportunities: number
  totalBetsPlaced: number
  averageOdds: number
  kellyOptimalBets: number
}

export default function AdvancedDashboard() {
  const [liveOdds, setLiveOdds] = useState<LiveOdds[]>([])
  const [arbitrageOpportunities, setArbitrageOpportunities] = useState<ArbitrageOpportunity[]>([])
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    totalProfitToday: 0,
    winRate: 0,
    activeOpportunities: 0,
    totalBetsPlaced: 0,
    averageOdds: 0,
    kellyOptimalBets: 0
  })
  const [prizePicksProps, setPrizePicksProps] = useState<PrizePicksProp[]>([])
  const [analytics, setAnalytics] = useState<BettingAnalytics | null>(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)

  // Data fetching
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const [odds, arbitrage, metrics, props, analyticsData] = await Promise.all([
        apiService.getLiveOdds(),
        apiService.getArbitrageOpportunities(),
        apiService.getRealTimeMetrics(),
        apiService.getPrizePicksProps(),
        apiService.getBettingAnalytics()
      ])
      
      setLiveOdds(odds)
      setArbitrageOpportunities(arbitrage)
      setRealTimeMetrics(metrics)
      setPrizePicksProps(props)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [fetchData])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'arbitrage', label: 'Arbitrage', icon: '⚡' },
    { id: 'prizepicks', label: 'PrizePicks', icon: '🎯' },
    { id: 'moneymaker', label: 'MoneyMaker Pro', icon: '💰' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'ml', label: 'ML Engine', icon: '🤖' },
    { id: 'realtime', label: 'Real-Time', icon: '🔴' },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Real-Time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">${realTimeMetrics.totalProfitToday.toFixed(2)}</div>
          <div className="text-sm opacity-80">Today's Profit</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">{(realTimeMetrics.winRate * 100).toFixed(1)}%</div>
          <div className="text-sm opacity-80">Win Rate</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">{realTimeMetrics.activeOpportunities}</div>
          <div className="text-sm opacity-80">Active Opportunities</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">{realTimeMetrics.totalBetsPlaced}</div>
          <div className="text-sm opacity-80">Bets Placed</div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">{realTimeMetrics.averageOdds.toFixed(2)}</div>
          <div className="text-sm opacity-80">Avg Odds</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">{realTimeMetrics.kellyOptimalBets}</div>
          <div className="text-sm opacity-80">Kelly Optimal</div>
        </div>
      </div>

      {/* Live Odds */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Live Odds</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Event</th>
                <th className="px-4 py-2 text-left">Home</th>
                <th className="px-4 py-2 text-left">Away</th>
                <th className="px-4 py-2 text-left">Over</th>
                <th className="px-4 py-2 text-left">Under</th>
                <th className="px-4 py-2 text-left">Updated</th>
              </tr>
            </thead>
            <tbody>
              {liveOdds.slice(0, 10).map((odds) => (
                <tr key={odds.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="font-semibold">{odds.event}</div>
                    <div className="text-sm text-gray-500">{odds.sport}</div>
                  </td>
                  <td className="px-4 py-2 font-bold text-green-600">{odds.odds.home}</td>
                  <td className="px-4 py-2 font-bold text-red-600">{odds.odds.away}</td>
                  <td className="px-4 py-2 font-bold text-blue-600">{odds.odds.over}</td>
                  <td className="px-4 py-2 font-bold text-purple-600">{odds.odds.under}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(odds.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arbitrage Opportunities */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Top Arbitrage Opportunities</h2>
        <div className="grid gap-4">
          {arbitrageOpportunities.slice(0, 5).map((opp) => (
            <div key={opp.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{opp.event}</h3>
                  <p className="text-sm text-gray-500">{opp.sport}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{opp.profit.toFixed(2)}%</div>
                  <div className="text-sm text-gray-500">ROI: {opp.roi.toFixed(1)}%</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-semibold">{opp.stakes.book1.name}</div>
                  <div>{opp.stakes.book1.bet} @ {opp.stakes.book1.odds}</div>
                  <div className="text-green-600">Stake: ${opp.stakes.book1.stake}</div>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <div className="font-semibold">{opp.stakes.book2.name}</div>
                  <div>{opp.stakes.book2.bet} @ {opp.stakes.book2.odds}</div>
                  <div className="text-green-600">Stake: ${opp.stakes.book2.stake}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderArbitrage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">All Arbitrage Opportunities</h2>
        <div className="grid gap-4">
          {arbitrageOpportunities.map((opp) => (
            <div key={opp.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{opp.event}</h3>
                  <p className="text-sm text-gray-500">{opp.sport}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{opp.profit.toFixed(2)}%</div>
                  <div className="text-sm text-gray-500">ROI: {opp.roi.toFixed(1)}%</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-semibold">{opp.stakes.book1.name}</div>
                  <div>{opp.stakes.book1.bet} @ {opp.stakes.book1.odds}</div>
                  <div className="text-green-600">Stake: ${opp.stakes.book1.stake}</div>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <div className="font-semibold">{opp.stakes.book2.name}</div>
                  <div>{opp.stakes.book2.bet} @ {opp.stakes.book2.odds}</div>
                  <div className="text-green-600">Stake: ${opp.stakes.book2.stake}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPrizePicks = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">PrizePicks Props</h2>
        <div className="grid gap-4">
          {prizePicksProps.map((prop) => (
            <div key={prop.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{prop.player}</h3>
                  <p className="text-sm text-gray-500">{prop.sport} - {prop.position}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{prop.stat}</div>
                  <div className="text-sm text-gray-500">Line: {prop.line}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-green-600">Over: {prop.overOdds}</span>
                  <span className="mx-2">|</span>
                  <span className="text-red-600">Under: {prop.underOdds}</span>
                </div>
                <div className="text-sm font-semibold">
                  Edge: {prop.edge ? (prop.edge > 0 ? '+' : '') + prop.edge.toFixed(1) + '%' : 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Total Profit</h3>
              <div className="text-3xl font-bold text-green-600">${analytics.totalProfit.toFixed(2)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">ROI</h3>
              <div className="text-3xl font-bold text-blue-600">{(analytics.roi * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Win Rate</h3>
              <div className="text-3xl font-bold text-purple-600">{(analytics.winRate * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Total Bets</h3>
              <div className="text-3xl font-bold text-orange-600">{analytics.totalBets}</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Performance</h3>
            <div className="space-y-2">
              {analytics.recentBets.map((bet, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-semibold">{bet.event}</span>
                    <span className="text-sm text-gray-500 ml-2">{bet.sport}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${bet.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {bet.profit > 0 ? '+' : ''}${bet.profit.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">{bet.odds}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'arbitrage':
        return renderArbitrage()
      case 'prizepicks':
        return renderPrizePicks()
      case 'moneymaker':
        return <MoneyMakerPro />
      case 'analytics':
        return renderAnalytics()
      case 'ml':
        return <MLPredictionEngine />
      case 'realtime':
        return <RealTimeDataHub />
      default:
        return renderDashboard()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold">Loading A1Betting Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">A1Betting</h1>
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                LIVE
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
