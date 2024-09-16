import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { TransactionsList, TransactionsListProps } from '.';
import '@testing-library/vi-dom';
import i18n from 'translations/i18n';
import { useMediaQuery } from '@mui/material';

void i18n.init({
  resources: {}
});

vi.mock('@mui/material', () => ({
  ...vi.importActual('@mui/material'),
  useMediaQuery: vi.fn()
}));

const TransactionsWithRouter = (props: TransactionsListProps) => (
  <MemoryRouter>
    <TransactionsList {...props} />
  </MemoryRouter>
);

describe('Transactions table component', () => {
  it('should render as expected', () => {
    (useMediaQuery as ReturnType<typeof vi.fn>).mockImplementationOnce(() => true);
    render(<TransactionsWithRouter rows={dummyTransactionsData.all} />);
  });

  it('should render the expected rows', () => {
    render(<TransactionsWithRouter rows={dummyTransactionsData.all} />);
    const rows = screen.getAllByRole('button');
    expect(rows.length).toBe(4);
  });
});
