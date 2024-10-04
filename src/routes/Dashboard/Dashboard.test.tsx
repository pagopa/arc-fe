import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import Dashboard from '.';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from 'hooks/useUserInfo';
import converters from 'utils/converters';
import loaders from 'utils/loaders';
import storage from 'utils/storage';
import { Mock } from 'vitest';
import { Signal } from '@preact/signals-react';
import { i18nTestSetup } from '__tests__/i18nTestSetup';
import { ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';

i18nTestSetup({
  app: {
    dashboard: {
      title: 'greetings, {{username}}'
    },
    paymentNotice: {
      preview: {
        title: 'notice preview title'
      }
    }
  }
});

vi.mock('utils/converters');
vi.mock('utils/loaders');

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: vi.fn()
}));

vi.mock('hooks/useUserInfo', () => ({
  useUserInfo: vi.fn()
}));

describe('DashboardRoute', () => {
  const queryClient = new QueryClient();
  const navigate = vi.fn();
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

  beforeAll(() => {
    vi.mocked(useNavigate).mockReturnValue(navigate);
    converters.prepareRowsData = mockPrepareRowsData;

    vi.mocked(loaders.getTransactions as Mock).mockReturnValue({
      data: mockTransactions,
      isError: false
    });

    Object.defineProperty(document.documentElement, 'lang', { value: 'it', configurable: true });
  });

  afterAll(() => {});

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({ setState });
    (useUserInfo as Mock).mockReturnValue({
      userInfo: {
        name: 'test',
        familyName: 'test'
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const DashboardWithState = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  it('renders without crashing', async () => {
    render(<DashboardWithState />);
    await waitFor(() => {
      expect(loaders.getTransactions).toHaveBeenCalled();
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
    (loaders.getTransactions as Mock).mockReturnValueOnce({
      data: mockTransactions,
      isError: true
    });

    render(<DashboardWithState />);
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });

  it('shows the payment notice when opt-in is not set', async () => {
    vi.spyOn(storage.pullPaymentsOptIn, 'get').mockReturnValueOnce({
      value: false
    } as unknown as Signal<boolean>);

    render(<DashboardWithState />);
    await waitFor(() => {
      expect(screen.getByText('notice preview title')).toBeInTheDocument(); // Check if payment notice is rendered
    });
  });

  it('displays correct user info in the dashboard title', async () => {
    render(<DashboardWithState />);
    await waitFor(() => {
      expect(screen.getByText('greetings, test test')).toBeInTheDocument(); // Assuming 'Welcome' is part of the t function
    });
  });
});
