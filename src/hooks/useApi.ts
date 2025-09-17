import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

interface UseApiOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  enabled?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useApi<T = any>({
  url,
  method = 'GET',
  body,
  headers,
  enabled = true,
}: UseApiOptions): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios({
        url,
        method,
        data: body,
        headers,
      });
      
      setData(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(new Error(error.message || 'Failed to fetch'));
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return { data, loading, error, refetch: fetchData };
}