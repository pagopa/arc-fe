import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Transaction from '.';
import '@testing-library/jest-dom';
import utils from 'utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
jest.mock('utils', () => ({
  ...jest.requireActual('utils'),

  loaders: {
    getTransactions: jest.fn(),
    getTransactionDetails: jest.fn()
  },
  converters: {
    prepareRowsData: jest.fn(),
    prepareTransactionDetailData: jest.fn()
  },
  config: {
    checkoutHost: 'test'
  }
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLoaderData: jest.fn()
}));

describe('TransactionRoute', () => {
  const mockTransactions = {
    transactions: [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true }
    ]
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
      data: mockTransactions,
      isError: false
    });
    (utils.loaders.getTransactionDetails as jest.Mock).mockReturnValue({
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
    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
      data: null,
      isError: true
    });
    (utils.loaders.getTransactionDetails as jest.Mock).mockReturnValue({
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
