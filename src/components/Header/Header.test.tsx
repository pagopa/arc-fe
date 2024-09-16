import '@testing-library/vi-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useUserInfo } from 'hooks/useUserInfo';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './index';
import { ArcRoutes } from 'routes/routes';

// Mocking external dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

vi.mock('hooks/useUserInfo', () => ({
  useUserInfo: vi.fn()
}));

vi.mock('utils', () => ({
  config: {
    pagopaLink: 'https://example.com',
    product: 'Product Name'
  }
}));

vi.mock('@preact/signals-react', () => ({
  signal: vi.fn(),
  effect: vi.fn()
}));

describe('Header component', () => {
  const mockNavigate = vi.fn();
  const mockOnAssistanceClick = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useUserInfo as Mock).mockReturnValue({
      userInfo: {
        userId: '123',
        name: 'John',
        familyName: 'Doe'
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render as expected', () => {
    render(<Header />);
  });

  it('submenu elements should be visible after clicking user element', () => {
    render(<Header onAssistanceClick={mockOnAssistanceClick} />);

    fireEvent.click(screen.getByText('John Doe'));
    // Check if HeaderAccount is rendered
    const profileButton = screen.getByText('I tuoi dati');
    expect(profileButton).toBeInTheDocument();

    // Check if logout is rendered
    const product = screen.getByText('Esci');
    expect(product).toBeInTheDocument();
  });

  it('should call onAssistanceClick assistance button click', () => {
    const onAssistanceClik = vi.fn();
    render(<Header onAssistanceClick={onAssistanceClik} />);
    const button = screen.getByText('Assistenza');
    fireEvent.click(button);
    expect(onAssistanceClik).toHaveBeenCalledTimes(1);
  });

  it('should navigate to user when profile is clicked', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('John Doe'));
    const profileButton = screen.getByText('I tuoi dati');
    fireEvent.click(profileButton);

    // Ensure it navigates to the user profile route
    expect(mockNavigate).toHaveBeenCalledWith(ArcRoutes.USER);
  });

  it('should clear session and local storage and navigate to login when "Esci" is clicked', () => {
    // Mock localStorage and sessionStorage
    const mockStorage = vi.spyOn(Storage.prototype, 'clear');

    // Render the Header component
    render(<Header />);

    // Click on the user dropdown to show the "Esci" (logout) button
    fireEvent.click(screen.getByText('John Doe'));
    // Click on the "Esci" button
    const logoutButton = screen.getByText('Esci');
    fireEvent.click(logoutButton);

    // Ensure session and local storage are cleared
    expect(localStorage.clear).toHaveBeenCalled();
    expect(sessionStorage.clear).toHaveBeenCalled();

    // Ensure it navigates to the login route
    expect(mockNavigate).toHaveBeenCalledWith(ArcRoutes.LOGIN);

    mockStorage.mockClear();
  });
});
