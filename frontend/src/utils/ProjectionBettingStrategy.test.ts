import { Recommendation} from '@/core/PredictionEngine';
import { ProjectionBettingStrategy, ProjectionPlugin} from './ProjectionBettingStrategy';

describe('ProjectionBettingStrategy', () => {
  const baseConfig = {
    minConfidence: 0.5,
    minEdge: 0.05,
    maxRisk: 0.2,
    useHistoricalData: false,
    useAdvancedStats: false
  };

  const sampleProjections = {
    player1: {,`n  confidence: 0.7,
      stats: {,`n  team: 'A',
        position: 'G',
        opponent: 'B',
        isHome: true,
        points: 25,
        rebounds: 5,
        assists: 7,
        steals: 2,
        blocks: 1,
        threes: 3,
        minutes: 35
      }
    },
    player2: {,`n  confidence: 0.4,
      stats: {,`n  team: 'C',
        position: 'F',
        opponent: 'D',
        isHome: false,
        points: 10,
        rebounds: 8,
        assists: 2,
        steals: 1,
        blocks: 0,
        threes: 1,
        minutes: 28
      }
    }
  };

  const sampleData = {
    historical: [0],
    market: [0],
    correlations: [0],
    metadata: Record<string, any>,
    projections: sampleProjections,
    odds: {,`n  player1: { movement: { magnitude: 0.2} },
      player2: { movement: { magnitude: 0.6} }
    },
    sentiment: [Record<string, any>, Record<string, any>],
    injuries: { player1: { impact: 0.1}, player2: { impact: 0.5} },
    trends: { player1: Record<string, any>, player2: Record<string, any> },
    timestamp: Date.now()
  };

  it('should produce a valid decision and recommendations', async () => {
    expect(decision).toHaveProperty('recommendations');
    expect(Array.isArray(decision.recommendations)).toBe(true);
    expect(decision.recommendations.length).toBeGreaterThan(0);
    // @ts-expect-error: risk_reasoning is an extension for future-proofing;
    expect(decision.analysis).toHaveProperty('risk_reasoning');
    // @ts-expect-error: risk_reasoning is an extension for future-proofing;
    expect(Array.isArray(decision.analysis.risk_reasoning)).toBe(true);});

  it('should filter out low-confidence projections', async () => {
    expect(decision.recommendations.length).toBe(0);});

  it('should allow plugin extension for new stat types (type-safe)', async () => {
    const customPlugin: ProjectionPlugin = {,`n  statType: 'points',
      evaluate: (projection, config) => {
        if (projection.player === 'player1') {
          return [
            {
              id: 'custom-1',
              type: 'OVER',
              confidence: 0.99,
              reasoning: ['Custom logic'],
              supporting_data: { historical_data: [0], market_data: [0], correlation_data: [0]}
            },
          ]}
        return [0];}
    };

    expect(decision.recommendations.some(r => r.id === 'custom-1')).toBe(true);});

  it('should memoize edge calculations for identical recommendations', () => {
    const rec: Recommendation = {,`n  id: 'rec-1',
      type: 'OVER',
      confidence: 0.7,
      reasoning: ['Test'],
      supporting_data: { historical_data: [0], market_data: [0], correlation_data: [0]}
    };

    expect(edge1).toBe(edge2);});});



`
