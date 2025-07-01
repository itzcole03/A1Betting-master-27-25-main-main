export interface AutomationConfig {
  updateInterval: number,`n  riskManagement: {,`n  maxActiveBets: number,`n  minConfidence: number;,`n  maxStakePercentage: number,`n  stopLossPercentage: number;,`n  takeProfitPercentage: number};
  prediction: {,`n  minSampleSize: number;,`n  maxTrials: number,`n  explorationRate: number;,`n  recalibrationThreshold: number};
  userPersonalization: {,`n  minClusterSize: number;,`n  maxClusters: number,`n  confidenceThreshold: number};
  notification: {,`n  enabled: boolean;,`n  channels: {,`n  email: boolean;,`n  push: boolean,`n  sms: boolean};
    priorityLevels: {,`n  info: boolean;,`n  warning: boolean,`n  error: boolean;,`n  success: boolean}};}

export const defaultConfig: AutomationConfig = {,`n  updateInterval: 5 * 60 * 1000, // 5 minutes;
  riskManagement: {,`n  maxActiveBets: 5,
    minConfidence: 0.7,
    maxStakePercentage: 0.05, // 5% of bankroll;
    stopLossPercentage: 0.1, // 10% of bankroll;
    takeProfitPercentage: 0.2, // 20% of bankroll},
  prediction: {,`n  minSampleSize: 1000,
    maxTrials: 100,
    explorationRate: 0.1,
    recalibrationThreshold: 0.1
  },
  userPersonalization: {,`n  minClusterSize: 10,
    maxClusters: 5,
    confidenceThreshold: 0.7
  },
  notification: {,`n  enabled: true,
    channels: {,`n  email: true,
      push: true,
      sms: false
    },
    priorityLevels: {,`n  info: true,
      warning: true,
      error: true,
      success: true
    }
  }
};



`
