import React from 'react';
import { describe, it, expect, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartDrawer } from './CartDrawer';
import { toggleCartDrawer } from 'store/CartStore';
import { useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArcRoutes } from 'routes/routes';

vi.mock(import('store/CartStore'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    toggleCartDrawer: vi.fn(actual.toggleCartDrawer)
  };
});

vi.mock('store/GlobalStore', () => {
  return {
    useStore: () => ({
      state: {
        cart: {
          items: []
        }
      }
    })
  };
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('CartDrawer', () => {
  const mockNavigate = vi.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('renders the cart drawer when empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartDrawer />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText('app.cart.header.title')).toBeInTheDocument();
    expect(screen.getByText('app.cart.header.amount')).toBeInTheDocument();
    expect(screen.getByText('app.cart.empty.title')).toBeInTheDocument();
    expect(screen.getByText('app.cart.empty.description')).toBeInTheDocument();
    expect(screen.getByText('app.cart.items.back')).toBeInTheDocument();
  });

  it('closes the cart drawer when the close button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartDrawer />
      </QueryClientProvider>
    );
    const closeButton = screen.getByLabelText('app.cart.header.close');
    fireEvent.click(closeButton);

    expect(toggleCartDrawer).toHaveBeenCalled();
  });

  it('navigates to the payment notices page when the button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartDrawer />
      </QueryClientProvider>
    );
    const emptyButton = screen.getByText('app.cart.items.back');
    fireEvent.click(emptyButton);

    expect(toggleCartDrawer).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(ArcRoutes.PAYMENT_NOTICES);
  });
});
