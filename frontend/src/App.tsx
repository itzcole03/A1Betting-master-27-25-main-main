import { useEffect, useState } from 'react';

interface PrizePicksData {
  player_name: string;
  stat_type: string;
  line_score: number;
  team: string;
}

interface HealthData {
  status: string;
  timestamp: string;
  services?: any;
}

export default function App() {
  const [prizePicksData, setPrizePicksData] = useState<PrizePicksData[]>([]);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Test the working endpoints we verified
      const [prizePicksResponse, healthResponse] = await Promise.all([
        fetch('/api/prizepicks/props'),
        fetch('/api/health/status')
      ]);

      if (prizePicksResponse.ok) {
        const prizePicksJson = await prizePicksResponse.json();
        setPrizePicksData(Array.isArray(prizePicksJson) ? prizePicksJson.slice(0, 10) : []);
      }

      if (healthResponse.ok) {
        const healthJson = await healthResponse.json();
        setHealthData(healthJson);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        fontFamily: 'system-ui, sans-serif',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🚀</div>
          <div style={{ fontSize: '1.2rem', color: '#06b6d4' }}>
            Loading A1Betting Platform...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{ 
        marginBottom: '40px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        paddingBottom: '20px'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          margin: '0 0 10px 0',
          background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          A1BETTING
        </h1>
        <div style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
          Sports Intelligence Platform
        </div>
        {healthData && (
          <div style={{ 
            marginTop: '10px', 
            fontSize: '0.9rem', 
            color: healthData.status === 'healthy' ? '#22c55e' : '#ef4444'
          }}>
            System Status: {healthData.status?.toUpperCase()}
          </div>
        )}
      </header>

      {/* Error Display */}
      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '30px',
          color: '#ef4444'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* PrizePicks Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '20px',
            color: '#06b6d4',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🏆 Live PrizePicks Props
            <span style={{ 
              fontSize: '0.8rem', 
              background: 'rgba(34, 197, 94, 0.2)',
              color: '#22c55e',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              {prizePicksData.length} Active
            </span>
          </h2>
          
          {prizePicksData.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {prizePicksData.map((prop, index) => (
                <div key={index} style={{ 
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'transform 0.2s, border-color 0.2s'
                }}>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    marginBottom: '8px',
                    color: '#f8fafc'
                  }}>
                    {prop.player_name}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#94a3b8', 
                    marginBottom: '4px' 
                  }}>
                    {prop.team}
                  </div>
                  <div style={{ 
                    fontSize: '1rem', 
                    color: '#06b6d4',
                    marginBottom: '8px'
                  }}>
                    {prop.stat_type}
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold',
                    color: '#fbbf24'
                  }}>
                    Line: {prop.line_score}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#94a3b8',
              background: 'rgba(30, 41, 59, 0.3)',
              borderRadius: '8px',
              border: '1px dashed rgba(148, 163, 184, 0.3)'
            }}>
              No PrizePicks data available
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '20px',
            color: '#06b6d4'
          }}>
            🎯 Quick Actions
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px' 
          }}>
            {[
              { label: 'Refresh Data', action: () => loadData() },
              { label: 'View Analytics', action: () => alert('Analytics coming soon!') },
              { label: 'Settings', action: () => alert('Settings coming soon!') }
            ].map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                style={{
                  background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px 20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {button.label}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(148, 163, 184, 0.2)',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        <div>
          A1Betting Platform • Powered by Real PrizePicks Data
        </div>
        <div style={{ marginTop: '5px', fontSize: '0.8rem' }}>
          Last updated: {new Date().toLocaleString()}
        </div>
      </footer>
    </div>
  );
}
