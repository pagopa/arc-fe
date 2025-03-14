import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('LoginRoute', () => {
  it('renders nothing without crashing', async () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
