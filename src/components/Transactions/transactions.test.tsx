import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { TransactionsList, TransactionsListProps } from '.';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

vi.mock(import('@mui/material'), async (importActual) => ({
  ...(await importActual()),
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
