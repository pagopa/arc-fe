import React from 'react';
import { render } from '@testing-library/react';
import { HealthCheck } from '.';
import '@testing-library/vi-dom';

describe('HealthCheck component', () => {
  it('should render nothing without causing error', () => {
    const { container } = render(<HealthCheck />);
    expect(container).toBeEmptyDOMElement();
  });
});
