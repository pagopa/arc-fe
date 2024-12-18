import { STATE } from './types';
import { CartItem, CartState } from 'models/Cart';
import { toEuroOrMissingValue } from 'utils/converters';
import { useStore } from './GlobalStore';
import { signal } from '@preact/signals-react';

export const cartState = signal<CartState>({
  amount: toEuroOrMissingValue(0),
  isOpen: false,
  items: []
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
      ...cart,
      amount: toEuroOrMissingValue(amount)
    });
  };

  const toggleCartDrawer = () => {
    setState(STATE.CART, {
      ...cart,
      isOpen: !cart.isOpen
    });
  };

  const addItem = (cartItem: CartItem) => {
    const items = [...cart.items, cartItem];

    const amount = items.reduce(
      (accumulatedAmount, cartItem) => accumulatedAmount + cartItem.amount,
      0
    );

    setState(STATE.CART, {
      ...cart,
      amount: toEuroOrMissingValue(amount),
      items
    });

    //setCartAmount(amount);
  };

  return {
    setCartAmount,
    toggleCartDrawer,
    addItem
  };
};
