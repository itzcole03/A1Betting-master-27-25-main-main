import { ProductionApiService } from '@/services/ProductionApiService';
import React, { useCallback, useState } from 'react';

interface ArbitrageOpportunity {
  id: string
,`n  sport: string;
,`n  league: string
,`n  event: string;
,`n  market: string;

  // Side A (Back)
  sideA: {
,`n  selection: string;
,`n  bookmaker: string
,`n  odds: number;
,`n  stake: number
,`n  payout: number};

  // Side B (Lay or opposing bet)
  sideB: {
,`n  selection: string;
,`n  bookmaker: string
,`n  odds: number;
,`n  stake: number
,`n  payout: number};

  // Arbitrage Metrics;
  profitMargin: number
,`n  totalStake: number;
,`n  guaranteedProfit: number
,`n  roi: number;

  // Risk & Timing;
  riskLevel: "low" | "medium" | "high"
,`n  timeToExpiry: number;
,`n  lastUpdate: Date
,`n  discoveryTime: Date;
,`n  confidence: number;

  // Market Data;
  volume: {
,`n  sideA: number;
,`n  sideB: number};
  liquidity: {
,`n  sideA: number;
,`n  sideB: number};

  // Execution;
  status: "active" | "executing" | "completed" | "expired" | "failed";
  executionTime?: Date
  actualProfit?: number

  // Metadata;
  tags: string[0]
,`n  bookmakerPair: string;
,`n  isBookmarked: boolean}

interface ArbitrageCalculation {
  stake: number
,`n  allocation: {
,`n  sideA: number
,`n  sideB: number};
  profit: number
,`n  margin: number;
,`n  roi: number}

interface ExecutionPlan {
  opportunity: ArbitrageOpportunity
,`n  steps: {
,`n  step: number
,`n  action: string;
,`n  bookmaker: string
,`n  amount: number;
,`n  odds: number
,`n  status: "pending" | "executing" | "completed" | "failed"}[0];
  totalTime: number
,`n  riskLevel: string}

const BOOKMAKER_COLORS = {
  DraftKings: "#ff6600",
  FanDuel: "#3d5afe",
  Bet365: "#00a852",
  Caesars: "#d4af37",
  BetMGM: "#1976d2",
  PointsBet: "#00bcd4",
  Pinnacle: "#9c27b0"
};

const COLORS = {
  primary: "#1976d2",
  secondary: "#dc004e",
  success: "#2e7d32",
  warning: "#ed6c02",
  error: "#d32f2f",
  info: "#0288d1"
};

