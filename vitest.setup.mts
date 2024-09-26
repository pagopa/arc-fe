import { vi } from 'vitest';
import { i18nTestSetup } from './src/__tests__/i18nTestSetup';

i18nTestSetup({});

vi.mock('@preact/signals-react', () => {
  return {
    __esModule: true,
    signal: vi.fn().mockImplementation(() => {
      return {};
    }),
  };
});

