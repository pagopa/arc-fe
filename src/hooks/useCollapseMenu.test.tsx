import { renderHook } from '@testing-library/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import useCollapseMenu from './useCollapseMenu';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('useCollapseMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));
    rerender();
    expect(result.current.collapsed).toBe(false);
  });

  it('should collapse menu when transitioning from above to below "lg" breakpoint', () => {
    const mockBreakpointsDown = jest.fn();

    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));
    rerender();

    expect(result.current.collapsed).toBe(false);

    // Change mock to simulate breakpoint transition
    mockBreakpointsDown.mockReturnValue(true);
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    // Re-render hook to apply changes
    rerender();

    expect(result.current.collapsed).toBe(true);
  });

  it('should collapse menu when transitioning from below to above "lg" breakpoint', () => {
    const mockBreakpointsDown = jest.fn();

    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));
    rerender();

    expect(result.current.collapsed).toBe(false);

    // Change mock to simulate breakpoint transition
    mockBreakpointsDown.mockReturnValue(false);
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    rerender();

    expect(result.current.collapsed).toBe(false);
  });

  it('should not collapse menu when not transitioning above the "lg" breakpoint', () => {
    const mockBreakpointsDown = jest.fn();

    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useCollapseMenu(false));

    expect(result.current.collapsed).toBe(false);

    mockBreakpointsDown.mockReturnValue(false);
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    rerender();

    expect(result.current.collapsed).toBe(false);
  });
});
