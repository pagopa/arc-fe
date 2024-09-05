import React from 'react';
import { render } from '@testing-library/react';
import Resources from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useQueryParams from 'hooks/useQueryParams';

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useLoaderData: jest.fn()
}));
jest.mock('hooks/useQueryParams', () => jest.fn());

describe('UserRoute', () => {
  (useQueryParams as jest.Mock).mockReturnValue({ resource: 'jest.fn()' });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).OneTrust = 'mocked value';
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (global as any).OneTrust;
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Resources />
      </QueryClientProvider>
    );
  });
});
