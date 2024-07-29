import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaymentNotice } from './index';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: jest.fn()
}));

describe('Detail Component', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key
    });
  });

  const paymentNoticeDetail = {
    amount: '10',
    paFullName: 'paFullName',
    subject: 'subject',
    dueDate: 'dueDate',
    iupd: 'iupd',
    paTaxCode: 'paTaxCode',
    firstInstallmentDate: 'firstInstallmentDate',
    firstInstallmentAmount: '0'
  };
  it('renders the notice data', () => {
    renderWithTheme(<PaymentNotice.Detail paymentNoticeDetail={paymentNoticeDetail} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('paFullName')).toBeInTheDocument();
    expect(screen.getByText('subject')).toBeInTheDocument();
    expect(screen.getByText('dueDate')).toBeInTheDocument();
    expect(screen.getByText('paTaxCode')).toBeInTheDocument();
    expect(screen.getByText('iupd')).toBeInTheDocument();
    expect(screen.getByText('firstInstallmentDate')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
