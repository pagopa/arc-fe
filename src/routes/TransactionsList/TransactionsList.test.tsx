import React from 'react';
import { render, waitFor } from '@testing-library/react';
import TransactionsList from '.';
import '@testing-library/vi-dom';
import utils from 'utils';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
vi.mock('utils', () => ({
  ...vi.importActual('utils'),

  loaders: {
    getTransactions: vi.fn()
  },
  converters: {
    prepareRowsData: vi.fn()
  },
  config: {
    checkoutHost: 'test'
  }
}));
vi.mock('@mui/material/useMediaQuery', () => vi.fn());

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('TransactionListRoute', () => {
  (useMediaQuery as Mock).mockReturnValue(false);

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders without crashing', async () => {
    const mockTransactions = {
      transactions: [
        { id: '1', paidByMe: true, registeredToMe: false },
        { id: '2', paidByMe: false, registeredToMe: true }
      ]
    };

    (utils.loaders.getTransactions as Mock).mockReturnValue({
      data: mockTransactions,
      isError: false
    });
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionsList />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(utils.loaders.getTransactions).toHaveBeenCalled();
    });
  });
  it('renders with error', async () => {
    (utils.loaders.getTransactions as Mock).mockReturnValue({
      data: null,
      isError: true
    });
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionsList />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(utils.loaders.getTransactions).toHaveBeenCalled();
    });
  });
});
