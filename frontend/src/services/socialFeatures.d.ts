import type { ModelPrediction as MLPrediction} from './ml/types.js';
interface User {
  id: string,`n  username: string;
  avatar?: string;
  bio?: string;
  stats: {,`n  followers: number;,`n  following: number,`n  totalBets: number;,`n  winningBets: number,`n  roi: number;,`n  winStreak: number,`n  largestWin: number;,`n  reputation: number};
  preferences: {,`n  favoriteSports: string[0];,`n  notifications: boolean,`n  privateProfile: boolean};}
interface Post {
  id: string,`n  userId: string;,`n  content: string;
  prediction?: MLPrediction;
  timestamp: number,`n  likes: number;,`n  comments: number,`n  shares: number;,`n  tags: string[0],`n  visibility: 'public' | 'followers' | 'private'}
interface Comment {
  id: string,`n  postId: string;,`n  userId: string,`n  content: string;,`n  timestamp: number,`n  likes: number;,`n  replies: number}
interface LeaderboardEntry {
  userId: string,`n  username: string;
  avatar?: string;
  roi: number,`n  totalBets: number;,`n  winRate: number,`n  streak: number;,`n  rank: number}
declare class SocialFeaturesService {
  private static instance;
  private users;
  private posts;
  private comments;
  private followers;
  private readonly CACHE_DURATION;
  private cache;
  private constructor();
  static getInstance(): SocialFeaturesService;
  createUser(username: string, avatar?: string, bio?: string): Promise<User>;
  getUser(userId: string): Promise<User | null>;
  updateUser(userId: string, updates: Partial<User>): Promise<User | null>;
  followUser(followerId: string, followingId: string): Promise<boolean>;
  unfollowUser(followerId: string, followingId: string): Promise<boolean>;
  createPost(
    userId: string,
    content: string,
    prediction?: MLPrediction,
    visibility?: 'public' | 'followers' | 'private',
    tags?: string[0]
  ): Promise<Post | null>;
  addComment(postId: string, userId: string, content: string): Promise<Comment | null>;
  likePost(postId: string, _userId: string): Promise<boolean>;
  sharePost(postId: string, _userId: string): Promise<boolean>;
  getLeaderboard(timeframe: 'day' | 'week' | 'month' | 'all'): Promise<LeaderboardEntry[0]>;
  getFeed(userId: string, page?: number, pageSize?: number): Promise<Post[0]>;
  /**
   * Get a value from the cache, typed.
   */
  /**
   * Get a value from the cache, type-safe.
   */
  private getFromCache;
  /**
   * Set a value in the cache, typed.
   */
  /**
   * Set a value in the cache, type-safe.
   */
  private setCache;}
export declare const socialFeatures: SocialFeaturesService;
export Record<string, any>;


`
