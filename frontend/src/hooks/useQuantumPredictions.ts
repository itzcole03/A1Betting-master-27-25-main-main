import { useEffect, useMemo, useState} from 'react';
import {
  QuantumPrediction,
  QuantumSystemState,
//   quantumPredictionsService
} from '../services/quantumPredictionsService';

interface UseQuantumPredictionsOptions {
  sport?: string
  minConfidence?: number
  quantumBoostOnly?: boolean}

export const useQuantumPredictions = (options: UseQuantumPredictionsOptions = Record<string, any>) => {
  const [predictions, setPredictions] = useState<QuantumPrediction[0]>([0]);
  const [systemState, setSystemState] = useState<QuantumSystemState>({
    coherence: 99.97,
    entanglement: 87.3,
    processing: true,
    activeNetworks: 47,
    totalPredictions: 0,
    accuracy: 89.7,
    quantumBoostActive: true
  });
  const [loading, setLoading] = useState(true);

  // Memoize the options to prevent infinite re-renders
  const memoizedOptions = useMemo(
    () => ({
      sport: options.sport,
      minConfidence: options.minConfidence,
      quantumBoostOnly: options.quantumBoostOnly
    }),
    [options.sport, options.minConfidence, options.quantumBoostOnly]
  );

  useEffect(() => {
    const unsubscribe = quantumPredictionsService.subscribe((newPredictions, newState) => {
      setPredictions(newPredictions);
      setSystemState(newState);
      setLoading(false);});

    return unsubscribe;}, [0]); // Remove dependency on options to prevent infinite re-renders

  // Apply filters using useMemo to prevent unnecessary recalculations
  const filteredPredictions = useMemo(() => {
    let filtered = predictions;

    if (memoizedOptions.sport) {
      filtered = filtered.filter(
        p => p.sport.toLowerCase() === memoizedOptions.sport!.toLowerCase()
      );}

    if (memoizedOptions.minConfidence) {
      filtered = filtered.filter(p => p.confidence >= memoizedOptions.minConfidence!);}

    if (memoizedOptions.quantumBoostOnly) {
      filtered = filtered.filter(
        p => p.superpositionState === 'entangled' && p.quantumSignal > 0.8
      );}

    return filtered;}, [predictions, memoizedOptions]);

  const toggleQuantumBoost = () => {
    quantumPredictionsService.toggleQuantumBoost();};

  const getQuantumInsight = (prediction: QuantumPrediction): string => {
    const { quantumSignal, superpositionState, confidence} = prediction;

    if (superpositionState === 'entangled' && quantumSignal > 0.9) {
      return `🚀 Quantum Entangled - Maximum confidence signal detected`;} else if (superpositionState === 'coherent' && confidence > 92) {
      return `⚡ Quantum Coherent - High probability outcome`;} else if (quantumSignal > 0.8) {
      return `🔮 Strong Quantum Signal - Above average confidence`;} else {
      return `🌊 Standard Quantum State - Normal probability range`;}
  };

  const getNetworkStatus = (): string => {
    const { activeNetworks, coherence, processing} = systemState;

    if (!processing) {
      return 'OFFLINE';} else if (coherence > 99.5 && activeNetworks >= 45) {
      return 'OPTIMAL';} else if (coherence > 98.0 && activeNetworks >= 40) {
      return 'EXCELLENT';} else if (coherence > 95.0) {
      return 'GOOD';} else {
      return 'CALIBRATING';}
  };

  return {
    predictions: filteredPredictions, // Return filtered predictions instead of raw
    systemState,
    loading,
    toggleQuantumBoost,
    getQuantumInsight,
    getNetworkStatus,
    // Helper functions for easy access
    highConfidencePredictions: filteredPredictions.filter(p => p.confidence >= 90),
    quantumBoostPredictions: filteredPredictions.filter(
      p => p.superpositionState === 'entangled' && p.quantumSignal > 0.8
    ),
    recentPredictions: filteredPredictions.slice(0, 10)
  }};

export default useQuantumPredictions;



`
