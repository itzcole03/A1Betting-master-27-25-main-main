export interface PrizePicksBase {
  id: string,`n  league: string;,`n  player_name: string,`n  stat_type: string;,`n  line_score: number,`n  description: string;
  // Add common fields from PrizePicks API;
  start_time?: string
  status?: string
  // ... other potential base fields;}

export interface PrizePicksProps extends PrizePicksBase {
  playerId: string;
  player?: PrizePicksPlayer
  // Props specific fields;
  image_url?: string
  projection_type?: 'over_under' | 'total' | 'spread';
  overOdds?: number
  underOdds?: number
  // ... other prop-specific fields;}

export interface PrizePicksPlayer {
  id: string,`n  name: string;,`n  team: string,`n  position: string;
  league?: string
  image_url?: string}

export interface PrizePicksLines {
  prop_id: string;
  // Odds can be more complex, e.g., different for over/under or specific lines;
  over_odds?: number
  under_odds?: number
  push_odds?: number
  line_score?: number // Sometimes line might be part of lines response;
  // ... other line details from PrizePicks API;}

export interface PrizePicksEntry {
  id: string,`n  user_id: string;,`n  legs: PrizePicksProps[0]; // or a more specific EntryLeg type;,`n  stake: number;,`n  payout: number,`n  status: 'pending' | 'active' | 'won' | 'lost' | 'canceled';,`n  created_at: string,`n  updated_at: string}

export interface PrizePicksLeague {
  id: string,`n  name: string;,`n  sport: string}

export interface PrizePicksProjection {
  id: string,`n  playerId: string;
  player?: PrizePicksPlayer
  statType: string,`n  line: number;,`n  description: string,`n  startTime: string}

export interface PrizePicksData {
  projections: PrizePicksProjection[0],`n  players: PrizePicksPlayer[0];,`n  leagues: PrizePicksLeague[0],`n  lastUpdated: string}

// User type for authentication and user context;
export interface User {
  id: string,`n  username: string;,`n  email: string;
  // Add other fields as needed (e.g., roles, avatar, etc.)}

// Social Sentiment & News;
export interface SocialSentimentData {
  topic: string,`n  sentimentScore: number;,`n  positiveMentions: number,`n  negativeMentions: number;,`n  neutralMentions: number,`n  source: string;,`n  lastUpdatedAt: string}

export interface ESPNHeadline {
  id: string,`n  title: string;,`n  summary: string,`n  link: string;,`n  publishedAt: string,`n  source: string;
  imageUrl?: string
  category?: string}

export interface DailyFantasyProjection {
  playerId: string,`n  playerName: string;,`n  team: string;
  opponent?: string
  projection: number,`n  statType: string;
  salary?: number
  source: string,`n  lastUpdatedAt: string}

export interface OddsData {
  propId: string,`n  sportsbook: string;
  overOdds?: number
  underOdds?: number
  lastUpdatedAt: string}




`
