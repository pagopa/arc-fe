import React from 'react';
import { render } from '@testing-library/react';
import PaymentNoticeDetail from './index';
import '@testing-library/vi-dom';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from 'store/GlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('store/PaymentNoticeStore', () => ({
  paymentNoticeState: { removeItem: vi.fn(), state: null }
}));

const queryClient = new QueryClient();

describe('PaymentNoticeDetailRoute', () => {
  it('renders without crashing empty notice', () => {
    (useStore as Mock).mockReturnValue({ state: { paymentNotice: null } });

    render(
      <MemoryRouter>
        <PaymentNoticeDetail />
      </MemoryRouter>
    );
  });
  it('renders without crashing', () => {
    const notice = {
      debtorFullName: 'ACI Automobile Club Italia',
      debtorTaxCode: 'HSLZYB90L59D030S',
      debtorType: 'F',
      image: { alt: 'ACI', src: 'string' }
    };
    (useStore as Mock).mockReturnValue({ state: { paymentNotice: notice } });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PaymentNoticeDetail />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });
});
