"""
Advanced Social Intelligence Engine - Iteration 72/150
Multi-platform sentiment analysis with viral trend prediction
"""

import asyncio
import hashlib
import json
import logging
import re
from collections import defaultdict, deque
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Dict, List, Optional, Set, Tuple

import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SentimentPolarity(Enum):
    VERY_NEGATIVE = "VERY_NEGATIVE"
    NEGATIVE = "NEGATIVE"
    NEUTRAL = "NEUTRAL"
    POSITIVE = "POSITIVE"
    VERY_POSITIVE = "VERY_POSITIVE"


class TrendVelocity(Enum):
    DECLINING = "DECLINING"
    STABLE = "STABLE"
    GROWING = "GROWING"
    VIRAL = "VIRAL"


class InfluencerTier(Enum):
    MICRO = "MICRO"  # 1K-100K followers
    MACRO = "MACRO"  # 100K-1M followers
    MEGA = "MEGA"  # 1M+ followers
    CELEBRITY = "CELEBRITY"  # 10M+ followers


@dataclass
class SocialPost:
    id: str
    platform: str
    author: str
    content: str
    timestamp: datetime
    engagement: Dict[str, int]  # likes, shares, comments, etc.
    reach: int
    sentiment_score: float
    confidence: float
    topics: List[str]
    mentions: List[str]
    hashtags: List[str]


class SocialMetrics:
    def __init__(self):
        self.total_mentions = 0
        self.sentiment_distribution = {
            polarity.value: 0 for polarity in SentimentPolarity
        }
        self.engagement_sum = 0
        self.reach_sum = 0
        self.top_topics = []
        self.trending_hashtags = []
        self.influencer_activity = {}


@dataclass
class ViralTrend:
    id: str
    topic: str
    platform: str
    velocity: TrendVelocity
    sentiment: float
    volume: int
    growth_rate: float
    peak_prediction: datetime
    related_events: List[str]
    key_influencers: List[str]
    timestamp: datetime

    def to_dict(self) -> Dict:
        return asdict(self)


@dataclass
class InfluencerProfile:
    username: str
    platform: str
    tier: InfluencerTier
    followers: int
    engagement_rate: float
    sentiment_influence: float
    sports_relevance: float
    credibility_score: float
    recent_activity: List[SocialPost]
    topic_expertise: List[str]

    def to_dict(self) -> Dict:
        return asdict(self)


