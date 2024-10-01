import React from 'react';
import { render } from '@testing-library/react';
import { PaymentNotice } from './PaymentNotice';

describe('Payment notices info component', () => {
  it('should render as expected', () => {
    render(<PaymentNotice.Info />);
  });
});
