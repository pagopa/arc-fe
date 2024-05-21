import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import '../translations/i18n';
import useCollapseMenu from './useCollapseMenu';

describe('useCollapseMenu hook', () => {
  it('should return the inital menu status', () => {
    const { result } = renderHook(() => useCollapseMenu(false));
    expect(result.current.collapsed).toBe(false);
  });

  it('should change correctly the menu status state calling the useCollapseMenu function', () => {
    const { result } = renderHook(() => useCollapseMenu(false));
    act(() => {
      result.current.changeMenuState(false);
    });
    expect(result.current.collapsed).toBe(true);
  });
});