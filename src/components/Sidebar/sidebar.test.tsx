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

    // Check if menu items are rendered
    expect(screen.getByText('menu.homepage')).toBeTruthy();
    expect(screen.getByText('menu.receipts')).toBeTruthy();
  });

  test('toggles sidebar collapse/expand button is clicked', () => {
    render(<SidebarWithRouter />);

    const collapseButton = screen.getByLabelText('sidebar.collapse');
    expect(collapseButton).toBeTruthy();

    fireEvent.click(collapseButton);
    expect(screen.queryByText('menu.homepage')).not.toBeTruthy();

    fireEvent.click(screen.getByLabelText('sidebar.expand'));
    expect(screen.getByText('menu.homepage')).toBeTruthy();
  });
});
