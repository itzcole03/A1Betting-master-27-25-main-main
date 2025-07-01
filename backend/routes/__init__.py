"""
Routes package for A1Betting Backend

This package contains all API route handlers organized by functionality.
"""

from .health import router as health_router
from .betting import router as betting_router
from .performance import router as performance_router
from .auth import router as auth_router
from .prizepicks import router as prizepicks_router
from .analytics import router as analytics_router

__all__ = [
    "health_router",
    "betting_router", 
    "performance_router",
    "auth_router",
    "prizepicks_router",
    "analytics_router",
] 