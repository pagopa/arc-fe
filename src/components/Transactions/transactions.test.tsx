import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { TransactionsList, TransactionsListProps } from '.';
import '@testing-library/jest-dom';
import i18n from 'translations/i18n';
import { useMediaQuery } from '@mui/material';

void i18n.init({
  resources: {}
});

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn()
}));

const TransactionsWithRouter = (props: TransactionsListProps) => (
  <MemoryRouter>
    <TransactionsList {...props} />
  </MemoryRouter>
);

describe('Transactions table component', () => {
  it('should render as expected', () => {
    (useMediaQuery as ReturnType<typeof jest.fn>).mockImplementationOnce(() => true);
    render(<TransactionsWithRouter rows={dummyTransactionsData.all} />);
  });

  it('should render the expected rows', () => {
    render(<TransactionsWithRouter rows={dummyTransactionsData.all} />);
    const rows = screen.getAllByRole('button');
    expect(rows.length).toBe(4);
  });
});
