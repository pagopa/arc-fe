import { CartItem, CartState } from 'models/Cart';
import utils from 'utils';
import { usePersistentSignal } from 'hooks/usePersistentSignal';

const MAXCARTITEMS = 5;
const ITEMID = 'iuv';

const defaultCart: CartState = {
  amount: 0,
  isOpen: false,
  items: []
};

export const { state: cartState } = usePersistentSignal<CartState>(
  utils.storage.SessionItems.CART,
  {
    storage: sessionStorage,
    initialValue: defaultCart
  }
);

export function setCart(cart: CartState) {
  cartState.value = cart;
}

export function resetCart() {
  cartState.value = defaultCart;
}

export function toggleCartDrawer() {
  cartState.value = { ...cartState.value, isOpen: !cartState.value.isOpen };
}

function setCartAmount(amount: number) {
  cartState.value = { ...cartState.value, amount: amount };
}

function updateAmount(items: CartItem[]) {
  const amount = items.reduce(
    (accumulatedAmount, cartItem) => accumulatedAmount + cartItem.amount,
    0
  );
  setCartAmount(amount);
}

export function addItem(cartItem: CartItem) {
  // Max cart items check
  if (cartState.value.items.length === MAXCARTITEMS) return;
  // Check for duplicates
  if (cartState.value.items.some((item) => item[ITEMID] === cartItem.iuv)) return;

  const items = [...cartState.value.items, cartItem];
  cartState.value = { ...cartState.value, items };

  updateAmount(items);
}

export function deleteItem(itemId: string) {
  // nothing to do if empty
  if (!cartState.value.items.length) return;

  const items = cartState.value.items.filter((item) => item[ITEMID] !== itemId);
  cartState.value = { ...cartState.value, items };

  updateAmount(items);
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
