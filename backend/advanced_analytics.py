"""
Advanced Analytics Engine for A1Betting Platform
Provides sophisticated sports betting analytics, pattern recognition, and performance monitoring.
"""

import asyncio
import json
import logging
import os
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler

logger = logging.getLogger(__name__)


@dataclass
class PerformanceMetrics:
    accuracy: float
    roi: float
    profit_loss: float
    win_rate: float
    total_bets: int
    avg_odds: float
    kelly_criterion_score: float
    risk_adjusted_return: float
    max_drawdown: float
    sharpe_ratio: float


@dataclass
class BankrollAnalysis:
    current_bankroll: float
    starting_bankroll: float
    peak_bankroll: float
    max_drawdown: float
    growth_rate: float
    risk_of_ruin: float
    optimal_bet_size: float
    suggested_unit_size: float
    time_to_double: int  # days
    variance: float


@dataclass
class ArbitrageOpportunity:
    id: str
    sport: str
    event_name: str
    book1: str
    book2: str
    odds1: float
    odds2: float
    profit_percentage: float
    stake_book1: float
    stake_book2: float
    total_stake: float
    expected_profit: float
    confidence_score: float
    time_remaining: int  # minutes until event
    liquidity_score: float


@dataclass
class PatternAnalysis:
    pattern_type: str
    confidence: float
    historical_success_rate: float
    current_streak: int
    avg_profit_per_bet: float
    market_efficiency: float
    edge_sustainability: float
    recommended_action: str


