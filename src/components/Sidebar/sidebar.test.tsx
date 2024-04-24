import * as React from 'react';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useCollapseMenu from './useCollapseMenu';
import Sidebar from './';
import { BrowserRouter } from 'react-router-dom';
import '../../translations/i18n';

describe('useCollapseMenu hook', () => {
  it('should return the inital menu status', () => {
    const { result } = renderHook(() => useCollapseMenu(false));
    expect(result.current.collapsed).toBe(false);
  });

  it('should change correctly the menu status state calling the useCollapseMenu function', () => {
    const { result } = renderHook(() => useCollapseMenu(false));
    act(() => {
      result.current.changeMenuState(false);
    });
    expect(result.current.collapsed).toBe(true);
  });
});

describe('Sidebar component', () => {
  it('should render as expecteed', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  });

  it('should collapse correctly', () => {
    const result = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(result.container.querySelector('#menu-item-homepage')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Comprimi il menu'));
    expect(result.container.querySelector('#menu-item-homepage')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Espandi il menu'));
    const button = result.container.querySelector('#menu-item-homepage');
    button && fireEvent.click(button);
  });
});
