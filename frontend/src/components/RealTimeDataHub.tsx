import { useEffect, useRef, useState } from 'react'

interface LiveMarketData {
  id: string
  sport: string
  event: string
  market: string
  odds: {
    back: number
    lay: number
    volume: number
  }
  timestamp: number
  change: number
}

interface LiveUpdate {
  type: 'odds_update' | 'market_closed' | 'arbitrage_alert' | 'kelly_signal'
  data: any
  timestamp: number
}

interface WebSocketStatus {
  connected: boolean
  lastPing: number
  reconnectAttempts: number
  dataReceived: number
}

export default function RealTimeDataHub() {
  const [marketData, setMarketData] = useState<LiveMarketData[]>([])
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([])
  const [wsStatus, setWsStatus] = useState<WebSocketStatus>({
    connected: false,
    lastPing: 0,
    reconnectAttempts: 0,
    dataReceived: 0
  })
  const [selectedSports, setSelectedSports] = useState<string[]>(['NBA', 'NFL', 'MLB'])
  const [alertSettings, setAlertSettings] = useState({
    arbitrageThreshold: 2.0, // 2% minimum profit
    kellyThreshold: 0.02,    // 2% Kelly fraction minimum
    oddsChangeThreshold: 0.05 // 5% odds change alert
  })

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    connectWebSocket()
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  const connectWebSocket = () => {
    try {
      // In a real implementation, this would connect to your WebSocket server
      // For demo purposes, we'll simulate WebSocket behavior
      simulateWebSocketConnection()
    } catch (error) {
      console.error('WebSocket connection failed:', error)
      scheduleReconnect()
    }
  }

  const simulateWebSocketConnection = () => {
    setWsStatus(prev => ({ ...prev, connected: true, reconnectAttempts: 0 }))
    
    // Simulate receiving live data
    const interval = setInterval(() => {
      const mockUpdate = generateMockUpdate()
      processLiveUpdate(mockUpdate)
      
      setWsStatus(prev => ({ 
        ...prev, 
        lastPing: Date.now(),
        dataReceived: prev.dataReceived + 1 
      }))
    }, 2000)

    // Store interval reference for cleanup
    wsRef.current = { close: () => clearInterval(interval) } as any
  }

  const generateMockUpdate = (): LiveUpdate => {
    const sports = ['NBA', 'NFL', 'MLB', 'NHL', 'Soccer']
    const events = [
      'Lakers vs Warriors', 'Chiefs vs Bills', 'Yankees vs Red Sox',
      'Rangers vs Bruins', 'Barcelona vs Real Madrid'
    ]
    
    const updateTypes: LiveUpdate['type'][] = ['odds_update', 'arbitrage_alert', 'kelly_signal']
    const type = updateTypes[Math.floor(Math.random() * updateTypes.length)]
    
    switch (type) {
      case 'odds_update':
        return {
          type: 'odds_update',
          data: {
            id: `market-${Date.now()}`,
            sport: sports[Math.floor(Math.random() * sports.length)],
            event: events[Math.floor(Math.random() * events.length)],
            market: 'Moneyline',
            odds: {
              back: +(1.5 + Math.random() * 2).toFixed(2),
              lay: +(1.52 + Math.random() * 2).toFixed(2),
              volume: Math.floor(10000 + Math.random() * 50000)
            },
            change: +((Math.random() - 0.5) * 0.2).toFixed(3)
          },
          timestamp: Date.now()
        }
      
      case 'arbitrage_alert':
        return {
          type: 'arbitrage_alert',
          data: {
            event: events[Math.floor(Math.random() * events.length)],
            profit: +(2 + Math.random() * 5).toFixed(2),
            duration: Math.floor(30 + Math.random() * 120) // seconds
          },
          timestamp: Date.now()
        }
      
      case 'kelly_signal':
        return {
          type: 'kelly_signal',
          data: {
            event: events[Math.floor(Math.random() * events.length)],
            kellyFraction: +(0.02 + Math.random() * 0.08).toFixed(3),
            confidence: +(0.65 + Math.random() * 0.25).toFixed(2)
          },
          timestamp: Date.now()
        }
      
      default:
        return {
          type: 'odds_update',
          data: {},
          timestamp: Date.now()
        }
    }
  }

  const processLiveUpdate = (update: LiveUpdate) => {
    setLiveUpdates(prev => [update, ...prev.slice(0, 49)]) // Keep last 50 updates
    
    if (update.type === 'odds_update') {
      const marketUpdate: LiveMarketData = {
        ...update.data,
        timestamp: update.timestamp
      }
      
      setMarketData(prev => {
        const existing = prev.find(m => m.id === marketUpdate.id)
        if (existing) {
          return prev.map(m => m.id === marketUpdate.id ? marketUpdate : m)
        } else {
          return [marketUpdate, ...prev.slice(0, 19)] // Keep last 20 markets
        }
      })
    }
  }

  const scheduleReconnect = () => {
    setWsStatus(prev => ({ 
      ...prev, 
      connected: false,
      reconnectAttempts: prev.reconnectAttempts + 1 
    }))
    
    const delay = Math.min(1000 * Math.pow(2, wsStatus.reconnectAttempts), 30000)
    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket()
    }, delay)
  }

  const getStatusColor = () => {
    if (!wsStatus.connected) return '#ef4444'
    if (Date.now() - wsStatus.lastPing > 10000) return '#f59e0b'
    return '#10b981'
  }

  const getUpdateIcon = (type: LiveUpdate['type']) => {
    switch (type) {
      case 'odds_update': return '📊'
      case 'arbitrage_alert': return '💰'
      case 'kelly_signal': return '🎯'
      default: return '📡'
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(45deg, #00ff88, #0099ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          📡 Real-Time Data Hub
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Live Market Data & Automated Alerts
        </p>
      </div>

      {/* Status Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1e1e, #2d2d2d)',
        padding: '1rem 2rem',
        borderRadius: '12px',
        border: '1px solid #333',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(),
              animation: wsStatus.connected ? 'pulse 2s infinite' : 'none'
            }} />
            <span style={{ color: getStatusColor(), fontWeight: 'bold' }}>
              {wsStatus.connected ? 'LIVE' : 'DISCONNECTED'}
            </span>
          </div>
          <span style={{ color: '#888' }}>|</span>
          <span style={{ color: '#fff' }}>
            Updates: {wsStatus.dataReceived}
          </span>
          <span style={{ color: '#888' }}>|</span>
          <span style={{ color: '#fff' }}>
            Last Ping: {wsStatus.lastPing ? formatTimestamp(wsStatus.lastPing) : 'N/A'}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => connectWebSocket()}
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(45deg, #00ff88, #0099ff)',
              border: 'none',
              borderRadius: '6px',
              color: '#000',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 Reconnect
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '2rem' 
      }}>
        {/* Live Market Data */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1e1e, #2d2d2d)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>📊 Live Markets</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {marketData.map(market => (
              <div key={market.id} style={{
                background: '#333',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #555'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{market.sport}</span>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>
                    {formatTimestamp(market.timestamp)}
                  </span>
                </div>
                <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {market.event}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>Back</div>
                    <div style={{ color: '#0099ff', fontWeight: 'bold' }}>{market.odds.back}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>Lay</div>
                    <div style={{ color: '#ff6b6b', fontWeight: 'bold' }}>{market.odds.lay}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>Volume</div>
                    <div style={{ color: '#fff', fontWeight: 'bold' }}>
                      ${market.odds.volume.toLocaleString()}
                    </div>
                  </div>
                </div>
                {market.change !== 0 && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    textAlign: 'center',
                    color: market.change > 0 ? '#10b981' : '#ef4444',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {market.change > 0 ? '↗' : '↘'} {Math.abs(market.change * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Updates Feed */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1e1e, #2d2d2d)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#0099ff', marginBottom: '1.5rem' }}>🔔 Live Updates</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {liveUpdates.map((update, index) => (
              <div key={index} style={{
                background: '#333',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                border: '1px solid #555',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>
                  {getUpdateIcon(update.type)}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {update.type.replace('_', ' ').toUpperCase()}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.9rem' }}>
                    {update.type === 'arbitrage_alert' && (
                      <>Profit: {update.data.profit}% on {update.data.event}</>
                    )}
                    {update.type === 'kelly_signal' && (
                      <>Kelly: {(update.data.kellyFraction * 100).toFixed(1)}% for {update.data.event}</>
                    )}
                    {update.type === 'odds_update' && (
                      <>{update.data.event} - {update.data.market}</>
                    )}
                  </div>
                </div>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>
                  {formatTimestamp(update.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Settings */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1e1e, #2d2d2d)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #333',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#ff6b6b', marginBottom: '1.5rem' }}>⚙️ Alert Settings</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>
              Arbitrage Threshold (%)
            </label>
            <input
              type="number"
              value={alertSettings.arbitrageThreshold}
              onChange={(e) => setAlertSettings(prev => ({
                ...prev,
                arbitrageThreshold: parseFloat(e.target.value) || 0
              }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#333',
                border: '1px solid #555',
                borderRadius: '6px',
                color: '#fff'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>
              Kelly Threshold (%)
            </label>
            <input
              type="number"
              value={alertSettings.kellyThreshold * 100}
              onChange={(e) => setAlertSettings(prev => ({
                ...prev,
                kellyThreshold: (parseFloat(e.target.value) || 0) / 100
              }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#333',
                border: '1px solid #555',
                borderRadius: '6px',
                color: '#fff'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>
              Odds Change Alert (%)
            </label>
            <input
              type="number"
              value={alertSettings.oddsChangeThreshold * 100}
              onChange={(e) => setAlertSettings(prev => ({
                ...prev,
                oddsChangeThreshold: (parseFloat(e.target.value) || 0) / 100
              }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#333',
                border: '1px solid #555',
                borderRadius: '6px',
                color: '#fff'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
