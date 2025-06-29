import { EventEmitter } from 'events';
import { frontendProductionBridge } from './frontendProductionBridge';

export class BettingOpportunityService extends EventEmitter {
  private static instance: BettingOpportunityService;
  private isMonitoring = false;
  private pollingInterval: NodeJS.Timeout | null = null;

  private constructor() {
    super();
  }

  /**
   * Get the singleton instance;
   */
  public static getInstance(): BettingOpportunityService {
    if (!BettingOpportunityService.instance) {
      BettingOpportunityService.instance = new BettingOpportunityService();
    }
    return BettingOpportunityService.instance;
  }

  /**
   * Start monitoring for betting opportunities;
   */
  public startMonitoring(filters: any = {}): void {
    if (this.isMonitoring) {
      return;
    }
    this.isMonitoring = true;
    this.fetchOpportunities(filters); // Fetch immediately
    this.pollingInterval = setInterval(() => this.fetchOpportunities(filters), 30000); // Poll every 30 seconds
    this.emit('monitoringStarted');
    console.log('Betting opportunity monitoring started.');
  }

  /**
   * Stop monitoring for betting opportunities;
   */
  public stopMonitoring(): void {
    if (!this.isMonitoring) {
      return;
    }
    this.isMonitoring = false;
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.emit('monitoringStopped');
    console.log('Betting opportunity monitoring stopped.');
  }

  private async fetchOpportunities(filters: any): Promise<void> {
    if (!this.isMonitoring) return;

    try {
      const opportunities = await frontendProductionBridge.getArbitrageOpportunities(filters);
      if (opportunities && opportunities.length > 0) {
        this.emit('newOpportunities', opportunities);
      }
    } catch (error) {
      console.error('Failed to fetch betting opportunities:', error);
      this.emit('error', error);
    }
  }

  /**
   * Get current monitoring status;
   */
  public isActive(): boolean {
    return this.isMonitoring;
  }
}

export const bettingOpportunityService = BettingOpportunityService.getInstance();
