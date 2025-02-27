import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';
import '@testing-library/jest-dom';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

describe('Footer Component', () => {
  it('renders without errors', () => {
    render(<Footer />);
  });

  it('uses correct text elements', () => {
    render(<Footer />);
    expect(screen.getByText('general.PagoPA')).toBeInTheDocument();
    expect(screen.getByText('ui.footer.termsAndConditions')).toBeInTheDocument();
    expect(screen.getByText('ui.footer.personalData')).toBeInTheDocument();
    expect(screen.getByText('ui.footer.privacy')).toBeInTheDocument();
  });

  it('clicking on links behaves as expected', () => {
    render(<Footer />);
    fireEvent.click(screen.getByText('ui.footer.privacy'));
  });
});
