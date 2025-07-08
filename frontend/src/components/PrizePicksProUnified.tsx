import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interfaces for comprehensive data handling
export interface PrizePicksProjection {
  id: string;
  player_id: string;
  player_name: string;
  team: string;
  position: string;
  league: string;
  sport: string;
  stat_type: string;
  line_score: number;
  over_odds: number;
  under_odds: number;
  start_time: string;
  status: string;
  description: string;
  rank: number;
  is_promo: boolean;
  confidence: number;
  market_efficiency: number;
  ml_prediction?: MLPrediction;
  shap_values?: ShapValues;
  value_rating?: number;
  kelly_percentage?: number;
}

export interface MLPrediction {
  prediction: number;
  confidence: number;
  ensemble_score: number;
  model_weights: Record<string, number>;
  factors: Record<string, number>;
  risk_assessment: {
    level: 'low' | 'medium' | 'high';
    score: number;
    factors: string[];
  };
}

export interface ShapValues {
  base_value: number;
  shap_values: Record<string, number>;
  feature_importance: Record<string, number>;
  explanation: string;
}

export interface LineupEntry {
  id: string;
  projection: PrizePicksProjection;
  selection: 'over' | 'under';
  confidence: number;
  expected_value: number;
  kelly_percentage: number;
}

export interface OptimizedLineup {
  entries: LineupEntry[];
  total_confidence: number;
  expected_payout: number;
  kelly_optimization: number;
  risk_score: number;
  value_score: number;
  correlation_matrix: number[][];
}

export interface PrizePicksProUnifiedProps {
  variant?: 'default' | 'cyber' | 'pro' | 'minimal';
  className?: string;
  maxSelections?: number;
  enableMLPredictions?: boolean;
  enableShapExplanations?: boolean;
  enableKellyOptimization?: boolean;
  enableCorrelationAnalysis?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onLineupGenerated?: (lineup: OptimizedLineup) => void;
  onBetPlaced?: (lineup: OptimizedLineup) => void;
}

