import { Header, HeaderProps } from '.';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '../../translations/i18n';
import { ArcRoutes } from 'routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JwtUser } from '@pagopa/mui-italia';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));
const queryClient = new QueryClient();

const HeaderWithRouter = (props: HeaderProps) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <Header {...props} />
    </QueryClientProvider>
  </MemoryRouter>
);

describe('Header component', () => {
  it('should render as expected', () => {
    render(<HeaderWithRouter />);
  });

  it('should call onAssistanceClick assistance button click', () => {
    const onAssistanceClik = jest.fn();
    render(<HeaderWithRouter onAssistanceClick={onAssistanceClik} />);
    const button = screen.getByText('Assistenza');
    fireEvent.click(button);
    expect(onAssistanceClik).toHaveBeenCalledTimes(1);
  });

  it('submenu elements should be visible after clicking user element', () => {
    const user: JwtUser = { name: 'John', surname: 'Doe', email: 'email', id: 'id' };
    global.window.localStorage.setItem('userInfo', JSON.stringify(user));
    render(<HeaderWithRouter />);
    fireEvent.click(screen.getByText('John Doe'));
    expect(screen.getByText('I tuoi dati')).toBeInTheDocument();
    expect(screen.getByText('Esci')).toBeInTheDocument();
  });

  it('should navigate to user when profile is clicked', () => {
    render(<HeaderWithRouter />);
    const user: JwtUser = { name: 'John', surname: 'Doe', email: 'email', id: 'id' };
    global.window.localStorage.setItem('userInfo', JSON.stringify(user));
    fireEvent.click(screen.getByText('John Doe'));
    const userDataLink = screen.getByText('I tuoi dati');
    expect(userDataLink).toBeVisible();
    fireEvent.click(userDataLink);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(ArcRoutes.USER);
  });

  it('should navigate to login page & clear storage when logout is clicked', () => {
    global.window.localStorage.setItem('accessToken', 'test');
    const user: JwtUser = { name: 'John', surname: 'Doe', email: 'email', id: 'id' };
    global.window.localStorage.setItem('userInfo', JSON.stringify(user));
    render(<HeaderWithRouter />);
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Esci'));
    expect(global.window.localStorage.getItem('accessToken')).toBe(null);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(ArcRoutes.LOGIN);
  });
});
