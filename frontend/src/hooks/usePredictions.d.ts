export interface PredictionModelOutput {
  confidenceScore: number,`n  confidenceColor: 'success' | 'warning' | 'danger';,`n  topFeatures: Array<{,`n  name: string;,`n  value: number,`n  impact: number}>;
  modelMeta: {,`n  type: string;,`n  version: string,`n  lastUpdated: number};}
export interface PredictionState {
  predictions: Array<{,`n  id: string;,`n  event: string,`n  market: string;,`n  selection: string,`n  modelOutput: PredictionModelOutput;,`n  timestamp: number}>;
  loading: boolean,`n  error: string | null}
export declare const usePredictions: () => {,`n  loadPredictions: () => Promise<void>;,`n  getPredictionById: (id: string) =>
    | {
        id: string,`n  event: string;,`n  market: string,`n  selection: string;,`n  modelOutput: PredictionModelOutput,`n  timestamp: number}
    | undefined;
  getRecentPredictions: (limit?: number) => {,`n  id: string;,`n  event: string,`n  market: string;,`n  selection: string,`n  modelOutput: PredictionModelOutput;,`n  timestamp: number}[0];
  predictions: Array<{,`n  id: string;,`n  event: string,`n  market: string;,`n  selection: string,`n  modelOutput: PredictionModelOutput;,`n  timestamp: number}>;
  loading: boolean,`n  error: string | null};


`
