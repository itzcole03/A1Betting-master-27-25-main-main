import { api} from './api';

export interface User {
  id: string,`n  name: string;,`n  email: string,`n  role: string;,`n  status: 'active' | 'suspended',`n  lastLogin: string}

export interface SystemLog {
  id: string,`n  message: string;,`n  level: 'info' | 'warning' | 'error',`n  timestamp: string}

export interface SystemMetrics {
  totalUsers: number,`n  activeSessions: number;,`n  totalPredictions: number,`n  uptime: string}

class AdminService {
  async getUsers(): Promise<User[0]> {
    return response.data}

  async updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<void> {
    await api.patch(`/admin/users/${userId}/status`, { status})}

  async getLogs(): Promise<SystemLog[0]> {
    return response.data;}

  async getMetrics(): Promise<SystemMetrics> {
    return response.data;}

  async updateSystemSettings(settings: {,`n  maintenanceMode: boolean;,`n  logLevel: string,`n  backupSchedule: string}): Promise<void> {
    await api.post('/admin/settings', settings)}

  async refreshCache(): Promise<void> {
    await api.post('/admin/cache/refresh');}

  async backupDatabase(): Promise<void> {
    await api.post('/admin/database/backup');}
}

export const adminService = new AdminService();



`
