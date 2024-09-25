import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { TransactionDetails } from './';
import i18n from 'translations/i18n';
import '@testing-library/jest-dom';
import { getReceipt } from 'utils/files';

vi.mock('utils/files');

void i18n.init({
  resources: {}
});

const mockUseReceiptData = vi.mocked(getReceipt);

describe('TransactionDetails component', () => {
  it('should render as expected', () => {
    mockUseReceiptData.mockImplementation(vi.fn());
    render(<TransactionDetails transactionData={dummyTransactionsData.transactionData} />);
  });

  it('should truncate transactionId if longer than 20 ', () => {
    mockUseReceiptData.mockImplementation(vi.fn());

    render(
      <TransactionDetails
        transactionData={{
          ...dummyTransactionsData.transactionData,
          transactionId: '123456789-123456789-123456789'
        }}
      />
    );

    const truncatedId = screen.getByText('123456789-123456789-…');
    expect(truncatedId).toBeInTheDocument();

    render(
      <TransactionDetails
        transactionData={{
          ...dummyTransactionsData.transactionData,
          transactionId: '123456789-123456789-'
        }}
      />
    );

    const renderedId = screen.getByText('123456789-123456789-');
    expect(renderedId).toBeInTheDocument();
  });

  it('should not render the payer, and card holder section when the info are not avaiable', () => {
    render(<TransactionDetails transactionData={dummyTransactionsData.shortTransactionData} />);
    expect(screen.queryByText('app.transactionDetail.paidBy')).toBeNull();
    expect(screen.queryByText('app.transactionDetail.paymentMethod')).toBeNull();
    expect(screen.queryByText('app.transactionDetail.accountHolder')).toBeNull();
  });

  it('should render the payer, and card holder section when the info are avaiable', () => {
    render(<TransactionDetails transactionData={dummyTransactionsData.transactionData} />);
    expect(screen.queryByText('app.transactionDetail.paidBy')).toBeInTheDocument();
    expect(screen.queryByText('Matteo Rossi')).toBeInTheDocument();
    expect(screen.queryByText('(MTTRSS74B23F205K)')).toBeInTheDocument();

    expect(screen.queryByText('app.transactionDetail.paymentMethod')).toBeInTheDocument();
    expect(screen.queryByText('cc ****1234')).toBeInTheDocument();

    expect(screen.queryByText('app.transactionDetail.accountHolder')).toBeInTheDocument();
    expect(screen.queryByText('Luigi Bianchi')).toBeInTheDocument();
  });
});
