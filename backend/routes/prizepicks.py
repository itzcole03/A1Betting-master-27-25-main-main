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