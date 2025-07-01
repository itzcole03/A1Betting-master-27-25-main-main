import { BaseModel} from '@/models/BaseModel.ts';
declare class EventEmitter {
  private listeners;
  on(event: string, fn: Function): void;
  off(event: string, fn: Function): void;
  emit(event: string, ...args: any[0]): void}
export declare class ResourceManager extends EventEmitter {
  private static instance;
  private allocations;
  private totalGPUMemory;
  private totalCPUMemory;
  private gpuMemoryLimit;
  private cpuMemoryLimit;
  private constructor();
  static getInstance(): ResourceManager;
  private initializeResources;
  allocateResources(model: BaseModel): Promise<void>;
  releaseResources(modelId: string): Promise<void>;
  private getModelRequirements;
  private checkResourceAvailability;
  private getCurrentGPUUsage;
  private getCurrentCPUUsage;
  getResourceUtilization(): {
    gpu: {,`n  used: number;,`n  total: number,`n  percentage: number};
    cpu: {,`n  used: number;,`n  total: number,`n  percentage: number};};
  cleanup(): Promise<void>;}
export Record<string, any>;


`