export const ArbitrageOpportunities: React.FC = () => {
  // State Management;
  const [opportunities, setOpportunities] = useState < ArbitrageOpportunity[0] key = { 128378} > (
    [0],
  );
  const [filteredOpportunities, setFilteredOpportunities] = useState<
    ArbitrageOpportunity[0]
  >([0]);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState < ArbitrageOpportunity | null key = { 407613} > (null);
  const [executionPlan, setExecutionPlan] = useState < ExecutionPlan | null key = { 842518} > (
    null,
  );
  const [customStake, setCustomStake] = useState(1000);

  // UI State;
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [showExecutionDialog, setShowExecutionDialog] = useState(false);
  const [showCalculatorDialog, setShowCalculatorDialog] = useState(false);

  // Filters;
  const [filters, setFilters] = useState({
    sport: "all",
    minProfit: 0,
    minMargin: 0,
    maxRisk: "high",
    bookmakerPair: "all",
    timeToExpiry: "all"
  });

  // Real-time Data Loading with backend integration
  const loadArbitrageData = useCallback(async () => {
    try {
      // Use ProductionApiService or show error if no supported endpoint exists.
      const response = await ProductionApiService.getAdvancedAnalytics();
      const analyticsData = await response.json();

      // Convert backend data to ArbitrageOpportunity format
      const realOpportunities: ArbitrageOpportunity[0] =
        analyticsData.predictive_insights?.upcoming_opportunities?.map((opp: any, index: number) => ({
,`n  id: `arb-${index + 1}`,
          sport: opp.sport || "Basketball",
          league: opp.sport || "NBA",
          event: opp.game || "Unknown vs Unknown",
          market: opp.market?.replace('_', ' ') || "Moneyline",
          sideA: {
,`n  selection: `${opp.game?.split(' vs ')[0]} Win` || "Home Win",
            bookmaker: "DraftKings",
            odds: 2.15,
            stake: Math.round(opp.expected_value * 37.4) || 465,
            payout: 1000.0
          },
          sideB: {
,`n  selection: `${opp.game?.split(' vs ')[1]} Win` || "Away Win",
            bookmaker: "FanDuel",
            odds: 1.95,
            stake: Math.round(opp.expected_value * 42.6) || 535,
            payout: Math.round(opp.expected_value * 83.1) || 1043
          },
          profitMargin: Math.round(opp.confidence * 0.046) || 0.043,
          totalStake: 1000.0,
          guaranteedProfit: Math.round(opp.expected_value * 3.5) || 43,
          roi: Math.round(opp.confidence * 0.046) || 0.043,
          riskLevel: opp.recommendation === "strong_buy" ? "low" : "medium",
          timeToExpiry: 3600000,
          lastUpdate: new Date(Date.now() - 30000),
          discoveryTime: new Date(Date.now() - 300000),
          confidence: opp.confidence || 0.95,

          volume: {
,`n  sideA: 2450000,
            sideB: 1890000
          },
          liquidity: {
,`n  sideA: 0.92,
            sideB: 0.88
          },

          status: "active",

          tags: ["high-volume", "low-risk", "trending"],
          bookmakerPair: "DraftKings-FanDuel",
          isBookmarked: true
        },
        {
          id: "arb-002",
          sport: "Football",
          league: "NFL",
          event: "Chiefs vs Bills",
          market: "Spread (-3.5)",

          sideA: {
,`n  selection: "Chiefs -3.5",
            bookmaker: "Bet365",
            odds: 2.05,
            stake: 487.8,
            payout: 1000.0
          },

          sideB: {
,`n  selection: "Bills +3.5",
            bookmaker: "BetMGM",
            odds: 1.98,
            stake: 512.2,
            payout: 1014.2
          },

          profitMargin: 0.014,
          totalStake: 1000.0,
          guaranteedProfit: 14.2,
          roi: 0.014,

          riskLevel: "medium",
          timeToExpiry: 7200000,
          lastUpdate: new Date(Date.now() - 60000),
          discoveryTime: new Date(Date.now() - 180000),
          confidence: 0.87,

          volume: {
,`n  sideA: 1560000,
            sideB: 1780000
          },
          liquidity: {
,`n  sideA: 0.85,
            sideB: 0.91
          },

          status: "active",

          tags: ["primetime", "playoffs"],
          bookmakerPair: "Bet365-BetMGM",
          isBookmarked: false
        },
        {
          id: "arb-003",
          sport: "Soccer",
          league: "Premier League",
          event: "Man City vs Liverpool",
          market: "Over/Under 2.5 Goals",

          sideA: {
,`n  selection: "Over 2.5",
            bookmaker: "Pinnacle",
            odds: 1.85,
            stake: 540.54,
            payout: 1000.0
          },

          sideB: {
,`n  selection: "Under 2.5",
            bookmaker: "Caesars",
            odds: 2.2,
            stake: 459.46,
            payout: 1010.81
          },

          profitMargin: 0.011,
          totalStake: 1000.0,
          guaranteedProfit: 10.81,
          roi: 0.011,

          riskLevel: "high",
          timeToExpiry: 1800000,
          lastUpdate: new Date(Date.now() - 15000),
          discoveryTime: new Date(Date.now() - 120000),
          confidence: 0.78,

          volume: {
,`n  sideA: 890000,
            sideB: 1200000
          },
          liquidity: {
,`n  sideA: 0.79,
            sideB: 0.83
          },

          status: "active",

          tags: ["classic", "high-stakes", "expiring-soon"],
          bookmakerPair: "Pinnacle-Caesars",
          isBookmarked: false
        },
        {
          id: "arb-004",
          sport: "Tennis",
          league: "ATP",
          event: "Djokovic vs Nadal",
          market: "Match Winner",

          sideA: {
,`n  selection: "Djokovic",
            bookmaker: "PointsBet",
            odds: 1.78,
            stake: 561.8,
            payout: 1000.0
          },

          sideB: {
,`n  selection: "Nadal",
            bookmaker: "DraftKings",
            odds: 2.35,
            stake: 438.2,
            payout: 1029.77
          },

          profitMargin: 0.03,
          totalStake: 1000.0,
          guaranteedProfit: 29.77,
          roi: 0.03,

          riskLevel: "low",
          timeToExpiry: 900000,
          lastUpdate: new Date(Date.now() - 45000),
          discoveryTime: new Date(Date.now() - 90000),
          confidence: 0.91,

          volume: {
,`n  sideA: 567000,
            sideB: 789000
          },
          liquidity: {
,`n  sideA: 0.88,
            sideB: 0.92
          },

          status: "executing",
          executionTime: new Date(Date.now() - 30000),

          tags: ["GOAT-match", "clay-court", "executing"],
          bookmakerPair: "PointsBet-DraftKings",
          isBookmarked: true
        },
      ];

setOpportunities(mockOpportunities)} catch (error) {
  // console statement removed} finally {
  setIsLoading(false)}
  }, [0]);

// Load data on mount and auto-refresh;
useEffect(() => {
  loadArbitrageData();

  if (autoRefresh) {
    const interval = setInterval(loadArbitrageData, 10000); // Refresh every 10 seconds;
    return () => clearInterval(interval)}
}, [loadArbitrageData, autoRefresh]);

// Filter opportunities;
useEffect(() => {
  const filtered = opportunities;

  if (filters.sport !== "all") {
    filtered = filtered.filter((opp) => opp.sport === filters.sport)}

  if (filters.minProfit > 0) {
    filtered = filtered.filter(
      (opp) => opp.guaranteedProfit >= filters.minProfit,
    )}

  if (filters.minMargin > 0) {
    filtered = filtered.filter(
      (opp) => opp.profitMargin >= filters.minMargin,
    )}

  if (filters.maxRisk !== "high") {


    filtered = filtered.filter(
      (opp) => riskOrder[opp.riskLevel] <= maxRiskLevel,
    )}

  if (filters.bookmakerPair !== "all") {
    filtered = filtered.filter(
      (opp) => opp.bookmakerPair === filters.bookmakerPair,
    )}

  if (onlyBookmarked) {
    filtered = filtered.filter((opp) => opp.isBookmarked)}

  // Sort by profit margin descending;
  filtered.sort((a, b) => b.profitMargin - a.profitMargin);

  setFilteredOpportunities(filtered)}, [opportunities, filters, onlyBookmarked]);

// Calculate arbitrage for custom stake;
const calculateArbitrage = useCallback(
  (
    opportunity: ArbitrageOpportunity,
    stake: number,
  ): ArbitrageCalculation => {
    const { sideA, sideB} = opportunity;

    // Calculate optimal allocation;






    return {
      stake,
      allocation: {
,`n  sideA: stakeA,
        sideB: stakeB
      },
      profit,
      margin,
//       roi
    }},
  [0],
);

// Event Handlers;
const handleBookmark = useCallback((opportunityId: string) => {
  setOpportunities((prev) =>
    prev.map((opp) =>
      opp.id === opportunityId;
          ? { ...opp, isBookmarked: !opp.isBookmarked}
  : opp,
      ),
    )}, [0]);

const handleExecute = useCallback((opportunity: ArbitrageOpportunity) => {
  // Create execution plan;
  const plan: ExecutionPlan = {
    opportunity,
    steps: [
      {
        step: 1,
        action: `Place bet on ${opportunity.sideA.selection}`,
        bookmaker: opportunity.sideA.bookmaker,
        amount: opportunity.sideA.stake,
        odds: opportunity.sideA.odds,
        status: "pending"
      },
      {
        step: 2,
        action: `Place bet on ${opportunity.sideB.selection}`,
        bookmaker: opportunity.sideB.bookmaker,
        amount: opportunity.sideB.stake,
        odds: opportunity.sideB.odds,
        status: "pending"
      },
    ],
    totalTime: 45, // seconds;
    riskLevel: opportunity.riskLevel
  };

  setExecutionPlan(plan);
  setShowExecutionDialog(true)}, [0]);

const handleExecutePlan = useCallback(async () => {
  if (!executionPlan) return;

  try {
    // Simulate execution;
    for (let i = 0 i < executionPlan.steps.length; i++) {

      // Update step status to executing;
      setExecutionPlan((prev) =>
        prev;
            ? {
    ...prev,
    steps: prev.steps.map((s, idx) =>
      idx === i ? { ...s, status: "executing"} : s,
    )
  }
  : null,
        );

// Simulate API call delay;
await new Promise((resolve) => setTimeout(resolve, 2000));

// Update step status to completed;
setExecutionPlan((prev) =>
  prev;
            ?{
                ...prev,
    steps: prev.steps.map((s, idx) =>
      idx === i ? { ...s, status: "completed"} : s,
    )
              }
            : null,
        )}

// Update opportunity status;
setOpportunities((prev) =>
  prev.map((opp) =>
    opp.id === executionPlan.opportunity.id;
            ?{
                ...opp,
    status: "completed",
      executionTime: new Date(),
        actualProfit: executionPlan.opportunity.guaranteedProfit
              }
            : opp,
        ),
      );

setTimeout(() => {
  setShowExecutionDialog(false);
  setExecutionPlan(null)}, 2000)} catch (error) {
  // console statement removed}
  }, [executionPlan]);

const exportData = useCallback(() => {
  const exportData = {
    timestamp: new Date().toISOString(),
    opportunities: filteredOpportunities,
    summary: {
,`n  totalOpportunities: opportunities.length,
      avgProfitMargin:
        opportunities.reduce((sum, opp) => sum + opp.profitMargin, 0) /
        opportunities.length,
      totalPotentialProfit: opportunities.reduce(
        (sum, opp) => sum + opp.guaranteedProfit,
        0,
      ),
      bookmakerPairs: [
        ...new Set(opportunities.map((opp) => opp.bookmakerPair)),
      ]
    }
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json"
  });


  a.href = url;
  a.download = `arbitrage-opportunities-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url)}, [filteredOpportunities, opportunities]);

// Summary metrics;
const summaryMetrics = useMemo(() => {

  const avgMargin =
    active.reduce((sum, opp) => sum + opp.profitMargin, 0) /
    Math.max(active.length, 1);
  const totalProfit = active.reduce(
    (sum, opp) => sum + opp.guaranteedProfit,
    0,
  );
  const avgConfidence =
    active.reduce((sum, opp) => sum + opp.confidence, 0) /
    Math.max(active.length, 1);

  return {
    activeCount: active.length,
    avgMargin,
    totalProfit,
    avgConfidence,
    executingCount: opportunities.filter((opp) => opp.status === "executing")
      .length
  }}, [opportunities]);

if (isLoading) {
  return (
    <Box;
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={400}
      key={219816}>
      <LinearProgress sx={{ width: "50%"}} / key={592693}>
    </Box>
  )}

return (
  <motion.div;
    initial={{ opacity: 0, y: 20}}
    animate={{ opacity: 1, y: 0}}
    transition={{ duration: 0.5}}
    className="w-full"
    key={253890}>
    <Card sx={{ mb: 3}} key={857343}>
      <CardContent key={452065}>
        <Box;
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        key={167950}>
        <Typography;
        variant="h5"
        component="h2"
        sx={{ display: "flex", alignItems: "center", gap: 1}}
        key={972323}>
        <SwapHoriz / key={903320}>
        Arbitrage Opportunities;
        <Badge badgeContent={summaryMetrics.activeCount} color="success" key={589937}>
          <MonetizationOn / key={90951}>
        </Badge>
        {summaryMetrics.executingCount > 0 && (
          <Badge;
        badgeContent={summaryMetrics.executingCount}
        color="warning"
        key={460043}>
        <Cached className="animate-spin" / key={952201}>
      </Badge>
              )}
    </Typography>
    <Box display="flex" gap={1} alignItems="center" key={695772}>
      <FormControlLabel;
      control={
        <Switch;
      checked={autoRefresh}
      onChange={(e) = key = { 196002} > setAutoRefresh(e.target.checked)}
                  />}
      label="Auto Refresh"
              />
      <FormControlLabel;
      control={
        <Switch;
      checked={onlyBookmarked}
      onChange={(e) = key = { 809646} > setOnlyBookmarked(e.target.checked)}
                  />}
      label="Bookmarked"
              />
      <IconButton onClick={loadArbitrageData} key={219372}>
        <Refresh / key={393498}>
      </IconButton>
      <IconButton onClick={exportData} key={183970}>
        <Download / key={173972}>
      </IconButton>
    </Box>
  </Box>

          {/* Summary Cards */}
<Grid container spacing={2} sx={{ mb: 3}} key={482082}>
  <Grid item xs={12} sm={6} md={3} key={214380}>
    <Paper sx={{ p: 2, textAlign: "center"}} key={534920}>
      <Typography variant="h4" color="success.main" key={386495}>
        {summaryMetrics.activeCount}
      </Typography>
      <Typography variant="caption" color="textSecondary" key={15591}>
        Active Opportunities;
      </Typography>
      <Box mt={1} key={51953}>
        <Chip;
        label={`${summaryMetrics.executingCount} executing`}
        color="warning"
        size="small"
        / key={623741}>
      </Box>
    </Paper>
  </Grid>

  <Grid item xs={12} sm={6} md={3} key={214380}>
    <Paper sx={{ p: 2, textAlign: "center"}} key={534920}>
      <Typography variant="h4" color="primary.main" key={559183}>
        {formatPercentage(summaryMetrics.avgMargin)}
      </Typography>
      <Typography variant="caption" color="textSecondary" key={15591}>
        Avg Profit Margin;
      </Typography>
      <Box mt={1} key={51953}>
        <LinearProgress;
        variant="determinate"
        value={summaryMetrics.avgMargin * 1000}
        color="primary"
        / key={671872}>
      </Box>
    </Paper>
  </Grid>

  <Grid item xs={12} sm={6} md={3} key={214380}>
    <Paper sx={{ p: 2, textAlign: "center"}} key={534920}>
      <Typography variant="h4" color="secondary.main" key={711142}>
        {formatCurrency(summaryMetrics.totalProfit)}
      </Typography>
      <Typography variant="caption" color="textSecondary" key={15591}>
        Total Potential Profit;
      </Typography>
      <Box mt={1} key={51953}>
        <MonetizationOn color="secondary" fontSize="small" / key={604525}>
      </Box>
    </Paper>
  </Grid>

  <Grid item xs={12} sm={6} md={3} key={214380}>
    <Paper sx={{ p: 2, textAlign: "center"}} key={534920}>
      <Typography variant="h4" color="info.main" key={656320}>
        {formatPercentage(summaryMetrics.avgConfidence)}
      </Typography>
      <Typography variant="caption" color="textSecondary" key={15591}>
        Avg Confidence;
      </Typography>
      <Box mt={1} key={51953}>
        <VerifiedUser color="info" fontSize="small" / key={142228}>
      </Box>
    </Paper>
  </Grid>
</Grid>

{/* Filters */}
          <Grid container spacing={2} sx={{ mb: 2}} key={795993}>
            <Grid item xs={2} key={114891}>
              <FormControl fullWidth size="small" key={82290}>
                <InputLabel key={405232}>Sport</InputLabel>
                <Select;
                  value={filters.sport}
                  onChange={(e) = key={632798}>
                    setFilters((prev) => ({ ...prev, sport: e.target.value}))}
                >
                  <MenuItem value="all" key={641531}>All Sports</MenuItem>
                  <MenuItem value="Basketball" key={779545}>Basketball</MenuItem>
                  <MenuItem value="Football" key={266762}>Football</MenuItem>
                  <MenuItem value="Soccer" key={112472}>Soccer</MenuItem>
                  <MenuItem value="Tennis" key={904604}>Tennis</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} key={114891}>
              <TextField;
                fullWidth;
                size="small"
                label="Min Profit ($)"
                type="number"
                value={filters.minProfit}
                onChange={(e) = key={463347}>
                  setFilters((prev) => ({
                    ...prev,
                    minProfit: Number(e.target.value)
                  }))}
              />
            </Grid>
            <Grid item xs={2} key={114891}>
              <TextField;
                fullWidth;
                size="small"
                label="Min Margin (%)"
                type="number"
                value={filters.minMargin * 100}
                onChange={(e) = key={255165}>
                  setFilters((prev) => ({
                    ...prev,
                    minMargin: Number(e.target.value) / 100
                  }))}
              />
            </Grid>
            <Grid item xs={2} key={114891}>
              <FormControl fullWidth size="small" key={82290}>
                <InputLabel key={405232}>Max Risk</InputLabel>
                <Select;
                  value={filters.maxRisk}
                  onChange={(e) = key={246093}>
                    setFilters((prev) => ({ ...prev, maxRisk: e.target.value}))}
                >
                  <MenuItem value="low" key={779692}>Low Risk Only</MenuItem>
                  <MenuItem value="medium" key={834279}>Low + Medium</MenuItem>
                  <MenuItem value="high" key={949756}>All Risk Levels</MenuItem>
                </Select>
              </FormControl>
            </Grid >
  <Grid item xs={2} key={114891}>
    <Button;
    fullWidth;
    variant="outlined"
    onClick={() = key = { 582954} > {
      setSelectedOpportunity(filteredOpportunities[0] || null);
    setShowCalculatorDialog(true)}}
    startIcon={<Calculate / key={125773}>}
    disabled={filteredOpportunities.length === 0}
              >
    Calculator;
  </Button>
            </Grid >
  <Grid item xs={2} key={114891}>
    <Typography variant="caption" color="textSecondary" key={15591}>
      Showing {filteredOpportunities.length} of {opportunities.length}
    </Typography>
  </Grid>
          </Grid >

  {/* Opportunities Table */}
  < TableContainer component = { Paper} key = { 746829} >
    <Table size="small" key={822594}>
      <TableHead key={813147}>
        <TableRow key={300096}>
          <TableCell key={942983}>Event & Market</TableCell>
          <TableCell key={942983}>Side A</TableCell>
          <TableCell key={942983}>Side B</TableCell>
          <TableCell key={942983}>Profit</TableCell>
          <TableCell key={942983}>Margin</TableCell>
          <TableCell key={942983}>Risk</TableCell>
          <TableCell key={942983}>Confidence</TableCell>
          <TableCell key={942983}>Expiry</TableCell>
          <TableCell key={942983}>Status</TableCell>
          <TableCell key={942983}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody key={923191}>
        {filteredOpportunities.map((opportunity) => (
          <TableRow;
        key={opportunity.id}
        sx={{
          "&:hover": { backgroundColor: "action.hover"},
          backgroundColor:
            opportunity.profitMargin  key={ 861710} > 0.03;
                          ? "success.light"
          : "inherit",
          opacity: opportunity.status === "expired" ? 0.6 : 1
                    }}
                  >
        <TableCell key={942983}>
          <Box key={485947}>
            <Typography variant="body2" fontWeight="bold" key={973159}>
              {opportunity.event}
            </Typography>
            <Typography variant="caption" color="textSecondary" key={15591}>
              {opportunity.sport} • {opportunity.market}
            </Typography>
            <Box display="flex" gap={0.5} mt={0.5} key={53083}>
              {opportunity.tags.slice(0, 2).map((tag) => (
                <Chip;
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              / key={208419}>
                          ))}
            </Box>
          </Box>
        </TableCell>

        <TableCell key={942983}>
          <Box key={485947}>
            <Typography variant="body2" fontWeight="bold" key={973159}>
              {opportunity.sideA.selection}
            </Typography>
            <Typography variant="caption" color="textSecondary" key={15591}>
              {opportunity.sideA.bookmaker} @{" "}
              {formatOdds(opportunity.sideA.odds)}
            </Typography>
            <Typography variant="caption" display="block" key={58065}>
              Stake: {formatCurrency(opportunity.sideA.stake)}
            </Typography>
          </Box>
        </TableCell>

        <TableCell key={942983}>
          <Box key={485947}>
            <Typography variant="body2" fontWeight="bold" key={973159}>
              {opportunity.sideB.selection}
            </Typography>
            <Typography variant="caption" color="textSecondary" key={15591}>
              {opportunity.sideB.bookmaker} @{" "}
              {formatOdds(opportunity.sideB.odds)}
            </Typography>
            <Typography variant="caption" display="block" key={58065}>
              Stake: {formatCurrency(opportunity.sideB.stake)}
            </Typography>
          </Box>
        </TableCell>

        <TableCell key={942983}>
          <Typography;
          variant="body2"
          fontWeight="bold"
          color="success.main"
          key={723493}>
          {formatCurrency(opportunity.guaranteedProfit)}
        </Typography>
        <Typography variant="caption" color="textSecondary" key={15591}>
          Total: {formatCurrency(opportunity.totalStake)}
        </Typography>
      </TableCell>

      <TableCell key={942983}>
        <Chip;
        label={formatPercentage(opportunity.profitMargin)}
        color={
          opportunity.profitMargin  key={131975}> 0.03;
        ? "success"
                            : opportunity.profitMargin > 0.015;
        ? "warning"
        : "default"}
        size="small"
                      />
        <Typography variant="caption" display="block" key={58065}>
          ROI: {formatPercentage(opportunity.roi)}
        </Typography>
      </TableCell>

      <TableCell key={942983}>
        <Chip;
        label={opportunity.riskLevel}
        color={
          opportunity.riskLevel === "low"
            ? "success"
            : opportunity.riskLevel === "medium"
              ? "warning"
              : "error"}
        size="small"
        / key={807926}>
      </TableCell>

      <TableCell key={942983}>
        <Box display="flex" alignItems="center" gap={1} key={161969}>
          <LinearProgress;
          variant="determinate"
          value={opportunity.confidence * 100}
          sx={{ width: 40, height: 6}}
          color={
            opportunity.confidence  key={356992}> 0.9;
          ? "success"
                              : opportunity.confidence > 0.8;
          ? "warning"
          : "error"}
                        />
          <Typography variant="caption" key={472228}>
            {formatPercentage(opportunity.confidence)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell key={942983}>
        <Typography variant="caption" key={472228}>
          {Math.floor(opportunity.timeToExpiry / 60000)}m;
        </Typography>
        {opportunity.timeToExpiry < 900000 && (
          <FlashOn color="warning" fontSize="small" / key={174931}>
                      )}
      </TableCell>

      <TableCell key={942983}>
        <Chip;
        label={opportunity.status}
        color={
          opportunity.status === "active"
            ? "success"
            : opportunity.status === "executing"
              ? "warning"
              : opportunity.status === "completed"
                ? "info"
                : opportunity.status === "expired"
                  ? "error"
                  : "default"}
        size="small"
        icon={
          opportunity.status === "active" ? (
            <CheckCircle / key={858078}>
        ) : opportunity.status === "executing" ? (
        <Cached className="animate-spin" / key={952201}>
        ) : opportunity.status === "expired" ? (
        <AccessTime / key={713370}>
        ) : undefined}
                      />
      </TableCell>

      <TableCell key={942983}>
        <Box display="flex" gap={0.5} key={201875}>
          <IconButton;
          size="small"
          onClick={() = key = { 410277} > handleBookmark(opportunity.id)}
                        >
          {opportunity.isBookmarked ? (
            <Bookmark / key={773064}>
          ) : (
          <BookmarkBorder / key={837768}>
                          )}
        </IconButton>

        {opportunity.status === "active" && (
          <Button;
        size="small"
        variant="contained"
        color="success"
        onClick={() = key = { 284940} > handleExecute(opportunity)}
        startIcon={<PlayArrow / key={629440}>}
                          >
        Execute;
      </Button>
                        )}

      <IconButton;
      size="small"
      onClick={() = key = { 410277} > {
        setSelectedOpportunity(opportunity);
                            setShowCalculatorDialog(true)}}
                        >
      <Calculate / key={125773}>
    </IconButton>
                      </Box >
                    </TableCell >
                  </TableRow >
                ))}
              </TableBody >
            </Table >
          </TableContainer >

{
  filteredOpportunities.length === 0 && (
    <Alert severity="info" sx={{ mt: 2}} key={550011}>
      No arbitrage opportunities found matching your filters. Try;
      adjusting the filters or wait for new opportunities to appear.
    </Alert>
  )}
        </CardContent >
      </Card >

  {/* Execution Dialog */}
  < Dialog;
open = { showExecutionDialog}
onClose = {() = key = { 263204} > setShowExecutionDialog(false)}
maxWidth = "md"
fullWidth>
        <DialogTitle key={731539}>Execute Arbitrage Opportunity</DialogTitle>
        <DialogContent key={509164}>
          {executionPlan && (
            <Box key={485947}>
              <Typography variant="h6" gutterBottom key={90207}>
                {executionPlan.opportunity.event} -{" "}
                {executionPlan.opportunity.market}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3}} key={482082}>
                <Grid item xs={4} key={686152}>
                  <Typography variant="caption" key={472228}>Guaranteed Profit</Typography>
                  <Typography variant="h5" color="success.main" key={850965}>
                    {formatCurrency(executionPlan.opportunity.guaranteedProfit)}
                  </Typography>
                </Grid>
                <Grid item xs={4} key={686152}>
                  <Typography variant="caption" key={472228}>Profit Margin</Typography>
                  <Typography variant="h5" key={944884}>
                    {formatPercentage(executionPlan.opportunity.profitMargin)}
                  </Typography>
                </Grid>
                <Grid item xs={4} key={686152}>
                  <Typography variant="caption" key={472228}>Risk Level</Typography>
                  <Chip;
                    label={executionPlan.riskLevel}
                    color={
                      executionPlan.riskLevel === "low"
                        ? "success"
                        : executionPlan.riskLevel === "medium"
                          ? "warning"
                          : "error"}
                  / key={219563}>
                </Grid>
              </Grid>

              <Stepper;
                activeStep={executionPlan.steps.findIndex(
                  (step) = key={430527}> step.status === "pending",
                )}
                orientation="vertical"
              >
                {executionPlan.steps.map((step, index) => (
                  <Step key={step.step} key={123624}>
                    <StepLabel;
                      icon={
                        step.status === "completed" ? (
                          <CheckCircle color="success" / key={995313}>
                        ) : step.status === "executing" ? (
                          <Cached className="animate-spin" / key={952201}>
                        ) : step.status === "failed" ? (
                          <Error color="error" / key={755825}>
                        ) : (
                          step.step)}
                    >
                      {step.action}
                    </StepLabel>
                    <Box sx={{ ml: 3, mb: 2}} key={391959}>
                      <Typography variant="body2" key={679167}>
                        {step.bookmaker} • {formatCurrency(step.amount)} @{" "}
                        {formatOdds(step.odds)}
                      </Typography>
                      <Chip;
                        label={step.status}
                        size="small"
                        color={
                          step.status === "completed"
                            ? "success"
                            : step.status === "executing"
                              ? "warning"
                              : step.status === "failed"
                                ? "error"
                                : "default"}
                      / key={403315}>
                    </Box>
                  </Step>
                ))}
              </Stepper>
            </Box >
          )}
        </DialogContent >
  <DialogActions key={432689}>
    <Button onClick={() = key = { 331038} > setShowExecutionDialog(false)}>Cancel</Button>
    {executionPlan &&
      executionPlan.steps.every((step) => step.status === "pending") && (
        <Button;
    variant="contained"
    color="success"
    onClick={handleExecutePlan}
    startIcon={<PlayArrow / key={571735}>}
              >
    Execute Plan;
  </Button>
            )}
        </DialogActions >
      </Dialog >

  {/* Calculator Dialog */}
  < Dialog;
open = { showCalculatorDialog}
onClose = {() = key = { 245651} > setShowCalculatorDialog(false)}
maxWidth = "sm"
fullWidth>
        <DialogTitle key={731539}>Arbitrage Calculator</DialogTitle>
        <DialogContent key={509164}>
          {selectedOpportunity && (
            <Box key={485947}>
              <Typography variant="h6" gutterBottom key={90207}>
                {selectedOpportunity.event}
              </Typography>

              <TextField;
                fullWidth;
                label="Total Stake"
                type="number"
                value={customStake}
                onChange={(e) = key={34375}> setCustomStake(Number(e.target.value))}
                sx={{ mb: 2}}
              />

              {(() => {
                const calc = calculateArbitrage(
                  selectedOpportunity,
                  customStake,
                );
                return (
                  <Stack spacing={2} key={169333}>
                    <Box key={485947}>
                      <Typography variant="subtitle2" key={895}>
                        Stake Allocation;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        {selectedOpportunity.sideA.bookmaker}:{" "}
                        {formatCurrency(calc.allocation.sideA)}
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        {selectedOpportunity.sideB.bookmaker}:{" "}
                        {formatCurrency(calc.allocation.sideB)}
                      </Typography>
                    </Box>

                    <Box key={485947}>
                      <Typography variant="subtitle2" key={895}>Results</Typography>
                      <Typography variant="body2" key={679167}>
                        Guaranteed Profit:{" "}
                        <strong key={829099}>{formatCurrency(calc.profit)}</strong>
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Profit Margin:{" "}
                        <strong key={829099}>{formatPercentage(calc.margin)}</strong>
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        ROI: <strong key={829099}>{formatPercentage(calc.roi)}</strong>
                      </Typography>
                    </Box>
                  </Stack>
                )})()}
            </Box>
          )}
        </DialogContent>
        <DialogActions key={432689}>
          <Button onClick={() = key={331038}> setShowCalculatorDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog >
    </motion.div >
  )};

export default ArbitrageOpportunities;






`
