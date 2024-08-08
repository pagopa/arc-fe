import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AssistanceForm } from './AssistanceForm';
import '@testing-library/jest-dom';

describe('AssistanceForm Component', () => {
  it('renders having confirm button disabled', () => {
    render(<AssistanceForm />);
    const confirmButton = screen.getByRole('link', { name: /conferma/i });
    expect(confirmButton).toHaveClass('Mui-disabled');
  });

  it('turns confirm button enabled correctly', () => {
    render(<AssistanceForm />);
    const email = screen.getByTestId('confirm-email');
    const confirmEmail = screen.getByTestId('assistance-confirm-email');
    const confirmButton = screen.getByRole('link', { name: /conferma/i });
    expect(confirmButton).toHaveClass('Mui-disabled');

    fireEvent.change(email, { target: { value: 'pippo' } });
    fireEvent.change(confirmEmail, { target: { value: 'pippo' } });
    expect(confirmButton).toHaveClass('Mui-disabled');

    fireEvent.change(email, { target: { value: 'pippo@pippo.it' } });
    expect(confirmButton).toHaveClass('Mui-disabled');

    fireEvent.change(confirmEmail, { target: { value: 'pippo@pippo.it' } });
    expect(confirmButton).not.toHaveClass('Mui-disabled');
  });
});