class AdvancedSentimentAnalyzer:
    """
    Advanced sentiment analysis with sports-specific context
    """

    def __init__(self):
        # Sports-specific sentiment lexicons
        self.positive_sports_terms = {
            "win",
            "victory",
            "champion",
            "dominate",
            "beast",
            "clutch",
            "elite",
            "mvp",
            "goat",
            "unstoppable",
            "phenomenal",
            "stellar",
            "outstanding",
            "amazing",
            "incredible",
            "perfect",
            "flawless",
            "legendary",
        }

        self.negative_sports_terms = {
            "lose",
            "defeat",
            "choke",
            "awful",
            "terrible",
            "worst",
            "disaster",
            "collapse",
            "pathetic",
            "embarrassing",
            "fraud",
            "overpaid",
            "trash",
            "bust",
            "washed",
            "decline",
            "injury",
            "suspended",
            "controversy",
        }

        # Emotional intensity modifiers
        self.intensifiers = {
            "very": 1.5,
            "extremely": 2.0,
            "absolutely": 1.8,
            "totally": 1.6,
            "completely": 1.7,
            "super": 1.4,
            "really": 1.3,
            "so": 1.2,
        }

        self.diminishers = {
            "somewhat": 0.7,
            "slightly": 0.5,
            "kind of": 0.6,
            "sort of": 0.6,
            "a bit": 0.5,
            "a little": 0.5,
            "moderately": 0.7,
        }

    def analyze_sentiment(self, text: str) -> Tuple[float, float]:
        """
        Analyze sentiment of text and return (score, confidence)
        Score: -1 (very negative) to +1 (very positive)
        Confidence: 0 to 1
        """

        if not text:
            return 0.0, 0.0

        # Clean and tokenize text
        cleaned_text = self.clean_text(text)
        tokens = cleaned_text.lower().split()

        if not tokens:
            return 0.0, 0.0

        # Calculate base sentiment
        positive_score = 0
        negative_score = 0
        neutral_count = 0

        for i, token in enumerate(tokens):
            # Check for sports-specific positive terms
            if token in self.positive_sports_terms:
                score = 1.0
                # Apply modifiers
                score = self.apply_modifiers(tokens, i, score)
                positive_score += score

            # Check for sports-specific negative terms
            elif token in self.negative_sports_terms:
                score = 1.0
                # Apply modifiers
                score = self.apply_modifiers(tokens, i, score)
                negative_score += score

            else:
                neutral_count += 1

        # Calculate sentiment score
        total_sentiment_words = positive_score + negative_score
        if total_sentiment_words == 0:
            sentiment_score = 0.0
            confidence = 0.1  # Low confidence for neutral text
        else:
            sentiment_score = (positive_score - negative_score) / total_sentiment_words
            # Confidence based on sentiment word density
            sentiment_density = total_sentiment_words / len(tokens)
            confidence = min(1.0, sentiment_density * 2)

        # Apply additional context analysis
        sentiment_score = self.apply_context_analysis(cleaned_text, sentiment_score)

        # Normalize sentiment score
        sentiment_score = max(-1.0, min(1.0, sentiment_score))

        return sentiment_score, confidence

    def clean_text(self, text: str) -> str:
        """Clean text for analysis"""
        # Remove URLs
        text = re.sub(r"http\S+|www\S+", "", text)
        # Remove mentions and hashtags for sentiment (keep content)
        text = re.sub(r"[@#]\w+", "", text)
        # Remove extra whitespace
        text = re.sub(r"\s+", " ", text).strip()
        return text

    def apply_modifiers(
        self, tokens: List[str], index: int, base_score: float
    ) -> float:
        """Apply intensity modifiers to sentiment score"""

        # Check previous words for modifiers
        for i in range(max(0, index - 2), index):
            token = tokens[i]
            if token in self.intensifiers:
                base_score *= self.intensifiers[token]
            elif token in self.diminishers:
                base_score *= self.diminishers[token]

        return base_score

    def apply_context_analysis(self, text: str, base_score: float) -> float:
        """Apply contextual analysis to refine sentiment"""

        # Check for negation
        negation_patterns = ["not", "no", "never", "none", "nothing", "neither", "nor"]
        for pattern in negation_patterns:
            if pattern in text.lower():
                base_score *= -0.8  # Reverse and diminish
                break

        # Check for sarcasm indicators
        sarcasm_indicators = ["yeah right", "sure", "great job", "fantastic"]
        for indicator in sarcasm_indicators:
            if indicator in text.lower():
                base_score *= -1.2  # Reverse and intensify
                break

        # Check for question marks (uncertainty)
        if "?" in text:
            base_score *= 0.8

        # Check for exclamation marks (intensity)
        exclamation_count = text.count("!")
        if exclamation_count > 0:
            base_score *= 1 + exclamation_count * 0.1

        return base_score


