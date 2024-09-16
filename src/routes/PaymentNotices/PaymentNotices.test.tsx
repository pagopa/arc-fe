import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotices } from '.';
import '@testing-library/vi-dom';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from 'store/GlobalStore';
import { useMediaQuery } from '@mui/material';
import utils from 'utils';
import converters from 'utils/converters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@mui/material/useMediaQuery', () => vi.fn());

vi.mock('utils', () => ({
  ...vi.importActual('utils'),
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
    getPaymentNotices: vi.fn()
  }
}));
vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('store/PaymentNoticeStore', () => ({
  paymentNoticeState: { removeItem: vi.fn(), state: null }
}));
vi.mock('utils/converters', () => ({
  prepareNoticesData: vi.fn()
}));

describe('PaymentNoticeRoute', () => {
  (useMediaQuery as Mock).mockReturnValue(false);

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({ state: { paymentNotice: null } });
  });

  afterEach(() => {
    vi.clearAllMocks();
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
        { id: 1, normalizedNotice: 'Normalized Notice 1', image: { src: '' } },
        { id: 2, normalizedNotice: 'Normalized Notice 2', image: { src: '' } }
      ]
    };
    const queryClient = new QueryClient();

    (utils.loaders.getPaymentNotices as Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as Mock).mockReturnValue(mockNormalizedData);
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

    (utils.loaders.getPaymentNotices as Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as Mock).mockReturnValue(mockNormalizedData);
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

    (utils.loaders.getPaymentNotices as Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as Mock).mockReturnValue(mockNormalizedData);
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PaymentNotices />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });
});
