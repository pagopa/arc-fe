import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Transactions from './Transactions';
import { dummyTransactionsData } from 'stories/utils/mocks';
import Transaction from './Transaction';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Transactions table component', () => {
  it('should render as expected', () => {
    render(
      <BrowserRouter>
        <Transactions rows={dummyTransactionsData.all} />
      </BrowserRouter>
    );
  });

  it('should call action function clicking on button', () => {
    render(
      <BrowserRouter>
        <Transaction
          payee={{
            name: dummyTransactionsData.all[0].payee.name,
            srcImg: dummyTransactionsData.all[0].payee.srcImg,
            altImg: dummyTransactionsData.all[0].payee.altImg
          }}
          date={dummyTransactionsData.all[0].date}
          status={{
            label: dummyTransactionsData.all[0].status.label,
            color: 'success'
          }}
          amount={dummyTransactionsData.all[0].amount}
          id={dummyTransactionsData.all[0].id}
        />
      </BrowserRouter>
    );

    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
