import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { QueryKey, useIsFetching } from '@tanstack/react-query';

export interface QueryLoaderProps {
  queryKey?: string | QueryKey;
  children: React.ReactNode;
  loaderComponent?: React.ReactNode;
  /** minimum loading time in millis. useful for fake loading time or to avoid flickering  */
  atLeast?: number;
  /** if provided the loading logic needs to managed outside this component via this boolean 'laoding' prop */
  loading?: boolean;
}

/**
 * This simple component receive a queryKey identifier as prop and renders a loading spinner
 * until the relative fetch is in progress, otherwise it renders the children
 */
const QueryLoader = (props: QueryLoaderProps) => {
  const { queryKey, loaderComponent, children, loading } = props;
  const [atLeast, setAtLeast] = useState(props.atLeast || 0);
  const isFetching = useIsFetching({
    queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey
  });

  let timeoutId: NodeJS.Timeout | null = null;
  useEffect(() => {
    if (props.atLeast && isFetching) {
      timeoutId = setTimeout(() => setAtLeast(0), props.atLeast);
    }
  }, [isFetching, props.atLeast]);

  useEffect(() => {
    return () => {
      timeoutId !== null && clearTimeout(timeoutId);
    };
  }, []);

  const loader = loaderComponent || <CircularProgress />;
  return (
    <>
      {loading !== undefined
        ? loading
          ? loader
          : children
        : isFetching + atLeast
          ? loader
          : children}
    </>
  );
};

export default QueryLoader;
