// Enhanced API Types for Ultimate Cyber Dashboard
// Iteration 53/150 - Autonomous Development Mission

export interface LiveOdds {
  id: string;
  sport: string;
  league: string;
  game: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  moneyline: {
    home: number;
    away: number;
  };
  spread: {
    home: number;
    away: number;
    points: number;
  };
  total: {
    over: number;
    under: number;
    points: number;
  };
  lastUpdated: string;
  sportsbook: string;
}

export interface ArbitrageOpportunity {
  id: string;
  sport: string;
  game: string;
  homeTeam: string;
  awayTeam: string;
  type: 'moneyline' | 'spread' | 'total';
  profit: number;
  profitMargin: number;
  books: {
    sportsbook: string;
    side: string;
    odds: number;
    stake: number;
  }[];
  totalStake: number;
  guaranteedProfit: number;
  expiresAt: string;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
}

export interface PrizePicksProp {
  id: string;
  sport: string;
  league: string;
  player: string;
  team: string;
  position: string;
  statType: string;
  line: number;
  overOdds: number;
  underOdds: number;
  projection: number;
  confidence: number;
  edge: number;
  volume: number;
  recentForm: {
    games: number;
    average: number;
    trend: 'up' | 'down' | 'stable';
  };
  matchup: {
    opponent: string;
    difficulty: 'easy' | 'medium' | 'hard';
    pace: number;
    defenseRank: number;
  };
  weather?: {
    condition: string;
    temperature: number;
    windSpeed: number;
    impact: 'positive' | 'negative' | 'neutral';
  };
  injuries: {
    player: string;
    status: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  lastUpdated: string;
}

export interface BettingAnalytics {
  performance: {
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
    winRate: number;
    lossRate: number;
    averageWin: number;
    averageLoss: number;
    profitFactor: number;
    sharpeRatio: number;
    maxDrawdown: number;
    currentStreak: number;
    longestWinStreak: number;
    longestLossStreak: number;
  };
  bankroll: {
    currentBalance: number;
    startingBalance: number;
    growth: number;
    growthPercentage: number;
    highWaterMark: number;
    riskOfRuin: number;
    kellyPercentage: number;
    optimalBetSize: number;
  };
  bets: {
    total: number;
    wins: number;
    losses: number;
    pushes: number;
    pending: number;
    averageOdds: number;
    averageStake: number;
    totalStaked: number;
  };
  sports: {
    sport: string;
    bets: number;
    profit: number;
    winRate: number;
    roi: number;
  }[];
  recent: {
    last7Days: {
      profit: number;
      bets: number;
      winRate: number;
    };
    last30Days: {
      profit: number;
      bets: number;
      winRate: number;
    };
    thisMonth: {
      profit: number;
      bets: number;
      winRate: number;
    };
  };
}

export interface RealTimeMetrics {
  totalProfitToday: number;
  winRate: number;
  activeOpportunities: number;
  totalBetsPlaced: number;
  averageOdds: number;
  kellyOptimalBets: number;
  bankrollGrowth: number;
  sharpnessRating: number;
  currentBankroll: number;
  dailyGoal: number;
  progressToGoal: number;
  riskLevel: number;
  confidenceLevel: number;
  marketEfficiency: number;
  edgeDetected: number;
  timeToNextBet: number;
  // Dashboard specific properties
  totalProfit: number;
  aiAccuracy: number;
  liveOpportunities: number;
  activePredictions: number;
  activeStreaks: {
    wins: number;
    losses: number;
    type: 'win' | 'loss';
  };
}

export interface QuantumAnalysis {
  quantumScore: number;
  probabilityDistribution: {
    outcome: string;
    probability: number;
    confidence: number;
  }[];
  entanglement: {
    factors: string[];
    correlation: number;
    impact: 'high' | 'medium' | 'low';
  }[];
  uncertainty: {
    level: number;
    factors: string[];
    recommendation: string;
  };
  coherence: {
    state: 'stable' | 'unstable' | 'transitioning';
    duration: number;
    nextTransition: string;
  };
}

export interface SocialSentiment {
  overall: {
    sentiment: 'bullish' | 'bearish' | 'neutral';
    score: number;
    confidence: number;
    volume: number;
  };
  platforms: {
    twitter: {
      sentiment: number;
      mentions: number;
      trending: boolean;
      influencerSentiment: number;
    };
    reddit: {
      sentiment: number;
      posts: number;
      upvotes: number;
      comments: number;
    };
    discord: {
      sentiment: number;
      messages: number;
      activeChannels: number;
    };
    news: {
      sentiment: number;
      articles: number;
      credibilityScore: number;
    };
  };
  viralTrends: {
    trend: string;
    velocity: number;
    impact: 'high' | 'medium' | 'low';
    timeTopeak: number;
    relevance: number;
  }[];
  influencers: {
    name: string;
    platform: string;
    followers: number;
    sentiment: number;
    influence: number;
    reliability: number;
  }[];
}

export interface RiskProfile {
  overall: {
    level: 'conservative' | 'moderate' | 'aggressive' | 'extreme';
    score: number;
    tolerance: number;
    capacity: number;
  };
  portfolio: {
    diversification: number;
    concentration: number;
    correlation: number;
    volatility: number;
  };
  kelly: {
    recommended: number;
    current: number;
    optimal: number;
    deviation: number;
  };
  drawdown: {
    current: number;
    maximum: number;
    duration: number;
    recovery: number;
  };
  recommendations: {
    betSize: number;
    maxRisk: number;
    diversification: string[];
    warnings: string[];
  };
}

export interface LineupOptimization {
  sport: string;
  slate: string;
  salary: number;
  projectedPoints: number;
  ownership: number;
  players: {
    id: string;
    name: string;
    position: string;
    team: string;
    salary: number;
    projection: number;
    ownership: number;
    value: number;
    ceiling: number;
    floor: number;
    consistency: number;
    recent: number;
    matchupRating: number;
    weatherImpact: number;
    injuryRisk: number;
    stackValue: number;
  }[];
  stacks: {
    type: 'game' | 'team' | 'position';
    players: string[];
    correlation: number;
    value: number;
    risk: number;
  }[];
  leverage: {
    contrarian: number;
    chalkAvoidance: number;
    stackLeverage: number;
    uniqueness: number;
  };
  simulation: {
    iterations: number;
    winRate: number;
    averageScore: number;
    topPercent: number;
    roi: number;
  };
}

export interface MarketTrend {
  market: string;
  direction: 'up' | 'down' | 'sideways';
  strength: number;
  volume: number;
  momentum: number;
  support: number;
  resistance: number;
  forecast: {
    shortTerm: 'bullish' | 'bearish' | 'neutral';
    mediumTerm: 'bullish' | 'bearish' | 'neutral';
    longTerm: 'bullish' | 'bearish' | 'neutral';
  };
  indicators: {
    name: string;
    value: number;
    signal: 'buy' | 'sell' | 'hold';
  }[];
}

export interface WeatherData {
  location: string;
  game: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    precipitation: number;
    visibility: number;
    condition: string;
  };
  forecast: {
    gameTime: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      windDirection: string;
      precipitation: number;
      condition: string;
    };
  };
  impact: {
    passing: 'positive' | 'negative' | 'neutral';
    running: 'positive' | 'negative' | 'neutral';
    kicking: 'positive' | 'negative' | 'neutral';
    defense: 'positive' | 'negative' | 'neutral';
    overall: 'positive' | 'negative' | 'neutral';
    severity: number;
  };
}