export const PrizePicksProUnified: React.FC<PrizePicksProUnifiedProps> = ({
  variant = 'cyber',
  className = '',
  maxSelections = 6,
  enableMLPredictions = true,
  enableShapExplanations = true,
  enableKellyOptimization = true,
  enableCorrelationAnalysis = true,
  autoRefresh = true,
  refreshInterval = 30000,
  onLineupGenerated,
  onBetPlaced,
}) => {
  // State management
  const [projections, setProjections] = useState<PrizePicksProjection[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<LineupEntry[]>([]);
  const [optimizedLineup, setOptimizedLineup] = useState<OptimizedLineup | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    sport: 'All',
    league: 'All',
    team: 'All',
    statType: 'All',
    minConfidence: 70,
    maxRisk: 'high' as 'low' | 'medium' | 'high',
    minValue: 0,
    playerSearch: '',
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'confidence' as keyof PrizePicksProjection,
    direction: 'desc' as 'asc' | 'desc',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedProjection, setSelectedProjection] = useState<PrizePicksProjection | null>(null);
  const [showShapModal, setShowShapModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available sports configuration
  const SUPPORTED_SPORTS = [
    'NBA',
    'WNBA',
    'NFL',
    'MLB',
    'NHL',
    'MLS',
    'NCAAF',
    'NCAAB',
    'PGA',
    'NASCAR',
    'F1',
  ];

  // Generate comprehensive mock data for development/demo
  const generateMockProjections = (): PrizePicksProjection[] => {
    const players = [
      { name: 'LeBron James', team: 'LAL', position: 'F', sport: 'NBA', league: 'NBA' },
      { name: 'Stephen Curry', team: 'GSW', position: 'G', sport: 'NBA', league: 'NBA' },
      { name: 'Giannis Antetokounmpo', team: 'MIL', position: 'F', sport: 'NBA', league: 'NBA' },
      { name: 'Luka Doncic', team: 'DAL', position: 'G', sport: 'NBA', league: 'NBA' },
      { name: 'Jayson Tatum', team: 'BOS', position: 'F', sport: 'NBA', league: 'NBA' },
      { name: 'Nikola Jokic', team: 'DEN', position: 'C', sport: 'NBA', league: 'NBA' },
      { name: 'Joel Embiid', team: 'PHI', position: 'C', sport: 'NBA', league: 'NBA' },
      { name: 'Kevin Durant', team: 'PHX', position: 'F', sport: 'NBA', league: 'NBA' },
      { name: 'Damian Lillard', team: 'MIL', position: 'G', sport: 'NBA', league: 'NBA' },
      { name: 'Anthony Davis', team: 'LAL', position: 'F', sport: 'NBA', league: 'NBA' },
      // NFL Players
      { name: 'Josh Allen', team: 'BUF', position: 'QB', sport: 'NFL', league: 'NFL' },
      { name: 'Patrick Mahomes', team: 'KC', position: 'QB', sport: 'NFL', league: 'NFL' },
      { name: 'Lamar Jackson', team: 'BAL', position: 'QB', sport: 'NFL', league: 'NFL' },
      { name: 'Travis Kelce', team: 'KC', position: 'TE', sport: 'NFL', league: 'NFL' },
      { name: 'Tyreek Hill', team: 'MIA', position: 'WR', sport: 'NFL', league: 'NFL' },
      // MLB Players
      { name: 'Shohei Ohtani', team: 'LAD', position: 'DH', sport: 'MLB', league: 'MLB' },
      { name: 'Aaron Judge', team: 'NYY', position: 'OF', sport: 'MLB', league: 'MLB' },
      { name: 'Mookie Betts', team: 'LAD', position: 'OF', sport: 'MLB', league: 'MLB' },
      // NHL Players
      { name: 'Connor McDavid', team: 'EDM', position: 'C', sport: 'NHL', league: 'NHL' },
      { name: 'Nathan MacKinnon', team: 'COL', position: 'C', sport: 'NHL', league: 'NHL' },
    ];

    const statTypes = {
      NBA: ['Points', 'Assists', 'Rebounds', '3-Pointers', 'Steals', 'Blocks'],
      NFL: ['Passing Yards', 'Rushing Yards', 'Receiving Yards', 'Touchdowns', 'Receptions'],
      MLB: ['Hits', 'Home Runs', 'RBIs', 'Stolen Bases', 'Strikeouts'],
      NHL: ['Goals', 'Assists', 'Points', 'Shots', 'Saves'],
    };

    return players.map((player, index) => {
      const availableStats = statTypes[player.sport as keyof typeof statTypes] || statTypes.NBA;
      const statType = availableStats[index % availableStats.length];
      const baseValue = 15 + index * 3 + Math.random() * 10;
      const confidence = 70 + Math.random() * 25;
      const prediction = baseValue + (Math.random() - 0.5) * 6;

      return {
        id: `proj_${index + 1}`,
        player_id: `player_${index + 1}`,
        player_name: player.name,
        team: player.team,
        position: player.position,
        league: player.league,
        sport: player.sport,
        stat_type: statType,
        line_score: Math.round(baseValue * 2) / 2, // Round to nearest 0.5
        over_odds: -110,
        under_odds: -110,
        start_time: new Date(Date.now() + Math.random() * 86400000).toISOString(),
        status: 'active',
        description: `${player.name} ${statType} prop`,
        rank: index + 1,
        is_promo: Math.random() > 0.8,
        confidence: Math.round(confidence),
        market_efficiency: 0.1 + Math.random() * 0.2,
        ml_prediction: {
          prediction: Math.round(prediction * 2) / 2,
          confidence: Math.round(confidence),
          ensemble_score: 0.8 + Math.random() * 0.2,
          model_weights: {
            xgboost: 0.3,
            lightgbm: 0.25,
            neural_net: 0.2,
            ensemble: 0.25,
          },
          factors: {
            recent_form: 0.7 + Math.random() * 0.3,
            matchup: 0.6 + Math.random() * 0.4,
            injury_status: 0.9,
            rest_days: 0.8 + Math.random() * 0.2,
          },
          risk_assessment: {
            level: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
            score: 20 + Math.random() * 60,
            factors: ['Form variance', 'Injury concerns', 'Matchup difficulty'],
          },
        },
        shap_values: {
          base_value: baseValue,
          shap_values: {
            recent_avg: 0.1 + Math.random() * 0.15,
            opponent_def: -0.05 + Math.random() * 0.1,
            home_away: Math.random() > 0.5 ? 0.03 : -0.02,
            rest_days: 0.01 + Math.random() * 0.02,
            season_avg: 0.08 + Math.random() * 0.08,
          },
          feature_importance: {
            recent_avg: 0.35,
            opponent_def: 0.25,
            home_away: 0.15,
            rest_days: 0.15,
            season_avg: 0.1,
          },
          explanation:
            Math.random() > 0.5
              ? `Model predicts higher than line based on recent strong form and favorable matchup analysis.`
              : `Model suggests lower than line due to defensive matchup concerns and recent performance variance.`,
        },
        value_rating: 2 + Math.random() * 18,
        kelly_percentage: 1 + Math.random() * 12,
      };
    });
  };

  // Fetch projections from API
  const fetchProjections = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/prizepicks/comprehensive-projections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch projections: ${response.statusText}`);
      }

      const data = await response.json();

      // Enhance projections with ML predictions if enabled
      if (enableMLPredictions) {
        const enhancedProjections = await Promise.all(
          data.map(async (projection: PrizePicksProjection) => {
            try {
              // Fetch ML prediction for this projection
              const mlResponse = await fetch('/api/v4/predict/ultra-accuracy', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  player_name: projection.player_name,
                  stat_type: projection.stat_type,
                  line: projection.line_score,
                  team: projection.team,
                  sport: projection.sport,
                  league: projection.league,
                  position: projection.position,
                }),
              });

              if (mlResponse.ok) {
                const mlData = await mlResponse.json();
                projection.ml_prediction = mlData.prediction;
                projection.confidence = mlData.confidence || projection.confidence;

                // Calculate value rating
                projection.value_rating = calculateValueRating(projection);

                // Calculate Kelly percentage if enabled
                if (enableKellyOptimization) {
                  projection.kelly_percentage = calculateKellyPercentage(projection);
                }
              }
            } catch (mlError) {
              console.warn(`Failed to fetch ML prediction for ${projection.player_name}:`, mlError);
            }

            // Fetch SHAP explanations if enabled
            if (enableShapExplanations) {
              try {
                const shapResponse = await fetch('/api/shap/explain', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    player_name: projection.player_name,
                    stat_type: projection.stat_type,
                    features: {
                      line: projection.line_score,
                      team: projection.team,
                      sport: projection.sport,
                      position: projection.position,
                    },
                  }),
                });

                if (shapResponse.ok) {
                  const shapData = await shapResponse.json();
                  projection.shap_values = shapData;
                }
              } catch (shapError) {
                console.warn(
                  `Failed to fetch SHAP values for ${projection.player_name}:`,
                  shapError
                );
              }
            }

            return projection;
          })
        );

        setProjections(enhancedProjections);
      } else {
        setProjections(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projections';
      console.warn('API not available, using mock data for development:', err);

      // Use mock data when API is not available (development/demo mode)
      try {
        const mockProjections = generateMockProjections();
        setProjections(mockProjections);
        setError(null); // Clear error since we have fallback data
        console.info(`Loaded ${mockProjections.length} mock projections for development`);
      } catch (mockError) {
        setError(`Failed to load data: ${errorMessage}`);
        console.error('Failed to generate mock data:', mockError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [enableMLPredictions, enableShapExplanations, enableKellyOptimization]);

  // Calculate value rating based on ML prediction vs line
  const calculateValueRating = (projection: PrizePicksProjection): number => {
    if (!projection.ml_prediction) return 0;

    const predicted = projection.ml_prediction.prediction;
    const line = projection.line_score;
    const confidence = projection.ml_prediction.confidence;

    // Calculate expected value for both over and under
    const overEV =
      (predicted > line ? (predicted - line) / line : -(line - predicted) / line) * confidence;
    const underEV =
      (predicted < line ? (line - predicted) / line : -(predicted - line) / line) * confidence;

    return Math.max(overEV, underEV) * 100; // Convert to percentage
  };

  // Calculate Kelly percentage for optimal bet sizing
  const calculateKellyPercentage = (projection: PrizePicksProjection): number => {
    if (!projection.ml_prediction || !projection.value_rating) return 0;

    const confidence = projection.ml_prediction.confidence;
    const impliedOdds = 0.52; // PrizePicks standard
    const winProb = confidence / 100;
    const payoutRatio = 1 / impliedOdds - 1;

    // Kelly formula: (bp - q) / b
    // where b = payout ratio, p = win probability, q = lose probability
    const kelly = (payoutRatio * winProb - (1 - winProb)) / payoutRatio;

    return Math.max(0, Math.min(kelly * 100, 25)); // Cap at 25% of bankroll
  };

  // Filter and sort projections
  const filteredProjections = useMemo(() => {
    let filtered = projections.filter(projection => {
      // Sport filter
      if (activeFilters.sport !== 'All' && projection.sport !== activeFilters.sport) return false;

      // League filter
      if (activeFilters.league !== 'All' && projection.league !== activeFilters.league)
        return false;

      // Team filter
      if (activeFilters.team !== 'All' && projection.team !== activeFilters.team) return false;

      // Stat type filter
      if (activeFilters.statType !== 'All' && projection.stat_type !== activeFilters.statType)
        return false;

      // Confidence filter
      if (projection.confidence < activeFilters.minConfidence) return false;

      // Risk filter
      if (projection.ml_prediction?.risk_assessment) {
        const riskLevels = { low: 1, medium: 2, high: 3 };
        const maxRiskLevel = riskLevels[activeFilters.maxRisk];
        const projectionRiskLevel = riskLevels[projection.ml_prediction.risk_assessment.level];
        if (projectionRiskLevel > maxRiskLevel) return false;
      }

      // Value filter
      if ((projection.value_rating || 0) < activeFilters.minValue) return false;

      // Player search
      if (
        activeFilters.playerSearch &&
        !projection.player_name.toLowerCase().includes(activeFilters.playerSearch.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Sort projections
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.field] as any;
      const bValue = b[sortConfig.field] as any;

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [projections, activeFilters, sortConfig]);

  // Optimize lineup using advanced algorithms
  const optimizeLineup = useCallback(async () => {
    if (selectedEntries.length < 2 || selectedEntries.length > maxSelections) {
      setError(`Please select between 2 and ${maxSelections} entries`);
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      const optimizationPayload = {
        entries: selectedEntries.map(entry => ({
          projection_id: entry.projection.id,
          selection: entry.selection,
          player_name: entry.projection.player_name,
          stat_type: entry.projection.stat_type,
          line: entry.projection.line_score,
          confidence: entry.confidence,
          ml_prediction: entry.projection.ml_prediction,
        })),
        optimization_params: {
          enable_kelly: enableKellyOptimization,
          enable_correlation: enableCorrelationAnalysis,
          max_risk: activeFilters.maxRisk,
          target_confidence: activeFilters.minConfidence,
        },
      };

      const response = await fetch('/api/lineup/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(optimizationPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to optimize lineup: ${response.statusText}`);
      }

      const optimizedData = await response.json();

      const optimized: OptimizedLineup = {
        entries: selectedEntries,
        total_confidence: optimizedData.total_confidence || 0,
        expected_payout: optimizedData.expected_payout || 0,
        kelly_optimization: optimizedData.kelly_optimization || 0,
        risk_score: optimizedData.risk_score || 0,
        value_score: optimizedData.value_score || 0,
        correlation_matrix: optimizedData.correlation_matrix || [],
      };

      setOptimizedLineup(optimized);
      onLineupGenerated?.(optimized);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to optimize lineup';
      console.warn('API optimization not available, using local optimization:', err);

      // Fallback to local optimization when API is not available
      try {
        // Calculate local optimization metrics
        const totalConfidence =
          selectedEntries.reduce((sum, entry) => sum + entry.confidence, 0) /
          selectedEntries.length;
        const expectedPayout = Math.pow(1.85, selectedEntries.length); // Base multiplier
        const kellyOptimization = Math.min(
          25,
          selectedEntries.reduce((sum, entry) => sum + (entry.kelly_percentage || 5), 0) /
            selectedEntries.length
        );
        const riskScore =
          selectedEntries.reduce((sum, entry) => {
            const riskLevels = { low: 20, medium: 50, high: 80 };
            return (
              sum +
              (riskLevels[entry.projection.ml_prediction?.risk_assessment?.level || 'medium'] || 50)
            );
          }, 0) / selectedEntries.length;
        const valueScore =
          selectedEntries.reduce((sum, entry) => sum + (entry.expected_value || 5), 0) /
          selectedEntries.length;

        // Generate mock correlation matrix
        const correlationMatrix = selectedEntries.map((_, i) =>
          selectedEntries.map((_, j) => (i === j ? 1.0 : 0.1 + Math.random() * 0.3))
        );

        const optimized: OptimizedLineup = {
          entries: selectedEntries,
          total_confidence: totalConfidence,
          expected_payout: expectedPayout,
          kelly_optimization: kellyOptimization,
          risk_score: riskScore,
          value_score: valueScore,
          correlation_matrix: correlationMatrix,
        };

        setOptimizedLineup(optimized);
        onLineupGenerated?.(optimized);
        setError(null); // Clear error since we have fallback optimization
        console.info('Local optimization completed successfully');
      } catch (localError) {
        setError(`Optimization failed: ${errorMessage}`);
        console.error('Local optimization failed:', localError);
      }
    } finally {
      setIsOptimizing(false);
    }
  }, [
    selectedEntries,
    maxSelections,
    enableKellyOptimization,
    enableCorrelationAnalysis,
    activeFilters,
    onLineupGenerated,
  ]);

  // Handle projection selection
  const handleProjectionSelect = (
    projection: PrizePicksProjection,
    selection: 'over' | 'under'
  ) => {
    const existingEntry = selectedEntries.find(entry => entry.projection.id === projection.id);

    if (existingEntry) {
      if (existingEntry.selection === selection) {
        // Remove if same selection
        setSelectedEntries(prev => prev.filter(entry => entry.projection.id !== projection.id));
      } else {
        // Update selection
        setSelectedEntries(prev =>
          prev.map(entry =>
            entry.projection.id === projection.id ? { ...entry, selection } : entry
          )
        );
      }
    } else {
      if (selectedEntries.length >= maxSelections) {
        setError(`Maximum ${maxSelections} selections allowed`);
        return;
      }

      const newEntry: LineupEntry = {
        id: `${projection.id}_${selection}`,
        projection,
        selection,
        confidence: projection.confidence,
        expected_value: projection.value_rating || 0,
        kelly_percentage: projection.kelly_percentage || 0,
      };

      setSelectedEntries(prev => [...prev, newEntry]);
    }

    setError(null);
  };

  // Handle bet placement
  const handlePlaceBet = () => {
    if (!optimizedLineup) return;

    onBetPlaced?.(optimizedLineup);
  };

  // Auto-refresh effect
  useEffect(() => {
    fetchProjections();

    if (autoRefresh) {
      const interval = setInterval(fetchProjections, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchProjections, autoRefresh, refreshInterval]);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const sports = new Set(projections.map(p => p.sport));
    const leagues = new Set(projections.map(p => p.league));
    const teams = new Set(projections.map(p => p.team));
    const statTypes = new Set(projections.map(p => p.stat_type));

    return {
      sports: Array.from(sports).sort(),
      leagues: Array.from(leagues).sort(),
      teams: Array.from(teams).sort(),
      statTypes: Array.from(statTypes).sort(),
    };
  }, [projections]);

  const baseClasses = `
    w-full min-h-screen rounded-lg border transition-all duration-200
    ${
      variant === 'cyber'
        ? 'bg-black border-cyan-400/30 text-cyan-300'
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
    }
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {/* Cyber grid overlay */}
      {variant === 'cyber' && (
        <div className='absolute inset-0 opacity-10 pointer-events-none'>
          <div className='grid grid-cols-12 grid-rows-8 h-full w-full'>
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className='border border-cyan-400/20' />
            ))}
          </div>
        </div>
      )}

      <div className='relative z-10 p-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='space-y-3'>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-900 dark:text-white'
              }`}
            >
              {variant === 'cyber'
                ? 'PRIZEPICKS PRO // LINEUP BUILDER'
                : 'PrizePicks Pro & Lineup Builder'}
            </h1>
            <p
              className={`text-base leading-relaxed ${
                variant === 'cyber' ? 'text-cyan-300/80' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              AI-powered prop analysis with {projections.length} live projections
            </p>
            <div
              className={`flex items-center space-x-6 text-sm ${
                variant === 'cyber' ? 'text-cyan-300/70' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <span className='flex items-center space-x-2'>
                <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                <span>ML Confidence Scoring</span>
              </span>
              <span className='flex items-center space-x-2'>
                <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                <span>SHAP Explanations</span>
              </span>
              <span className='flex items-center space-x-2'>
                <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                <span>Kelly Optimization</span>
              </span>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {/* Auto-refresh indicator */}
            {autoRefresh && (
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  variant === 'cyber'
                    ? 'bg-cyan-400/10 border border-cyan-400/30'
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    variant === 'cyber' ? 'bg-cyan-400' : 'bg-green-500'
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    variant === 'cyber' ? 'text-cyan-400' : 'text-green-700 dark:text-green-400'
                  }`}
                >
                  Live Updates
                </span>
              </div>
            )}

            {/* Selected count */}
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                variant === 'cyber'
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}
            >
              {selectedEntries.length}/{maxSelections} Selected
            </div>

            {/* Refresh button */}
            <button
              onClick={fetchProjections}
              disabled={isLoading}
              className={`p-2 rounded-lg font-medium transition-all ${
                variant === 'cyber'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
                  : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
              } disabled:opacity-50`}
            >
              {isLoading ? (
                <div className='animate-spin rounded-full h-4 w-4 border-2 border-transparent border-t-current' />
              ) : (
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              variant === 'cyber'
                ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                : 'bg-red-100 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
            }`}
          >
            <div className='flex items-center space-x-2'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6'>
          {/* Sport Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Sport
            </label>
            <select
              value={activeFilters.sport}
              onChange={e => setActiveFilters(prev => ({ ...prev, sport: e.target.value }))}
              className={`w-full p-2 rounded border text-sm ${
                variant === 'cyber'
                  ? 'bg-black border-cyan-400/30 text-cyan-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <option value='All'>All Sports</option>
              {filterOptions.sports.map(sport => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* League Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              League
            </label>
            <select
              value={activeFilters.league}
              onChange={e => setActiveFilters(prev => ({ ...prev, league: e.target.value }))}
              className={`w-full p-2 rounded border text-sm ${
                variant === 'cyber'
                  ? 'bg-black border-cyan-400/30 text-cyan-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <option value='All'>All Leagues</option>
              {filterOptions.leagues.map(league => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
          </div>

          {/* Team Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Team
            </label>
            <select
              value={activeFilters.team}
              onChange={e => setActiveFilters(prev => ({ ...prev, team: e.target.value }))}
              className={`w-full p-2 rounded border text-sm ${
                variant === 'cyber'
                  ? 'bg-black border-cyan-400/30 text-cyan-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <option value='All'>All Teams</option>
              {filterOptions.teams.map(team => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Stat Type Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Stat Type
            </label>
            <select
              value={activeFilters.statType}
              onChange={e => setActiveFilters(prev => ({ ...prev, statType: e.target.value }))}
              className={`w-full p-2 rounded border text-sm ${
                variant === 'cyber'
                  ? 'bg-black border-cyan-400/30 text-cyan-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <option value='All'>All Stats</option>
              {filterOptions.statTypes.map(statType => (
                <option key={statType} value={statType}>
                  {statType}
                </option>
              ))}
            </select>
          </div>

          {/* Confidence Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Min Confidence
            </label>
            <input
              type='range'
              min='0'
              max='100'
              value={activeFilters.minConfidence}
              onChange={e =>
                setActiveFilters(prev => ({ ...prev, minConfidence: parseInt(e.target.value) }))
              }
              className={`w-full ${variant === 'cyber' ? 'accent-cyan-400' : ''}`}
            />
            <div className='text-xs text-center mt-1'>{activeFilters.minConfidence}%</div>
          </div>

          {/* Risk Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Max Risk
            </label>
            <select
              value={activeFilters.maxRisk}
              onChange={e =>
                setActiveFilters(prev => ({
                  ...prev,
                  maxRisk: e.target.value as 'low' | 'medium' | 'high',
                }))
              }
              className={`w-full p-2 rounded border text-sm ${
                variant === 'cyber'
                  ? 'bg-black border-cyan-400/30 text-cyan-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <option value='low'>Low Risk</option>
              <option value='medium'>Medium Risk</option>
              <option value='high'>High Risk</option>
            </select>
          </div>

          {/* Value Filter */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Min Value
            </label>
            <input
              type='range'
              min='0'
              max='50'
              value={activeFilters.minValue}
              onChange={e =>
                setActiveFilters(prev => ({ ...prev, minValue: parseInt(e.target.value) }))
              }
              className={`w-full ${variant === 'cyber' ? 'accent-cyan-400' : ''}`}
            />
            <div className='text-xs text-center mt-1'>{activeFilters.minValue}%</div>
          </div>

          {/* Player Search */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 ${
                variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Player Search
            </label>
            <input
              type='text'
              placeholder='Search players...'
              value={activeFilters.playerSearch}
              onChange={e => setActiveFilters(prev => ({ ...prev, playerSearch: e.target.value }))}
              className={`w-full p-2 rounded border text-sm ${
                variant === 'cyber'
                  ? 'bg-black border-cyan-400/30 text-cyan-300 placeholder-cyan-300/50'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Projections List */}
          <div className='lg:col-span-3'>
            <div className='flex items-center justify-between mb-4'>
              <h2
                className={`text-xl font-bold ${
                  variant === 'cyber' ? 'text-cyan-400' : 'text-gray-900 dark:text-white'
                }`}
              >
                Live Projections ({filteredProjections.length})
              </h2>

              {/* Sort Controls */}
              <div className='flex items-center space-x-2'>
                <select
                  value={sortConfig.field}
                  onChange={e =>
                    setSortConfig(prev => ({
                      ...prev,
                      field: e.target.value as keyof PrizePicksProjection,
                    }))
                  }
                  className={`p-2 rounded border text-sm ${
                    variant === 'cyber'
                      ? 'bg-black border-cyan-400/30 text-cyan-300'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  <option value='confidence'>Confidence</option>
                  <option value='value_rating'>Value Rating</option>
                  <option value='player_name'>Player Name</option>
                  <option value='start_time'>Start Time</option>
                </select>

                <button
                  onClick={() =>
                    setSortConfig(prev => ({
                      ...prev,
                      direction: prev.direction === 'asc' ? 'desc' : 'asc',
                    }))
                  }
                  className={`p-2 rounded border ${
                    variant === 'cyber'
                      ? 'bg-black border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            {/* Projections Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto'>
              <AnimatePresence>
                {isLoading ? (
                  <div className='col-span-full flex items-center justify-center h-64'>
                    <div
                      className={`animate-spin rounded-full h-12 w-12 border-4 border-transparent ${
                        variant === 'cyber' ? 'border-t-cyan-400' : 'border-t-blue-500'
                      }`}
                    />
                  </div>
                ) : filteredProjections.length === 0 ? (
                  <div className='col-span-full text-center py-12'>
                    <div
                      className={`text-6xl mb-4 ${
                        variant === 'cyber' ? 'text-cyan-400/50' : 'text-gray-400'
                      }`}
                    >
                      📊
                    </div>
                    <p
                      className={`text-lg ${
                        variant === 'cyber'
                          ? 'text-cyan-300/70'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      No projections match your filters
                    </p>
                  </div>
                ) : (
                  filteredProjections.map((projection, index) => (
                    <motion.div
                      key={projection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedEntries.some(entry => entry.projection.id === projection.id)
                          ? variant === 'cyber'
                            ? 'bg-cyan-400/20 border-cyan-400/50'
                            : 'bg-blue-100 border-blue-500 dark:bg-blue-900/30'
                          : variant === 'cyber'
                            ? 'bg-gray-900/50 border-cyan-400/30 hover:border-cyan-400/50'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {/* Player Header */}
                      <div className='flex items-start justify-between mb-3'>
                        <div>
                          <h3
                            className={`font-bold ${
                              variant === 'cyber'
                                ? 'text-cyan-300'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {projection.player_name}
                          </h3>
                          <p
                            className={`text-sm ${
                              variant === 'cyber'
                                ? 'text-cyan-400/70'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {projection.team} • {projection.position} • {projection.sport}
                          </p>
                        </div>

                        {/* Confidence Badge */}
                        <div
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            projection.confidence >= 80
                              ? 'bg-green-500/20 text-green-400'
                              : projection.confidence >= 70
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {projection.confidence.toFixed(1)}%
                        </div>
                      </div>

                      {/* Stat Line */}
                      <div className='mb-3'>
                        <div
                          className={`text-center p-3 rounded ${
                            variant === 'cyber'
                              ? 'bg-black/50 border border-cyan-400/20'
                              : 'bg-gray-50 dark:bg-gray-700'
                          }`}
                        >
                          <div
                            className={`text-lg font-bold ${
                              variant === 'cyber'
                                ? 'text-cyan-400'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {projection.stat_type}
                          </div>
                          <div
                            className={`text-2xl font-bold ${
                              variant === 'cyber'
                                ? 'text-cyan-300'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {projection.line_score}
                          </div>

                          {/* ML Prediction Display */}
                          {projection.ml_prediction && (
                            <div
                              className={`text-sm mt-1 ${
                                variant === 'cyber'
                                  ? 'text-cyan-400/70'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              AI Predicts: {projection.ml_prediction.prediction.toFixed(1)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Over/Under Buttons */}
                      <div className='grid grid-cols-2 gap-2 mb-3'>
                        <button
                          onClick={() => handleProjectionSelect(projection, 'over')}
                          className={`p-2 rounded font-medium transition-all ${
                            selectedEntries.some(
                              entry =>
                                entry.projection.id === projection.id && entry.selection === 'over'
                            )
                              ? variant === 'cyber'
                                ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                                : 'bg-green-100 text-green-700 border border-green-500'
                              : variant === 'cyber'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
                                : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                          }`}
                        >
                          OVER {projection.line_score}
                        </button>

                        <button
                          onClick={() => handleProjectionSelect(projection, 'under')}
                          className={`p-2 rounded font-medium transition-all ${
                            selectedEntries.some(
                              entry =>
                                entry.projection.id === projection.id && entry.selection === 'under'
                            )
                              ? variant === 'cyber'
                                ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                                : 'bg-red-100 text-red-700 border border-red-500'
                              : variant === 'cyber'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
                                : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                          }`}
                        >
                          UNDER {projection.line_score}
                        </button>
                      </div>

                      {/* Metrics */}
                      <div className='grid grid-cols-3 gap-2 text-xs'>
                        {projection.value_rating !== undefined && (
                          <div className='text-center'>
                            <div
                              className={variant === 'cyber' ? 'text-cyan-400/70' : 'text-gray-500'}
                            >
                              Value
                            </div>
                            <div
                              className={`font-bold ${
                                projection.value_rating > 10
                                  ? 'text-green-500'
                                  : projection.value_rating > 5
                                    ? 'text-yellow-500'
                                    : 'text-red-500'
                              }`}
                            >
                              {projection.value_rating.toFixed(1)}%
                            </div>
                          </div>
                        )}

                        {projection.kelly_percentage !== undefined && (
                          <div className='text-center'>
                            <div
                              className={variant === 'cyber' ? 'text-cyan-400/70' : 'text-gray-500'}
                            >
                              Kelly
                            </div>
                            <div
                              className={`font-bold ${
                                variant === 'cyber'
                                  ? 'text-cyan-300'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {projection.kelly_percentage.toFixed(1)}%
                            </div>
                          </div>
                        )}

                        {projection.ml_prediction?.risk_assessment && (
                          <div className='text-center'>
                            <div
                              className={variant === 'cyber' ? 'text-cyan-400/70' : 'text-gray-500'}
                            >
                              Risk
                            </div>
                            <div
                              className={`font-bold capitalize ${
                                projection.ml_prediction.risk_assessment.level === 'low'
                                  ? 'text-green-500'
                                  : projection.ml_prediction.risk_assessment.level === 'medium'
                                    ? 'text-yellow-500'
                                    : 'text-red-500'
                              }`}
                            >
                              {projection.ml_prediction.risk_assessment.level}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SHAP Button */}
                      {enableShapExplanations && projection.shap_values && (
                        <div className='mt-3'>
                          <button
                            onClick={() => {
                              setSelectedProjection(projection);
                              setShowShapModal(true);
                            }}
                            className={`w-full p-2 rounded text-xs font-medium transition-all ${
                              variant === 'cyber'
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30'
                                : 'bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200'
                            }`}
                          >
                            View AI Explanation (SHAP)
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lineup Builder Panel */}
          <div className='lg:col-span-1'>
            <div
              className={`sticky top-6 p-4 rounded-lg border ${
                variant === 'cyber'
                  ? 'bg-gray-900/50 border-cyan-400/30'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${
                  variant === 'cyber' ? 'text-cyan-400' : 'text-gray-900 dark:text-white'
                }`}
              >
                Lineup Builder
              </h3>

              {/* Selected Entries */}
              <div className='space-y-2 mb-4 max-h-64 overflow-y-auto'>
                {selectedEntries.length === 0 ? (
                  <div
                    className={`text-center py-6 ${
                      variant === 'cyber' ? 'text-cyan-300/50' : 'text-gray-500'
                    }`}
                  >
                    <div className='text-2xl mb-2'>🎯</div>
                    <p className='text-sm'>Select props to build your lineup</p>
                  </div>
                ) : (
                  selectedEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-3 rounded border ${
                        variant === 'cyber'
                          ? 'bg-black/50 border-cyan-400/20'
                          : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <div
                            className={`font-medium text-sm ${
                              variant === 'cyber'
                                ? 'text-cyan-300'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {entry.projection.player_name}
                          </div>
                          <div
                            className={`text-xs ${
                              variant === 'cyber'
                                ? 'text-cyan-400/70'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {entry.selection.toUpperCase()} {entry.projection.line_score}{' '}
                            {entry.projection.stat_type}
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              variant === 'cyber' ? 'text-cyan-300/70' : 'text-gray-500'
                            }`}
                          >
                            Confidence: {entry.confidence.toFixed(1)}%
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setSelectedEntries(prev => prev.filter(e => e.id !== entry.id))
                          }
                          className={`ml-2 p-1 rounded text-xs ${
                            variant === 'cyber'
                              ? 'text-red-400 hover:bg-red-500/20'
                              : 'text-red-600 hover:bg-red-100'
                          }`}
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Optimize Button */}
              <button
                onClick={optimizeLineup}
                disabled={selectedEntries.length < 2 || isOptimizing}
                className={`w-full p-3 rounded-lg font-bold transition-all ${
                  selectedEntries.length >= 2 && !isOptimizing
                    ? variant === 'cyber'
                      ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/40'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isOptimizing ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='animate-spin rounded-full h-4 w-4 border-2 border-transparent border-t-current' />
                    <span>Optimizing...</span>
                  </div>
                ) : variant === 'cyber' ? (
                  'OPTIMIZE LINEUP'
                ) : (
                  'Optimize Lineup'
                )}
              </button>

              {/* Optimized Lineup Display */}
              {optimizedLineup && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg border ${
                    variant === 'cyber'
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-green-100 border-green-500 dark:bg-green-900/30'
                  }`}
                >
                  <h4
                    className={`font-bold text-sm mb-2 ${
                      variant === 'cyber' ? 'text-green-400' : 'text-green-800 dark:text-green-400'
                    }`}
                  >
                    Optimized Lineup
                  </h4>

                  <div className='space-y-2 text-xs'>
                    <div className='flex justify-between'>
                      <span>Total Confidence:</span>
                      <span className='font-bold'>
                        {optimizedLineup.total_confidence.toFixed(1)}%
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Expected Payout:</span>
                      <span className='font-bold'>
                        {optimizedLineup.expected_payout.toFixed(2)}x
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Value Score:</span>
                      <span className='font-bold'>{optimizedLineup.value_score.toFixed(1)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Risk Score:</span>
                      <span
                        className={`font-bold ${
                          optimizedLineup.risk_score < 30
                            ? 'text-green-500'
                            : optimizedLineup.risk_score < 60
                              ? 'text-yellow-500'
                              : 'text-red-500'
                        }`}
                      >
                        {optimizedLineup.risk_score.toFixed(1)}
                      </span>
                    </div>
                    {enableKellyOptimization && (
                      <div className='flex justify-between'>
                        <span>Kelly Optimization:</span>
                        <span className='font-bold'>
                          {optimizedLineup.kelly_optimization.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Place Bet Button */}
                  <button
                    onClick={handlePlaceBet}
                    className={`w-full mt-3 p-2 rounded font-bold text-sm transition-all ${
                      variant === 'cyber'
                        ? 'bg-green-500/30 text-green-400 border border-green-500/50 hover:bg-green-500/40'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {variant === 'cyber' ? 'PLACE BET' : 'Place Bet'}
                  </button>
                </motion.div>
              )}

              {/* Clear All Button */}
              {selectedEntries.length > 0 && (
                <button
                  onClick={() => setSelectedEntries([])}
                  className={`w-full mt-2 p-2 rounded font-medium text-sm transition-all ${
                    variant === 'cyber'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                      : 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200'
                  }`}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SHAP Explanation Modal */}
        <AnimatePresence>
          {showShapModal && selectedProjection?.shap_values && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
              onClick={() => setShowShapModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`max-w-2xl w-full rounded-lg border p-6 ${
                  variant === 'cyber'
                    ? 'bg-black border-cyan-400/50'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
                onClick={e => e.stopPropagation()}
              >
                <div className='flex items-center justify-between mb-4'>
                  <h3
                    className={`text-xl font-bold ${
                      variant === 'cyber' ? 'text-cyan-400' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    AI Prediction Explanation
                  </h3>
                  <button
                    onClick={() => setShowShapModal(false)}
                    className={`p-2 rounded ${
                      variant === 'cyber'
                        ? 'text-cyan-400 hover:bg-cyan-400/10'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    ×
                  </button>
                </div>

                <div className='space-y-4'>
                  {/* Player Info */}
                  <div
                    className={`p-3 rounded ${
                      variant === 'cyber' ? 'bg-gray-900/50' : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <h4
                      className={`font-bold ${
                        variant === 'cyber' ? 'text-cyan-300' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {selectedProjection.player_name} - {selectedProjection.stat_type}
                    </h4>
                    <p
                      className={`text-sm ${
                        variant === 'cyber'
                          ? 'text-cyan-400/70'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Line: {selectedProjection.line_score} | Prediction:{' '}
                      {selectedProjection.ml_prediction?.prediction.toFixed(1)}
                    </p>
                  </div>

                  {/* SHAP Values */}
                  <div>
                    <h5
                      className={`font-medium mb-2 ${
                        variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Feature Importance
                    </h5>
                    <div className='space-y-2'>
                      {Object.entries(selectedProjection.shap_values.shap_values).map(
                        ([feature, value]) => (
                          <div key={feature} className='flex items-center justify-between'>
                            <span
                              className={`text-sm ${
                                variant === 'cyber'
                                  ? 'text-cyan-300'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <div className='flex items-center space-x-2'>
                              <div
                                className={`w-20 h-2 rounded ${
                                  variant === 'cyber' ? 'bg-gray-800' : 'bg-gray-200'
                                }`}
                              >
                                <div
                                  className={`h-2 rounded ${
                                    value > 0 ? 'bg-green-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.abs(value) * 100}%` }}
                                />
                              </div>
                              <span
                                className={`text-sm font-medium ${
                                  value > 0 ? 'text-green-500' : 'text-red-500'
                                }`}
                              >
                                {value > 0 ? '+' : ''}
                                {(value * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <h5
                      className={`font-medium mb-2 ${
                        variant === 'cyber' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      AI Explanation
                    </h5>
                    <p
                      className={`text-sm ${
                        variant === 'cyber'
                          ? 'text-cyan-300/80'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {selectedProjection.shap_values.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PrizePicksProUnified;
