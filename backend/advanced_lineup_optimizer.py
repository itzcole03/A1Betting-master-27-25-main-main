"""
Advanced Lineup Optimization and Player Analysis Engine
Sophisticated algorithms for DFS lineup building, player projections, and game theory optimization.
"""

import asyncio
import itertools
import json
import logging
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Dict, List, Optional, Tuple

import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)


class Position(Enum):
    QB = "QB"
    RB = "RB"
    WR = "WR"
    TE = "TE"
    K = "K"
    DST = "DST"
    FLEX = "FLEX"


class ContestType(Enum):
    GPP = "gpp"  # Guaranteed Prize Pool
    CASH = "cash"  # Cash games (50/50, double-ups)
    SATELLITE = "satellite"
    QUALIFIER = "qualifier"


@dataclass
class Player:
    id: str
    name: str
    position: Position
    team: str
    opponent: str
    salary: int
    projected_points: float
    projected_ownership: float
    ceiling: float
    floor: float
    value: float  # points per $1000
    injury_status: str
    weather_impact: float
    matchup_rating: float
    recent_form: float
    leverage_score: float


@dataclass
class Lineup:
    id: str
    players: List[Player]
    total_salary: int
    projected_points: float
    projected_ownership: float
    ceiling: float
    floor: float
    leverage_score: float
    correlation_score: float
    uniqueness_score: float
    contest_type: ContestType


@dataclass
class LineupOptimization:
    optimal_lineups: List[Lineup]
    player_exposure: Dict[str, float]
    position_allocations: Dict[str, float]
    salary_efficiency: float
    ownership_correlation: float
    expected_finish: Dict[str, float]  # Distribution of expected finishes


@dataclass
class PlayerProjection:
    player_id: str
    base_projection: float
    ceiling_projection: float
    floor_projection: float
    ownership_projection: float
    variance: float
    confidence_interval: Tuple[float, float]
    key_factors: List[str]


