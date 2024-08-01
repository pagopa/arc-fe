import { effect, signal } from '@preact/signals-react';

export function usePersistentSignal<T>(key: string, initialValue?: T) {
  // Initialize the signal with either the saved value or the default
  const getStoredValue = () => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return initialValue;
    } catch (e) {
      console.error('Failed to parse stored value for key:', key, e);
      return initialValue;
    }
  };

  const state = signal<T>(getStoredValue());

  // Sync state with localStorage
  effect(() => {
    if (state.value) {
      try {
        localStorage.setItem(key, JSON.stringify(state.value));
      } catch (e) {
        console.error('Failed to save value to localStorage for key:', key, e);
      }
    }
  });

  return state;
}
