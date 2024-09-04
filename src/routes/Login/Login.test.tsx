import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('LoginRoute', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });
});
