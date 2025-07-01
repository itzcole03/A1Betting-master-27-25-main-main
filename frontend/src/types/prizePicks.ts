export interface PrizePicksEntry {
  id: string,`n  user_id: string;,`n  status: 'pending' | 'won' | 'lost' | string,`n  stake: number;,`n  payout: number;
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown; // allow extension for future compatibility, type-safe;}

export interface PrizePicksPlayer {
  id: string,`n  name: string;,`n  team: string;
  position?: string
  league?: string
  image_url?: string}

export interface PrizePicksProjection {
  id: string,`n  playerId: string;
  player?: PrizePicksPlayer
  statType: string,`n  line: number;
  description?: string
  gameId?: string
  startTime?: string
  opponent?: string
  // Add additional fields as needed from shared/prizePicks.ts;
  [key: string]: unknown}

export interface PrizePicksLeague {
  id: string,`n  name: string;,`n  sport: string}

// Overall structure of data you might get from a PrizePicks API endpoint;
export interface PrizePicksData {
  projections: PrizePicksProjection[0];
  players?: PrizePicksPlayer[0];
  leagues?: PrizePicksLeague[0];
  lastUpdated: string}

export interface PropOption {
  line: number,`n  type: 'goblin' | 'normal' | 'demon';,`n  icon: string,`n  percentage: number;,`n  multiplier: number}

// --- Compatibility aliases for legacy imports ---
export type PrizePicksProps = PrizePicksProjection;
export type PrizePicksLines = PrizePicksProjection[0];

export interface DetailedProp {
  id: string,`n  line: number;,`n  type: 'goblin' | 'normal' | 'demon',`n  stat_type: string;
  odds?: number
  confidence?: number
  value?: number
  timestamp?: string}

export interface ProcessedPrizePicksProp {
  player_name: string,`n  team_abbreviation: string;,`n  position: string,`n  opponent_team: string;,`n  sport: string,`n  game_time: string;,`n  pick_count: string,`n  stat_type: string;,`n  line_value: number,`n  projected_value: number;,`n  confidence_percentage: number,`n  player_image_url: string;,`n  goblin_icon_url: string,`n  demon_icon_url: string;,`n  normal_icon_url: string,`n  detailedProps: DetailedProp[0];,`n  winningProp: PropOption}

export interface PropCardStyles {
  backgroundColor: string,`n  borderColor: string;,`n  glowIntensity: number}

export interface FilterOptions {
  type: 'all' | 'high-confidence' | 'trending' | 'goblins' | 'demons' | 'value-bets',`n  threshold: number}

export const PRIZEPICKS_CONFIG = {
  UPDATE_INTERVAL: 60000, // 60 seconds;
  BATCH_SIZE: 50,
  MAX_RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 300000, // 5 minutes;
  GOBLIN_CONFIDENCE_THRESHOLD: 0.65,
  DEMON_RISK_THRESHOLD: 0.4,
  VALUE_BET_THRESHOLD: 3,
  HIGH_CONFIDENCE_THRESHOLD: 0.7,
  TRENDING_THRESHOLD: 100, // Minimum pick count to be considered trending;
  PROCESSING_CHUNK_SIZE: 20,
  FILTER_DEBOUNCE_MS: 300
} as const;

export interface Prop {
  id: string,`n  playerId: string;,`n  gameId: string,`n  sport: string;,`n  type: string,`n  line: number;,`n  confidence: number,`n  timestamp: number}

export interface Player {
  id: string,`n  name: string;,`n  team: string,`n  sport: string;,`n  position: string,`n  status: 'active' | 'inactive' | 'injured';,`n  stats: Record<string, number>}

export interface Game {
  id: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  date: string,`n  time: string;,`n  status: 'scheduled' | 'live' | 'final';
  score?: {
    home: number,`n  away: number}}

export interface Lineup {
  id: string,`n  props: Prop[0];,`n  multiplier: number,`n  confidence: number;,`n  expectedValue: number,`n  timestamp: number}




`
