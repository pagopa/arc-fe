import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

interface QueryLoaderProps {
  queryKey: string;
  children: React.ReactNode;
  loaderComponent?: React.ReactNode;
  /** minimum loading time in millis. useful for fake loading time or to avoid flickering  */
  atLeast?: number;
}

/**
 * This simple component receive a queryKey identifier as prop and renders a loading spinner
 * until the relative fetch is in progress, otherwise it renders the children
 */
const QueryLoader = (props: QueryLoaderProps) => {
  const { queryKey, loaderComponent, children } = props;
  const [atLeast, setLeast] = useState(0);
  const isFetching = useIsFetching({ queryKey: [queryKey] });

  useEffect(() => {
    if (props.atLeast && isFetching) {
      setLeast(props.atLeast);
      setTimeout(() => setLeast(0), props.atLeast);
    }
  }, [isFetching, props.atLeast]);

  const loader = loaderComponent || <CircularProgress />;
  return <>{isFetching + atLeast ? loader : children}</>;
};

export default QueryLoader;
