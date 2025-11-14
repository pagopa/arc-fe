import { useState, useEffect } from 'react';
import utils from '../utils';

/**
 * Hook that listens to window hash changes and returns the decoded hash parameters as an object.
 */
export const useHashParamsListener = <
  T extends Record<string, unknown> = Record<string, unknown>
>() => {
  const decodeHash = (): T => {
    const rawHash = window.location.hash.startsWith('#')
      ? window.location.hash.substring(1)
      : window.location.hash;
    try {
      return utils.URI.decode(rawHash) as T;
    } catch {
      return {} as T; // Return empty object in case of parse errors
    }
  };

  const [hashParams, setHashParams] = useState<T>(decodeHash);

  useEffect(() => {
    const onHashChange = () => {
      setHashParams(decodeHash());
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('hashchangeCustom', onHashChange);

    onHashChange();

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('hashchangeCustom', onHashChange);
    };
  }, []);

  return hashParams;
};
