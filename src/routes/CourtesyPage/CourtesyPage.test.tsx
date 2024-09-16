import React from 'react';
import { render } from '@testing-library/react';
import { CourtesyPage } from '.';
import '@testing-library/vi-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

vi.mock('react-router-dom', () => ({
  useLoaderData: vi.fn()
}));

describe('UserRoute', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CourtesyPage />
      </QueryClientProvider>
    );
  });
});
