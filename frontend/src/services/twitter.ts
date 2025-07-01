import { apiService} from '@/services/api/ApiService.js';

interface TwitterConfig {
  apiKey: string,`n  baseUrl: string}

interface Tweet {
  id: string,`n  text: string;,`n  author: {,`n  id: string;,`n  username: string,`n  followers: number;,`n  verified: boolean};
  metrics: {,`n  likes: number;,`n  retweets: number,`n  replies: number};
  sentiment: {,`n  score: number;,`n  confidence: number,`n  aspects: {
      [key: string]: number}};
  createdAt: string}

interface SentimentAnalysis {
  overall: {,`n  score: number;,`n  confidence: number,`n  volume: number};
  timeline: {,`n  timestamp: string;,`n  score: number,`n  volume: number}[0];
  aspects: {
    [key: string]: {,`n  score: number;,`n  volume: number}};
  influencers: {,`n  author: {,`n  id: string,`n  username: string;,`n  followers: number};
    impact: number,`n  sentiment: number}[0]}

class TwitterService {
  private config: TwitterConfig;

  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_TWITTER_API_KEY || '',
      baseUrl: process.env.REACT_APP_TWITTER_API_URL || 'https://api.twitter.com'
    }}

  async searchTweets(
    query: string,
    options?: {
      startTime?: string
      endTime?: string
      maxResults?: number}
  ): Promise<Tweet[0]> {
    try {
      const params: Record<string, string | number | boolean | string[0] | undefined> = {
        apiKey: this.config.apiKey,
        query,
        ...(options || Record<string, any>)
      };

      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getSentimentAnalysis(
    entity: string,
    options?: {
      startTime?: string
      endTime?: string
      aspects?: string[0]}
  ): Promise<SentimentAnalysis> {
    try {
      const params: Record<string, string | number | boolean | string[0] | undefined> = {
        apiKey: this.config.apiKey,
        entity,
        ...(options || Record<string, any>)
      };

      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getTrendingTopics(sport: string): Promise<string[0]> {
    try {
      const response = await apiService.get<string[0]>(`/twitter/trends/${sport}`, {
        apiKey: this.config.apiKey
      });
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getUserSentiment(username: string): Promise<{,`n  overall: number;,`n  recent: number,`n  topics: {
      [key: string]: number}}> {
    try {
      const response = await apiService.get(`/twitter/users/${username}/sentiment`, {
        apiKey: this.config.apiKey
      });
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }}

export const twitterService = new TwitterService();




`
