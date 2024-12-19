import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubHeader } from './SubHeader';
import { cartState, toggleCartDrawer } from '../../store/CartStore';

vi.mock(import('store/CartStore'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    toggleCartDrawer: vi.fn(actual.toggleCartDrawer)
  };
});

describe('SubHeader', () => {
  it('renders the logo and cart components', () => {
    render(<SubHeader />);

    expect(screen.getByLabelText('PagoPA')).toBeInTheDocument();
    expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
  });

  it('calls toggleCartDrawer when the cart button is clicked', () => {
    render(<SubHeader />);
    const cartButton = screen.getByTestId('ShoppingCartIcon');

    expect(cartState.value.isOpen).toBeFalsy();

    fireEvent.click(cartButton);

    expect(toggleCartDrawer).toHaveBeenCalled();
    expect(cartState.value.isOpen).toBeTruthy();
  });
});
