import '@testing-library/vi-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import React from 'react';
import Sidebar from './index';
import i18n from '../../translations/i18n';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import useCollapseMenu from 'hooks/useCollapseMenu';
import { Mock } from 'vitest';

const utilsMock = vi.requireMock('utils');
vi.mock('hooks/useCollapseMenu', () => vi.fn());
vi.mock('@mui/material/useMediaQuery', () => vi.fn());

vi.mock('utils', () => ({
  ...vi.importActual('utils'),
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

vi.mock('@mui/material/useMediaQuery', () => vi.fn());

describe('Sidebar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render as expected', () => {
    (useCollapseMenu as Mock).mockReturnValue({ setOverlay: vi.fn(), collapsed: false });

    render(<SidebarWithRouter />);
    const hamburgerButton = screen.getByTestId('hamburgerButton');
    expect(hamburgerButton).toBeTruthy();
  });

  test('renders with correct menu items when expanded', () => {
    utilsMock.sidemenu.status.isMenuCollapsed.value = false;
    (useCollapseMenu as Mock).mockReturnValue({ setOverlay: vi.fn(), collapsed: false });

    render(<SidebarWithRouter />);
    // Check if menu items are rendered
    expect(screen.getByText('menu.homepage')).toBeInTheDocument();
    expect(screen.getByText('menu.receipts')).toBeInTheDocument();
  });

  test('toggles sidebar collapse correctly', () => {
    (useCollapseMenu as Mock).mockReturnValue({ setOverlay: vi.fn(), collapsed: true });

    utilsMock.sidemenu.status.isMenuCollapsed.value = true;
    render(<SidebarWithRouter />);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  });

  it('renders with sidebar expanded on large screen', () => {
    (useCollapseMenu as Mock).mockReturnValue({ setOverlay: vi.fn(), collapsed: false });

    utilsMock.sidemenu.status.isMenuCollapsed.value = false;
    (useMediaQuery as Mock).mockImplementation(() => true);
    render(<SidebarWithRouter />);

    expect(screen.getByLabelText('menu.navigationMenu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders with sidebar collapsed on small screen', () => {
    (useCollapseMenu as Mock).mockReturnValue({
      setOverlay: vi.fn(),
      changeMenuState: vi.fn(),
      collapsed: true
    });

    utilsMock.sidemenu.status.isMenuCollapsed.value = true;
    (useMediaQuery as Mock).mockImplementation(() => false);
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  });

  it('renders close icon and handles click to collapse', () => {
    (useCollapseMenu as Mock).mockReturnValue({
      setOverlay: vi.fn(),
      overlay: true,
      changeMenuState: vi.fn(),
      collapsed: false
    });

    (useMediaQuery as Mock).mockImplementation(() => false);
    utilsMock.sidemenu.status.isMenuCollapsed.value = false;

    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    fireEvent.click(hamburgerButton);

    const closeIcon = screen.getByTestId('collapseClose');
    expect(closeIcon).toBeInTheDocument();
  });
});
