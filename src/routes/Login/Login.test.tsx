import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '.';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('LoginRoute', () => {
  it('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('app.login.login')).toBeInTheDocument();
    });
  });
});
