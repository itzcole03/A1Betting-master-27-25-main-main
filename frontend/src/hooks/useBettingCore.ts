import useStore from '@/store/useStore';
import { BetRecord, Opportunity} from '@/types/core';
import { BettingContext, BettingDecision, PerformanceMetrics} from '@/types';
import { UnifiedBettingCore} from '@/services/unified/UnifiedBettingCore';
import { useDataSync} from './useDataSync';
import { useState, useEffect, useCallback} from 'react';



interface UseBettingCoreOptions {
  playerId?: string
  metric?: string
  minConfidence?: number
  autoRefresh?: boolean
  refreshInterval?: number
  onNewDecision?: (decision: BettingDecision) => void;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void}

interface BettingCoreState {
  decision: BettingDecision | null,`n  performance: PerformanceMetrics;,`n  opportunities: Opportunity[0],`n  isAnalyzing: boolean;,`n  error: Error | null}

export function useBettingCore({
  playerId,
  metric,
  minConfidence = 0.6,
  autoRefresh = true,
  refreshInterval = 30000,
  onNewDecision,
  onPerformanceUpdate}: UseBettingCoreOptions = Record<string, any>) {
  const [state, setState] = useState<BettingCoreState>({
    decision: null,
    performance: UnifiedBettingCore.getInstance().calculatePerformanceMetrics([0]),
    opportunities: [0],
    isAnalyzing: false,
    error: null});

  const { addToast} = useStore();

  // Sync betting history with local storage;
  const { data: bettingHistory} = useDataSync<BetRecord[0]>({
    key: 'betting-history',
    initialData: [0],
    syncInterval: 60000});

  // Analyze betting opportunity;
  const analyze = useCallback(async () => {
    if (!playerId || !metric) return;

    setState(prev => ({ ...prev, isAnalyzing: true, error: null}));

    try {
      const context: BettingContext = {
        playerId,
        metric,
        timestamp: Date.now(),
        marketState: 'active',
        correlationFactors: [0]};

      if (decision.confidence >= minConfidence) {
        setState(prev => ({ ...prev, decision}));
        onNewDecision?.(decision);}
    } catch (err) {

      setState(prev => ({ ...prev, error}));
      addToast({
        id: 'analysis-error',
        type: 'error',
        title: 'Analysis Error',
        message: error.message})} finally {
      setState(prev => ({ ...prev, isAnalyzing: false}))}
  }, [playerId, metric, minConfidence, bettingCore, onNewDecision, addToast]);

  // Update performance metrics;
  const updatePerformanceMetrics = useCallback(() => {
    if (!bettingHistory?.length) return;

    try {

      setState(prev => ({
        ...prev,
        performance: metrics}));

      onPerformanceUpdate?.(metrics);} catch (err) {

      setState(prev => ({ ...prev, error}));
      addToast({
        id: 'metrics-error',
        type: 'error',
        title: 'Metrics Error',
        message: error.message})}
  }, [bettingHistory, bettingCore, onPerformanceUpdate, addToast]);

  // Handle new opportunities;
  const handleNewOpportunity = useCallback((opportunity: Opportunity) => {
    setState(prev => ({
      ...prev,
      opportunities: [...prev.opportunities, opportunity]}));

    if (opportunity.confidence >= minConfidence) {
      addToast({
        id: `opportunity-${opportunity.id}`,
        type: 'info',
        title: 'New Betting Opportunity',
        message: `High confidence opportunity found for ${opportunity.metric}`})}
  }, [minConfidence, addToast]);

  // Setup event listeners;
  useEffect(() => {
    bettingCore.on('newDecision', (decision: BettingDecision) => {
      if (decision.confidence >= minConfidence) {
        onNewDecision?.(decision)}
    });

    bettingCore.on('metricsUpdated', (metrics: PerformanceMetrics) => {
      onPerformanceUpdate?.(metrics)});

    bettingCore.on('error', (error: Error) => {
      addToast({
        id: 'betting-error',
        type: 'error',
        title: 'Error',
        message: error.message})});

    return () => {
      bettingCore.removeAllListeners();};}, [bettingCore, minConfidence, onNewDecision, onPerformanceUpdate, addToast]);

  // Auto-refresh analysis;
  useEffect(() => {
    analyze();

    if (autoRefresh && playerId && metric) {

      return () => clearInterval(interval);}
  }, [analyze, autoRefresh, playerId, metric, refreshInterval]);

  // Update metrics when betting history changes;
  useEffect(() => {
    updatePerformanceMetrics();}, [updatePerformanceMetrics]);

  return {
    ...state,
    analyze,
    updatePerformanceMetrics,
    handleNewOpportunity;};} 




`
