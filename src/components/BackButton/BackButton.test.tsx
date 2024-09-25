import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { BackButton } from './index';
import i18n from 'translations/i18n';

void i18n.init({
  resources: {}
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('BackButton Component', () => {
  const navigate = vi.fn();
  (useNavigate as Mock).mockReturnValue(navigate);

  it('renders correctly with the translated text', () => {
    render(<BackButton />);
    expect(screen.getByRole('button', { name: 'app.routes.back' })).toBeInTheDocument();
  });

  it('calls navigate with -1 when clicked', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: 'app.routes.back' });
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('has the correct aria-label', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: 'app.routes.back' });
    expect(button).toHaveAttribute('aria-label', 'app.routes.back');
  });
});
