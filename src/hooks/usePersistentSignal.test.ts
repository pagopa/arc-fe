import { renderHook, act } from '@testing-library/react';
import { effect, signal } from '@preact/signals-react';
import { usePersistentSignal } from './usePersistentSignal';
import { Mock } from 'vitest';

vi.mock('@preact/signals-react', () => ({
  effect: vi.fn(),
  signal: vi.fn()
}));

describe('usePersistentSignal', () => {
  let mockSignal: { value: unknown };
  let mockEffectCleanup;

  beforeEach(() => {
    mockSignal = { value: undefined };
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockClear();
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockClear();
    vi.spyOn(window.localStorage.__proto__, 'removeItem').mockClear();

    (signal as Mock).mockImplementation(() => mockSignal);
    (effect as Mock).mockImplementation((callback) => {
      mockEffectCleanup = callback();
      return mockEffectCleanup;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with the value from localStorage', () => {
    const key = 'testKey';
    const storedValue = { foo: 'bar' };
    localStorage.setItem(key, JSON.stringify(storedValue));

    renderHook(() => usePersistentSignal(key));

    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(signal).toHaveBeenCalledWith(storedValue);
  });

  it('should initialize with the default value if no value in localStorage', () => {
    const key = 'testKey';
    const initialValue = { foo: 'bar' };

    renderHook(() => usePersistentSignal(key, { storage: localStorage, initialValue }));

    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(signal).toHaveBeenCalledWith(initialValue);
  });

  it('should remove the item from localStorage when removeItem is called', () => {
    const key = 'testKey';
    const { result } = renderHook(() => usePersistentSignal(key));

    act(() => {
      result.current.removeItem();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should throw error and return value if json is invalid', () => {
    const key = 'testKey';
    const logSpy = vi.spyOn(global.console, 'error');

    localStorage.setItem(key, 'invalid json');

    renderHook(() => usePersistentSignal(key, { storage: localStorage, initialValue: 'test' }));

    expect(logSpy).toHaveBeenCalled();
    expect(signal).toHaveBeenCalledWith('test');
  });
});
