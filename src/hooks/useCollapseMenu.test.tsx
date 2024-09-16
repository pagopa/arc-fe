import { renderHook } from '@testing-library/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import useCollapseMenu from './useCollapseMenu';
import { Mock } from 'vitest';

vi.mock('@mui/material/useMediaQuery', () => vi.fn());

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
    const mockBreakpointsDown = vi.fn();

    (useMediaQuery as Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));
    rerender();

    expect(result.current.collapsed).toBe(false);

    // Change mock to simulate breakpoint transition
    mockBreakpointsDown.mockReturnValue(true);
    (useMediaQuery as Mock).mockReturnValue(true);

    // Re-render hook to apply changes
    rerender();

    expect(result.current.collapsed).toBe(true);
  });

  it('should collapse menu when transitioning from below to above "lg" breakpoint', () => {
    const mockBreakpointsDown = vi.fn();

    (useMediaQuery as Mock).mockReturnValue(true);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));
    rerender();

    expect(result.current.collapsed).toBe(false);

    // Change mock to simulate breakpoint transition
    mockBreakpointsDown.mockReturnValue(false);
    (useMediaQuery as Mock).mockReturnValue(false);

    rerender();

    expect(result.current.collapsed).toBe(false);
  });

  it('should not collapse menu when not transitioning above the "lg" breakpoint', () => {
    const mockBreakpointsDown = vi.fn();

    (useMediaQuery as Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));

    expect(result.current.collapsed).toBe(false);

    mockBreakpointsDown.mockReturnValue(false);
    (useMediaQuery as Mock).mockReturnValue(false);

    rerender();

    expect(result.current.collapsed).toBe(false);
  });
});
