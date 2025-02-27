import React from 'react';
import { render } from '@testing-library/react';
import {
  TransactionListSkeleton,
  TransactionDetailsSkeleton,
  PaymentNoticesListSkeleton,
  UserInfoSkeleton,
  PaymentNoticeDetails
} from '.';
import { useMediaQuery } from '@mui/material';

vi.mock('@mui/material', async (importActual) => ({
  ...(await importActual()),
  useMediaQuery: vi.fn()
}));

describe('TransactionListSkeleton component', () => {
  it('should render as expected', () => {
    render(<TransactionListSkeleton />);
  });
});

describe('TransactionDetailsSkeleton component', () => {
  it('should render as expected', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<TransactionDetailsSkeleton />);
  });
});

describe('PaymentNoticesListSkeleton component', () => {
  it('should render as expected', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<PaymentNoticesListSkeleton />);
  });
});

describe('UserInfoSkeleton component', () => {
  it('should render as expected', () => {
    render(<UserInfoSkeleton />);
  });
});

describe('UserInfoSkeleton component', () => {
  it('should render as expected', () => {
    render(<PaymentNoticeDetails />);
  });
});
