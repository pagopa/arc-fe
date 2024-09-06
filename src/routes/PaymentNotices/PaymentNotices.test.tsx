import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotices } from '.';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from 'store/GlobalStore';
import { useMediaQuery } from '@mui/material';
import utils from 'utils';
import converters from 'utils/converters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  storage: {
    pullPaymentsOptIn: {
      set: () => true,
      get: () => {
        return { value: true };
      }
    }
  },
  config: {
    checkoutHost: 'string'
  },
  loaders: {
    getPaymentNotices: jest.fn()
  }
}));
jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));
jest.mock('store/PaymentNoticeStore', () => ({
  paymentNoticeState: { removeItem: jest.fn(), state: null }
}));
jest.mock('utils/converters', () => ({
  prepareNoticesData: jest.fn()
}));

describe('PaymentNoticeRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({ state: { paymentNotice: null } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    const mockQueryResult = {
      data: [
        { id: 1, notice: 'Notice 1' },
        { id: 2, notice: 'Notice 2' }
      ]
    };
    const mockNormalizedData = {
      paymentNotices: [
        { id: 1, normalizedNotice: 'Normalized Notice 1' },
        { id: 2, normalizedNotice: 'Normalized Notice 2' }
      ]
    };
    const queryClient = new QueryClient();

    (utils.loaders.getPaymentNotices as jest.Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as jest.Mock).mockReturnValue(mockNormalizedData);
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PaymentNotices />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  it('renders without crashing no payment notices', () => {
    const mockQueryResult = { data: null };
    const mockNormalizedData = null;
    const queryClient = new QueryClient();

    (utils.loaders.getPaymentNotices as jest.Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as jest.Mock).mockReturnValue(mockNormalizedData);
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PaymentNotices />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });
  it('renders without crashing empty notice array', () => {
    const mockQueryResult = { data: [] };
    const mockNormalizedData = { paymentNotice: [] };
    const queryClient = new QueryClient();

    (utils.loaders.getPaymentNotices as jest.Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as jest.Mock).mockReturnValue(mockNormalizedData);
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PaymentNotices />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });
});
