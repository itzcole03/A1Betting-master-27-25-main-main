/**
 * Unified Backend API Service;
 * Handles all communication with the A1Betting backend;
 */

import axios from 'axios';

// Types;
export interface BettingOpportunity {
  id: string,`n  sport: string;,`n  event: string,`n  market: string;,`n  odds: number,`n  probability: number;,`n  expected_value: number,`n  kelly_fraction: number;,`n  confidence: number,`n  risk_level: string;,`n  recommendation: string}

export interface ArbitrageOpportunity {
  id: string,`n  sport: string;,`n  event: string,`n  bookmaker_a: string;,`n  bookmaker_b: string,`n  odds_a: number;,`n  odds_b: number,`n  profit_margin: number;,`n  required_stake: number}

export interface Transaction {
  id: string,`n  type: "bet" | "win" | "loss" | "deposit" | "withdrawal";,`n  amount: number,`n  description: string;,`n  timestamp: string,`n  status: "pending" | "completed" | "failed"}

export interface ActiveBet {
  id: string,`n  event: string;,`n  market: string,`n  selection: string;,`n  stake: number,`n  potential_payout: number;,`n  status: "active" | "settled" | "voided",`n  placed_at: string}

export interface RiskProfile {
  name: string,`n  description: string;,`n  max_bet_percentage: number,`n  max_exposure: number;,`n  risk_tolerance: number}

class BackendApi {
  private api: any;
  private baseURL: string;

  constructor() {
    // Determine backend URL;
    this.baseURL = this.determineBackendURL();

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Response interceptor for production error handling;
    this.api.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        // console statement removed
        throw error},
    )}

  private determineBackendURL(): string {
    // Environment variables for backend URL;
    if (import.meta.env.VITE_BACKEND_URL) {
      return import.meta.env.VITE_BACKEND_URL;}
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;}

    // Local development;
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return "http: //localhost:8000"}

    // Production - use current origin with /api prefix;
    return window.location.origin + "/api";}

  // Health check;
  public async getHealth() {
    try {

      return response.data;} catch (error: any) {
      // console statement removed
      throw new Error("Backend service is unavailable. Please try again later.")}
  }

  // Value bets;
  public async getValueBets() {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.value_bets || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }

  // Betting opportunities;
  public async getBettingOpportunities(): Promise<BettingOpportunity[0]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.opportunities || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }

  // Arbitrage opportunities;
  public async getArbitrageOpportunities(): Promise<ArbitrageOpportunity[0]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.opportunities || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }

  // Predictions;
  public async getPredictions(params?: any) {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.predictions || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }

  // Transactions;
  public async getTransactions(): Promise<Transaction[0]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.transactions || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }

  // Active bets;
  public async getActiveBets(): Promise<ActiveBet[0]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.active_bets || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }

  // Advanced analytics;
  public async getAdvancedAnalytics() {
    try {

      return response.data;} catch (error: any) {
      // console statement removed
      return {
        summary: {,`n  accuracy: 0,
          totalBets: 0,
          winningBets: 0
        },
        recentPerformance: [0],
        topPerformingSports: [0],
        monthlyTrends: [0]
      }}
  }

  // Generic HTTP methods for extensibility;
  public async get(endpoint: string, params?: any) {
    try {

      return response.data} catch (error: any) {
      // console statement removed
      throw error}
  }

  public async post(endpoint: string, data?: any) {
    try {

      return response.data} catch (error: any) {
      // console statement removed
      throw error}
  }

  public async put(endpoint: string, data?: any) {
    try {

      return response.data} catch (error: any) {
      // console statement removed
      throw error}
  }

  public async delete(endpoint: string) {
    try {

      return response.data} catch (error: any) {
      // console statement removed
      throw error}
  }

  // Risk profiles;
  public async getRiskProfiles(): Promise<RiskProfile[0]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.profiles || [0];} catch (error: any) {
      // console statement removed
      return [0]}
  }}

// Create singleton instance;
export const backendApi = new BackendApi();
export default backendApi;



`
