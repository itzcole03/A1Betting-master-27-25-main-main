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
import httpx

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

@app.get("/api/health/status")
async def api_health_status():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "A1Betting API",
        "performance": {
            "memory_usage": "normal",
            "cpu_usage": "normal", 
            "response_time": "fast"
        },
        "models": {
            "prediction_engine": "initialized",
            "ultra_accuracy_engine": "initialized"
        },
        "api_metrics": {
            "total_requests": 0,
            "success_rate": 100.0,
            "average_response_time": 0.1
        }
    }

@app.get("/api/prizepicks/props")
async def get_prizepicks_props():
    """Return REAL PrizePicks props data from actual API"""
    try:
        # Direct API call to PrizePicks - no complex service needed
        print("🌐 Making direct API call to PrizePicks...")
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Real PrizePicks API endpoint
            url = "https://api.prizepicks.com/projections"
            headers = {
                "User-Agent": "A1Betting/1.0",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            
            # Add parameters to get fresh data
            params = {
                "include": "new_player,league,stat_type",
                "per_page": 20,  # Get 20 fresh projections
                "single_stat": "true"
            }
            
            response = await client.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            data = response.json()
            print(f"✅ Received data from PrizePicks API: {len(data.get('data', []))} projections")
            
            # Process the real API response
            projections = data.get('data', [])
            included = data.get('included', [])
            
            # Create lookup maps for player and league info
            players_map = {}
            leagues_map = {}
            
            for item in included:
                if item.get('type') == 'new_player':
                    players_map[item['id']] = item['attributes']
                elif item.get('type') == 'league':
                    leagues_map[item['id']] = item['attributes']
            
            # Convert to frontend format
            props = []
            for proj in projections:
                try:
                    attrs = proj.get('attributes', {})
                    relationships = proj.get('relationships', {})
                    
                    # Get player info
                    player_id = relationships.get('new_player', {}).get('data', {}).get('id', '')
                    player_info = players_map.get(player_id, {})
                    
                    # Get league info  
                    league_id = relationships.get('league', {}).get('data', {}).get('id', '')
                    league_info = leagues_map.get(league_id, {})
                    
                    # Extract real player name
                    player_name = player_info.get('name', attrs.get('description', f'Player {len(props) + 1}'))
                    
                    prop = {
                        "id": proj.get("id", f"real_{len(props) + 1}"),
                        "sport": league_info.get('sport', 'NBA'),
                        "league": league_info.get('name', 'NBA'),
                        "player_name": player_name,
                        "stat_type": attrs.get('stat_type', 'Points'),
                        "line": float(attrs.get('line_score', 20.5)),
                        "over_odds": -110,
                        "under_odds": -110,
                        "confidence": round(random.uniform(75, 95), 1),
                        "expected_value": round(random.uniform(2, 12), 2),
                        "kelly_fraction": round(random.uniform(0.02, 0.06), 3),
                        "recommendation": random.choice(["OVER", "UNDER"]),
                        "game_time": attrs.get('start_time', '2025-01-01T20:00:00Z'),
                        "opponent": f"vs {player_info.get('team_name', 'Opponent')}",
                        "venue": "Away" if random.random() > 0.5 else "Home"
                    }
                    props.append(prop)
                    
                except Exception as e:
                    print(f"⚠️ Error processing projection: {e}")
                    continue
            
            if props:
                print(f"✅ Successfully processed {len(props)} REAL PrizePicks props with real player names!")
                return props
            else:
                print("⚠️ No projections processed, falling back to enhanced mock data")
                return await get_enhanced_mock_props()
                
    except httpx.HTTPError as e:
        print(f"❌ HTTP error calling PrizePicks API: {e}")
        print("⚠️ Falling back to enhanced mock data")
        return await get_enhanced_mock_props()
    except Exception as e:
        print(f"❌ Error fetching real PrizePicks data: {e}")
        print("⚠️ Falling back to enhanced mock data")
        return await get_enhanced_mock_props()

async def get_enhanced_mock_props():
    """Enhanced mock data with real player names as fallback"""
    props = []
    
    # Enhanced mock props with real player names and realistic stats
    real_players = [
        {"name": "LeBron James", "team": "LAL", "sport": "NBA", "stats": ["Points", "Rebounds", "Assists"]},
        {"name": "Stephen Curry", "team": "GSW", "sport": "NBA", "stats": ["Points", "3-Pointers Made", "Assists"]},
        {"name": "Giannis Antetokounmpo", "team": "MIL", "sport": "NBA", "stats": ["Points", "Rebounds", "Assists"]},
        {"name": "Luka Doncic", "team": "DAL", "sport": "NBA", "stats": ["Points", "Rebounds", "Assists"]},
        {"name": "Jayson Tatum", "team": "BOS", "sport": "NBA", "stats": ["Points", "Rebounds", "3-Pointers Made"]},
        {"name": "Nikola Jokic", "team": "DEN", "sport": "NBA", "stats": ["Points", "Rebounds", "Assists"]},
        {"name": "Josh Allen", "team": "BUF", "sport": "NFL", "stats": ["Passing Yards", "Rushing Yards", "Touchdowns"]},
        {"name": "Patrick Mahomes", "team": "KC", "sport": "NFL", "stats": ["Passing Yards", "Touchdowns", "Completions"]},
        {"name": "Aaron Judge", "team": "NYY", "sport": "MLB", "stats": ["Hits", "Home Runs", "RBIs"]},
        {"name": "Connor McDavid", "team": "EDM", "sport": "NHL", "stats": ["Goals", "Assists", "Shots on Goal"]}
    ]
    
    # Generate realistic props
    for player in real_players:
        for stat in player["stats"]:
            # Generate realistic lines based on stat type
            line = get_realistic_line(stat, player["sport"])
            
            prop = {
                "id": f"enhanced_{len(props) + 1}",
                "sport": player["sport"],
                "league": player["sport"],
                "player_name": player["name"],
                "stat_type": stat,
                "line": line,
                "over_odds": random.choice([-110, -105, -115]),
                "under_odds": random.choice([-110, -105, -115]),
                "confidence": round(random.uniform(78, 92), 1),
                "expected_value": round(random.uniform(3, 8), 2),
                "kelly_fraction": round(random.uniform(0.025, 0.055), 3),
                "recommendation": random.choice(["OVER", "UNDER"]),
                "game_time": "2025-01-01T20:00:00Z",
                "opponent": f"vs {get_opponent(player['team'])}",
                "venue": "Home" if random.random() > 0.5 else "Away"
            }
            props.append(prop)
    
    return props

def get_realistic_line(stat_type: str, sport: str) -> float:
    """Generate realistic lines based on stat type and sport"""
    lines = {
        "NBA": {
            "Points": (15.5, 35.5),
            "Rebounds": (4.5, 14.5),
            "Assists": (3.5, 11.5),
            "3-Pointers Made": (1.5, 5.5),
            "Steals": (0.5, 2.5),
            "Blocks": (0.5, 2.5)
        },
        "NFL": {
            "Passing Yards": (225.5, 325.5),
            "Rushing Yards": (45.5, 125.5),
            "Touchdowns": (1.5, 3.5),
            "Receptions": (3.5, 8.5),
            "Completions": (18.5, 28.5)
        },
        "MLB": {
            "Hits": (0.5, 2.5),
            "Home Runs": (0.5, 1.5),
            "RBIs": (0.5, 2.5),
            "Stolen Bases": (0.5, 1.5)
        },
        "NHL": {
            "Goals": (0.5, 2.5),
            "Assists": (0.5, 2.5),
            "Shots on Goal": (2.5, 6.5),
            "Saves": (20.5, 35.5)
        }
    }
    
    if sport in lines and stat_type in lines[sport]:
        min_line, max_line = lines[sport][stat_type]
        return round(random.uniform(min_line, max_line), 1)
    else:
        return round(random.uniform(5.5, 25.5), 1)

def get_opponent(team: str) -> str:
    """Get a realistic opponent for the team"""
    opponents = {
        "LAL": "GSW", "GSW": "LAL", "MIL": "BOS", "DAL": "PHX", "BOS": "MIL", "DEN": "LAC",
        "BUF": "KC", "KC": "BUF", "NYY": "BOS", "EDM": "COL"
    }
    return opponents.get(team, "OPP")

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

@app.get("/api/predictions/prizepicks")
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

@app.get("/api/analytics/summary")
async def get_analytics_summary():
    """Return mock analytics summary"""
    return {
        "accuracy": round(random.uniform(80, 95), 1),
        "total_predictions": random.randint(500, 2000),
        "confidence_score": round(random.uniform(0.7, 0.95), 2),
        "win_rate": round(random.uniform(65, 85), 1),
        "profit_margin": round(random.uniform(8, 25), 2),
        "roi": round(random.uniform(12, 30), 1),
        "kelly_optimal": round(random.uniform(0.02, 0.08), 3),
        "sharpe_ratio": round(random.uniform(1.2, 2.1), 2),
        "max_drawdown": round(random.uniform(5, 15), 1),
        "recent_performance": {
            "last_7_days": round(random.uniform(75, 90), 1),
            "last_30_days": round(random.uniform(70, 88), 1),
            "last_90_days": round(random.uniform(68, 85), 1)
        }
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
