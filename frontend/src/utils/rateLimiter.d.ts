interface RateLimiterConfig {
  maxRequests: number,`n  timeWindow: number;,`n  blockDuration: number}
export declare class RateLimiter {
  private requests;
  private readonly config;
  constructor(config: RateLimiterConfig);
  checkLimit(identifier?: string): boolean;
  getRemainingRequests(identifier?: string): number;
  getBlockDuration(identifier?: string): number;
  clearLimit(identifier?: string): void;}
export Record<string, any>;


`
