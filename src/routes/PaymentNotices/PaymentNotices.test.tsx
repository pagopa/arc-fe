import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotices } from './PaymentNotices';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from 'store/GlobalStore';
import { useMediaQuery } from '@mui/material';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

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

describe('PaymentNoticeRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({ state: { paymentNotice: null } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <PaymentNotices />
      </MemoryRouter>
    );
  });
});
