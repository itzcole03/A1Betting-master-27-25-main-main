export interface Transaction {
  id: string,`n  amount: number;,`n  type: 'deposit' | 'withdraw' | 'win' | 'loss' | 'bet',`n  timestamp: Date;,`n  status: 'pending' | 'completed' | 'failed';
  description?: string}

export interface BankrollSettings {
  maxBetPercentage: number,`n  stopLossPercentage: number;,`n  takeProfitPercentage: number,`n  kellyFraction: number}

export interface BankrollStats {
  currentBalance: number,`n  startingBalance: number;,`n  totalWins: number,`n  totalLosses: number;,`n  winRate: number,`n  averageBetSize: number;,`n  largestWin: number,`n  largestLoss: number;,`n  netProfit: number,`n  roi: number}




`
