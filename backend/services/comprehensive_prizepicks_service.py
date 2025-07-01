"""
Comprehensive PrizePicks Data Ingestion Service
Enterprise-grade service for complete PrizePicks API integration with ALL projections.
Implements real-time data ingestion, historical tracking, and value detection.
"""

import asyncio
import logging
import time
import os
from collections import defaultdict, deque
from datetime import datetime, timezone, timedelta
from typing import Any, Dict, List, Optional, Set, Tuple
from dataclasses import dataclass, field
import httpx
import json
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd
import numpy as np

logger = logging.getLogger(__name__)

Base = declarative_base()

@dataclass
class PrizePicksProjection:
    """Complete PrizePicks projection with all metadata"""
    id: str
    player_id: str
    player_name: str
    team: str
    position: str
    league: str
    sport: str
    stat_type: str
    line_score: float
    over_odds: float = -110
    under_odds: float = -110
    start_time: datetime = field(default_factory=datetime.now)
    status: str = "active"
    description: str = ""
    rank: int = 0
    is_promo: bool = False
    source: str = "PrizePicks"
    updated_at: datetime = field(default_factory=datetime.now)
    confidence: float = 0.85
    market_efficiency: float = 0.0
    value_score: float = 0.0
    historical_accuracy: float = 0.0

@dataclass
class ProjectionAnalysis:
    """Analysis results for a projection"""
    projection_id: str
    predicted_value: float
    confidence: float
    value_bet_score: float
    market_comparison: Dict[str, float]
    trend_analysis: Dict[str, Any]
    risk_assessment: Dict[str, Any]
    recommendation: str
    reasoning: List[str]

@dataclass
class MarketComparison:
    """Comparison across multiple sportsbooks"""
    player_name: str
    stat_type: str
    prizepicks_line: float
    other_lines: Dict[str, float]
    best_value: str
    arbitrage_opportunity: bool
    expected_value: float

# Database Models
class ProjectionHistory(Base):
    """Historical projection data for trend analysis"""
    __tablename__ = "projection_history"
    
    id = Column(Integer, primary_key=True)
    projection_id = Column(String, index=True)
    player_id = Column(String, index=True)
    player_name = Column(String)
    team = Column(String)
    league = Column(String)
    stat_type = Column(String)
    line_score = Column(Float)
    start_time = Column(DateTime)
    fetched_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String)
    actual_result = Column(Float, nullable=True)
    hit_over = Column(Boolean, nullable=True)
    accuracy_score = Column(Float, nullable=True)

class PlayerPerformance(Base):
    """Player performance tracking"""
    __tablename__ = "player_performance"
    
    id = Column(Integer, primary_key=True)
    player_id = Column(String, index=True)
    player_name = Column(String)
    team = Column(String)
    league = Column(String)
    stat_type = Column(String)
    game_date = Column(DateTime)
    actual_value = Column(Float)
    projected_value = Column(Float, nullable=True)
    difference = Column(Float, nullable=True)
    over_under_result = Column(String, nullable=True)

