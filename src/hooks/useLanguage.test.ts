import { renderHook, act } from '@testing-library/react';
import { useLanguage } from './useLanguage';

describe('useLanguage hook', () => {
  it('should return the initial default it language correctly', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.language).toBe('it');
  });

  it('should change the language to en correctly passing the langCode as argument to changeLanguage', () => {
    const { result } = renderHook(() => useLanguage());
    act(() => {
      result.current.changeLanguage('en');
    });
    expect(result.current.language).toBe('en');
  });
});
