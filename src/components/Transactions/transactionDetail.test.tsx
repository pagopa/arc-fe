import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { dummyTransactionsData } from 'stories/utils/mocks';
import TransactionDetail from './TransactionDetail';
import { useReceiptData } from 'hooks/useReceiptData';

jest.mock('hooks/useReceiptData');
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {}
  }
}));

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
    expect(button.getAttribute('disabled')).toBe('');
  });

  it('Receipt download should be disabled in case of error', () => {
    mockUseReceiptData.mockImplementation(() => ({ isPending: false, error: true, receipt: '' }));
    render(<TransactionDetail transactionData={dummyTransactionsData.transactionData} />);
    const button = screen.getByTestId(receiptDownloadBtnTestId);
    expect(button.getAttribute('disabled')).toBe('');
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
    expect(button.getAttribute('disabled')).toBeNull();
    expect(button.getAttribute('href')).toBe(urlTest);
  });
});
