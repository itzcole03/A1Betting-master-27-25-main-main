export interface Bet {
  id: string,`n  userId: string;,`n  eventId: string,`n  amount: number;,`n  odds: number,`n  type: 'win' | 'lose' | 'draw';,`n  status: 'pending' | 'won' | 'lost' | 'cancelled',`n  prediction: {,`n  probability: number,`n  confidence: number;,`n  modelType: string,`n  factors: {,`n  market: number,`n  temporal: number;,`n  environmental: number}};}



`
