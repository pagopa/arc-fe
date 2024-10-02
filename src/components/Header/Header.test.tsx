import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, HeaderProps } from './index';
import { ArcRoutes } from 'routes/routes';
import { Mock } from 'vitest';
import { StoreProvider } from 'store/GlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mocking external dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

vi.mock('hooks/useUserInfo', () => ({
  useUserInfo: () => ({
    userInfo: {
      userId: '123',
      name: 'John',
      familyName: 'Doe'
    }
  })
}));

vi.mock('./utils/config', () => ({
  pagopaLink: 'https://example.com',
  product: 'Product Name'
}));

const WrappedHeader = (props: HeaderProps) => {
  const queryClient = new QueryClient();
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Header {...props} />
      </QueryClientProvider>
    </StoreProvider>
  );
};

describe('Header component', () => {
  const mockNavigate = vi.fn();
  const mockOnAssistanceClick = vi.fn();

  beforeAll(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render as expected', () => {
    render(<WrappedHeader />);
  });

  it('submenu elements should be visible after clicking user element', () => {
    render(<WrappedHeader onAssistanceClick={mockOnAssistanceClick} />);

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
    render(<WrappedHeader onAssistanceClick={onAssistanceClik} />);
    const button = screen.getByText('Assistenza');
    fireEvent.click(button);
    expect(onAssistanceClik).toHaveBeenCalledTimes(1);
  });

  it('should navigate to user when profile is clicked', () => {
    render(<WrappedHeader />);
    fireEvent.click(screen.getByText('John Doe'));
    const profileButton = screen.getByText('I tuoi dati');
    fireEvent.click(profileButton);

    // Ensure it navigates to the user profile route
    expect(mockNavigate).toHaveBeenCalledWith(ArcRoutes.USER);
  });

  it('should clear session and local storage and navigate to login when "Esci" is clicked', async () => {
    // Mock localStorage and sessionStorage
    const mockStorage = vi.spyOn(Storage.prototype, 'clear');

    // Render the WrappedHeader component
    render(<WrappedHeader />);

    // Click on the user dropdown to show the "Esci" (logout) button
    fireEvent.click(screen.getByText('John Doe'));
    // Click on the "Esci" button
    const logoutButton = screen.getByText('Esci');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      // Ensure session and local storage are cleared
      expect(localStorage.clear).toHaveBeenCalled();
      expect(sessionStorage.clear).toHaveBeenCalled();

      // Ensure it navigates to the login route
      expect(mockNavigate).toHaveBeenCalledWith(ArcRoutes.LOGIN);
    });

    mockStorage.mockClear();
  });
});
