import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useCartActions, cartState } from './CartStore';
import { useStore } from './GlobalStore';
import { STATE } from './types';
import { toEuroOrMissingValue } from 'utils/converters';

vi.mock('./GlobalStore', () => ({
  useStore: vi.fn()
}));

describe('useCartActions', () => {
  const mockSetState = vi.fn();
  const mockState = {
    cart: {
      amount: toEuroOrMissingValue(0),
      isOpen: false
    }
  };

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({
      setState: mockSetState,
      state: mockState
    });

    mockSetState.mockClear();
    cartState.value = {
      amount: toEuroOrMissingValue(0),
      isOpen: false
    };
  });

  it('sets the cart amount correctly', () => {
    const { setCartAmount } = useCartActions();
    const amount = 50;

    setCartAmount(amount);

    expect(mockSetState).toHaveBeenCalledWith(STATE.CART, {
      isOpen: false,
      amount: toEuroOrMissingValue(amount)
    });
  });

  it('toggles the cart drawer state', () => {
    const { toggleCartDrawer } = useCartActions();

    toggleCartDrawer();

    expect(mockSetState).toHaveBeenCalledWith(STATE.CART, {
      isOpen: !mockState.cart.isOpen,
      amount: mockState.cart.amount
    });
  });
});
