import React from 'react';
import { render } from '@testing-library/react';
import Assistance from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('AssistanceRoute', () => {
  const queryClient = new QueryClient();

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Assistance />
      </QueryClientProvider>
    );
  });
});
