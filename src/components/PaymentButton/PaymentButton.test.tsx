import React from 'react';
import { render, screen } from '@testing-library/react';
import PaymentButton from '.';
import '@testing-library/vi-dom';

describe('Payment Button Component', () => {
  it('renders without problems', () => {
    render(<PaymentButton />);

    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', 'https://dev.checkout.pagopa.it');
    expect(button).toHaveAttribute('target', '_blank');
  });
});
