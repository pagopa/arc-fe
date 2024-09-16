import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/vi-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaymentNotice } from './index';
import i18n from 'translations/i18n';

void i18n.init({
  resources: {}
});

vi.mock('@preact/signals-react', () => ({
  signal: vi.fn(),
  effect: vi.fn()
}));

vi.mock('@pagopa/mui-italia', () => ({
  IllusSharingInfo: vi.fn(() => <div>Illustration</div>)
}));

describe('PaymentNotice.Empty Component', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders the button', () => {
    renderWithTheme(<PaymentNotice.Empty />);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
