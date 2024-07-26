import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import React from 'react';
import Sidebar from './index';
import i18n from '../../translations/i18n';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import useCollapseMenu from 'hooks/useCollapseMenu';

const utilsMock = jest.requireMock('utils');
jest.mock('hooks/useCollapseMenu', () => jest.fn());
jest.mock('@mui/material/useMediaQuery', () => jest.fn());

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
    (useCollapseMenu as jest.Mock).mockReturnValue({ setOverlay: jest.fn(), collapsed: false });

    render(<SidebarWithRouter />);
    const hamburgerButton = screen.getByTestId('hamburgerButton');
    expect(hamburgerButton).toBeTruthy();
  });

  test('renders with correct menu items when expanded', () => {
    utilsMock.sidemenu.status.isMenuCollapsed.value = false;
    (useCollapseMenu as jest.Mock).mockReturnValue({ setOverlay: jest.fn(), collapsed: false });

    render(<SidebarWithRouter />);
    // Check if menu items are rendered
    expect(screen.getByText('menu.homepage')).toBeInTheDocument();
    expect(screen.getByText('menu.receipts')).toBeInTheDocument();
  });

  test('toggles sidebar collapse correctly', () => {
    (useCollapseMenu as jest.Mock).mockReturnValue({ setOverlay: jest.fn(), collapsed: true });

    utilsMock.sidemenu.status.isMenuCollapsed.value = true;
    render(<SidebarWithRouter />);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  });

  it('renders with sidebar expanded on large screen', () => {
    (useCollapseMenu as jest.Mock).mockReturnValue({ setOverlay: jest.fn(), collapsed: false });

    utilsMock.sidemenu.status.isMenuCollapsed.value = false;
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    render(<SidebarWithRouter />);

    expect(screen.getByLabelText('menu.navigationMenu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders with sidebar collapsed on small screen', () => {
    (useCollapseMenu as jest.Mock).mockReturnValue({
      setOverlay: jest.fn(),
      changeMenuState: jest.fn(),
      collapsed: true
    });

    utilsMock.sidemenu.status.isMenuCollapsed.value = true;
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  });

  it('renders close icon and handles click to collapse', () => {
    (useCollapseMenu as jest.Mock).mockReturnValue({
      setOverlay: jest.fn(),
      overlay: true,
      changeMenuState: jest.fn(),
      collapsed: false
    });

    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    utilsMock.sidemenu.status.isMenuCollapsed.value = false;

    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);

    const closeIcon = screen.getByTestId('collapseClose');
    expect(closeIcon).toBeInTheDocument();
  });
});
