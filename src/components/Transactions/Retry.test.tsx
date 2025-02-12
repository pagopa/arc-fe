import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Retry } from './';
import '@testing-library/jest-dom';

describe('Retry Component', () => {
  it('renders without crashing', () => {
    render(<Retry action={() => undefined} />);
  });

  it('calls action function without crashing', () => {
    const action = vi.fn();
    render(<Retry action={action} />);
    const button = screen.getByRole('button', { name: 'app.transactions.error.retry' });
    fireEvent.click(button);
    expect(action).toHaveBeenCalled();
  });
});
