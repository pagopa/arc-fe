import * as React from 'react';
import { render } from '@testing-library/react';
import CartItem from './CartItem';
import '../../translations/i18n';
import '@testing-library/jest-dom';

describe('CartItem component', () => {
  it('should render as expected', () => {
    render(
      <CartItem
        paFullName="testPaFullName"
        iuv="testIuv"
        amount={100}
        description="testDescription"
      />
    );
  });
});
