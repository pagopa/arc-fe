import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubHeader } from './SubHeader';
import { useStore } from 'store/GlobalStore';
import { useCartActions } from 'store/CartStore';

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('store/CartStore', () => ({
  useCartActions: vi.fn()
}));

describe('SubHeader', () => {
  const mockToggleCartDrawer = vi.fn();
  const mockState = {
    cart: {
      amount: '€50.00',
      isOpen: false
    }
  };

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({
      state: mockState
    });
    (useCartActions as Mock).mockReturnValue({
      toggleCartDrawer: mockToggleCartDrawer
    });

    mockToggleCartDrawer.mockClear();
  });

  it('renders the logo and cart components', () => {
    render(<SubHeader />);

    // Check if the logo and cart elements are in the document
    expect(screen.getByRole('link', { name: 'PagoPA' })).toBeInTheDocument();
    expect(screen.getByText('€50.00')).toBeInTheDocument();
    expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
  });

  it('calls toggleCartDrawer when the cart button is clicked', () => {
    render(<SubHeader />);
    const cartButton = screen.getByTestId('ShoppingCartIcon');

    fireEvent.click(cartButton);

    expect(mockToggleCartDrawer).toHaveBeenCalled();
  });
});
