// Types for social sentiment data;
export interface SocialSentimentData {
  id: string,`n  topic: string;,`n  score: number,`n  positiveMentions: number;,`n  negativeMentions: number,`n  neutralMentions: number;,`n  lastUpdated: string;
  source?: string
  details?: Record<string, unknown>;}



`
