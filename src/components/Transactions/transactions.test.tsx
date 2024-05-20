import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { dummyTransactionsData } from 'stories/utils/mocks';
import Transactions, { TransactionsProps } from './Transactions';
import '@testing-library/jest-dom';
import i18n from 'translations/i18n';

void i18n.init({
  resources: {}
});

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const TransactionsWithRouter = (props: TransactionsProps) => (
  <MemoryRouter>
    <Transactions {...props} />
  </MemoryRouter>
);

describe('Transactions table component', () => {
  it('should render as expected', () => {
    render(<TransactionsWithRouter rows={dummyTransactionsData.all} />);
  });

  it('should render the expected rows', () => {
    render(<TransactionsWithRouter rows={dummyTransactionsData.all} />);

    const rows = screen.getAllByRole('button');

    expect(rows.length).toBe(4);
  });
});
