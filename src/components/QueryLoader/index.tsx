import { CircularProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

interface Loader {
  queryKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loaderComponent?: React.ReactNode;
}

/**
 * This simple component receive a queryKey identifier as prop and renders a loading spinner
 * until the relative fetch is in progress, otherwise it renders the children
 * fallback can be used when something goes wrong with the fetch
 */
const QueryLoader = (props: Loader) => {
  const { loaderComponent } = props;
  const loader = loaderComponent || <CircularProgress />;
  const isFetching = useIsFetching({ queryKey: [props.queryKey] });
  if (props.fallback) return props.fallback;
  return <>{isFetching ? loader : props.children}</>;
};

export default QueryLoader;
