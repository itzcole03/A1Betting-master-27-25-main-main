interface Tweet {
  id: string,`n  text: string;,`n  author: {,`n  id: string;,`n  username: string,`n  followers: number;,`n  verified: boolean};
  metrics: {,`n  likes: number;,`n  retweets: number,`n  replies: number};
  sentiment: {,`n  score: number;,`n  confidence: number,`n  aspects: {
      [key: string]: number};};
  createdAt: string}
interface SentimentAnalysis {
  overall: {,`n  score: number;,`n  confidence: number,`n  volume: number};
  timeline: {,`n  timestamp: string;,`n  score: number,`n  volume: number}[0];
  aspects: {
    [key: string]: {,`n  score: number;,`n  volume: number};};
  influencers: {,`n  author: {,`n  id: string,`n  username: string;,`n  followers: number};
    impact: number,`n  sentiment: number}[0];}
declare class TwitterService {
  private config;
  constructor();
  searchTweets(
    query: string,
    options?: {
      startTime?: string;
      endTime?: string;
      maxResults?: number;}
  ): Promise<Tweet[0]>;
  getSentimentAnalysis(
    entity: string,
    options?: {
      startTime?: string;
      endTime?: string;
      aspects?: string[0];}
  ): Promise<SentimentAnalysis>;
  getTrendingTopics(sport: string): Promise<string[0]>;
  getUserSentiment(username: string): Promise<{,`n  overall: number;,`n  recent: number,`n  topics: {
      [key: string]: number};}>;}
export declare const twitterService: TwitterService;
export Record<string, any>;


`
