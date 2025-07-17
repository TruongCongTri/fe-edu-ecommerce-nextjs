// /src/hooks/useAPI.ts
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAPI<T, Args extends any[]>(
  apiFn: (...args: Args) => Promise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (...args: Args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setData(result);
      return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
}
