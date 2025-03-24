import React from 'react';
import { render } from '@testing-library/react';
import Resources from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useQueryParams from 'hooks/useQueryParams';
import { Mock } from 'vitest';

const queryClient = new QueryClient();

vi.mock(import('react-router-dom'), async (importActual) => ({
  ...(await importActual()),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
  useLoaderData: vi.fn()
}));

vi.mock('hooks/useQueryParams');

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

  it('renders tos without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Resources resource="tos" />
      </QueryClientProvider>
    );
  });

  it('renders pp without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Resources resource="pp" />
      </QueryClientProvider>
    );
  });
});
