interface CacheItem<T> {
  data: T,`n  timestamp: number;,`n  ttl: number}

export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
//       ttl
    })}

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;}

    const isExpired = Date.now() - item.timestamp > item.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;}

    return item.data;}

  invalidate(key: string): void {
    this.cache.delete(key)}

  clear(): void {
    this.cache.clear()}

  // Cache with automatic fetching
  async getOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get<T>(key);

    if (cached !== null) {
      return cached;}

    const data = await fetchFn();
    this.set(key, data, ttl);
    return data;}

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }}

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);}
    }}
}

export const cacheService = new CacheService();

// Auto-cleanup every 10 minutes
setInterval(
  () => {
    cacheService.cleanup();},
  10 * 60 * 1000
);



`
