import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotices } from '.';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import * as GlobalStore from 'store/GlobalStore';
import converters from 'utils/converters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Mock } from 'vitest';
import { State, StoreContextProps } from 'store/types';
import loaders from 'utils/loaders';
import { useMediaQuery } from '@mui/material';

vi.mock(import('@mui/material'), async (importActual) => ({
  ...(await importActual()),
  useMediaQuery: vi.fn()
}));
vi.mock('utils/loaders');
vi.mock('utils/converters');

vi.mock(import('@preact/signals-react'), async (importOriginal) => ({
  ...(await importOriginal())
}));

vi.mock('./store/PaymentNoticeStore', () => ({
  paymentNoticeState: { removeItem: vi.fn(), state: null }
}));
vi.mock('./utils/converters');

vi.mock(import('utils/storage'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    pullPaymentsOptIn: {
      get: { value: true },
      set: vi.fn()
    }
  };
});

describe('PaymentNoticeRoute', () => {
  (useMediaQuery as Mock).mockReturnValue(false);

  beforeEach(() => {
    vi.spyOn(GlobalStore, 'useStore').mockReturnValue({
      state: { paymentNotice: undefined } as State
    } as StoreContextProps);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const WrappedPaymentNotices = () => {
    const queryClient = new QueryClient();
    return (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PaymentNotices />
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

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

    (loaders.getPaymentNotices as Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as Mock).mockReturnValue(mockNormalizedData);

    render(<WrappedPaymentNotices />);
  });

  it('renders without crashing no payment notices', () => {
    const mockQueryResult = { data: null };
    const mockNormalizedData = null;

    (loaders.getPaymentNotices as Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as Mock).mockReturnValue(mockNormalizedData);
    render(<WrappedPaymentNotices />);
  });
  it('renders without crashing empty notice array', () => {
    const mockQueryResult = { data: [] };
    const mockNormalizedData = { paymentNotice: [] };

    (loaders.getPaymentNotices as Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as Mock).mockReturnValue(mockNormalizedData);
    render(<WrappedPaymentNotices />);
  });
});
