import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import React from 'react';
import Sidebar from './index';
import i18n from '../../translations/i18n';

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
  });

  test('renders with correct menu items', () => {
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');

    fireEvent.click(hamburgerButton);
    // Check if menu items are rendered
    expect(screen.getByText('menu.homepage')).toBeTruthy();
    expect(screen.getByText('menu.receipts')).toBeTruthy();
  });

  test('toggles sidebar collapse/expand button is clicked', () => {
    render(<SidebarWithRouter />);

    const hamburgerButton = screen.getByTestId('hamburgerButton');
    expect(hamburgerButton).toBeTruthy();

    fireEvent.click(hamburgerButton);
    expect(screen.getByText('menu.homepage')).toBeTruthy();

    fireEvent.click(hamburgerButton);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();
  });
});
