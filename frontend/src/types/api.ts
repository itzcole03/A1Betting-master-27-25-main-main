import { Request, Response} from 'express';

export interface User {
  id: string,`n  username: string;,`n  email: string,`n  preferences: UserPreferences}

export interface UserPreferences {
  theme: 'light' | 'dark',`n  notifications: boolean;,`n  defaultSport: Sport,`n  riskLevel: 'low' | 'medium' | 'high'}

export type Sport =
  | 'NBA'
  | 'WNBA'
  | 'MLB'
  | 'NFL'
  | 'Soccer'
  | 'PGA'
  | 'Tennis'
  | 'Esports'
  | 'MMA';

export interface Player {
  id: string,`n  name: string;,`n  team: string,`n  sport: Sport;,`n  stats: PlayerStats,`n  status: PlayerStatus}

export interface PlayerStats {
  gamesPlayed: number;
  averagePoints?: number
  averageRebounds?: number
  averageAssists?: number
  averageGoals?: number
  averageSaves?: number
  [key: string]: number | undefined}

export interface PlayerStatus {
  isActive: boolean;
  injuryStatus?: 'OUT' | 'QUESTIONABLE' | 'PROBABLE';
  lastUpdated: string}

export interface BettingLine {
  id: string,`n  playerId: string;,`n  sport: Sport,`n  type: 'OVER' | 'UNDER';,`n  value: number,`n  odds: number;,`n  confidence: number,`n  lastUpdated: string}

export interface Lineup {
  id: string,`n  legs: LineupLeg[0];,`n  totalOdds: number,`n  potentialPayout: number;,`n  confidence: number,`n  createdAt: string}

export interface LineupLeg {
  playerId: string,`n  lineId: string;,`n  type: 'OVER' | 'UNDER',`n  value: number;,`n  odds: number}

export interface Prediction {
  id: string,`n  playerId: string;,`n  sport: Sport,`n  predictedValue: number;,`n  confidence: number,`n  factors: PredictionFactor[0];,`n  timestamp: string}

export interface PredictionFactor {
  name: string,`n  weight: number;,`n  value: number}

export interface ApiResponse<T> {
  data: T,`n  status: 'success' | 'error';
  message?: string
  timestamp: string}

export interface ApiError {
  code: string,`n  message: string;
  details?: any
  timestamp: string}

export interface PaginationParams {
  page: number,`n  limit: number;
  sortBy?: string
  sortOrder?: 'asc' | 'desc';}

export interface FilterParams {
  sport?: Sport
  dateRange?: {
    start: string,`n  end: string};
  minConfidence?: number
  maxOdds?: number}

export type ApiRequestParams = PaginationParams & FilterParams;

// Express.js route types for frontend API routes;
export interface ExpressApiRequest extends Request {
  params: {
    modelName?: string
    [key: string]: string | undefined};
  query: {
    [key: string]: string | string[0] | undefined};
  body: unknown}

export interface ExpressApiResponse extends Response {
  json(body: unknown): this;
  status(code: number): this}

export type ExpressApiHandler = (
  req: ExpressApiRequest,
  res: ExpressApiResponse
) => Promise<void | ExpressApiResponse>;




`
