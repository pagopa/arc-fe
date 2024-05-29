import { useIsFetching } from '@tanstack/react-query';

interface Loader {
  queryKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * This simple component receive a queryKey identifier as prop and renders a loading spinner
 * until the relative fetch is in progress, otherwise it renders the children
 * fallback can be used when something goes wrong with the fetch
 */
const QueryLoader = (props: Loader) => {
  const isFetching = useIsFetching({ queryKey: [props.queryKey] });
  if (props.fallback) return props.fallback;
  // NOTE: the simlpe Loading... text to be removed when a proper loader is defined
  return <>{isFetching ? <p>Loading...</p> : props.children}</>;
};

export default QueryLoader;
