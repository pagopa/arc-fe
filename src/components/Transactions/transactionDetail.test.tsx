import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { TransactionDetails } from './';
import { useReceiptData } from 'hooks/useReceiptData';
import i18n from 'translations/i18n';
import '@testing-library/jest-dom';

jest.mock('hooks/useReceiptData');

void i18n.init({
  resources: {}
});

const mockUseReceiptData = jest.mocked(useReceiptData);

describe('TransactionDetails component', () => {
  it('should render as expected', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: false, receipt: '' }));
    render(<TransactionDetails transactionData={dummyTransactionsData.transactionData} />);
  });

  const receiptDownloadBtnTestId = 'receipt-download-btn';
  it('Receipt download should be disabled while the request is pending', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: true, error: false, receipt: '' }));
    render(<TransactionDetails transactionData={dummyTransactionsData.transactionData} />);
    const button = screen.getByTestId(receiptDownloadBtnTestId);
    expect(button).toBeDisabled();
  });

  it('Receipt download should be disabled in case of error', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: true, receipt: '' }));
    render(<TransactionDetails transactionData={dummyTransactionsData.transactionData} />);
    const button = screen.getByTestId(receiptDownloadBtnTestId);
    expect(button).toBeDisabled();
  });

  it('Receipt download should be enabled on request success', () => {
    const urlTest = 'test-url';
    mockUseReceiptData.mockImplementation(() => ({
      isPending: false,
      error: false,
      receipt: urlTest
    }));
    render(<TransactionDetails transactionData={dummyTransactionsData.transactionData} />);
    const button = screen.getByTestId(receiptDownloadBtnTestId);
    expect(button).not.toBeDisabled();
    expect(button.getAttribute('href')).toBe(urlTest);
  });

  it('should truncate transactionId if longer than 20 ', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: false, receipt: '' }));
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
