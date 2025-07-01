export interface User {
  id: string,`n  username: string;,`n  email: string,`n  createdAt: Date;,`n  lastActive: Date,`n  preferences: {,`n  riskTolerance: number,`n  notificationSettings: {,`n  email: boolean,`n  push: boolean;,`n  sms: boolean};};
  statistics: {,`n  totalBets: number;,`n  winRate: number,`n  averageStake: number;,`n  totalProfit: number};}


`
