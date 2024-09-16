import React from 'react';
import { render } from '@testing-library/react';
import Resources from '.';
import '@testing-library/vi-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useQueryParams from 'hooks/useQueryParams';
import { Mock } from 'vitest';

const queryClient = new QueryClient();

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
  useLoaderData: vi.fn()
}));
vi.mock('hooks/useQueryParams', () => vi.fn());

describe('UserRoute', () => {
  (useQueryParams as Mock).mockReturnValue({ resource: 'vi.fn()' });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).OneTrust = 'mocked value';
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (global as any).OneTrust;
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Resources />
      </QueryClientProvider>
    );
  });
});