class ComprehensivePrizePicksService:
    """Enterprise-grade PrizePicks data ingestion and analysis service"""
    
    def __init__(self, database_url: str = "sqlite:///prizepicks_data.db"):
        self.base_url = "https://api.prizepicks.com"
        self.database_url = database_url
        self.session = None
        self.http_client = None
        
        # API Configuration
        # PrizePicks API key is not required; public access only
        self.api_key = None  # Deprecated, not used
        self.rate_limit_delay = 2.0  # 2 seconds between requests (increased from 1.0)
        self.max_retries = 3
        self.retry_delay = 10.0  # 10 seconds between retries (increased from 5.0)
        
        # Data storage
        self.current_projections: Dict[str, PrizePicksProjection] = {}
        self.historical_data: deque = deque(maxlen=10000)
        self.player_trends: Dict[str, deque] = defaultdict(lambda: deque(maxlen=100))
        self.market_comparisons: Dict[str, MarketComparison] = {}
        
        # Performance tracking
        self.fetch_count = 0
        self.error_count = 0
        self.last_update = None
        self.update_frequency = 300  # 5 minutes
        
        # Analysis cache
        self.analysis_cache: Dict[str, ProjectionAnalysis] = {}
        self.cache_ttl = 300  # 5 minutes
        
        # Rate limiting
        self.last_request_time = 0
        self.request_count = 0
        self.rate_limit_reset_time = time.time() + 3600  # 1 hour window
        
        self.initialize_database()
        
    def initialize_database(self):
        """Initialize database connection and create tables"""
        try:
            engine = create_engine(self.database_url)
            Base.metadata.create_all(engine)
            SessionLocal = sessionmaker(bind=engine)
            self.session = SessionLocal()
            logger.info("✅ PrizePicks database initialized successfully")
        except Exception as e:
            logger.error(f"❌ Database initialization failed: {e}")
            
    async def start_real_time_ingestion(self):
        """Start continuous real-time data ingestion"""
        logger.info("🚀 Starting PrizePicks real-time data ingestion...")
        
        self.http_client = httpx.AsyncClient(timeout=30.0)
        
        # Start background tasks
        tasks = [
            asyncio.create_task(self.continuous_data_fetch()),
            asyncio.create_task(self.analyze_projections_continuously()),
            asyncio.create_task(self.update_historical_accuracy()),
            asyncio.create_task(self.detect_value_opportunities()),
        ]
        
        try:
            await asyncio.gather(*tasks)
        except Exception as e:
            logger.error(f"❌ Real-time ingestion error: {e}")
        finally:
            if self.http_client:
                await self.http_client.aclose()
    
    async def continuous_data_fetch(self):
        """Continuously fetch ALL projections every 5 minutes"""
        while True:
            try:
                start_time = time.time()
                
                # Fetch all current projections
                all_projections = await self.fetch_all_projections()
                
                # Process and store projections
                processed_count = await self.process_projections(all_projections)
                
                # Update metrics
                self.fetch_count += 1
                self.last_update = datetime.now(timezone.utc)
                fetch_time = time.time() - start_time
                
                logger.info(f"✅ Fetched {processed_count} projections in {fetch_time:.2f}s")
                
                # Wait for next update
                await asyncio.sleep(self.update_frequency)
                
            except Exception as e:
                self.error_count += 1
                logger.error(f"❌ Data fetch error: {e}")
                await asyncio.sleep(60)  # Wait 1 minute on error
    
    async def fetch_all_projections(self) -> List[Dict[str, Any]]:
        """Fetch ALL projections from PrizePicks API"""
        all_projections = []
        
        try:
            # Fetch all leagues first
            leagues = await self.fetch_leagues()
            
            # Fetch projections for each league
            for league in leagues:
                league_projections = await self.fetch_league_projections(league['id'])
                all_projections.extend(league_projections)
                
                # Small delay to respect rate limits
                await asyncio.sleep(0.1)
            
            logger.info(f"📊 Fetched {len(all_projections)} total projections across {len(leagues)} leagues")
            return all_projections
            
        except Exception as e:
            logger.error(f"❌ Error fetching all projections: {e}")
            return []
    
    async def _make_api_request(self, url: str, params: Dict[str, Any] = None) -> Optional[Dict[str, Any]]:
        """Make an authenticated API request with rate limiting and retry logic"""
        if not self.http_client:
            logger.error("❌ HTTP client not initialized")
            return None
            
        # Rate limiting
        current_time = time.time()
        if current_time - self.last_request_time < self.rate_limit_delay:
            await asyncio.sleep(self.rate_limit_delay - (current_time - self.last_request_time))
        
        # Prepare headers
        headers = {
            "User-Agent": "A1Betting/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        
        # Add API key if available (not required for PrizePicks)
        # if self.api_key:
        #     headers["Authorization"] = f"Bearer {self.api_key}"
        #     logger.debug("🔑 Using API key authentication")
        # else:
        logger.info("ℹ️ PrizePicks API is public; no API key required.")
        
        # Retry logic
        for attempt in range(self.max_retries):
            try:
                self.last_request_time = time.time()
                self.request_count += 1
                
                response = await self.http_client.get(url, params=params, headers=headers)
                
                # Handle rate limiting
                if response.status_code == 429:
                    retry_after = int(response.headers.get("Retry-After", self.retry_delay * (attempt + 1)))
                    logger.warning(f"⚠️ Rate limited, waiting {retry_after}s before retry (attempt {attempt + 1})")
                    await asyncio.sleep(retry_after)
                    continue
                
                # Handle authentication errors
                if response.status_code == 403:
                    logger.error("❌ Authentication failed - check API key")
                    return None
                
                response.raise_for_status()
                return response.json()
                
            except httpx.HTTPStatusError as e:
                logger.error(f"❌ HTTP error {e.response.status_code}: {e}")
                if e.response.status_code in [429, 500, 502, 503, 504]:
                    if attempt < self.max_retries - 1:
                        await asyncio.sleep(self.retry_delay * (attempt + 1))
                        continue
                return None
                
            except Exception as e:
                logger.error(f"❌ Request error: {e}")
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(self.retry_delay * (attempt + 1))
                    continue
                return None
        
        return None

    async def fetch_leagues(self) -> List[Dict[str, Any]]:
        """Fetch all available leagues"""
        try:
            data = await self._make_api_request(f"{self.base_url}/leagues")
            
            if data:
                leagues = data.get('data', [])
                logger.info(f"📋 Found {len(leagues)} active leagues")
                return leagues
            else:
                logger.warning("⚠️ Failed to fetch leagues, using defaults")
                return [
                    {'id': 'NBA', 'name': 'NBA'},
                    {'id': 'NFL', 'name': 'NFL'},
                    {'id': 'MLB', 'name': 'MLB'},
                    {'id': 'NHL', 'name': 'NHL'},
                    {'id': 'NCAAB', 'name': 'NCAAB'},
                    {'id': 'NCAAF', 'name': 'NCAAF'}
                ]
            
        except Exception as e:
            logger.error(f"❌ Error fetching leagues: {e}")
            return [
                {'id': 'NBA', 'name': 'NBA'},
                {'id': 'NFL', 'name': 'NFL'},
                {'id': 'MLB', 'name': 'MLB'},
                {'id': 'NHL', 'name': 'NHL'},
                {'id': 'NCAAB', 'name': 'NCAAB'},
                {'id': 'NCAAF', 'name': 'NCAAF'}
            ]

    async def fetch_league_projections(self, league_id: str) -> List[Dict[str, Any]]:
        """Fetch all projections for a specific league"""
        try:
            params = {
                'include': 'new_player,league,stat_type',
                'per_page': 100,  # Maximum per page
                'single_stat': 'true'
            }
            
            if league_id:
                params['league_id'] = league_id
            
            data = await self._make_api_request(f"{self.base_url}/projections", params=params)
            
            if data:
                projections = data.get('data', [])
                included = data.get('included', [])
                
                # Process included data for player and league info
                processed_projections = self.process_raw_projections(projections, included)
                
                logger.info(f"📊 Fetched {len(processed_projections)} projections for {league_id}")
                return processed_projections
            else:
                logger.warning(f"⚠️ Failed to fetch projections for {league_id}")
                return []
            
        except Exception as e:
            logger.error(f"❌ Error fetching {league_id} projections: {e}")
            return []
    
    def process_raw_projections(self, projections: List[Dict], included: List[Dict]) -> List[Dict[str, Any]]:
        """Process raw API data into structured projections"""
        # Create lookup maps
        players_map = {}
        leagues_map = {}
        
        for item in included:
            if item.get('type') == 'new_player':
                players_map[item['id']] = item['attributes']
            elif item.get('type') == 'league':
                leagues_map[item['id']] = item['attributes']
        
        processed = []
        
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
                
                processed_proj = {
                    'id': proj.get('id', ''),
                    'player_id': player_id,
                    'player_name': player_info.get('name', attrs.get('description', '')),
                    'team': player_info.get('team_name', ''),
                    'position': player_info.get('position', ''),
                    'league': league_info.get('name', league_id),
                    'sport': league_info.get('sport', ''),
                    'stat_type': attrs.get('stat_type', ''),
                    'line_score': float(attrs.get('line_score', 0)),
                    'start_time': attrs.get('start_time', ''),
                    'status': attrs.get('status', 'active'),
                    'description': attrs.get('description', ''),
                    'rank': attrs.get('rank', 0),
                    'is_promo': attrs.get('is_promo', False),
                    'updated_at': attrs.get('updated_at', ''),
                    'odds_type': attrs.get('odds_type', ''),
                    'projection_type': attrs.get('projection_type', ''),
                }
                
                processed.append(processed_proj)
                
            except Exception as e:
                logger.warning(f"⚠️ Error processing projection {proj.get('id', 'unknown')}: {e}")
                continue
        
        return processed
    
    async def process_projections(self, projections: List[Dict[str, Any]]) -> int:
        """Process and store projections"""
        processed_count = 0
        
        for proj_data in projections:
            try:
                # Create PrizePicksProjection object
                projection = PrizePicksProjection(
                    id=proj_data['id'],
                    player_id=proj_data['player_id'],
                    player_name=proj_data['player_name'],
                    team=proj_data['team'],
                    position=proj_data['position'],
                    league=proj_data['league'],
                    sport=proj_data['sport'],
                    stat_type=proj_data['stat_type'],
                    line_score=proj_data['line_score'],
                    start_time=datetime.fromisoformat(proj_data['start_time'].replace('Z', '+00:00')) if proj_data['start_time'] else datetime.now(),
                    status=proj_data['status'],
                    description=proj_data['description'],
                    rank=proj_data['rank'],
                    is_promo=proj_data['is_promo'],
                    updated_at=datetime.fromisoformat(proj_data['updated_at'].replace('Z', '+00:00')) if proj_data['updated_at'] else datetime.now(),
                )
                
                # Store in current projections
                self.current_projections[projection.id] = projection
                
                # Add to historical data
                self.historical_data.append(projection)
                
                # Update player trends
                player_key = f"{projection.player_id}_{projection.stat_type}"
                self.player_trends[player_key].append({
                    'timestamp': datetime.now(),
                    'line': projection.line_score,
                    'league': projection.league
                })
                
                # Store in database
                await self.store_projection_history(projection)
                
                processed_count += 1
                
            except Exception as e:
                logger.warning(f"⚠️ Error processing projection: {e}")
                continue
        
        return processed_count
    
    async def store_projection_history(self, projection: PrizePicksProjection):
        """Store projection in database for historical analysis"""
        try:
            if self.session:
                history_record = ProjectionHistory(
                    projection_id=projection.id,
                    player_id=projection.player_id,
                    player_name=projection.player_name,
                    team=projection.team,
                    league=projection.league,
                    stat_type=projection.stat_type,
                    line_score=projection.line_score,
                    start_time=projection.start_time,
                    status=projection.status
                )
                
                # Check if record already exists
                existing = self.session.query(ProjectionHistory).filter_by(
                    projection_id=projection.id
                ).first()
                
                if not existing:
                    self.session.add(history_record)
                    self.session.commit()
                    
        except Exception as e:
            logger.warning(f"⚠️ Error storing projection history: {e}")
            if self.session:
                self.session.rollback()
    
    async def analyze_projections_continuously(self):
        """Continuously analyze projections for value and accuracy"""
        while True:
            try:
                start_time = time.time()
                
                analyses_created = 0
                for projection_id, projection in self.current_projections.items():
                    if projection_id not in self.analysis_cache:
                        analysis = await self.analyze_projection(projection)
                        self.analysis_cache[projection_id] = analysis
                        analyses_created += 1
                
                analysis_time = time.time() - start_time
                logger.info(f"📊 Created {analyses_created} new analyses in {analysis_time:.2f}s")
                
                # Clean old cache entries
                self.clean_analysis_cache()
                
                await asyncio.sleep(60)  # Analyze every minute
                
            except Exception as e:
                logger.error(f"❌ Analysis error: {e}")
                await asyncio.sleep(30)
    
    async def analyze_projection(self, projection: PrizePicksProjection) -> ProjectionAnalysis:
        """Analyze a single projection for value and accuracy"""
        try:
            # Get player historical performance
            player_history = await self.get_player_historical_performance(
                projection.player_id, projection.stat_type
            )
            
            # Calculate predicted value based on historical data
            predicted_value = self.calculate_predicted_value(player_history, projection)
            
            # Calculate confidence based on data quality and consistency
            confidence = self.calculate_prediction_confidence(player_history, projection)
            
            # Calculate value bet score
            value_score = self.calculate_value_bet_score(predicted_value, projection.line_score)
            
            # Generate recommendation
            recommendation = self.generate_recommendation(predicted_value, projection.line_score, confidence)
            
            # Create reasoning
            reasoning = self.generate_reasoning(player_history, predicted_value, projection, confidence)
            
            return ProjectionAnalysis(
                projection_id=projection.id,
                predicted_value=predicted_value,
                confidence=confidence,
                value_bet_score=value_score,
                market_comparison={},  # Will be filled by market comparison service
                trend_analysis=self.analyze_player_trends(projection.player_id, projection.stat_type),
                risk_assessment=self.assess_risk(projection, confidence),
                recommendation=recommendation,
                reasoning=reasoning
            )
            
        except Exception as e:
            logger.error(f"❌ Error analyzing projection {projection.id}: {e}")
            return ProjectionAnalysis(
                projection_id=projection.id,
                predicted_value=projection.line_score,
                confidence=0.5,
                value_bet_score=0.0,
                market_comparison={},
                trend_analysis={},
                risk_assessment={},
                recommendation="INSUFFICIENT_DATA",
                reasoning=["Insufficient data for analysis"]
            )
    
    def calculate_predicted_value(self, history: List[Dict], projection: PrizePicksProjection) -> float:
        """Calculate predicted value based on historical performance"""
        if not history:
            return projection.line_score
        
        # Get recent performance (last 10 games)
        recent_games = sorted(history, key=lambda x: x['game_date'], reverse=True)[:10]
        
        if not recent_games:
            return projection.line_score
        
        # Calculate weighted average (more recent games weighted higher)
        total_weight = 0
        weighted_sum = 0
        
        for i, game in enumerate(recent_games):
            weight = 1.0 / (i + 1)  # Recent games get higher weight
            weighted_sum += game['actual_value'] * weight
            total_weight += weight
        
        predicted = weighted_sum / total_weight if total_weight > 0 else projection.line_score
        
        # Apply trend adjustment
        if len(recent_games) >= 5:
            trend = self.calculate_trend(recent_games[:5])
            predicted += trend * 0.1  # Small trend adjustment
        
        return round(predicted, 1)
    
    def calculate_prediction_confidence(self, history: List[Dict], projection: PrizePicksProjection) -> float:
        """Calculate confidence in prediction based on data quality"""
        base_confidence = 0.5
        
        if not history:
            return base_confidence
        
        # Factor 1: Sample size
        sample_size_factor = min(len(history) / 20, 1.0) * 0.2
        
        # Factor 2: Consistency (lower variance = higher confidence)
        values = [game['actual_value'] for game in history]
        if len(values) > 1:
            variance = np.var(values)
            consistency_factor = max(0, 0.2 - variance / 100)
        else:
            consistency_factor = 0
        
        # Factor 3: Recency (more recent data = higher confidence)
        recent_games = [g for g in history if (datetime.now() - g['game_date']).days <= 30]
        recency_factor = min(len(recent_games) / 10, 1.0) * 0.1
        
        # Factor 4: League quality (some leagues have more predictable data)
        league_factor = 0.1 if projection.league in ['NBA', 'NFL', 'MLB'] else 0.05
        
        total_confidence = base_confidence + sample_size_factor + consistency_factor + recency_factor + league_factor
        return min(total_confidence, 0.95)  # Cap at 95%
    
    def calculate_value_bet_score(self, predicted_value: float, line: float) -> float:
        """Calculate value bet score (positive = value on over, negative = value on under)"""
        difference = predicted_value - line
        
        # Convert difference to value score (larger differences = higher value)
        if abs(difference) < 0.5:
            return 0.0  # No significant value
        
        # Scale the value score
        value_score = difference / line if line > 0 else 0
        return round(value_score, 3)
    
    def generate_recommendation(self, predicted: float, line: float, confidence: float) -> str:
        """Generate betting recommendation"""
        difference = predicted - line
        
        if confidence < 0.6:
            return "INSUFFICIENT_CONFIDENCE"
        
        if abs(difference) < 0.5:
            return "NO_VALUE"
        
        if difference > 0.5 and confidence > 0.7:
            return "STRONG_OVER"
        elif difference > 0.2:
            return "LEAN_OVER"
        elif difference < -0.5 and confidence > 0.7:
            return "STRONG_UNDER"
        elif difference < -0.2:
            return "LEAN_UNDER"
        else:
            return "NO_VALUE"
    
    def generate_reasoning(self, history: List[Dict], predicted: float, projection: PrizePicksProjection, confidence: float) -> List[str]:
        """Generate human-readable reasoning for the analysis"""
        reasoning = []
        
        if not history:
            reasoning.append("Limited historical data available")
            return reasoning
        
        # Sample size reasoning
        reasoning.append(f"Based on {len(history)} historical games")
        
        # Recent performance
        recent = sorted(history, key=lambda x: x['game_date'], reverse=True)[:5]
        if recent:
            avg_recent = sum(g['actual_value'] for g in recent) / len(recent)
            reasoning.append(f"Recent 5-game average: {avg_recent:.1f}")
        
        # Trend analysis
        if len(recent) >= 3:
            trend = self.calculate_trend(recent)
            if trend > 0.2:
                reasoning.append("Player showing upward trend")
            elif trend < -0.2:
                reasoning.append("Player showing downward trend")
        
        # Confidence reasoning
        if confidence > 0.8:
            reasoning.append("High confidence due to consistent performance")
        elif confidence < 0.6:
            reasoning.append("Lower confidence due to limited or inconsistent data")
        
        # Value reasoning
        difference = predicted - projection.line_score
        if abs(difference) > 0.5:
            reasoning.append(f"Significant value detected: {difference:+.1f} vs line")
        
        return reasoning
    
    def calculate_trend(self, recent_games: List[Dict]) -> float:
        """Calculate performance trend (positive = improving, negative = declining)"""
        if len(recent_games) < 3:
            return 0.0
        
        # Sort by date (oldest first for trend calculation)
        sorted_games = sorted(recent_games, key=lambda x: x['game_date'])
        values = [game['actual_value'] for game in sorted_games]
        
        # Calculate simple linear trend
        x = list(range(len(values)))
        if len(x) > 1:
            slope = np.polyfit(x, values, 1)[0]
            return slope
        
        return 0.0
    
    def analyze_player_trends(self, player_id: str, stat_type: str) -> Dict[str, Any]:
        """Analyze player trends over time"""
        player_key = f"{player_id}_{stat_type}"
        trends = self.player_trends.get(player_key, deque())
        
        if len(trends) < 3:
            return {"trend": "insufficient_data", "data_points": len(trends)}
        
        recent_lines = [t['line'] for t in list(trends)[-10:]]
        
        # Calculate trend direction
        if len(recent_lines) >= 3:
            slope = np.polyfit(range(len(recent_lines)), recent_lines, 1)[0]
            if slope > 0.1:
                trend = "increasing"
            elif slope < -0.1:
                trend = "decreasing"
            else:
                trend = "stable"
        else:
            trend = "stable"
        
        return {
            "trend": trend,
            "data_points": len(trends),
            "recent_average": np.mean(recent_lines) if recent_lines else 0,
            "volatility": np.std(recent_lines) if len(recent_lines) > 1 else 0
        }
    
    def assess_risk(self, projection: PrizePicksProjection, confidence: float) -> Dict[str, Any]:
        """Assess risk factors for the projection"""
        risk_factors = []
        risk_score = 0.0
        
        # Time until game
        time_to_game = (projection.start_time - datetime.now(timezone.utc)).total_seconds() / 3600
        if time_to_game < 2:  # Less than 2 hours
            risk_factors.append("Game starting soon - lineup changes possible")
            risk_score += 0.1
        
        # Promotional props are riskier
        if projection.is_promo:
            risk_factors.append("Promotional prop - potentially boosted line")
            risk_score += 0.2
        
        # Low confidence increases risk
        if confidence < 0.6:
            risk_factors.append("Low prediction confidence")
            risk_score += 0.3
        
        # New players or limited data
        player_data_points = len(self.player_trends.get(f"{projection.player_id}_{projection.stat_type}", []))
        if player_data_points < 5:
            risk_factors.append("Limited historical data for player")
            risk_score += 0.2
        
        return {
            "risk_score": min(risk_score, 1.0),
            "risk_factors": risk_factors,
            "recommendation": "HIGH_RISK" if risk_score > 0.5 else "MODERATE_RISK" if risk_score > 0.2 else "LOW_RISK"
        }
    
    async def get_player_historical_performance(self, player_id: str, stat_type: str) -> List[Dict]:
        """Get player's historical performance for the stat type"""
        if not self.session:
            return []
        
        try:
            # Query last 50 games for the player and stat type
            records = self.session.query(PlayerPerformance).filter_by(
                player_id=player_id,
                stat_type=stat_type
            ).order_by(PlayerPerformance.game_date.desc()).limit(50).all()
            
            return [
                {
                    'game_date': record.game_date,
                    'actual_value': record.actual_value,
                    'projected_value': record.projected_value,
                    'difference': record.difference
                }
                for record in records
            ]
            
        except Exception as e:
            logger.error(f"❌ Error fetching player history: {e}")
            return []
    
    async def update_historical_accuracy(self):
        """Update historical accuracy metrics for completed games"""
        while True:
            try:
                # This would integrate with sports data APIs to get actual results
                # For now, we'll implement the framework
                logger.info("📊 Updating historical accuracy metrics...")
                
                # TODO: Integrate with ESPN, NBA API, etc. to get actual game results
                # and update our accuracy tracking
                
                await asyncio.sleep(3600)  # Update every hour
                
            except Exception as e:
                logger.error(f"❌ Error updating accuracy: {e}")
                await asyncio.sleep(1800)  # Wait 30 minutes on error
    
    async def detect_value_opportunities(self):
        """Continuously detect high-value betting opportunities"""
        while True:
            try:
                high_value_opportunities = []
                
                for projection_id, analysis in self.analysis_cache.items():
                    if (abs(analysis.value_bet_score) > 0.05 and  # 5%+ value
                        analysis.confidence > 0.7 and  # High confidence
                        analysis.risk_assessment.get('risk_score', 1.0) < 0.3):  # Low risk
                        
                        projection = self.current_projections.get(projection_id)
                        if projection:
                            opportunity = {
                                'projection_id': projection_id,
                                'player': projection.player_name,
                                'stat_type': projection.stat_type,
                                'line': projection.line_score,
                                'predicted': analysis.predicted_value,
                                'value_score': analysis.value_bet_score,
                                'confidence': analysis.confidence,
                                'recommendation': analysis.recommendation,
                                'reasoning': analysis.reasoning
                            }
                            high_value_opportunities.append(opportunity)
                
                if high_value_opportunities:
                    # Sort by value score
                    high_value_opportunities.sort(key=lambda x: abs(x['value_score']), reverse=True)
                    
                    logger.info(f"🎯 Found {len(high_value_opportunities)} high-value opportunities")
                    
                    # Log top 3 opportunities
                    for i, opp in enumerate(high_value_opportunities[:3]):
                        logger.info(f"  {i+1}. {opp['player']} {opp['stat_type']}: "
                                  f"{opp['predicted']:.1f} vs {opp['line']:.1f} "
                                  f"({opp['value_score']:+.1%} value, {opp['confidence']:.0%} confidence)")
                
                await asyncio.sleep(300)  # Check every 5 minutes
                
            except Exception as e:
                logger.error(f"❌ Error detecting opportunities: {e}")
                await asyncio.sleep(60)
    
    def clean_analysis_cache(self):
        """Clean old analysis cache entries"""
        current_time = time.time()
        expired_keys = []
        
        for key, analysis in self.analysis_cache.items():
            # Remove analyses older than cache TTL
            if current_time - getattr(analysis, 'created_at', current_time) > self.cache_ttl:
                expired_keys.append(key)
        
        for key in expired_keys:
            del self.analysis_cache[key]
    
    async def get_current_projections(self) -> List[PrizePicksProjection]:
        """Get all current projections"""
        return list(self.current_projections.values())
    
    async def get_projections_by_league(self, league: str) -> List[PrizePicksProjection]:
        """Get projections for a specific league"""
        return [p for p in self.current_projections.values() if p.league.upper() == league.upper()]
    
    async def get_projections_by_player(self, player_name: str) -> List[PrizePicksProjection]:
        """Get all projections for a specific player"""
        return [p for p in self.current_projections.values() if player_name.lower() in p.player_name.lower()]
    
    async def get_high_value_opportunities(self, min_value: float = 0.05, min_confidence: float = 0.7) -> List[Dict]:
        """Get high-value betting opportunities"""
        opportunities = []
        
        for projection_id, analysis in self.analysis_cache.items():
            if (abs(analysis.value_bet_score) >= min_value and 
                analysis.confidence >= min_confidence):
                
                projection = self.current_projections.get(projection_id)
                if projection:
                    opportunities.append({
                        'projection': projection,
                        'analysis': analysis,
                        'value_score': analysis.value_bet_score,
                        'confidence': analysis.confidence
                    })
        
        # Sort by value score
        opportunities.sort(key=lambda x: abs(x['value_score']), reverse=True)
        return opportunities
    
    def get_service_stats(self) -> Dict[str, Any]:
        """Get service performance statistics"""
        return {
            'total_projections': len(self.current_projections),
            'fetch_count': self.fetch_count,
            'error_count': self.error_count,
            'last_update': self.last_update.isoformat() if self.last_update else None,
            'analysis_cache_size': len(self.analysis_cache),
            'leagues_tracked': len(set(p.league for p in self.current_projections.values())),
            'players_tracked': len(set(p.player_id for p in self.current_projections.values())),
            'update_frequency_minutes': self.update_frequency / 60,
            'error_rate': self.error_count / max(self.fetch_count, 1)
        }

# Global service instance
comprehensive_prizepicks_service = ComprehensivePrizePicksService()

async def start_prizepicks_service():
    """Start the comprehensive PrizePicks service"""
    logger.info("🚀 Starting Comprehensive PrizePicks Service...")
    await comprehensive_prizepicks_service.start_real_time_ingestion()

if __name__ == "__main__":
    # For testing
    asyncio.run(start_prizepicks_service()) 