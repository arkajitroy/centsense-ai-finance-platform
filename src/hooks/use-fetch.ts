"use client";

import { useState, useCallback } from "react";

type AsyncFunction<TArgs extends unknown[], TResult> = (...args: TArgs) => Promise<TResult>;

export default function useFetch<TArgs extends unknown[], TResult>(
  asyncFunction: AsyncFunction<TArgs, TResult>
) {
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fn = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { data, loading, error, fn };
}
