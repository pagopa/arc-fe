import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { _Card } from './Card';
import { mockNotice } from 'stories/utils/PaymentNoticeMocks';
import i18n from 'translations/i18n';
import { STATE } from 'store/types';
import utils from 'utils';

void i18n.init({
  resources: {}
});

jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const theme = createTheme();

  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('_Card component', () => {
  const setState = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({ setState });
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    renderWithProviders(<_Card {...mockNotice} />);

    expect(screen.getByText(mockNotice.paFullName)).toBeInTheDocument();
    expect(screen.getByText(mockNotice.paymentOptions.description)).toBeInTheDocument();
  });

  test('navigates to the correct route and sets state when button is clicked', () => {
    renderWithProviders(<_Card {...mockNotice} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setState).toHaveBeenCalledWith(STATE.PAYMENT_NOTICE, mockNotice);
    expect(navigate).toHaveBeenCalledWith(
      `${utils.config.deployPath}/payment-notices/${mockNotice.iupd}`
    );
  });
});
