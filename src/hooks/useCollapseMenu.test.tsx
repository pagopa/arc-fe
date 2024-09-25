import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import useCollapseMenu from './useCollapseMenu';
import { Mock } from 'vitest';

vi.mock(import('@mui/material'), async (importOriginal) => ({
  ...(await importOriginal()),
  useMediaQuery: vi.fn()
}));

describe('useCollapseMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize correctly', () => {
    (useMediaQuery as Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));
    rerender();
    expect(result.current.collapsed).toBe(false);
  });

  it('should collapse menu when transitioning from above to below "lg" breakpoint', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));

    expect(result.current.collapsed).toBe(false);

    // Change mock to simulate breakpoint transition
    vi.mocked(useMediaQuery).mockReturnValue(true);

    // Re-render hook to apply changes
    rerender();

    expect(result.current.collapsed).toBe(true);
  });

  it('should collapse menu when transitioning from below to above "lg" breakpoint', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));

    expect(result.current.collapsed).toBe(false);

    // Change mock to simulate breakpoint transition
    vi.mocked(useMediaQuery).mockReturnValue(false);

    rerender();

    expect(result.current.collapsed).toBe(false);
  });

  it('should not collapse menu when not transitioning above the "lg" breakpoint', () => {
    (useMediaQuery as Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));

    expect(result.current.collapsed).toBe(false);

    (useMediaQuery as Mock).mockReturnValue(false);

    rerender();

    expect(result.current.collapsed).toBe(false);
  });
});
