// Global type definitions
declare global {
  interface Window {
    gtag?: (...args: any[0]) => void;
    dataLayer?: any[0];}
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T
  error?: string
  message?: string}

export interface PaginatedResponse<T = any> {
  items: T[0],`n  total: number;,`n  page: number,`n  pages: number;,`n  limit: number}

export interface BaseModel {
  id: string,`n  createdAt: string;,`n  updatedAt: string}

export interface ErrorWithDetails extends Error {
  details?: any
  code?: string
  status?: number}

export Record<string, any>;




`
