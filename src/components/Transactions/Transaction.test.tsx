import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import Transaction from './Transaction';
import { BrowserRouter } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn()
}));

const { name, altImg, srcImg } = dummyTransactionsData.all[0].payee;
const { date, amount, id } = dummyTransactionsData.all[0];
const { label } = dummyTransactionsData.all[0].status;

describe('Transaction row table component', () => {
  it('should call a function to perform a router update on click', () => {
    (useMediaQuery as ReturnType<typeof jest.fn>).mockImplementation(() => false);
    render(
      <BrowserRouter>
        <Transaction
          payee={{
            name,
            srcImg
          }}
          date={date}
          status={{
            label,
            color: 'success'
          }}
          amount={amount}
          id={id}
        />
      </BrowserRouter>
    );

    const button = screen.getByTestId('transaction-details-button');
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenLastCalledWith(`/transactions/${id}`);
  });

  it('should render without problems', () => {
    (useMediaQuery as ReturnType<typeof jest.fn>).mockImplementation(() => true);
    render(
      <BrowserRouter>
        <Transaction
          payee={{
            name,
            srcImg,
            altImg
          }}
          date={date}
          status={{
            label,
            color: 'success'
          }}
          amount={amount}
          id={id}
        />
      </BrowserRouter>
    );
  });
});
