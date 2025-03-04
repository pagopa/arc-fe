import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { TransactionDetails } from './';
import '@testing-library/jest-dom';
import utils from 'utils';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

vi.mock('utils/files');

const mockUseReceiptData = vi.mocked(utils.files.downloadReceiptPDF);

describe('TransactionDetails component', () => {
  it('should render as expected', () => {
    mockUseReceiptData.mockImplementation(vi.fn());
    render(<TransactionDetails noticeData={dummyTransactionsData.transactionData} />);
  });

  it('should show a toast if an error occurs while fetching the receipt', async () => {
    mockUseReceiptData.mockImplementation(() => {
      throw new Error();
    });
    const notifySpy = vi.spyOn(utils.notify, 'emit');
    render(<TransactionDetails noticeData={dummyTransactionsData.transactionData} />);
    fireEvent.click(screen.getByTestId('receipt-download-btn'));
    expect(notifySpy).toHaveBeenCalledWith('app.transactionDetail.downloadReceiptError');
  });

  it('should truncate transactionId if longer than 20 ', () => {
    mockUseReceiptData.mockImplementation(vi.fn());

    render(
      <TransactionDetails
        noticeData={{
          ...dummyTransactionsData.transactionData,
          eventId: '123456789-123456789-123456789'
        }}
      />
    );

    const truncatedId = screen.getByText('123456789-123456789-…');
    expect(truncatedId).toBeInTheDocument();

    render(
      <TransactionDetails
        noticeData={{
          ...dummyTransactionsData.transactionData,
          eventId: '123456789-123456789-'
        }}
      />
    );

    const renderedId = screen.getByText('123456789-123456789-');
    expect(renderedId).toBeInTheDocument();
  });

  it('should not render the payer, and card holder section when the info are not avaiable', () => {
    render(<TransactionDetails noticeData={dummyTransactionsData.shortTransactionData} />);
    expect(screen.queryByText('app.transactionDetail.paidBy')).toBeNull();
    expect(screen.queryByText('app.transactionDetail.paymentMethod')).toBeNull();
    expect(screen.queryByText('app.transactionDetail.accountHolder')).toBeNull();
  });

  it('should render the payer, and card holder section when the info are avaiable', () => {
    render(<TransactionDetails noticeData={dummyTransactionsData.transactionData} />);
    expect(screen.queryByText('app.transactionDetail.paidBy')).toBeInTheDocument();
    expect(screen.queryByText('Matteo Rossi')).toBeInTheDocument();
    expect(screen.queryByText('(MTTRSS74B23F205K)')).toBeInTheDocument();

    expect(screen.queryByText('app.transactionDetail.paymentMethod')).toBeInTheDocument();
    expect(screen.queryByText('MASTERCARD ****1234')).toBeInTheDocument();

    expect(screen.queryByText('app.transactionDetail.accountHolder')).toBeInTheDocument();
    expect(screen.queryByText('Luigi Bianchi')).toBeInTheDocument();
  });
});
