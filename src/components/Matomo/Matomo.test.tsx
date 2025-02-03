import React from 'react';
import { render } from '@testing-library/react';
import Matomo from '.';
import '@testing-library/jest-dom';

describe('Matomo component', () => {
  it('should render nothing without causing error', () => {
    const { container } = render(<Matomo />);
    expect(container).toBeEmptyDOMElement();
  });
});
