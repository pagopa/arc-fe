import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { _Detail } from './Detail';
import { mockNotice } from 'stories/utils/PaymentNoticeMocks';
import { PaymentNoticeEnum, PaymentNoticeMultipleType } from 'models/PaymentNotice';

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

  it('renders the single notice data', () => {
    renderWithTheme(<_Detail paymentNotice={mockNotice} />);

    expect(screen.getByText(mockNotice.iupd)).toBeInTheDocument();
    expect(screen.getByText(mockNotice.debtorFullName)).toBeInTheDocument();
    expect(screen.getByText(mockNotice.paymentOptions.description)).toBeInTheDocument();
    expect(screen.getAllByText(mockNotice.paymentOptions.amount).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(mockNotice.paymentOptions.dueDate).length).toBeGreaterThanOrEqual(1);
  });

  it('does not render multiple notice data', () => {
    renderWithTheme(
      <_Detail
        paymentNotice={
          {
            ...mockNotice,
            type: PaymentNoticeEnum.MULTIPLE
          } as unknown as PaymentNoticeMultipleType
        }
      />
    );

    expect(screen.getByText('Multiple PaymentNotice type is not supported')).toBeInTheDocument();
  });
});
