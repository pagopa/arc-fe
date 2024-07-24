import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import '../translations/i18n';
import useCollapseMenu from './useCollapseMenu';

describe('useCollapseMenu hook', () => {
  it('should return the inital menu status', async () => {
    const { rerender, result } = renderHook(() => useCollapseMenu(false));

    rerender();

    expect(result.current.collapsed).toBe(false);
  });

  it('should change correctly the menu status state calling the useCollapseMenu function', async () => {
    const { rerender, result } = renderHook(() => useCollapseMenu(false));

    rerender();

    act(() => {
      result.current.changeMenuState();
      rerender();
    });
    expect(result.current.collapsed).toBe(true);
  });
});
