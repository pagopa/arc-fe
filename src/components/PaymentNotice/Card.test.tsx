import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CardProps } from './Card';
import { PaymentNotice } from './index';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}));

jest.mock('components/PayeeIcon', () => ({
  PayeeIcon: jest.fn(() => <div>Payee Icon</div>)
}));

describe('Card Component', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key
    });
  });

  const baseProps: CardProps = {
    payee: {
      name: 'Payee Name',
      srcImg: 'payee.png',
      altImg: 'Payee Image'
    },
    paymentInfo: 'Payment Info',
    amount: '100',
    expiringDate: '2022-12-31'
  };

  it('renders the payee name, payment info, and amount', () => {
    renderWithTheme(<PaymentNotice.Card {...baseProps} />);

    expect(screen.getByText('Payee Name')).toBeInTheDocument();
    expect(screen.getByText('Payment Info')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders the expiring date if provided', () => {
    renderWithTheme(<PaymentNotice.Card {...baseProps} />);

    expect(screen.getByText('app.paymentNotice.card.expiring')).toBeInTheDocument();
    expect(screen.getByText('2022-12-31')).toBeInTheDocument();
  });

  it('renders the PayeeIcon', () => {
    renderWithTheme(<PaymentNotice.Card {...baseProps} />);

    expect(screen.getByText('Payee Icon')).toBeInTheDocument();
  });

  it('renders the ArrowForwardIosIcon', () => {
    renderWithTheme(<PaymentNotice.Card {...baseProps} />);

    expect(screen.getByTestId('ArrowForwardIosIcon')).toBeInTheDocument();
  });
});
