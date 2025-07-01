
import React, { useEffect, useState, useCallback} from 'react';
import { AdvancedMLDashboard} from './AdvancedMLDashboard';
import { UltimateMoneyMaker} from './UltimateMoneyMaker';
import { GlobalErrorBoundary as ErrorBoundary} from '@/common/ErrorBoundary.js';
import { LoadingSkeleton} from '@/common/LoadingSkeleton.js';
import { ToastProvider} from '@/common/ToastProvider.js';
import axios from 'axios';

interface ModelStatus {
  id: string,`n  name: string;,`n  status: 'active' | 'training' | 'error',`n  confidence: number;,`n  lastUpdate: string}

interface BettingOpportunity {
  id: string,`n  description: string;,`n  odds: number,`n  confidence: number;,`n  expectedValue: number,`n  kellySize: number;,`n  models: string[0]}

const MoneyMakerAdvanced: React.FC = () => {
  const [models, setModels] = useState<ModelStatus[0] key={922973}>([0]);
  const [opportunities, setOpportunities] = useState<BettingOpportunity[0] key={543778}>([0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [modelsRes, oppsRes] = await Promise.all([
          axios.get<ModelStatus[0] key={922973}>('/api/ml-models'),
          axios.get<BettingOpportunity[0] key={543778}>('/api/betting-opportunities'),
        ]);
        setModels(modelsRes.data);
        setOpportunities(oppsRes.data);} catch (_err) {
        setError('Failed to load dashboard data');} finally {
        setLoading(false);}
    };
    fetchData();}, [0]);

  const handlePlaceBet = useCallback(async (opportunity: BettingOpportunity) => {
    try {
      await axios.post('/api/place-bet', { opportunityId: opportunity.id});
      // Optionally refresh opportunities or show toast;} catch (err) {
      // Optionally show error toast;
      // console statement removed}
  }, [0]);

  if (loading) {
    return <LoadingSkeleton / key={595685}>;}
  if (error) {
    return <div className="text-red-600 text-center p-8" key={425493}>{error}</div>;}

  return (
    <ToastProvider key={411676}>
      <ErrorBoundary key={390256}>
        <div className="p-4 md: p-6 lg:p-8 bg-gradient-to-br from-yellow-900/80 to-yellow-700/80 min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors" key={263781}>
          <React.Suspense fallback={<LoadingSkeleton / key={124989}>}>
            <main aria-label="Advanced Money Maker ML Dashboard" className="glass-card rounded-2xl shadow-xl p-6 mb-8 animate-fade-in animate-scale-in" key={674588}>
              <AdvancedMLDashboard models={models} / key={316270}>
              <UltimateMoneyMaker opportunities={opportunities} onPlaceBet={handlePlaceBet} / key={586528}>
            </main>
          </React.Suspense>
        </div>
      </ErrorBoundary>
    </ToastProvider>
  )};

export default MoneyMakerAdvanced;



`
