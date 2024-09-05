import React from 'react';
import { render } from '@testing-library/react';
import AuthCallback from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();



jest.mock('react-router-dom', () => ({
  useLoaderData: jest.fn()
}));

describe('AuthCallBack route', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthCallback />
      </QueryClientProvider>
    );
  });
});
