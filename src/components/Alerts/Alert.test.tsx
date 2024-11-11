import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert } from './Alert';
import { InfoAlertProps } from './Alert';
import React from 'react';

// Mock action data
const action = {
  href: 'https://example.com',
  message: 'Learn more'
};

// Define a function to render the component with props
const renderComponent = (props?: Partial<InfoAlertProps>) => {
  return render(<Alert message="This is an info alert." action={action} {...props} />);
};

it('renders the message and action link correctly', () => {
  renderComponent();
  expect(screen.getByText('This is an info alert.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute(
    'href',
    'https://example.com'
  );
});

it('applies the correct severity and variant', () => {
  renderComponent({ severity: 'warning', variant: 'filled' });
  const alert = screen.getByRole('alert');

  expect(alert).toHaveClass('MuiAlert-colorWarning');
  expect(alert).toHaveClass('MuiAlert-filled');
});

it('opens the action link in a new tab', () => {
  renderComponent();
  const actionLink = screen.getByRole('link', { name: 'Learn more' });

  expect(actionLink).toHaveAttribute('target', '_blank');
});
