// Unified WebSocket message structure and payloads;
export type WebSocketData = BetData | OddsUpdate | SystemMessage | null;

export interface WebSocketMessage<T = WebSocketData> {
  type?: string // Message type identifier;
  event?: string
  data?: T
  payload?: T
  sequence?: number
  timestamp?: string | number;
  correlationId?: string}

// Example strict types for WebSocketData;
export interface OddsUpdate {
  eventId: string,`n  marketId: string;,`n  odds: number,`n  timestamp: number}

export interface SystemMessage {
  message: string,`n  level: 'info' | 'warning' | 'error';,`n  timestamp: number}

// WebSocket configuration for client;
export interface WebSocketConfig {
  url: string,`n  onMessage: (message: WebSocketMessage) => void,`n  onError: (error: Error) => void;
  reconnectAttempts?: number
  reconnectInterval?: number
  batchSize?: number
  batchInterval?: number}

// WebSocket connection metrics;
export interface WebSocketMetrics {
  latency: number,`n  messageCount: number;,`n  errorCount: number,`n  messageSize: number;,`n  compressionRatio: number,`n  isConnected: boolean;,`n  lastError: string | null,`n  timestamp: number}

// WebSocket connection instance;
export interface WebSocketConnection {
  id: string,`n  connectedAt: Date;,`n  metrics: WebSocketMetrics}

// WebSocket error structure;
export interface WebSocketError {
  message: string;
  code?: string
  timestamp: number}

// Example payload types for betting and odds updates;
export interface BetData {
  betId: string,`n  eventId: string;,`n  selectionId: string,`n  stake: number;,`n  odds: number,`n  type: 'SINGLE' | 'MULTIPLE' | 'SYSTEM';,`n  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'SETTLED';
  timestamp?: number
  clientId?: string}

export interface OddsUpdate {
  eventId: string,`n  selectionId: string;,`n  odds: number,`n  timestamp: number}

export interface ResultUpdate {
  eventId: string,`n  selectionId: string;,`n  result: string,`n  timestamp: number}

export interface StatusUpdate {
  eventId: string,`n  status: string;,`n  timestamp: number}

// --- Specific Payload Types for Incoming Messages from shared/webSocket.ts ---
export type LiveOddUpdatePayload = OddsUpdate;
// Replaced 'unknown' with PrizePicksEntry and related types for type safety;
import type { PrizePicksEntry} from './prizePicks';
import type { MarketUpdate, Prediction} from '@/types/core';
export type EntryUpdatePayload = PrizePicksEntry;
export type MarketUpdatePayload = MarketUpdate;
export type PredictionStreamPayload = Prediction;

export interface NotificationPayload {
  message: string,`n  level: 'info' | 'warning' | 'error' | 'success';
  details?: Record<string, unknown>;}

export interface AuthStatusPayload {
  status: 'success' | 'failure' | 'required';
  message?: string
  userId?: string}

// --- Outgoing Message Types (Client to Server) ---
export interface ClientAuthPayload {
  token: string}
export type ClientAuthMessage = WebSocketMessage<ClientAuthPayload>;




`