class ViralTrendDetector:
    """
    Detects and predicts viral trends in social media
    """

    def __init__(self):
        self.trend_history = deque(maxlen=10000)
        self.topic_momentum = defaultdict(deque)
        self.platform_multipliers = {
            "twitter": 1.0,
            "reddit": 0.8,
            "instagram": 0.6,
            "tiktok": 1.5,
            "youtube": 0.7,
        }

    def detect_trends(
        self, posts: List[SocialPost], time_window: int = 3600
    ) -> List[ViralTrend]:
        """
        Detect viral trends from social posts
        time_window: seconds to consider for trend detection
        """

        trends = []
        current_time = datetime.now()
        cutoff_time = current_time - timedelta(seconds=time_window)

        # Filter recent posts
        recent_posts = [post for post in posts if post.timestamp >= cutoff_time]

        if not recent_posts:
            return trends

        # Group posts by topic/hashtag
        topic_groups = self.group_posts_by_topic(recent_posts)

        for topic, topic_posts in topic_groups.items():
            if len(topic_posts) < 3:  # Need minimum posts for trend
                continue

            # Calculate trend metrics
            trend = self.analyze_topic_trend(topic, topic_posts)
            if trend and trend.velocity != TrendVelocity.STABLE:
                trends.append(trend)

        # Sort by viral potential
        trends.sort(key=lambda t: self.calculate_viral_score(t), reverse=True)

        return trends[:10]  # Return top 10 trends

    def group_posts_by_topic(
        self, posts: List[SocialPost]
    ) -> Dict[str, List[SocialPost]]:
        """Group posts by topics and hashtags"""

        topic_groups = defaultdict(list)

        for post in posts:
            # Group by hashtags
            for hashtag in post.hashtags:
                topic_groups[f"#{hashtag}"].append(post)

            # Group by topics
            for topic in post.topics:
                topic_groups[topic].append(post)

        return dict(topic_groups)

    def analyze_topic_trend(
        self, topic: str, posts: List[SocialPost]
    ) -> Optional[ViralTrend]:
        """Analyze trend for a specific topic"""

        try:
            # Calculate volume and engagement
            total_volume = len(posts)
            total_engagement = sum(sum(post.engagement.values()) for post in posts)
            total_reach = sum(post.reach for post in posts)

            # Calculate sentiment
            sentiments = [
                post.sentiment_score
                for post in posts
                if post.sentiment_score is not None
            ]
            avg_sentiment = np.mean(sentiments) if sentiments else 0.0

            # Calculate growth rate
            growth_rate = self.calculate_growth_rate(topic, posts)

            # Determine velocity
            velocity = self.determine_velocity(
                growth_rate, total_volume, total_engagement
            )

            # Find key influencers
            key_influencers = self.identify_key_influencers(posts)

            # Predict peak
            peak_prediction = self.predict_peak_time(growth_rate)

            # Extract related events
            related_events = self.extract_related_events(posts)

            trend = ViralTrend(
                id=self.generate_trend_id(topic),
                topic=topic,
                platform=self.get_dominant_platform(posts),
                velocity=velocity,
                sentiment=avg_sentiment,
                volume=total_volume,
                growth_rate=growth_rate,
                peak_prediction=peak_prediction,
                related_events=related_events,
                key_influencers=key_influencers,
                timestamp=datetime.now(),
            )

            return trend

        except Exception as e:
            logger.error(f"Error analyzing topic trend for {topic}: {e}")
            return None

    def calculate_growth_rate(self, topic: str, posts: List[SocialPost]) -> float:
        """Calculate growth rate for a topic"""

        # Sort posts by timestamp
        sorted_posts = sorted(posts, key=lambda p: p.timestamp)

        if len(sorted_posts) < 2:
            return 0.0

        # Calculate posts per hour in recent vs earlier periods
        now = datetime.now()
        recent_cutoff = now - timedelta(hours=1)
        earlier_cutoff = now - timedelta(hours=2)

        recent_posts = [p for p in sorted_posts if p.timestamp >= recent_cutoff]
        earlier_posts = [
            p for p in sorted_posts if earlier_cutoff <= p.timestamp < recent_cutoff
        ]

        recent_rate = len(recent_posts)  # posts per hour
        earlier_rate = len(earlier_posts) if earlier_posts else 1

        # Calculate growth rate
        growth_rate = (recent_rate - earlier_rate) / earlier_rate

        return growth_rate

    def determine_velocity(
        self, growth_rate: float, volume: int, engagement: int
    ) -> TrendVelocity:
        """Determine trend velocity based on metrics"""

        # Weighted score considering growth, volume, and engagement
        velocity_score = (
            growth_rate * 0.5
            + min(volume / 100, 5) * 0.3  # Normalize volume
            + min(engagement / 10000, 5) * 0.2  # Normalize engagement
        )

        if velocity_score > 3.0:
            return TrendVelocity.VIRAL
        elif velocity_score > 1.0:
            return TrendVelocity.GROWING
        elif velocity_score > -0.5:
            return TrendVelocity.STABLE
        else:
            return TrendVelocity.DECLINING

    def identify_key_influencers(self, posts: List[SocialPost]) -> List[str]:
        """Identify key influencers driving the trend"""

        # Calculate influence score for each author
        author_scores = defaultdict(float)

        for post in posts:
            # Base influence from engagement
            engagement_score = sum(post.engagement.values())
            reach_score = post.reach

            # Combined influence score
            influence_score = engagement_score * 0.6 + reach_score * 0.4
            author_scores[post.author] += influence_score

        # Sort by influence and return top influencers
        sorted_influencers = sorted(
            author_scores.items(), key=lambda x: x[1], reverse=True
        )

        return [author for author, score in sorted_influencers[:5]]

    def predict_peak_time(self, growth_rate: float) -> datetime:
        """Predict when trend will peak"""

        # Simple prediction based on growth rate
        if growth_rate > 2.0:
            hours_to_peak = 2  # Fast viral trends peak quickly
        elif growth_rate > 1.0:
            hours_to_peak = 6  # Moderate trends take longer
        elif growth_rate > 0.5:
            hours_to_peak = 12  # Slow trends take much longer
        else:
            hours_to_peak = 24  # Very slow or declining trends

        return datetime.now() + timedelta(hours=hours_to_peak)

    def extract_related_events(self, posts: List[SocialPost]) -> List[str]:
        """Extract related events mentioned in posts"""

        # Common sports events and terms
        event_patterns = [
            r"game\s+\d+",
            r"championship",
            r"playoffs",
            r"finals",
            r"trade",
            r"draft",
            r"injury",
            r"suspension",
            r"contract",
            r"mvp",
            r"rookie",
            r"all-star",
            r"hall of fame",
        ]

        events = set()

        for post in posts:
            content = post.content.lower()
            for pattern in event_patterns:
                matches = re.findall(pattern, content)
                events.update(matches)

        return list(events)[:5]  # Return top 5 events

    def get_dominant_platform(self, posts: List[SocialPost]) -> str:
        """Get the platform with most activity for this trend"""

        platform_counts = defaultdict(int)

        for post in posts:
            platform_counts[post.platform] += 1

        if not platform_counts:
            return "unknown"

        return max(platform_counts.items(), key=lambda x: x[1])[0]

    def generate_trend_id(self, topic: str) -> str:
        """Generate unique ID for trend"""

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        topic_hash = hashlib.md5(topic.encode()).hexdigest()[:8]

        return f"trend_{timestamp}_{topic_hash}"

    def calculate_viral_score(self, trend: ViralTrend) -> float:
        """Calculate viral potential score for ranking"""

        velocity_multiplier = {
            TrendVelocity.VIRAL: 4.0,
            TrendVelocity.GROWING: 2.0,
            TrendVelocity.STABLE: 1.0,
            TrendVelocity.DECLINING: 0.5,
        }

        platform_multiplier = self.platform_multipliers.get(trend.platform, 1.0)

        score = (
            (
                trend.volume * 0.3
                + abs(trend.sentiment) * 100 * 0.2
                + trend.growth_rate * 50 * 0.3
                + len(trend.key_influencers) * 10 * 0.2
            )
            * velocity_multiplier.get(trend.velocity, 1.0)
            * platform_multiplier
        )

        return score


