import { STATE } from './types';
import { CartItem, CartState } from 'models/Cart';
import { toEuroOrMissingValue } from 'utils/converters';
import { useStore } from './GlobalStore';
import { signal, effect } from '@preact/signals-react';
import utils from 'utils';

const MAXCARTITEMS = 5;
const ITEMID = 'iuv';

const defaultCart: CartState = {
  amount: 0,
  isOpen: false,
  items: []
};

export const cartState = signal<CartState>(utils.storage.cart.get() || defaultCart);

export function setCart(cart: CartState) {
  cartState.value = cart;
}

export function resetCart() {
  cartState.value = defaultCart;
}

export function toggleCartDrawer() {
  cartState.value = { ...cartState.value, isOpen: !cartState.value.isOpen };
}

export function setCartAmount(amount: number) {
  cartState.value = { ...cartState.value, amount: amount };
}

export function addItem(cartItem: CartItem) {
  // Max cart items check
  if (cartState.value.items.length === MAXCARTITEMS) return;
  // Check for duplicates
  if (cartState.value.items.some((item) => item[ITEMID] === cartItem.iuv)) return;

  const items = [...cartState.value.items, cartItem];
  cartState.value = { ...cartState.value, items };

  const amount = cartState.value.items.reduce(
    (accumulatedAmount, cartItem) => accumulatedAmount + cartItem.amount,
    0
  );
  setCartAmount(amount);
}

export function getCartItems() {
  return cartState.value.items;
}

export function getTotalAmout() {
  return cartState.value.amount;
}

export function isItemInCart(itemId: string) {
  return cartState.value.items.some((item) => item[ITEMID] === itemId);
}

// effect subiscribed to carts.items
effect(() => {
  console.log(cartState.value);
  utils.storage.cart.set(cartState.value);
});

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
