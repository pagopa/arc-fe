import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentNotice } from './PaymentNotice';

describe('Payment notices error component', () => {
  const onRetry = vi.fn();

  it('should render as expected', () => {
    render(<PaymentNotice.Error onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: 'app.paymentNotice.error.button' });
    expect(button).toBeVisible();
    const description = screen.getByText('app.paymentNotice.error.description');
    expect(description).toBeVisible();
  });

  it('should trigger the retry function correctly', () => {
    const onRetry = vi.fn();
    render(<PaymentNotice.Error onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: 'app.paymentNotice.error.button' });
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
