/**
 * Production Data Fetching Hook
 *
 * This hook provides a unified interface for fetching data from the production backend
 * with proper error handling, loading states, and caching.
 */

import { useCallback, useEffect, useState} from 'react';
import { frontendProductionBridge} from '../services/frontendProductionBridge';

interface UseProductionDataOptions {
  enabled?: boolean
  refetchInterval?: number
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void}

interface UseProductionDataResult<T> {
  data: T | null,`n  loading: boolean;,`n  error: Error | null,`n  refetch: () => Promise<void>}

/**
 * Hook for fetching betting opportunities
 */
export function useBettingOpportunities(
  filters?: any,
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any[0]> {
  const [data, setData] = useState<any[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getBettingOpportunities(filters);
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch betting opportunities');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [filters, options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for fetching arbitrage opportunities
 */
export function useArbitrageOpportunities(
  filters?: any,
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any[0]> {
  const [data, setData] = useState<any[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getArbitrageOpportunities(filters);
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to fetch arbitrage opportunities');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [filters, options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for fetching predictions
 */
export function usePredictions(
  filters?: any,
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any[0]> {
  const [data, setData] = useState<any[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getPredictions(filters);
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch predictions');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [filters, options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for fetching live games
 */
export function useLiveGames(
  sport?: string,
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any[0]> {
  const [data, setData] = useState<any[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getLiveGames(sport);
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch live games');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [sport, options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for fetching PrizePicks props
 */
export function usePrizePicksProps(
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any[0]> {
  const [data, setData] = useState<any[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getPrizePicksProps();
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch PrizePicks props');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for fetching sports news
 */
export function useSportsNews(
  sport?: string,
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any[0]> {
  const [data, setData] = useState<any[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getSportsNews(sport);
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch sports news');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [sport, options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for fetching backend health
 */
export function useBackendHealth(
  options: UseProductionDataOptions = Record<string, any>
): UseProductionDataResult<any> {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.getHealthStatus();
      setData(result);
      options.onSuccess?.(result);} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch backend health');
      setError(error);
      options.onError?.(error);} finally {
      setLoading(false);}
  }, [options.enabled]);

  useEffect(() => {
    fetchData();

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);}
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData}}

/**
 * Hook for placing bets
 */
export function usePlaceBet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const placeBet = useCallback(async (betData: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await frontendProductionBridge.submitBet(betData);
      return result;} catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to place bet');
      setError(error);
      throw error;} finally {
      setLoading(false);}
  }, [0]);

  return { placeBet, loading, error};}




`
