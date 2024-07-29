import { useLocation } from 'react-router-dom';

function useQueryParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());

  return params;
}

export default useQueryParams;
