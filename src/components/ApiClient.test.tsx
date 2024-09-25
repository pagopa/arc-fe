import { render, screen } from '@testing-library/react';
import { ApiClient } from './ApiClient';
import { Client } from 'models/Client';
import { setupInterceptors } from 'utils/interceptors';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';

// Mock dependencies
vi.mock('utils/interceptors', () => ({
  setupInterceptors: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Outlet: () => <div>Outlet Component</div>
}));

describe('ApiClient Component', () => {
  const mockClient = {} as Client;
  const navigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
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
});
