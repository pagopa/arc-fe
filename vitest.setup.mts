import { vi } from 'vitest';

vi.mock('@preact/signals-react', () => {
  return {
    __esModule: true,
    signal: vi.fn().mockImplementation(() => {
      return {};
    }),
  };
});

