import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Transactions from './Transactions';
import { dummyTransactionsData } from 'stories/utils/mocks';
import Transaction from './Transaction';

describe('Transactions table component', () => {
  it('should render as expected', () => {
    render(<Transactions rows={dummyTransactionsData.all} />);
  });

  it('should call action function clicking on button', () => {
    const action = jest.fn();
    render(
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
        action={action}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith(dummyTransactionsData.all[0].id);
  });
});
