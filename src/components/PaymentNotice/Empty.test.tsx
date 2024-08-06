import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import i18n from 'translations/i18n';
import { _Empty } from './Empty';

void i18n.init({
  resources: {}
});

jest.mock('@pagopa/mui-italia', () => ({
  IllusSharingInfo: jest.fn(() => <div>Illustration</div>)
}));

describe('PaymentNotice.Empty Component', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders the button', () => {
    renderWithTheme(<_Empty />);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
