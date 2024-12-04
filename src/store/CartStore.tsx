import { STATE } from './types';
import { CartState } from 'models/Cart';
import { toEuroOrMissingValue } from 'utils/converters';
import { useStore } from './GlobalStore';
import { signal } from '@preact/signals-react';

export const cartState = signal<CartState>({
  amount: toEuroOrMissingValue(0),
  isOpen: false
});

export function setCart(cart: CartState) {
  cartState.value = cart;
}

export const useCartActions = () => {
  const {
    setState,
    state: { cart }
  } = useStore();

  const setCartAmount = (amount: number) => {
    setState(STATE.CART, {
      isOpen: cart.isOpen,
      amount: toEuroOrMissingValue(amount)
    });
  };

  const toggleCartDrawer = () => {
    setState(STATE.CART, {
      isOpen: !cart.isOpen,
      amount: cart.amount
    });
  };

  return {
    setCartAmount,
    toggleCartDrawer
  };
};
