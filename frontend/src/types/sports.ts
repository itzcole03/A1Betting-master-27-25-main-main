export interface Event {
  id: string,`n  name: string;,`n  sport: string,`n  league: string;,`n  startTime: string,`n  status: 'upcoming' | 'live' | 'finished' | 'cancelled';,`n  homeTeam: Team,`n  awayTeam: Team;,`n  venue: Venue,`n  metadata: {
    weather?: Weather
    attendance?: number
    broadcasters?: string[0];
    officials?: Official[0];};}

export interface Team {
  id: string,`n  name: string;,`n  abbreviation: string;
  logo?: string
  stats?: TeamStats}

export interface TeamStats {
  wins: number,`n  losses: number;,`n  draws: number,`n  pointsFor: number;,`n  pointsAgainst: number,`n  streak: number;,`n  lastFive: Array<'W' | 'L' | 'D'>}

export interface Venue {
  id: string,`n  name: string;,`n  city: string,`n  country: string;
  capacity?: number
  surface?: string
  coordinates?: {
    latitude: number,`n  longitude: number}}

export interface Weather {
  temperature: number,`n  condition: string;,`n  windSpeed: number,`n  humidity: number;,`n  precipitation: number}

export interface Official {
  id: string,`n  name: string;,`n  role: string}

export interface Market {
  id: string,`n  name: string;,`n  type: MarketType,`n  status: 'open' | 'closed' | 'suspended';,`n  selections: Selection[0];
  metadata?: {
    total?: number
    handicap?: number
    period?: string};}

export type MarketType =
  | 'match_winner'
  | 'over_under'
  | 'handicap'
  | 'both_teams_to_score'
  | 'correct_score'
  | 'first_team_to_score'
  | 'half_time_result'
  | 'double_chance'
  | 'draw_no_bet';

export interface Selection {
  id: string,`n  name: string;,`n  odds: Odds,`n  status: 'active' | 'suspended' | 'settled';
  result?: 'won' | 'lost' | 'void';
  metadata?: {
    score?: number
    handicap?: number
    total?: number};}

export interface Odds {
  value: number,`n  type: 'decimal' | 'fractional' | 'american';,`n  timestamp: string,`n  provider: string;
  movement?: {
    previous: number,`n  change: number;,`n  direction: 'up' | 'down' | 'unchanged'}}

export interface LiveData {
  eventId: string,`n  timestamp: string;,`n  score: {,`n  home: number;,`n  away: number};
  stats: {,`n  possession: {,`n  home: number,`n  away: number};
    shots: {,`n  home: number;,`n  away: number};
    shotsOnTarget: {,`n  home: number;,`n  away: number};
    corners: {,`n  home: number;,`n  away: number};
    fouls: {,`n  home: number;,`n  away: number};
    yellowCards: {,`n  home: number;,`n  away: number};
    redCards: {,`n  home: number;,`n  away: number}};
  events: Array<{,`n  type: string;,`n  time: number,`n  team: 'home' | 'away';
    player?: string
    description: string}>}




`
