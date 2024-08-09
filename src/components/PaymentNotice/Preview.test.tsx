import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaymentNotice } from './index';
import i18n from 'translations/i18n';

void i18n.init({
  resources: {}
});

jest.mock('@pagopa/mui-italia', () => ({
  IllusSharingInfo: jest.fn(() => <div>Illustration</div>)
}));

jest.mock('@preact/signals-react', () => ({
  signal: jest.fn(),
  effect: jest.fn()
}));

describe('PaymentNotice.Preview Component', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders the title and description', () => {
    renderWithTheme(<PaymentNotice.Preview />);

    expect(screen.getByText('app.paymentNotice.preview.title')).toBeInTheDocument();
    expect(screen.getByText('app.paymentNotice.preview.description')).toBeInTheDocument();
  });

  it('renders the action button', () => {
    renderWithTheme(<PaymentNotice.Preview />);

    expect(screen.getByText('app.paymentNotice.preview.action')).toBeInTheDocument();
  });

  it('renders the illustration on large screens', () => {
    renderWithTheme(<PaymentNotice.Preview />);

    // Simulate a large screen
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query.includes('min-width'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }));

    renderWithTheme(<PaymentNotice.Preview />);

    expect(screen.getByText('Illustration')).toBeInTheDocument();
  });

  it('does not render the illustration on small screens', () => {
    // Simulate a small screen
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: !query.includes('min-width'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }));

    renderWithTheme(<PaymentNotice.Preview />);

    expect(screen.queryByText('Illustration')).not.toBeInTheDocument();
  });
});
