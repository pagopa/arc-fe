import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotice } from './PaymentNotice';

vi.mock('@preact/signals-react', () => ({
  signal: vi.fn(),
  effect: vi.fn()
}));

describe('Payment notices info component', () => {
  it('should render as expected', () => {
    render(<PaymentNotice.Info />);
  });
});
