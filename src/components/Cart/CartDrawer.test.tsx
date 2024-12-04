import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartDrawer } from './CartDrawer';
import { useStore } from 'store/GlobalStore';
import { useCartActions } from 'store/CartStore';
import { useNavigate } from 'react-router-dom';

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('store/CartStore', () => ({
  useCartActions: vi.fn()
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('CartDrawer', () => {
  const mockToggleCartDrawer = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useCartActions as Mock).mockReturnValue({ toggleCartDrawer: mockToggleCartDrawer });
    (useStore as Mock).mockReturnValue({
      state: {
        cart: { isOpen: true, amount: '€50.00' }
      }
    });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('renders the cart drawer with correct elements', () => {
    render(<CartDrawer />);

    expect(screen.getByLabelText('app.cart.header.title')).toBeInTheDocument();
    expect(screen.getByText('app.cart.header.amount')).toBeInTheDocument();
    expect(screen.getByText('€50.00')).toBeInTheDocument();
    expect(screen.getByText('app.cart.empty.title')).toBeInTheDocument();
    expect(screen.getByText('app.cart.empty.description')).toBeInTheDocument();
    expect(screen.getByText('app.cart.empty.button')).toBeInTheDocument();
  });

  it('closes the cart drawer when the close button is clicked', () => {
    render(<CartDrawer />);
    const closeButton = screen.getByLabelText('app.cart.header.close');
    fireEvent.click(closeButton);

    expect(mockToggleCartDrawer).toHaveBeenCalled();
  });

  it('navigates to the payment notices page when the button is clicked', () => {
    render(<CartDrawer />);
    const emptyButton = screen.getByText('app.cart.empty.button');
    fireEvent.click(emptyButton);

    expect(mockToggleCartDrawer).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/pagamenti/payment-notices/');
  });
});
