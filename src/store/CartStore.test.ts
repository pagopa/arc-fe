import { describe, it, expect, beforeEach } from 'vitest';
import { cartState, toggleCartDrawer, addItem, resetCart } from './CartStore';
import { toEuroOrMissingValue } from 'utils/converters';
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

    expect(cartState.value.items).toStrictEqual([item]);
    expect(cartState.value.items.length).toBe(1);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(item.amount));

    const anotherItem: CartItem = {
      amount: 367,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: '00002',
      iuv: '00002',
      description: 'A nice description'
    };
    addItem(anotherItem);

    expect(cartState.value.items).toStrictEqual([item, anotherItem]);
    expect(cartState.value.items.length).toBe(2);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(item.amount + anotherItem.amount));
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

    expect(cartState.value.items).toStrictEqual([item]);
    expect(cartState.value.items.length).toBe(1);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(item.amount));

    addItem(item);

    expect(cartState.value.items).toStrictEqual([item]);
    expect(cartState.value.items.length).toBe(1);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(item.amount));
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

    expect(cartState.value.items.length).toBe(5);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(100 * 5));
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

    expect(cartState.value.items.length).toBe(0);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(0));
  });
});
