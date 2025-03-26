import { renderHook, act } from '@testing-library/react';
import { useLanguage } from './useLanguage';
import i18n from '../translations/i18n';

describe('useLanguage hook', () => {
  it('should change the language to en correctly passing the langCode as argument to changeLanguage', () => {
    const { result } = renderHook(useLanguage);
    act(() => {
      result.current.changeLanguage('en');
    });
    expect(result.current.language).toBe('en');
  });

  it('should return the initial language correctly', () => {
    vi.spyOn(i18n, 'resolvedLanguage', 'get').mockReturnValue('it');
    const { result } = renderHook(useLanguage);
    expect(result.current.language).toBe('it');
  });
});