class InfluencerAnalyzer:
    """
    Analyzes influencer profiles and their impact
    """

    def __init__(self):
        self.influencer_database = {}
        self.influence_history = deque(maxlen=5000)

    def analyze_influencer(
        self, posts: List[SocialPost], username: str
    ) -> Optional[InfluencerProfile]:
        """Analyze an influencer's profile based on their posts"""

        user_posts = [post for post in posts if post.author == username]

        if not user_posts:
            return None

        try:
            # Calculate metrics
            total_followers = max(
                post.reach for post in user_posts
            )  # Estimate from reach
            avg_engagement = np.mean(
                [sum(post.engagement.values()) for post in user_posts]
            )
            engagement_rate = (
                (avg_engagement / total_followers) * 100 if total_followers > 0 else 0
            )

            # Determine tier
            tier = self.determine_influencer_tier(total_followers)

            # Calculate sentiment influence
            sentiment_scores = [
                post.sentiment_score
                for post in user_posts
                if post.sentiment_score is not None
            ]
            sentiment_influence = (
                np.std(sentiment_scores) if len(sentiment_scores) > 1 else 0
            )

            # Calculate sports relevance
            sports_relevance = self.calculate_sports_relevance(user_posts)

            # Calculate credibility score
            credibility_score = self.calculate_credibility_score(
                user_posts, engagement_rate
            )

            # Extract topic expertise
            topic_expertise = self.extract_topic_expertise(user_posts)

            # Get platform (most common)
            platforms = [post.platform for post in user_posts]
            platform = max(set(platforms), key=platforms.count)

            profile = InfluencerProfile(
                username=username,
                platform=platform,
                tier=tier,
                followers=total_followers,
                engagement_rate=engagement_rate,
                sentiment_influence=sentiment_influence,
                sports_relevance=sports_relevance,
                credibility_score=credibility_score,
                recent_activity=user_posts[-10:],  # Last 10 posts
                topic_expertise=topic_expertise,
            )

            return profile

        except Exception as e:
            logger.error(f"Error analyzing influencer {username}: {e}")
            return None

    def determine_influencer_tier(self, followers: int) -> InfluencerTier:
        """Determine influencer tier based on follower count"""

        if followers >= 10000000:
            return InfluencerTier.CELEBRITY
        elif followers >= 1000000:
            return InfluencerTier.MEGA
        elif followers >= 100000:
            return InfluencerTier.MACRO
        else:
            return InfluencerTier.MICRO

    def calculate_sports_relevance(self, posts: List[SocialPost]) -> float:
        """Calculate how relevant the influencer is to sports"""

        sports_keywords = {
            "game",
            "team",
            "player",
            "coach",
            "season",
            "championship",
            "playoffs",
            "draft",
            "trade",
            "injury",
            "score",
            "win",
            "lose",
            "nfl",
            "nba",
            "mlb",
            "nhl",
            "soccer",
            "football",
            "basketball",
            "baseball",
            "hockey",
            "tennis",
            "golf",
            "boxing",
            "mma",
        }

        total_words = 0
        sports_words = 0

        for post in posts:
            words = post.content.lower().split()
            total_words += len(words)
            sports_words += sum(1 for word in words if word in sports_keywords)

        if total_words == 0:
            return 0.0

        relevance = sports_words / total_words
        return min(1.0, relevance * 10)  # Scale up and cap at 1.0

    def calculate_credibility_score(
        self, posts: List[SocialPost], engagement_rate: float
    ) -> float:
        """Calculate influencer credibility score"""

        # Factors: consistency, engagement rate, content quality indicators

        # Consistency (regular posting)
        if len(posts) < 2:
            consistency = 0.5
        else:
            post_intervals = []
            sorted_posts = sorted(posts, key=lambda p: p.timestamp)
            for i in range(1, len(sorted_posts)):
                interval = (
                    sorted_posts[i].timestamp - sorted_posts[i - 1].timestamp
                ).total_seconds()
                post_intervals.append(interval)

            # More consistent posting = higher credibility
            consistency = 1.0 / (
                1.0 + np.std(post_intervals) / 86400
            )  # Normalize by day

        # Engagement rate factor
        engagement_factor = min(1.0, engagement_rate / 5)  # 5% engagement is excellent

        # Content quality indicators
        avg_content_length = np.mean([len(post.content) for post in posts])
        content_quality = min(1.0, avg_content_length / 200)  # 200 chars is good length

        # Combine factors
        credibility = (
            consistency * 0.4 + engagement_factor * 0.4 + content_quality * 0.2
        )

        return credibility

    def extract_topic_expertise(self, posts: List[SocialPost]) -> List[str]:
        """Extract topics the influencer is expert in"""

        topic_counts = defaultdict(int)

        for post in posts:
            for topic in post.topics:
                topic_counts[topic] += 1

        # Return topics they post about frequently
        sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)

        return [topic for topic, count in sorted_topics[:5] if count >= 2]


