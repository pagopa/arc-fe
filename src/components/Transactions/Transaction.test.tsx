import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { Transaction } from './';
import { BrowserRouter } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { ArcRoutes } from 'routes/routes';
import utils from 'utils';

const mockedUsedNavigate = vi.fn();

vi.mock(import('react-router-dom'), async (importActual) => ({
  ...(await importActual()),
  useNavigate: () => mockedUsedNavigate
}));

vi.mock(import('@mui/material'), async (importActual) => ({
  ...(await importActual()),
  useMediaQuery: vi.fn()
}));

const { name, altImg, srcImg } = dummyTransactionsData.all[0].payee;
const { date, amount, id } = dummyTransactionsData.all[0];
const { label } = dummyTransactionsData.all[0].status;

describe('Transaction row table component', () => {
  it('should call a function to perform a router update on click', () => {
    (useMediaQuery as ReturnType<typeof vi.fn>).mockImplementation(() => false);
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
    expect(mockedUsedNavigate).toHaveBeenLastCalledWith(`${ArcRoutes.TRANSACTIONS}${id}`);
  });

  it('should render without problems', () => {
    (useMediaQuery as ReturnType<typeof vi.fn>).mockImplementation(() => true);
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
