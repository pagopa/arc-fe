import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CardProps } from './Card';
import { PaymentNotice } from './index';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}));
const mockedUsedNavigate = jest.fn();

jest.mock('components/PayeeIcon', () => ({
  PayeeIcon: jest.fn(() => <div>Payee Icon</div>)
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
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
    id: '123',
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
    renderWithTheme(
      <BrowserRouter>
        <PaymentNotice.Card {...baseProps} />
      </BrowserRouter>
    );
    expect(screen.getByText('Payee Name')).toBeInTheDocument();
    expect(screen.getByText('Payment Info')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders the expiring date if provided', () => {
    renderWithTheme(
      <BrowserRouter>
        <PaymentNotice.Card {...baseProps} />
      </BrowserRouter>
    );
    expect(screen.getByText('app.paymentNotice.card.expiringDate')).toBeInTheDocument();
    expect(screen.getByText('2022-12-31')).toBeInTheDocument();
  });

  it('renders the PayeeIcon', () => {
    renderWithTheme(
      <BrowserRouter>
        <PaymentNotice.Card {...baseProps} />
      </BrowserRouter>
    );
    expect(screen.getByText('Payee Icon')).toBeInTheDocument();
  });

  it('renders the ArrowForwardIosIcon', () => {
    renderWithTheme(
      <BrowserRouter>
        <PaymentNotice.Card {...baseProps} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('ArrowForwardIosIcon')).toBeInTheDocument();
  });
});
