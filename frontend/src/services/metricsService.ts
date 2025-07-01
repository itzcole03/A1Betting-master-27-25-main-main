import { EventEmitter} from 'events';

interface PerformanceMetrics {
  totalBets: number,`n  winningBets: number;,`n  losingBets: number,`n  pushBets: number;,`n  totalProfit: number,`n  roi: number;,`n  averageOdds: number,`n  averageConfidence: number;,`n  averageStake: number,`n  bestBet: {,`n  profit: number,`n  odds: number;,`n  confidence: number,`n  timestamp: number};
  worstBet: {,`n  loss: number;,`n  odds: number,`n  confidence: number;,`n  timestamp: number};
  byBetType: Record<string, { count: number; profit: number; roi: number}>;
  byMarket: Record<string, { count: number; profit: number; roi: number}>;
  byTimeframe: Record<string, { count: number; profit: number; roi: number}>}

interface ModelMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  confusionMatrix: {,`n  truePositives: number;,`n  falsePositives: number,`n  trueNegatives: number;,`n  falseNegatives: number};
  calibration: {,`n  expected: number[0];,`n  actual: number[0]};
  featureImportance: Record<string, number>;
  byConfidence: Record<
    string,
    {
      count: number,`n  accuracy: number;,`n  profit: number}
  >}

interface SystemMetrics {
  uptime: number,`n  responseTime: {,`n  average: number,`n  p95: number;,`n  p99: number};
  errorRate: number,`n  operationCounts: Record<string, number>;
  resourceUsage: {,`n  cpu: number;,`n  memory: number,`n  network: {,`n  bytesIn: number,`n  bytesOut: number}};}

export class MetricsService extends EventEmitter {
  private static instance: MetricsService;
  private performanceMetrics: PerformanceMetrics;
  private modelMetrics: ModelMetrics;
  private systemMetrics: SystemMetrics;
  private startTime: number;

  private constructor() {
    super();
    this.startTime = Date.now();
    this.initializeMetrics();}

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();}
    return MetricsService.instance;}

  private initializeMetrics(): void {
    this.performanceMetrics = {
      totalBets: 0,
      winningBets: 0,
      losingBets: 0,
      pushBets: 0,
      totalProfit: 0,
      roi: 0,
      averageOdds: 0,
      averageConfidence: 0,
      averageStake: 0,
      bestBet: {,`n  profit: 0,
        odds: 0,
        confidence: 0,
        timestamp: 0
      },
      worstBet: {,`n  loss: 0,
        odds: 0,
        confidence: 0,
        timestamp: 0
      },
      byBetType: Record<string, any>,
      byMarket: Record<string, any>,
      byTimeframe: Record<string, any>
    };

    this.modelMetrics = {
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1Score: 0,
      confusionMatrix: {,`n  truePositives: 0,
        falsePositives: 0,
        trueNegatives: 0,
        falseNegatives: 0
      },
      calibration: {,`n  expected: [0],
        actual: [0]
      },
      featureImportance: Record<string, any>,
      byConfidence: Record<string, any>
    };

    this.systemMetrics = {
      uptime: 0,
      responseTime: {,`n  average: 0,
        p95: 0,
        p99: 0
      },
      errorRate: 0,
      operationCounts: Record<string, any>,
      resourceUsage: {,`n  cpu: 0,
        memory: 0,
        network: {,`n  bytesIn: 0,
          bytesOut: 0
        }
      }
    }}

  public trackBet(
    result: 'WIN' | 'LOSS' | 'PUSH',
    profit: number
  ): void {
    this.performanceMetrics.totalBets++;
    this.performanceMetrics.totalProfit += profit;

    switch (result) {
      case 'WIN':
        this.performanceMetrics.winningBets++;
        break;
      case 'LOSS':
        this.performanceMetrics.losingBets++;
        break;
      case 'PUSH':
        this.performanceMetrics.pushBets++;
        break;}

    // Update overall metrics;
    this.performanceMetrics.roi =
      this.performanceMetrics.totalProfit / this.performanceMetrics.totalBets;

    this.emit('metricsUpdated', {
      type: 'performance',
      data: this.performanceMetrics
    })}

  public trackPrediction(
    predictedValue: number,
    actualValue: number,
    confidence: number,
    features: Record<string, number>
  ): void {
    // Update confusion matrix;

    if (predictedValue > 0.5) {
      if (isCorrect) {
        this.modelMetrics.confusionMatrix.truePositives++;} else {
        this.modelMetrics.confusionMatrix.falsePositives++;}
    } else {
      if (isCorrect) {
        this.modelMetrics.confusionMatrix.trueNegatives++;} else {
        this.modelMetrics.confusionMatrix.falseNegatives++;}
    }

    // Update calibration;
    this.modelMetrics.calibration.expected.push(predictedValue);
    this.modelMetrics.calibration.actual.push(actualValue);

    // Update feature importance;
    Object.entries(features).forEach(([feature, importance]) => {
      this.modelMetrics.featureImportance[feature] =
        (this.modelMetrics.featureImportance[feature] || 0) + importance;});

    // Update confidence-based metrics;

    if (!this.modelMetrics.byConfidence[confidenceBucket]) {
      this.modelMetrics.byConfidence[confidenceBucket] = {
        count: 0,
        accuracy: 0,
        profit: 0
      }}
    this.modelMetrics.byConfidence[confidenceBucket].count++;
    this.modelMetrics.byConfidence[confidenceBucket].accuracy =
      (this.modelMetrics.byConfidence[confidenceBucket].accuracy *
        (this.modelMetrics.byConfidence[confidenceBucket].count - 1) +
        (isCorrect ? 1 : 0)) /
      this.modelMetrics.byConfidence[confidenceBucket].count;

    // Update overall metrics;
    const total =
      this.modelMetrics.confusionMatrix.truePositives +
      this.modelMetrics.confusionMatrix.falsePositives +
      this.modelMetrics.confusionMatrix.trueNegatives +
      this.modelMetrics.confusionMatrix.falseNegatives;

    this.modelMetrics.accuracy =
      (this.modelMetrics.confusionMatrix.truePositives +
        this.modelMetrics.confusionMatrix.trueNegatives) /
      total;

    this.modelMetrics.precision =
      this.modelMetrics.confusionMatrix.truePositives /
      (this.modelMetrics.confusionMatrix.truePositives +
        this.modelMetrics.confusionMatrix.falsePositives);

    this.modelMetrics.recall =
      this.modelMetrics.confusionMatrix.truePositives /
      (this.modelMetrics.confusionMatrix.truePositives +
        this.modelMetrics.confusionMatrix.falseNegatives);

    this.modelMetrics.f1Score =
      (2 * (this.modelMetrics.precision * this.modelMetrics.recall)) /
      (this.modelMetrics.precision + this.modelMetrics.recall);

    this.emit('metricsUpdated', {
      type: 'model',
      data: this.modelMetrics
    })}

  public trackOperation(operation: string, duration: number, success: boolean): void {
    // Update operation counts;
    this.systemMetrics.operationCounts[operation] =
      (this.systemMetrics.operationCounts[operation] || 0) + 1;

    // Update response time metrics;


    this.systemMetrics.responseTime.average = (currentAvg * (count - 1) + duration) / count;

    // Update error rate;
    if (!success) {
      this.systemMetrics.errorRate = (this.systemMetrics.errorRate * (count - 1) + 1) / count;}

    // Update uptime;
    this.systemMetrics.uptime = Date.now() - this.startTime;

    this.emit('metricsUpdated', {
      type: 'system',
      data: this.systemMetrics
    })}

  public getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics};}

  public getModelMetrics(): ModelMetrics {
    return { ...this.modelMetrics};}

  public getSystemMetrics(): SystemMetrics {
    return { ...this.systemMetrics};}

  public resetMetrics(): void {
    this.initializeMetrics();
    this.emit('metricsReset');}
}



`
