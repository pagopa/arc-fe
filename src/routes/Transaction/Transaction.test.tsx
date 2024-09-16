import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Transaction from '.';
import '@testing-library/vi-dom';
import utils from 'utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
vi.mock('utils', () => ({
  ...vi.importActual('utils'),

  loaders: {
    getTransactions: vi.fn(),
    getTransactionDetails: vi.fn()
  },
  converters: {
    prepareRowsData: vi.fn(),
    prepareTransactionDetailData: vi.fn()
  },
  config: {
    checkoutHost: 'test'
  }
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLoaderData: vi.fn()
}));

describe('TransactionRoute', () => {
  const mockTransactions = {
    transactions: [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true }
    ]
  };

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders without crashing', async () => {
    (utils.loaders.getTransactions as Mock).mockReturnValue({
      data: mockTransactions,
      isError: false
    });
    (utils.loaders.getTransactionDetails as Mock).mockReturnValue({
      data: mockTransactions.transactions[0],
      isError: false
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Transaction />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(utils.loaders.getTransactionDetails).toHaveBeenCalled();
    });
  });

  it('renders without crashing error', async () => {
    (utils.loaders.getTransactions as Mock).mockReturnValue({
      data: null,
      isError: true
    });
    (utils.loaders.getTransactionDetails as Mock).mockReturnValue({
      data: null,
      isError: true
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Transaction />
      </QueryClientProvider>
    );
  });
});