class SocialIntelligenceOrchestrator:
    """
    Main orchestrator for social intelligence analysis
    """

    def __init__(self):
        self.sentiment_analyzer = AdvancedSentimentAnalyzer()
        self.trend_detector = ViralTrendDetector()
        self.influencer_analyzer = InfluencerAnalyzer()
        self.processed_posts = deque(maxlen=50000)

    def process_social_feed(self, raw_posts: List[Dict]) -> Dict[str, Any]:
        """Process raw social media posts and return comprehensive analysis"""

        try:
            # Convert raw posts to SocialPost objects
            social_posts = []
            for raw_post in raw_posts:
                post = self.create_social_post(raw_post)
                if post:
                    social_posts.append(post)
                    self.processed_posts.append(post)

            # Perform analysis
            analysis = {
                "timestamp": datetime.now().isoformat(),
                "posts_analyzed": len(social_posts),
                "sentiment_analysis": self.analyze_overall_sentiment(social_posts),
                "viral_trends": [
                    trend.to_dict()
                    for trend in self.trend_detector.detect_trends(social_posts)
                ],
                "top_influencers": self.analyze_top_influencers(social_posts),
                "platform_breakdown": self.analyze_platform_breakdown(social_posts),
                "topic_insights": self.extract_topic_insights(social_posts),
            }

            return analysis

        except Exception as e:
            logger.error(f"Error processing social feed: {e}")
            return {
                "timestamp": datetime.now().isoformat(),
                "error": str(e),
                "posts_analyzed": 0,
            }

    def create_social_post(self, raw_post: Dict) -> Optional[SocialPost]:
        """Convert raw post data to SocialPost object"""

        try:
            content = raw_post.get("content", "")

            # Analyze sentiment
            sentiment_score, confidence = self.sentiment_analyzer.analyze_sentiment(
                content
            )

            # Extract hashtags and mentions
            hashtags = re.findall(r"#(\w+)", content)
            mentions = re.findall(r"@(\w+)", content)

            # Extract topics (simplified - would use NLP in production)
            topics = self.extract_basic_topics(content)

            post = SocialPost(
                id=raw_post.get("id", ""),
                platform=raw_post.get("platform", "unknown"),
                author=raw_post.get("author", "anonymous"),
                content=content,
                timestamp=datetime.fromisoformat(
                    raw_post.get("timestamp", datetime.now().isoformat())
                ),
                engagement=raw_post.get("engagement", {}),
                reach=raw_post.get("reach", 0),
                sentiment_score=sentiment_score,
                confidence=confidence,
                topics=topics,
                mentions=mentions,
                hashtags=hashtags,
            )

            return post

        except Exception as e:
            logger.error(f"Error creating social post: {e}")
            return None

    def extract_basic_topics(self, content: str) -> List[str]:
        """Extract basic topics from content"""

        # Simple keyword-based topic extraction
        sports_topics = {
            "nfl": ["nfl", "football", "quarterback", "touchdown"],
            "nba": ["nba", "basketball", "dunk", "three-pointer"],
            "mlb": ["mlb", "baseball", "homerun", "pitcher"],
            "nhl": ["nhl", "hockey", "goal", "puck"],
            "betting": ["bet", "odds", "wager", "gambling", "sportsbook"],
            "fantasy": ["fantasy", "dfs", "lineup", "draft"],
        }

        content_lower = content.lower()
        detected_topics = []

        for topic, keywords in sports_topics.items():
            if any(keyword in content_lower for keyword in keywords):
                detected_topics.append(topic)

        return detected_topics

    def analyze_overall_sentiment(self, posts: List[SocialPost]) -> Dict[str, Any]:
        """Analyze overall sentiment across all posts"""

        if not posts:
            return {"overall_score": 0, "distribution": {}, "confidence": 0}

        sentiments = [
            post.sentiment_score for post in posts if post.sentiment_score is not None
        ]
        confidences = [post.confidence for post in posts if post.confidence is not None]

        overall_score = np.mean(sentiments) if sentiments else 0
        overall_confidence = np.mean(confidences) if confidences else 0

        # Calculate distribution
        distribution = {
            "very_positive": len([s for s in sentiments if s > 0.6]),
            "positive": len([s for s in sentiments if 0.2 < s <= 0.6]),
            "neutral": len([s for s in sentiments if -0.2 <= s <= 0.2]),
            "negative": len([s for s in sentiments if -0.6 <= s < -0.2]),
            "very_negative": len([s for s in sentiments if s < -0.6]),
        }

        return {
            "overall_score": overall_score,
            "overall_confidence": overall_confidence,
            "distribution": distribution,
            "total_posts": len(posts),
        }

    def analyze_top_influencers(self, posts: List[SocialPost]) -> List[Dict]:
        """Analyze top influencers from posts"""

        # Get unique authors
        authors = list(set(post.author for post in posts))

        influencer_profiles = []
        for author in authors[:20]:  # Analyze top 20 authors
            profile = self.influencer_analyzer.analyze_influencer(posts, author)
            if profile:
                influencer_profiles.append(profile.to_dict())

        # Sort by influence score
        def influence_score(profile):
            return (
                profile["followers"]
                * profile["engagement_rate"]
                * profile["sports_relevance"]
                * profile["credibility_score"]
            )

        influencer_profiles.sort(key=influence_score, reverse=True)

        return influencer_profiles[:10]  # Return top 10

    def analyze_platform_breakdown(self, posts: List[SocialPost]) -> Dict[str, Any]:
        """Analyze breakdown by platform"""

        platform_stats = defaultdict(
            lambda: {
                "post_count": 0,
                "total_engagement": 0,
                "avg_sentiment": 0,
                "sentiment_scores": [],
            }
        )

        for post in posts:
            stats = platform_stats[post.platform]
            stats["post_count"] += 1
            stats["total_engagement"] += sum(post.engagement.values())
            if post.sentiment_score is not None:
                stats["sentiment_scores"].append(post.sentiment_score)

        # Calculate averages
        for platform, stats in platform_stats.items():
            if stats["sentiment_scores"]:
                stats["avg_sentiment"] = np.mean(stats["sentiment_scores"])
            stats["avg_engagement"] = (
                stats["total_engagement"] / stats["post_count"]
                if stats["post_count"] > 0
                else 0
            )
            del stats["sentiment_scores"]  # Remove raw scores

        return dict(platform_stats)

    def extract_topic_insights(self, posts: List[SocialPost]) -> Dict[str, Any]:
        """Extract insights about topics being discussed"""

        topic_stats = defaultdict(
            lambda: {
                "mention_count": 0,
                "sentiment_scores": [],
                "platforms": set(),
                "influencers": set(),
            }
        )

        for post in posts:
            for topic in post.topics:
                stats = topic_stats[topic]
                stats["mention_count"] += 1
                if post.sentiment_score is not None:
                    stats["sentiment_scores"].append(post.sentiment_score)
                stats["platforms"].add(post.platform)
                stats["influencers"].add(post.author)

        # Calculate insights
        topic_insights = {}
        for topic, stats in topic_stats.items():
            insights = {
                "mention_count": stats["mention_count"],
                "avg_sentiment": (
                    np.mean(stats["sentiment_scores"])
                    if stats["sentiment_scores"]
                    else 0
                ),
                "platforms": list(stats["platforms"]),
                "unique_influencers": len(stats["influencers"]),
                "momentum": stats["mention_count"] / len(posts) if posts else 0,
            }
            topic_insights[topic] = insights

        # Sort by mention count
        sorted_topics = sorted(
            topic_insights.items(), key=lambda x: x[1]["mention_count"], reverse=True
        )

        return dict(sorted_topics[:10])  # Return top 10 topics


# Factory function
def create_social_intelligence_engine():
    """Create and return a configured social intelligence orchestrator"""
    return SocialIntelligenceOrchestrator()


if __name__ == "__main__":
    # Test the social intelligence engine
    engine = create_social_intelligence_engine()

    # Sample social media posts
    sample_posts = [
        {
            "id": "1",
            "platform": "twitter",
            "author": "sports_fan_123",
            "content": "Chiefs are absolutely dominating this game! Mahomes is the GOAT! #ChiefsKingdom #NFL",
            "timestamp": datetime.now().isoformat(),
            "engagement": {"likes": 45, "retweets": 12, "comments": 8},
            "reach": 1200,
        },
        {
            "id": "2",
            "platform": "reddit",
            "author": "betting_expert",
            "content": "This spread is way off. Easy money on the under. Vegas clearly overreacting to last week.",
            "timestamp": datetime.now().isoformat(),
            "engagement": {"upvotes": 23, "comments": 15},
            "reach": 890,
        },
    ]

    # Test social intelligence analysis
    analysis = engine.process_social_feed(sample_posts)

    print("Social Intelligence Analysis:")
    print(json.dumps(analysis, indent=2, default=str))