class AdvancedLineupEngine:
    def __init__(self):
        self.player_pool = {}
        self.correlation_matrix = {}
        self.ownership_model = {}
        self.game_theory_optimizer = {}
        self.historical_performances = {}

        # Contest-specific settings
        self.contest_settings = {
            ContestType.GPP: {
                "uniqueness_weight": 0.4,
                "ceiling_weight": 0.6,
                "correlation_penalty": 0.2,
            },
            ContestType.CASH: {
                "uniqueness_weight": 0.1,
                "ceiling_weight": 0.2,
                "floor_weight": 0.7,
            },
        }

    async def optimize_lineups(
        self,
        player_pool: List[Player],
        contest_type: ContestType,
        num_lineups: int = 20,
        max_exposure: float = 0.5,
    ) -> LineupOptimization:
        """Generate optimal lineups using advanced optimization algorithms"""

        if not player_pool:
            return LineupOptimization(
                optimal_lineups=[],
                player_exposure={},
                position_allocations={},
                salary_efficiency=0.0,
                ownership_correlation=0.0,
                expected_finish={},
            )

        # Generate diverse lineup pool
        lineups = await self._generate_lineup_pool(
            player_pool, contest_type, num_lineups * 5
        )

        # Apply game theory optimization
        optimized_lineups = self._game_theory_optimization(
            lineups, contest_type, num_lineups
        )

        # Apply exposure constraints
        final_lineups = self._apply_exposure_constraints(
            optimized_lineups, max_exposure
        )

        # Calculate portfolio metrics
        player_exposure = self._calculate_player_exposure(final_lineups)
        position_allocations = self._calculate_position_allocations(final_lineups)

        return LineupOptimization(
            optimal_lineups=final_lineups[:num_lineups],
            player_exposure=player_exposure,
            position_allocations=position_allocations,
            salary_efficiency=self._calculate_salary_efficiency(final_lineups),
            ownership_correlation=self._calculate_ownership_correlation(final_lineups),
            expected_finish=self._simulate_expected_finishes(
                final_lineups, contest_type
            ),
        )

    async def _generate_lineup_pool(
        self, player_pool: List[Player], contest_type: ContestType, pool_size: int
    ) -> List[Lineup]:
        """Generate diverse pool of potential lineups"""

        lineups = []

        # Position requirements (NFL DraftKings example)
        position_requirements = {
            Position.QB: 1,
            Position.RB: 2,
            Position.WR: 3,
            Position.TE: 1,
            Position.K: 1,
            Position.DST: 1,
            Position.FLEX: 1,  # RB/WR/TE
        }

        salary_cap = 50000

        # Generate lineups using different strategies
        for i in range(pool_size):
            strategy = i % 4  # Rotate through 4 strategies

            if strategy == 0:
                # Value-focused strategy
                lineup = self._build_value_lineup(
                    player_pool, position_requirements, salary_cap
                )
            elif strategy == 1:
                # Ceiling-focused strategy
                lineup = self._build_ceiling_lineup(
                    player_pool, position_requirements, salary_cap
                )
            elif strategy == 2:
                # Contrarian strategy
                lineup = self._build_contrarian_lineup(
                    player_pool, position_requirements, salary_cap
                )
            else:
                # Balanced strategy
                lineup = self._build_balanced_lineup(
                    player_pool, position_requirements, salary_cap
                )

            if lineup:
                lineup.contest_type = contest_type
                lineups.append(lineup)

        return lineups

    def _build_value_lineup(
        self,
        player_pool: List[Player],
        requirements: Dict[Position, int],
        salary_cap: int,
    ) -> Optional[Lineup]:
        """Build lineup optimized for value (points per dollar)"""

        # Sort players by value within each position
        position_pools = {}
        for pos in requirements.keys():
            position_pools[pos] = [p for p in player_pool if p.position == pos]
            position_pools[pos].sort(key=lambda x: x.value, reverse=True)

        # Build lineup greedily by value
        selected_players = []
        total_salary = 0

        for position, count in requirements.items():
            available_players = position_pools[position]

            for _ in range(count):
                for player in available_players:
                    if (
                        player not in selected_players
                        and total_salary + player.salary <= salary_cap
                    ):
                        selected_players.append(player)
                        total_salary += player.salary
                        break

        if len(selected_players) == sum(requirements.values()):
            return self._create_lineup_from_players(selected_players)

        return None

    def _build_ceiling_lineup(
        self,
        player_pool: List[Player],
        requirements: Dict[Position, int],
        salary_cap: int,
    ) -> Optional[Lineup]:
        """Build lineup optimized for ceiling (upside potential)"""

        # Sort players by ceiling within each position
        position_pools = {}
        for pos in requirements.keys():
            position_pools[pos] = [p for p in player_pool if p.position == pos]
            position_pools[pos].sort(key=lambda x: x.ceiling, reverse=True)

        # Use knapsack-style optimization for ceiling
        return self._knapsack_optimization(
            player_pool, requirements, salary_cap, "ceiling"
        )

    def _build_contrarian_lineup(
        self,
        player_pool: List[Player],
        requirements: Dict[Position, int],
        salary_cap: int,
    ) -> Optional[Lineup]:
        """Build contrarian lineup with low-owned players"""

        # Sort players by low ownership + value
        for player in player_pool:
            # Contrarian score: value weighted by inverse ownership
            ownership_penalty = 1 / (player.projected_ownership + 0.01)
            player.contrarian_score = player.value * ownership_penalty

        # Sort by contrarian score
        position_pools = {}
        for pos in requirements.keys():
            position_pools[pos] = [p for p in player_pool if p.position == pos]
            position_pools[pos].sort(key=lambda x: x.contrarian_score, reverse=True)

        return self._greedy_selection(position_pools, requirements, salary_cap)

    def _build_balanced_lineup(
        self,
        player_pool: List[Player],
        requirements: Dict[Position, int],
        salary_cap: int,
    ) -> Optional[Lineup]:
        """Build balanced lineup considering multiple factors"""

        # Balanced score: projection + value + leverage - ownership penalty
        for player in player_pool:
            ownership_penalty = player.projected_ownership * 0.1
            player.balanced_score = (
                player.projected_points * 0.4
                + player.value * 0.3
                + player.leverage_score * 0.2
                - ownership_penalty
            )

        position_pools = {}
        for pos in requirements.keys():
            position_pools[pos] = [p for p in player_pool if p.position == pos]
            position_pools[pos].sort(key=lambda x: x.balanced_score, reverse=True)

        return self._greedy_selection(position_pools, requirements, salary_cap)

    def _knapsack_optimization(
        self,
        player_pool: List[Player],
        requirements: Dict[Position, int],
        salary_cap: int,
        objective: str,
    ) -> Optional[Lineup]:
        """Advanced knapsack optimization for lineup building"""

        # Simplified knapsack - in practice would use dynamic programming
        players_by_position = {}
        for pos in requirements.keys():
            players_by_position[pos] = [p for p in player_pool if p.position == pos]

        # Generate combinations and find optimal
        best_lineup = None
        best_score = 0

        # Limited combinatorial search (simplified for demo)
        for _ in range(100):  # Random sampling approach
            selected_players = []
            total_salary = 0

            for position, count in requirements.items():
                available = players_by_position[position]
                for _ in range(count):
                    # Random selection with bias toward better players
                    weights = [
                        getattr(p, objective, p.projected_points) for p in available
                    ]
                    if weights and total_salary < salary_cap:
                        # Weighted random selection
                        selected = np.random.choice(
                            available, p=np.array(weights) / sum(weights)
                        )
                        if (
                            selected not in selected_players
                            and total_salary + selected.salary <= salary_cap
                        ):
                            selected_players.append(selected)
                            total_salary += selected.salary

            if len(selected_players) == sum(requirements.values()):
                lineup = self._create_lineup_from_players(selected_players)
                score = getattr(lineup, objective, lineup.projected_points)
                if score > best_score:
                    best_score = score
                    best_lineup = lineup

        return best_lineup

    def _greedy_selection(
        self,
        position_pools: Dict[Position, List[Player]],
        requirements: Dict[Position, int],
        salary_cap: int,
    ) -> Optional[Lineup]:
        """Greedy selection algorithm"""

        selected_players = []
        total_salary = 0

        for position, count in requirements.items():
            available_players = position_pools[position]

            for _ in range(count):
                for player in available_players:
                    if (
                        player not in selected_players
                        and total_salary + player.salary <= salary_cap
                    ):
                        selected_players.append(player)
                        total_salary += player.salary
                        break

        if len(selected_players) == sum(requirements.values()):
            return self._create_lineup_from_players(selected_players)

        return None

    def _create_lineup_from_players(self, players: List[Player]) -> Lineup:
        """Create lineup object from list of players"""

        total_salary = sum(p.salary for p in players)
        projected_points = sum(p.projected_points for p in players)
        projected_ownership = np.mean([p.projected_ownership for p in players])
        ceiling = sum(p.ceiling for p in players)
        floor = sum(p.floor for p in players)
        leverage_score = np.mean([p.leverage_score for p in players])

        # Calculate correlations (simplified)
        correlation_score = self._calculate_lineup_correlation(players)
        uniqueness_score = 100 - projected_ownership  # Simplified

        return Lineup(
            id=f"lineup_{int(datetime.now().timestamp())}_{np.random.randint(1000)}",
            players=players,
            total_salary=total_salary,
            projected_points=projected_points,
            projected_ownership=projected_ownership,
            ceiling=ceiling,
            floor=floor,
            leverage_score=leverage_score,
            correlation_score=correlation_score,
            uniqueness_score=uniqueness_score,
            contest_type=ContestType.GPP,
        )

    def _calculate_lineup_correlation(self, players: List[Player]) -> float:
        """Calculate correlation score for lineup"""

        # Count same-team players
        teams = [p.team for p in players]
        team_counts = {}
        for team in teams:
            team_counts[team] = team_counts.get(team, 0) + 1

        # Higher score for more correlated lineups
        correlation_score = 0
        for count in team_counts.values():
            if count > 1:
                correlation_score += (
                    count * 10
                )  # 10 points per additional same-team player

        return correlation_score

    def _game_theory_optimization(
        self, lineups: List[Lineup], contest_type: ContestType, target_count: int
    ) -> List[Lineup]:
        """Apply game theory optimization to lineup selection"""

        settings = self.contest_settings.get(
            contest_type, self.contest_settings[ContestType.GPP]
        )

        # Score lineups based on contest type
        for lineup in lineups:
            if contest_type == ContestType.GPP:
                # GPP: prioritize ceiling and uniqueness
                lineup.game_theory_score = (
                    lineup.ceiling * settings["ceiling_weight"]
                    + lineup.uniqueness_score * settings["uniqueness_weight"]
                    - lineup.correlation_score * settings["correlation_penalty"]
                )
            else:
                # Cash: prioritize floor and consistency
                lineup.game_theory_score = (
                    lineup.floor * settings.get("floor_weight", 0.7)
                    + lineup.projected_points * 0.3
                    + lineup.uniqueness_score * settings["uniqueness_weight"]
                )

        # Sort by game theory score
        lineups.sort(key=lambda x: x.game_theory_score, reverse=True)

        return lineups[: target_count * 2]  # Return top candidates

    def _apply_exposure_constraints(
        self, lineups: List[Lineup], max_exposure: float
    ) -> List[Lineup]:
        """Apply player exposure constraints across lineups"""

        if not lineups:
            return []

        # Track player usage
        player_usage = {}
        final_lineups = []

        for lineup in lineups:
            # Check if adding this lineup violates exposure constraints
            temp_usage = player_usage.copy()

            for player in lineup.players:
                temp_usage[player.id] = temp_usage.get(player.id, 0) + 1

            # Check if any player exceeds max exposure
            total_lineups = len(final_lineups) + 1
            valid_lineup = True

            for player_id, count in temp_usage.items():
                exposure = count / total_lineups
                if exposure > max_exposure:
                    valid_lineup = False
                    break

            if valid_lineup:
                final_lineups.append(lineup)
                player_usage = temp_usage

        return final_lineups

    def _calculate_player_exposure(self, lineups: List[Lineup]) -> Dict[str, float]:
        """Calculate player exposure across lineups"""

        if not lineups:
            return {}

        player_counts = {}
        total_lineups = len(lineups)

        for lineup in lineups:
            for player in lineup.players:
                player_counts[player.id] = player_counts.get(player.id, 0) + 1

        # Convert to percentages
        exposure = {}
        for player_id, count in player_counts.items():
            exposure[player_id] = (count / total_lineups) * 100

        return exposure

    def _calculate_position_allocations(
        self, lineups: List[Lineup]
    ) -> Dict[str, float]:
        """Calculate average salary allocation by position"""

        if not lineups:
            return {}

        position_totals = {}
        position_counts = {}

        for lineup in lineups:
            for player in lineup.players:
                pos = player.position.value
                position_totals[pos] = position_totals.get(pos, 0) + player.salary
                position_counts[pos] = position_counts.get(pos, 0) + 1

        # Calculate averages
        allocations = {}
        for pos in position_totals:
            allocations[pos] = position_totals[pos] / position_counts[pos]

        return allocations

    def _calculate_salary_efficiency(self, lineups: List[Lineup]) -> float:
        """Calculate overall salary efficiency"""

        if not lineups:
            return 0.0

        total_efficiency = 0
        for lineup in lineups:
            efficiency = lineup.projected_points / (lineup.total_salary / 1000)
            total_efficiency += efficiency

        return total_efficiency / len(lineups)

    def _calculate_ownership_correlation(self, lineups: List[Lineup]) -> float:
        """Calculate ownership correlation across lineups"""

        if not lineups:
            return 0.0

        ownership_scores = [lineup.projected_ownership for lineup in lineups]
        return np.std(ownership_scores)  # Higher std = more diverse ownership

    def _simulate_expected_finishes(
        self, lineups: List[Lineup], contest_type: ContestType
    ) -> Dict[str, float]:
        """Monte Carlo simulation of expected finishes"""

        if not lineups:
            return {}

        # Simplified simulation
        finish_distribution = {}

        for i, lineup in enumerate(lineups):
            # Estimate finish based on projected points and variance
            if contest_type == ContestType.GPP:
                # GPP: wider variance, ceiling matters more
                expected_finish = max(1, len(lineups) - i * 0.8)
            else:
                # Cash: tighter distribution around floor
                expected_finish = max(1, len(lineups) - i * 1.2)

            finish_distribution[lineup.id] = expected_finish

        return finish_distribution

    async def project_player_performance(
        self, player: Player, game_context: Dict[str, Any]
    ) -> PlayerProjection:
        """Advanced player projection considering multiple factors"""

        base_projection = player.projected_points

        # Weather adjustment
        weather_adjustment = self._calculate_weather_adjustment(
            player, game_context.get("weather", {})
        )

        # Matchup adjustment
        matchup_adjustment = self._calculate_matchup_adjustment(
            player, game_context.get("matchup", {})
        )

        # Injury adjustment
        injury_adjustment = self._calculate_injury_adjustment(player)

        # Calculate adjusted projection
        adjusted_projection = base_projection * (
            1 + weather_adjustment + matchup_adjustment + injury_adjustment
        )

        # Calculate ceiling and floor
        variance = player.recent_form * 0.2  # Use recent form as variance indicator
        ceiling_projection = adjusted_projection * (1 + variance)
        floor_projection = adjusted_projection * (1 - variance * 0.5)

        # Confidence interval
        std_dev = adjusted_projection * 0.15  # 15% standard deviation
        confidence_interval = (
            adjusted_projection - 1.96 * std_dev,
            adjusted_projection + 1.96 * std_dev,
        )

        return PlayerProjection(
            player_id=player.id,
            base_projection=base_projection,
            ceiling_projection=ceiling_projection,
            floor_projection=floor_projection,
            ownership_projection=player.projected_ownership,
            variance=variance,
            confidence_interval=confidence_interval,
            key_factors=["weather", "matchup", "injury", "recent_form"],
        )

    def _calculate_weather_adjustment(
        self, player: Player, weather: Dict[str, Any]
    ) -> float:
        """Calculate weather impact on player performance"""

        if not weather:
            return 0.0

        # Weather affects certain positions more
        wind_speed = weather.get("wind_speed", 0)
        precipitation = weather.get("precipitation", 0)
        temperature = weather.get("temperature", 70)

        adjustment = 0.0

        if player.position in [Position.QB, Position.K]:
            # QBs and Kickers affected by wind
            if wind_speed > 15:
                adjustment -= 0.1  # 10% reduction in high wind

        if player.position == Position.WR:
            # WRs affected by precipitation
            if precipitation > 0.5:
                adjustment -= 0.05  # 5% reduction in heavy rain

        # Extreme cold affects all skill positions
        if temperature < 32:
            adjustment -= 0.05

        return adjustment

    def _calculate_matchup_adjustment(
        self, player: Player, matchup: Dict[str, Any]
    ) -> float:
        """Calculate matchup-based adjustments"""

        if not matchup:
            return 0.0

        # Defense ranking against position
        def_rank = matchup.get(f"def_rank_vs_{player.position.value}", 16)

        # Better matchup = positive adjustment
        if def_rank > 20:  # Bottom 12 defenses
            return 0.1  # 10% boost
        elif def_rank < 8:  # Top 8 defenses
            return -0.1  # 10% reduction

        return 0.0

    def _calculate_injury_adjustment(self, player: Player) -> float:
        """Calculate injury impact on performance"""

        injury_status = player.injury_status.lower()

        if injury_status == "out":
            return -1.0  # 100% reduction (shouldn't be in player pool)
        elif injury_status == "doubtful":
            return -0.3  # 30% reduction
        elif injury_status == "questionable":
            return -0.1  # 10% reduction
        elif injury_status == "probable":
            return -0.05  # 5% reduction

        return 0.0  # No adjustment for healthy players


# Global instance
lineup_engine = AdvancedLineupEngine()
