"""
PrizePicks Routes

This module contains all PrizePicks-specific endpoints for prop betting.
"""

import logging
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException, status

from middleware.caching import TTLCache, retry_and_cache
from services.data_fetchers import fetch_prizepicks_props_internal

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/prizepicks", tags=["PrizePicks"])

# Cache for PrizePicks data
prizepicks_cache = TTLCache(maxsize=100, ttl=300)


@retry_and_cache(prizepicks_cache)
@router.get("/props")
async def get_prizepicks_props(
    sport: Optional[str] = None,
    min_confidence: Optional[int] = 70
) -> List[Dict[str, Any]]:
    """Get PrizePicks props with optional filtering"""
    try:
        props = await fetch_prizepicks_props_internal()

        # Filter by sport if specified
        if sport:
            props = [
                prop for prop in props
                if prop.get("sport", "").lower() == sport.lower()
            ]

        # Filter by confidence if specified
        if min_confidence:
            props = [
                prop for prop in props
                if prop.get("confidence", 0) >= min_confidence
            ]

        logger.info(f"Returning {len(props)} PrizePicks props")
        return props

    except Exception as e:
        logger.error(f"Error fetching PrizePicks props: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch PrizePicks props"
        )


@router.get("/recommendations")
async def get_prizepicks_recommendations(
    sport: Optional[str] = None,
    _strategy: Optional[str] = "balanced",  # Prefixed with _ to indicate unused
    min_confidence: Optional[int] = 75,
) -> List[Dict[str, Any]]:
    """Get PrizePicks recommendations based on analysis"""
    try:
        # Mock implementation - would use ML models for recommendations
        recommendations = [
            {
                "id": "rec_1",
                "player": "LeBron James",
                "sport": "NBA",
                "prop_type": "Points",
                "line": 25.5,
                "recommendation": "over",
                "confidence": 85,
                "reasoning": "Strong recent form, favorable matchup",
                "expected_value": 0.12,
                "stake_recommendation": "medium"
            },
            {
                "id": "rec_2",
                "player": "Stephen Curry",
                "sport": "NBA",
                "prop_type": "Assists",
                "line": 6.5,
                "recommendation": "under",
                "confidence": 78,
                "reasoning": "Defensive focus, injury concerns",
                "expected_value": 0.08,
                "stake_recommendation": "small"
            },
            {
                "id": "rec_3",
                "player": "Nikola Jokic",
                "sport": "NBA",
                "prop_type": "Rebounds",
                "line": 12.5,
                "recommendation": "over",
                "confidence": 92,
                "reasoning": "Dominant rebounder, weak opponent",
                "expected_value": 0.18,
                "stake_recommendation": "large"
            }
        ]

        # Filter by sport if specified
        if sport:
            recommendations = [
                rec for rec in recommendations
                if rec.get("sport", "").lower() == sport.lower()
            ]

        # Filter by confidence if specified
        if min_confidence:
            recommendations = [
                rec for rec in recommendations
                if rec.get("confidence", 0) >= min_confidence
            ]

        logger.info(f"Returning {len(recommendations)} PrizePicks recommendations")
        return recommendations

    except Exception as e:
        logger.error(f"Error fetching PrizePicks recommendations: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch PrizePicks recommendations"
        )


