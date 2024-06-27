import React from 'react';
import { render } from '@testing-library/react';
import { TransactionListSkeleton, TransactionDetailsSkeleton } from './';
import useMediaQuery from '@mui/material/useMediaQuery';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('TransactionListSkeleton component', () => {
  it('should render as expected', () => {
    render(<TransactionListSkeleton />);
  });
});

describe('TransactionDetailsSkeleton component', () => {
  it('should render as expected', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    render(<TransactionDetailsSkeleton />);
  });
});
