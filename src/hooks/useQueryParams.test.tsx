import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import useQueryParams from './useQueryParams';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: () => new URL('http://dummysite.it/login?state=test123&code=CODE123')
}));

describe('useQueryParams hook', () => {
  it('should return the params called `state` and `code`', () => {
    const { result } = renderHook(useQueryParams);
    const { state, code } = result.current;
    expect(state).toBe('test123');
    expect(code).toBe('CODE123');
  });
  it('should return an undefined param called `greeting`', () => {
    const { result } = renderHook(useQueryParams);
    const { greeting } = result.current;
    expect(greeting).toBe(undefined);
  });
});