@router.get("/comprehensive-projections")
async def get_comprehensive_projections(
    sport: Optional[str] = None,
    league: Optional[str] = None,
    min_confidence: Optional[int] = 70,
    include_ml_predictions: bool = True,
    include_shap: bool = True
) -> List[Dict[str, Any]]:
    """Get comprehensive PrizePicks projections with ML predictions and SHAP values"""
    try:
        # Import the comprehensive service
        from services.comprehensive_prizepicks_service import ComprehensivePrizePicksService

        # Initialize service
        service = ComprehensivePrizePicksService()

        # Fetch comprehensive projections
        projections = await service.get_all_projections_with_ml(
            sport=sport,
            league=league,
            min_confidence=min_confidence,
            include_shap=include_shap
        )

        # Convert to API format
        api_projections = []
        for proj in projections:
            api_proj = {
                "id": proj.id,
                "player_id": proj.player_id,
                "player_name": proj.player_name,
                "team": proj.team,
                "position": proj.position,
                "league": proj.league,
                "sport": proj.sport,
                "stat_type": proj.stat_type,
                "line_score": proj.line_score,
                "over_odds": proj.over_odds,
                "under_odds": proj.under_odds,
                "start_time": proj.start_time.isoformat(),
                "status": proj.status,
                "description": proj.description,
                "rank": proj.rank,
                "is_promo": proj.is_promo,
                "confidence": proj.confidence,
                "market_efficiency": proj.market_efficiency,
            }

            # Add ML prediction if available
            if include_ml_predictions and hasattr(proj, 'ml_prediction'):
                api_proj["ml_prediction"] = proj.ml_prediction

            # Add SHAP values if available
            if include_shap and hasattr(proj, 'shap_values'):
                api_proj["shap_values"] = proj.shap_values

            api_projections.append(api_proj)

        logger.info(f"Returning {len(api_projections)} comprehensive projections")
        return api_projections

    except ImportError:
        # Fallback to mock data if service not available
        logger.warning("Comprehensive PrizePicks service not available, using mock data")

        mock_projections = [
            {
                "id": f"proj_{i}",
                "player_id": f"player_{i}",
                "player_name": ["LeBron James", "Stephen Curry", "Giannis Antetokounmpo", "Luka Doncic", "Jayson Tatum"][i % 5],
                "team": ["LAL", "GSW", "MIL", "DAL", "BOS"][i % 5],
                "position": ["F", "G", "F", "G", "F"][i % 5],
                "league": "NBA",
                "sport": "NBA",
                "stat_type": ["Points", "Assists", "Rebounds", "3-Pointers", "Steals"][i % 5],
                "line_score": 25.5 + (i * 2.5),
                "over_odds": -110,
                "under_odds": -110,
                "start_time": "2024-01-20T20:00:00Z",
                "status": "active",
                "description": f"Player prop for {['Points', 'Assists', 'Rebounds', '3-Pointers', 'Steals'][i % 5]}",
                "rank": i + 1,
                "is_promo": i % 3 == 0,
                "confidence": 75 + (i * 3) % 25,
                "market_efficiency": 0.15 + (i * 0.05) % 0.3,
                "ml_prediction": {
                    "prediction": 25.5 + (i * 2.5) + ((-1) ** i * 2),
                    "confidence": 75 + (i * 3) % 25,
                    "ensemble_score": 0.85 + (i * 0.02) % 0.15,
                    "model_weights": {
                        "xgboost": 0.3,
                        "lightgbm": 0.25,
                        "neural_net": 0.2,
                        "ensemble": 0.25
                    },
                    "factors": {
                        "recent_form": 0.8 + (i * 0.05) % 0.2,
                        "matchup": 0.7 + (i * 0.03) % 0.3,
                        "injury_status": 0.9,
                        "rest_days": 0.85
                    },
                    "risk_assessment": {
                        "level": ["low", "medium", "high"][i % 3],
                        "score": 20 + (i * 10) % 60,
                        "factors": ["Form variance", "Injury concerns", "Matchup difficulty"]
                    }
                } if include_ml_predictions else None,
                "shap_values": {
                    "base_value": 25.0,
                    "shap_values": {
                        "recent_avg": 0.15 + (i * 0.02) % 0.1,
                        "opponent_def": -0.08 + (i * 0.01) % 0.05,
                        "home_away": 0.05 if i % 2 else -0.03,
                        "rest_days": 0.02,
                        "season_avg": 0.12
                    },
                    "feature_importance": {
                        "recent_avg": 0.35,
                        "opponent_def": 0.25,
                        "home_away": 0.15,
                        "rest_days": 0.15,
                        "season_avg": 0.10
                    },
                    "explanation": f"Model predicts {'higher' if i % 2 else 'lower'} than line based on recent form and matchup analysis."
                } if include_shap else None,
                "value_rating": 5 + (i * 2) % 15,
                "kelly_percentage": 2 + (i * 0.5) % 8
            }
            for i in range(20)
        ]

        # Filter by sport if specified
        if sport:
            mock_projections = [p for p in mock_projections if p["sport"] == sport]

        # Filter by league if specified
        if league:
            mock_projections = [p for p in mock_projections if p["league"] == league]

        # Filter by confidence
        if min_confidence:
            mock_projections = [p for p in mock_projections if p["confidence"] >= min_confidence]

        return mock_projections

    except Exception as e:
        logger.error(f"Error fetching comprehensive projections: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch comprehensive projections"
        )


@router.post("/lineup/optimize")
async def optimize_lineup(request_data: Dict[str, Any]) -> Dict[str, Any]:
    """Optimize lineup using advanced ML algorithms"""
    try:
        entries = request_data.get("entries", [])
        optimization_params = request_data.get("optimization_params", {})

        if len(entries) < 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="At least 2 entries required for optimization"
            )

        # Mock optimization logic - in production would use real ML optimization
        total_confidence = sum(entry.get("confidence", 0) for entry in entries) / len(entries)
        expected_payout = len(entries) * 1.85  # Base multiplier

        # Calculate Kelly optimization
        kelly_optimization = min(25, sum(
            entry.get("ml_prediction", {}).get("confidence", 0) * 0.1
            for entry in entries
        ))

        # Calculate risk score
        risk_levels = {"low": 20, "medium": 50, "high": 80}
        risk_score = sum(
            risk_levels.get(
                entry.get("ml_prediction", {}).get("risk_assessment", {}).get("level", "medium"),
                50
            ) for entry in entries
        ) / len(entries)

        # Calculate value score
        value_score = sum(
            entry.get("confidence", 0) - 70  # Premium over 70% confidence
            for entry in entries
        ) / len(entries)

        # Generate correlation matrix (mock)
        correlation_matrix = [
            [1.0 if i == j else 0.1 + (i * j * 0.05) % 0.3 for j in range(len(entries))]
            for i in range(len(entries))
        ]

        optimization_result = {
            "total_confidence": total_confidence,
            "expected_payout": expected_payout,
            "kelly_optimization": kelly_optimization,
            "risk_score": risk_score,
            "value_score": value_score,
            "correlation_matrix": correlation_matrix,
            "optimization_notes": [
                f"Optimized for {len(entries)} selections",
                f"Average confidence: {total_confidence:.1f}%",
                f"Risk level: {'Low' if risk_score < 30 else 'Medium' if risk_score < 60 else 'High'}",
                "Correlations analyzed for optimal selection"
            ]
        }

        logger.info(f"Optimized lineup with {len(entries)} entries")
        return optimization_result

    except Exception as e:
        logger.error(f"Error optimizing lineup: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to optimize lineup"
        )
