import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { dummyTransactionsData } from 'stories/utils/mocks';
import Transaction, { TransactionProps } from './Transaction';
import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const TransactionWithRouter = (props: TransactionProps) => (
  <MemoryRouter>
    <table>
      <tbody>
        <Transaction {...props} />
      </tbody>
    </table>
  </MemoryRouter>
);

const { payee, date, status, amount, id } = dummyTransactionsData.all[0];

describe('Transaction component', () => {
  it('should call action function clicking on button', () => {
    render(
      <TransactionWithRouter
        payee={{
          name: payee.name,
          srcImg: payee.srcImg,
          altImg: payee.altImg
        }}
        date={date}
        status={{
          label: status.label,
          color: 'success'
        }}
        amount={amount}
        id={id}
      />
    );

    const button = screen.getByTestId('transaction-details-button');
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/transaction/${id}`);
  });

  it('alt attribute is correctly set when alt prop is provided', () => {
    const altText = 'Payee Image Alt';
    const { getByAltText } = render(
      <TransactionWithRouter
        payee={{
          name: 'Payee Name',
          srcImg: 'payee-image.jpg',
          altImg: altText
        }}
        date="2024-05-18"
        status={{ label: 'Pending', color: 'default' }}
        amount="100.00"
        id="123456"
      />
    );

    const payeeImage = getByAltText(`Logo ${altText}`);
    expect(payeeImage).toBeInTheDocument();
  });

  it('alt attribute is empty when alt prop is not provided', () => {
    const { getByAltText } = render(
      <TransactionWithRouter
        payee={{
          name: 'Payee Name',
          srcImg: 'payee-image.jpg'
        }}
        date="2024-05-18"
        status={{ label: 'Pending', color: 'default' }}
        amount="100.00"
        id="123456"
      />
    );

    const payeeImage = getByAltText('Logo');
    expect(payeeImage).toBeInTheDocument();
  });
});
