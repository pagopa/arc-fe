import React from 'react';
import { render, waitFor } from '@testing-library/react';
import TransactionsList from '.';
import '@testing-library/jest-dom';
import utils from 'utils';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
jest.mock('utils', () => ({
  ...jest.requireActual('utils'),

  loaders: {
    getTransactions: jest.fn()
  },
  converters: {
    prepareRowsData: jest.fn()
  },
  config: {
    checkoutHost: 'test'
  }
}));
jest.mock('@mui/material/useMediaQuery', () => jest.fn());

jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('TransactionListRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    const mockTransactions = {
      transactions: [
        { id: '1', paidByMe: true, registeredToMe: false },
        { id: '2', paidByMe: false, registeredToMe: true }
      ]
    };

    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
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
    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
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
