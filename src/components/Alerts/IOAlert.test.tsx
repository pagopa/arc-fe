import * as React from 'react';
import { render, screen } from '@testing-library/react';
import IOAlert from './IOAlert';
import '../../translations/i18n';
import '@testing-library/vi-dom';

describe('IOAlert component', () => {
  it('should render as expected', () => {
    render(<IOAlert />);
  });

  test('renders a button', () => {
    render(<IOAlert />);

    const button = screen.getByRole('button');
    expect(button.getAttribute('disabled')).toBeNull();
    expect(button).toBeInTheDocument();
  });
});
