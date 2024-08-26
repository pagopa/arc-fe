import { effect, signal } from '@preact/signals-react';

export type PersistentSignalOptions<T> = {
  storage: Storage;
  initialValue?: T;
};

export function usePersistentSignal<T>(
  key: string,
  options: PersistentSignalOptions<T> = {
    initialValue: undefined,
    storage: localStorage
  }
) {
  // Initialize the signal with either the saved value or the default
  const getStoredValue = () => {
    try {
      const storedValue = options.storage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return options.initialValue;
    } catch (e) {
      console.error('Failed to parse stored value for key:', key, e);
      return options.initialValue;
    }
  };

  const state = signal<T>(getStoredValue());

  const removeItem = () => {
    options.storage.removeItem(key);
  };

  effect(() => {
    if (state.value) {
      try {
        options.storage.setItem(key, JSON.stringify(state.value));
      } catch (e) {
        console.error('Failed to save value to localStorage for key:', key, e);
      }
    }
  });

  return { state, removeItem };
}
