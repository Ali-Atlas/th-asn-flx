export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface ICache<T> {
  get(key: string): T | null;
  set(key: string, data: T): void;
  clear(): void;
}