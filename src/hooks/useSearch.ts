import { useState, useEffect, useCallback } from "react";
import { apiSearch, PaginationResponse } from "../lib/phimapi";

export const useSearch = () => {
  const [results, setResults] = useState<PaginationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (keyword: string, page: number = 1) => {
    if (!keyword.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiSearch(keyword, page);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    results,
    isLoading,
    error,
    search,
  };
};
