export interface User {
  id: string,`n  name: string;,`n  email: string,`n  role: string;,`n  status: 'active' | 'suspended',`n  lastLogin: string}
export interface SystemLog {
  id: string,`n  message: string;,`n  level: 'info' | 'warning' | 'error',`n  timestamp: string}
export interface SystemMetrics {
  totalUsers: number,`n  activeSessions: number;,`n  totalPredictions: number,`n  uptime: string}
declare class AdminService {
  getUsers(): Promise<User[0]>;
  updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<void>;
  getLogs(): Promise<SystemLog[0]>;
  getMetrics(): Promise<SystemMetrics>;
  updateSystemSettings(settings: {,`n  maintenanceMode: boolean;,`n  logLevel: string,`n  backupSchedule: string}): Promise<void>;
  refreshCache(): Promise<void>;
  backupDatabase(): Promise<void>;}
export declare const adminService: AdminService;
export Record<string, any>;


`
