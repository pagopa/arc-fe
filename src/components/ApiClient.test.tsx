import { act, render, screen } from '@testing-library/react';
import { ApiClient } from './ApiClient';
import { Client } from 'models/Client';
import { setupInterceptors } from 'utils/interceptors';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';

// Mock dependencies
jest.mock('utils/interceptors', () => ({
  setupInterceptors: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Outlet: () => <div>Outlet Component</div>
}));

describe('ApiClient Component', () => {
  const mockClient = {} as Client;
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ApiClient client={mockClient} />);
    expect(screen.getByText('Outlet Component')).toBeInTheDocument();
  });

  it('sets up interceptors on mount', () => {
    render(<ApiClient client={mockClient} />);
    expect(setupInterceptors).toHaveBeenCalledWith(mockClient, navigate);
    expect(setupInterceptors).toHaveBeenCalledTimes(1);
  });

  it('does not set up interceptors more than once', () => {
    const { rerender } = render(<ApiClient client={mockClient} />);

    // simulate component re-render
    act(() => {
      rerender(<ApiClient client={mockClient} />);
    });

    // setupInterceptors was called once
    expect(setupInterceptors).toHaveBeenCalledTimes(1);
  });
});
