import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import TransactionDetail from './TransactionDetail';
import { useReceiptData } from 'hooks/useReceiptData';
import i18n from 'translations/i18n';
import '@testing-library/jest-dom';

jest.mock('hooks/useReceiptData');

void i18n.init({
  resources: {}
});

const mockUseReceiptData = jest.mocked(useReceiptData);

describe('TransactionDetail component', () => {
  it('should render as expected', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: false, receipt: '' }));
    render(<TransactionDetail transactionData={dummyTransactionsData.transactionData} />);
  });

  const receiptDownloadBtnTestId = 'receipt-download-btn';
  it('Receipt download should be disabled while the request is pending', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: true, error: false, receipt: '' }));
    render(<TransactionDetail transactionData={dummyTransactionsData.transactionData} />);
    const button = screen.getByTestId(receiptDownloadBtnTestId);
    expect(button).toBeDisabled();
  });

  it('Receipt download should be disabled in case of error', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: true, receipt: '' }));
    render(<TransactionDetail transactionData={dummyTransactionsData.transactionData} />);
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
    render(<TransactionDetail transactionData={dummyTransactionsData.transactionData} />);
    const button = screen.getByTestId(receiptDownloadBtnTestId);
    expect(button).not.toBeDisabled();
    expect(button.getAttribute('href')).toBe(urlTest);
  });

  it('should truncate transactionId if longer than 20 ', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: false, receipt: '' }));
    render(
      <TransactionDetail
        transactionData={{
          ...dummyTransactionsData.transactionData,
          transactionId: '123456789-123456789-123456789'
        }}
      />
    );

    const truncatedId = screen.getByText('123456789-123456789-…');
    expect(truncatedId).toBeInTheDocument();

    render(
      <TransactionDetail
        transactionData={{
          ...dummyTransactionsData.transactionData,
          transactionId: '123456789-123456789-'
        }}
      />
    );

    const renderedId = screen.getByText('123456789-123456789-');
    expect(renderedId).toBeInTheDocument();
  });
});
