import { describe, it, expect, beforeEach } from 'vitest';
import {
  cartState,
  toggleCartDrawer,
  addItem,
  resetCart,
  getCartItems,
  getTotalAmout,
  isItemInCart
} from './CartStore';
import { CartItem } from 'models/Cart';

describe('cartStore', () => {
  beforeEach(resetCart);

  it('toggles the cart drawer state', () => {
    toggleCartDrawer();

    expect(cartState.value.isOpen).toBeTruthy();

    toggleCartDrawer();

    expect(cartState.value.isOpen).toBeFalsy();
  });

  it('adds item to the cart correctly', () => {
    const item: CartItem = {
      amount: 100,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00001',
      iuv: '00001',
      description: 'A nice description'
    };
    addItem(item);

    expect(getCartItems()).toStrictEqual([item]);
    expect(getCartItems().length).toBe(1);
    expect(getTotalAmout()).toBe(item.amount);

    const anotherItem: CartItem = {
      amount: 367,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00002',
      iuv: '00002',
      description: 'A nice description'
    };
    addItem(anotherItem);

    expect(getCartItems()).toStrictEqual([item, anotherItem]);
    expect(getCartItems().length).toBe(2);
    expect(getTotalAmout()).toBe(item.amount + anotherItem.amount);
  });

  it('does not add item to the cart if already present', () => {
    const item: CartItem = {
      amount: 100,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00001',
      iuv: '00001',
      description: 'A nice description'
    };
    addItem(item);

    expect(getCartItems()).toStrictEqual([item]);
    expect(getCartItems().length).toBe(1);
    expect(getTotalAmout()).toBe(item.amount);

    addItem(item);

    expect(getCartItems()).toStrictEqual([item]);
    expect(getCartItems().length).toBe(1);
    expect(getTotalAmout()).toBe(item.amount);
  });

  it('does not add more the 5 item to the cart', () => {
    const item: CartItem = {
      amount: 100,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00001',
      iuv: '00001',
      description: 'A nice description'
    };
    addItem(item);
    addItem({ ...item, iuv: '00002' });
    addItem({ ...item, iuv: '00003' });
    addItem({ ...item, iuv: '00004' });
    addItem({ ...item, iuv: '00005' });
    addItem({ ...item, iuv: '00006' });

    expect(getCartItems().length).toBe(5);
    expect(getTotalAmout()).toBe(100 * 5);
  });

  it('resets correctly', () => {
    const item: CartItem = {
      amount: 100,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00001',
      iuv: '00001',
      description: 'A nice description'
    };
    addItem(item);
    addItem({ ...item, iuv: '00002' });
    addItem({ ...item, iuv: '00003' });
    addItem({ ...item, iuv: '00004' });
    addItem({ ...item, iuv: '00005' });
    addItem({ ...item, iuv: '00006' });

    resetCart();

    expect(getCartItems().length).toBe(0);
    expect(getTotalAmout()).toBe(0);
  });

  it('checks the item presence correctly', () => {
    const item: CartItem = {
      amount: 100,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00001',
      iuv: '00001',
      description: 'A nice description'
    };
    addItem(item);
    addItem({ ...item, iuv: '00002' });

    expect(isItemInCart('00001')).toBeTruthy();
    expect(isItemInCart('00002')).toBeTruthy();
    expect(isItemInCart('00003')).toBeFalsy();

    resetCart();

    expect(isItemInCart('00001')).toBeFalsy();
    expect(isItemInCart('00002')).toBeFalsy();
  });
});
