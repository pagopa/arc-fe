import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/vi-dom';
import { ErrorFallback } from 'components/ErrorFallback';

describe('ErrorFallback', () => {
  it('should render the default error message', () => {
    render(<ErrorFallback />);
    expect(screen.getByText('Ops!... something went wrong')).toBeInTheDocument();
  });

  it('should render the provided error message', () => {
    const errorMessage = 'Test error message';
    render(<ErrorFallback message={errorMessage} />);
    expect(screen.getByText('Ops!... something went wrong')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render the back button if onReset is provided', () => {
    const onReset = vi.fn();
    render(<ErrorFallback onReset={onReset} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onReset when back button is clicked', () => {
    const onReset = vi.fn();
    render(<ErrorFallback onReset={onReset} />);
    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should not render the back button if onReset is not provided', () => {
    render(<ErrorFallback />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
