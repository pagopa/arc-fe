import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import React from 'react';
import Sidebar from './index';
import i18n from '../../translations/i18n';

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
  <MemoryRouter>
    <Sidebar />
  </MemoryRouter>
);

describe('Sidebar component', () => {
  it('should render as expected', () => {
    render(<SidebarWithRouter />);
    const hamburgerButton = screen.getByTestId('hamburgerButton');
    expect(hamburgerButton).toBeTruthy();
  });

  test('renders with correct menu items when expanded', () => {
    utilsMock.sidemenu.status.isMenuCollapsed.value = false;
    render(<SidebarWithRouter />);
    // Check if menu items are rendered
    expect(screen.getByText('menu.homepage')).toBeTruthy();
    expect(screen.getByText('menu.receipts')).toBeTruthy();
  });

  test('toggles sidebar collapse correctly', () => {
    utilsMock.sidemenu.status.isMenuCollapsed.value = true;
    render(<SidebarWithRouter />);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  });
});
