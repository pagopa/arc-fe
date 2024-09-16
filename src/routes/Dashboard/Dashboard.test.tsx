import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import Dashboard from '.';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import utils from 'utils';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from 'hooks/useUserInfo';

const queryClient = new QueryClient();
vi.mock('utils', () => ({
  ...vi.importActual('utils'),
  storage: {
    pullPaymentsOptIn: {
      set: () => true,
      get: vi.fn()
    }
  },
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
vi.mock('hooks/useUserInfo', () => ({
  useUserInfo: vi.fn()
}));

describe('DashboardRoute', () => {
  (useMediaQuery as Mock).mockReturnValue(false);
  const navigate = vi.fn();
  (useNavigate as Mock).mockReturnValue(navigate);
  const setState = vi.fn();
  const mockTransactions = {
    transactions: [
      { id: '1', payeeName: 'clickable', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true }
    ]
  };

  const preparedData = [
    { id: '1', payee: { name: 'clickable', srcImg: '', altImg: '' }, action: vi.fn() }
  ];

  const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
  utils.converters.prepareRowsData = mockPrepareRowsData;

  (utils.loaders.getTransactions as Mock).mockReturnValue({
    data: mockTransactions,
    isError: false
  });
  Object.defineProperty(document.documentElement, 'lang', { value: 'it', configurable: true });

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({ setState });
    (useUserInfo as Mock).mockReturnValue({
      userInfo: {
        name: 'test',
        familyName: 'test'
      }
    });
    (utils.storage.pullPaymentsOptIn.get as Mock).mockReturnValue({ value: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const DashboardWithState = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );
  };

  it('renders without crashing', async () => {
    render(<DashboardWithState />);
    await waitFor(() => {
      expect(utils.loaders.getTransactions).toHaveBeenCalled();
    });
  });

  it('redirects to transaction detail page', async () => {
    render(<DashboardWithState />);
    fireEvent.click(screen.getByText('clickable'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(expect.anything()); // Assert navigation was called
    });
  });

  it('renders a retry page if there is an error', async () => {
    (utils.loaders.getTransactions as Mock).mockReturnValueOnce({
      data: mockTransactions,
      isError: true
    });

    render(<DashboardWithState />);
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });

  it('shows the payment notice when opt-in is not set', async () => {
    (utils.storage.pullPaymentsOptIn.get as Mock).mockReturnValueOnce({ value: false });

    render(<DashboardWithState />);
    await waitFor(() => {
      expect(screen.getByText('Cerca i tuoi avvisi di pagamento pagoPA')).toBeInTheDocument(); // Check if payment notice is rendered
    });
  });

  it('displays correct user info in the dashboard title', async () => {
    render(<DashboardWithState />);
    await waitFor(() => {
      expect(screen.getByText('Ciao, test test')).toBeInTheDocument(); // Assuming 'Welcome' is part of the t function
    });
  });
});
