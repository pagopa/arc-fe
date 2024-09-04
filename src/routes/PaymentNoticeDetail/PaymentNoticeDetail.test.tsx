import React from 'react';
import { render } from '@testing-library/react';
import PaymentNoticeDetail from './PaymentNoticeDetail';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from 'store/GlobalStore';

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  storage: {
    pullPaymentsOptIn: {
      set: () => true,
      get: () => true
    }
  }
}));
jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));
jest.mock('store/PaymentNoticeStore', () => ({
  paymentNoticeState: { removeItem: jest.fn(), state: null }
}));

describe('PaymentNoticeDetailRoute', () => {
  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({ state: { paymentNotice: null } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <PaymentNoticeDetail />
      </MemoryRouter>
    );
  });
});
