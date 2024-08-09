import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotice } from './PaymentNotice';

jest.mock('@preact/signals-react', () => ({
  signal: jest.fn(),
  effect: jest.fn()
}));

describe('Payment notices info component', () => {
  it('should render as expected', () => {
    render(<PaymentNotice.Info />);
  });
});
