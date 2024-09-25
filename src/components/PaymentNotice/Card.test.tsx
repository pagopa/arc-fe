import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { _Card } from './Card';
import { mockNotice } from 'stories/utils/PaymentNoticeMocks';
import { STATE } from 'store/types';
import utils from 'utils';
import { Mock } from 'vitest';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const theme = createTheme();

  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('_Card component', () => {
  const setState = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({ setState });
    (useNavigate as Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
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
