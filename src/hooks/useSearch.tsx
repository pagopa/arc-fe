import { useEffect } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import utils from '../utils';
import { useHashParamsListener } from './useHashParamsListener';

export type SearchVariables<T> = {
  filters?: T;
  pagination: { page: number; size: number };
  sort: Array<string>;
};

export type UseSearchProps<T, TData = unknown, TError = unknown> = {
  filters?: T;
  initialPage?: number;
  initialSize?: number;
  query: UseMutationResult<TData, TError, SearchVariables<T>>;
};

/**
 * React Hook for managing search interfaces with filter state,
 * pagination (with URL hash sync), and sort, performing query on changes.
 */
export function useSearch<T, TData = unknown, TError = unknown>({
  filters,
  query
}: UseSearchProps<T, TData, TError>) {
  const {
    page: hashPage = 1,
    size = 10,
    sortDirection,
    sortField
  } = useHashParamsListener() as {
    page: number;
    size: number;
    sortDirection: string;
    sortField: string;
  };

  const page = hashPage > 0 ? hashPage - 1 : 0;

  const sort = sortDirection && sortField ? [`${sortField},${sortDirection}`] : [];

  useEffect(() => {
    query.mutateAsync({
      filters,
      pagination: { size, page },
      sort
    });
  }, [page, size, sortDirection, sortField]);

  // Handle filter application: resetting pagination and sort model
  const applyFilters = (appliedFilters?: T) => {
    const params = utils.URI.encode({
      ...appliedFilters,
      page: null,
      size: null,
      sort: null
    });
    utils.URI.set(params, { replace: true });
    query.mutateAsync({
      filters: appliedFilters,
      pagination: { size: 10, page: 0 },
      sort: []
    });
  };

  return {
    applyFilters,
    query
  };
}