class AdvancedAnalyticsEngine:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.performance_history = []
        self.bet_history = []
        self.patterns_cache = {}

        # Initialize models directory
        self.models_dir = "models"
        os.makedirs(self.models_dir, exist_ok=True)

        # Load or initialize models
        self._initialize_models()

    def _initialize_models(self):
        """Initialize or load ML models"""
        try:
            # Load existing models if available
            self.models["odds_predictor"] = joblib.load(
                os.path.join(self.models_dir, "odds_predictor.pkl")
            )
            self.models["value_detector"] = joblib.load(
                os.path.join(self.models_dir, "value_detector.pkl")
            )
            self.scalers["features"] = joblib.load(
                os.path.join(self.models_dir, "feature_scaler.pkl")
            )
            logger.info("Loaded existing models")
        except FileNotFoundError:
            # Create new models
            self.models["odds_predictor"] = RandomForestRegressor(
                n_estimators=100, random_state=42
            )
            self.models["value_detector"] = GradientBoostingRegressor(
                n_estimators=100, random_state=42
            )
            self.scalers["features"] = StandardScaler()
            logger.info("Created new models")

    def save_models(self):
        """Save trained models to disk"""
        try:
            for name, model in self.models.items():
                joblib.dump(model, os.path.join(self.models_dir, f"{name}.pkl"))
            for name, scaler in self.scalers.items():
                joblib.dump(scaler, os.path.join(self.models_dir, f"{name}_scaler.pkl"))
            logger.info("Models saved successfully")
        except Exception as e:
            logger.error(f"Error saving models: {e}")

    async def analyze_betting_performance(
        self, bet_history: List[Dict]
    ) -> PerformanceMetrics:
        """Comprehensive performance analysis"""
        if not bet_history:
            return PerformanceMetrics(
                accuracy=0.0,
                roi=0.0,
                profit_loss=0.0,
                win_rate=0.0,
                total_bets=0,
                avg_odds=0.0,
                kelly_criterion_score=0.0,
                risk_adjusted_return=0.0,
                max_drawdown=0.0,
                sharpe_ratio=0.0,
            )

        df = pd.DataFrame(bet_history)

        # Basic metrics
        total_bets = len(df)
        wins = len(df[df["result"] == "win"])
        win_rate = wins / total_bets if total_bets > 0 else 0

        # Financial metrics
        total_staked = df["stake"].sum()
        total_return = df["payout"].sum()
        profit_loss = total_return - total_staked
        roi = (profit_loss / total_staked * 100) if total_staked > 0 else 0

        # Advanced metrics
        avg_odds = df["odds"].mean()

        # Calculate running balance for drawdown
        df["running_balance"] = df["payout"].cumsum() - df["stake"].cumsum()
        peak = df["running_balance"].expanding().max()
        drawdown = (peak - df["running_balance"]).max()
        max_drawdown = drawdown / total_staked * 100 if total_staked > 0 else 0

        # Kelly Criterion Score (simplified)
        kelly_score = self._calculate_kelly_score(df)

        # Risk-adjusted return (simplified Sharpe ratio)
        returns = df["running_balance"].pct_change().dropna()
        sharpe_ratio = (returns.mean() / returns.std()) if returns.std() > 0 else 0

        return PerformanceMetrics(
            accuracy=win_rate * 100,
            roi=roi,
            profit_loss=profit_loss,
            win_rate=win_rate,
            total_bets=total_bets,
            avg_odds=avg_odds,
            kelly_criterion_score=kelly_score,
            risk_adjusted_return=roi / max(max_drawdown, 1),
            max_drawdown=max_drawdown,
            sharpe_ratio=sharpe_ratio,
        )

    def _calculate_kelly_score(self, df: pd.DataFrame) -> float:
        """Calculate Kelly Criterion compliance score"""
        # Simplified Kelly calculation
        win_rate = len(df[df["result"] == "win"]) / len(df)
        avg_win_odds = df[df["result"] == "win"]["odds"].mean()
        avg_loss_odds = df[df["result"] == "loss"]["odds"].mean()

        if avg_win_odds and avg_loss_odds:
            kelly_fraction = (win_rate * avg_win_odds - (1 - win_rate)) / avg_win_odds
            # Score based on how close actual bet sizing was to Kelly optimal
            return max(0, min(100, kelly_fraction * 100))
        return 50  # Neutral score

    async def analyze_bankroll(
        self, current_bankroll: float, bet_history: List[Dict]
    ) -> BankrollAnalysis:
        """Advanced bankroll analysis and risk management"""
        if not bet_history:
            return BankrollAnalysis(
                current_bankroll=current_bankroll,
                starting_bankroll=current_bankroll,
                peak_bankroll=current_bankroll,
                max_drawdown=0.0,
                growth_rate=0.0,
                risk_of_ruin=0.0,
                optimal_bet_size=current_bankroll * 0.01,
                suggested_unit_size=current_bankroll * 0.01,
                time_to_double=365,
                variance=0.0,
            )

        df = pd.DataFrame(bet_history)
        df["running_balance"] = current_bankroll + (df["payout"] - df["stake"]).cumsum()

        starting_bankroll = current_bankroll - (df["payout"] - df["stake"]).sum()
        peak_bankroll = df["running_balance"].max()

        # Growth metrics
        growth_rate = (
            ((current_bankroll - starting_bankroll) / starting_bankroll * 100)
            if starting_bankroll > 0
            else 0
        )

        # Risk metrics
        drawdowns = df["running_balance"].expanding().max() - df["running_balance"]
        max_drawdown = (
            (drawdowns.max() / peak_bankroll * 100) if peak_bankroll > 0 else 0
        )

        # Risk of ruin (simplified)
        win_rate = len(df[df["result"] == "win"]) / len(df)
        avg_odds = df["odds"].mean()
        risk_of_ruin = self._calculate_risk_of_ruin(
            win_rate, avg_odds, current_bankroll
        )

        # Optimal bet sizing
        kelly_fraction = max(
            0.01, min(0.25, (win_rate * avg_odds - 1) / (avg_odds - 1))
        )
        optimal_bet_size = current_bankroll * kelly_fraction
        suggested_unit_size = current_bankroll * 0.02  # Conservative 2%

        # Time projections
        avg_daily_profit = (current_bankroll - starting_bankroll) / max(1, len(df) / 30)
        time_to_double = (
            int(current_bankroll / max(0.01, avg_daily_profit))
            if avg_daily_profit > 0
            else 9999
        )

        # Variance
        returns = df["running_balance"].pct_change().dropna()
        variance = returns.var() if len(returns) > 1 else 0

        return BankrollAnalysis(
            current_bankroll=current_bankroll,
            starting_bankroll=starting_bankroll,
            peak_bankroll=peak_bankroll,
            max_drawdown=max_drawdown,
            growth_rate=growth_rate,
            risk_of_ruin=risk_of_ruin,
            optimal_bet_size=optimal_bet_size,
            suggested_unit_size=suggested_unit_size,
            time_to_double=time_to_double,
            variance=variance,
        )

    def _calculate_risk_of_ruin(
        self, win_rate: float, avg_odds: float, bankroll: float
    ) -> float:
        """Calculate risk of ruin percentage"""
        if win_rate >= 0.5 and avg_odds >= 2.0:
            # Simplified risk of ruin for favorable games
            edge = win_rate * avg_odds - 1
            if edge > 0:
                return max(0, 100 * (1 - edge) ** (bankroll / 100))
        return min(
            100, 50 + (50 - win_rate * 100)
        )  # Higher risk for unfavorable conditions

    async def detect_arbitrage_opportunities(
        self, odds_data: List[Dict]
    ) -> List[ArbitrageOpportunity]:
        """Advanced arbitrage detection with confidence scoring"""
        opportunities = []

        # Group odds by event
        events = {}
        for odds in odds_data:
            event_key = f"{odds.get('sport', '')}_{odds.get('event', '')}"
            if event_key not in events:
                events[event_key] = []
            events[event_key].append(odds)

        for event_key, event_odds in events.items():
            if len(event_odds) >= 2:
                arb = self._calculate_arbitrage(event_odds)
                if arb and arb.profit_percentage > 0.5:  # Minimum 0.5% profit
                    opportunities.append(arb)

        return sorted(opportunities, key=lambda x: x.profit_percentage, reverse=True)

    def _calculate_arbitrage(
        self, odds_list: List[Dict]
    ) -> Optional[ArbitrageOpportunity]:
        """Calculate arbitrage opportunity from odds list"""
        if len(odds_list) < 2:
            return None

        # Find best odds for each outcome
        best_odds = {}
        for odds_data in odds_list:
            for outcome, price in odds_data.get("odds", {}).items():
                if outcome not in best_odds or price > best_odds[outcome]["price"]:
                    best_odds[outcome] = {
                        "price": price,
                        "book": odds_data.get("bookmaker", "unknown"),
                        "event": odds_data.get("event", "unknown"),
                        "sport": odds_data.get("sport", "unknown"),
                    }

        if len(best_odds) >= 2:
            outcomes = list(best_odds.keys())[:2]  # Take first 2 outcomes
            odds1 = best_odds[outcomes[0]]["price"]
            odds2 = best_odds[outcomes[1]]["price"]

            # Calculate arbitrage
            implied_prob = (1 / odds1) + (1 / odds2)

            if implied_prob < 1.0:  # Arbitrage exists
                total_stake = 1000  # Default stake
                stake1 = total_stake / (1 + (odds1 / odds2))
                stake2 = total_stake - stake1

                profit1 = (stake1 * odds1) - total_stake
                profit2 = (stake2 * odds2) - total_stake
                profit_percentage = (min(profit1, profit2) / total_stake) * 100

                if profit_percentage > 0:
                    return ArbitrageOpportunity(
                        id=f"arb_{int(datetime.now().timestamp())}",
                        sport=best_odds[outcomes[0]]["sport"],
                        event_name=best_odds[outcomes[0]]["event"],
                        book1=best_odds[outcomes[0]]["book"],
                        book2=best_odds[outcomes[1]]["book"],
                        odds1=odds1,
                        odds2=odds2,
                        profit_percentage=profit_percentage,
                        stake_book1=stake1,
                        stake_book2=stake2,
                        total_stake=total_stake,
                        expected_profit=min(profit1, profit2),
                        confidence_score=min(95, 70 + profit_percentage * 5),
                        time_remaining=120,  # Default 2 hours
                        liquidity_score=85.0,  # Default high liquidity
                    )
        return None

    async def analyze_patterns(
        self, bet_history: List[Dict], market_data: List[Dict]
    ) -> List[PatternAnalysis]:
        """Advanced pattern recognition and market analysis"""
        patterns = []

        if not bet_history:
            return patterns

        df = pd.DataFrame(bet_history)

        # Winning streak analysis
        streak_pattern = self._analyze_streaks(df)
        if streak_pattern:
            patterns.append(streak_pattern)

        # Market timing analysis
        timing_pattern = self._analyze_market_timing(df)
        if timing_pattern:
            patterns.append(timing_pattern)

        # Odds value analysis
        value_pattern = self._analyze_value_betting(df)
        if value_pattern:
            patterns.append(value_pattern)

        return patterns

    def _analyze_streaks(self, df: pd.DataFrame) -> Optional[PatternAnalysis]:
        """Analyze winning/losing streaks"""
        if len(df) < 5:
            return None

        # Calculate current streak
        current_streak = 0
        last_result = None

        for result in df["result"].tail(10):
            if result == last_result:
                current_streak += 1
            else:
                if last_result is not None:
                    break
                current_streak = 1
                last_result = result

        # Historical success rate
        win_rate = len(df[df["result"] == "win"]) / len(df)
        avg_profit = df["payout"].mean() - df["stake"].mean()

        return PatternAnalysis(
            pattern_type="streak_analysis",
            confidence=min(95, current_streak * 10 + 50),
            historical_success_rate=win_rate * 100,
            current_streak=current_streak,
            avg_profit_per_bet=avg_profit,
            market_efficiency=75.0,  # Default
            edge_sustainability=60.0,  # Default
            recommended_action="maintain" if current_streak > 0 else "reassess",
        )

    def _analyze_market_timing(self, df: pd.DataFrame) -> Optional[PatternAnalysis]:
        """Analyze market timing patterns"""
        if "timestamp" not in df.columns:
            return None

        # Convert to datetime and analyze by hour
        df["hour"] = pd.to_datetime(df["timestamp"]).dt.hour
        hourly_performance = df.groupby("hour").agg(
            {"result": lambda x: (x == "win").mean(), "payout": "mean", "stake": "mean"}
        )

        best_hour = hourly_performance["result"].idxmax()
        best_performance = hourly_performance["result"].max()

        return PatternAnalysis(
            pattern_type="market_timing",
            confidence=min(90, best_performance * 100),
            historical_success_rate=best_performance * 100,
            current_streak=0,
            avg_profit_per_bet=hourly_performance.loc[best_hour, "payout"]
            - hourly_performance.loc[best_hour, "stake"],
            market_efficiency=70.0,
            edge_sustainability=55.0,
            recommended_action=f"focus_on_hour_{best_hour}",
        )

    def _analyze_value_betting(self, df: pd.DataFrame) -> Optional[PatternAnalysis]:
        """Analyze value betting patterns"""
        if "odds" not in df.columns:
            return None

        # Calculate implied vs actual win rates by odds ranges
        df["odds_range"] = pd.cut(
            df["odds"],
            bins=[0, 2, 3, 5, 10, float("inf")],
            labels=["low", "medium_low", "medium", "high", "very_high"],
        )

        range_performance = df.groupby("odds_range").agg(
            {"result": lambda x: (x == "win").mean(), "odds": "mean"}
        )

        # Find best value range
        range_performance["edge"] = range_performance["result"] - (
            1 / range_performance["odds"]
        )
        best_range = range_performance["edge"].idxmax()
        best_edge = range_performance["edge"].max()

        return PatternAnalysis(
            pattern_type="value_betting",
            confidence=min(95, abs(best_edge) * 1000),
            historical_success_rate=range_performance.loc[best_range, "result"] * 100,
            current_streak=0,
            avg_profit_per_bet=best_edge * 100,
            market_efficiency=80.0,
            edge_sustainability=75.0,
            recommended_action=(
                f"focus_on_{best_range}_odds"
                if best_edge > 0
                else "avoid_current_strategy"
            ),
        )


# Global instance
advanced_analytics = AdvancedAnalyticsEngine()
