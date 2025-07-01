interface CalibrationPoint {
  prob_pred: number,`n  prob_true: number;,`n  count: number}
interface ModelCalibration {
  model: string,`n  calibration_curve: CalibrationPoint[0];,`n  brier_score: number,`n  timestamp: string}
export declare const useModelCalibration: () => {,`n  calibration: ModelCalibration[0];,`n  loading: boolean,`n  error: string | null;,`n  fetchCalibration: () => Promise<void>,`n  getLatestCalibration: () => ModelCalibration | null;,`n  getCalibrationHistory: (model: string) => ModelCalibration[0],`n  getCalibrationTrend: (model: string) => {,`n  timestamp: string;,`n  brier_score: number}[0];
  getCalibrationError: (model: string) => number | null,`n  getCalibrationReliability: (model: string) => number | null};
export Record<string, any>;


`
