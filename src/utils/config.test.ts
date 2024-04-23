import { renderHook, act } from '@testing-library/react';
import utils from '.';

describe('useLanguage hook', () => {
  it('should return the inital default it language correctly', () => {
    const { result } = renderHook(() => utils.hooks.useLanguage());
    expect(result.current.language).toBe('it');
  });

  it('should change the language to en correctly passing the langCode as argument to changeLanguage', () => {
    const { result } = renderHook(() => utils.hooks.useLanguage());
    act(() => {
      result.current.changeLanguage('en');
    });
    expect(result.current.language).toBe('en');
  });
});
