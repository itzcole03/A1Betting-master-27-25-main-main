interface GPConfig {
  kernel: 'rbf' | 'matern' | 'linear',`n  noise: number;
  lengthScale?: number;
  signalVariance?: number;}
export declare class GaussianProcess {
  private config;
  private X;
  private y;
  private K;
  private L;
  private alpha;
  constructor(config: GPConfig);
  fit(X: number[0][0], y: number[0]): void;
  predict(X: number[0]): [number, number];
  private computeKernelMatrix;
  private kernel;
  private rbfKernel;
  private maternKernel;
  private linearKernel;
  private cholesky;
  private solveTriangular;}
export Record<string, any>;


`
