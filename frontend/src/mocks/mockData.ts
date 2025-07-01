// Comprehensive mock data for A1Betting frontend
export const mockData = {
  props: [
    {
      id: 'prop_1',
      player_name: 'LeBron James',
      stat_type: 'Points',
      line: 25.5,
      over_odds: -110,
      under_odds: -110,
      confidence: 87.5,
      recommendation: 'OVER',
      sport: 'NBA',
      league: 'NBA',
      game_time: '2025-01-01T20:00:00Z',
      opponent: 'vs Warriors',
      venue: 'Home',
      expected_value: 12.3,
      kelly_fraction: 0.045
    },
    {
      id: 'prop_2',
      player_name: 'Stephen Curry',
      stat_type: '3-Pointers Made',
      line: 4.5,
      over_odds: -105,
      under_odds: -115,
      confidence: 82.3,
      recommendation: 'OVER',
      sport: 'NBA',
      league: 'NBA',
      game_time: '2025-01-01T20:00:00Z',
      opponent: 'vs Lakers',
      venue: 'Away',
      expected_value: 8.7,
      kelly_fraction: 0.032
    },
    {
      id: 'prop_3',
      player_name: 'Giannis Antetokounmpo',
      stat_type: 'Rebounds',
      line: 11.5,
      over_odds: -110,
      under_odds: -110,
      confidence: 89.1,
      recommendation: 'OVER',
      sport: 'NBA',
      league: 'NBA',
      game_time: '2025-01-01T21:00:00Z',
      opponent: 'vs Celtics',
      venue: 'Home',
      expected_value: 15.2,
      kelly_fraction: 0.051
    },
    {
      id: 'prop_4',
      player_name: 'Luka Doncic',
      stat_type: 'Assists',
      line: 8.5,
      over_odds: -110,
      under_odds: -110,
      confidence: 84.7,
      recommendation: 'OVER',
      sport: 'NBA',
      league: 'NBA',
      game_time: '2025-01-01T22:00:00Z',
      opponent: 'vs Suns',
      venue: 'Away',
      expected_value: 10.8,
      kelly_fraction: 0.038
    },
    {
      id: 'prop_5',
      player_name: 'Josh Allen',
      stat_type: 'Passing Yards',
      line: 275.5,
      over_odds: -110,
      under_odds: -110,
      confidence: 78.9,
      recommendation: 'OVER',
      sport: 'NFL',
      league: 'NFL',
      game_time: '2025-01-02T13:00:00Z',
      opponent: 'vs Chiefs',
      venue: 'Home',
      expected_value: 9.4,
      kelly_fraction: 0.029
    },
  ],

  bettingOpportunities: [
    {
      id: 'bet_1',
      sport: 'NBA',
      event: 'Lakers vs Warriors',
      market: 'Moneyline',
      odds: 1.85,
      probability: 0.65,
      expected_value: 12.5,
      kelly_fraction: 0.045,
      confidence: 87.2,
      risk_level: 'Medium',
      recommendation: 'BET'
    },
    {
      id: 'bet_2',
      sport: 'NFL',
      event: 'Chiefs vs Bills',
      market: 'Over/Under 47.5',
      odds: 1.91,
      probability: 0.58,
      expected_value: 8.3,
      kelly_fraction: 0.032,
      confidence: 79.8,
      risk_level: 'Low',
      recommendation: 'BET'
    },
    {
      id: 'bet_3',
      sport: 'NBA',
      event: 'Celtics vs Bucks',
      market: 'Spread -3.5',
      odds: 1.9,
      probability: 0.62,
      expected_value: 15.1,
      kelly_fraction: 0.048,
      confidence: 85.6,
      risk_level: 'Medium',
      recommendation: 'STRONG BET'
    },
  ],

  predictions: [
    {
      id: 'pred_1',
      sport: 'NBA',
      event: 'Lakers vs Warriors',
      prediction: 'Lakers Win',
      confidence: 87.2,
      odds: 1.85,
      expected_value: 12.5,
      timestamp: new Date().toISOString(),
      model_version: 'v4.0'
    },
    {
      id: 'pred_2',
      sport: 'NFL',
      event: 'Chiefs vs Bills',
      prediction: 'Over 47.5',
      confidence: 79.8,
      odds: 1.91,
      expected_value: 8.3,
      timestamp: new Date().toISOString(),
      model_version: 'v4.0'
    },
    {
      id: 'pred_3',
      sport: 'NBA',
      event: 'Celtics vs Bucks',
      prediction: 'Celtics -3.5',
      confidence: 85.6,
      odds: 1.9,
      expected_value: 15.1,
      timestamp: new Date().toISOString(),
      model_version: 'v4.0'
    },
  ],

  modelPerformance: {,`n  overall_accuracy: 92.5,
    recent_accuracy: 94.2,
    model_metrics: {,`n  precision: 0.89,
      recall: 0.94,
      f1_score: 0.915,
      auc_roc: 0.96
    },
    performance_by_sport: {,`n  NBA: { accuracy: 94.1, games: 156},
      NFL: { accuracy: 90.3, games: 98},
      MLB: { accuracy: 88.7, games: 234},
      NHL: { accuracy: 87.2, games: 145}
    }
  },

  analytics: {,`n  daily_stats: {,`n  total_bets: 125,
      winning_bets: 87,
      profit: 1250.75,
      roi: 18.5
    },
    weekly_performance: [
      { day: 'Monday', profit: 185.5},
      { day: 'Tuesday', profit: 92.25},
      { day: 'Wednesday', profit: 234.75},
      { day: 'Thursday', profit: 156.25},
      { day: 'Friday', profit: 298.5},
      { day: 'Saturday', profit: 187.75},
      { day: 'Sunday', profit: 95.75},
    ]
  }
};


`
