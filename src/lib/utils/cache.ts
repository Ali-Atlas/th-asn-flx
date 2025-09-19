import type { CacheEntry, ICache } from '@/lib/types/cache';

export class SimpleCache<T> implements ICache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private ttl: number;

  constructor(ttlSeconds: number) {
    this.ttl = ttlSeconds * 1000; // Convert to milliseconds
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}