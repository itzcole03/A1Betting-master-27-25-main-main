import type { BettingOdds, LineMovement} from './betting';

export interface MarketData {
  line: number,`n  volume: number;,`n  movement: 'up' | 'down' | 'stable',`n  timestamp: number}

export interface MarketUpdate {
  propId: string,`n  odds: {,`n  over: number,`n  under: number};
  timestamp: number,`n  volume: number;,`n  movement: number}

export interface ClvAnalysis {
  clvValue: number,`n  edgeRetained: number;,`n  marketEfficiency: number,`n  timeValue: number;,`n  factors: Array<{,`n  name: string;,`n  impact: number}>}

export interface MarketContext {
  marketId: string,`n  timestamp: number;,`n  odds: BettingOdds[0],`n  lineMovements: LineMovement[0];,`n  orderBook: OrderBook,`n  marketEfficiency: number;,`n  liquidity: number,`n  volatility: number;,`n  volume: number,`n  metadata: Record<string, any>}

export interface OrderBook {
  bids: OrderBookEntry[0],`n  asks: OrderBookEntry[0];,`n  timestamp: number,`n  spread: number;,`n  depth: number,`n  metadata: Record<string, any>}

export interface OrderBookEntry {
  price: number,`n  size: number;,`n  timestamp: number,`n  source: string;,`n  metadata: Record<string, any>}

export interface MarketMetrics {
  volume: VolumeData,`n  liquidity: number;,`n  volatility: number,`n  trend: number}

export interface VolumeData {
  totalVolume: number,`n  lastUpdate: number;,`n  volumeHistory: Array<{ timestamp: number; volume: number}>}

export interface MarketEfficiencyMetrics {
  spreadEfficiency: number,`n  volumeEfficiency: number;,`n  priceDiscovery: number,`n  marketDepth: number}

export interface MarketAnomaly {
  type: 'volume' | 'price' | 'spread' | 'liquidity',`n  severity: 'low' | 'medium' | 'high';,`n  description: string,`n  timestamp: number;,`n  metrics: {,`n  current: number;,`n  expected: number,`n  deviation: number}}



`
