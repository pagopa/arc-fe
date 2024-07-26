import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import React from 'react';
import Sidebar from './index';
import i18n from '../../translations/i18n';
import { theme } from '@pagopa/mui-italia';
import { ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const utilsMock = jest.requireMock('utils');

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  sidemenu: {
    status: {
      isMenuCollapsed: { value: true },
      overlay: { value: false }
    },
    setCollapsed: () => {},
    changeMenuState: () => {},
    setOverlay: () => {}
  }
}));

void i18n.init({
  resources: {}
});

const SidebarWithRouter = () => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </ThemeProvider>
);

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('Sidebar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render as expected', () => {
    render(<SidebarWithRouter />);
    const hamburgerButton = screen.getByTestId('hamburgerButton');
    expect(hamburgerButton).toBeTruthy();
  });

  test('renders with correct menu items when expanded', () => {
    utilsMock.sidemenu.status.isMenuCollapsed.value = false;
    render(<SidebarWithRouter />);
    // Check if menu items are rendered
    expect(screen.getByText('menu.homepage')).toBeInTheDocument();
    expect(screen.getByText('menu.receipts')).toBeInTheDocument();
  });

  test('toggles sidebar collapse correctly', () => {
    utilsMock.sidemenu.status.isMenuCollapsed.value = true;
    render(<SidebarWithRouter />);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  it('toggles sidebar collapse/expand button is clicked', () => {
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    expect(hamburgerButton).toBeInTheDocument();

    fireEvent.click(hamburgerButton);
    expect(screen.getByText('menu.homepage')).toBeInTheDocument();

    fireEvent.click(hamburgerButton);
    expect(screen.queryByText('menu.homepage')).not.toBeInTheDocument();
  });

  it('renders with sidebar expanded on large screen', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    render(<SidebarWithRouter />);

    expect(screen.getByLabelText('menu.navigationMenu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders with sidebar collapsed on small screen', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);
    expect(screen.getByText('menu.homepage')).toBeInTheDocument();
  });

  it('renders close icon and handles click to collapse', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);

    const closeIcon = screen.getByTestId('collapseClose');
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    // Check if the sidebar is collapsed by verifying the absence of menu items
    expect(screen.queryByText('menu.homepage')).not.toBeInTheDocument();
  });

  it('collapses when clicking on an item on lower resolutions', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);

    const home = screen.getByText('menu.homepage');
    fireEvent.click(home);

    const navigationMenu = screen.getByLabelText('menu.navigationMenu');
    expect(navigationMenu).toHaveAttribute('aria-expanded', 'false');
  });
});
