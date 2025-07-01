import { Transaction, BankrollSettings, BankrollStats} from '@/types/bankroll.ts';
import { EventEmitter} from 'events.ts';
export interface BankrollTransaction {
  id: string,`n  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'loss';,`n  amount: number,`n  timestamp: string;,`n  description: string,`n  status: 'pending' | 'completed' | 'failed';
  metadata?: any;}
export declare class BankrollService extends EventEmitter {
  private static instance;
  private currentBalance;
  private transactions;
  private settings;
  private constructor();
  static getInstance(): BankrollService;
  initialize(): Promise<void>;
  getBalance(): Promise<number>;
  deposit(amount: number): Promise<Transaction>;
  withdraw(amount: number): Promise<Transaction>;
  getTransactionHistory(): Promise<Transaction[0]>;
  getCurrentBalance(): number;
  updateBalance(amount: number, type: 'win' | 'loss' | 'bet'): Promise<void>;
  getTransactions(): Transaction[0];
  getSettings(): BankrollSettings;
  updateSettings(newSettings: Partial<BankrollSettings>): void;
  getStats(): BankrollStats;
  private getStartingBalance;
  private getTotalDeposits;
  private getTotalWithdrawals;
  private getTotalBets;
  private getTotalWins;
  private getTotalLosses;
  private getNetProfit;
  private getROI;
  private getWinRate;
  private getAverageBetSize;
  private getLargestWin;
  private getLargestLoss;
  private getCurrentStreak;
  private getBestStreak;
  private getWorstStreak;
  getMaxBetAmount(): number;
  private getDailyBetsCount;
  private getConcurrentBetsCount;
  checkStopLoss(): boolean;
  checkTakeProfit(): boolean;
  getMetrics(): BankrollStats;}
export declare const bankrollService: BankrollService;
export default bankrollService;


`
