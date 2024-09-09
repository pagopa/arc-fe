import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import Dashboard from '.';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import utils from 'utils';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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

describe('DashboardRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);
  const setState = jest.fn();
  const mockTransactions = {
    transactions: [
      { id: '1', payeeName: 'clickable', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true }
    ]
  };

  const preparedData = [
    { id: '1', payee: { name: 'clickable', srcImg: '', altImg: '' }, action: jest.fn() }
  ];

  const mockPrepareRowsData = jest.fn().mockReturnValue(preparedData);
  utils.converters.prepareRowsData = mockPrepareRowsData;

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
        <Dashboard />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(utils.loaders.getTransactions).toHaveBeenCalled();
    });
  });

  it('redirects to transaction detail page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText('clickable'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalled();
    });
  });

  it('renders a retry page if there is an error', async () => {
    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
      data: mockTransactions,
      isError: true
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });
});