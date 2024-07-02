import React from 'react';
import { CircularProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

interface QueryLoaderProps {
  queryKey: string;
  children: React.ReactNode;
  loaderComponent?: React.ReactNode;
}

/**
 * This simple component receive a queryKey identifier as prop and renders a loading spinner
 * until the relative fetch is in progress, otherwise it renders the children
 */
const QueryLoader = ({ loaderComponent, queryKey, children }: QueryLoaderProps) => {
  const loader = loaderComponent || <CircularProgress />;
  const isFetching = useIsFetching({ queryKey: [queryKey] });
  return <>{isFetching ? loader : children}</>;
};

export default QueryLoader;
