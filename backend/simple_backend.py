#!/usr/bin/env python3
"""
Simple working backend for A1Betting frontend
Provides all the endpoints the frontend expects with mock data
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random

app = FastAPI(
    title="A1Betting Simple Backend",
    description="Simple backend providing mock data for frontend",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "name": "A1Betting Simple Backend",
        "version": "1.0.0",
        "status": "running",
        "message": "Backend is operational"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "A1Betting Backend"
    }

@app.get("/api/health")
async def api_health():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "A1Betting API"
    }

@app.get("/api/prizepicks/props")
async def get_prizepicks_props():
    """Return mock PrizePicks props data"""
    props = []
    
    # Generate mock props for different sports
    sports = ["NBA", "NFL", "MLB", "NHL"]
    players = {
        "NBA": ["LeBron James", "Stephen Curry", "Giannis Antetokounmpo", "Luka Doncic"],
        "NFL": ["Josh Allen", "Patrick Mahomes", "Lamar Jackson", "Aaron Rodgers"],
        "MLB": ["Aaron Judge", "Mookie Betts", "Mike Trout", "Ronald Acuña Jr."],
        "NHL": ["Connor McDavid", "Nathan MacKinnon", "Leon Draisaitl", "Erik Karlsson"]
    }
    
    stat_types = {
        "NBA": ["Points", "Rebounds", "Assists", "3-Pointers Made"],
        "NFL": ["Passing Yards", "Rushing Yards", "Touchdowns", "Receptions"],
        "MLB": ["Hits", "Home Runs", "RBIs", "Stolen Bases"],
        "NHL": ["Goals", "Assists", "Shots on Goal", "Saves"]
    }
    
    for sport in sports:
        for player in players[sport]:
            for stat in stat_types[sport]:
                prop = {
                    "id": f"prop_{len(props) + 1}",
                    "sport": sport,
                    "league": sport,
                    "player_name": player,
                    "stat_type": stat,
                    "line": round(random.uniform(0.5, 25.0), 1),
                    "over_odds": random.choice([-110, -105, -115, -120]),
                    "under_odds": random.choice([-110, -105, -115, -120]),
                    "confidence": round(random.uniform(65, 95), 1),
                    "expected_value": round(random.uniform(-5, 15), 2),
                    "kelly_fraction": round(random.uniform(0.01, 0.08), 3),
                    "recommendation": random.choice(["OVER", "UNDER", "PASS"]),
                    "game_time": "2025-01-01T20:00:00Z",
                    "opponent": "vs Opponent",
                    "venue": "Home"
                }
                props.append(prop)
    
    return props

@app.get("/api/betting-opportunities")
async def get_betting_opportunities():
    """Return mock betting opportunities"""
    opportunities = []
    
    for i in range(10):
        opp = {
            "id": f"bet_{i + 1}",
            "sport": random.choice(["NBA", "NFL", "MLB", "NHL"]),
            "event": f"Team A vs Team B Game {i + 1}",
            "market": random.choice(["Moneyline", "Spread", "Total"]),
            "odds": round(random.uniform(1.5, 3.0), 2),
            "probability": round(random.uniform(0.3, 0.7), 3),
            "expected_value": round(random.uniform(-2, 12), 2),
            "kelly_fraction": round(random.uniform(0.01, 0.05), 3),
            "confidence": round(random.uniform(70, 95), 1),
            "risk_level": random.choice(["Low", "Medium", "High"]),
            "recommendation": random.choice(["BET", "PASS", "STRONG BET"])
        }
        opportunities.append(opp)
    
    return opportunities

@app.get("/api/arbitrage-opportunities")
async def get_arbitrage_opportunities():
    """Return mock arbitrage opportunities"""
    arbitrage = []
    
    for i in range(5):
        arb = {
            "id": f"arb_{i + 1}",
            "sport": random.choice(["NBA", "NFL", "MLB"]),
            "event": f"Arbitrage Game {i + 1}",
            "bookmaker_a": random.choice(["DraftKings", "FanDuel", "BetMGM"]),
            "bookmaker_b": random.choice(["Caesars", "BetRivers", "PointsBet"]),
            "odds_a": round(random.uniform(1.8, 2.2), 2),
            "odds_b": round(random.uniform(1.8, 2.2), 2),
            "profit_margin": round(random.uniform(2, 8), 2),
            "required_stake": round(random.uniform(100, 500), 2)
        }
        arbitrage.append(arb)
    
    return arbitrage

@app.get("/api/predictions")
async def get_predictions():
    """Return mock predictions"""
    predictions = []
    
    for i in range(15):
        pred = {
            "id": f"pred_{i + 1}",
            "sport": random.choice(["NBA", "NFL", "MLB", "NHL"]),
            "event": f"Prediction Game {i + 1}",
            "prediction": random.choice(["Team A Win", "Team B Win", "Over", "Under"]),
            "confidence": round(random.uniform(75, 95), 1),
            "odds": round(random.uniform(1.5, 3.0), 2),
            "expected_value": round(random.uniform(5, 20), 2),
            "timestamp": datetime.now().isoformat(),
            "model_version": "v4.0"
        }
        predictions.append(pred)
    
    return {
        "predictions": predictions,
        "total_count": len(predictions)
    }

@app.get("/api/ultra-accuracy/model-performance")
async def get_model_performance():
    """Return mock model performance data"""
    return {
        "overall_accuracy": round(random.uniform(85, 95), 1),
        "recent_accuracy": round(random.uniform(80, 95), 1),
        "model_metrics": {
            "precision": round(random.uniform(0.8, 0.95), 3),
            "recall": round(random.uniform(0.8, 0.95), 3),
            "f1_score": round(random.uniform(0.8, 0.95), 3),
            "auc_roc": round(random.uniform(0.85, 0.98), 3)
        },
        "performance_by_sport": {
            "NBA": {"accuracy": round(random.uniform(85, 95), 1), "games": 150},
            "NFL": {"accuracy": round(random.uniform(80, 90), 1), "games": 85},
            "MLB": {"accuracy": round(random.uniform(75, 88), 1), "games": 200},
            "NHL": {"accuracy": round(random.uniform(78, 90), 1), "games": 120}
        }
    }

@app.get("/api/analytics/performance")
async def get_performance_analytics():
    """Return mock performance analytics"""
    return {
        "daily_stats": {
            "total_bets": random.randint(50, 200),
            "winning_bets": random.randint(30, 120),
            "profit": round(random.uniform(100, 1000), 2),
            "roi": round(random.uniform(5, 25), 2)
        },
        "weekly_performance": [
            {"day": "Monday", "profit": round(random.uniform(-50, 200), 2)},
            {"day": "Tuesday", "profit": round(random.uniform(-50, 200), 2)},
            {"day": "Wednesday", "profit": round(random.uniform(-50, 200), 2)},
            {"day": "Thursday", "profit": round(random.uniform(-50, 200), 2)},
            {"day": "Friday", "profit": round(random.uniform(-50, 200), 2)},
            {"day": "Saturday", "profit": round(random.uniform(-50, 200), 2)},
            {"day": "Sunday", "profit": round(random.uniform(-50, 200), 2)}
        ]
    }

if __name__ == "__main__":
    print("🚀 Starting A1Betting Simple Backend...")
    print("📊 Serving mock data for frontend development")
    print("🌐 Backend will be available at: http://localhost:8000")
    
    uvicorn.run(
        "simple_backend:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
