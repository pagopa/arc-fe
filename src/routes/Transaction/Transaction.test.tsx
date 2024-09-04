import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Transaction from './Transaction';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import utils from 'utils';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  storage: {
    pullPaymentsOptIn: {
      set: () => true,
      get: () => true
    }
  },
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

describe('TransactionRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);
  const setState = jest.fn();
  const mockTransactions = {
    transactions: [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true }
    ]
  };

  //const preparedData = [{ id: '1' }, { id: '2' }];
  (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
    data: mockTransactions,
    isError: false
  });

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({ setState });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Transaction />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(utils.loaders.getTransactions).toHaveBeenCalled();
    });
  });
});
