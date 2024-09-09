import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '.';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('LoginRoute', () => {
  it('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Accedi')).toBeInTheDocument();
    });
  });
});