export interface InjuryReport {
  player: string;
  team: string;
  position: string;
  injury: string;
  status: 'out' | 'doubtful' | 'questionable' | 'probable' | 'healthy';
  severity: 'minor' | 'moderate' | 'major' | 'season-ending';
  expectedReturn: string;
  impact: {
    team: 'high' | 'medium' | 'low';
    fantasy: 'high' | 'medium' | 'low';
    betting: 'high' | 'medium' | 'low';
  };
  replacement: {
    player: string;
    dropoff: number;
    opportunity: number;
  };
  history: {
    injury: string;
    date: string;
    duration: number;
    recurrence: boolean;
  }[];
  lastUpdated: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  author: string;
  publishedAt: string;
  category: string;
  sport: string;
  teams: string[];
  players: string[];
  sentiment: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
    confidence: number;
  };
  impact: {
    betting: 'high' | 'medium' | 'low';
    fantasy: 'high' | 'medium' | 'low';
    market: 'high' | 'medium' | 'low';
  };
  keywords: string[];
  reliability: number;
  trending: boolean;
  viral: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  requestId: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Real-time Data Structure
export interface RealTimeData {
  liveOdds: LiveOdds[];
  arbitrageOpportunities: ArbitrageOpportunity[];
  prizePicksProps: PrizePicksProp[];
  analytics: BettingAnalytics | null;
  marketTrends: MarketTrend[];
  socialSentiment: SocialSentiment;
  quantumAnalysis?: QuantumAnalysis;
  riskProfile?: RiskProfile;
  lineupOptimization?: LineupOptimization[];
  weather?: WeatherData[];
  injuries?: InjuryReport[];
  news?: NewsItem[];
}

// Enhanced Search Types
export interface SearchResult {
  id: string;
  type: 'component' | 'feature' | 'data' | 'analysis';
  title: string;
  description: string;
  category: string;
  relevance: number;
  path: string;
  icon?: string;
  badge?: string;
  lastUsed?: string;
}

export interface SearchFilters {
  categories: string[];
  types: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  relevanceThreshold?: number;
  includeRecent?: boolean;
}

// Theme Configuration
export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    light: string;
    medium: string;
    heavy: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
}

// Component State Types
export interface DashboardState {
  activeComponent: string;
  activeTab: string;
  currentTheme: string;
  searchQuery: string;
  searchResults: SearchResult[];
  showSearchResults: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
}

// Export all types
export type {
    ApiResponse, ArbitrageOpportunity, BettingAnalytics, DashboardState, InjuryReport, LineupOptimization, LiveOdds, MarketTrend, NewsItem, PaginatedResponse, PrizePicksProp, QuantumAnalysis, RealTimeData, RealTimeMetrics, RiskProfile, SearchFilters, SearchResult, SocialSentiment, ThemeConfig, WeatherData
};

